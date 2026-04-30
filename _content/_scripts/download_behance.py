#!/usr/bin/env python3
"""
Download all images from a Behance project page and convert them to WebP.

- Picks the highest-resolution non-WEBP source available (usually `source` = original)
- Resizes to max 5000px on the largest side (no upscale)
- Encodes to WebP quality 92, method 6 (slow/best compression)
- Falls back to lower quality / smaller size if output exceeds 10 MB
- Passes through SVG without conversion
- Output files numbered 1.webp, 2.webp, ... preserving project order

Usage:
    python3 download_behance.py <behance_url> <output_dir>

Example:
    python3 download_behance.py \
        https://www.behance.net/gallery/9351617/dliCATHesse \
        _content/_images/delicathesse
"""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
from pathlib import Path

USER_AGENT = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
MAX_DIM = 5000
MAX_BYTES = 10 * 1024 * 1024
DEFAULT_QUALITY = 92
QUALITY_FALLBACKS = [88, 84, 78]


def fetch(url: str, attempts: int = 5, base_delay: float = 1.5) -> bytes:
    """HTTP GET with exponential backoff on 5xx / 429 / transient network errors."""
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    delay = base_delay
    last_exc: Exception | None = None
    for attempt in range(attempts):
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            last_exc = e
            retryable = e.code in (429, 500, 502, 503, 504)
            if not retryable or attempt == attempts - 1:
                raise
            print(f"         ! HTTP {e.code} on {url}, retry in {delay:.1f}s")
        except urllib.error.URLError as e:
            last_exc = e
            if attempt == attempts - 1:
                raise
            print(f"         ! network error ({e.reason}), retry in {delay:.1f}s")
        time.sleep(delay)
        delay *= 2
    raise last_exc or RuntimeError("fetch failed")


def find_balanced(text: str, start_idx: int) -> str | None:
    """Return the substring starting at start_idx containing a balanced JSON value."""
    open_ch = text[start_idx]
    close_ch = {"[": "]", "{": "}"}[open_ch]
    depth = 0
    in_str = False
    esc = False
    for i in range(start_idx, len(text)):
        c = text[i]
        if esc:
            esc = False
            continue
        if c == "\\":
            esc = True
            continue
        if c == '"':
            in_str = not in_str
            continue
        if in_str:
            continue
        if c == open_ch:
            depth += 1
        elif c == close_ch:
            depth -= 1
            if depth == 0:
                return text[start_idx : i + 1]
    return None


def extract_modules(html: str) -> list[dict]:
    m = re.search(r'"modules"\s*:\s*\[', html)
    if not m:
        return []
    raw = find_balanced(html, m.end() - 1)
    if not raw:
        return []
    return json.loads(raw)


def flatten_image_items(modules: list[dict]) -> list[dict]:
    """
    Walk the top-level Behance modules list and return every image-like item
    with an `imageSizes` key, preserving document order.

    Handles:
      - ImageModule: has imageSizes directly at module level
      - MediaCollectionModule: groups multiple images under `components[]`
      - Other module types (TextModule, VideoModule, EmbedModule, ...) are skipped
    """
    items: list[dict] = []
    for mod in modules:
        typename = mod.get("__typename") or ""
        caption = (mod.get("caption") or "").strip()

        # Direct image module
        if (mod.get("imageSizes") or {}).get("allAvailable"):
            items.append({**mod, "_caption": caption})
            continue

        # Media collection module (groups several images)
        components = mod.get("components")
        if isinstance(components, list) and components:
            for comp in components:
                if not isinstance(comp, dict):
                    continue
                if (comp.get("imageSizes") or {}).get("allAvailable"):
                    items.append({**comp, "_caption": caption})
            continue

        # Fallback: any nested structure with imageSizes we haven't modeled
        # (kept conservative to avoid false positives)
        _ = typename  # currently unused, documented for future handling
    return items


def pick_best_source(module: dict) -> dict | None:
    sizes = module.get("imageSizes") or {}
    all_avail = sizes.get("allAvailable") or []
    if not all_avail:
        return None
    non_webp = [s for s in all_avail if (s.get("type") or "").upper() != "WEBP"]
    candidates = non_webp if non_webp else all_avail

    def score(s: dict) -> tuple[int, int]:
        url = s.get("url", "")
        w = s.get("width") or 0
        # prefer /source/ path, then largest width
        return (1 if "/source/" in url else 0, int(w))

    return max(candidates, key=score)


def run_convert(src: Path, dst: Path, resize: int, quality: int) -> None:
    subprocess.run(
        [
            "convert",
            str(src),
            "-resize",
            f"{resize}x{resize}>",
            "-define",
            "webp:method=6",
            "-quality",
            str(quality),
            str(dst),
        ],
        check=True,
    )


def encode_webp_with_fallback(src: Path, dst: Path) -> tuple[int, int]:
    """Encode src->dst WebP; returns (final_quality, final_resize_dim)."""
    resize = MAX_DIM
    for q in [DEFAULT_QUALITY] + QUALITY_FALLBACKS:
        run_convert(src, dst, resize, q)
        if dst.stat().st_size <= MAX_BYTES:
            return q, resize
    # last resort: shrink progressively at the lowest quality
    q = QUALITY_FALLBACKS[-1]
    while resize > 1000:
        resize = int(resize * 0.9)
        run_convert(src, dst, resize, q)
        if dst.stat().st_size <= MAX_BYTES:
            return q, resize
    return q, resize


def identify_dims(path: Path) -> str:
    try:
        out = subprocess.run(
            ["identify", "-format", "%wx%h", str(path)],
            capture_output=True,
            text=True,
            check=True,
        ).stdout.strip()
        return out
    except Exception:
        return "?"


def process_project(behance_url: str, out_dir: Path) -> list[dict]:
    out_dir.mkdir(parents=True, exist_ok=True)
    print(f"Fetching {behance_url}")
    html = fetch(behance_url).decode("utf-8", errors="replace")
    modules = extract_modules(html)
    img_mods = flatten_image_items(modules)
    print(f"Found {len(img_mods)} image item(s) across {len(modules)} module(s)")

    results: list[dict] = []
    failures: list[tuple[int, str, str]] = []
    with tempfile.TemporaryDirectory() as td:
        td_path = Path(td)
        for i, mod in enumerate(img_mods, 1):
            best = pick_best_source(mod)
            if not best:
                failures.append((i, "no_source", ""))
                continue
            src_url = best["url"]
            src_ext = os.path.splitext(src_url)[1].lstrip(".").lower() or "jpg"
            tmp_src = td_path / f"src_{i}.{src_ext}"
            print(f"[{i:2}/{len(img_mods)}] GET {src_url}")
            try:
                tmp_src.write_bytes(fetch(src_url))
                if src_ext == "svg":
                    out_path = out_dir / f"{i}.svg"
                    out_path.write_bytes(tmp_src.read_bytes())
                    print(f"         -> {out_path.name} (svg passthrough)")
                else:
                    out_path = out_dir / f"{i}.webp"
                    q, resize = encode_webp_with_fallback(tmp_src, out_path)
                    kb = out_path.stat().st_size / 1024
                    dims = identify_dims(out_path)
                    print(f"         -> {out_path.name} {dims} q={q} {kb:.0f} KB")
                results.append(
                    {
                        "path": str(out_path),
                        "caption": mod.get("_caption") or (mod.get("caption") or "").strip(),
                        "src_url": src_url,
                    }
                )
            except Exception as e:
                print(f"         !! FAILED: {type(e).__name__}: {e}")
                failures.append((i, type(e).__name__, src_url))
            # small politeness delay to avoid hammering Behance CDN
            time.sleep(0.25)
    if failures:
        print(f"\n!! {len(failures)} failure(s):")
        for idx, kind, url in failures:
            print(f"  [{idx}] {kind}  {url}")
    return results


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 1
    behance_url = sys.argv[1]
    out_dir = Path(sys.argv[2]).resolve()
    results = process_project(behance_url, out_dir)
    print("\n=== Summary ===")
    for r in results:
        print(r["path"])
    return 0


if __name__ == "__main__":
    sys.exit(main())

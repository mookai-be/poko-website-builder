// prettier-ignore
export const nativeFontStacks = {
  "system-ui": "system-ui, sans-serif",
  "transitional": "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
  "old-style": "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif",
  "humanist": "Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif",
  "geometric-humanist": "Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
  "classical-humanist": "Optima, Candara, 'Noto Sans', source-sans-pro, sans-serif",
  "neo-grotesque": "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif",
  "monospace-slab-serif": "'Nimbus Mono PS', 'Courier New', monospace",
  "monospace-code": "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
  "industrial": "Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', sans-serif-condensed, sans-serif",
  "rounded-sans": "ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif",
  "slab-serif": "Rockwell, 'Rockwell Nova', 'Roboto Slab', 'DejaVu Serif', 'Sitka Small', serif",
  "antique": "Superclarendon, 'Bookman Old Style', 'URW Bookman', 'URW Bookman L', 'Georgia Pro', Georgia, serif",
  "didone": "Didot, 'Bodoni MT', 'Noto Serif Display', 'URW Palladio L', P052, Sylfaen, serif",
  "handwritten": "'Segoe Print', 'Bradley Hand', Chilanka, TSCu_Comic, casual, cursive",
}

export function transformBaseFontStack(name, stackDef) {
  const { native, custom } = stackDef;
  // TODO: implement custom font here as well
  const stylesString =
    native && nativeFontStacks[native]
      ? `--font-stack-${name}:${nativeFontStacks[native]};`
      : "";
  return {
    name,
    native,
    custom,
    stylesString,
  };
}

export function transformBaseFontStacks(baseFontStacks) {
  const { body, heading, code } = baseFontStacks;
  return {
    body: body && transformBaseFontStack("body", body),
    heading: heading && transformBaseFontStack("heading", heading),
    code: code && transformBaseFontStack("code", code),
  };
}

export function transformBrandColors(colors) {
  let brandColors = Array.isArray(colors) ? colors : [];
  brandColors = brandColors.map((color) => ({
    ...color,
    stylesString: `--${color.name}:${color.value};`,
  }));

  return brandColors;
}

export function transformPalette(palette) {
  const { name, advanced, ...baseVars } = palette;
  let unifiedPalette = {
    ...baseVars,
    ...advanced,
  };
  // Remove keys with falsy values
  Object.keys(unifiedPalette).forEach((key) => {
    if (!unifiedPalette[key]) {
      delete unifiedPalette[key];
    }
  });
  const stylesString = Object.entries(unifiedPalette)
    .map(([key, value]) => `--color-${key}:var(--${value});`)
    .join("");

  return {
    name,
    vars: unifiedPalette,
    stylesString,
  };
}

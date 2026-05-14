export default [
  // Define CSS variables on the fly with CSS-like syntax
  [
    /^v--([a-zA-Z0-9-]+):(.+)$/,
    ([, varName, value]) => {
      // If value starts with --, it's a CSS variable reference
      const cssValue = value.startsWith("--") ? `var(${value})` : value;
      return { [`--${varName}`]: cssValue };
    },
  ],
  // Aspect ratio utility
  [
    /^aspect-ratio-(\d+(?:\.\d+)?)$/,
    ([, d]) => ({ "aspect-ratio": d, "object-fit": "var(--fit, cover)" }),
  ],
  // Width utility
  // E.g. width-prose, width-body, width-card, ...
  [
    /^width-([a-zA-Z]+)$/,
    ([, name], { symbols }) => ({
      [symbols.selector]: () => `:where(.width-${name})`,
      "max-inline-size": `var(--width-${name})`,
      "margin-inline": "auto",
    }),
  ],
  // Vertical padding utility
  // E.g. py-prose, py-body, py-card, ...
  [
    /^py-([a-zA-Z]+)$/,
    ([, name], { symbols }) => ({
      [symbols.selector]: () => `:where(.py-${name})`,
      "padding-block": `var(--py-${name})`,
    }),
  ],
  // Vertical margin utility
  // E.g. my-prose, my-body, my-card, ...
  [
    /^my-([a-zA-Z]+)$/,
    ([, name], { symbols }) => ({
      [symbols.selector]: () => `:where(.my-${name})`,
      "margin-block": `var(--py-${name})`,
    }),
  ],
  [
    /^breathe$/,
    ([], { symbols }) => ({
      [symbols.selector]: () => `:where(.breathe)`,
      "margin-block": `var(--py)`,
    }),
  ],
  [
    /^breathe-([a-zA-Z]+)$/,
    ([, name], { symbols }) => ({
      [symbols.selector]: () => `:where(.breathe-${name})`,
      "margin-block": `var(--py-${name})`,
    }),
  ],
  // Negative Vertical margin utility
  // E.g. my-prose, my-body, my-card, ...
  [
    /^squash-([a-zA-Z]+)$/,
    ([, name], { symbols }) => ({
      [symbols.selector]: () => `:where(.squash-${name})`,
      isolation: "isolate",
      "margin-block": `calc(-0.5 * var(--py-${name}))`,
    }),
  ],
  // Border radius utility
  // E.g. my-prose, my-body, my-card, ...
  [
    /^radius-([a-zA-Z]+)$/,
    ([, name], { symbols }) => ({
      [symbols.selector]: (selector) => `:where(${selector})`,
      "border-radius": `var(--radius-${name})`,
    }),
  ],
];

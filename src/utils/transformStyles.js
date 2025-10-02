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

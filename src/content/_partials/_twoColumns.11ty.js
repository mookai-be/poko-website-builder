export default function ({
  content,
  type,
  gap,
  // Switcher options
  widthWrap,
  // Fixed-fluid options
  fixedSide,
  widthFixed,
  widthFluidMin,
  // to pass
  class: className,
  tag,
}) {
  // Default: switcher (Symmetrical)
  const layoutClass = type === "fixedFluid" ? "fixed-fluid" : "switcher";
  // small="fixedLeft" → no extra class (left is default)
  // small="fixedRight" → add "fixed-right" class
  const modifierClass = fixedSide === "fixedRight" ? "fixed-right" : "";
  const styles = {
    "--width-fixed": widthFixed,
    "--width-fluid-min": widthFluidMin,
    "--gap-fixed-fluid": gap,
    "--width-wrap": widthWrap,
    "--gap-switcher": gap,
  };

  let styleStr = Object.entries(styles)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");
  styleStr = styleStr ? `style="${styleStr}"` : "";

  const classes = [
    "layout area main two-columns",
    layoutClass,
    modifierClass,
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  //   const defaultCss =
  //     type === "fixedFluid"
  //       ? `{% css %}
  // .fixed-fluid {
  //   --width-fixed: calc(var(--width-max) - var(--width-prose) - var(--gap-fixed-fluid, 1em));
  // }
  // {% endcss %}
  // `
  //       : "";

  return `<${tag || "div"} class="${classes}" ${styleStr}>
${content}
</${tag || "div"}>
`;
  // ${defaultCss}
}

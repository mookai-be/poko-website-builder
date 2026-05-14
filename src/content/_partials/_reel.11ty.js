export default function ({
  content,
  type,
  gap,
  itemWidth,
  height,
  noBar,
  class: className,
  tag,
}) {
  const styles = {
    "--gap": gap,
    "--item-width": itemWidth,
    "--height": height,
  };
  let styleStr = Object.entries(styles)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");
  styleStr = styleStr ? `style="${styleStr}"` : "";

  return `<${tag || "div"} class="layout area main list-reel ${type || "reel"} ${noBar ? "no-bar" : ""} ${className || ""}" ${styleStr}>
${content}
</${tag || "div"}>`;
}

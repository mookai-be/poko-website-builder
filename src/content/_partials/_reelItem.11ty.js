export default function ({ content, class: className, tag }) {
  return `<${tag || "div"} class="cell item-reel ${className || ""}">
${content}
</${tag || "div"}>`;
}

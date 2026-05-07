export default function ({ content, class: className, tag }) {
  return `<${tag || "div"} class="cell item-grid ${className || ""}">
${content}
</${tag || "div"}>`;
}

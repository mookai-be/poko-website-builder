export default function ({ content, class: className, tag }) {
  return `<${tag || "div"} class="cell item-two-columns ${className || ""}">
${content}
</${tag || "div"}>`;
}

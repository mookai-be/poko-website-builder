export default function ({ content, class: className, tag }) {
  return `<${tag || "div"} class="cell item-flow ${className || ""}">
${content}
</${tag || "div"}>`;
}

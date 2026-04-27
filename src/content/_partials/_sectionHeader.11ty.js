export default function ({ content, class: className, tag }) {
  return `<${tag || "header"} class="area header ${className || ""}">
${content}
</${tag || "header"}>`;
}

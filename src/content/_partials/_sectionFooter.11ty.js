export default function ({ content, class: className, tag }) {
  return `<${tag || "footer"} class="area footer ${className || ""}">
${content}
</${tag || "footer"}>`;
}

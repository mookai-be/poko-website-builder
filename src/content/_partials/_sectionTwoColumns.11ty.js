export default function ({ content, class: className, tag }) {
  return `<${tag || "section"} class="section-two-columns ${className || ""}">
${content}
</${tag || "section"}>`;
}

export default async function ({ content, class: className, tag }) {
  return `<${tag || "section"} class="section-reel ${className || ""}">
${content}
</${tag || "section"}>`;
}

export default async function ({ content, class: className, tag }) {
  return `<${tag || "section"} class="section-flow ${className || ""}">
${content}
</${tag || "section"}>`;
}

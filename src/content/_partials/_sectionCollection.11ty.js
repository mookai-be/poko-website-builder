export default async function ({ content, class: className, tag }) {
  // const renderedPartial = await this.partial("styles/_sectionCollection");
  return `<${tag || "section"} class="section-collection ${className || ""}">
${content}
</${tag || "section"}>`;
}

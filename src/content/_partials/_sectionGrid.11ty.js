export default async function ({ content, class: className, tag }) {
  // const renderedPartial = await this.partial("styles/_sectionGrid");
  return `<${tag || "section"} class="section-grid ${className || ""}">
${content}
</${tag || "section"}>`;
}

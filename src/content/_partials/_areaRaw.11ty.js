export default async function ({ content, tag, class: className }) {
  return tag || className
    ? `<${tag || "div"} class="area ${className || ""}">
${content}
</${tag || "div"}>`
    : content;
}

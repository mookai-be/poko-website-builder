export default async function ({ content, tag, class: className }) {
  return `<${tag || "div"} class="${className || ""}">
${content}
</${tag || "div"}>`;

  // const { tag = "div", __keywords, ...attrs } = attr || {};

  //   return `<${tag || "div"} ${Object.entries(attrs)
  //     .map(([key, value]) => `${key}="${value}"`)
  //     .join(" ")}>

  // ${content}

  // </${tag || "div"}>`;
}

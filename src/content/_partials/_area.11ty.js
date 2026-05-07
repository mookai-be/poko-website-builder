export default async function ({ type, content, tag, class: className }) {
  const njkAttrs = Object.entries({ tag, class: className })
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}="${value}"`)
    .join(", ");

  return `{% ${type} ${njkAttrs || ""} %}
${content}
{% end${type} %}`;
}

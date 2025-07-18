export default async function (eleventyConfig, pluginOptions) {
  eleventyConfig.versionCheck(">=3.0.0-alpha.1");

  let rewriter = null;

  try {
    rewriter = new HTMLRewriter();
  } catch (error) {
    console.error("HTMLRewriter not available without Bun.");
    console.error(error);
    return;
  }

  for (const [selector, className] of Object.entries(
    pluginOptions?.classes || {}
  )) {
    rewriter.on(selector, {
      element(element) {
        const classAttr = element.getAttribute("class");
        element.setAttribute(
          "class",
          [classAttr, className].filter(Boolean).join(" ")
        );
      },
    });
  }

  eleventyConfig.addTransform("htmlClassesTransform", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      const html = rewriter.transform(content);

      return html;
    }

    // If not an HTML output, return content as-is
    return content;
  });
}

// // An example HTML document
// const html = `
// <html>
// <body>
// <img src="/cat.jpg">
// <img src="dog.png">
// <img src="https://example.com/bird.webp">
// </body>
// </html>
// `;

// const result = rewriter.transform(html);
// console.log(result);

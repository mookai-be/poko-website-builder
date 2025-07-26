import { RenderPlugin } from "@11ty/eleventy";

export async function partial(filename, data, templateEngineOverride) {
  // './_demo/_partials/_footer.md'
  // return this.env.filters.safe("\n");
  // console.log(RenderPlugin);
  console.log(this.nunjucksShortcodes);
  // const renderFile = this.env.getExtension("renderFile").run;
  // console.log("renderFile: ", renderFile);
  // console.log("CALL: ", renderFile("./_demo/_partials/_footer.md", {}, "md"));
  // return JSON.stringify(this.env);
  return "";
}

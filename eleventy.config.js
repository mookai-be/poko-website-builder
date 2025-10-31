import path from "node:path";
import fs from "node:fs";
import yaml from "js-yaml";
// import { fileURLToPath } from "node:url";
// import Nunjucks from "nunjucks";
import { transform as lightningTransform } from "lightningcss";

// -------- Plugins
import directoryOutputPlugin from "@11ty/eleventy-plugin-directory-output";
import { RenderPlugin, IdAttributePlugin, I18nPlugin } from "@11ty/eleventy";
import Fetch from "@11ty/eleventy-fetch";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import pluginIcons from "eleventy-plugin-icons";
// import pluginMarkdoc from "@m4rrc0/eleventy-plugin-markdoc";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { imageTransformOptions } from "./src/config-11ty/plugins/imageTransform.js";
import yamlData from "./src/config-11ty/plugins/yamlData/index.js";
import cmsConfigPlugin from "./src/config-11ty/plugins/cms-config/index.js";
import autoCollections from "./src/config-11ty/plugins/auto-collections/index.js";
import htmlClassesTransform from "./src/config-11ty/plugins/html-classes-transform/index.js";
import populateInputDir from "./src/config-11ty/plugins/populateInputDir/index.js";
import partialsPlugin from "./src/config-11ty/plugins/partials/index.js";
import buildExternalCSS from "./src/config-11ty/plugins/buildExternalCSS/index.js";
import pluginUnoCSS from "./src/config-11ty/plugins/plugin-eleventy-unocss/index.js";
import customRenderersPlugin from "./src/config-11ty/plugins/customRenderers/index.js";
// import keystaticPassthroughFiles from './src/config-11ty/plugins/keystaticPassthroughFiles/index.js';
// -------- Plugins Markdown
import markdownItContainer from "markdown-it-container";
// import { container as markdownItContainer } from "@mdit/plugin-container"
import markdownItMark from "markdown-it-mark";
import markdownItLinkAttributes from "markdown-it-link-attributes";
import markdownItAttrs from "markdown-it-attrs";
import markdownItBracketedSpans from "markdown-it-bracketed-spans";
// -------- Env Variables
import * as env from "./env.config.js";
import {
  DEBUG,
  CMS_IMPORT,
  ELEVENTY_RUN_MODE,
  BUILD_LEVEL,
  MINIFY,
  WORKING_DIR,
  WORKING_DIR_ABSOLUTE,
  CONTENT_DIR,
  // SRC_DIR_FROM_WORKING_DIR,
  PARTIALS_DIR,
  LAYOUTS_DIR,
  OUTPUT_DIR,
  FILES_OUTPUT_DIR,
  BASE_URL,
  PROD_URL,
  languages,
  brandConfig,
  brandStyles,
} from "./env.config.js";
import eleventyComputed from "./src/data/eleventyComputed.js";

// Eleventy Config
import {
  toISOString,
  formatDate,
  dateToSlug,
  toLocaleString,
  slugifyPath,
  locale_url,
  locale_links,
  filterCollection,
  join,
  first,
  last,
  randomFilter,
  ogImageSrc,
  emailLink,
  htmlAttrs,
  htmlImgAttrs,
} from "./src/config-11ty/filters/index.js";
import {
  newLine,
  fetchFile as fetchFileShortcode,
  image,
  gallery,
  wrapper,
} from "./src/config-11ty/shortcodes/index.js";
// import { ogImageSelected } from "./src/config-11ty/shortcodes/index.js";

if (DEBUG) {
  console.log("---------ENV-----------\n", env, "\n---------/ENV---------");
}

// TODOS:
// - Look at persisting images in cache between builds: https://github.com/11ty/eleventy-img/issues/285

const defaultLanguage = languages.find((lang) => lang.isWebsiteDefault);
const defaultLangCode = defaultLanguage?.code || "en";

const statusesToUnrender =
  BUILD_LEVEL === "production" ? ["inactive", "draft"] : ["inactive"];
const unrenderedLanguages = languages
  .filter((lang) => statusesToUnrender.includes(lang.status))
  .map((lang) => lang.code);

function shouldNotRender(data) {
  if (data.page.filePathStem.startsWith("/_")) {
    return true;
  }
  for (const lang of unrenderedLanguages) {
    if (data.page.filePathStem.startsWith(`/${lang}`)) {
      return true;
    }
  }
  if (data.status && statusesToUnrender.includes(data.status)) {
    return true;
  }
  return false;
}

function mditRenderContainerTag(tagName, tokens, idx, options, env, Renderer) {
  tokens[idx].tag = tagName;
  return Renderer.renderToken(tokens, idx, options);
}
function mRCTOptions(tagName) {
  return {
    render: function (tokens, idx, options, env, Renderer) {
      return mditRenderContainerTag(
        tagName,
        tokens,
        idx,
        options,
        env,
        Renderer
      );
    },
  };
}

/**
 * @typedef { import("@11ty/eleventy").UserConfig } UserConfig
 */
export const config = {
  dir: {
    // input: "src/templates",
    input: WORKING_DIR, // this is probably '_content'
    // input: WORKING_DIR_ABSOLUTE,
    // TODO: I'd love to do this
    // includes: [PARTIALS_DIR, `${SRC_DIR_FROM_WORKING_DIR}/content/_partials`],
    includes: PARTIALS_DIR, // this is probably '_partials'
    layouts: LAYOUTS_DIR, // this is probably '_layouts'
    // data: "../src/data", // Directory for global data files. Default: "_data"
    // data: "/src/data", // Directory for global data files. Default: "_data"
    // output: "public",
    output: OUTPUT_DIR,
  },
  templateFormats: ["md", "njk", "html", "11ty.js"],
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  // htmlTemplateEngine: "mdoc",
};

export default async function (eleventyConfig) {
  // --------------------- Base Config
  eleventyConfig.setQuietMode(true);

  // eleventyConfig.setWatchThrottleWaitTime(500); // in milliseconds

  eleventyConfig.addWatchTarget("./src/config-11ty/**/*", {
    resetConfig: true,
  });
  // eleventyConfig.addWatchTarget("./src/**/*");
  // eleventyConfig.addWatchTarget("./env.config.js", { resetConfig: true });
  // eleventyConfig.addWatchTarget(`${WORKING_DIR}/**/*`, { resetConfig: true });
  // eleventyConfig.watchIgnores.add(`${WORKING_DIR}/_styles/_ctx.css`);
  // eleventyConfig.setUseGitIgnore(false);

  // --------------------- Custom Nunjucks setup
  // TODO: Does this work as expected?
  // NOTE: This is a workaround because virtual templates does not work for includes

  // let nunjucksEnvironment = new Nunjucks.Environment(
  //   [
  //     new Nunjucks.FileSystemLoader(`${WORKING_DIR}/${PARTIALS_DIR}`),
  //     new Nunjucks.FileSystemLoader(`src/content/_partials`),
  //   ],
  //   {
  //     dev: true,
  //     watch: ELEVENTY_RUN_MODE !== "build",
  //   }
  // );
  // eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  // --------------------- Eleventy Events
  eleventyConfig.on(
    "eleventy.before",
    async (/*{ directories, runMode, outputMode, dir, ...arg }*/) => {
      // 1. Read data in '_content/_data/brand.yaml'
      let brandConfig = {};
      const brandConfigPath = `${WORKING_DIR_ABSOLUTE}/_data/brand.yaml`;
      try {
        const brandConfigYaml = fs.readFileSync(brandConfigPath, "utf-8");
        brandConfig = yaml.load(brandConfigYaml);
      } catch (error) {
        console.error("Error reading brandConfig.yaml:", error);
      }
      // 2. If "copy ctx.css" toggle is true, copy the ctx.css file to '_content/styles' directory with the defined name
      const ctxOutputFilename = brandConfig?.ctxCssImport?.filename;
      const toggleCopyCtxCss = typeof ctxOutputFilename === "string";
      const ctxOutputPath = `${WORKING_DIR_ABSOLUTE}/_styles/${
        ctxOutputFilename || "ctx.css"
      }`;
      const ctxInputPath = `src/styles/ctx.css`;
      if (toggleCopyCtxCss) {
        // Make sure the destination folder exists
        const destDir = path.dirname(ctxOutputPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(ctxInputPath, ctxOutputPath);
      } else {
        // 3. If "copy ctx.css" toggle is false, delete the ctx.css file from '_content/styles' directory
        try {
          fs.unlinkSync(ctxOutputPath);
        } catch (error) {
          console.warn(
            "Trying to delete ctx.css but it doesn't seem to exist. If you named the file differently, please remove it manually from the CMS or file system."
          );
        }
      }
    }
  );

  // --------------------- Preprocessors
  eleventyConfig.addPreprocessor("Publication Status", "*", (data, content) => {
    if (shouldNotRender(data)) {
      return false;
    }
  });

  // --------------------- Plugins Markdown
  eleventyConfig.amendLibrary(
    "md",
    (mdLib) =>
      mdLib
        // https://github.com/markdown-it/markdown-it-container
        // .use(markdownItContainer, "@", {
        //   render: function (tokens, idx) {
        //     const token = tokens[idx];
        //     const attrsStr =
        //       token.attrs
        //         ?.map(([name, value]) => `${name}="${value}"`)
        //         ?.join(" ") || "";
        //     const tagMatch = token.info
        //       .trim()
        //       .match(/^@\s*([a-zA-Z0-9]+)\s*(.*)$/);
        //     const tag = tagMatch ? tagMatch[1] : "div";

        //     console.log({ token, idx, tag, attrsStr });

        //     return token.nesting === 1 ? `<${tag} ${attrsStr}>` : `</${tag}>`;
        //   },
        // })
        // Use it like this:
        // ::: section
        // :::
        .use(markdownItContainer, "section", mRCTOptions("section"))
        .use(markdownItContainer, "aside", mRCTOptions("aside"))
        .use(markdownItContainer, "article", mRCTOptions("article"))
        .use(markdownItContainer, "footer", mRCTOptions("footer"))
        .use(markdownItContainer, "header", mRCTOptions("header"))
        .use(markdownItContainer, "nav", mRCTOptions("nav"))
        .use(markdownItContainer, "main", mRCTOptions("main"))
        .use(markdownItContainer, "ul", mRCTOptions("ul"))
        .use(markdownItContainer, "ol", mRCTOptions("ol"))
        .use(markdownItContainer, "div", mRCTOptions("div"))
        .use(markdownItContainer, "block")
        .use(markdownItContainer, "flow")
        .use(markdownItContainer, "grid-fluid")
        .use(markdownItContainer, "cluster")
        .use(markdownItContainer, "switcher")

        // .use(markdownItContainer, {
        //   name: "@",
        //   // render: function (tokens, idx) {
        //   //   const token = tokens[idx];
        //   //   const attrsStr =
        //   //     token.attrs
        //   //       ?.map(([name, value]) => `${name}="${value}"`)
        //   //       ?.join(" ") || "";
        //   //   const tagMatch = token.info
        //   //     .trim()
        //   //     .match(/^@\s*([a-zA-Z0-9]+)\s*(.*)$/);
        //   //   const tag = tagMatch ? tagMatch[1] : "div";

        //   //   return token.nesting === 1 ? `<${tag} ${attrsStr}>` : `</${tag}>`;
        //   // },
        //   openRender: (tokens, idx, _options) => {
        //     const token = tokens[idx];
        //     const attrsStr =
        //       token.attrs
        //         ?.map(([name, value]) => `${name}="${value}"`)
        //         ?.join(" ") || "";
        //     const tagMatch = token.info
        //       .trim()
        //       .match(/^@\s*([a-zA-Z0-9]+)\s*(.*)$/);
        //     const tag = tagMatch ? tagMatch[1] : "div";

        //     console.log({ token, tag, attrsStr, _options });

        //     return `<${tag} ${attrsStr}>`;
        //   },
        //   closeRender: (tokens, idx, _options) => {
        //     const tagMatch = tokens[idx].info
        //       .trim()
        //       .match(/^@\s*([a-zA-Z0-9]+)\s*(.*)$/);
        //     const tag = tagMatch ? tagMatch[1] : "div";

        //     console.log({ token: tokens[idx], tag, _options });

        //     return `</${tag}>`;
        //   },
        // })
        // .use(markdownItContainer, { name: "block" })
        // .use(markdownItContainer, { name: "flow" })
        // .use(markdownItContainer, { name: "grid-fluid" })
        // .use(markdownItContainer, { name: "cluster" })
        // .use(markdownItContainer, { name: "switcher" })

        .use(markdownItMark) // https://github.com/markdown-it/markdown-it-mark
        .use(markdownItLinkAttributes) // https://github.com/crookedneighbor/markdown-it-link-attributes
        .use(markdownItAttrs) // https://github.com/arve0/markdown-it-attrs
        .use(markdownItBracketedSpans) // https://github.com/mb21/markdown-it-bracketed-spans
  );

  // --------------------- Bundles
  eleventyConfig.addBundle("html");

  // --------------------- Plugins Early
  eleventyConfig.addPlugin(directoryOutputPlugin);
  eleventyConfig.addPlugin(RenderPlugin);
  eleventyConfig.addPlugin(IdAttributePlugin, {
    selector: "h1,h2,h3,h4,h5,h6,.id", // default: "h1,h2,h3,h4,h5,h6"
  });
  eleventyConfig.addPlugin(I18nPlugin, {
    defaultLanguage: defaultLangCode, // Required
    // Rename the default universal filter names
    filters: {
      // transform a URL with the current page’s locale code
      url: "locale_url_original",

      // find the other localized content for a specific input file
      links: "locale_links_original",
    },
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, imageTransformOptions);
  eleventyConfig.addPlugin(yamlData);
  eleventyConfig.addPlugin(cmsConfigPlugin);
  eleventyConfig.addPlugin(autoCollections);
  // TODO: reinstate this if 11ty Transform proves to be stable
  eleventyConfig.addPlugin(pluginWebc, {
    components: [
      "npm:@11ty/eleventy-img/*.webc",
      "src/components/**/*.webc",
      `${WORKING_DIR}/_components/**/*.webc`,
    ],
    useTransform: true,
    bundlePluginOptions: {
      transforms: [
        async function (content) {
          let { type, page } = this;

          if (type === "css") {
            let { code, map } = lightningTransform({
              // filename: 'style.css',
              code: Buffer.from(content),
              minify: MINIFY,
              // sourceMap: true
            });

            return code;
          }
          return content;
        },
      ],
    },
  });
  eleventyConfig.addPlugin(pluginIcons, {
    sources: [
      {
        name: "simple",
        path: "node_modules/simple-icons/icons",
        default: true,
      },
      {
        name: "tabler",
        path: "node_modules/@tabler/icons/icons/outline",
      },
      {
        name: "tablerOutline",
        path: "node_modules/@tabler/icons/icons/outline",
      },
      {
        name: "tablerFilled",
        path: "node_modules/@tabler/icons/icons/filled",
      },
    ],
    icon: {
      class: (name, source) => `icon icon-${source} icon-${name}`,
    },
  });
  await eleventyConfig.addPlugin(buildExternalCSS);
  // TODO: import those classes from a data file
  eleventyConfig.addPlugin(htmlClassesTransform, {
    classes: {
      // <selector>: "<class>",
      // html: "imported-html-class",
      // body: "imported-body-class",
    },
  });
  await eleventyConfig.addPlugin(pluginUnoCSS);

  // --------------------- Populate files and default content
  // Populate Default Content: Copy `src/content-static/` to `dist`
  eleventyConfig.addPassthroughCopy({ "src/content-static": "/" });
  // Copy User's files: `src/content-static/` to `dist`
  eleventyConfig.addPassthroughCopy({
    [`${WORKING_DIR}/_files`]: "/assets/files/",
  });
  eleventyConfig.addPassthroughCopy({
    [`${WORKING_DIR}/*.css`]: "/assets/styles/",
  });
  // Copy Sveltia CMS if not using CDN
  if (CMS_IMPORT === "npm") {
    eleventyConfig.addPassthroughCopy({
      "node_modules/@sveltia/cms/dist/sveltia-cms.js":
        "assets/js/sveltia-cms.js",
      "node_modules/@sveltia/cms/dist/sveltia-cms.mjs":
        "assets/js/sveltia-cms.mjs",
    });
  } else if (CMS_IMPORT !== "cdn") {
    eleventyConfig.addPassthroughCopy({
      [CMS_IMPORT + "sveltia-cms.js"]: "assets/js/sveltia-cms.js",
      [CMS_IMPORT + "sveltia-cms.mjs"]: "assets/js/sveltia-cms.mjs",
    });
  }
  // Populate Default Content with virtual templates
  await eleventyConfig.addPlugin(populateInputDir, {
    // logLevel: 'debug',
    sources: [
      // TODO: Make this selectable from the CMS
      "src/themes/default",
      "src/content",
    ],
  });
  // Populate Default Content with virtual templates
  await eleventyConfig.addPlugin(partialsPlugin, {
    dirs: [
      path.join(WORKING_DIR, PARTIALS_DIR),
      path.join("src/content/_partials"),
    ],
    shortcodeAliases: [
      "partial",
      // "section"
    ],
  });
  // Copy files (Keystatic)
  // Retrieve public files from the _files directory
  // eleventyConfig.addPlugin(keystaticPassthroughFiles)

  // --------------------- Layouts
  eleventyConfig.addLayoutAlias("base", "base.html");

  // --------------------- Global Data
  eleventyConfig.addGlobalData("env", { ...env });
  eleventyConfig.addGlobalData("fontServices", async () => {
    const fontsource = await Fetch("https://api.fontsource.org/v1/fonts", {
      duration: "10d",
      type: "json",
    });
    return {
      fontsource: { fonts: fontsource },
    };
  });
  eleventyConfig.addGlobalData("baseUrl", BASE_URL);
  eleventyConfig.addGlobalData("prodUrl", PROD_URL);
  eleventyConfig.addGlobalData("layout", "base");
  // eleventyConfig.addGlobalData("globalSettings", globalSettings);
  eleventyConfig.addGlobalData("languages", languages);
  eleventyConfig.addGlobalData("defaultLanguage", defaultLanguage);
  eleventyConfig.addGlobalData("defaultLangCode", defaultLangCode);
  eleventyConfig.addGlobalData("brandConfig", brandConfig);
  eleventyConfig.addGlobalData("brandStyles", brandStyles);
  // Computed Data
  eleventyConfig.addGlobalData("eleventyComputed", eleventyComputed);

  // --------------------- Filters
  // Slug
  eleventyConfig.addFilter("slugifyPath", (input) =>
    slugifyPath(input, eleventyConfig)
  );
  // I18n
  eleventyConfig.addFilter("locale_url", locale_url);
  eleventyConfig.addFilter("link", locale_url); // Alias for locale_url
  eleventyConfig.addFilter("locale_links", locale_links);
  // Date
  eleventyConfig.addFilter("toIsoString", toISOString);
  eleventyConfig.addFilter("formatDate", formatDate);
  eleventyConfig.addFilter("dateToSlug", dateToSlug);
  eleventyConfig.addFilter("toLocaleString", toLocaleString);
  // Array
  eleventyConfig.addFilter("filterCollection", filterCollection);
  eleventyConfig.addFilter("join", join);
  eleventyConfig.addFilter("first", first);
  eleventyConfig.addFilter("last", last);
  eleventyConfig.addFilter("randomFilter", randomFilter);
  // Images
  eleventyConfig.addAsyncFilter("ogImage", ogImageSrc);
  // Email
  eleventyConfig.addFilter("emailLink", emailLink);
  // HTML helpers
  eleventyConfig.addFilter("htmlAttrs", htmlAttrs);
  eleventyConfig.addFilter("htmlImgAttrs", htmlImgAttrs);

  // --------------------- Shortcodes
  // eleventyConfig.addAsyncShortcode("partial", partialShortcode);
  // eleventyConfig.addShortcode("section", function (...rest) {
  //   console.log(rest);
  //   return "SECTIONS";
  // });
  // await eleventyConfig.addAsyncShortcode("links", links);
  eleventyConfig.addShortcode("n", newLine);
  await eleventyConfig.addNunjucksAsyncShortcode(
    "fetchFile",
    fetchFileShortcode
  );
  eleventyConfig.addShortcode("image", image);
  eleventyConfig.addShortcode("gallery", gallery);
  eleventyConfig.addPairedShortcode("wrapper", wrapper);
  // eleventyConfig.addPairedShortcode("calloutShortcode", calloutShortcode);
  // eleventyConfig.addShortcode("ogImageSelected", ogImageSelected);
  // eleventyConfig.addShortcode(
  //   "emailLink",
  //   function emailLink(email, subject, body, cc, bcc) {
  //     // Use it like so: {{ "hello@mookai.be" | emailLink("Subject", "Body", "CC", "BCC") }}
  //     const { element } = obfuscateEmail(email, subject, body, cc, bcc);
  //     // return element;
  //     //   return this.env.filters.safe(element);
  //     console.log(this);
  //     return element;
  //   }
  // );

  // --------------------- Bundles (late to override WebC Plugin)
  // eleventyConfig.addPlugin(function (eleventyConfig) {
  //   eleventyConfig.addBundle("css", {
  //     // File extension used for bundle file output, defaults to bundle name
  //     outputFileExtension: "css",
  //     // Name of shortcode for use in templates, defaults to bundle name
  //     shortcodeName: "css",
  //     // shortcodeName: false, // disable this feature.
  //     // Any <style> tags in the HTML should be included in this bundle -> https://www.11ty.dev/docs/plugins/bundle/#bundling-html-node-content
  //     bundleHtmlContentFromSelector: "style",
  //   });
  // });

  // Deferred Config
  await eleventyConfig.addPlugin(customRenderersPlugin);

  await eleventyConfig.addPlugin(async function (eleventyConf) {
    eleventyConf.versionCheck(">=3.0.0-alpha.1");
    // const { dir } = eleventyConf;

    // const safeFilter = this.env.filters.safe;
    const partialShortcodeFn = eleventyConfig.nunjucks.asyncShortcodes.partial;

    await eleventyConf.addShortcode("section", async function (...args) {
      // Old Section implementation mirroring Partial
      if (args.length > 1) {
        const partialFileName = args[0];
        const data = args[1] || {};
        console.warn(
          `DEPRECATED: Section (calling "${partialFileName}") is using the old syntax.`
        );

        return await partialShortcodeFn
          .call(this, partialFileName, data)
          .catch((e) => {
            console.error(e);
            return "";
          });
      }
      if (args.length !== 1 || typeof args[0] !== "object") {
        console.error(
          `Section shortcode called with invalid arguments: ${args}`
        );
        return "";
      }

      // {% section type="grid", vars={}, blocks=[], advanced={ sectionSlug="", vars={}} %}
      const { type, vars, blocks, advanced } = args?.[0] || {};
      const { sectionSlug, vars: advancedVars } = advanced || {};
      let partialFileName =
        (sectionSlug ? sectionSlug : `_sections/${type || "catch-error"}`) +
        ".njk";

      return await partialShortcodeFn
        .call(this, partialFileName, { blocks, ...vars, ...advancedVars })
        .catch((e) => {
          console.error(e);
          return "<< SECTION ERROR >>";
        });
    });
  });
}

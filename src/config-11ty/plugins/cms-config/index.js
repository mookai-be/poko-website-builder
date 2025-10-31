// NOTE: I I need to work on a Sveltia fork: https://github.com/sveltia/sveltia-cms/issues/180#issuecomment-2256112119
import {
  NODE_ENV,
  BUILD_LEVEL,
  WORKING_DIR_ABSOLUTE,
  CONTENT_DIR,
  PROD_URL,
  DISPLAY_URL,
  CMS_AUTH_URL,
  CMS_REPO,
  CMS_BACKEND,
  CMS_BRANCH,
  collections as selectedCollections,
  languages,
} from "../../../../env.config.js";
import { nativeFontStacks } from "../../../utils/transformStyles.js";

const isDev = NODE_ENV === "development";
const mustSetup = !languages?.length;

const default_locale = languages.find((lang) => lang.isCmsDefault)?.code;
const locales = languages
  .filter((lang) => /^published|draft/.test(lang.status))
  .map((lang) => lang.code);

const keyField = {
  name: "key",
  label: "Key",
  widget: "string",
  required: true,
  hint: "Unique identifier for the data item",
  i18n: "duplicate",
};
const tagsListField = {
  name: "tagsList",
  label: "Tags List (tagsList)",
  widget: "list",
  required: false,
  collapsed: true,
  i18n: true,
  allow_reorder: true,
  summary: "{{slug}}: {{name}}",
  fields: [
    {
      name: "slug",
      label: "Slug",
      widget: "string",
      required: true,
      i18n: "duplicate",
    },
    {
      name: "name",
      label: "Name",
      widget: "string",
      required: true,
      i18n: true,
    },
  ],
};
const varsField = {
  name: "vars",
  label: "Variables (vars)",
  widget: "keyvalue",
  i18n: true,
  required: false,
};
const imageFields = [
  {
    name: "src",
    label: "Image",
    widget: "image",
    required: true,
    i18n: true,
  },
  {
    name: "alt",
    label: "Alt Text",
    widget: "string",
    required: false,
    hint: "~125 characters max; Be specific, concise, focused on the image purpose, avoid redundant phrases like 'image of…'",
    i18n: true,
  },
  {
    name: "title",
    label: "Title",
    widget: "string",
    required: false,
    i18n: true,
  },
  {
    name: "width",
    label: "Width",
    widget: "number",
    value_type: "int",
    required: false,
    hint: "In px; Leave empty for auto; Useful for image optimization when not full width.",
    i18n: "duplicate",
  },
  {
    name: "aspectRatio",
    label: "Aspect Ratio",
    widget: "number",
    value_type: "float",
    hint: "Width / Height => square = 1; 16:9 = 1.78; 4:3 = 1.33; Extra wide = 4;",
    required: false,
    i18n: "duplicate",
  },
  {
    name: "loading",
    label: "Loading",
    widget: "select",
    options: [
      { value: "", label: "Default" },
      { value: "lazy", label: "Lazy" },
      { value: "eager", label: "Eager" },
    ],
    required: false,
    hint: "Select 'Eager' for images that are visible in the initial viewport;",
    i18n: "duplicate",
  },
  {
    name: "imgAttrs",
    label: "Other Image Attributes",
    widget: "string",
    required: false,
    i18n: "duplicate",
  },
];
const dataListField = {
  name: "dataList",
  label: "Data List (dataList)",
  hint: "Custom data items freely usable across the website",
  widget: "list",
  required: false,
  collapsed: true,
  i18n: "duplicate",
  allow_reorder: true,
  types: [
    {
      name: "text",
      label: "Text",
      widget: "object",
      required: false,
      fields: [
        keyField,
        {
          name: "value",
          label: "Value",
          widget: "string",
          required: false,
          i18n: true,
        },
      ],
    },
    {
      name: "markdown",
      label: "Markdown",
      widget: "object",
      required: false,
      fields: [
        keyField,
        {
          name: "value",
          label: "Value",
          widget: "markdown",
          required: false,
          i18n: true,
        },
      ],
    },
    {
      name: "image",
      label: "Image",
      widget: "object",
      required: false,
      fields: [keyField, ...imageFields],
    },
  ],
};
const statusField = {
  name: "status",
  label: "Status",
  widget: "select",
  options: [
    { value: "", label: "Default" },
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "noindex", label: "Noindex" },
    // TODO: later implement encrypted pages
    // { value: 'private', label: 'Private' },
    { value: "inactive", label: "Inactive" },
  ],
  default: "",
  required: false,
  i18n: true,
};
const generatePageField = {
  name: "generatePage",
  label: "Generate Page",
  widget: "select",
  hint: "Generate page for this entry or only use it as preview in lists etc?",
  options: [
    { value: "", label: "Default" },
    { value: "normal", label: "Generate Page" },
    { value: "previewOnly", label: "Preview Only" },
  ],
  default: "",
  required: false,
  i18n: "duplicate",
};
const pageLayoutRelationField = {
  name: "pageLayout",
  label: "Page Layout",
  widget: "relation",
  collection: "layouts",
  hint: "Select a layout for this page or leave empty to use the default layout",
  required: false,
  i18n: "duplicate",
};
const bodyMarkdownField = {
  name: "body",
  label: "Content",
  widget: "markdown",
  required: false,
  i18n: true,
  editor_components: [
    // "eleventyImage",
    "imageShortcode",
    "partial",
    "wrapper",
    "section",
    "links",
  ],
};
const eleventyNavigationField = {
  name: "eleventyNavigation",
  label: "Main Navigation",
  widget: "object",
  collapsed: true,
  required: false,
  summary: "Position: {{fields.order}} | Nav Title: {{fields.title}}",
  i18n: true,
  fields: [
    {
      name: "title",
      label: "Title",
      widget: "string",
      required: false,
      i18n: true,
      hint: "Default: Page Name",
    },
    {
      name: "parent",
      label: "Parent Page",
      widget: "relation",
      collection: "pages",
      search_fields: ["name"],
      value_field: "name",
      display_fields: ["name"],
      required: false,
      i18n: "duplicate",
    },
    {
      name: "order",
      label: "Order",
      widget: "number",
      default: 0,
      required: false,
      i18n: "duplicate",
    },
  ],
};
const simpleMetadataField = {
  name: "metadata",
  label: "Metadata",
  widget: "object",
  required: false,
  collapsed: true,
  i18n: true,
  fields: [
    {
      name: "title",
      label: "Title",
      widget: "string",
      required: false,
      hint: "Default: Page Name",
      i18n: true,
    },
    {
      name: "description",
      label: "Description",
      widget: "text",
      required: false,
      i18n: true,
    },
    {
      name: "image",
      label: "Image",
      widget: "object",
      required: false,
      hint: "The default image used when sharing this web page",
      i18n: "duplicate",
      fields: imageFields,
    },
  ],
};
const pagePreviewField = {
  name: "preview",
  label: "Preview",
  widget: "object",
  required: false,
  collapsed: true,
  i18n: true,
  hint: "Fields to be used when linking to this page or listing it",
  fields: [
    {
      name: "title",
      label: "Title",
      widget: "string",
      required: false,
      // hint: "Default: Page Name",
      i18n: true,
    },
    {
      name: "description",
      label: "Description",
      // widget: "text",
      widget: "markdown",
      required: false,
      // hint: "Default: Metadata description",
      i18n: true,
    },
    {
      name: "image",
      label: "Image",
      widget: "object",
      required: false,
      // hint: "The default image used when creating a visual preview of the page on your website. Default: Metadata image",
      // allow_multiple: false,
      i18n: true,
      fields: imageFields,
    },
  ],
};
const tagsField = {
  name: "tags",
  label: "Tags",
  widget: "relation",
  multiple: true,
  // collection: "tags",
  // search_fields: ["name"],
  // value_field: "{{slug}}",
  // display_fields: ["name"],
  collection: "dataFiles",
  file: "translatedData",
  value_field: "tagsList.*.slug",
  display_fields: ["tagsList.*.name"],
  required: false,
  i18n: "duplicate",
};
const brandColorField = {
  widget: "relation",
  collection: "stylesConfig",
  file: "brand",
  value_field: "colors.*.name",
  required: false,
};
const nativeFontStackSelectField = {
  widget: "select",
  required: false,
  options: Object.keys(nativeFontStacks).map((key) => ({
    label: key,
    value: key,
  })),
};
const fontStackDefinitionField = (nativeDefault = "system-ui") => ({
  widget: "object",
  required: true,
  fields: [
    {
      name: "native",
      label: "Native Font Stack",
      required: true,
      ...nativeFontStackSelectField,
      default: nativeDefault,
      hint: "Native font stacks are drawn from https://modernfontstacks.com/ (Click for a preview)",
    },
    // TODO: Allow imported fonts
    {
      name: "custom",
      label: "Custom Font Override",
      widget: "relation",
      collection: "stylesConfig",
      file: "brand",
      value_field: "customFontsImport.*.name",
      required: false,
    },
  ],
});
const styleContextRelationField = (valField) => ({
  widget: "relation",
  required: true,
  collection: "stylesConfig",
  file: "brand",
  value_field: `${valField}.*.name`,
});

const commonCollectionFields = [
  {
    name: "lang",
    label: "Language",
    widget: "hidden",
    default: "{{locale}}",
    i18n: true,
  },
  {
    name: "createdAt",
    label: "Created At",
    widget: "hidden",
    default: "{{datetime}}",
    i18n: true,
  },
  {
    name: "uuid",
    label: "UUID",
    widget: "hidden",
    default: "{{uuid_short}}",
    i18n: true,
  },
  {
    name: "localizationKey",
    label: "Localization Key",
    widget: "hidden",
    default: "{{uuid_short}}",
    i18n: "duplicate",
  },
];

const mostCommonMarkdownCollectionConfig = {
  i18n: true,
  folder: `${CONTENT_DIR}`,
  extension: "md",
  format: "yaml-frontmatter",
  create: true,
  identifier_field: "name",
  summary: "{{name}}",
  sortable_fields: {
    fields: ["name"],
    default: {
      field: "name",
      direction: "ascending",
    },
  },
};

class CmsConfig {
  data() {
    return {
      layout: false,
      permalink: "/admin/config.json",
      lang: "en",
    };
  }
  render(data) {
    const fontsourceFonts = (data.fontServices?.fontsource?.fonts || []).map(
      ({ family: value }) => ({ value, label: value })
    );

    const globalSettingsSingleton = {
      name: "globalSettings",
      label: "Global Settings",
      icon: "settings",
      file: `${CONTENT_DIR}/_data/globalSettings.yaml`,
      // format: "yaml",
      fields: [
        {
          name: "siteName",
          label: "Site Name",
          widget: "string",
        },
        {
          name: "productionUrl",
          label: "Production URL",
          widget: "string",
          // TODO: add pattern validation
          // prettier-ignore
          // pattern: [
          //   "^https?://[\\w\\-._~:/?#[\\]@!$&'()*+,;=%]+$",
          //   "Must be a URL starting with http:// or https://",
          // ],
        },
        {
          name: "logo",
          label: "Logo",
          widget: "image",
          required: false,
        },
        {
          name: "htmlHead",
          label: "HTML Head",
          widget: "code",
          required: false,
          // TODO: default-language not working
          default_language: "html",
          output_code_only: true,
          allow_language_selection: false,
        },
        {
          name: "cssHead",
          label: "Internal Styles (CSS)",
          widget: "code",
          required: false,
          default_language: "css",
          output_code_only: true,
          allow_language_selection: false,
        },
        {
          name: "languages",
          label: "Languages",
          hint: "❗️ Re-build your site to see your changes here",
          widget: "list",
          required: true,
          collapsed: true,
          allow_reorder: true,
          summary:
            "{{status | capitalize}}: {{code | upper}} - {{name}} -- Default for: {{isCmsDefault | ternary('CMS', '')}} {{isWebsiteDefault | ternary('Website', '')}}",
          fields: [
            {
              name: "code",
              label: "Language Code",
              widget: "string",
              required: true,
            },
            {
              name: "name",
              label: "Language Name",
              widget: "string",
              required: true,
            },
            {
              name: "customUrlPrefix",
              label: "Custom URL Prefix",
              widget: "object",
              collapsed: false,
              required: false,
              // summary: "Position: {{fields.order}} | Nav Title: {{fields.title}}",
              fields: [
                {
                  name: "prefix",
                  label: "URL Prefix",
                  widget: "string",
                  required: false,
                },
              ],
            },
            {
              name: "status",
              label: "Status",
              widget: "select",
              default: "published",
              required: true,
              options: [
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
                { value: "inactive", label: "Inactive" },
              ],
            },
            {
              name: "isCmsDefault",
              label: "Is CMS Default",
              hint: "Defaults to the first language of the list",
              widget: "boolean",
              required: true,
              default: false,
            },
            {
              name: "isWebsiteDefault",
              label: "Is Website Default",
              hint: "Defaults to the first language of the list",
              widget: "boolean",
              required: true,
              default: false,
            },
          ],
        },
        {
          name: "collections",
          label: "Active Collections",
          widget: "select",
          multiple: true,
          required: false,
          // TODO: populate this from existing collection definitions
          // TODO: more customization on collections
          options: ["articles", "people"],
        },
      ],
    };

    const stylesConfigCollection = {
      // ...mostCommonMarkdownCollectionConfig,
      // i18n: false,
      icon: "brush",
      name: "stylesConfig",
      label: "Styles Config",
      editor: { preview: false },
      i18n: false,
      files: [
        {
          name: "brand",
          label: "Brand",
          icon: "brand_family",
          file: `${CONTENT_DIR}/_data/brand.yaml`,
          // format: "yaml",
          i18n: false,
          fields: [
            {
              name: "ctxCssImport",
              label: "Auto ctx.css Import",
              widget: "object",
              required: false,
              collapsed: true,
              default: {
                filename: "ctx.css",
              },
              fields: [
                {
                  name: "filename",
                  label: "Output Filename",
                  widget: "string",
                  required: true,
                  default: "ctx.css",
                },
              ],
            },
            {
              name: "widthsContexts",
              label: "Widths Contexts",
              label_singular: "Widths Context",
              widget: "list",
              required: false,
              collapsed: true,
              allow_reorder: true,
              summary:
                "{{name}}:  [Max width '{{max}}', Prose width '{{prose}}']",
              hint: "The first context is used as the default",
              default: [{ name: "main", max: "80rem", prose: "50rem" }],
              fields: [
                { name: "name", label: "Name", widget: "string", required: true }, // prettier-ignore
                { name: "max", label: "Max Width", widget: "string", required: true, default: '80rem' }, // prettier-ignore
                { name: "prose", label: "Prose Width", widget: "string", required: true, default: '50rem' }, // prettier-ignore
              ],
            },
            {
              name: "fontStacksContexts",
              label: "Font Stacks Contexts",
              label_singular: "Font Stack Context",
              widget: "list",
              required: false,
              collapsed: true,
              allow_reorder: true,
              summary: `
              {{name}}:
              BODY: {{body.custom}} {{body.native}} //
              HEADINGS: {{heading.custom}} {{heading.native}} //
              CODE: {{code.custom}} {{code.native}}`,
              hint: "Select your preferred font stack for every type of text. Prefer only native font stacks for performance reasons. The first values are used as the defaults.",
              // prettier-ignore
              default: [{ name: "main", body: { native: "system-ui" }, heading: { native: "system-ui" }, code: { native: "monospace-code" }}],
              fields: [
                { name: "name", label: "Name", widget: "string", required: true }, // prettier-ignore
                { name: "body", label: "Body Text Font", ...fontStackDefinitionField("system-ui") }, // prettier-ignore
                { name: "heading", label: "Heading Text Font", ...fontStackDefinitionField("system-ui") }, // prettier-ignore
                { name: "code", label: "Code Text Font", ...fontStackDefinitionField("monospace-code") }, // prettier-ignore
              ],
            },
            {
              name: "customFontsImport",
              label: "Custom Fonts Import",
              widget: "list",
              required: false,
              collapsed: true,
              summary:
                "[{{name}}] - '{{source.name}}' ({{source.type}}): {{source.weights}} {{source.styles}} {{source.subsets}}",
              fields: [
                // NOTE: Not sure I need this
                {
                  name: "name",
                  label: "Font Internal Name",
                  widget: "string",
                  required: true,
                },
                {
                  name: "source",
                  label: "Source Service",
                  widget: "object",
                  required: true,
                  collapsed: false,
                  summary:
                    "'{{name}}' ({{type}}): {{weights}} {{styles}} {{subsets}}",
                  types: [
                    {
                      name: "fontsource",
                      label: "Fontsource",
                      widget: "object",
                      required: true,
                      collapsed: "auto",
                      fields: [
                        {
                          name: "name",
                          label: "Font Name",
                          widget: "select",
                          required: true,
                          options: fontsourceFonts,
                          hint: "Select a font from https://fontsource.org/; IMPORTANT NOTE: All fonts don't have all weights, styles, subsets available.",
                        },
                        {
                          name: "weights",
                          label: "Font Weights",
                          widget: "select",
                          multiple: true,
                          required: true,
                          dropdown_threshold: 10,
                          hint: "Default to all selected",
                          default: ["400"],
                          options: [
                            "100",
                            "200",
                            "300",
                            "400",
                            "500",
                            "600",
                            "700",
                            "800",
                            "900",
                          ],
                        },
                        {
                          name: "styles",
                          label: "Font Styles",
                          widget: "select",
                          multiple: true,
                          required: true,
                          default: ["normal"],
                          options: ["normal", "italic"],
                        },
                        {
                          name: "subsets",
                          label: "Font Subsets",
                          widget: "select",
                          multiple: true,
                          required: true,
                          default: ["latin"],
                          dropdown_threshold: 10,
                          options: [
                            "latin",
                            "cyrillic",
                            "greek",
                            "vietnamese",
                            "latin-ext",
                            "cyrillic-ext",
                            "greek-ext",
                            "vietnamese-ext",
                            "math",
                            "symbols",
                          ],
                        },
                        // TODO: HERE ! Subsets
                        // widths: [62.5, 125],
                        // variable: {
                        //   wght: { default: '400', min: '100', max: '900', step: '100' },
                        //   wdth: { default: '100', min: '50', max: '200', step: '10' },
                        //   slnt: { default: '0', min: '-20', max: '20', step: '1' },
                        // },
                        // preferStatic: true, // Prefer static font files over variable
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "typeScales",
              label: "Fluid Type Scales",
              label_singular: "Fluid Type Scale",
              widget: "list",
              required: false,
              collapsed: true,
              allow_reorder: true,
              summary:
                "Type Scale '{{name}}'  [Font Size '{{minFontSize}} - {{maxFontSize}}', Type Scale '{{minTypeScale}} - {{maxTypeScale}}']",
              hint: "Visualize at https://utopia.fyi/type/calculator/. The first type scale is used as the default", // prettier-ignore
              default: [{ name: "main", minFontSize: 18, maxFontSize: 20, minTypeScale: 1.2, maxTypeScale: 1.25 }], // prettier-ignore
              fields: [
                { name: "name", label: "Type Scale Name", widget: "string", required: true }, // prettier-ignore
                { name: "minFontSize", label: "Min Font Size (px)", widget: "number", value_type: "int", required: true, default: 18 }, // prettier-ignore
                { name: "maxFontSize", label: "Max Font Size (px)", widget: "number", value_type: "int", required: true, default: 20 }, // prettier-ignore
                { name: "minTypeScale", label: "Min Type Scale", widget: "number", value_type: "float", required: true, default: 1.2 }, // prettier-ignore
                { name: "maxTypeScale", label: "Max Type Scale", widget: "number", value_type: "float", required: true, default: 1.25 }, // prettier-ignore
                // prettier-ignore
                { name: "advanced", label: "Advanced Options", widget: "object", required: false, collapsed: true, fields: [ // prettier-ignore
                  { name: "minWidth", label: "Min Width (px)", widget: "number", value_type: "int", required: true, default: 360 }, // prettier-ignore
                  { name: "maxWidth", label: "Max Width (px)", widget: "number", value_type: "int", required: true, default: 1240 }, // prettier-ignore
                  { name: "positiveSteps", label: "Positive Steps", widget: "number", value_type: "int", required: true, default: 6 }, // prettier-ignore
                  { name: "negativeSteps", label: "Negative Steps", widget: "number", value_type: "int", required: true, default: 2 }, // prettier-ignore
                  { name: "prefix", label: "Prefix", widget: "string", required: true, default: 'step' }, // prettier-ignore
                  { name: "relativeTo", label: "Relative To", widget: "select", required: true, default: 'viewport-width', options: ['viewport-width', 'container'] }, // prettier-ignore
                ]},
              ],
            },
            {
              name: "colors",
              label: "Colors",
              label_singular: "Color",
              widget: "list",
              required: false,
              collapsed: true,
              allow_reorder: true,
              summary: "{{name}}: {{value}}",
              hint: "Colors to be used across the website, in palettes or otherwise. ❗️Save the file for new colors to appear in the palette selection.",
              fields: [
                {
                  name: "name",
                  label: "Name",
                  widget: "string",
                  required: true,
                },
                {
                  name: "value",
                  label: "Color",
                  widget: "color",
                  required: true,
                },
              ],
            },
            {
              name: "palettes",
              label: "Color Palettes",
              label_singular: "Color Palette",
              widget: "list",
              required: false,
              collapsed: true,
              allow_reorder: true,
              summary:
                "Palette '{{name}}'  [Text '{{text}}', Background '{{bg}}']",
              hint: "The first palette is used as the default",
              fields: [
                {
                  name: "name",
                  label: "Palette Name",
                  widget: "string",
                  required: true,
                },
                // prettier-ignore
                { name: "text", label: "Text Color", ...brandColorField, required: true }, // prettier-ignore
                { name: "bg", label: "Background Color", ...brandColorField, required: true }, // prettier-ignore
                { name: "border", label: "Border Color", ...brandColorField }, // prettier-ignore
                { name: "outline", label: "Outline Color", ...brandColorField }, // prettier-ignore
                { name: "text-decoration", label: "Text Decoration Color", ...brandColorField }, // prettier-ignore
                { name: "text--marker", label: "Text Marker Color", ...brandColorField }, // prettier-ignore
                { name: "text-emphasis", label: "Text Emphasis Color", ...brandColorField }, // prettier-ignore
                { name: "text--selection", label: "Text Selection Color", ...brandColorField }, // prettier-ignore
                { name: "bg--selection", label: "Background Selection Color", ...brandColorField }, // prettier-ignore
                { name: "shadow", label: "Shadow Color", ...brandColorField }, // prettier-ignore
                { name: "caret", label: "Caret Color", ...brandColorField }, // prettier-ignore
                { name: "column-rule", label: "Column Rule Color", ...brandColorField }, // prettier-ignore
                { name: "fill", label: "Fill Color", ...brandColorField }, // prettier-ignore
                { name: "stroke", label: "Stroke Color", ...brandColorField }, // prettier-ignore
                { name: "outline--focus", label: "Outline Focus Color", ...brandColorField }, // prettier-ignore
                {
                  name: "advanced",
                  label: "Advanced Options",
                  widget: "object",
                  collapsed: "auto",
                  required: false,
                  fields: [
                    { name: "text__a", label: "Link Text  Color", ...brandColorField }, // prettier-ignore
                    { name: "bg__a", label: "Link Background Color", ...brandColorField }, // prettier-ignore
                    { name: "text__a--hover", label: "Link Text Hover Color", ...brandColorField }, // prettier-ignore
                    { name: "bg__a--hover", label: "Link Background Hover Color", ...brandColorField }, // prettier-ignore
                    { name: "text__button", label: "Button Text Color", ...brandColorField }, // prettier-ignore
                    { name: "bg__button", label: "Button Background Color", ...brandColorField }, // prettier-ignore
                    { name: "text__button--hover", label: "Button Text Hover Color", ...brandColorField }, // prettier-ignore
                    { name: "bg__button--hover", label: "Button Background Hover Color", ...brandColorField }, // prettier-ignore
                    { name: "text__button--disabled", label: "Button Text Disabled Color", ...brandColorField }, // prettier-ignore
                    { name: "bg__button--disabled", label: "Button Background Disabled Color", ...brandColorField }, // prettier-ignore
                    { name: "text__button--disabled", label: "Button Text Disabled Color", ...brandColorField }, // prettier-ignore
                    { name: "bg__button--disabled", label: "Button Background Disabled Color", ...brandColorField }, // prettier-ignore
                    { name: "icon-fill", label: "Icon Fill Color", ...brandColorField }, // prettier-ignore
                    { name: "icon-stroke", label: "Icon Stroke Color", ...brandColorField }, // prettier-ignore
                    { name: "text__code", label: "Code Text Color", ...brandColorField }, // prettier-ignore
                    { name: "bg__code", label: "Code Background Color", ...brandColorField }, // prettier-ignore
                    { name: "border__code", label: "Code Border Color", ...brandColorField }, // prettier-ignore
                    { name: "text__mark", label: "Mark Text Color", ...brandColorField }, // prettier-ignore
                    { name: "bg__mark", label: "Mark Background Color", ...brandColorField }, // prettier-ignore
                    { name: "border__mark", label: "Mark Border Color", ...brandColorField }, // prettier-ignore
                    { name: "track-color", label: "Scrollbar Track Color", ...brandColorField }, // prettier-ignore
                    { name: "thumb-color", label: "Scrollbar Thumb Color", ...brandColorField }, // prettier-ignore
                  ],
                },
              ],
            },
            {
              name: "styleContexts",
              label: "Style Contexts",
              label_singular: "Style Context",
              widget: "list",
              required: false,
              collapsed: true,
              allow_reorder: true,
              summary:
                "{{name}}: {{widthsContext}} | {{fontStacksContext}} | {{typeScale}} | {{palette}}",
              hint: "You can group styles in different contexts to be used across the website using a class name like '.ctx-[name]'.",
              default: [{ name: "main", value: "ctx" }],
              fields: [
                {
                  name: "name",
                  label: "Name",
                  widget: "string",
                  required: true,
                  hint: "Used to generate the class name associated with this context (e.g. '.ctx-main')",
                },
                // prettier-ignore
                { label: "Widths Context", name: "widthsContext", ...styleContextRelationField("widthsContexts") }, // prettier-ignore
                { label: "Font Stacks Context", name: "fontStacksContext", ...styleContextRelationField("fontStacksContexts") }, // prettier-ignore
                { label: "Type Scale", name: "typeScale", ...styleContextRelationField("typeScales") }, // prettier-ignore
                { label: "Palette", name: "palette", ...styleContextRelationField("palettes") }, // prettier-ignore
              ],
            },
          ],
        },
      ],
    };
    const stylesheetsCollection = {
      name: "stylesheets",
      label: "Stylesheets",
      label_singular: "Stylesheet",
      path: "{{slug}}",
      slug: "{{fields._slug}}",
      icon: "css",
      folder: `${CONTENT_DIR}/_styles`,
      extension: "css",
      format: "yaml-frontmatter",
      create: true,
      // MEDIAS
      media_folder: `/${CONTENT_DIR}/_images`,
      public_folder: "/_images",
      sortable_fields: {
        fields: ["slug"],
        default: {
          field: "slug",
          direction: "ascending",
        },
      },
      fields: [
        {
          name: "body",
          label: "Content",
          widget: "code",
          required: false,
          output_code_only: true,
          default_language: "css",
          allow_language_selection: false,
        },
      ],
    };

    const dataFilesCollection = {
      // ...mostCommonMarkdownCollectionConfig,
      // i18n: false,
      icon: "table_edit",
      name: "dataFiles",
      label: "Data Files",
      editor: { preview: false },
      i18n: true,
      files: [
        {
          name: "translatedData",
          label: "Translated Data",
          icon: "translate",
          file: `${CONTENT_DIR}/{{locale}}/{{locale}}.yaml`,
          // format: "yaml",
          i18n: true,
          fields: [tagsListField, varsField, dataListField],
        },
      ],
    };

    const advancedDataFilesCollection = {
      // ...mostCommonMarkdownCollectionConfig,
      // i18n: false,
      icon: "hardware",
      name: "advancedDataFiles",
      label: "Advanced Data Files",
      editor: { preview: false },
      i18n: true,
      files: [
        {
          name: "metadata",
          label: "Default Metadata",
          icon: "page_info",
          file: `${CONTENT_DIR}/_data/metadata.yaml`,
          // format: "yaml",
          fields: [
            {
              name: "image",
              label: "Image",
              widget: "image",
            },
          ],
        },
        {
          name: "redirects",
          label: "Global Redirects",
          icon: "call_split",
          file: `${CONTENT_DIR}/_files/_redirects`,
          // format: "yaml",
          fields: [
            {
              name: "body",
              label: "Redirects",
              widget: "code",
              required: false,
              output_code_only: true,
              allow_language_selection: false,
            },
          ],
        },
        {
          name: "headers",
          label: "Headers",
          icon: "contract",
          file: `${CONTENT_DIR}/_files/_headers`,
          // format: "yaml",
          fields: [
            {
              name: "body",
              label: "Headers",
              widget: "code",
              required: false,
              output_code_only: true,
              allow_language_selection: false,
            },
          ],
        },
        {
          name: "dataFiles",
          label: "Data Files",
          icon: "code",
          file: `${CONTENT_DIR}/_data/none.yaml`,
          media_folder: `/${CONTENT_DIR}/_data`,
          public_folder: "/_data",
          fields: [],
        },
        {
          name: "publicFiles",
          label: "Public Files",
          icon: "attach_file",
          file: `${CONTENT_DIR}/_files/none.yaml`,
          media_folder: `/${CONTENT_DIR}/_files`,
          public_folder: "/_files",
          fields: [],
        },
      ],
    };

    const pageLayoutsCollection = {
      name: "layouts",
      label: "Page Layouts",
      label_singular: "Page Layout",
      path: "{{slug}}",
      slug: "{{fields._slug}}",
      icon: "edit_document",
      folder: `${CONTENT_DIR}/_layouts`,
      extension: "njk",
      format: "yaml-frontmatter",
      create: true,
      // MEDIAS
      media_folder: `/${CONTENT_DIR}/_images`,
      public_folder: "/_images",
      sortable_fields: {
        fields: ["slug"],
        default: {
          field: "slug",
          direction: "ascending",
        },
      },
      fields: [
        {
          name: "body",
          label: "Layout Markup",
          hint: "Page layout markup as Nunjucks flavored HTML",
          widget: "code",
          language: "html",
          required: false,
          output_code_only: true,
          allow_language_selection: false,
          default: `<!DOCTYPE html>
<html lang="{{lang or 'en'}}" class="no-js">
  <head>
    {% partial "_html-head-default.md" %}
    {% getBundle "html", "head" %}
  </head>
  <body>
    <!-- Navigation -->
    {% partial "_main-nav.md", {}, "njk" %}

    <!-- Content -->
    {% partial "_main-content.md" %}

    <!-- Footer -->
    {% partial '_footer.md' %}
  </body>
</html>
`,
        },
      ],
    };
    const sectionLayoutsCollection = {
      name: "sectionLayouts",
      label: "Section Layouts",
      label_singular: "Section Layout",
      path: "{{slug}}",
      slug: "{{fields._slug}}",
      icon: "slide_library",
      folder: `${CONTENT_DIR}/_partials`,
      extension: "njk",
      format: "yaml-frontmatter",
      create: true,
      // MEDIAS
      media_folder: `/${CONTENT_DIR}/_images`,
      public_folder: "/_images",
      sortable_fields: {
        fields: ["slug"],
        default: {
          field: "slug",
          direction: "ascending",
        },
      },
      fields: [
        {
          name: "body",
          label: "Layout Markup",
          hint: "Section layout markup as Nunjucks flavored HTML",
          widget: "code",
          language: "html",
          required: false,
          output_code_only: true,
          allow_language_selection: false,
        },
      ],
    };
    const partialsCollection = {
      name: "partials",
      label: "Partials",
      label_singular: "Partial",
      path: "{{slug}}",
      slug: "{{fields._slug}}",
      icon: "brick",
      folder: `${CONTENT_DIR}/_partials`,
      extension: "md",
      format: "yaml-frontmatter",
      create: true,
      // MEDIAS
      media_folder: `/${CONTENT_DIR}/_images`,
      public_folder: "/_images",
      sortable_fields: {
        fields: ["slug"],
        default: {
          field: "slug",
          direction: "ascending",
        },
      },
      fields: [
        {
          name: "body",
          label: "Content",
          widget: "markdown",
          required: false,

          // widget: "code",
          // required: false,
          // output_code_only: true,
          // allow_language_selection: false,
        },
      ],
    };
    // const sectionFields = [
    //   ...commonCollectionFields,
    //   {
    //     name: "name",
    //     label: "Name",
    //     widget: "string",
    //     required: true,
    //     i18n: "duplicate",
    //   },
    //   {
    //     name: "blocks",
    //     label: "Blocks",
    //     widget: "list",
    //     required: false,
    //     i18n: true,
    //     types: [
    //       {
    //         name: "images",
    //         label: "Images",
    //         widget: "object",
    //         required: false,
    //         fields: [
    //           {
    //             name: "images",
    //             label: "Images",
    //             widget: "image",
    //             required: false,
    //             allow_multiple: true,
    //           },
    //         ],
    //       },
    //       {
    //         name: "markdown",
    //         label: "Markdown",
    //         widget: "object",
    //         required: false,
    //         fields: [
    //           {
    //             name: "value",
    //             label: "Value",
    //             widget: "markdown",
    //             required: false,
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     name: "styles",
    //     label: "Styles",
    //     widget: "code",
    //     required: false,
    //     output_code_only: true,
    //     allow_language_selection: false,
    //     language: "css",
    //   },
    // ];
    // const sectionsCollection = {
    //   name: "sections",
    //   label: "Sections",
    //   label_singular: "Section",
    //   icon: "add_column_right",
    //   slug: "{{name}}", // This allows the slug to be localized
    //   folder: `${CONTENT_DIR}`,
    //   path: "sections/{{slug}}",
    //   i18n: { structure: "single_file" },
    //   extension: "yaml",
    //   create: true,
    //   identifier_field: "name",
    //   summary: "{{name}}",
    //   sortable_fields: {
    //     fields: ["name"],
    //     default: {
    //       field: "name",
    //       direction: "ascending",
    //     },
    //   },
    //   // MEDIAS
    //   media_folder: `/${CONTENT_DIR}/_images`,
    //   public_folder: "/_images",
    //   fields: sectionFields,
    // };
    const pageFields = [
      ...commonCollectionFields,
      // { name: 'collection', label: 'Collection', widget: 'object', types: [
      //   { name: 'pages', label: 'Pages', widget: 'object', fields: [
      //     { name: 'pages', label: 'Pages', widget: 'relation', collection: 'pages' },
      //   ]},
      //   { name: 'articles', label: 'Articles', widget: 'object', fields: [
      //     { name: 'articles', label: 'Articles', widget: 'relation', collection: 'articles' },
      //   ]},
      // ]},
      statusField,
      generatePageField,
      pageLayoutRelationField,
      {
        name: "name",
        label: "Page Name",
        widget: "string",
        required: true,
        i18n: true,
      },
      // {
      //   name: "currentSlug",
      //   label: "Current slug",
      //   widget: "compute",
      //   value: "{{fields.name}}",
      //   i18n: true,
      // },
      // { name: "path", label: "Page URL path", widget: "string", required: true, pattern: ['^(?![\s\/\-]*$)(?!\/)[a-z0-9\/\-]*[a-z0-9\-]$', "URL must contain only letters, numbers, dashes, and forward slashes (not starting or ending with a slash or dash), and at least one letter or number"], hint: "URL-friendly slug or path (may contain '/' and '-'). NOTE: The homepage must be called 'index'"},
      bodyMarkdownField,
      eleventyNavigationField,
      simpleMetadataField,
      pagePreviewField,
      tagsField,
      varsField,
      dataListField,
    ];
    const pagesCollection = {
      ...mostCommonMarkdownCollectionConfig,
      name: "pages",
      label: "Pages",
      label_singular: "Page",
      icon: "description",
      thumbnail: ["pagePreview.image.src", "metadata.image.src"],
      path: "pages/{{slug}}",
      // TODO: check if it works
      slug: "{{name | localize}}", // This allows the slug to be localized
      // slug: "{{fields._slug | localize}}",
      summary:
        "{{name}} {{eleventyNavigation.order | ternary(' (nav ', '')}}{{eleventyNavigation.order}}{{eleventyNavigation.order | ternary(')', '')}}",
      sortable_fields: {
        fields: [
          "eleventyNavigation.parent",
          "name",
          // "eleventyNavigation.add",
          "eleventyNavigation.order",
        ],
        default: {
          field: "eleventyNavigation.order",
          direction: "ascending",
        },
      },
      // view_filters: [
      //   {
      //     label: "Navigation",
      //     field: "eleventyNavigation.add",
      //     pattern: true,
      //   },
      // ],
      // MEDIAS
      media_folder: `/${CONTENT_DIR}/_images`,
      public_folder: "/_images",
      fields: pageFields,
      index_file: {
        name: "pages",
        label: "Page Data",
        format: "yaml",
        icon: "home",
        editor: { preview: false },
        fields: [
          {
            name: "layout",
            label: "Layout",
            widget: "string",
            default: "base",
            required: false,
          },
        ],
      },
    };
    const articleFields = [
      ...commonCollectionFields,
      statusField,
      generatePageField,
      pageLayoutRelationField,
      {
        name: "name",
        label: "Article Name",
        widget: "string",
        required: true,
        i18n: true,
      },
      bodyMarkdownField,
      eleventyNavigationField,
      simpleMetadataField,
      pagePreviewField,
      tagsField,
      varsField,
      dataListField,
    ];
    const articlesCollection = {
      ...mostCommonMarkdownCollectionConfig,
      // icon: "article",
      icon: "ink_pen",
      name: "articles",
      label: "Articles",
      label_singular: "Article",
      // description: "Articles of the website",
      path: "articles/{{slug}}",
      media_folder: `/${CONTENT_DIR}/_images`,
      public_folder: "/_images",
      fields: articleFields,
    };
    const personFields = [
      ...commonCollectionFields,
      statusField,
      generatePageField,
      pageLayoutRelationField,
      {
        name: "name",
        label: "Name",
        widget: "string",
        required: true,
        i18n: "duplicate",
      },
      bodyMarkdownField,
      eleventyNavigationField,
      simpleMetadataField,
      pagePreviewField,
      tagsField,
      varsField,
      dataListField,
    ];
    const peopleCollection = {
      ...mostCommonMarkdownCollectionConfig,
      // icon: "article",
      icon: "person",
      name: "people",
      label: "People",
      label_singular: "Person",
      path: "people/{{slug}}",
      media_folder: `/${CONTENT_DIR}/_images`,
      public_folder: "/_images",
      fields: personFields,
    };

    // const rawFilesCollection = {
    //   // ...mostCommonMarkdownCollectionConfig,
    //   // i18n: false,
    //   icon: "code",
    //   name: "files",
    //   label: "Files",
    //   description: "Files of the website",

    //   // label_singular: "Data",
    //   // path: "_data/{{slug}}",
    //   // media_folder: `/${CONTENT_DIR}/_data`,
    //   // public_folder: "/_data",
    //   // fields: [...commonCollectionFields],
    //   files: [
    //     {
    //       name: "rawFiles",
    //       label: "Raw Files",
    //       file: `${CONTENT_DIR}/_files/none.yaml`,
    //       media_folder: `/${CONTENT_DIR}/_files`,
    //       public_folder: "/_files",
    //       fields: [],
    //     },
    //     // {
    //     //   name: "dataFiles",
    //     //   label: "Data Files",
    //     //   file: `${CONTENT_DIR}/_data/none.yaml`,
    //     //   media_folder: `/${CONTENT_DIR}/_data`,
    //     //   public_folder: "/_data",
    //     //   fields: [],
    //     // },
    //   ],
    // };
    // const filesCollection = {
    //   ...mostCommonMarkdownCollectionConfig,
    //   name: "files",
    //   label: "Files",
    //   label_singular: "File",
    //   // description: "Articles of the website",
    //   path: "files/{{slug}}",
    //   media_folder: `/${CONTENT_DIR}/_files`,
    //   public_folder: "/_files",
    //   fields: [...commonCollectionFields],
    // };
    // const dataFilesCollection = {
    //   ...mostCommonMarkdownCollectionConfig,
    //   create: false,
    //   extension: "yaml",
    //   name: "dataFiles",
    //   label: "Data Files",
    //   label_singular: "Data File",
    //   path: "_data/{{slug}}",
    //   media_folder: `/${CONTENT_DIR}/_data`,
    //   public_folder: "/_data",
    //   fields: [...commonCollectionFields],
    // };

    const optionalCollections = {
      articles: articlesCollection,
      people: peopleCollection,
    };
    const selectedOptionalCollections = (selectedCollections || [])
      .map((collectionName) => optionalCollections[collectionName])
      .filter(Boolean);

    const generalConfig = {
      backend: {
        name: CMS_BACKEND,
        repo: CMS_REPO,
        branch: CMS_BRANCH,
        base_url: CMS_AUTH_URL,
        automatic_deployments: false, // Deprecated but keeping it for a while until I'm sure everyone is upgraded
        skip_ci: true,
      },
      // TODO: configure data formating: https://github.com/sveltia/sveltia-cms?tab=readme-ov-file#controlling-data-output
      output: {
        omit_empty_optional_fields: true,
        encode_file_path: true, // true to URL-encode file paths for File/Image fields
        json: {
          indent_style: "space", // space or tab
          indent_size: 2,
        },
        yaml: {
          quote: "none", // none or single or double
          indent_size: 2,
        },
      },
      site_url: PROD_URL,
      display_url: DISPLAY_URL,
      // logo_url: "https://your-site.com/images/logo.svg",
      logo_url:
        "https://raw.githubusercontent.com/m4rrc0/poko-website-builder/3fbe32b2f8a00e5e2b1a8fff60d7772ace8e1820/assets/favicon-POKO-01.png",
      // MEDIAS
      media_folder: `/${CONTENT_DIR}/_images`,
      public_folder: "/_images",
      media_libraries: {
        stock_assets: { providers: [] },
        default: {
          config: {
            slugify_filename: true, // default: false
            max_file_size: 10000000,
            transformations: {
              raster_image: {
                format: "webp",
                quality: 98,
                width: 2048,
                height: 2048,
              },
              svg: {
                optimize: true,
              },
            },
          },
        },
      },
      // I18N
      locale: "en", // Locale for the CMS admin ("en" or "jp" while in beta)
      i18n: {
        // multiple_folders - persists files in `<folder>/<locale>/<slug>.<extension>`
        // multiple_files - persists files in `<folder>/<slug>.<locale>.<extension>`
        // single_file - persists a single file in `<folder>/<slug>.<extension>`
        structure: "multiple_folders",
        locales,
        default_locale, // Defaults to the first locale in the list
        save_all_locales: false, // DEPRECATED: Replaced entirely by initial_locales. default: true // Allows for disabling a localization
        initial_locales: "default", // default: "all" // Allows for setting the initial locales
      },
      slug: {
        encoding: "ascii",
        clean_accents: true, // Transliterate accented characters to their closest ASCII equivalent
      },
      collections: [
        ...(mustSetup
          ? []
          : [
              pagesCollection,
              ...selectedOptionalCollections,
              { divider: true },
              partialsCollection,
              pageLayoutsCollection,
              sectionLayoutsCollection,
              { divider: true },
              stylesConfigCollection,
              stylesheetsCollection,
              { divider: true },
              dataFilesCollection,
              advancedDataFilesCollection,
              {
                divider: Boolean(
                  !mustSetup && data.userConfig.collections?.length
                ),
              },
              ...data.userConfig.collections,
            ]),
      ],
      singletons: [
        // ...(mustSetup ? [] : [styleTokensSingleton]),
        globalSettingsSingleton,
        { divider: Boolean(!mustSetup && data.userConfig.singletons?.length) },
        ...(mustSetup ? [] : [...data.userConfig.singletons]),
      ],
    };

    return JSON.stringify(generalConfig, null, isDev ? 2 : 0);
  }
}

export default async function (eleventyConfig, pluginOptions) {
  eleventyConfig.versionCheck(">=3.0.0-alpha.1");

  let userConfig = {
    collections: [],
    singletons: [],
  };

  try {
    const uc = await import(`${WORKING_DIR_ABSOLUTE}/_config/index.js`);
    userConfig = {
      ...userConfig,
      ...uc,
    };
  } catch (error) {
    console.error("Could not import user config\n", error);
  }

  eleventyConfig.addTemplate("admin/config.11ty.js", CmsConfig, { userConfig });
}

// Example Blog Collection
// fields: # The fields for each document
// - name: "blog" # Used in routes, e.g., /admin/collections/blog
// label: "Blog" # Used in the UI
// folder: "${CONTENT_DIR}/blog" # The path to the folder where the documents are stored
// create: true # Allow users to create new documents in this collection
// slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
// fields: # The fields for each document, usually in front matter
// - { label: "Layout", name: "layout", widget: "hidden", default: "blog" }
// - { label: "Title", name: "title", widget: "string", required: true }
// - { label: "Publish Date", name: "date", widget: "datetime", required: false }
// - { label: "Featured Image", name: "thumbnail", widget: "image", required: false }
// - { label: "Rating (scale of 1-5)", name: "rating", widget: "number", required: false }
// - { label: "Body", name: "body", widget: "markdown", required: false }

// ADVANCED LINK FIELD WIP
// {
//   name: 'advancedLink',
//   label: 'Advanced Link',
//   required: false,
//   widget: 'object',
//   types: [
//     { name: 'internal', label: 'Internal', widget: 'object', fields: [
//       { name: 'collection', label: 'Collection', widget: 'object', types: [
//         { name: 'pages', label: 'Pages', widget: 'relation', collection: 'pages', search_fields: ['name'], value_field: 'name', display_fields: ['name'] },
//         { name: 'articles', label: 'Articles', widget: 'relation', collection: 'articles', search_fields: ['name'], value_field: 'name', display_fields: ['name'] },
//       ]},
//       // { name: 'href', label: 'Href', widget: 'string' },
//       { name: 'target', label: 'Target', widget: 'select', options: [
//         { value: '_self', label: 'Self' },
//         { value: '_blank', label: 'Blank' }
//       ] },
//       { name: 'rel', label: 'Rel', widget: 'select', options: [
//         { value: 'noopener', label: 'Noopener' },
//         { value: 'noreferrer', label: 'Noreferrer' }
//       ] },
//       { name: 'class', label: 'Class', widget: 'string' }
//     ]},
//     { name: 'external', label: 'External', widget: 'object', fields: [
//       { name: 'url', label: 'URL', widget: 'string' },
//       { name: 'target', label: 'Target', widget: 'select', options: [
//         { value: '_self', label: 'Self' },
//         { value: '_blank', label: 'Blank' }
//       ] },
//       { name: 'rel', label: 'Rel', widget: 'select', options: [
//         { value: 'noopener', label: 'Noopener' },
//         { value: 'noreferrer', label: 'Noreferrer' }
//       ] },
//       { name: 'class', label: 'Class', widget: 'string' }
//     ]},
//     { name: 'file', label: 'File', widget: 'object', fields: [
//       { name: 'file', label: 'File', widget: 'object', fields: [
//         { name: 'discriminant', label: 'Discriminant', widget: 'select', options: [
//           { value: 'filesLibrary', label: 'Files Library' },
//           { value: 'local', label: 'Local' },
//           { value: 'external', label: 'External' }
//         ] },
//         { name: 'value', label: 'Value', widget: 'string' }
//       ] },
//       { name: 'target', label: 'Target', widget: 'select', options: [
//         { value: '_self', label: 'Self' },
//         { value: '_blank', label: 'Blank' }
//       ] },
//       { name: 'download', label: 'Download', widget: 'boolean' },
//       { name: 'hreflang', label: 'Hreflang', widget: 'string' },
//       { name: 'rel', label: 'Rel', widget: 'select', options: [
//         { value: 'noopener', label: 'Noopener' },
//         { value: 'noreferrer', label: 'Noreferrer' }
//       ] },
//       { name: 'class', label: 'Class', widget: 'string' }
//     ]},
//     { name: 'email', label: 'Email', widget: 'object', fields: [
//       { name: 'email', label: 'Email', widget: 'string' },
//       { name: 'subject', label: 'Subject', widget: 'string' },
//       { name: 'cc', label: 'CC', widget: 'string' },
//       { name: 'bcc', label: 'BCC', widget: 'string' },
//       { name: 'body', label: 'Body', widget: 'string' },
//       { name: 'target', label: 'Target', widget: 'select', options: [
//         { value: '_self', label: 'Self' },
//         { value: '_blank', label: 'Blank' }
//       ] },
//       { name: 'hreflang', label: 'Hreflang', widget: 'string' },
//       { name: 'rel', label: 'Rel', widget: 'select', options: [
//         { value: 'noopener', label: 'Noopener' },
//         { value: 'noreferrer', label: 'Noreferrer' }
//       ] },
//       { name: 'class', label: 'Class', widget: 'string' }
//     ]},
//     { name: 'phone', label: 'Phone', widget: 'object', fields: [
//       { name: 'phone', label: 'Phone', widget: 'string' },
//       { name: 'target', label: 'Target', widget: 'select', options: [
//         { value: '_self', label: 'Self' },
//         { value: '_blank', label: 'Blank' }
//       ] },
//       { name: 'hreflang', label: 'Hreflang', widget: 'string' },
//       { name: 'rel', label: 'Rel', widget: 'select', options: [
//         { value: 'noopener', label: 'Noopener' },
//         { value: 'noreferrer', label: 'Noreferrer' }
//       ] },
//       { name: 'class', label: 'Class', widget: 'string' }
//     ]}
//   ]
// },

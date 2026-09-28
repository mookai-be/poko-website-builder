const CONTENT_DIR = process.env.CONTENT_DIR || "_content";
const ELEVENTY_ROOT = process.env.ELEVENTY_ROOT;

const {
  spreadPageSetup,
  reviews,
  creativeWorks,
  // pages,
  // events,
  // articles,
  // commonCollectionFields,
  // statusField,
  // bodyMarkdownField,
  // generatePageField,
} = await import(
  `${ELEVENTY_ROOT}/src/config-11ty/plugins/cms-config/config.js`
);

// const pos = 4; // Just after page name field

// Insert after the "body" (content) field
const posReviewFields = reviews.fields.findIndex((f) => f.name === "body") + 1;
const posPortfolioFields =
  creativeWorks.fields.findIndex((f) => f.name === "body") + 1;

const additionalPortfolioFields = [
  {
    name: "gallery",
    label: "Galerie",
    widget: "image",
    required: false,
    multiple: true,
    i18n: "duplicate",
  },
];

const portfolioFields = [
  ...creativeWorks.fields.slice(0, posPortfolioFields),
  ...additionalPortfolioFields,
  // ...creativeWorks.fields.slice(posPortfolioFields), // if we keep all fields
  ...creativeWorks.fields.slice(posPortfolioFields + 2), // to remove `content` and `sections`
];

const reviewSignatureField = {
  name: "reviewSignature",
  label: "Signature",
  widget: "markdown",
  required: false,
  i18n: true,
};

const reviewFieldsWithPerson = [
  ...reviews.fields.slice(0, posReviewFields),
  reviewSignatureField,
  ...reviews.fields.slice(posReviewFields),
];

export const collections = [
  {
    ...creativeWorks,
    ...spreadPageSetup("portfolio"),
    label: "Portfolio",
    label_singular: "Portfolio",
    // icon: "theater_comedy",
    // folder: `${CONTENT_DIR}`,
    // path: "pages/{{slug}}",
    // media_folder: `/${CONTENT_DIR}/_images`,
    media_folder: `/${CONTENT_DIR}/_images/portfolio/{{slug}}`,
    public_folder: "/_images/portfolio/{{slug}}",
    view_groups: undefined,
    fields: portfolioFields,
  },
  {
    ...reviews,
    fields: reviewFieldsWithPerson,
  },
];

export const singletons = [];

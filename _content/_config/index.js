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
const pos = reviews.fields.findIndex((f) => f.name === "body") + 1;

const personNameField = {
  name: "personName",
  label: "Nom de la personne",
  widget: "markdown",
  required: false,
  i18n: true,
};

const reviewFieldsWithPerson = [
  ...reviews.fields.slice(0, pos),
  personNameField,
  ...reviews.fields.slice(pos),
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
    // fields: playFields,
  },
  {
    ...reviews,
    fields: reviewFieldsWithPerson,
  },
];

export const singletons = [];

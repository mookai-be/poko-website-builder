import { SRC_DIR_FROM_WORKING_DIR } from "../../env.config.js";

const { reviews } = await import(
  `../${SRC_DIR_FROM_WORKING_DIR}/config-11ty/plugins/cms-config/index.js`
);

const personNameField = {
  name: "personName",
  label: "Nom de la personne",
  widget: "markdown",
  required: false,
  i18n: true,
};

// Insert after the "body" (content) field
const pos = reviews.fields.findIndex((f) => f.name === "body") + 1;

const reviewFieldsWithPerson = [
  ...reviews.fields.slice(0, pos),
  personNameField,
  ...reviews.fields.slice(pos),
];

export const collections = [
  {
    ...reviews,
    fields: reviewFieldsWithPerson,
  },
];

export const singletons = [];

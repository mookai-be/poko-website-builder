// remove any lang prefix if present and leading/trailing slashes
function stripUrl(input, langPrefixRegex) {
  return input
    .replace(langPrefixRegex, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

function lookupTemplateTranslations(self = this, inputOptional, templates) {
  const input = inputOptional || self.ctx.page.url;
  // Avoid going through all templates if we have the right data available in ctx
  if (input === self.ctx.translationKey || input === self.ctx.page.url) {
    return self.ctx.templateTranslations;
  }

  const langPrefixes = self.ctx.languages.map((lang) => lang.prefix);
  const langPrefixRegex = new RegExp(`^\/*(${langPrefixes.join("|")})\/`);
  const cleanedInput = stripUrl(input, langPrefixRegex);
  const allTemplates = templates || self.ctx.collections.all || [];
  // Find matching template in any language
  const template = allTemplates.find((templ) => {
    // Match translationKey first
    if (templ.data.translationKey === cleanedInput) {
      return true;
    }
    // Then match url
    const cleanedTemplateUrl = stripUrl(templ.page.url, langPrefixRegex);
    if (cleanedTemplateUrl === cleanedInput) {
      return true;
    }

    return false;
  });
  // Retrieve the right translation and its URL
  const templateTranslations = template?.data?.templateTranslations;

  return templateTranslations;
}

// input can be a url (with or without lang prefix) or ideally a translationKey
// lang is optional and overwrites the current page's lang
export function locale_url(input, langOverride) {
  // const originalFilter = this.env.getFilter("locale_url_original");
  const lang = langOverride || this.page.lang;
  const templateTranslations = lookupTemplateTranslations(this, input);
  const urlMatch = templateTranslations?.find((translation) => {
    return translation.lang === lang;
  })?.url;

  return urlMatch;
}

// inclusionOption can be "all", "others", "self" or a lang code
export function locale_links(input, inclusionOption = "others") {
  const templateTranslations = lookupTemplateTranslations(this, input);

  if (inclusionOption === "all") {
    return templateTranslations;
  } else if (inclusionOption === "others") {
    return templateTranslations.filter((translation) => {
      return translation.lang !== this.page.lang;
    });
  } else if (inclusionOption === "self") {
    return templateTranslations.filter((translation) => {
      return translation.lang === this.page.lang;
    });
  } else if (
    typeof inclusionOption === "string" &&
    inclusionOption.length === 2
  ) {
    return templateTranslations.filter((translation) => {
      return translation.lang === inclusionOption;
    });
  }

  return templateTranslations;
}

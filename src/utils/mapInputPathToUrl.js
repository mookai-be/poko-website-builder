import { USER_DIR, languages } from "../../env.config.js";

const dirsToStrip = ["pages", USER_DIR];
const stripRegex = new RegExp(`^\/*(${dirsToStrip.join("|")})\/*`);

const languagePrefixesMap = languages
  .map((lang) => {
    if (typeof lang.customPrefix === "string") {
      return [lang.defaultPrefixRegex, lang.customPrefix];
    }
  })
  .filter(Boolean);

// for (const lang of globalSettings.languages) {
//   if (lang.customUrlPrefix) {
//     languagePrefixesToMap[lang.code] = lang.customUrlPrefix.prefix;
//   }
// }

export default function mapInputPathToUrl(filePathStem) {
  const unWrapped = filePathStem
    .replace(/^\/+/, "") // remove leading slashes (even multiple)
    .replace(/\/+$/, "") // remove trailing slash
    .replace(/\/index$/, ""); // remove trailing '/index'

  const formatted = unWrapped.replace(stripRegex, ""); // remove leading unwanted dir names (like 'pages')
  let unPrefixed = formatted;

  for (const [regex, prefix] of languagePrefixesMap) {
    if (regex.test(unPrefixed)) {
      unPrefixed = unPrefixed.replace(regex, prefix);
    }
  }

  const url = {};
  url.href = `/${unPrefixed}/`.replace(/\/+/g, "/"); // remove multiple slashes
  // url.pathname = `/${formatted}`.replace(/\/+/g, '/'); // remove multiple slashes
  url.pathname = url.href;
  url.permalink = url.href + "index";

  //   console.log({ formatted, languagePrefixesMap, unPrefixed, url });
  return url;
}

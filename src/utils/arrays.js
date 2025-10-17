import { sort } from "fast-sort";
// TODO: Memoize this function
// import memoize from "memoize";
import { tryMatchNestedVariable } from "./objects.js";

export function filterCollection(collection, filtersRaw) {
  const toInt = (value) => (isNaN(parseInt(value)) ? 1 : parseInt(value));
  const toArrayOfStrings = (value) => {
    const arr = Array.isArray(value) ? value : [value];
    return arr.map((v) => v.toString());
  };

  const filters = Array.isArray(filtersRaw) ? filtersRaw : [filtersRaw];

  const filteredCollection = filters.reduce((acc, { by, value } = {}) => {
    switch (by) {
      // NOTE: Match some special keywords first
      case "last":
        return collection.slice(-toInt(value));
      case "first":
        return collection.slice(0, toInt(value));
      case "random":
        // Randomly pick 'value' items from the collection while keeping the items in the same sort order
        const itemIndexes = Array.from(
          {
            length:
              toInt(value) > collection.length
                ? collection.length
                : toInt(value),
          },
          () => Math.floor(Math.random() * collection.length)
        ).sort((a, b) => a - b);
        return itemIndexes.map((index) => collection[index]);
      case "tags":
        const tagsToMatch = toArrayOfStrings(value);
        return collection.filter((item) =>
          item.data.tags?.some((tag) => tagsToMatch.includes(tag))
        );
      case "lang":
        return collection.filter((item) => item.data.lang === value);
      // NOTE: If no keyword is matched, suppose it is a nested property to be filtered by
      // TODO: Debug: This does not seem to work
      default:
        if (typeof by === "string") {
          if (Array.isArray(value)) {
            return collection.filter((item) =>
              value.some((v) => tryMatchNestedVariable(item, by) === v)
            );
          } else if (typeof value === "string" || typeof value === "number") {
            return collection.filter(
              (item) => tryMatchNestedVariable(item, by) === value
            );
          } else if (typeof value === "boolean") {
            return collection.filter((item) =>
              tryMatchNestedVariable(item, by)
            );
          } else if (!value) {
            return collection.filter((item) => {
              const val = tryMatchNestedVariable(item, by);
              return val === undefined || val === null || val === false;
            });
          }
        }
        return collection;
    }
  }, collection);

  return filteredCollection;
}

const sortCb = (collectionItem, by) =>
  tryMatchNestedVariable(collectionItem, by);

export function sortCollection(collection, sortCriteriasRaw) {
  const sortCriterias = Array.isArray(sortCriteriasRaw)
    ? sortCriteriasRaw
    : [sortCriteriasRaw];

  const sortedCollection = sort(collection).by(
    sortCriterias.map(({ direction, by }) => ({
      [direction]: (collectionItem) => sortCb(collectionItem, by),
    }))
  );

  return sortedCollection;
}

export type MultilingualString = Record<string, string>;
export type PluralMultilingualString = Record<string, string[]>;

export const getLocalized = (
  value: string | MultilingualString | null | undefined,
  language = "cs"
): string => {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (language in value) {
    return value[language];
  }

  const languages = Object.keys(value);
  return languages.length > 0 ? value[languages[0]] : "";
};

export const getLocalizedPlural = (
  value: PluralMultilingualString | null | undefined,
  language = "cs"
): string[] => {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    return value;
  }

  if (language in value) {
    return value[language];
  }

  const languages = Object.keys(value);
  return languages.length > 0 ? value[languages[0]] : [];
};

export const resolveLanguages = (
  instance: any,
  multilingualAttributes: string[]
): string[] => {
  const languages: string[] = [];
  multilingualAttributes.forEach((attribute) => {
    const attValue = instance[attribute];
    if (attValue && Object.keys(attValue).length > 0) {
      Object.keys(attValue)
        .filter((lang) => !languages.includes(lang))
        .forEach((lang) => languages.push(lang));
    }
  });
  return languages;
};

import { TermBase } from "../api/TermAPI";

/**
 * Aggregated object of import.meta.env and window.__config__ to allow dynamic configuration
 */
const ENV = {
  ...Object.keys(import.meta.env)
    .filter((key) => key.startsWith("VITE_"))
    .reduce<Record<string, string>>((acc, key) => {
      const strippedKey = key.replace("VITE_", "");
      acc[strippedKey] = import.meta.env[key];
      return acc;
    }, {}),
  ...(window as any).__config__,
};

/**
 * Helper to make sure that all envs are defined properly
 * @param name env variable name (without the VITE_ prefix)
 * @param defaultValue Default variable name
 */
export function getEnv(name: string, defaultValue?: string): string {
  const value = ENV[name] || defaultValue;
  if (value !== undefined) {
    return value;
  }
  throw new Error(`Missing environment variable: ${name}`);
}

export const getVocabularyFromTermIri = (iri: string) => {
  const indexSentinel = iri.indexOf("/pojem");
  return iri.substring(0, indexSentinel);
};

export const generateTermBase = (iri: string): TermBase => {
  const vocabularyIri = getVocabularyFromTermIri(iri);
  return { $id: iri, vocabulary: { $id: vocabularyIri } };
};

export const generateTermRoute = (term: TermBase) => {
  return `/pojem?iri=${term.$id}`;
};

export const generateVocabularyRoute = (vocabularyUri: string) => {
  return `/slovnik?iri=${vocabularyUri}`;
};

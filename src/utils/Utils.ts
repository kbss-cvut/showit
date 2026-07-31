import { TermBase } from "../api/TermAPI";

/**
 * Aggregated object of process.env and window.__config__ to allow dynamic configuration
 */
const ENV = {
  ...Object.keys(process.env)
      .filter((key) => key.startsWith("REACT_APP_"))
      .reduce<Record<string, string>>((acc, key) => {
        const strippedKey = key.replace("REACT_APP_", "");
        acc[strippedKey] = (process.env as Record<string, string>)[key];
        return acc;
      }, {}),
  ...(window as any).__config__,
};

/**
 * Helper to make sure that all envs are defined properly
 * @param name env variable name (without the REACT_APP_ prefix)
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
  return iri.substr(0, indexSentinel);
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

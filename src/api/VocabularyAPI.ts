import { useQuery } from "react-query";
import { getLocalized } from "../utils/IntlUtils";
import {
  getVocabularyTermsQuery,
  HIDDEN_VOCABULARY,
  Vocabularies,
  VocabularyTerms,
} from "./data/vocabularies";
import { dataDescription } from "./data/namespaces";

export const getVocabulary = async (vocabularyIri: string) => {
  //If user is trying to fetch hidden vocabulary, immediately return null -> no retries from React Query
  if (vocabularyIri === HIDDEN_VOCABULARY) return null;

  const data = await Vocabularies.findByIri(vocabularyIri);

  if (!data) {
    // Vocabulary not found
    throw new Error("404 Vocabulary not found");
  }

  return data;
};

export const getAllVocabularies = async () => {
  const data = await Vocabularies.find();
  if (!data) {
    throw new Error("404 No vocabularies were found");
  }
  //Z-GOV should not be visible
  return data
    .filter(
      (vocabulary) =>
        vocabulary.$id !== HIDDEN_VOCABULARY &&
        !vocabulary.$type.includes(dataDescription["version-of-object"])
    )
    .sort((a, b) => getLocalized(a.label).localeCompare(getLocalized(b.label)));
};

export const useVocabulary = (vocabularyUri: string) => {
  return useQuery(
    ["vocabulary", vocabularyUri],
    () => getVocabulary(vocabularyUri),
    {
      enabled: !!vocabularyUri,
      notifyOnChangeProps: ["data", "isError"],
    }
  );
};

export const useAllVocabularies = () => {
  return useQuery(["vocabularies"], () => getAllVocabularies());
};

const getVocabularyTerms = async (vocabularyIri: string) => {
  const data = await VocabularyTerms.query(
    getVocabularyTermsQuery(vocabularyIri)
  );

  data.sort((a, b) =>
    getLocalized(a.label).localeCompare(getLocalized(b.label))
  );
  return data;
};

export const useVocabularyTerms = (vocabularyUri: string) => {
  return useQuery(
    ["vocabularyTerms", vocabularyUri],
    () => getVocabularyTerms(vocabularyUri),
    {
      enabled: !!vocabularyUri,
      notifyOnChangeProps: ["data", "isError"],
    }
  );
};

import { useQuery } from "react-query";
import _ from "lodash";
import {
  getSearchQuery,
  getVocabularySearchQuery,
  SearchResource,
  VocabularySearchResource,
} from "./data/search";
import { skos } from "ldkit/namespaces";

const getSearchResults = async (word: string | undefined) => {
  if (!word) {
    return [];
  }
  word = word.replace(/(?=[()/])/g, "\\");

  const data = await SearchResource.query(getSearchQuery(word));
  const vocabularyData = await VocabularySearchResource.query(
    getVocabularySearchQuery(word)
  );
  // Groups results with the same label
  // adds isWord flag when there are multiple
  const result = _(data)
    .groupBy("label")
    .map((objs, key) => {
      return {
        type:
          objs.length === 1
            ? ([skos.Concept] as string[])
            : ([skos.Collection] as string[]),
        label: key,
        // include text with highlighted search string, should be the same for all objects with the same label
        displayText:
          objs[0].snippetField === "label" ? objs[0].snippetText : key,
        total_score: _.maxBy(objs, "score")?.score,
        items: [...objs],
        isMatchInDefinition: objs[0].snippetField === "definition",
        //When there is multiple matches, we cannot decide which snippet to show
        snippetText:
          objs.length !== 1
            ? "<em>Nalezeno více shod</em>"
            : objs[0].snippetText,
        vocabularies: objs.reduce((map, item) => {
          map[item.vocabulary.$id] = item.vocabulary.title;
          return map;
        }, {} as Record<string, string>),
      };
    })
    .value();

  //Because we have vocabulary results separated from the other results, we also need to map them
  const result2 = _(vocabularyData)
    .map((item) => {
      return {
        type: [skos.ConceptScheme] as string[],
        label: item.label,
        displayText: item.snippetText,
        total_score: item.score,
        items: [],
        isMatchInDefinition: item.snippetField === "description",
        snippetText: item.snippetText,
        vocabularies: {
          id: `${item.$id}`,
        },
      };
    })
    .value();

  //Merging two results together
  result.push(...result2);
  const finalResult = _.orderBy(result, "total_score", "desc");

  return finalResult;
};

// Type of a search result object - terms are aggregated by label
export type SearchResult = ReturnType<typeof getSearchResults> extends Promise<
  (infer U)[]
>
  ? U
  : never;

// Type of a term object as returned by search query
export type SearchTerm = SearchResult["items"] extends (infer U)[] ? U : never;

export const useSearch = (word: string | undefined) => {
  word = word?.trim();
  return useQuery(["directsearch", word], () => getSearchResults(word), {
    enabled: !!word,
  });
};

import { SearchTerm } from "../api/WordsAPI";
import { skos } from "ldkit/namespaces";
import { generateTermRoute, generateVocabularyRoute } from "./Utils";

export const generateRoute = (item: {
  type: string[];
  items: SearchTerm[];
  label: string;
  vocabularies: Record<string, string>;
}) => {
  if (item.type.includes(skos.Concept)) return generateTermRoute(item.items[0]);
  if (item.type.includes(skos.Collection))
    return `/rozcestnik?label=${item.label}`;
  if (item.type.includes(skos.ConceptScheme))
    return generateVocabularyRoute(item.vocabularies["id"]);
  return "/error";
};

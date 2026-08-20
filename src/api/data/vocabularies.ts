import { createLens, type SchemaInterface } from "ldkit";
import { dcterms, ldkit, rdf, skos } from "ldkit/namespaces";
import { sparql } from "ldkit/sparql";

import { options } from "./context";
import { n } from "./utils";
import { TermBaseSchema } from "./terms";

export const HIDDEN_VOCABULARY = "https://slovník.gov.cz/základní";
const VocabularyTermSchema = {
  "@type": TermBaseSchema["@type"],
  $type: TermBaseSchema.$type,
  label: TermBaseSchema.label,
} as const;

const VocabularySchema = {
  "@type": skos.ConceptScheme,
  $type: {
    "@id": rdf.type,
    "@array": true,
  },
  label: {
    "@id": dcterms.title,
    "@multilang": true,
  },
  description: {
    "@id": dcterms.description,
    "@optional": true,
  },
} as const;

export type VocabularyInterface = SchemaInterface<typeof VocabularySchema>;

export const Vocabularies = createLens(VocabularySchema, options);

export type VocabularyTermInterface = SchemaInterface<
  typeof VocabularyTermSchema
>;

export const VocabularyTerms = createLens(VocabularyTermSchema, options);

export const getVocabularyTermsQuery = (vocabularyIri: string) => {
  const query = sparql`
  CONSTRUCT {
    ?iri a ${n(skos.Concept)} , ${n(ldkit.Resource)} ;
      ${n(skos.prefLabel)} ?label ;
      ${n(skos.definition)} ?definition .
  }
  WHERE {
    ?iri a ${n(skos.Concept)} ;
      ${n(skos.inScheme)} ${n(vocabularyIri)} ;
      ${n(skos.prefLabel)} ?label .
    OPTIONAL { ?iri ${n(skos.definition)} ?definition . }
  }
  `;

  return query;
};

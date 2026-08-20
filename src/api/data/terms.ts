import { createLens, type SchemaInterface } from "ldkit";
import { dcterms, ldkit, rdf, skos } from "ldkit/namespaces";

import { options } from "./context";
import { owl, rdfs, zSgovPojem } from "./namespaces";
import { sparql } from "ldkit/sparql";
import { n } from "./utils";
import { HIDDEN_VOCABULARY } from "./vocabularies";

const RelationItemSchema = {
  "@type": skos.Concept,
  label: {
    "@id": skos.prefLabel,
    "@multilang": true,
  },
  vocabulary: {
    "@id": skos.inScheme,
    "@schema": {
      "@type": skos.ConceptScheme,
      label: {
        "@id": dcterms.title,
        "@optional": true,
      },
    },
  },
} as const;

export const TermBaseSchema = {
  "@type": skos.Concept,
  $type: {
    "@id": rdf.type,
    "@array": true,
  },
  label: {
    "@id": skos.prefLabel,
    "@multilang": true,
  },
  vocabulary: {
    "@id": skos.inScheme,
    "@schema": {
      "@type": skos.ConceptScheme,
      label: {
        "@id": dcterms.title,
        "@optional": true,
        "@multilang": true,
      },
    },
  },
  definition: {
    "@id": skos.definition,
    "@multilang": true,
    "@optional": true,
  },
  notation: {
    "@id": skos.notation,
    "@optional": true,
    "@array": true,
  },
} as const;

const TermSchema = {
  ...TermBaseSchema,
  altLabels: {
    "@id": skos.altLabel,
    "@optional": true,
    "@array": true,
    "@multilang": true,
  },
  source: {
    "@id": dcterms.source,
    "@optional": true,
  },
  parentTerms: {
    "@id": skos.broader,
    "@optional": true,
    "@array": true,
    "@schema": TermBaseSchema,
  },
  subTerms: {
    "@id": skos.narrower,
    "@optional": true,
    "@array": true,
    "@schema": TermBaseSchema,
  },
} as const;

const TermRelationsSchema = {
  "@type": skos.Concept,
  domain: {
    "@id": rdfs.domain,
    "@array": true,
    "@optional": true,
    "@schema": RelationItemSchema,
  },
  range: {
    "@id": rdfs.range,
    "@array": true,
    "@optional": true,
    "@schema": RelationItemSchema,
  },
} as const;

const TermTypesSchema = {
  "@type": skos.Concept,
  allTypes: {
    "@id": rdf.type,
    "@array": true,
    "@optional": true,
  },
} as const;

const TermSkosRelationsSchema = {
  "@type": skos.Concept,
  related: {
    "@id": skos.related,
    "@array": true,
    "@schema": RelationItemSchema,
  },
} as const;

export type TermRelationsInterface = SchemaInterface<
  typeof TermRelationsSchema
>;

export type TermSkosRelationsInterface = SchemaInterface<
  typeof TermSkosRelationsSchema
>;

export type TermInterface = SchemaInterface<typeof TermSchema>;

export type TermBaseInterface = SchemaInterface<typeof TermBaseSchema>;

export const Terms = createLens(TermSchema, options);
export const TermsTypes = createLens(TermTypesSchema, options);

export const TermsRelationsResource = createLens(TermRelationsSchema, options);

export const TermsSkosRelationsResource = createLens(
  TermSkosRelationsSchema,
  options
);

export const getTermRelationsQuery = (termIri: string) => {
  const query = sparql`
CONSTRUCT{ 
  ?term a ${n(skos.Concept)} ; a ${n(ldkit.Resource)} .
  ?term ${n(rdfs.domain)} ?domain .
  ?domain ${n(skos.inScheme)} ?vocabulary .
  ?domain a ${n(skos.Concept)}; ${n(skos.prefLabel)} ?label .
  ?term ${n(rdfs.range)} ?range .
  ?range ${n(skos.inScheme)} ?vocabulary2 .
  ?range a ${n(skos.Concept)}; ${n(skos.prefLabel)} ?label2 .
  ?vocabulary ${n(dcterms.title)} ?title .
  ?vocabulary2 ${n(dcterms.title)} ?title2 .
}
WHERE {
  BIND(${n(termIri)} as ?term)
  {
    ?domain ${n(rdfs.subClassOf)} ?domainRestriction . 
    ?domainRestriction ${n(owl.someValuesFrom)} ?term ; ${n(
    owl.onProperty
  )} ${n(zSgovPojem["má-vztažený-prvek-1"])} .
    ?domain ${n(skos.prefLabel)} ?label .
    ?domain ${n(skos.inScheme)} ?vocabulary .
    ?vocabulary ${n(dcterms.title)} ?title .
  }
  UNION{
      ?domain ${n(rdfs.subClassOf)} ?domainRestriction . 
    ?domainRestriction ${n(owl.someValuesFrom)} ?term ; ${n(
    owl.onProperty
  )} ${n(zSgovPojem["je-vlastností"])} .
    ?domain ${n(skos.prefLabel)} ?label .
    ?domain ${n(skos.inScheme)} ?vocabulary .
    ?vocabulary ${n(dcterms.title)} ?title .
  }
  UNION{
    ?domain ${n(rdfs.domain)} ?term .
    ?domain ${n(skos.prefLabel)} ?label .
    ?domain ${n(skos.inScheme)} ?vocabulary .
    ?vocabulary ${n(dcterms.title)} ?title .
  }
  UNION {
    ?range ${n(rdfs.range)} ?term .
    ?range ${n(skos.prefLabel)} ?label2 .
    ?range ${n(skos.inScheme)} ?vocabulary2 .
    ?vocabulary2 ${n(dcterms.title)} ?title2 .

  }
  UNION{
  ?domain ${n(zSgovPojem["má-vztažený-prvek-1"])} ?term .
  ?domain ${n(skos.prefLabel)} ?label .
  ?domain ${n(skos.inScheme)} ?vocabulary .
  ?vocabulary ${n(dcterms.title)} ?title .
  }
  UNION{
   ?range ${n(zSgovPojem["má-vztažený-prvek-2"])} ?term.
   ?range ${n(skos.prefLabel)} ?label2 .
   ?range ${n(skos.inScheme)} ?vocabulary2 .
   ?vocabulary2 ${n(dcterms.title)} ?title2 .

  }
  UNION {
    ?range ${n(rdfs.subClassOf)} ?rangeRestriction . 
    ?rangeRestriction ${n(owl.someValuesFrom)} ?term ; ${n(owl.onProperty)} ${n(
    zSgovPojem["má-vztažený-prvek-2"]
  )} .
    ?range ${n(skos.prefLabel)} ?label2 .
    ?range ${n(skos.inScheme)} ?vocabulary2 .
    ?vocabulary2 ${n(dcterms.title)} ?title2 .

  }
  FILTER (?vocabulary != ${n(HIDDEN_VOCABULARY)})
  FILTER (?vocabulary2 != ${n(HIDDEN_VOCABULARY)})
  
}
  `;

  return query;
};

export const getPropertyRelationsQuery = (propertyIri: string) => {
  const query = sparql`
CONSTRUCT{ 
  ?term a ${n(skos.Concept)} ; a ${n(ldkit.Resource)} .
  ?term ${n(rdfs.domain)} ?domain .
  ?domain ${n(skos.inScheme)} ?vocabulary .
  ?domain a ${n(skos.Concept)}; ${n(skos.prefLabel)} ?label .
  ?term ${n(rdfs.range)} ?range .
  ?range ${n(skos.inScheme)} ?vocabulary2 .
  ?range a ${n(skos.Concept)}; ${n(skos.prefLabel)} ?label2 .
  ?vocabulary ${n(dcterms.title)} ?title .
  ?vocabulary2 ${n(dcterms.title)} ?title2 .
}
WHERE {
  BIND(${n(propertyIri)} as ?term)
  {
    ?term ${n(rdfs.subClassOf)} ?domainRestriction . 
    ?domainRestriction ${n(owl.someValuesFrom)} ?domain ; ${n(
    owl.onProperty
  )} ${n(zSgovPojem["má-vztažený-prvek-1"])} .
    ?domain ${n(skos.prefLabel)} ?label .
    ?domain ${n(skos.inScheme)} ?vocabulary .
    ?vocabulary ${n(dcterms.title)} ?title .

  }
  UNION {
    ?term ${n(rdfs.subClassOf)} ?domainRestriction . 
    ?domainRestriction ${n(owl.allValuesFrom)} ?domain ; ${n(
    owl.onProperty
  )} ${n(zSgovPojem["je-vlastností"])} .
    ?domain ${n(skos.prefLabel)} ?label .
    ?domain ${n(skos.inScheme)} ?vocabulary .
    ?vocabulary ${n(dcterms.title)} ?title .
  }
  UNION{
    ?term ${n(rdfs.domain)} ?domain .
    ?domain ${n(skos.prefLabel)} ?label .
    ?domain ${n(skos.inScheme)} ?vocabulary .
    ?vocabulary ${n(dcterms.title)} ?title .

  }
  UNION {
    ?term ${n(rdfs.range)} ?range .
    ?range ${n(skos.prefLabel)} ?label2 .
    ?range ${n(skos.inScheme)} ?vocabulary2 .
    ?vocabulary2 ${n(dcterms.title)} ?title2 .

  }
  UNION {
    ?term ${n(rdfs.subClassOf)} ?rangeRestriction . 
    ?rangeRestriction ${n(owl.someValuesFrom)} ?range ; ${n(
    owl.onProperty
  )} ${n(zSgovPojem["má-vztažený-prvek-2"])} .
    ?range ${n(skos.prefLabel)} ?label2 .
    ?range ${n(skos.inScheme)} ?vocabulary2 .
    ?vocabulary2 ${n(dcterms.title)} ?title2 .

  }
  FILTER (?vocabulary != ${n(HIDDEN_VOCABULARY)})
  FILTER (?vocabulary2 != ${n(HIDDEN_VOCABULARY)})
}
  `;

  return query;
};

export const getTermTypeQuery = (termIri: string) => {
  const query = sparql`
CONSTRUCT{ 
  ?term a ${n(skos.Concept)} ; a ${n(ldkit.Resource)} .
  ?term a ?allTypes .
}
WHERE {
   BIND(${n(termIri)} as ?term)
   ?term ${n(rdf.type)} ?allTypes .
   FILTER(!isBlank(?allTypes))
}
  `;

  return query;
};

export const getTermSkosRelationsQuery = (termIri: string) => {
  return sparql`
  CONSTRUCT {
    ?term a ${n(skos.Concept)} ; a ${n(ldkit.Resource)} .
    ?term ${n(skos.related)} ?related .
    ?related ${n(skos.prefLabel)} ?relatedLabel .
    ?related ${n(skos.inScheme)} ?relatedVocabulary .
    ?relatedVocabulary ${n(dcterms.title)} ?relatedVocabularyTitle .
  } WHERE {
    BIND(${n(termIri)} as ?term)
    ?term (${n(skos.related)}|${n(skos.relatedMatch)}) ?related .
    ?related ${n(skos.prefLabel)} ?relatedLabel .
    ?related ${n(skos.inScheme)} ?relatedVocabulary .
    ?relatedVocabulary ${n(dcterms.title)} ?relatedVocabularyTitle .
    FILTER (?relatedVocabulary != ${n(HIDDEN_VOCABULARY)})
  } 
`;
};

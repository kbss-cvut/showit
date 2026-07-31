import { createNamespace } from "ldkit";

export const popisDat = createNamespace({
  iri: "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/",
  prefix: "popisdat:",
  terms: ["je-pojmem-ze-slovníku", "slovník"],
} as const);

export const lucene = createNamespace({
  iri: "http://www.ontotext.com/connectors/lucene#",
  prefix: "lucene:",
  terms: [
    "query",
    "entities",
    "snippets",
    "snippetText",
    "snippetField",
    "snippetSize",
    "score",
  ],
} as const);

export const luceneInstance = createNamespace({
  iri: "http://www.ontotext.com/connectors/lucene/instance#",
  prefix: "luceneinstance:",
  terms: ["termit_labelIndex_", "termit_defcomIndex_"],
} as const);

export const owl = createNamespace({
  iri: "http://www.w3.org/2002/07/owl#",
  prefix: "owl:",
  terms: ["someValuesFrom", "onProperty", "ObjectProperty", "allValuesFrom"],
} as const);

export const zSgovPojem = createNamespace({
  iri: "https://slovník.gov.cz/základní/pojem/",
  prefix: "z-sgov-pojem:",
  terms: [
    "má-vztažený-prvek-1",
    "má-vztažený-prvek-2",
    "typ-vztahu",
    "typ-vlastnosti",
    "je-vlastností",
  ],
} as const);

export const rdfs = createNamespace({
  iri: "http://www.w3.org/2000/01/rdf-schema#",
  prefix: "rdfs:",
  terms: ["domain", "range", "subClassOf"],
} as const);

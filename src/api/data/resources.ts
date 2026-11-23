import { createLens } from "ldkit";
import { rdfs } from "ldkit/namespaces";
import { options } from "./context";

const ResourceLabelSchema = {
  label: {
    "@id": rdfs.label,
    "@multilang": true,
    "@optional": true,
  },
} as const;

export const ResourceLabels = createLens(ResourceLabelSchema, options);

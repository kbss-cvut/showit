import { type Options } from "ldkit";
import { getEnv } from "../../utils/Utils";

// We should probably move the check somewhere else
if (!getEnv("SPARQL_ENDPOINT")) {
  throw new Error("SPARQL_ENDPOINT variable is not defined");
}

export const options: Options = {
  sources: [getEnv("SPARQL_ENDPOINT")],
  language: "cs",
};

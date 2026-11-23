import { useQuery } from "react-query";
import { ResourceLabels } from "./data/resources";

export const getResourceLabel = (resourceIri: string) => {
  return ResourceLabels.findByIri(resourceIri);
};

export const useResourceLabel = (resourceIri: string) => {
  return useQuery(
    ["resource-label", resourceIri],
    () => getResourceLabel(resourceIri),
    {
      enabled: !!resourceIri,
      notifyOnChangeProps: ["data", "isError"],
    }
  );
};

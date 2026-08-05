import React from "react";
import { TermInterface } from "../../api/data/terms";
import { useSkosRelations } from "../../api/TermAPI";
import Loader from "../Loader";
import { isTermEmpty } from "../../utils/TermUtils";
import EmptyTerm from "./EmptyTerm";
import { RelationItem } from "./RelationItem";
import { DetailItemWrapper } from "./Hierarchy";
import { TermBox } from "./TermRelations";

export const SkosRelations: React.FC<{ term: TermInterface }> = ({ term }) => {
  const { data, isLoading, isSuccess } = useSkosRelations(term);

  if (isLoading) {
    return <Loader />;
  }
  if (isTermEmpty(term) && data?.length === 0) {
    return <EmptyTerm />;
  }
  if (data?.length === 0 || data === undefined || !isSuccess) {
    return null;
  }

  return (
    <DetailItemWrapper title="Související pojmy">
      {data[0].related.map((item) => (
        <TermBox>
          <RelationItem
            data={item}
            key={item.$id}
            showVocabulary={term.vocabulary.$id !== item.vocabulary.$id}
          />
        </TermBox>
      ))}
    </DetailItemWrapper>
  );
};

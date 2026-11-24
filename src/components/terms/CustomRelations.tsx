import React from "react";
import { TermInterface } from "../../api/data/terms";
import { useResourceLabel } from "../../api/ResourceAPI";
import { useCustomRelations } from "../../api/TermAPI";
import Loader from "../Loader";
import { isTermEmpty } from "../../utils/TermUtils";
import EmptyTerm from "./EmptyTerm";
import { RelationItem } from "./RelationItem";
import { DetailItemWrapper } from "./Hierarchy";
import { TermBox } from "./TermRelations";
import { getEnv } from "../../utils/Utils";
import { getLocalized } from "../../utils/IntlUtils";
import { useLanguage } from "../../context/LanguageContext";

const CustomRelationSection: React.FC<{ property: string }> = ({
  property,
  children,
}) => {
  const { language } = useLanguage();
  const { data } = useResourceLabel(property);

  return (
    <DetailItemWrapper title={getLocalized(data?.label, language) || property}>
      {children}
    </DetailItemWrapper>
  );
};

export const CustomRelations: React.FC<{ term: TermInterface }> = ({
  term,
}) => {
  const customRelations = getEnv("RELATIONS", "").split(",");
  const { data, isLoading, isSuccess } = useCustomRelations(
    term,
    customRelations
  );

  if (isLoading) {
    return <Loader />;
  }
  const groups = data
    ?.map(({ property, results }) => ({
      property,
      related: results.flatMap((result) => result.related),
    }))
    .filter(({ related }) => related.length > 0);

  if (isTermEmpty(term) && groups?.length === 0) {
    return <EmptyTerm />;
  }
  if (groups?.length === 0 || groups === undefined || !isSuccess) {
    return null;
  }

  return (
    <>
      {groups.map(({ property, related }) => (
        <CustomRelationSection key={property} property={property}>
          {related.map((item) => (
            <TermBox key={item.$id}>
              <RelationItem
                data={item}
                key={item.$id}
                showVocabulary={term.vocabulary.$id !== item.vocabulary.$id}
              />
            </TermBox>
          ))}
        </CustomRelationSection>
      ))}
    </>
  );
};

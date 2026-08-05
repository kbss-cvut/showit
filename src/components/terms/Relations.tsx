import React from "react";
import { useRelations } from "../../api/TermAPI";
import Loader from "../Loader";
import { TermInterface } from "../../api/data/terms";
import DetailItemWrapper from "../detail_common/DetailItemWrapper";
import TermRelations from "./TermRelations";
import PropertyRelations from "./PropertyRelations";
import { isProperty, isTermEmpty } from "../../utils/TermUtils";
import EmptyTerm from "./EmptyTerm";
import { RelationItem } from "./RelationItem";
import RelationConnector from "./RelationConnector";

interface RelationsProperty {
  term: TermInterface;
}

const Relations: React.FC<RelationsProperty> = ({ term }) => {
  const { data, isLoading, isSuccess } = useRelations(term);
  if (isLoading) return <Loader />;

  if (isTermEmpty(term) && data?.length === 0) return <EmptyTerm />;
  if (data?.length === 0 || data === undefined) return null;

  if (isSuccess) {
    const ranges = data[0].range.map((item) => {
      return (
        <RelationItem
          data={item}
          showVocabulary={term.vocabulary.$id !== item.vocabulary.$id}
          key={item.$id}
        />
      );
    });

    const domains = data[0].domain.map((item) => {
      return (
        <RelationItem
          data={item}
          showVocabulary={term.vocabulary.$id !== item.vocabulary.$id}
          key={item.$id}
        />
      );
    });

    let content;
    //Need to decide which visualisation is gonna be shown
    if (isProperty(term) && (domains.length === 0 || ranges.length === 0)) {
      //If the property query was used but the data doesn't contain domains and ranges, show the TermRelations visualisation
      //typical for typ-vlastnosti
      content = (
        <TermRelations currentTerm={term} domains={ranges} ranges={domains} />
      );
    } else if (isProperty(term)) {
      content = (
        <PropertyRelations
          domains={domains}
          ranges={ranges}
          currentTerm={term}
        />
      );
    } else {
      content = (
        <TermRelations domains={domains} ranges={ranges} currentTerm={term} />
      );
    }

    return (
      <DetailItemWrapper title="Vymodelované vztahy">
        {content}
      </DetailItemWrapper>
    );
  }
  return null;
};

export const calculateConnector = (
  index: number,
  size: number,
  reverse: boolean
) => {
  let type = reverse ? "r_" : "";
  if (size === 1) {
    type = "straight";
  } else if (size > 1 && index === 0) {
    type += "tline";
  } else if (size > 1 && index + 1 !== size) {
    type += "hline";
  } else if (size > 1 && index + 1 === size) {
    type += "lline";
  }
  return <RelationConnector type={type} />;
};

export default Relations;

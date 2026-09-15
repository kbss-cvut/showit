import React from "react";
import { Box } from "@mui/material";
import AltLabel from "../detail_common/AltLabel";
import DetailPageHeader from "../detail_common/DetailPageHeader";
import RouteLink from "../RouteLink";
import { generateVocabularyRoute } from "../../utils/Utils";
import { TermInterface } from "../../api/data/terms";
import { getLocalized } from "../../utils/IntlUtils";
import { Notations } from "./Notations";
import { useLanguage } from "../../context/LanguageContext";

export interface DetailHeaderProps {
  term: TermInterface;
}

const TermHeader: React.FC<DetailHeaderProps> = ({ term }) => {
  const { $id, label, altLabels, notation, vocabulary } = term;
  const { language } = useLanguage();

  const vocabularyRoute = generateVocabularyRoute(vocabulary.$id);
  const above = (
    <RouteLink to={vocabularyRoute} variant="h5" color="textPrimary">
      {getLocalized(vocabulary.label, language) || vocabulary.$id}
    </RouteLink>
  );
  const below = <AltLabel altLabels={altLabels} />;

  const title =
    notation.length > 0 ? (
      <>
        {getLocalized(label, language)}
        <Box component="span" sx={{ marginLeft: "0.25rem" }}>
          <Notations notation={notation} />
        </Box>
      </>
    ) : (
      getLocalized(label, language)
    );

  return (
    <DetailPageHeader
      aboveLabel={above}
      label={title}
      belowLabel={below}
      iri={$id}
      multilingualAttributes={["label", "definition", "altLabels"]}
      asset={term}
    />
  );
};

export default TermHeader;

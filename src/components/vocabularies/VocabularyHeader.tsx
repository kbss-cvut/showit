import React from "react";
import { Typography } from "@mui/material";
import DetailPageHeader from "../detail_common/DetailPageHeader";
import { useVocabularyTerms } from "../../api/VocabularyAPI";
import { VocabularyInterface } from "../../api/data/vocabularies";
import { useLanguage } from "../../context/LanguageContext";
import { getLocalized } from "../../utils/IntlUtils";

const countHelper = (length: number) => {
  if (length === 1) return "pojem";
  else if (length > 1 && length <= 4) return "pojmy";
  else return "pojmů";
};

interface DetailVocabularyHeaderProps {
  vocabulary: VocabularyInterface;
}

const VocabularyHeader: React.FC<DetailVocabularyHeaderProps> = ({
  vocabulary,
}) => {
  const { data = [], isLoading } = useVocabularyTerms(vocabulary.$id);
  const { language } = useLanguage();
  const above = (
    <Typography variant="h5" color="textPrimary">
      {isLoading
        ? "Načítání pojmů"
        : `${data.length} ${countHelper(data.length)}`}
    </Typography>
  );

  return (
    <DetailPageHeader
      aboveLabel={above}
      label={getLocalized(vocabulary.label, language)}
      iri={vocabulary.$id}
      multilingualAttributes={["label"]}
      asset={vocabulary}
    />
  );
};

export default VocabularyHeader;

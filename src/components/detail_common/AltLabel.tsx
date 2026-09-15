import React from "react";
import { Typography } from "@mui/material";
import { TermInterface } from "../../api/data/terms";
import { getLocalizedPlural } from "../../utils/IntlUtils";
import { useLanguage } from "../../context/LanguageContext";

interface AltLabelProps {
  altLabels: TermInterface["altLabels"];
}

const AltLabel: React.FC<AltLabelProps> = ({ altLabels }) => {
  const { language } = useLanguage();
  const strAltLabels = getLocalizedPlural(altLabels, language);
  if (strAltLabels.length === 0) {
    return null;
  }

  return (
    <Typography variant="h5" color="textPrimary">
      {strAltLabels.join(", ")}
    </Typography>
  );
};

export default AltLabel;

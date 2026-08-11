import React from "react";
import { Typography } from "@mui/material";
import { TermInterface } from "../../api/data/terms";
import { getLocalizedPlural } from "../../utils/LabelUtils";

interface AltLabelProps {
  altLabels: TermInterface["altLabels"];
}

const AltLabel: React.FC<AltLabelProps> = ({ altLabels }) => {
  const strAltLabels = getLocalizedPlural(altLabels);
  if (strAltLabels.length === 0) {
    return null;
  }

  return (
    <Typography variant="h5" color="textSecondary">
      {strAltLabels.join(", ")}
    </Typography>
  );
};

export default AltLabel;

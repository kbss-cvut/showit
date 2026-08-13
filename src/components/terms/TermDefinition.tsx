import React from "react";
import { ReactComponent as DefinitionIllustration } from "../../assets/definition.svg";
import { Box } from "@mui/material";
import DefinitionWrapper from "../detail_common/DefinitionWrapper";
import { TermInterface } from "../../api/data/terms";
import { getLocalized } from "../../utils/IntlUtils";
import { useLanguage } from "../../context/LanguageContext";

interface DefinitionProps {
  term: TermInterface;
}

const TermDefinition: React.FC<DefinitionProps> = ({ term }) => {
  const { language } = useLanguage();
  if (!term.definition && !term.source) return null;

  const illustration = (
    <Box style={{ position: "relative", height: "100%" }}>
      <Box left={-72} bottom={-102} style={{ position: "absolute" }}>
        <DefinitionIllustration style={{ maxHeight: 260 }} />
      </Box>
    </Box>
  );

  return (
    <DefinitionWrapper
      illustration={illustration}
      definition={getLocalized(term.definition, language)}
      source={term.source}
    />
  );
};

export default TermDefinition;

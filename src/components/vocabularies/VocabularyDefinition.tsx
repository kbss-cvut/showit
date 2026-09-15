import React from "react";
import { Box } from "@mui/material";
import { ReactComponent as DefinitionIllustration } from "../../assets/definition2.svg";
import DefinitionWrapper from "../detail_common/DefinitionWrapper";
import theme from "../../app/theme";

interface VocabularyDefinitionProps {
  description?: string | null;
}

const VocabularyDefinition: React.FC<VocabularyDefinitionProps> = (props) => {
  if (!props.description) return null;

  const illustration = (
    <Box style={{ position: "relative", height: "100%" }}>
      <Box left={-32} bottom={-102} style={{ position: "absolute" }}>
        <DefinitionIllustration
          style={{ maxHeight: 260, color: theme.palette.primary.main }}
        />
      </Box>
    </Box>
  );

  return (
    <DefinitionWrapper
      illustration={illustration}
      definition={props.description}
    />
  );
};

export default VocabularyDefinition;

import React from "react";
import { skos } from "ldkit/namespaces";
import { ReactComponent as TermIcon } from "../assets/article.svg";
import { ReactComponent as WordIcon } from "../assets/split.svg";
import { ReactComponent as VocabularyIcon } from "../assets/book.svg";
import { Box } from "@mui/material";

interface TypeIconProps {
  type: string[];
  width: number;
  height: number;
}

const TypeIcon: React.FC<TypeIconProps> = ({ type, width, height }) => {
  const iconStyle = {
    minHeight: height,
    minWidth: width,
    maxHeight: height,
    maxWidth: width,
    color: "white",
  };
  let icon;
  if (type.includes(skos.Concept))
    icon = <TermIcon fill="white" style={iconStyle} />;
  if (type.includes(skos.Collection)) icon = <WordIcon style={iconStyle} />;
  if (type.includes(skos.ConceptScheme))
    icon = <VocabularyIcon fill="white" style={iconStyle} />;
  return (
    <Box
      bgcolor={
        type.includes(skos.ConceptScheme) ? "secondary.main" : "primary.main"
      }
      borderRadius={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      alignSelf="center"
      mr={2}
      style={{ minHeight: 30, minWidth: 30, maxHeight: 30, maxWidth: 30 }}
    >
      {icon}
    </Box>
  );
};

export default TypeIcon;

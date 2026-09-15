import React from "react";
import { generateStyledSnippet } from "../../utils/TermUtils";
import { SearchResult } from "../../api/WordsAPI";
import { Box } from "@mui/material";
import TypeIcon from "../TypeIcon";
import theme from "../../app/theme";

const SearchBarResult: React.FC<SearchResult> = ({
  displayText,
  snippetText,
  isMatchInDefinition,
  type,
}) => {
  return (
    <Box display="flex" width="100%">
      <TypeIcon type={type} height={20} width={17} />
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: theme.palette.common.black,
        }}
        dangerouslySetInnerHTML={{
          __html:
            displayText +
            generateStyledSnippet(snippetText, isMatchInDefinition),
        }}
      />
    </Box>
  );
};

export default SearchBarResult;

import React from "react";
import { Box, Container, styled, Typography } from "@mui/material";
import RouteLink from "../RouteLink";
import SearchCard from "./SearchCard";
import theme from "../../app/theme";
import { SearchResult } from "../../api/WordsAPI";
import { generateStyledSnippet } from "../../utils/TermUtils";
import TypeIcon from "../TypeIcon";
import { generateRoute } from "../../utils/SearchUtil";
import MaxLineText from "../MaxLineText";
import { skos } from "ldkit/namespaces";

const HighlightedText = styled(Typography)(({ theme }) => ({
  "--fontsize": "1.6982rem",
  "@media (min-width: 600px)": {
    "--fontsize": "1.9576rem",
  },
  "@media (min-width: 900px)": {
    "--fontsize": "2.16rem",
  },
  lineHeight: `calc((${theme.typography.h4.lineHeight} * var(--fontsize)))`,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "& em": {
    fontStyle: "normal",
    fontWeight: 600,
  },
}));

const HighlightedTextDefinition = styled(Typography)(({ theme }) => ({
  alignSelf: "start",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "& em": {
    fontStyle: "normal",
    fontWeight: 600,
  },
}));

const SearchResultView: React.FC<SearchResult> = ({
  label,
  type,
  items,
  vocabularies,
  isMatchInDefinition,
  snippetText,
  displayText,
}) => {
  const routeProps = generateRoute({
    type: type,
    items: items,
    label: label,
    vocabularies: vocabularies,
  });
  if (routeProps === "/error") return null;

  const border = type.includes(skos.ConceptScheme)
    ? theme.palette.secondary.main
    : theme.palette.primary.main;
  return (
    <Container>
      <RouteLink to={routeProps} underline="none">
        <SearchCard borderColor={`${border} !important`}>
          <Box display="flex">
            <TypeIcon type={type} width={17} height={20} />
            {type.includes(skos.ConceptScheme) ? (
              <MaxLineText
                variant="h4"
                maxlines={3}
                dangerouslySetInnerHTML={{
                  __html: displayText,
                }}
              />
            ) : (
              <HighlightedText
                variant="h4"
                dangerouslySetInnerHTML={{
                  __html: displayText,
                }}
              />
            )}
          </Box>

          {isMatchInDefinition && (
            <Box mt={1}>
              <HighlightedTextDefinition
                variant="h5"
                dangerouslySetInnerHTML={{
                  __html: generateStyledSnippet(
                    snippetText,
                    isMatchInDefinition
                  ),
                }}
              />
            </Box>
          )}
          {
            //If result is not vocabulary show associated vocabularies of the result
            !type.includes(skos.ConceptScheme) &&
              Object.keys(vocabularies).map((vocabularyUri) => {
                return (
                  <Box mt={1} key={vocabularyUri}>
                    <Typography variant="h6">
                      {vocabularies[vocabularyUri]}
                    </Typography>
                  </Box>
                );
              })
          }
        </SearchCard>
      </RouteLink>
    </Container>
  );
};

export default SearchResultView;

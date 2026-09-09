import React, { useEffect, useState } from "react";
import useRouteQuery from "../../hooks/useRouteQuery";
import { useSearch, SearchResult, SearchTerm } from "../../api/WordsAPI";
import find from "lodash/find";
import { Box, Container, Typography } from "@mui/material";
import TermResult from "../terms/TermResult";
import Loader from "../Loader";
import { DetailHeaderWrapper } from "../detail_common/DetailPageHeader";
import NumberOfResults from "./NumberOfResults";

const DisambiguationPage: React.FC = () => {
  const routeQuery = useRouteQuery();
  const wordLabel = routeQuery.get("label");
  const { data = [], isSuccess, isLoading } = useSearch(wordLabel ?? undefined);

  const [terms, setTerms] = useState<SearchTerm[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const item = find<SearchResult>(data, { label: wordLabel ?? "" });
      if (item) {
        setTerms(item.items);
      }
    }
  }, [data, isSuccess, wordLabel]);

  if (isLoading) return <Loader />;

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <DetailHeaderWrapper>
        <Typography variant="h3" color="textSecondary">
          {wordLabel ?? ""}
        </Typography>
      </DetailHeaderWrapper>
      <WordContent terms={terms} />
    </Box>
  );
};

interface WordContentProps {
  terms: SearchTerm[];
}

const WordContent: React.FC<WordContentProps> = (props) => {
  return (
    <Container>
      <Box pt={2} pb={4}>
        <NumberOfResults amount={props.terms.length} />
        {props.terms.map((term) => {
          return <TermResult key={term.$id} {...term} />;
        })}
      </Box>
    </Container>
  );
};
export default DisambiguationPage;

import React, { ReactElement } from "react";
import CurrentTerm from "./CurrentTerm";
import { Box, Container, Typography } from "@mui/material";
import { NormalEnd } from "./HierarchyItem";
import HierarchyParents from "./HierarchyParents";
import HierarchyChildren from "./HierarchyChildren";
import { TermInterface } from "../../api/data/terms";

interface HierarchyProps {
  term: TermInterface;
}

export const Hierarchy: React.FC<HierarchyProps> = ({ term }) => {
  const parentTerms = term.parentTerms ? term.parentTerms : [];
  const subTerms = term.subTerms ? term.subTerms : [];

  if (!parentTerms.length && !subTerms.length) return null;

  const currIndex = term.parentTerms.length ? 1 : 0;
  return (
    <Container>
      <Box py={2} mb={2} px={2} mt={4}>
        <Box borderLeft={4} pr={6} borderColor="primary.main">
          <Box pl={4}>
            <Typography variant="h5">Hierarchie</Typography>
          </Box>
          <Box pl={2}>
            <HierarchyParents
              items={parentTerms}
              level={0}
              vocabularyDefault={term.vocabulary.$id}
            />
            <CurrentTerm
              level={currIndex}
              term={term}
              connector={subTerms.length ? <NormalEnd /> : undefined}
            />
            <HierarchyChildren
              items={subTerms}
              level={currIndex + 1}
              vocabularyDefault={term.vocabulary.$id}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

interface DetailItemWrapperProps {
  title: string;
  secondaryElement?: ReactElement;
}

export const DetailItemWrapper: React.FC<DetailItemWrapperProps> = (props) => {
  return (
    <Container>
      <Box py={2} mb={2} px={2} mt={4}>
        <Box borderLeft={4} pr={6} borderColor="primary.main">
          <Box display="flex">
            <Box pl={4}>
              <Typography variant="h5">{props.title}</Typography>
            </Box>
            <Box>{props.secondaryElement}</Box>
          </Box>
          <Box pl={4} mt={2}>
            {props.children}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

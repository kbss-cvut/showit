import React, { ReactElement, ReactNode } from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import IRI from "./IRI";
import { LanguageSelector } from "./LanguageSelector";
import { TermInterface } from "../../api/data/terms";
import { VocabularyInterface } from "../../api/data/vocabularies";

interface DetailPageHeaderProps {
  aboveLabel: ReactElement;
  label: ReactNode;
  belowLabel?: ReactElement;
  iri: string;
  multilingualAttributes: string[];
  asset: TermInterface | VocabularyInterface;
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = (props) => {
  return (
    <DetailHeaderWrapper>
      <Grid container>
        <Grid item md={9} sm={7} xs={7}>
          {props.aboveLabel}
          <Typography variant="h3" color="textSecondary">
            {props.label}
          </Typography>
          {props.belowLabel}
        </Grid>
        <Grid item md={3} sm={5} xs={5}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
          >
            <LanguageSelector
              multilingualAttributes={props.multilingualAttributes}
              asset={props.asset}
            />
            <IRI iri={props.iri} />
          </Stack>
        </Grid>
      </Grid>
    </DetailHeaderWrapper>
  );
};

export const DetailHeaderWrapper: React.FC = (props) => {
  return (
    <Box bgcolor="primary.main" pb={1}>
      <Container>
        <Box px={5}>{props.children}</Box>
      </Container>
    </Box>
  );
};

export default DetailPageHeader;

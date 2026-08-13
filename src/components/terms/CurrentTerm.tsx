import React from "react";
import HierarchyItem from "./HierarchyItem";
import { Box, Paper, styled, Typography } from "@mui/material";
import { TermAccordionProps } from "./TermAccordion";
import { getLocalized } from "../../utils/IntlUtils";

const CurrentTermBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  marginBottom: -1,
  minHeight: 56,
  display: "flex",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(7),
  alignItems: "center",
  paddingTop: 12,
  paddingBottom: 12,
}));

const CurrentTerm: React.FC<TermAccordionProps> = (props) => {
  return (
    <HierarchyItem level={props.level} connector={props.connector}>
      <Box
        style={{
          border: "1px solid rgba(0, 0, 0, .125)",
          boxShadow: "none",
        }}
      >
        <CurrentTermBox square elevation={0}>
          <Typography variant="h6" color="textSecondary">
            {getLocalized(props.term.label)}
          </Typography>
        </CurrentTermBox>
      </Box>
    </HierarchyItem>
  );
};

export default CurrentTerm;

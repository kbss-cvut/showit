import React, { ReactElement, useState } from "react";
import { Box, FormControl, Typography } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RouteLink from "../RouteLink";
import AccordionDescription from "./AccordionDescription";
import HierarchyItem from "./HierarchyItem";
import { generateTermRoute } from "../../utils/Utils";
import { TermBaseInterface } from "../../api/data/terms";
import { getLocalized } from "../../utils/LabelUtils";

//TODO: Remove withStyles -> do styled() instead
//For now it doesn't behave as expected with styled()
//I will try fixing in the future, but I don't want to delay the PR any further
const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const ExpandIcon = withStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
  },
}))(ExpandMoreIcon);

export interface TermAccordionProps {
  level: number;
  term: TermBaseInterface;
  connector?: ReactElement;
  showVocabulary?: boolean;
}

export const TermAccordion: React.FC<TermAccordionProps> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const routeProps = generateTermRoute(props.term);
  return (
    <HierarchyItem level={props.level} connector={props.connector}>
      <Accordion
        square
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Box>
            {props.showVocabulary && (
              <Typography variant="body2" color="textSecondary">
                {getLocalized(props.term.vocabulary.label)}
              </Typography>
            )}
            <FormControl
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
            >
              <RouteLink to={routeProps} variant="h6" color="textSecondary">
                {getLocalized(props.term.label)}
              </RouteLink>
            </FormControl>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionDescription term={props.term} />
        </AccordionDetails>
      </Accordion>
    </HierarchyItem>
  );
};

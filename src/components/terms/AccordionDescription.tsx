import React from "react";
import { Typography } from "@mui/material";
import { TermBaseInterface } from "../../api/data/terms";
import { getLocalized } from "../../utils/IntlUtils";
import { useLanguage } from "../../context/LanguageContext";
import theme from "../../app/theme";

interface AccordionDescriptionProps {
  term: TermBaseInterface;
}

const AccordionDescription: React.FC<AccordionDescriptionProps> = ({
  term,
}) => {
  const { language } = useLanguage();
  const description = term.definition
    ? getLocalized(term.definition, language)
    : "Pojem nemá definici";

  return (
    <Typography color={theme.palette.common.black}>{description}</Typography>
  );
};

export default AccordionDescription;

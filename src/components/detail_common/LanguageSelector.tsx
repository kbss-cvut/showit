import React from "react";
import { TermInterface } from "../../api/data/terms";
import { VocabularyInterface } from "../../api/data/vocabularies";
import { resolveLanguages } from "../../utils/IntlUtils";
import { Box, MenuItem, Select, Tooltip } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { useLanguage } from "../../context/LanguageContext";

export const LanguageSelector: React.FC<{
  multilingualAttributes: string[];
  asset: TermInterface | VocabularyInterface;
}> = ({ multilingualAttributes, asset }) => {
  const { language, setLanguage } = useLanguage();
  const options = resolveLanguages(asset, multilingualAttributes);
  if (options.length <= 1) {
    return null;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={{ marginRight: "1rem" }}
    >
      <Tooltip title={"Zobrazit překlad v jazyce: " + language}>
        <TranslateIcon sx={{ color: "text.secondary" }} />
      </Tooltip>
      <Select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        sx={{
          color: "text.secondary",
          ".MuiSvgIcon-root": { color: "text.secondary" },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

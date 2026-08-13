import { FixedSizeList as List } from "react-window";
import React, { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ReactWindowScroller } from "../../utils/ReactWindowScroller";
import makeStyles from "@mui/styles/makeStyles";
import { DetailItemWrapper } from "../terms/Hierarchy";
import { getLocalized, MultilingualString } from "../../utils/IntlUtils";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLanguage } from "../../context/LanguageContext";

//Unfortunately the makeStyles performs better than styled
//Even though makeStyles is considered legacy, I would leave it here for now
const useStyles = makeStyles(() => ({
  wrapper: {
    borderBottom: "1px solid #e0e0e0",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  text: {
    fontSize: "1.25rem",
    lineHeight: "1.6",
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textDecoration: "none",
    color: "#000000",
    "& em": {
      fontStyle: "normal",
      fontWeight: 700,
    },
  },
  noDecoration: {
    textDecoration: "none",
    color: "#000000",
  },
}));

interface ListItem {
  $id: string;
  $type?: string[];
  label: string | MultilingualString;
}

interface VocabularyAndTermsListProps {
  data: ListItem[];
  routeResolver: (id: string) => string;
  listLabel: string;
  searchHelperText: string;
}

const split_at_index = (value: string, index: number, length: number) => {
  return [
    value.substring(0, index),
    value.substring(index, index + length),
    value.substring(index + length),
  ];
};

const getHighlightedText = (originalLabel: string, searchedPart: string) => {
  if (searchedPart === "") {
    return originalLabel;
  }

  let searchedText = searchedPart.toLowerCase();
  let original = originalLabel.toLowerCase();
  let index = original.indexOf(searchedText);
  let splitted = split_at_index(originalLabel, index, searchedPart.length);
  if (splitted[0] || splitted[1])
    return `${splitted[0]}<em>${splitted[1]}</em>${splitted[2]}`;
  else return originalLabel;
};

const endAdornment = (
  <InputAdornment position={"end"}>
    <SearchIcon />
  </InputAdornment>
);

const VocabularyAndTermsListWindow: React.FC<VocabularyAndTermsListProps> = ({
  data,
  routeResolver,
  listLabel,
  searchHelperText,
}) => {
  const classes = useStyles();
  const [filterText, setFilterText] = useState("");
  const { language } = useLanguage();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };
  const filteredTerms = useMemo(() => {
    return data
      .filter((term) => {
        if (filterText === "") return true;
        else {
          return getLocalized(term.label, language)
            .toLowerCase()
            .includes(filterText.toLowerCase());
        }
      })
      .map((term) => {
        return {
          $id: term.$id,
          $type: term.$type,
          label: getHighlightedText(
            getLocalized(term.label, language),
            filterText
          ),
        };
      });
  }, [data, filterText, language]);

  const filter = (
    <Box ml={4}>
      <TextField
        value={filterText}
        onChange={handleChange}
        size={"small"}
        fullWidth
        placeholder={searchHelperText}
        InputProps={{
          endAdornment: endAdornment,
        }}
      />
    </Box>
  );

  return (
    <DetailItemWrapper title={listLabel} secondaryElement={filter}>
      <ReactWindowScroller>
        {({ ref, outerRef, style, onScroll }: any) => (
          <List
            ref={ref}
            width={10}
            outerRef={outerRef}
            style={style}
            height={window.innerHeight}
            itemCount={filteredTerms.length}
            itemSize={34}
            onScroll={onScroll}
          >
            {({ index, style }) => (
              <div style={style}>
                <div className={classes.wrapper}>
                  <RouterLink
                    to={routeResolver(filteredTerms[index].$id)}
                    className={classes.noDecoration}
                  >
                    <div
                      className={classes.text}
                      dangerouslySetInnerHTML={{
                        __html: filteredTerms[index].label,
                      }}
                    />
                  </RouterLink>
                </div>
              </div>
            )}
          </List>
        )}
      </ReactWindowScroller>
    </DetailItemWrapper>
  );
};
export default VocabularyAndTermsListWindow;

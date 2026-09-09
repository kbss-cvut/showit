import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import makeStyles from "@mui/styles/makeStyles";
import SearchIcon from "@mui/icons-material/Search";
import {
  CircularProgress,
  InputAdornment,
  Popper,
  PopperProps,
  styled,
} from "@mui/material";
import { useSearch, SearchResult } from "../../api/WordsAPI";
import { useHistory } from "react-router-dom";
import debounce from "lodash/debounce";
import SearchBarResult from "./SearchBarResult";
import { generateRoute } from "../../utils/SearchUtil";

const OPTIONS_LIMIT = 7;

const filterOptions = (options: SearchResult[]) => {
  return options.slice(0, OPTIONS_LIMIT) as SearchResult[];
};

//TODO: Remove makeStyles -> do styled() instead
//For now it doesn't behave as expected with styled()
//I will try fixing in the future, but I don't want to delay the PR any further

const useStyles = makeStyles((theme) => ({
  inputRoot: (props: SearchBarProps) => ({
    border: "1px solid #e2e2e1",
    color: theme.palette.text.primary,
    borderRadius: props.size === "large" ? 26 : 16,
    fontSize: props.size === "large" ? 26 : 16,
    height: props.size === "large" ? 63 : 38,
    backgroundColor: "#fcfcfb",
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    paddingLeft:
      props.size === "large"
        ? `${theme.spacing(6)} !important`
        : `${theme.spacing(1)} !important`,
    paddingRight:
      props.size === "large"
        ? `${theme.spacing(6)} !important`
        : `${theme.spacing(1)} !important`,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff",
    },
  }),
  input: {
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
  },
  paper: {
    color: theme.palette.text.primary,
  },
  option: {
    "& em": {
      fontStyle: "normal",
      fontWeight: 700,
    },
  },
}));

interface SearchBarProps {
  size: "small" | "large";
  initialValue?: string;
  focusCallback?: (state: boolean) => void;
}

const InputTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const MagnifyingGlass = styled(SearchIcon)({
  color: "gray",
  "&:hover": {
    cursor: "pointer",
  },
});

const CustomPopper = styled(Popper)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100% !important",
  },
}));

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const classes = useStyles(props);
  const [inputValue, setInputValue] = useState<string | undefined>();
  const { data = [], isLoading } = useSearch(inputValue);
  const history = useHistory();

  const searchResultLabelMap = useMemo(() => {
    return data.reduce((map, item) => {
      map.set(item.label, item);
      return map;
    }, new Map<string, SearchResult>());
  }, [data]);

  const onChangeHandler = (option: SearchResult | string | null) => {
    if (!option) {
      return;
    }
    if (typeof option === "string") {
      props.focusCallback?.(true);
      history.push(`/hledat?label=${option}`);
    } else {
      const matchedOption = searchResultLabelMap.get(option.label);
      if (matchedOption) {
        const route = generateRoute({ ...matchedOption });
        history.push(route);
      }
    }
  };

  const handleChange = useMemo(
    () => (event: ChangeEvent<{}>, newInputValue: string) => {
      setInputValue(newInputValue);
    },
    [setInputValue]
  );

  const debouncedChangeHandler = useMemo(
    () => debounce(handleChange, 300),
    [handleChange]
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  const Popper = (props: PopperProps) => {
    return <CustomPopper {...props} />;
  };

  const endAdornment = (
    <InputAdornment position="end">
      {isLoading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <MagnifyingGlass
          fontSize={props.size === "small" ? "medium" : "large"}
          onClick={(e) => {
            if (!(inputValue === undefined || inputValue === "")) {
              onChangeHandler(inputValue);
              //stops the propagation, otherwise input would get focused and callback would be called again
              e.stopPropagation();
              props.focusCallback?.(true);
            }
          }}
        />
      )}
    </InputAdornment>
  );

  return (
    <Autocomplete
      classes={classes}
      onChange={(event: any, newValue: any) => {
        if (newValue !== null) {
          onChangeHandler(newValue);
        }
      }}
      defaultValue={props.initialValue || ""}
      filterOptions={filterOptions}
      noOptionsText="Nebyly nalezeny žádné výsledky"
      fullWidth
      freeSolo
      blurOnSelect={true}
      options={data}
      renderOption={(props, option: SearchResult, { selected }) => (
        <li {...props}>
          <SearchBarResult key={option.displayText} {...option} />
        </li>
      )}
      onInputChange={debouncedChangeHandler}
      ListboxProps={{ style: { maxHeight: "500px" } }}
      PopperComponent={Popper}
      renderInput={(params) => (
        <InputTextField
          {...params}
          onFocus={() => {
            //calls the callback to hide the logo if needed
            props.focusCallback?.(false);
          }}
          onBlur={() => {
            props.focusCallback?.(true);
          }}
          placeholder="Zadejte hledané slovo"
          InputProps={{
            ...params.InputProps,
            endAdornment: endAdornment,
          }}
        />
      )}
    />
  );
};

export default SearchBar;

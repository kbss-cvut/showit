import React from "react";
import {
  Box,
  Button,
  Fab,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Cancel as CancelIcon,
  LibraryAdd as AddNewIcon,
  Replay as ResetIcon,
} from "@mui/icons-material";
import { TermInterface } from "../api/data/terms";
import { PluginMetadata } from "./PluginApi";
import { getLocalized } from "../utils/IntlUtils";
import { useLanguage } from "../context/LanguageContext";
import mainTheme from "../app/theme";

declare type Value = {
  label: string;
  notation: string;
};

const initialState = {
  value: [
    {
      notation: "",
      label: "",
    },
  ] as Value[],
  isOpen: false,
};
let storedState = { ...initialState };

const CasNotationConcatGeneratorPlugin: React.FC<{ data: TermInterface }> = ({
  data,
}) => {
  const { language } = useLanguage();
  const [value, setValue] = React.useState<Value[]>(storedState.value);
  const [isOpen, setIsOpen] = React.useState(storedState.isOpen ?? true);
  const paperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const paper = paperRef.current;
    if (paper && paper.scrollHeight > paper.clientHeight) {
      paper.scrollTo({ top: paper.scrollHeight, behavior: "smooth" });
    }
  }, [value]);

  const addCurrentTerm = (value: Value[]) => {
    const currentRow = value[value.length - 1];
    const newLabel =
      currentRow.label +
      (currentRow.label.length > 0 ? " " : "") +
      getLocalized(data.label, language);
    const newNotation =
      currentRow.notation +
      (data.notation.length > 0 ? data.notation.join() : data.notation);
    const newValue = value.length > 1 ? value.slice(0, value.length - 1) : [];
    newValue.push({
      label: newLabel,
      notation: newNotation,
    });
    setValue(newValue);
    storedState.value = [...newValue];
  };
  const onAdd = () => {
    addCurrentTerm(value);
  };
  const onAddNewLine = () => {
    const newValue = [...value, { notation: "", label: "" }];
    addCurrentTerm(newValue);
  };
  const onReset = () => {
    setValue([{ ...initialState.value[0] }]);
    storedState = { ...initialState, isOpen };
  };
  const onClose = () => {
    setIsOpen(false);
    storedState = { ...storedState, isOpen: false };
  };
  const onReopen = () => {
    setIsOpen(true);
    storedState = { ...storedState, isOpen: true };
  };

  if (!isOpen) {
    return (
      <Tooltip title="Otevřít generátor notačních kódů">
        <Fab
          onClick={onReopen}
          color="primary"
          size="medium"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: (theme) => theme.zIndex.tooltip,
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    );
  }

  return (
    <Paper
      ref={paperRef}
      elevation={4}
      sx={{
        minWidth: "33%",
        maxHeight: "33.333vh",
        overflowY: "auto",
        boxSizing: "border-box",
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        px: 3,
        py: 1.5,
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        zIndex: (theme) => theme.zIndex.tooltip,
        color: "#000000",
      }}
    >
      <Stack direction="column" spacing={0.5} width="100%">
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 1,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h6">Generátor notačních kódů</Typography>
          <Box>
            <Tooltip title="Přidat pojem">
              <Button onClick={onAdd} color="primary">
                <AddIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Začít nový řádek a přidat pojem">
              <Button onClick={onAddNewLine} color="primary">
                <AddNewIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Resetovat">
              <Button onClick={onReset}>
                <ResetIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Zavřít">
              <Button onClick={onClose} color="secondary">
                <CancelIcon />
              </Button>
            </Tooltip>
          </Box>
        </Stack>
        {value.map((v, i) => (
          <Box
            key={i}
            sx={{
              borderTop: i > 0 ? 1 : 0,
              borderColor: mainTheme.palette.primary.main,
              pt: i > 0 ? 0.5 : 0,
            }}
          >
            <Typography variant="body1">
              <Typography component="span" fontWeight="fontWeightBold">
                Název:
              </Typography>{" "}
              {v.label}
            </Typography>
            <Typography variant="body1">
              <Typography component="span" fontWeight="fontWeightBold">
                Notace:
              </Typography>{" "}
              {v.notation}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export const metadata: PluginMetadata = {
  id: "CasNotationConcatGeneratorPlugin",
  name: "CasNotationConcatGeneratorPlugin",
  view: "TermDetail",
};

export default CasNotationConcatGeneratorPlugin;

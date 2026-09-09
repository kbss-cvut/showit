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
  Replay as ResetIcon,
} from "@mui/icons-material";
import { TermInterface } from "../api/data/terms";
import { PluginMetadata } from "./PluginApi";
import { getLocalized } from "../utils/IntlUtils";
import { useLanguage } from "../context/LanguageContext";

const initialState = {
  notation: "",
  label: "",
  isOpen: false,
};
let storedState = { ...initialState };

const CasNotationConcatGeneratorPlugin: React.FC<{ data: TermInterface }> = ({
  data,
}) => {
  const { language } = useLanguage();
  const [notation, setNotation] = React.useState(storedState.notation);
  const [label, setLabel] = React.useState(storedState.label);
  const [isOpen, setIsOpen] = React.useState(storedState.isOpen ?? true);
  const onAdd = () => {
    const newLabel =
      label +
      (label.length > 0 ? " " : "") +
      getLocalized(data.label, language);
    const newNotation =
      notation +
      (data.notation.length > 0 ? data.notation.join() : data.notation);
    setLabel(newLabel);
    setNotation(newNotation);
    storedState = {
      ...storedState,
      label: newLabel,
      notation: newNotation,
    };
  };
  const onReset = () => {
    setNotation("");
    setLabel("");
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
      elevation={4}
      sx={{
        minWidth: "33%",
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        px: 3,
        py: 1.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
        zIndex: (theme) => theme.zIndex.tooltip,
      }}
    >
      <Stack direction="column" spacing={0.5} width="100%">
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography variant="h6">Generátor notačních kódů</Typography>
          <Box>
            <Tooltip title="Přidat pojem">
              <Button onClick={onAdd} color="primary">
                <AddIcon />
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
        <Typography variant="body1">
          <Typography component="span" fontWeight="fontWeightBold">
            Název:
          </Typography>{" "}
          {label}
        </Typography>
        <Typography variant="body1">
          <Typography component="span" fontWeight="fontWeightBold">
            Notace:
          </Typography>{" "}
          {notation}
        </Typography>
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

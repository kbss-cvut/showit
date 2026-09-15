import { createTheme } from "@mui/material";
import { getEnv } from "../utils/Utils";

declare type Colors = {
  primary: string;
  secondary: string;
  primaryText: string;
  secondaryText: string;
  lightText: string;
};

/**
 * Named color schemes selectable via the "THEME" configuration variable (see getEnv).
 * Add new schemes here and reference their key in the THEME env/config value.
 */
const colorSchemes: Record<string, Colors> = {
  default: {
    primary: "#00BC58",
    secondary: "#3F3D56",
    primaryText: "#FFFFFF",
    secondaryText: "#FFFFFF",
    lightText: "#797979",
  },
  blue: {
    primary: "#00469b",
    secondary: "#fab413",
    primaryText: "#f2f2f2",
    secondaryText: "#262626",
    lightText: "#797979",
  },
};

const DEFAULT_SCHEME = "default";

function resolveColors(): Colors {
  const schemeName = getEnv("THEME", DEFAULT_SCHEME);
  const colors = colorSchemes[schemeName];
  if (!colors) {
    console.warn(
      `Unknown THEME "${schemeName}", falling back to "${DEFAULT_SCHEME}"`
    );
    return colorSchemes[DEFAULT_SCHEME];
  }
  return colors;
}

const activeColors = resolveColors();

const theme = createTheme({
  palette: {
    primary: {
      main: activeColors.primary,
    },
    secondary: {
      main: activeColors.secondary,
    },
    text: {
      primary: activeColors.primaryText,
      secondary: activeColors.secondaryText,
      disabled: activeColors.lightText,
    },
    divider: activeColors.secondaryText,
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI Light"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: 60,
    },
    h2: {
      fontSize: 40,
    },
  },
});

export default theme;

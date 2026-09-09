import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import theme from "./app/theme";
import { CssBaseline, responsiveFontSizes } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./Router";
import { PluginContext } from "./plugin/PluginRegistry";
import {
  LoadedPlugin,
  loadPlugins,
  PluginLoadSpecification,
} from "./plugin/PluginApi";
import { getEnv } from "./utils/Utils";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

function resolvePluginLoadingConfig(): PluginLoadSpecification[] {
  const pluginsEnv = getEnv("PLUGINS", "");
  const pluginIds = pluginsEnv.split(",");
  return pluginIds.map((pluginId) => ({
    id: pluginId,
    path: `./plugin/${pluginId}.tsx`,
  }));
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const responsiveTheme = responsiveFontSizes(theme);
  const [plugins, setPlugins] = useState<LoadedPlugin[]>([]);

  useEffect(() => {
    loadPlugins(resolvePluginLoadingConfig()).then((loaded) =>
      setPlugins(loaded)
    );
  }, [setPlugins]);

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={responsiveTheme}>
          <PluginContext.Provider value={plugins}>
            <CssBaseline />
            <Router />
          </PluginContext.Provider>
        </ThemeProvider>
      </StyledEngineProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;

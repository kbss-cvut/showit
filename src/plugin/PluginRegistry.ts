import { Context, createContext, useContext } from "react";
import { LoadedPlugin, View } from "./PluginApi";

export const PluginContext: Context<LoadedPlugin[]> = createContext(
  [] as LoadedPlugin[]
);

export const usePlugins = () => useContext(PluginContext);
export const useTermDetailPlugins = () => usePluginsByView("TermDetail");
export const useVocabularyDetailPlugins = () =>
  usePluginsByView("VocabularyDetail");
export const useVocabularyListPlugins = () =>
  usePluginsByView("VocabularyList");
export const useAppPlugins = () => usePluginsByView("App");

function usePluginsByView(view: View) {
  const plugins = usePlugins();
  return plugins.filter((p) => p.metadata.view === view);
}

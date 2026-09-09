import React from "react";

export type View = "TermDetail" | "VocabularyDetail" | "VocabularyList" | "App";

export interface PluginMetadata {
  id: string;
  name?: string;
  view: View;
}

export type PluginLoadSpecification = {
  id: string;
  path: string;
};

export type LoadedPlugin = {
  id: string;
  Component: React.ComponentType<any>;
  metadata: PluginMetadata;
};

/**
 * Loads plugins specified by the argument.
 *
 * - The plugin component should be exported as default export
 * - The plugin metadata should be exported under the name 'metadata'
 * @param plugins Plugins to load
 */
export async function loadPlugins(
  plugins: PluginLoadSpecification[]
): Promise<LoadedPlugin[]> {
  return await Promise.all(
    plugins.map(async ({ id, path }) => {
      const mod = await import(`./p_${path}.tsx`);
      return {
        id,
        Component: mod.default as React.ComponentType,
        metadata: mod.metadata || ({} as PluginMetadata),
      };
    })
  );
}

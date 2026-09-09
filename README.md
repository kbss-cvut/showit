# ShowIt

A React-based web application for browsing SKOS vocabularies and terms published by
TermIt and the SGoV (Sémantický slovník pojmů veřejné správy) ecosystem.

## Overview

ShowIt is a lightweight, read-only browser for RDF vocabularies and their terms.
It connects to a SPARQL endpoint and lets users search, list, and explore
vocabularies (`slovníky`) and individual terms (`pojmy`) with their definitions,
hierarchies, and semantic relations.

The application is built with **Vite** and **TypeScript**, styled with **Material UI (MUI)**.

## Development Requirements

Requires **Node.js 22+** and **npm**.

## Configuration

The application reads configuration from two sources:

1. **Build-time environment variables** prefixed with `VITE_`:

   | Variable          | Purpose                                 | Example                                     |
   | ----------------- | --------------------------------------- | ------------------------------------------- |
   | `SPARQL_ENDPOINT` | SPARQL endpoint for ldkit queries       | `http://localhost:7200/repositories/termit` |
   | `SUGGESTED_WORDS` | Comma-separated list of suggested words | `Délka,Lokalita,Dokumentace,Demolice`       |
   | `APP_CONTEXT`     | Base URL path of the application        | `/prohlizime`                               |
   | `PLUGINS`         | Comma-separated list of plugin ids      | `CasNotationConcatGeneratorPlugin`          |

2. **Runtime `config.js`** – For deployments where the build is served statically,
   `public/config.js` (or an equivalent file) can inject values through `window.__config__`.
   See `src/utils/Utils.ts` for the merging logic.

## Plugins

ShowIt supports runtime plugin components that can be rendered inside specific views.
Plugins are declared in the `PLUGINS` configuration variable and loaded dynamically
from `src/plugin/`.

Each plugin file must:

- Export its React component as the **default export**.
- Export a `metadata` object with at least an `id` (should be the same as the plugin's file name) and target `view`.

See `src/plugin/PluginApi.tsx` for the loading API and available plugin views.

### Supported views

Plugins can target one of the following views (`metadata.view`):

- `TermDetail` – rendered at the bottom of the term detail page (`TermPage`).
  The component receives the current term as a `data` prop.
- `VocabularyDetail` – rendered on the vocabulary detail page (`VocabularyPage`).
  The component receives the current vocabulary as a `data` prop.
- `VocabularyList` – rendered on the vocabularies list page (`VocabulariesPage`).
  The component receives the list of vocabularies as a `data` prop.
- `App` – rendered once inside the `Router`, outside the main layout switch.

### Example plugin

See the `p_CasNotationConcatGeneratorPlugin` for an example (prefix the plugin file name with a `p_`, a prefix is
required by Vite for [dynamic imports](https://vite.dev/guide/features#dynamic-import)).

Activate it by adding its id to the `PLUGINS` environment variable:

```bash
VITE_PLUGINS=CasNotationConcatGeneratorPlugin
```

Multiple plugins can be loaded by separating their ids with commas.

## License

This project is licensed under the [MIT License](LICENSE).

This project is a fork of [sgov-browser](https://github.com/datagov-cz/showit).

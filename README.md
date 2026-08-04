# ShowIt

A React-based web application for browsing SKOS vocabularies and terms published by
TermIt and the SGoV (Sémantický slovník pojmů veřejné správy) ecosystem.

## Overview

ShowIt is a lightweight, read-only browser for RDF vocabularies and their terms.
It connects to a SPARQL endpoint and lets users search, list, and explore
vocabularies (`slovníky`) and individual terms (`pojmy`) with their definitions,
hierarchies, and semantic relations.

The application is built with **Create React App** and **TypeScript**, styled with
**Material UI (MUI)**.

## Development Requirements

Requires **Node.js 16+** and **npm**.

## Configuration

The application reads configuration from two sources:

1. **Build-time environment variables** prefixed with `REACT_APP_`:

   | Variable          | Purpose                                 | Example                                     |
   |-------------------|-----------------------------------------|---------------------------------------------|
   | `SPARQL_ENDPOINT` | SPARQL endpoint for ldkit queries       | `http://localhost:7200/repositories/termit` |
   | `SUGGESTED_WORDS` | Comma-separated list of suggested words | `Délka,Lokalita,Dokumentace,Demolice`       |
   | `APP_CONTEXT`     | Base URL path of the application        | `/prohlizime`                               |

2. **Runtime `config.js`** – For deployments where the build is served statically,
   `public/config.js` (or an equivalent file) can inject values through `window.__config__`.
   See `src/utils/Utils.ts` for the merging logic.

## License

This project is licensed under the [MIT License](LICENSE).

This project is a fork of [sgov-browser](https://github.com/datagov-cz/showit).

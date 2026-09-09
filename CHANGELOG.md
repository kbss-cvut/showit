# Changelog

All notable changes to this project are documented in this file.

## [0.5.1]

- Fix plugin dynamic import configuration issue - all plugin files must be prefixed with `p_`.

## [0.5.0]

- Migrate build tooling from Create React App to Vite 8.
- Rename build-time env variable prefix from `REACT_APP_` to `VITE_`.
- Implement a plugin system allowing to add optional functionality.

## [0.4.0] - 2026-09-03

- Include scopeNote in term detail.

## [0.3.0] - 2026-08-20

- Migrate data model to pure SKOS + data description ontology.

## [0.2.0] - 2026-08-13

- GH-1: Support providing suggested search words as config
- GH-2:
  - Show notations as chips next to term pref label
  - Show skos:related(Match) terms for a term
- Support runtime rather than build-time configuration
- [Upd]: Update some dependencies (react-scripts, spinners)
- GH-5:
  - Update LDkit to 2.7.2
  - Support multilingual strings for label, altLabels and definition
  - Support multilingual strings for vocabulary label
  - Use localized translations wherever relevant
- Skip snapshots when searching
- Improve footer styling (color consistency)

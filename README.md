# Keybits Javascript

A JavaScript library for interacting with Keybits data structures and files.

## Installation

At the root of the project directory:
```bash
npm install
```

## Available Scripts

### `npm run watch -- <options>`

Builds the source files in watch mode, then outputs to a `build` directory at
the respotiory root. Can buuild the project in development mode or production
mode. By default builds in the mode specified by a `.env` or falls back to
development mode. Can override with a command line option. Use `--help` option
to view options.

### `npm run build -- <options>`

Builds the source files in the project, then outputs to a `build` directory at
the respotiory root. Can buuild the project in development mode or production
mode. By default builds in the mode specified by a `.env` or falls back to
development mode. Can override with a command line option. Use `--help` option
to view options.

### `npm run clean`

Cleans the build directories. Recursively removes files
located in the build directories.
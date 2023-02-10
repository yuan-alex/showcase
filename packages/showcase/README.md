# Showcase.js CLI

Showcase.js is a React story visualizer and test framework. Using Showcase, you can build a storybook-like environment for your React components and perform visual regression tests using your own CI.

View the [documentation](https://showcasejs.org).

## Quick Start

### Installation

```bash
pnpm i @showcasejs/cli --save-dev
```

### Usage

Use `showcase dev` to start the development server. This will start a server on port 6006 by default.

```bash
showcase dev
```

Use `showcase build` to build the showcase. This will build the showcase into the `dist/showcase` directory.

```bash
showcase build
```

Use `showcase create-snapshots` to create visual regression tests. Images will be output in the `.showcase/snapshots` directory.

```bash
showcase create-snapshots
```

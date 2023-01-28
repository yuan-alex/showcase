# Showcase

**Showcase is pre-alpha software. Do not use it for your project.**

Showcase is a React UI component story visualizer from the future.

It's focused on:

- Story version control
- Developer experience & performance
- Bundler interoperability
- Visual snapshot testing

## How it works

The Showcase CLI finds all story files `(*.stories.tsx)` and creates a bundler target file that imports and exports all stories from your project. Vite will then bundle a pre-compiled client with the bundler target that is served to the browser.

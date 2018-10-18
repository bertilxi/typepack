#

![TypePack](logo.png?raw=true "TypePack")

Zero config Typescript Bundling.

## Installation

```sh
npm i -g typepack
# or
npm i --save-dev typepack
# or
yarn add -D typepack
```

## Use

### Init

```sh
tp init [name] [--mode]

tp init awesome-app # --mode web
tp init awesome-app --mode node
```

### Dev

```sh
tp dev
```

### Build

```sh
# Production build
tp build
# Dev build
tp build --dev
# Measure build time
tp build --smp
# Analyze bundle
tp build --analyze
```

### Test

```sh
tp test
```

## Configurations

All customizations could be made in the `typepack.ts` file.
For a webapp is not needed.

### For a node app

```Typescript
module.exports = {
  mode: "node"
};
```

## How it works

Internally it uses `webpack` for the module bundling, `webpack-dev-server` or `nodemon` (depending on the environment) for development and `jest` for unit testing.
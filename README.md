# TypePack

Zero config Typescript Bundling

## Installation

```sh
npm i -g typepack
# or
npm i --save-dev typepack
# or
yarn add -D typepack
```

## Use

### Dev

```sh
typepack dev
# or
tp dev
```

### Build

```sh
typepack build
# or
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
typepack test
# or
tp test
```

## Configurations

All customization is made in the `typepack.ts` file.
For a client/webapp is not needed.

### For BackEnd/Server

```Typescript
module.exports = {
  mode: "server"
};
```

### For CLI

```Typescript
module.exports = {
  mode: "cli"
};
```
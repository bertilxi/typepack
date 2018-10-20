#

![TypePack](logo.png?raw=true "TypePack")

Create Typescript projects with minimal configuration.

## Description
`Typescript` is a really nice language, combining the flexibility of `Javascript` with a great type system.

Starting a `Typescript` project involves choosing between only using the typescript compiler or configuring `webpack` (or your bundler of preference) to handle the build.
Then the common files that you need to set up everytime like `tsconfig.json`, `tslint.json`, etc.
And then the main types you need i.e. `@types/node`

Also if you maintain many projects, you would like to have everything up to date, with the same optimized configuration for everyone.

The idea of this tool is to handle all that complexity for you. It can create the initial project structure (could be web or node at the moment), starts the dev server, does the production build and run the tests. 

## How it works
- The core of this cli is `webpack`.
- `jest` is used for running the unit tests.
- Your project source code will be transpiled first by typescript and then by `babel` to handle the polyfills.
- In `node` mode the dev server `nodemon`.

## Why did i do this?

I love how `Typescript` and the js ecosystem works, i use to start a new project once in a while and i noticed that i have different configurations everytime i start, and when i change it in some place i have to change other projects one by one, this is really annoying. 

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

## Have a suggestion?
This project is far from being the right tool to handle all use cases.

If you have an idea, a use case to cover or a suggestion, don't hesitate in contacting me or opening an issue.
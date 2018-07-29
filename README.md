# TypePack

Zero config Typescript Bundling

## Use

### Dev

```sh
typepack dev
# or
tp dev
```

### Production Build

```sh
typepack build
# or
tp build
```

### Development Build

```sh
typepack build:dev
# or
tp build:dev
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

### For a BackEnd/Server use

```Typescript
module.exports = {
  mode: "server"
};
```

### For a CLI use

```Typescript
module.exports = {
  mode: "cli"
};
```
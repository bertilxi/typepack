import { resolve, join } from "path";

const root = resolve(process.cwd());
export const paths = {
  root,
  src: join(root, "./src"),
  output: join(root, "dist"),
  entry: {
    main: join(root, "./src/index.ts")
  }
};

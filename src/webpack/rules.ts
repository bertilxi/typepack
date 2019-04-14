import { loaders } from "./loaders";
import { paths } from "../service/path";
import { RuleSetRule } from "webpack";

interface RuleMap {
  [key: string]: RuleSetRule;
}

export const rules: RuleMap = {
  ts: {
    test: /\.tsx?$/,
    use: [loaders.ts],
    include: paths.src,
    exclude: /(node_modules)/
  }
};

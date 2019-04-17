import { loaders } from "./loaders";
import { paths } from "../service/path";
import { RuleSetRule } from "webpack";
import { dynamicRequire } from "../service/utils";

interface RuleMap {
  ts: RuleSetRule;
  html: RuleSetRule;
  styles: RuleSetRule;
  images: RuleSetRule;
  fonts: RuleSetRule;
  media: RuleSetRule;
}

export const rules: RuleMap = {
  ts: {
    test: /\.tsx?$/,
    use: [loaders.ts()],
    include: paths.src,
    exclude: /(node_modules)/
  },
  html: {
    test: /\.(html)$/,
    use: [loaders.html()],
    include: paths.src,
    exclude: /node_modules/
  },
  styles: {
    test: /\.css$/,
    use: [loaders.style(), loaders.css(), loaders.postcss()]
  },
  images: {
    test: /\.(png|svg|jpg|gif)$/,
    loader: dynamicRequire.resolve("url-loader"),
    options: { limit: 10000, name: "images/[name].[hash:7].[ext]" }
  },
  fonts: {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    loader: dynamicRequire.resolve("url-loader"),
    options: { limit: 10000, name: "fonts/[name].[hash:7].[ext]" }
  },
  media: {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: dynamicRequire.resolve("url-loader"),
    options: { limit: 10000, name: "media/[name].[hash:7].[ext]" }
  }
};

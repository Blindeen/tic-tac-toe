import { join, resolve as _resolve } from "path";

export const mode = "development";
export const entry = "./src/app.ts";
export const devServer = {
  static: [
    {
      directory: join(__dirname),
    },
  ],
};
export const output = {
  filename: "app.js",
  path: _resolve(__dirname, "out"),
  publicPath: "/out/",
};
export const devtool = "inline-source-map";
export const module = {
  rules: [
    {
      test: /\.ts$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
  ],
};
export const resolve = {
  extensions: [".ts", ".js"],
};

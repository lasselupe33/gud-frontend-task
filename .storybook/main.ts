import fs from "fs";
import { builtinModules } from "module";
import path from "path";

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/__stories__/**/*.story.*"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-webpack5-compiler-babel",
    "@chromatic-com/storybook"
  ],
  framework: "@storybook/nextjs",

  previewHead: (html) => {
    const extraHtml = fs.readFileSync(
      path.resolve(__dirname, "preview-head.html"),
      "utf-8",
    );

    return `${html}${extraHtml}`;
  },

  babel: async (options) => {
    const babelConfigPath = path.resolve(__dirname, "..", "babel.config.js");

    if (!fs.existsSync(babelConfigPath)) {
      return options;
    }

    return {
      ...options,
      extends: babelConfigPath,
    };
  },

  webpackFinal: async (config) => {
    config.module ??= {};
    config.module.rules ??= [];

    const disableNodeModules = Object.fromEntries(
      builtinModules.map((module) => [module, false]),
    );

    config.resolve = {
      ...config.resolve,
      // @ts-expect-error Poor typings
      fallback: {
        ...(config.resolve || {}).fallback,
        ...disableNodeModules,
      },
    };

    config.module.rules.push({
      test: /\.(ts|js|mjs|tsx|jsx)$/,
      exclude: /node_modules|storybook-stories/,
      use: [
        {
          loader: "@wyw-in-js/webpack-loader",
          options: {
            sourceMap: process.env.NODE_ENV !== "production",
            extension: ".css",
          },
        },
      ],
    });

    return config;
  },
};

export default config;

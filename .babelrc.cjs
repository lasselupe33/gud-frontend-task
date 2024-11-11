/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: false,
        bugfixes: true,
        modules: false,
      },
    ],

    [
      "@babel/preset-react",
      {
        runtime: "automatic",
        development: process.env["NODE_ENV"] !== "production",
      },
    ],

    ["@babel/preset-typescript"],

    [
      "@wyw-in-js/babel-preset",
      {
        babelOptions: {
          configFile: __filename,
        },
      },
    ],
  ].filter((it) => it !== null),

  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3,
      },
    ],
  ],
};

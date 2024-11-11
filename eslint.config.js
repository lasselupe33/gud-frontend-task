/* eslint-disable import-x/no-named-as-default-member */
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginCommentLength from "eslint-plugin-comment-length";
import eslintPluginGroupedCssDeclarations from "eslint-plugin-grouped-css-declarations";
import eslintPluginImportX from "eslint-plugin-import-x";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintReactPlugin from "eslint-plugin-react";
import eslintReactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  //
  // Global: Configuration
  //
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    ignores: [
      "**/lib/**/*",
      "**/.next/**/*",
      "**/node_modules/**/*",
      "**/*.json",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
  },

  //
  // Plugins: Base
  //
  eslint.configs.recommended,
  eslintConfigPrettier,

  //
  // Plugin: Typescript
  //
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],

      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/array-type": [
        "error",
        { default: "array-simple", readonly: "array-simple" },
      ],
      "@typescript-eslint/unbound-method": "off",
    },
  },

  //
  // Plugin: import
  //
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.react,
  eslintPluginImportX.flatConfigs.typescript,
  {
    rules: {
      "import-x/default": "off",
      "import-x/no-unresolved": "off", // TypeScript already warns on this category of errors
      "import-x/namespace": "off", // disabled as it is irrelevant with typescript, and very costly performance wise.
      "import-x/no-relative-packages": "error",
      "import-x/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/src/**/__tests__/**/*",
            "**/src/**/__stories__/**/*",
            "**/src/**/*.story.*",
            "**/.*rc.*",
            "**/next.config.js",
            "**/webpack*.js",
            "**/eslint.config.*",
          ],
          optionalDependencies: false,
          peerDependencies: false,
          bundledDependencies: false,
        },
      ],
      "import-x/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
          },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "@apps/**",
              group: "internal",
            },
            {
              pattern: "@i-ark/**",
              group: "internal",
            },
            {
              pattern: "@pm2/**",
              group: "internal",
            },
            {
              pattern: "@provider/**",
              group: "internal",
            },
            {
              pattern: "@ui/**",
              group: "internal",
            },
            {
              pattern: "@utils/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          distinctGroup: false,
        },
      ],
    },
  },

  //
  // Plugins: react
  //
  eslintReactPlugin.configs.flat.recommended,
  {
    plugins: {
      // NB: Awaiting built-in flat-config support
      "react-hooks": eslintReactHooksPlugin,
    },
    rules: eslintReactHooksPlugin.configs.recommended.rules,
  },
  eslintPluginJsxA11y.flatConfigs.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      //
      // disable legacy React plugin rules (irrelevant as we're using
      // TypeScript with latest version of JSX runtime)
      //
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",

      //
      // disable irrelevant rules to improve performance of eslint
      //
      "react/no-direct-mutation-state": "off", // we use functional components

      //
      // disable/alter rules that wrongly report errors
      //
      "jsx-a11y/no-autofocus": [
        "error",
        {
          ignoreNonDOM: true,
        },
      ],
    },
  },

  //
  // Plugin: comment-length
  //
  {
    ...eslintPluginCommentLength.configs["flat/recommended"],
    rules: {
      ...eslintPluginCommentLength.configs["flat/recommended"].rules,
      "comment-length/limit-tagged-template-literal-comments": [
        "warn",
        { tags: ["css"] },
      ],
    },
  },

  //
  // Plugin: grouped-css-declarations
  //
  eslintPluginGroupedCssDeclarations.configs["flat/recommended"],
);

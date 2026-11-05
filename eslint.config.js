// @ts-check
// Same rule set as the patient portal: angular-eslint and typescript-eslint recommended, formatting left to Prettier.
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettier = require("eslint-config-prettier");

module.exports = defineConfig(
  {
    ignores: ["dist/**", "coverage/**", ".angular/**"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    extends: [
      ...angular.configs.tsRecommended,
      ...tseslint.configs.recommended,
      prettier,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { prefix: ["app", "lib"], style: "kebab-case", type: "element" },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        { prefix: ["app", "lib"], style: "camelCase", type: "attribute" },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended, prettier],
  },
);

// @ts-check
// Same rule set as the patient portal: angular-eslint and typescript-eslint recommended, formatting left to Prettier.
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettier = require("eslint-config-prettier");

// Layer rules of the library. Each folder may import only what its block allows.
// A later block for the same files would replace these options, so the folders never overlap.
const entryPoints = ["core", "fhir", "angular/data", "angular/ui"];
const entryPointsOnly = [
  {
    regex: `^fhir-vitals(/(?!(${entryPoints.join("|")})$)|$)`,
    message: `Nur über einen Einstiegspunkt importieren: ${entryPoints
      .map((name) => `fhir-vitals/${name}`)
      .join(", ")}.`,
  },
  {
    regex: "^(\\.{1,2}/)+(.*/)?(core|fhir|data|ui)/src(/|$)",
    message:
      "Andere Schichten über ihren Paketnamen importieren, nie über einen relativen Pfad.",
  },
];
const frameworkFree = {
  regex: "^(@angular/|rxjs(/|$)|zone\\.js(/|$)|vue$|@vue/)",
  message:
    "Dieser Teil bleibt frei von UI-Frameworks, damit auch Vue oder andere ihn nutzen können.",
};
// Relative paths from the app into the library sources or into dist.
const libraryByPath = "^\\.{1,2}/(.*/)?(fhir-vitals|dist)(/|$)";
// The same for dynamic imports, written for an esquery selector, plus anything that is no entry point.
const libraryByPathOrDeep = `^(fhir-vitals(\\/(?!(${entryPoints
  .map((name) => name.replace("/", "\\/"))
  .join("|")})$)|$)|\\.{1,2}\\/(.*\\/)?(fhir-vitals|dist)(\\/|$))`;
const serverGlobals = ["fetch", "XMLHttpRequest", "WebSocket", "EventSource"];
const noServerAccess =
  "Serverzugriff nur über die Adapter in fhir-vitals/fhir.";
const layer = (folder, ...patterns) => ({
  files: [`projects/fhir-vitals/${folder}/**/*.ts`],
  rules: {
    "@typescript-eslint/no-restricted-imports": [
      "error",
      { patterns: [...entryPointsOnly, ...patterns] },
    ],
  },
});

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
  // core: domain, ports and flows. Plain TypeScript without frameworks and without server access.
  layer("core", frameworkFree, {
    regex: "^(fhirclient|fhir-vitals)(/|$)",
    message:
      "core hängt von keinem anderen Teil ab und spricht nicht selbst mit Servern.",
  }),
  // fhir: adapters for the ports of core, also without frameworks.
  layer("fhir", frameworkFree, {
    regex: "^fhir-vitals/(fhir|angular/.+)$",
    message: "Die Adapter kennen nur fhir-vitals/core.",
  }),
  // angular/data: the Angular data layer. It uses core and the adapters, but never the UI.
  layer(
    "angular/data",
    {
      regex: "^fhir-vitals/angular/(data|ui)$",
      message:
        "Die Datenschicht kennt die UI nicht. Innerhalb der eigenen Schicht relativ importieren.",
    },
    {
      regex: "^fhirclient(/|$)",
      message: "Serverzugriff nur über die Adapter in fhir-vitals/fhir.",
    },
  ),
  // angular/ui: Angular components. They get data through inputs and never load it themselves.
  layer(
    "angular/ui",
    {
      regex: "^fhir-vitals/(fhir|angular/(data|ui))$",
      message:
        "Die UI importiert nur fhir-vitals/core. Daten kommen über Inputs, verbunden wird in der App.",
    },
    {
      regex: "^(fhirclient|@angular/common/http)(/|$)",
      message: "Die UI spricht nicht selbst mit Servern.",
    },
  ),
  // core and the UI never talk to servers, not even through browser globals.
  {
    files: [
      "projects/fhir-vitals/core/**/*.ts",
      "projects/fhir-vitals/angular/ui/**/*.ts",
    ],
    rules: {
      "no-restricted-globals": [
        "error",
        ...serverGlobals.map((name) => ({ name, message: noServerAccess })),
      ],
      "no-restricted-properties": [
        "error",
        ...["globalThis", "window", "self"].flatMap((object) =>
          serverGlobals.map((property) => ({
            object,
            property,
            message: noServerAccess,
          })),
        ),
      ],
    },
  },
  // The package root stays an empty placeholder, so "fhir-vitals" never becomes a second way in.
  {
    files: ["projects/fhir-vitals/src/**/*.ts"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: ".*",
              message:
                "Der Paketname fhir-vitals bleibt ein leerer Platzhalter. Code gehört in einen Einstiegspunkt.",
            },
          ],
        },
      ],
      "no-restricted-globals": [
        "error",
        ...serverGlobals.map((name) => ({ name, message: noServerAccess })),
      ],
    },
  },
  // Dynamic imports and import() types would bypass the import rules above.
  {
    files: ["projects/fhir-vitals/**/*.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportExpression",
          message:
            "Keine dynamischen Importe in der Bibliothek, sonst greifen die Schichtregeln nicht.",
        },
        {
          selector: "TSImportType",
          message:
            "Keine import()-Typen in der Bibliothek, sonst greifen die Schichtregeln nicht. Stattdessen import type verwenden.",
        },
      ],
    },
  },
  // Apps use the library like an installed package.
  {
    files: ["projects/demo-app/**/*.ts"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            entryPointsOnly[0],
            {
              regex: libraryByPath,
              message: "Die Bibliothek nur über ihren Paketnamen importieren.",
            },
          ],
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: `ImportExpression[source.value=/${libraryByPathOrDeep}/]`,
          message: "Die Bibliothek nur über ihren Paketnamen importieren.",
        },
        {
          selector: `TSImportType[argument.literal.value=/${libraryByPathOrDeep}/]`,
          message: "Die Bibliothek nur über ihren Paketnamen importieren.",
        },
        {
          selector: "ImportExpression[source.type='TemplateLiteral']",
          message:
            "Dynamische Importe mit einer festen Zeichenkette in Anführungszeichen schreiben, damit ESLint sie prüfen kann.",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended, prettier],
  },
);

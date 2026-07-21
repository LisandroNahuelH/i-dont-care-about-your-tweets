import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const browserGlobals = {
  MutationObserver: "readonly",
  chrome: "readonly",
  console: "readonly",
  document: "readonly",
  Element: "readonly",
  Event: "readonly",
  EventTarget: "readonly",
  HTMLElement: "readonly",
  MouseEvent: "readonly",
  globalThis: "readonly"
};

const nodeGlobals = {
  __dirname: "readonly",
  console: "readonly",
  process: "readonly",
  URL: "readonly"
};

export default [
  {
    ignores: ["content.js", "dist/**", "node_modules/**"]
  },
  js.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module"
      },
      globals: browserGlobals
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/consistent-type-imports": "error",
      "no-undef": "off"
    }
  },
  {
    files: ["tests/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module"
      },
      globals: {
        ...nodeGlobals
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "off",
      "no-undef": "off"
    }
  },
  {
    files: ["tools/**/*.cjs", "tools/**/*.mjs", "eslint.config.mjs"],
    languageOptions: {
      globals: nodeGlobals
    }
  }
];

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  // Global ignores
  {
    ignores: ["dist/**", "node_modules/**", "*.d.ts", "vite.config.test.ts"],
  },

  // JavaScript files configuration
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^[A-Z_]",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  // TypeScript files configuration
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["src/test/**", "**/*.test.*", "**/*.spec.*"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2022,
        React: "readonly",
        JSX: "readonly",
        NodeJS: "readonly",
        process: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^[A-Z_]",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-unused-vars": "off", // Turn off base rule as it can report incorrect errors
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-undef": "off", // TypeScript handles this
    },
  },

  // Test files configuration
  {
    files: ["src/test/**", "**/*.test.*", "**/*.spec.*"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2022,
        React: "readonly",
        JSX: "readonly",
        NodeJS: "readonly",
        process: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
        // Don't include project for test files to avoid strict checking
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "react-refresh/only-export-components": "off",
      "no-undef": "off",
    },
  },

  // Node.js configuration files
  {
    files: ["vite.config.js", "vite.config.ts", "eslint.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-console": "off",
    },
  },

  // Service Worker configuration
  {
    files: ["public/sw.js", "**/sw.js", "**/*worker*.js"],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        self: "readonly",
        clients: "readonly",
        caches: "readonly",
        skipWaiting: "readonly",
        addEventListener: "readonly",
        importScripts: "readonly",
      },
    },
    rules: {
      "no-console": "off", // Allow console in service workers for debugging
    },
  },
];

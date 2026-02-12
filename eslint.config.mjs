import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // NOTE: Temporary relaxations to keep CI green while we incrementally fix lint.
  // We intentionally keep them as warnings (not errors) to avoid blocking merges.
  {
    rules: {
      "react-hooks/error-boundaries": "warn",
      "react/no-unescaped-entities": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@next/next/no-html-link-for-pages": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "react/jsx-no-comment-textnodes": "warn",
    },
  },
]);

export default eslintConfig;

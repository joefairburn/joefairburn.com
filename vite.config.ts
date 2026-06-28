import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

// Generated files that are committed but not owned by the formatter/linter.
const generatedFiles = ["worker-configuration.d.ts", "src/routeTree.gen.ts"];

export default defineConfig({
  // Pre-commit (Vite+ git hook in .vite-hooks) runs this on staged files.
  staged: {
    "*.{js,jsx,ts,tsx,json,jsonc,css}": "vp check --fix",
  },

  // oxlint config (formerly .oxlintrc.json).
  lint: {
    ignorePatterns: generatedFiles,
    rules: {
      "func-style": "off",
      "typescript/no-import-type-side-effects": "off",
      "unicorn/text-encoding-identifier-case": "off",
    },
  },

  // oxfmt config (formerly .oxfmtrc.jsonc).
  fmt: {
    ignorePatterns: generatedFiles,
    arrowParens: "always",
    bracketSameLine: false,
    bracketSpacing: true,
    endOfLine: "lf",
    experimentalSortImports: {
      ignoreCase: true,
      newlinesBetween: true,
      order: "asc",
    },
    experimentalSortPackageJson: true,
    jsxSingleQuote: false,
    printWidth: 80,
    quoteProps: "as-needed",
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: "es5",
    useTabs: false,
  },

  plugins: [
    tailwindcss(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    viteReact(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
});

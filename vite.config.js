/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { resolve } from "node:path";
import { writeRouteHtmlFiles } from "./src/seo/prerender.ts";

/**
 * After the build, writes one HTML file per route with its own SEO meta
 * (title, description, canonical, Open Graph) — see src/seo/prerender.ts.
 */
function routeHtml() {
  let outDir;
  return {
    name: "route-html",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    writeBundle() {
      writeRouteHtmlFiles(outDir);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    routeHtml(),
    // Bundle analyzer - only via `npm run build:analyze` (--mode analyze).
    // Normal builds must not open a browser or ship stats.html to production.
    ...(mode === "analyze"
      ? [
          visualizer({
            filename: "dist/stats.html",
            open: true,
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@assets": resolve(__dirname, "src/assets"),
      "@utils": resolve(__dirname, "src/utils"),
      "@constants": resolve(__dirname, "src/constants"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@styles": resolve(__dirname, "src/styles"),
      "@types": resolve(__dirname, "src/types"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Vite 8 (Rolldown) requires manualChunks as a function
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router")) {
              return "router";
            }
            if (id.includes("react") || id.includes("scheduler")) {
              return "vendor";
            }
          }
        },
      },
    },
    sourcemap: true,
    minify: "terser",
    target: "es2015",
  },
  server: {
    port: 5173,
    host: true,
    open: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "dist/",
        "public/",
      ],
    },
  },
}));

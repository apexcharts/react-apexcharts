import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite config — fix the dual apexcharts instance problem.
 *
 * When "react-apexcharts" is installed as "file:.." (local), npm places its
 * peer-dependency copy of apexcharts in:
 *   react-apexcharts/node_modules/apexcharts/           (instance A)
 * while the example app has its own copy in:
 *   example/node_modules/apexcharts/                    (instance B)
 *
 * The built dist files (react-apexcharts-core.esm.js) import from
 * "apexcharts/core" and Vite resolves that relative to the dist file's
 * location, finding instance A.  Meanwhile, the example source files import
 * "apexcharts/bar", "apexcharts/features/legend", etc. and land on instance B.
 * Each instance has its own module-level `registry = {}`, so registrations
 * from instance B never reach the Chart component using instance A.
 *
 * Fix: `resolve.dedupe: ["apexcharts"]` tells Vite to always resolve
 * "apexcharts" (and all its subpath exports like "apexcharts/core",
 * "apexcharts/line", etc.) from a single canonical location — the first
 * one found in node_modules — regardless of where the importing file lives.
 * Package.json exports are still fully honoured.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["apexcharts"],
  },
});

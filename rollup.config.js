const { babel } = require("@rollup/plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");

// Rollup strips "use client" directives from source files by default.
// This plugin re-adds it to the top of the output for client-side bundles
// so that Next.js App Router correctly identifies them as Client Components.
function useClient() {
  return {
    name: "use-client",
    renderChunk(code) {
      return { code: `"use client";\n${code}`, map: null };
    },
  };
}

const input = "./src/react-apexcharts.jsx";
const serverInput = "./src/react-apexcharts-server.jsx";
const hydrateInput = "./src/react-apexcharts-hydrate.jsx";
const coreInput = "./src/react-apexcharts-core.jsx";
const coreServerInput = "./src/react-apexcharts-core-server.jsx";
const coreHydrateInput = "./src/react-apexcharts-core-hydrate.jsx";

const external = ["react", "apexcharts", "apexcharts/ssr", "apexcharts/client", "apexcharts/core", "prop-types"];

const globals = {
  react: "React",
  apexcharts: "ApexCharts",
  "apexcharts/ssr": "ApexCharts",
  "apexcharts/client": "ApexCharts",
  "apexcharts/core": "ApexCharts",
  "prop-types": "PropTypes",
};

const babelPlugin = babel({
  exclude: "node_modules/**",
  babelHelpers: "bundled",
});

// commonjs build (for node/older bundlers)
const cjsConfig = {
  input,
  output: [
    // new standard name
    {
      file: "dist/react-apexcharts.cjs.js",
      format: "cjs",
      exports: "default",
    },
    // backward compatible name
    {
      file: "dist/react-apexcharts.min.js",
      format: "cjs",
      exports: "default",
    },
  ],
  external,
  plugins: [nodeResolve({ browser: true }), babelPlugin, terser(), useClient()],
};

// esm build (for modern bundlers like vite, webpack 5+)
const esmConfig = {
  input,
  output: {
    file: "dist/react-apexcharts.esm.js",
    format: "esm",
  },
  external,
  plugins: [nodeResolve({ browser: true }), babelPlugin, terser(), useClient()],
};

// iife build (for script tags in browser)
const iifeConfig = {
  input,
  output: {
    name: "ReactApexChart",
    file: "dist/react-apexcharts.iife.min.js",
    format: "iife",
    globals,
  },
  external,
  plugins: [nodeResolve({ browser: true }), babelPlugin, terser()],
};

// server component build (esm only, for Next.js App Router)
const serverConfig = {
  input: serverInput,
  output: {
    file: "dist/react-apexcharts-server.esm.js",
    format: "esm",
  },
  external,
  plugins: [nodeResolve({ browser: false }), babelPlugin, terser()],
};

// hydrate component build (esm only, for Next.js App Router)
const hydrateConfig = {
  input: hydrateInput,
  output: {
    file: "dist/react-apexcharts-hydrate.esm.js",
    format: "esm",
  },
  external,
  plugins: [nodeResolve({ browser: true }), babelPlugin, terser(), useClient()],
};

// --- Core variants (tree-shaking: imports from apexcharts/core) ---

// core: commonjs build
const coreCjsConfig = {
  input: coreInput,
  output: {
    file: "dist/react-apexcharts-core.cjs.js",
    format: "cjs",
    exports: "default",
  },
  external,
  plugins: [nodeResolve({ browser: true }), babelPlugin, terser(), useClient()],
};

// core: esm build
const coreEsmConfig = {
  input: coreInput,
  output: {
    file: "dist/react-apexcharts-core.esm.js",
    format: "esm",
  },
  external,
  plugins: [nodeResolve({ browser: true }), babelPlugin, terser(), useClient()],
};

// core: server component build (esm only)
const coreServerConfig = {
  input: coreServerInput,
  output: {
    file: "dist/react-apexcharts-core-server.esm.js",
    format: "esm",
  },
  external,
  plugins: [nodeResolve({ browser: false }), babelPlugin, terser()],
};

// core: hydrate component build (esm only)
const coreHydrateConfig = {
  input: coreHydrateInput,
  output: {
    file: "dist/react-apexcharts-core-hydrate.esm.js",
    format: "esm",
  },
  external,
  plugins: [nodeResolve({ browser: true }), babelPlugin, terser(), useClient()],
};

module.exports = [cjsConfig, esmConfig, iifeConfig, serverConfig, hydrateConfig, coreCjsConfig, coreEsmConfig, coreServerConfig, coreHydrateConfig];
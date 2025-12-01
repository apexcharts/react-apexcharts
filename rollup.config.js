const { babel } = require("@rollup/plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");
const path = require("path");

const input = "./src/react-apexcharts.jsx";

const external = ["react", "apexcharts", "prop-types"];

const globals = {
  react: "React",
  apexcharts: "ApexCharts",
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
  plugins: [nodeResolve({ browser: true }), babelPlugin, terser()],
};

// esm build (for modern bundlers like vite, webpack 5+)
const esmConfig = {
  input,
  output: {
    file: "dist/react-apexcharts.esm.js",
    format: "esm",
  },
  external,
  plugins: [nodeResolve({ browser: true }), babelPlugin, terser()],
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

module.exports = [cjsConfig, esmConfig, iifeConfig];
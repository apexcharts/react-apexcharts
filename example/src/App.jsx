import React, { useState, lazy, Suspense } from "react";
import Area from "./chart-types/Area";
import Bar from "./chart-types/Bar";
import Column from "./chart-types/Column";
import Line from "./chart-types/Line";
import Donut from "./chart-types/Donut";
import RadialBar from "./chart-types/RadialBar";
import ChartUpdate from "./ChartUpdate";

// Lazy-load tree-shaking demos so apexcharts/core doesn't interfere
// with apexcharts/client (full bundle) used by the regular demos.
const TreeShakingLine = lazy(() => import("./chart-types/TreeShakingLine"));
const TreeShakingBar = lazy(() => import("./chart-types/TreeShakingBar"));
const TreeShakingMixed = lazy(() => import("./chart-types/TreeShakingMixed"));

export default function App() {
  const [selectedChart, setSelectedChart] = useState("line");

  const handleChartChange = (e) => {
    setSelectedChart(e.target.value);
  };

  return (
    <div className="app">
      <select id="lang" value={selectedChart} onChange={handleChartChange}>
        <option value="line">Line</option>
        <option value="area">Area</option>
        <option value="bar">Bar</option>
        <option value="column">Column</option>
        <option value="radialbar">RadialBar</option>
        <option value="donut">Donut</option>
        <option value="updateExample">Chart Update Example</option>
        <optgroup label="Tree-shaking (apexcharts/core)">
          <option value="treeshaking-line">Line (core)</option>
          <option value="treeshaking-bar">Bar (core)</option>
          <option value="treeshaking-mixed">Mixed (core)</option>
        </optgroup>
      </select>

      {selectedChart === "area" ? <Area></Area> : null}
      {selectedChart === "bar" ? <Bar></Bar> : null}
      {selectedChart === "line" ? <Line></Line> : null}
      {selectedChart === "column" ? <Column></Column> : null}
      {selectedChart === "radialbar" ? <RadialBar></RadialBar> : null}
      {selectedChart === "donut" ? <Donut></Donut> : null}
      {selectedChart === "updateExample" ? <ChartUpdate></ChartUpdate> : null}
      <Suspense fallback={<div>Loading chart...</div>}>
        {selectedChart === "treeshaking-line" ? <TreeShakingLine /> : null}
        {selectedChart === "treeshaking-bar" ? <TreeShakingBar /> : null}
        {selectedChart === "treeshaking-mixed" ? <TreeShakingMixed /> : null}
      </Suspense>
    </div>
  );
}

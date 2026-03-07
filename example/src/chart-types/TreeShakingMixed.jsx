import React from "react";
import Chart from "react-apexcharts/core";
import ApexLine from "apexcharts/line";
import ApexBar from "apexcharts/bar";
import ApexLegend from "apexcharts/features/legend";
import ApexAnnotations from "apexcharts/features/annotations";
void ApexLine, ApexBar, ApexLegend, ApexAnnotations;

export default function TreeShakingMixed() {
  const series = [
    { name: "Revenue", type: "column", data: [440, 505, 414, 671, 227, 413, 201, 352, 652] },
    { name: "Growth Rate", type: "line", data: [23, 42, 35, 27, 43, 22, 17, 31, 22] },
  ];

  const options = {
    chart: { id: "treeshaking-mixed" },
    stroke: { width: [0, 4] },
    dataLabels: { enabled: true, enabledOnSeries: [1] },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"] },
    yaxis: [
      { title: { text: "Revenue ($)" } },
      { opposite: true, title: { text: "Growth Rate (%)" } },
    ],
    legend: { position: "top" },
    annotations: {
      yaxis: [{
        y: 400,
        borderColor: "#00E396",
        label: { text: "Target Revenue", style: { color: "#fff", background: "#00E396" } },
      }],
    },
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">Mixed Chart</div>
        <div className="chart-card-desc">
          Column + line chart with dual Y-axes, legend, and annotations. Toolbar, Exports,
          and Keyboard features are still excluded from the bundle.
        </div>
      </div>
      <div className="ts-meta">
        <div className="ts-imports">
          <span className="ts-import-badge">react-apexcharts/core</span>
          <span className="ts-import-badge">apexcharts/line</span>
          <span className="ts-import-badge">apexcharts/bar</span>
          <span className="ts-import-badge">apexcharts/features/legend</span>
          <span className="ts-import-badge">apexcharts/features/annotations</span>
        </div>
        <div className="ts-code-block">{`import Chart from 'react-apexcharts/core';
import ApexLine from 'apexcharts/line';
import ApexBar from 'apexcharts/bar';
import ApexLegend from 'apexcharts/features/legend';
import ApexAnnotations from 'apexcharts/features/annotations';`}</div>
      </div>
      <Chart options={options} series={series} type="line" width="100%" />
    </div>
  );
}

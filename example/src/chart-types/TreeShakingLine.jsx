import React from "react";
import Chart from "react-apexcharts/core";
import ApexLine from "apexcharts/line";
import ApexLegend from "apexcharts/features/legend";
void ApexLine, ApexLegend;

export default function TreeShakingLine() {
  const series = [
    { name: "Sales", data: [30, 40, 35, 50, 49, 60, 70, 91, 125] },
    { name: "Revenue", data: [23, 42, 35, 27, 43, 22, 17, 31, 22] },
  ];

  const options = {
    chart: { id: "treeshaking-line" },
    stroke: { curve: "smooth" },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"] },
    legend: { position: "top" },
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">Line Chart</div>
        <div className="chart-card-desc">Two-series smooth line chart with legend.</div>
      </div>
      <div className="ts-meta">
        <div className="ts-imports">
          <span className="ts-import-badge">react-apexcharts/core</span>
          <span className="ts-import-badge">apexcharts/line</span>
          <span className="ts-import-badge">apexcharts/features/legend</span>
        </div>
        <div className="ts-code-block">{`import Chart from 'react-apexcharts/core';
import ApexLine from 'apexcharts/line';
import ApexLegend from 'apexcharts/features/legend';`}</div>
      </div>
      <Chart options={options} series={series} type="line" width="100%" />
    </div>
  );
}

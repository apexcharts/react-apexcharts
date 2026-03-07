import React from "react";
import Chart from "react-apexcharts/core";
import ApexBar from "apexcharts/bar";
import ApexLegend from "apexcharts/features/legend";
void ApexBar, ApexLegend;

export default function TreeShakingBar() {
  const series = [
    { name: "Q1", data: [44, 55, 41, 67, 22] },
    { name: "Q2", data: [13, 23, 20, 8, 13] },
  ];

  const options = {
    chart: { id: "treeshaking-bar" },
    plotOptions: { bar: { horizontal: true, barHeight: "60%" } },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Engineering", "Marketing", "Sales", "Support", "Design"] },
    legend: { position: "bottom" },
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">Bar Chart</div>
        <div className="chart-card-desc">Horizontal bar chart comparing two quarters across departments.</div>
      </div>
      <div className="ts-meta">
        <div className="ts-imports">
          <span className="ts-import-badge">react-apexcharts/core</span>
          <span className="ts-import-badge">apexcharts/bar</span>
          <span className="ts-import-badge">apexcharts/features/legend</span>
        </div>
        <div className="ts-code-block">{`import Chart from 'react-apexcharts/core';
import ApexBar from 'apexcharts/bar';
import ApexLegend from 'apexcharts/features/legend';`}</div>
      </div>
      <Chart options={options} series={series} type="bar" width="100%" />
    </div>
  );
}

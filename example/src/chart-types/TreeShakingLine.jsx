/**
 * Tree-shaking Example: Line Chart (minimal bundle)
 *
 * This example demonstrates importing from 'react-apexcharts/core' with only
 * the chart types and features you need. This results in a smaller bundle
 * compared to the default 'react-apexcharts' import.
 */
import React from "react";

// 1. Import the core chart component.
import Chart from "react-apexcharts/core";

// 2. Register only the chart types you need
import ApexLine from "apexcharts/line"; // line, area, scatter chart types
void ApexLine;

// 3. Register only the features you need
import ApexLegend from "apexcharts/features/legend";
void ApexLegend;

export default function TreeShakingLine() {
  const series = [
    {
      name: "Sales",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
    {
      name: "Revenue",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22],
    },
  ];

  const options = {
    chart: {
      id: "treeshaking-line",
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      ],
    },
    legend: {
      position: "top",
    },
  };

  return (
    <div className="treeshaking-line">
      <h3>Tree-shaking: Line Chart (minimal bundle)</h3>
      <p>
        Only <code>apexcharts/line</code> and{" "}
        <code>apexcharts/features/legend</code> are imported.
        <br />
        Toolbar, Exports, Annotations, and Keyboard features are excluded.
      </p>
      <Chart options={options} series={series} type="line" width="500" />
    </div>
  );
}

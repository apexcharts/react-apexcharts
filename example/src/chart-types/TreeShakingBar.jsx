/**
 * Tree-shaking Example: Bar Chart with Legend
 *
 * Imports from 'react-apexcharts/core' with only bar chart type
 * and legend feature registered.
 */
import React from "react";

// Core import for tree-shaking.
import Chart from "react-apexcharts/core";

// Register bar chart type
import ApexBar from "apexcharts/bar";
void ApexBar;

// Register legend feature
import ApexLegend from "apexcharts/features/legend";
void ApexLegend;

export default function TreeShakingBar() {
  const series = [
    {
      name: "Q1",
      data: [44, 55, 41, 67, 22],
    },
    {
      name: "Q2",
      data: [13, 23, 20, 8, 13],
    },
  ];

  const options = {
    chart: {
      id: "treeshaking-bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "60%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Engineering", "Marketing", "Sales", "Support", "Design"],
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="treeshaking-bar">
      <h3>Tree-shaking: Bar Chart (only bar + legend)</h3>
      <p>
        Only <code>apexcharts/bar</code> and{" "}
        <code>apexcharts/features/legend</code> are imported.
      </p>
      <Chart options={options} series={series} type="bar" width="500" />
    </div>
  );
}

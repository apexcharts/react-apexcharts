/**
 * Tree-shaking Example: Mixed Chart (multiple chart types + features)
 *
 * Demonstrates importing multiple chart types and features with the core variant.
 * Still results in a smaller bundle than the full 'react-apexcharts' import.
 */
import React from "react";

// Core import for tree-shaking.
import Chart from "react-apexcharts/core";

// Register chart types
import ApexLine from "apexcharts/line";
import ApexBar from "apexcharts/bar";
void ApexLine, ApexBar;

// Register features
import ApexLegend from "apexcharts/features/legend";
import ApexAnnotations from "apexcharts/features/annotations";
void ApexLegend, ApexAnnotations;

export default function TreeShakingMixed() {
  const series = [
    {
      name: "Revenue",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 652],
    },
    {
      name: "Growth Rate",
      type: "line",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22],
    },
  ];

  const options = {
    chart: {
      id: "treeshaking-mixed",
    },
    stroke: {
      width: [0, 4],
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      ],
    },
    yaxis: [
      {
        title: { text: "Revenue ($)" },
      },
      {
        opposite: true,
        title: { text: "Growth Rate (%)" },
      },
    ],
    legend: {
      position: "top",
    },
    annotations: {
      yaxis: [
        {
          y: 400,
          borderColor: "#00E396",
          label: {
            text: "Target Revenue",
            style: { color: "#fff", background: "#00E396" },
          },
        },
      ],
    },
  };

  return (
    <div className="treeshaking-mixed">
      <h3>Tree-shaking: Mixed Chart (line + bar + legend + annotations)</h3>
      <p>
        Imports <code>apexcharts/line</code>, <code>apexcharts/bar</code>,{" "}
        <code>apexcharts/features/legend</code>, and{" "}
        <code>apexcharts/features/annotations</code>.
        <br />
        Toolbar, Exports, and Keyboard features are still excluded.
      </p>
      <Chart options={options} series={series} type="line" width="600" />
    </div>
  );
}

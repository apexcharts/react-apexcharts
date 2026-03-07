import React from "react";
import Chart from "react-apexcharts";

export default function RadialBar() {
  const series = [68];

  const options = {
    labels: ["RadialBar"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%"
        }
      }
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">Radial Bar Chart</div>
        <div className="chart-card-desc">Single-series radial gauge showing a percentage value.</div>
      </div>
      <Chart options={options} series={series} type="radialBar" height="380" />
    </div>
  );
}

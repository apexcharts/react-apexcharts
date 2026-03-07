import React from "react";
import Chart from "react-apexcharts";

export default function Column() {
  const series = [{ data: [30, 40, 25, 50, 49, 21, 70, 51] }];

  const options = {
    dataLabels: { enabled: false },
    xaxis: { categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] }
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">Column Chart</div>
        <div className="chart-card-desc">Vertical column chart with daily values.</div>
      </div>
      <Chart options={options} series={series} type="bar" width="100%" />
    </div>
  );
}

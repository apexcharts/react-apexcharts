import React from "react";
import Chart from "react-apexcharts";

export default function Line() {
  const series = [{ data: [30, 40, 25, 50, 49, 21, 70, 51] }];

  const options = {
    stroke: { curve: "smooth" },
    markers: { size: 0 },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">Line Chart</div>
        <div className="chart-card-desc">Smooth line chart with weekly data points.</div>
      </div>
      <Chart options={options} series={series} type="line" width="100%" />
    </div>
  );
}

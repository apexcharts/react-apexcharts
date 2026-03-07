import React from "react";
import Chart from "react-apexcharts";

export default function Donut() {
  const series = [44, 55, 41, 17, 15];

  const options = {
    labels: ["A", "B", "C", "D", "E"]
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">Donut Chart</div>
        <div className="chart-card-desc">Proportional breakdown across five categories.</div>
      </div>
      <Chart options={options} series={series} type="donut" width="380" />
    </div>
  );
}

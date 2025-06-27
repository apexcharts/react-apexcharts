/// <reference types="react"/>
import ApexCharts, { ApexOptions } from "apexcharts";
import React from "react";
/**
 * Basic type definitions from https://apexcharts.com/docs/react-charts/#props
 */
declare module "react-apexcharts" {
  export interface Props {
    type?:
      | "line"
      | "area"
      | "bar"
      | "pie"
      | "donut"
      | "radialBar"
      | "scatter"
      | "bubble"
      | "heatmap"
      | "candlestick"
      | "boxPlot"
      | "radar"
      | "polarArea"
      | "rangeBar"
      | "rangeArea"
      | "treemap";
    series?: ApexOptions["series"];
    width?: string | number;
    height?: string | number;
    options?: ApexOptions;
    chartRef?: React.RefObject<ApexCharts | null>;
    [key: string]: any;
  }
  export default class ReactApexChart extends React.Component<Props> {}
}

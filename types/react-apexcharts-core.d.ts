/// <reference types="react"/>
import ApexCharts, { ApexOptions } from "apexcharts";
import React from "react";

/**
 * Type definitions for react-apexcharts/core
 *
 * Core variant — imports from 'apexcharts/core' for tree-shaking.
 * Users must explicitly import chart types and features:
 *
 *   import ReactApexChart from 'react-apexcharts/core'
 *   import 'apexcharts/line'
 *   import 'apexcharts/features/legend'
 */
declare module "react-apexcharts/core" {
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

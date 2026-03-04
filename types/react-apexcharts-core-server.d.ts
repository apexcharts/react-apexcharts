/// <reference types="react"/>
import { ApexOptions } from "apexcharts";
import React from "react";

/**
 * Type definitions for react-apexcharts/core/server
 *
 * Core variant of Server Component — imports from 'apexcharts/core' for tree-shaking.
 * Users must explicitly import chart types and features:
 *
 *   import Chart from 'react-apexcharts/core/server'
 *   import 'apexcharts/bar'
 *   import 'apexcharts/features/legend'
 */
declare module "react-apexcharts/core/server" {
  export interface ServerChartProps {
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
    className?: string;
    [key: string]: any;
  }

  export default function ReactApexChartsServer(
    props: ServerChartProps
  ): Promise<React.ReactElement>;
}

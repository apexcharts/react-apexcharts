/// <reference types="react"/>
import { ApexOptions } from "apexcharts";
import React from "react";

/**
 * Type definitions for react-apexcharts/server
 * Server Component for rendering charts in Next.js App Router
 */
declare module "react-apexcharts/server" {
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

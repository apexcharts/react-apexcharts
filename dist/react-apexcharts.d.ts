/// <reference types="react"/>
import { ApexOptions } from 'apexcharts'
/**
 * Basic type definitions from https://apexcharts.com/docs/react-charts/#props
 */
declare module "react-apexcharts" {
    interface Props {
        type?: ChartType,
        series?: Array<any>,
        width?: string | number,
        height?: string | number,
        options?: ApexOptions,
        [key: string]: any,
    }
      
      export type ChartType =
        | "line"
        | "area"
        | "bar"
        | "histogram"
        | "pie"
        | "donut"
        | "radialBar"
        | "scatter"
        | "bubble"
        | "heatmap"
        | "treemap"
        | "candlestick"
        | "radar"
        | "polarArea"
        | "rangeBar";

}

/// <reference types="react"/>

/**
 * Basic type definitions from https://apexcharts.com/docs/react-charts/#props
 */
declare module "react-apexcharts" {
    interface Props {
        type?: "line" | "area" | "bar" | "histogram" | "pie" | "donut" |
            "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "radar",
        // TODO Use more specific series types as defined here https://apexcharts.com/docs/series/
        series?: Array<any>,
        width?: string | number,
        height?: string | number,
        // TODO Use more specific options types for each chart type
        options?: object
    }

    export default class ReactApexChart extends React.Component<Props> {}
}
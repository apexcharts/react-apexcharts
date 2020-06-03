/// <reference types="react"/>

/**
 * Basic type definitions from https://apexcharts.com/docs/react-charts/#props
 */
declare module "react-apexcharts" {
    interface Props {
        type?: "line" | "area" | "bar" | "histogram" | "pie" | "donut" | "rangeBar" |
            "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "radar" | "polarArea",
        series?: Array<any>,
        width?: string | number,
        height?: string | number,
        options?: ChartOptions,
        [key: string]: any,
    }

    type Color = string;

    interface ChartOptions {
        annotations?: Annotations;
        chart: Chart;
    }

    interface Annotations {
        position?: 'front' | 'back',
        yaxis?: YAxis[],
        xaxis?: XAxis[],
        points?: Points[],
        texts?: Texts[],
        shapes?: Shapes[],
        images?: Images[],
    }

    interface YAxis extends Axis {
        y?: number,
        y2?: number | null,
        yAxisIndex?: number,
    }

    interface XAxis extends Axis {
        x?: number,
        x2?: number | null,
        label?: XAxisLabels
    }

    interface Axis {
        strokeDashArray?: number, 
        borderColor?: Color, 
        fillColor?: Color, 
        opacity?: number, 
        offsetX?: number,
        offsetY?: number,
        label?: Labels
    }

    interface Labels {
        borderColor?: string,
        borderWidth?: number,
        borderRadius?: number,
        text?: string,
        textAnchor?: 'start' | 'middle' | 'end',
        position?: 'left' | 'right',
        offsetX?: number,
        offsetY?: number,
        style?: {
            background?: Color,
            color?: Color,
            fontSize?: string,
            fontWeight?: string | number,
            fontFamily?: string,
            cssClass?: string,
        }
    }

    interface XAxisLabels extends Labels {
        orientation?: 'horizontal' | 'vertical'
    }

    interface PointLabel extends Labels {
        style?: {
            background?: Color,
            color?: Color,
            fontSize?: string,
            fontWeight?: string | number,
            fontFamily?: string,
            cssClass?: string,
            padding?: {
                left?: number,
                right?: number,
                top?: number,
                bottom?: number
            }
        }
    }

    interface Points {
        x?: number | string,
        y?: number,
        yAxisIndex?: number,
        seriesIndex?: number,
        marker?: PointMarker,
        label?: PointLabel,
        image?: {
            path?: string,
            width?: number,
            height?: number,
            offsetX?: number,
            offsetY?: number,
        }
    }

    interface PointMarker {
        size?: number,
        fillColor?: Color,
        strokeColor?: Color,
        strokeWidth?: number,
        shape?: 'circle' | 'square',
        radius?: number,
        offsetX?: number,
        offsetY?: number,
        cssClass?: string,
    }

    interface Texts {
        x?: number,
        y?: number,
        type?: 'rect' | 'circle',
        width?: number,
        height?: number,
        appendTo?: string,
        backgroundColor?: Color,
        opacity?: number,
        borderColor?: Color,
        borderRadius?: number,
        borderWidth?: number,
        paddingLeft?: number,
        paddingRight?: number,
        paddingTop?: number,
        paddingBottom?: number,
    }

    interface Shapes {
        x?: number,
        y?: number,
        type?: 'react' | 'circle',
        width?: number,
        height?: number,
        appendTo?: string,
        backgroundColor?: Color,
        opacity?: number,
        borderColor?: Color,
        borderRadius?: number,
        borderWidth?: number,
    }

    interface Images {
        path?: string,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        appendTo?: string
    }
    
    interface Chart {
        animations?: {
            enabled?: boolean;
            easing?: 'linear' | 'easein' | 'easeout' | 'easeinout',
            speed?: number,
            animateGradually?: {
                enabled?: boolean,
                delay?: number,
            },
            dynamicAnimation?: {
                enabled?: boolean,
                speed?: number
            }
        },
        background?: Color,
        brush?: {
            enabled?: boolean,
            targer?: string,
            autoScaleYaxis?: boolean
        },
        defaultLocale?: string,
        dropShadow?: {
            enabled?: boolean,
            enabledOnSeries?: number[],
            top?: number,
            left?: number,
            blur?: number,
            color?: string | string[],
            opacity?: number,
        },
        fontFamily?: string,
        forceColor?: Color,
        group?: string,
        events?: {
            beforeMount?: Function,
            mounted?: Function,
            updated?: Function,
            click?: Function,
            mouseMove?: Function,
            legendClick?: Function,
            markerClick?: Function,
            selection?: Function,
            dataPointSelection?: Function,
            dataPointMouseLeave?: Function,
            beforeZoom?: Function,
            zoomed?: Function,
            scrolled?: Function,
        },
        height?: number | string,
        chart?: {
            id?: string,
        },
        locales?: {
            name?: string;
            options: {
                months: string[];
                shortMonths: string[];
                days: string[];
                shortDays: string[];
                toolbar: {
                    download: string;
                    selection: string;
                    selectionZoom: string;
                    zoomIn: string;
                    zoomOut: string;
                    pan: string;
                    reset: string;
                }
            }
        },
        offsetX: number;
        offsetY: number;
        parentHeightOffset: number;
        redrawOnParentResize: boolean;
        selection: {
            enabled: boolean;
            type: 'x' | 'y' | 'xy',
            fill: {
                color: Color,
                opacity: number,
            },
            stroke: {
                width: number,
                dashArray: number,
                color: Color,
                opacity: number,
            },
            xaxis: {
                min: number,
                max: number,
            }
            yaxis: {
                min: number,
                max: number,
            }
        }
    }   

    export default class ReactApexChart extends React.Component<Props> {}
}

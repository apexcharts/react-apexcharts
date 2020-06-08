/// <reference types="react"/>

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

    type Color = string;

    export interface ApexOptions {
        annotations?: ApexAnnotations;
        chart?: ApexChart;
        colors?: Color[];
        dataLabels?: ApexDataLabels;
        series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
        stroke?: ApexStroke;
        labels?: string[];
        legend?: ApexLegend;
        fill?: ApexFill;
        tooltip?: ApexTooltip;
        plotOptions?: ApexPlotOptions;
        responsive?: ApexResponsive[];
        markers?: ApexMarkers;
        noData?: ApexNoData;
        xaxis?: ApexXAxis;
        yaxis?: ApexYAxis | ApexYAxis[];
        grid?: ApexGrid;
        states?: ApexStates;
        title?: ApexTitleSubtitle;
        subtitle?: ApexTitleSubtitle;
        theme?: ApexTheme;
      }
      
      interface ApexDropShadow {
        enabled?: boolean;
        top?: number;
        left?: number;
        blur?: number;
        opacity?: number;
        color?: Color;
      }
      
      /**
       * Main Chart options
       * See https://apexcharts.com/docs/options/chart/
       */
      export interface ApexChart {
        width?: string | number;
        height?: string | number;
        type: ChartType;
        foreColor?: Color;
        fontFamily?: string;
        background?: string;
        offsetX?: number;
        offsetY?: number;
        dropShadow?: ApexDropShadow & {
          enabledOnSeries?: undefined | number[];
          color?: Color | Color[];
        };
        events?: {
          animationEnd?(chart: any, options?: any): void;
          beforeMount?(chart: any, options?: any): void;
          mounted?(chart: any, options?: any): void;
          updated?(chart: any, options?: any): void;
          mouseMove?(e: any, chart?: any, options?: any): void;
          click?(e: any, chart?: any, options?: any): void;
          legendClick?(chart: any, seriesIndex?: number, options?: any): void;
          markerClick?(e: any, chart?: any, options?: any): void;
          selection?(chart: any, options?: any): void;
          dataPointSelection?(e: any, chart?: any, options?: any): void;
          dataPointMouseEnter?(e: any, chart?: any, options?: any): void;
          dataPointMouseLeave?(e: any, chart?: any, options?: any): void;
          beforeZoom?(chart: any, options?: any): void;
          zoomed?(chart: any, options?: any): void;
          scrolled?(chart: any, options?: any): void;
        };
        brush?: {
          enabled?: boolean;
          autoScaleYaxis?: boolean;
          target?: string;
        };
        id?: string;
        group?: string;
        locales?: ApexLocale[];
        defaultLocale?: string;
        parentHeightOffset?: number;
        redrawOnParentResize?: boolean;
        sparkline?: {
          enabled?: boolean;
        };
        stacked?: boolean;
        stackType?: "normal" | "100%";
        toolbar?: {
          show?: boolean;
          offsetX?: number;
          offsetY?: number;
          tools?: {
            download?: boolean | string;
            selection?: boolean | string;
            zoom?: boolean | string;
            zoomin?: boolean | string;
            zoomout?: boolean | string;
            pan?: boolean | string;
            reset?: boolean | string;
            customIcons?: {
              icon?: string;
              title?: string;
              index?: number;
              class?: string;
              click?(chart?: any, options?: any, e?: any): any;
            }[];
          };
          export?: {
            csv?: {
              filename?: undefined | string;
              columnDelimiter?: string;
              headerCategory?: string;
              headerValue?: string;
            };
          };
          autoSelected?: "zoom" | "selection" | "pan";
        };
        zoom?: {
          enabled?: boolean;
          type?: "x" | "y" | "xy";
          autoScaleYaxis?: boolean;
          zoomedArea?: {
            fill?: {
              color?: Color;
              opacity?: number;
            };
            stroke?: {
              color?: Color;
              opacity?: number;
              width?: number;
            };
          };
        };
        selection?: {
          enabled?: boolean;
          type?: string;
          fill?: {
            color?: Color;
            opacity?: number;
          };
          stroke?: {
            width?: number;
            color?: Color;
            opacity?: number;
            dashArray?: number;
          };
          xaxis?: {
            min?: number;
            max?: number;
          };
          yaxis?: {
            min?: number;
            max?: number;
          };
        };
        animations?: {
          enabled?: boolean;
          easing?: "linear" | "easein" | "easeout" | "easeinout";
          speed?: number;
          animateGradually?: {
            enabled?: boolean;
            delay?: number;
          };
          dynamicAnimation?: {
            enabled?: boolean;
            speed?: number;
          };
        };
      }
      
      export interface ApexStates {
        normal?: {
          filter?: {
            type?: string;
            value?: number;
          };
        };
        hover?: {
          filter?: {
            type?: string;
            value?: number;
          };
        };
        active?: {
          allowMultipleDataPointsSelection?: boolean;
          filter?: {
            type?: string;
            value?: number;
          };
        };
      }
      
      /**
       * Chart Title options
       * See https://apexcharts.com/docs/options/title/
       */
      export interface ApexTitleSubtitle {
        text?: string;
        align?: "left" | "center" | "right";
        margin?: number;
        offsetX?: number;
        offsetY?: number;
        floating?: boolean;
        style?: {
          fontSize?: string;
          fontFamily?: string;
          fontWeight?: string | number;
          color?: Color;
        };
      }
      
      /**
       * Chart Series options.
       * Use ApexNonAxisChartSeries for Pie and Donut charts.
       * See https://apexcharts.com/docs/options/series/
       */
      export type ApexAxisChartSeries = {
        name?: string;
        type?: string;
        data:
          | (number | null)[]
          | { x: any; y: any; fillColor?: Color; strokeColor?: Color }[]
          | [number, number | null][]
          | [number, (number | null)[]][];
      }[];
      
      export type ApexNonAxisChartSeries = number[];
      
      /**
       * Options for the line drawn on line and area charts.
       * See https://apexcharts.com/docs/options/stroke/
       */
      export interface ApexStroke {
        show?: boolean;
        curve?:
          | "smooth"
          | "straight"
          | "stepline"
          | ("smooth" | "straight" | "stepline")[];
        lineCap?: "butt" | "square" | "round";
        colors?: Color[];
        width?: number | number[];
        dashArray?: number | number[];
      }
      
      export interface ApexAnnotations {
        position?: string;
        yaxis?: YAxisAnnotations[];
        xaxis?: XAxisAnnotations[];
        points?: PointAnnotations[];
        shapes?: ShapeAnnotations[];
        texts?: TextAnnotations[];
        images?: ImageAnnotations[];
      }
      export interface AnnotationLabel {
        borderColor?: Color;
        borderWidth?: number;
        borderRadius?: number;
        text?: string;
        textAnchor?: string;
        offsetX?: number;
        offsetY?: number;
        style?: AnnotationStyle;
        position?: string;
        orientation?: string;
      }
      export interface AnnotationStyle {
        background?: string;
        color?: Color;
        fontSize?: string;
        fontFamily?: string;
        fontWeight?: string | number;
        cssClass?: string;
        padding?: {
          left?: number;
          right?: number;
          top?: number;
          bottom?: number;
        };
      }
      export interface XAxisAnnotations {
        x?: null | number | string;
        x2?: null | number | string;
        strokeDashArray?: number;
        fillColor?: Color;
        borderColor?: Color;
        borderWidth?: number;
        opacity?: number;
        offsetX?: number;
        offsetY?: number;
        label?: AnnotationLabel;
      }
      export interface YAxisAnnotations {
        y?: null | number | string;
        y2?: null | number | string;
        strokeDashArray?: number;
        fillColor?: Color;
        borderColor?: Color;
        borderWidth?: number;
        opacity?: number;
        offsetX?: number;
        offsetY?: number;
        yAxisIndex?: number;
        label?: AnnotationLabel;
      }
      export interface PointAnnotations {
        x?: number | string;
        y?: null | number;
        yAxisIndex?: number;
        seriesIndex?: number;
        marker?: {
          size?: number;
          fillColor?: Color;
          strokeColor?: Color;
          strokeWidth?: number;
          shape?: string;
          offsetX?: number;
          offsetY?: number;
          radius?: number;
          cssClass?: string;
        };
        label?: AnnotationLabel;
        image?: {
          path?: string;
          width?: number;
          height?: number;
          offsetX?: number;
          offsetY?: number;
        };
      }
      
      export interface ShapeAnnotations {
        x?: number;
        y?: number;
        type?: string;
        width?: number | string;
        height?: number;
        appendTo?: string;
        backgroundColor?: Color;
        opacity?: number;
        borderWidth?: number;
        borderRadius?: number;
        borderColor?: Color;
      }
      
      export interface ImageAnnotations {
        path?: string;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        appendTo?: string;
      }
      
      export interface TextAnnotations {
        x?: number;
        y?: number;
        text?: string;
        textAnchor?: string;
        foreColor?: Color;
        fontSize?: string | number;
        fontFamily?: undefined | string;
        fontWeight?: string | number;
        appendTo?: string;
        backgroundColor?: Color;
        borderColor?: Color;
        borderRadius?: number;
        borderWidth?: number;
        paddingLeft?: number;
        paddingRight?: number;
        paddingTop?: number;
        paddingBottom?: number;
      }
      
      /**
       * Options for localization.
       * See https://apexcharts.com/docs/options/chart/locales
       */
      export interface ApexLocale {
        name?: string;
        options?: {
          months?: string[];
          shortMonths?: string[];
          days?: string[];
          shortDays?: string[];
          toolbar?: {
            download?: string;
            selection?: string;
            selectionZoom?: string;
            zoomIn?: string;
            zoomOut?: string;
            pan?: string;
            reset?: string;
          };
        };
      }
      
      /**
       * PlotOptions for specifying chart-type-specific configuration.
       * See https://apexcharts.com/docs/options/plotoptions/bar/
       */
      export interface ApexPlotOptions {
        bar?: {
          horizontal?: boolean;
          startingShape?: "flat" | "rounded";
          endingShape?: "flat" | "rounded";
          columnWidth?: string;
          barHeight?: string;
          distributed?: boolean;
          rangeBarOverlap?: boolean;
          colors?: {
            ranges?: {
              from?: number;
              to?: number;
              color?: Color;
            }[];
            backgroundBarcolors?: Color[];
            backgroundBarOpacity?: number;
            backgroundBarRadius?: number;
          };
          dataLabels?: {
            maxItems?: number;
            hideOverflowingLabels?: boolean;
            position?: string;
            orientation?: "horizontal" | "vertical";
          };
        };
        bubble?: {
          minBubbleRadius?: number;
          maxBubbleRadius?: number;
        };
        candlestick?: {
          colors?: {
            upward?: string;
            downward?: string;
          };
          wick?: {
            useFillColor?: boolean;
          };
        };
        heatmap?: {
          radius?: number;
          enableShades?: boolean;
          shadeIntensity?: number;
          reverseNegativeShade?: boolean;
          distributed?: boolean;
          useFillColorAsStroke?: boolean;
          colorScale?: {
            ranges?: {
              from?: number;
              to?: number;
              color?: Color;
              foreColor?: Color;
              name?: string;
            }[];
            inverse?: boolean;
            min?: number;
            max?: number;
          };
        };
        pie?: {
          startAngle?: number;
          customScale?: number;
          offsetX?: number;
          offsetY?: number;
          expandOnClick?: boolean;
          dataLabels?: {
            offset?: number;
            minAngleToShowLabel?: number;
          };
          donut?: {
            size?: string;
            background?: string;
            labels?: {
              show?: boolean;
              name?: {
                show?: boolean;
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: string | number;
                color?: Color;
                offsetY?: number;
                formatter?(val: string): string;
              };
              value?: {
                show?: boolean;
                fontSize?: string;
                fontFamily?: string;
                fontWeight?: string | number;
                color?: Color;
                offsetY?: number;
                formatter?(val: string): string;
              };
              total?: {
                show?: boolean;
                showAlways?: boolean;
                fontFamily?: string;
                fontSize?: string;
                fontWeight?: string | number;
                label?: string;
                color?: Color;
                formatter?(w: any): string;
              };
            };
          };
        };
        polarArea?: {
          rings?: {
            strokeWidth?: number;
            strokeColor?: Color;
          };
        };
        radar?: {
          size?: number;
          offsetX?: number;
          offsetY?: number;
          polygons?: {
            strokecolors?: Color | Color[];
            strokeWidth?: string | string[];
            connectorcolors?: Color | Color[];
            fill?: {
              colors?: Color[];
            };
          };
        };
        radialBar?: {
          inverseOrder?: boolean;
          startAngle?: number;
          endAngle?: number;
          offsetX?: number;
          offsetY?: number;
          hollow?: {
            margin?: number;
            size?: string;
            background?: string;
            image?: string;
            imageWidth?: number;
            imageHeight?: number;
            imageOffsetX?: number;
            imageOffsetY?: number;
            imageClipped?: boolean;
            position?: "front" | "back";
            dropShadow?: ApexDropShadow;
          };
          track?: {
            show?: boolean;
            startAngle?: number;
            endAngle?: number;
            background?: string;
            strokeWidth?: string;
            opacity?: number;
            margin?: number;
            dropShadow?: ApexDropShadow;
          };
          dataLabels?: {
            show?: boolean;
            name?: {
              show?: boolean;
              fontSize?: string;
              fontFamily?: string;
              fontWeight?: string | number;
              color?: Color;
              offsetY?: number;
            };
            value?: {
              show?: boolean;
              fontSize?: string;
              fontFamily?: string;
              fontWeight?: string | number;
              color?: Color;
              offsetY?: number;
              formatter?(val: number): string;
            };
            total?: {
              show?: boolean;
              label?: string;
              fontFamily?: string;
              fontSize?: string;
              fontWeight?: string | number;
              color?: Color;
              formatter?(opts: any): string;
            };
          };
        };
      }
      
      export interface ApexFill {
        colors?: Color[];
        opacity?: number | number[];
        type?: string | string[];
        gradient?: {
          shade?: string;
          type?: string;
          shadeIntensity?: number;
          gradientTocolors?: Color[];
          inverseColors?: boolean;
          opacityFrom?: number;
          opacityTo?: number;
          stops?: number[];
        };
        image?: {
          src?: string | string[];
          width?: number;
          height?: number;
        };
        pattern?: {
          style?: string | string[];
          width?: number;
          height?: number;
          strokeWidth?: number;
        };
      }
      
      /**
       * Chart Legend configuration options.
       * See https://apexcharts.com/docs/options/legend/
       */
      export interface ApexLegend {
        show?: boolean;
        showForSingleSeries?: boolean;
        showForNullSeries?: boolean;
        showForZeroSeries?: boolean;
        floating?: boolean;
        inverseOrder?: boolean;
        position?: "top" | "right" | "bottom" | "left";
        horizontalAlign?: "left" | "center" | "right";
        fontSize?: string;
        fontFamily?: string;
        fontWeight?: string | number;
        width?: number;
        height?: number;
        offsetX?: number;
        offsetY?: number;
        textAnchor?: string;
        labels?: {
          colors?: Color | Color[];
          useSeriesColors?: boolean;
        };
        markers?: {
          width?: number;
          height?: number;
          strokeColor?: Color;
          strokeWidth?: number;
          fillcolors?: Color[];
          offsetX?: number;
          offsetY?: number;
          radius?: number;
          customHTML?(): any;
          onClick?(): void;
        };
        itemMargin?: {
          horizontal?: number;
          vertical?: number;
        };
        containerMargin?: {
          left?: number;
          top?: number;
        };
        onItemClick?: {
          toggleDataSeries?: boolean;
        };
        onItemHover?: {
          highlightDataSeries?: boolean;
        };
        formatter?(legendName: string, opts?: any): string;
        tooltipHoverFormatter?(legendName: string, opts?: any): string;
      }
      
      /**
       * Chart Datalabels options
       * See https://apexcharts.com/docs/options/datalabels/
       */
      export interface ApexDataLabels {
        enabled?: boolean;
        enabledOnSeries?: undefined | number[];
        textAnchor?: "start" | "middle" | "end";
        distributed?: boolean;
        offsetX?: number;
        offsetY?: number;
        style?: {
          fontSize?: string;
          fontFamily?: string;
          fontWeight?: string | number;
          colors?: Color[];
        };
        background?: {
          enabled?: boolean;
          foreColor?: Color;
          borderRadius?: number;
          padding?: number;
          opacity?: number;
          borderWidth?: number;
          borderColor?: Color;
          dropShadow?: ApexDropShadow;
        };
        dropShadow?: ApexDropShadow;
        formatter?(val: number, opts?: any): string;
      }
      
      export interface ApexResponsive {
        breakpoint?: number;
        options?: any;
      }
      
      type ApexTooltipY = {
        title?: {
          formatter?(seriesName: string): string;
        };
        formatter?(val: number, opts?: any): string;
      };
      /**
       * Chart Tooltip options
       * See https://apexcharts.com/docs/options/tooltip/
       */
      export interface ApexTooltip {
        enabled?: boolean;
        enabledOnSeries?: undefined | number[];
        shared?: boolean;
        followCursor?: boolean;
        intersect?: boolean;
        inverseOrder?: boolean;
        custom?: ((options: any) => any) | ((options: any) => any)[];
        fillSeriesColor?: boolean;
        theme?: string;
        style?: {
          fontSize?: string;
          fontFamily?: string;
        };
        onDatasetHover?: {
          highlightDataSeries?: boolean;
        };
        x?: {
          show?: boolean;
          format?: string;
          formatter?(val: number, opts?: any): string;
        };
        y?: ApexTooltipY | ApexTooltipY[];
        z?: {
          title?: string;
          formatter?(val: number): string;
        };
        marker?: {
          show?: boolean;
          fillcolors?: Color[];
        };
        items?: {
          display?: string;
        };
        fixed?: {
          enabled?: boolean;
          position?: string; // topRight; topLeft; bottomRight; bottomLeft
          offsetX?: number;
          offsetY?: number;
        };
      }
      
      /**
       * X Axis options
       * See https://apexcharts.com/docs/options/xaxis/
       */
      export interface ApexXAxis {
        type?: "category" | "datetime" | "numeric";
        categories?: any;
        offsetX?: number;
        offsetY?: number;
        sorted?: boolean;
        labels?: {
          show?: boolean;
          rotate?: number;
          rotateAlways?: boolean;
          hideOverlappingLabels?: boolean;
          showDuplicates?: boolean;
          trim?: boolean;
          minHeight?: number;
          maxHeight?: number;
          style?: {
            colors?: Color | Color[];
            fontSize?: string;
            fontWeight?: string | number;
            fontFamily?: string;
            cssClass?: string;
          };
          offsetX?: number;
          offsetY?: number;
          format?: string;
          datetimeUTC?: boolean;
          datetimeFormatter?: {
            year?: string;
            month?: string;
            day?: string;
            hour?: string;
            minute?: string;
          };
          formatter?(value: string, timestamp?: number): string | string[];
        };
        axisBorder?: {
          show?: boolean;
          color?: Color;
          offsetX?: number;
          offsetY?: number;
          strokeWidth?: number;
        };
        axisTicks?: {
          show?: boolean;
          borderType?: string;
          color?: Color;
          height?: number;
          offsetX?: number;
          offsetY?: number;
        };
        tickPlacement?: string;
        tickAmount?: number | "dataPoints";
        min?: number;
        max?: number;
        range?: number;
        floating?: boolean;
        position?: string;
        title?: {
          text?: string;
          offsetX?: number;
          offsetY?: number;
          style?: {
            color?: Color;
            fontFamily?: string;
            fontWeight?: string | number;
            fontSize?: string;
            cssClass?: string;
          };
        };
        crosshairs?: {
          show?: boolean;
          width?: number | string;
          position?: string;
          opacity?: number;
          stroke?: {
            color?: Color;
            width?: number;
            dashArray?: number;
          };
          fill?: {
            type?: string;
            color?: Color;
            gradient?: {
              colorFrom?: string;
              colorTo?: string;
              stops?: number[];
              opacityFrom?: number;
              opacityTo?: number;
            };
          };
          dropShadow?: ApexDropShadow;
        };
        tooltip?: {
          enabled?: boolean;
          offsetY?: number;
          style?: {
            fontSize?: string;
            fontFamily?: string;
          };
          formatter?(value: string, opts?: object): string;
        };
      }
      
      /**
       * Y Axis options
       * See https://apexcharts.com/docs/options/yaxis/
       */
      export interface ApexYAxis {
        show?: boolean;
        showAlways?: boolean;
        showForNullSeries?: boolean;
        seriesName?: string;
        opposite?: boolean;
        reversed?: boolean;
        logarithmic?: boolean;
        tickAmount?: number;
        forceNiceScale?: boolean;
        min?: number | ((min: number) => number);
        max?: number | ((max: number) => number);
        floating?: boolean;
        decimalsInFloat?: number;
        labels?: {
          show?: boolean;
          minWidth?: number;
          maxWidth?: number;
          offsetX?: number;
          offsetY?: number;
          rotate?: number;
          align?: "left" | "center" | "right";
          padding?: number;
          style?: {
            colors?: Color;
            fontSize?: string;
            fontFamily?: string;
            fontWeight?: string | number;
            cssClass?: string;
          };
          formatter?(val: number, opts?: any): string;
        };
        axisBorder?: {
          show?: boolean;
          color?: Color;
          width?: number;
          offsetX?: number;
          offsetY?: number;
        };
        axisTicks?: {
          show?: boolean;
          color?: Color;
          width?: number;
          offsetX?: number;
          offsetY?: number;
        };
        title?: {
          text?: string;
          rotate?: number;
          offsetX?: number;
          offsetY?: number;
          style?: {
            color?: Color;
            fontSize?: string;
            fontFamily?: string;
            fontWeight?: string | number;
            cssClass?: string;
          };
        };
        crosshairs?: {
          show?: boolean;
          position?: string;
          stroke?: {
            color?: Color;
            width?: number;
            dashArray?: number;
          };
        };
        tooltip?: {
          enabled?: boolean;
          offsetX?: number;
        };
      }
      
      /**
       * Plot X and Y grid options
       * See https://apexcharts.com/docs/options/grid/
       */
      export interface ApexGrid {
        show?: boolean;
        borderColor?: Color;
        strokeDashArray?: number;
        position?: "front" | "back";
        xaxis?: {
          lines?: {
            show?: boolean;
            offsetX?: number;
            offsetY?: number;
          };
        };
        yaxis?: {
          lines?: {
            show?: boolean;
            offsetX?: number;
            offsetY?: number;
          };
        };
        row?: {
          colors?: Color[];
          opacity?: number;
        };
        column?: {
          colors?: Color[];
          opacity?: number;
        };
        padding?: {
          top?: number;
          right?: number;
          bottom?: number;
          left?: number;
        };
      }
      
      export interface ApexTheme {
        mode?: "light" | "dark";
        palette?: string;
        monochrome?: {
          enabled?: boolean;
          color?: Color;
          shadeTo?: "light" | "dark";
          shadeIntensity?: number;
        };
      }
      
      interface ApexDiscretePoint {
        seriesIndex?: number;
        dataPointIndex?: number;
        fillColor?: Color;
        strokeColor?: Color;
        size?: number;
      }
      
      export interface ApexMarkers {
        size?: number | number[];
        colors?: Color[];
        strokecolors?: Color | Color[];
        strokeWidth?: number | number[];
        strokeOpacity?: number | number[];
        strokeDashArray?: number | number[];
        fillOpacity?: number | number[];
        discrete?: ApexDiscretePoint[];
        shape?: "circle" | "square" | string[];
        radius?: number;
        offsetX?: number;
        offsetY?: number;
        showNullDataPoints?: boolean;
        hover?: {
          size?: number;
          sizeOffset?: number;
        };
        onClick?(e?: any): void;
        onDblClick?(e?: any): void;
      }
      
      export interface ApexNoData {
        text?: string;
        align?: "left" | "right" | "center";
        verticalAlign?: "top" | "middle" | "bottom";
        offsetX?: number;
        offsetY?: number;
        style?: {
          color?: Color;
          fontSize?: string;
          fontFamily?: string;
        };
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
        | "candlestick"
        | "radar"
        | "polarArea"
        | "rangeBar";

}

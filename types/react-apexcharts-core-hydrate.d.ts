/// <reference types="react"/>
import { ApexOptions } from "apexcharts";
import React from "react";

/**
 * Type definitions for react-apexcharts/core/hydrate
 *
 * Core variant of Hydrate Component — imports from 'apexcharts/core' for tree-shaking.
 * Users must explicitly import chart types and features:
 *
 *   import ReactApexChartHydrate from 'react-apexcharts/core/hydrate'
 *   import 'apexcharts/line'
 *   import 'apexcharts/features/legend'
 */
declare module "react-apexcharts/core/hydrate" {
  export interface HydrateChartProps {
    /**
     * Optional client-side options to override SSR config
     * Animations are re-enabled by default
     */
    clientOptions?: ApexOptions;
    className?: string;
    [key: string]: any;
  }

  export default function ReactApexChartsHydrate(
    props: HydrateChartProps
  ): React.ReactElement;
}

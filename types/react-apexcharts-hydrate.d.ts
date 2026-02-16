/// <reference types="react"/>
import { ApexOptions } from "apexcharts";
import React from "react";

/**
 * Type definitions for react-apexcharts/hydrate
 * Client Component for hydrating server-rendered charts
 */
declare module "react-apexcharts/hydrate" {
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

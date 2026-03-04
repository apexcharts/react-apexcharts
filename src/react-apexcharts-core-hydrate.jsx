"use client";

import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts/core";
import PropTypes from "prop-types";

function omit(obj, keysToRemove) {
  const newObj = { ...obj };
  keysToRemove.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
}

// keys to omit when spreading restProps to the container div
const CHART_PROP_KEYS = ["clientOptions", "className"];

/**
 * Core variant of ReactApexChartsHydrate — imports from 'apexcharts/core' for tree-shaking.
 *
 * Usage:
 *   import ReactApexChartHydrate from 'react-apexcharts/core/hydrate'
 *   import 'apexcharts/line'
 *   import 'apexcharts/features/legend'
 */
export default function ReactApexChartsHydrate({
  clientOptions = {},
  className = "",
  ...restProps
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      try {
        // Enable animations by default for hydration
        const defaultOptions = {
          chart: {
            animations: {
              enabled: true,
            },
          },
        };

        const mergedOptions = {
          ...defaultOptions,
          ...clientOptions,
          chart: {
            ...defaultOptions.chart,
            ...(clientOptions.chart || {}),
          },
        };

        chartInstance.current = ApexCharts.hydrate(
          chartRef.current,
          mergedOptions
        );
      } catch (error) {
        console.error("Failed to hydrate ApexChart:", error);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [clientOptions]);

  const rest = omit(restProps, CHART_PROP_KEYS);

  return <div ref={chartRef} className={className} {...rest} />;
}

ReactApexChartsHydrate.propTypes = {
  clientOptions: PropTypes.object,
  className: PropTypes.string,
};

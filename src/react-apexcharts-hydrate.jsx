"use client";

import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts/client";
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
 * Client Component for hydrating server-rendered charts
 * @example
 * import Chart from 'react-apexcharts/hydrate'
 *
 * export default function ClientWrapper() {
 *   return <Chart className="my-chart" clientOptions={{ chart: { animations: { enabled: true } } }} />
 * }
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

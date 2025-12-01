import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import PropTypes from "prop-types";

function omit(obj, keysToRemove) {
  const newObj = { ...obj };
  keysToRemove.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
}

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

// deep merge target with source, source values take precedence
function extend(target, source) {
  let output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = extend(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}

function deepEqual(obj1, obj2, visited = new WeakSet()) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  // handle circular references
  if (visited.has(obj1) || visited.has(obj2)) return true;
  visited.add(obj1);
  visited.add(obj2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key], visited)) {
      return false;
    }
  }

  return true;
}

// keys to omit when spreading restProps to the container div
const CHART_PROP_KEYS = ["type", "series", "options", "width", "height", "chartRef"];

export default function Charts({
  type = "line",
  width = "100%",
  height = "auto",
  series,
  options,
  chartRef,
  ...restProps
}) {
  const chartElementRef = useRef(null);
  const prevOptionsRef = useRef(null);

  // always call useRef unconditionally to satisfy rules of hooks
  const internalChartRef = useRef(null);
  const chart = chartRef || internalChartRef;

  const getConfig = () => {
    const newOptions = {
      chart: { type, height, width },
      series,
    };
    return extend(options, newOptions);
  };

  // mount: create chart instance
  useEffect(() => {
    chart.current = new ApexCharts(chartElementRef.current, getConfig());
    chart.current.render();
    prevOptionsRef.current = options;

    return () => {
      if (chart.current && typeof chart.current.destroy === "function") {
        chart.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // skip on initial mount (chart.current.w won't exist yet on first render cycle)
    if (!chart.current || !chart.current.w) {
      return;
    }

    const prevSeries = chart.current.w.config.series;

    const seriesChanged = !deepEqual(prevSeries, series);
    const optionsChanged =
      !deepEqual(prevOptionsRef.current, options) ||
      height !== chart.current.opts.chart.height ||
      width !== chart.current.opts.chart.width;

    if (seriesChanged || optionsChanged) {
      if (!seriesChanged) {
        // only options or size changed
        chart.current.updateOptions(getConfig());
      } else if (!optionsChanged) {
        // only series changed
        chart.current.updateSeries(series);
      } else {
        // both changed
        chart.current.updateOptions(getConfig());
      }
    }

    prevOptionsRef.current = options;
  }, [options, series, height, width]);

  const rest = omit(restProps, CHART_PROP_KEYS);

  return <div ref={chartElementRef} {...rest} />;
}

Charts.propTypes = {
  type: PropTypes.string.isRequired,
  series: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chartRef: PropTypes.shape({ current: PropTypes.any })
};

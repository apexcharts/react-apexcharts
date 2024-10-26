import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import PropTypes from "prop-types";

function omit(obj, keysToRemove) {
  let newObj = { ...obj };
  keysToRemove.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
}

function deepEqual(obj1, obj2, visited = new WeakSet()) {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== 'object' || obj1 === null ||
      typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  if (visited.has(obj1) || visited.has(obj2)) return true; // Handle circular refs
  visited.add(obj1);
  visited.add(obj2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key], visited)) {
      return false;
    }
  }

  return true;
}

export default function Charts({
  type = "line",
  width = "100%",
  height = "auto",
  series,
  options,
  ...restProps
}) {
  const chartRef = useRef(null);
  let chart = useRef(null);

  useEffect(() => {
    const current = chartRef.current;
    chart.current = new ApexCharts(current, getConfig());
    chart.current.render();

    return () => {
      if (chart.current && typeof chart.current.destroy === "function") {
        chart.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const prevOptions = chart.current.options;
    const prevSeries = chart.current.series;

    if (
      !deepEqual(prevOptions, options) ||
      !deepEqual(prevSeries, series) ||
      height !== chart.current.height ||
      width !== chart.current.width
    ) {
      if (deepEqual(prevSeries, series)) {
        chart.current.updateOptions(getConfig());
      } else {
        chart.current.updateSeries(series);
      }
    }
  }, [options, series, height, width]);

  const getConfig = () => {
    const newOptions = {
      chart: { type, height, width },
      series
    };
    
    return extend(options, newOptions);
  };

  const isObject = (item) => {
    return item && typeof item === "object" && !Array.isArray(item);
  };

  const extend = (target, source) => {
    let output = { ...target };
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = extend(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  };

  const rest = omit(restProps, Object.keys(Charts.propTypes));

  return <div ref={chartRef} {...rest} />;
}

Charts.propTypes = {
  type: PropTypes.string.isRequired,
  series: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

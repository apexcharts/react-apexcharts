import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import PropTypes from "prop-types";

function omit(obj, keysToRemove) {
  let newObj = { ...obj };
  keysToRemove.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
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
    const prevOptions = JSON.stringify(chart.current.options);
    const prevSeries = JSON.stringify(chart.current.series);
    const currentOptions = JSON.stringify(options);
    const currentSeries = JSON.stringify(series);

    if (
      prevOptions !== currentOptions ||
      prevSeries !== currentSeries ||
      height !== chart.current.height ||
      width !== chart.current.width
    ) {
      if (prevSeries === currentSeries) {
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

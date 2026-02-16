import React from "react";
import ApexCharts from "apexcharts/ssr";
import PropTypes from "prop-types";

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

/**
 * Server Component for rendering charts in Next.js App Router
 * @example
 * import Chart from 'react-apexcharts/server'
 *
 * export default async function Page() {
 *   return <Chart type="bar" series={[...]} options={{...}} width={500} height={300} />
 * }
 */
export default async function ReactApexChartsServer({
  type = "line",
  width = 400,
  height = 300,
  series = [],
  options = {},
  className = "",
  ...restProps
}) {
  const chartOptions = extend(options, {
    chart: {
      type,
      width,
      height,
    },
    series,
  });

  try {
    const html = await ApexCharts.renderToHTML(chartOptions, {
      width,
      height,
    });

    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
        {...restProps}
      />
    );
  } catch (error) {
    console.error("Failed to render ApexChart on server:", error);
    return (
      <div className={className} {...restProps}>
        <p>Error rendering chart</p>
      </div>
    );
  }
}

ReactApexChartsServer.propTypes = {
  type: PropTypes.string,
  series: PropTypes.array,
  options: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

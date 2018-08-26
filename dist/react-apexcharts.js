import ApexCharts from 'apexcharts';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  render() {
    const { type, width, height, series, options, ...props } = this.props;
    return React.createElement('div', {
      ref: this.chartRef,
      ...props
    });
  }

  componentDidMount() {
    const { type, height, width, series, options } = this.props;
    const newOptions = {
      chart: {
        type,
        height,
        width
      },
      series
    };

    const config = ApexCharts.merge(options, newOptions);
    this.chart = new ApexCharts(this.chartRef.current, config);
    this.chart.render();
  }

  componentDidUpdate(prevProps) {
    const { options, type, width, height, series } = this.props;

    if (
      JSON.stringify(prevProps.options) !== JSON.stringify(options) ||
      JSON.stringify(prevProps.series) !== JSON.stringify(series)
    ) {
      const newOptions = {
        chart: {
          type,
          width,
          height
        },
        series
      };

      const config = ApexCharts.merge(options, newOptions);

      // series is not changed,but options are changed
      if (JSON.stringify(series) === JSON.stringify(prevProps.series)) {
        this.chart.updateOptions(config);
      }
      // options are not changed, just the series is changed
      else if (JSON.stringify(options) === JSON.stringify(prevProps.options)) {
        this.chart.updateSeries(series);

        // both maybe changed
      } else {
        this.chart.updateOptions(config);
      }
    }
  }

  componentWillUnmount() {
    this.chart.destroy();
  }
}

Charts.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.any,
  height: PropTypes.any,
  series: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired
};

Charts.defaultProps = {
  type: 'line',
  width: '100%',
  height: 'auto'
};

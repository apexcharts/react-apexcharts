import ApexCharts from 'apexcharts';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.chart = null
  }

  render() {
    const { type, width, height, series, options, ...props } = this.props;
    return React.createElement('div', {
      ref: this.chartRef,
      ...props
    });
  }

  componentDidMount() {
    this.chart = new ApexCharts(this.chartRef.current, this.getConfig());
    this.chart.render();
  }

  getConfig() {
    const { type, height, width, series, options } = this.props;
    const newOptions = {
      chart: {
        type,
        height,
        width
      },
      series
    };

    return ApexCharts.merge(options, newOptions);
  }

  componentDidUpdate(prevProps) {
    if (!this.chart) return null;
    const { options, type, width, height, series } = this.props;
    const prevOptions = JSON.stringify(prevProps.options)
    const prevSeries = JSON.stringify(prevProps.series)
    const currentOptions = JSON.stringify(options)
    const currentSeries = JSON.stringify(series)

    if (prevOptions !== currentOptions || prevSeries !== currentSeries) {
      // series is not changed,but options are changed
      if (prevSeries !== currentSeries) {
        this.chart.updateOptions(this.getConfig());
      }
      // options are not changed, just the series is changed
      else if (prevOptions !== currentOptions) {
        this.chart.updateSeries(series);

        // both maybe changed
      } else {
        this.chart.updateOptions(this.getConfig());
      }
    }
  }

  componentWillUnmount() {
    if (this.chart && typeof this.chart.destroy === 'function') this.chart.destroy();
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

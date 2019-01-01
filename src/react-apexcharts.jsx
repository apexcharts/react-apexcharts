import ApexCharts from 'apexcharts';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

window.ApexCharts = ApexCharts;

export default class Charts extends Component {
  constructor(props) {
    super(props);
    if (React.createRef) {
      this.chartRef = React.createRef();
    } else {
      this.setRef = el => this.chartRef = el;
    }
    this.chart = null
  }

  render() {
    const { type, width, height, series, options, ...props } = this.props;
    return React.createElement('div', {
      ref: React.createRef
        ? this.chartRef
        : this.setRef,
      ...props
    });
  }

  componentDidMount() {
    const current = React.createRef ? this.chartRef.current : this.chartRef;
    this.chart = new ApexCharts(current, this.getConfig());
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
    const { options, series } = this.props;
    const prevOptions = JSON.stringify(prevProps.options)
    const prevSeries = JSON.stringify(prevProps.series)
    const currentOptions = JSON.stringify(options)
    const currentSeries = JSON.stringify(series)

    if (prevOptions !== currentOptions || prevSeries !== currentSeries) {
      if (prevSeries === currentSeries) {
        // series is not changed,but options are changed
        this.chart.updateOptions(this.getConfig());
      }
      else if (prevOptions === currentOptions) {
        // options are not changed, just the series is changed
        this.chart.updateSeries(series);
      } else {
        // both might be changed
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

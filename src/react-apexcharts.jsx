import ApexCharts from 'apexcharts';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      chart: null
    }
  }

  render() {
    return (
      React.createElement("div", {ref: this.chartRef})
    );
  }

  componentDidMount() {
    const newOptions = {
      chart: {
        type: this.props.type ? this.props.type : 'line',
        height: this.props.height ? this.props.height : 'auto',
        width: this.props.width ? this.props.width : '100%'
      },
      series: this.props.series
    }

    const config = ApexCharts.merge(this.props.options, newOptions);
    const chart = new ApexCharts(this.chartRef.current, config)
    chart.render().then(() => {
      this.setState({
        chart
      })
    })
  }


  componentDidUpdate(prevProps) {
    const props = this.props;
    
    if (JSON.stringify(prevProps.options) !== JSON.stringify(props.options) || JSON.stringify(prevProps.series) !== JSON.stringify(this.props.series)) {
      const newOptions = {
        chart: {
          type: props.type ? props.type : 'line',
          width: props.width ? props.width : '100%',
          height: props.height ? props.height : 'auto'
        },
        series: props.series
      }
  
      const config = ApexCharts.merge(props.options, newOptions);
  
      // series is not changed,but options are changed
      if (JSON.stringify(props.series) === JSON.stringify(prevProps.series)) {
        this.state.chart.updateOptions(config)
      }
      // options are not changed, just the series is changed
      else if (JSON.stringify(props.options) === JSON.stringify(prevProps.options)) {
        this.state.chart.updateSeries(props.series)
  
      // both maybe changed
      } else {
        this.state.chart.updateOptions(config)
      }
    }
  }

  componentWillUnmount() {
    this.state.chart.destroy();
  }
}

Charts.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.any,
  height: PropTypes.any,
  series: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired
}
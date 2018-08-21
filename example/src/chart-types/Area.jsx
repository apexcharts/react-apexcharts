import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Area extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        xaxis: {
          categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 25, 50, 49, 21, 70, 51]
      }, {
        name: 'series-2',
        data: [23, 12, 54, 61, 32, 56, 81, 19]
      }],
    }
  }

  render() {

    return (
      <div className="area">
        <Chart options={this.state.options} series={this.state.series} type="area" width="500" />
      </div>
    );
  }
}

export default Area;

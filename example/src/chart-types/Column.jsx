import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Column extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      },
      series: [{
        data: [30, 40, 25, 50, 49, 21, 70, 51]
      }],
    }
  }

  render() {

    return (
      <div className="column">
        <Chart options={this.state.options} series={this.state.series} type="bar" width="500" />
      </div>
    );
  }
}

export default Column;

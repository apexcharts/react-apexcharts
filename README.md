<p align="center"><img src="https://apexcharts.com/media/react-apexcharts.png"></p>

<p align="center">
  <a href="https://travis-ci.com/apexcharts/react-apexcharts"><img src="https://api.travis-ci.com/apexcharts/react-apexcharts.svg?branch=master" alt="build" /></a>
  <a href="https://www.npmjs.com/package/react-apexcharts"><img src="https://img.shields.io/npm/v/react-apexcharts.svg" alt="ver"></a>
</p>

<p align="center">
  <a href="https://twitter.com/intent/tweet?text=React-ApexCharts%20A%20React.js%20Chart%20library%20built%20on%20ApexCharts.js&url=https://www.apexcharts.com&hashtags=javascript,charts,react.js,react,apexcharts"><img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social"> </a>
</p>

<p align="center">React.js wrapper for <a href="https://github.com/apexcharts/apexcharts.js">ApexCharts</a> to build interactive visualizations in react.</p>

<p align="center"><a href="https://apexcharts.com/react-chart-demos/"><img src="https://apexcharts.com/media/apexcharts-banner.png"></a></p>


## Download and Installation

##### Installing via npm

```bash
npm install react-apexcharts apexcharts
```

## Usage

### Client-Side Usage (Traditional)

```js
import Chart from 'react-apexcharts'
```

To create a basic bar chart with minimal configuration, write as follows:
```javascript
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }]
    }
  }
  render() {
    return (
      <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
    )
  }
}
```

This will render the following chart
<p align="center"><a href="https://apexcharts.com/javascript-chart-demos/column-charts/"><img src="https://apexcharts.com/media/first-bar-chart.svg"></a></p>

### How do I update the chart?
Simple! Just change the `series` or any `option` and it will automatically re-render the chart.
<p align="center"><a href="https://codesandbox.io/s/mzzq3yqjqj"><img src="https://apexcharts.com/media/react-chart-updation.gif"></a></p>

View this example on <a href="https://codesandbox.io/s/mzzq3yqjqj">codesandbox</a>

### Server-Side Rendering (SSR) with Next.js App Router

**New in v2.0.0**: react-apexcharts now supports Server-Side Rendering with Next.js 13+ App Router using ApexCharts v5.5.0+.

#### Server Component (RSC)

Render charts on the server for faster initial page loads:

```tsx
import Chart from 'react-apexcharts/server'

export default async function DashboardPage() {
  const series = [{
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }]

  const options = {
    chart: { id: 'apexchart-example' },
    xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] }
  }

  return (
    <Chart
      type="bar"
      series={series}
      options={options}
      width={500}
      height={320}
    />
  )
}
```

#### With Client-Side Hydration

For interactive charts, combine server rendering with client-side hydration:

```tsx
// app/dashboard/page.tsx (Server Component)
import Chart from 'react-apexcharts/server'
import ChartHydrate from './ChartHydrate'

export default async function DashboardPage() {
  const series = [{ data: [30, 40, 35, 50, 49, 60, 70] }]
  const options = { chart: { type: 'bar' }, xaxis: { categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] } }

  return (
    <div>
      <Chart type="bar" series={series} options={options} width={500} height={300} />
      <ChartHydrate />
    </div>
  )
}
```

```tsx
// app/dashboard/ChartHydrate.tsx (Client Component)
'use client'
import Hydrate from 'react-apexcharts/hydrate'

export default function ChartHydrate() {
  return (
    <Hydrate
      className="my-chart"
      clientOptions={{
        chart: {
          animations: {
            enabled: true,
            speed: 800
          }
        }
      }}
    />
  )
}
```

#### Client-Only Usage in Next.js

For client-only rendering (same as before):

```tsx
'use client'
import Chart from 'react-apexcharts'

export default function ClientChart() {
  const options = {
    chart: { id: 'apexchart-example' },
    xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] }
  }

  const series = [{
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }]

  return <Chart type="bar" series={series} options={options} />
}
```

**Important:** While updating the options, make sure to update the outermost property even when you need to update the nested property.

✅ Do this
```javascript
this.setState({
  options: {
    ...this.state.options,
    xaxis: {
      ...this.state.options.xaxis,
      categories: ['X1', 'X2', 'X3']
    }
  }
})
```

❌ Not this
```javascript
this.setState({
  options.xaxis.categories: ['X1', 'X2', 'X3']
})
```


## Props


| Prop        | Type           | Description  |
| ------------- |-------------| -----|
| **series** | `Array` | The series is a set of data. To know more about the format of the data, checkout [Series docs](https://apexcharts.com/docs/series/) on the website. |
| **type** | `String`  | `line`, `area`, `bar`, `pie`, `donut`, `scatter`, `bubble`, `heatmap`, `radialBar` |
| **width** | `Number or String`  | Possible values for width can be `100%`, `400px` or `400` (by default is `100%`) |
| **height** | `Number or String` | Possible values for height can be `100%`, `300px` or `300` (by default is `auto`) |
| **options** | `Object` | The configuration object, see options on [API (Reference)](https://apexcharts.com/docs/options/chart/type/) |

## How to call methods of ApexCharts programmatically?
Sometimes, you may want to call other methods of the core ApexCharts library, and you can do so on `ApexCharts` global variable directly

Example
```js
ApexCharts.exec('reactchart-example', 'updateSeries', [{
  data: [40, 55, 65, 11, 23, 44, 54, 33]
}])
```
More info on the `.exec()` method can be found <a href="https://apexcharts.com/docs/methods/#exec">here</a>

All other methods of ApexCharts can be called this way

## What's included

The repository includes the following files and directories.

```
react-apexcharts/
├── dist/
│   ├── react-apexcharts.cjs.js
│   ├── react-apexcharts.esm.js
│   ├── react-apexcharts.iife.min.js
│   └── react-apexchart.min.js (backward compat)
└── example/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
└── src/
    └── react-apexcharts.jsx
```

## Development

#### Install dependencies

```bash
npm install
```

## Running the example

Basic example including update is included to show how to get started using ApexCharts with React easily.

To run the examples,
```bash
cd example
npm install
npm run start
```

#### Bundling

##### To build

```bash
npm run build
```

## License

ApexCharts is offered under a **dual-license model** to support individuals, startups, and commercial products of all sizes.
Read full license agreements here: [https://apexcharts.com/license](https://apexcharts.com/license)

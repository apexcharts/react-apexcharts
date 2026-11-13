import React from 'react'
import { render } from '@testing-library/react'
import ClientApexCharts from 'apexcharts/client'
import CoreApexCharts from 'apexcharts/core'
import ClientChart from './react-apexcharts.jsx'
import CoreChart from './react-apexcharts-core.jsx'

// A chart instance that keeps the config it was given, so the wrapper's
// update effect (which reads w.config.series and opts) runs as it does live.
function mockApexCharts() {
  return jest.fn().mockImplementation((el, config) => ({
    opts: config,
    w: { config },
    render: jest.fn(),
    destroy: jest.fn(),
    updateOptions: jest.fn(),
    updateSeries: jest.fn(),
  }))
}

jest.mock('apexcharts/client', () => mockApexCharts())
jest.mock('apexcharts/core', () => mockApexCharts())

const series = [{ name: 'Breached', data: [[-73.93, 41.36], [-73.8, 42.4]] }]

// options rebuilt on every render, the way a component writes them inline:
// the formatter is a new function each time, so the options never compare equal
const inlineOptions = () => ({
  chart: { zoom: { enabled: true } },
  xaxis: { labels: { formatter: (v) => Number(v).toFixed(2) } },
})

describe.each([
  ['client', ClientChart, ClientApexCharts],
  ['core', CoreChart, CoreApexCharts],
])('%s build: a re-render with unchanged series', (_, Chart, ApexCharts) => {
  beforeEach(() => ApexCharts.mockClear())

  it('updates the options without resending the series', () => {
    const { rerender } = render(
      <Chart type="scatter" series={series} options={inlineOptions()} />
    )
    const instance = ApexCharts.mock.results[0].value

    rerender(<Chart type="scatter" series={series} options={inlineOptions()} />)

    // core reads series in an updateOptions() payload as new data and drops
    // the user's zoom, so a payload carrying them snapped every zoom back
    expect(instance.updateOptions).toHaveBeenCalledTimes(1)
    expect(instance.updateOptions.mock.calls[0][0]).not.toHaveProperty('series')
    expect(instance.updateOptions.mock.calls[0][0].chart.type).toBe('scatter')
    expect(instance.updateSeries).not.toHaveBeenCalled()
  })

  it('still sends the series when they change along with the options', () => {
    const { rerender } = render(
      <Chart type="scatter" series={series} options={inlineOptions()} />
    )
    const instance = ApexCharts.mock.results[0].value
    const next = [{ name: 'Breached', data: [[-73.9, 41.5]] }]

    rerender(<Chart type="scatter" series={next} options={inlineOptions()} />)

    expect(instance.updateOptions).toHaveBeenCalledTimes(1)
    expect(instance.updateOptions.mock.calls[0][0].series).toEqual(next)
  })
})

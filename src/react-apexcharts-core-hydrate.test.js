import React from 'react'
import { render, waitFor } from '@testing-library/react'
import ReactApexChartsHydrate from './react-apexcharts-core-hydrate.jsx'

// Mock ApexCharts core module for tree-shaking variant
jest.mock('apexcharts/core', () => ({
  hydrate: jest.fn(),
}))

const ApexCharts = require('apexcharts/core')

describe('ReactApexChartsHydrate Core (Tree-shaking variant)', () => {
  let mockChartInstance

  beforeEach(() => {
    mockChartInstance = {
      destroy: jest.fn(),
      render: jest.fn(),
      updateOptions: jest.fn(),
      updateSeries: jest.fn(),
    }
    ApexCharts.hydrate.mockReturnValue(mockChartInstance)
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should hydrate chart on mount', async () => {
    const { container } = render(<ReactApexChartsHydrate />)

    await waitFor(() => {
      expect(ApexCharts.hydrate).toHaveBeenCalledTimes(1)
    })

    const chartDiv = container.querySelector('div')
    expect(ApexCharts.hydrate).toHaveBeenCalledWith(
      chartDiv,
      expect.objectContaining({
        chart: expect.objectContaining({
          animations: expect.objectContaining({
            enabled: true,
          }),
        }),
      })
    )
  })

  it('should apply className to container', () => {
    const { container } = render(
      <ReactApexChartsHydrate className="my-chart" />
    )
    expect(container.querySelector('.my-chart')).toBeTruthy()
  })

  it('should destroy chart on unmount', async () => {
    const { unmount } = render(<ReactApexChartsHydrate />)

    await waitFor(() => {
      expect(ApexCharts.hydrate).toHaveBeenCalledTimes(1)
    })

    unmount()

    expect(mockChartInstance.destroy).toHaveBeenCalledTimes(1)
  })

  it('should pass clientOptions to hydrate', async () => {
    const clientOptions = {
      chart: {
        toolbar: { show: false },
      },
    }

    render(<ReactApexChartsHydrate clientOptions={clientOptions} />)

    await waitFor(() => {
      expect(ApexCharts.hydrate).toHaveBeenCalledWith(
        expect.any(Element),
        expect.objectContaining({
          chart: expect.objectContaining({
            toolbar: { show: false },
            animations: { enabled: true },
          }),
        })
      )
    })
  })
})

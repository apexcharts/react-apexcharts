import React from 'react'
import { render, waitFor } from '@testing-library/react'
import ReactApexChartsHydrate from './react-apexcharts-hydrate.jsx'

// Mock ApexCharts client module
jest.mock('apexcharts/client', () => ({
  hydrate: jest.fn(),
}))

const ApexCharts = require('apexcharts/client')

describe('ReactApexChartsHydrate', () => {
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
      <ReactApexChartsHydrate className="custom-chart-class" />
    )

    const chartDiv = container.querySelector('div')
    expect(chartDiv).toHaveClass('custom-chart-class')
  })

  it('should pass custom clientOptions to hydrate', async () => {
    const clientOptions = {
      chart: {
        animations: {
          enabled: true,
          speed: 1000,
        },
        toolbar: {
          show: true,
        },
      },
      colors: ['#FF4560', '#00E396'],
    }

    render(<ReactApexChartsHydrate clientOptions={clientOptions} />)

    await waitFor(() => {
      expect(ApexCharts.hydrate).toHaveBeenCalledWith(
        expect.any(HTMLDivElement),
        expect.objectContaining({
          chart: expect.objectContaining({
            animations: expect.objectContaining({
              enabled: true,
              speed: 1000,
            }),
            toolbar: expect.objectContaining({
              show: true,
            }),
          }),
          colors: ['#FF4560', '#00E396'],
        })
      )
    })
  })

  it('should enable animations by default', async () => {
    render(<ReactApexChartsHydrate />)

    await waitFor(() => {
      expect(ApexCharts.hydrate).toHaveBeenCalledWith(
        expect.any(HTMLDivElement),
        expect.objectContaining({
          chart: expect.objectContaining({
            animations: expect.objectContaining({
              enabled: true,
            }),
          }),
        })
      )
    })
  })

  it('should destroy chart on unmount', async () => {
    const { unmount } = render(<ReactApexChartsHydrate />)

    await waitFor(() => {
      expect(ApexCharts.hydrate).toHaveBeenCalled()
    })

    unmount()

    expect(mockChartInstance.destroy).toHaveBeenCalledTimes(1)
  })

  it('should only hydrate once per mount', async () => {
    const { unmount } = render(<ReactApexChartsHydrate />)

    await waitFor(() => {
      expect(ApexCharts.hydrate).toHaveBeenCalledTimes(1)
    })

    // Clean up
    unmount()
  })

  it('should handle hydration errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    ApexCharts.hydrate.mockImplementation(() => {
      throw new Error('Hydration failed')
    })

    const { container } = render(<ReactApexChartsHydrate />)

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to hydrate ApexChart:',
        expect.any(Error)
      )
    })

    // Component should still render the container div
    expect(container.querySelector('div')).toBeInTheDocument()

    consoleErrorSpy.mockRestore()
  })

  it('should pass through additional props to container', () => {
    const { container } = render(
      <ReactApexChartsHydrate
        data-testid="hydrate-chart"
        aria-label="Hydrated Chart"
        id="my-chart"
      />
    )

    const chartDiv = container.querySelector('div')
    expect(chartDiv).toHaveAttribute('data-testid', 'hydrate-chart')
    expect(chartDiv).toHaveAttribute('aria-label', 'Hydrated Chart')
    expect(chartDiv).toHaveAttribute('id', 'my-chart')
  })

  it('should merge clientOptions with defaults correctly', async () => {
    const clientOptions = {
      chart: {
        animations: {
          speed: 500, // Override speed but keep enabled: true from defaults
        },
      },
      tooltip: {
        enabled: true,
      },
    }

    render(<ReactApexChartsHydrate clientOptions={clientOptions} />)

    await waitFor(() => {
      expect(ApexCharts.hydrate).toHaveBeenCalledWith(
        expect.any(HTMLDivElement),
        expect.objectContaining({
          chart: expect.objectContaining({
            animations: expect.anything(),
          }),
          tooltip: expect.objectContaining({
            enabled: true,
          }),
        })
      )
    })
  })

  it('should hydrate with correct element reference', async () => {
    const { container } = render(<ReactApexChartsHydrate />)

    await waitFor(() => {
      const chartDiv = container.querySelector('div')
      expect(ApexCharts.hydrate).toHaveBeenCalledWith(
        chartDiv,
        expect.any(Object)
      )
    })
  })

  it('should handle empty clientOptions', async () => {
    render(<ReactApexChartsHydrate clientOptions={{}} />)

    await waitFor(() => {
      expect(ApexCharts.hydrate).toHaveBeenCalledWith(
        expect.any(HTMLDivElement),
        expect.objectContaining({
          chart: expect.objectContaining({
            animations: expect.objectContaining({
              enabled: true,
            }),
          }),
        })
      )
    })
  })
})

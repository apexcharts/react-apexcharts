import React from 'react'
import ReactApexChartsServer from './react-apexcharts-server.jsx'

// Mock ApexCharts SSR module
jest.mock('apexcharts/ssr', () => ({
  renderToHTML: jest.fn(),
}))

const ApexCharts = require('apexcharts/ssr')

describe('ReactApexChartsServer', () => {
  const mockSeries = [
    {
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }
  ]

  const mockOptions = {
    chart: { id: 'test-chart' },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render chart HTML from server', async () => {
    const mockHTML = '<div class="apexcharts-canvas">Chart content</div>'
    ApexCharts.renderToHTML.mockResolvedValue(mockHTML)

    const result = await ReactApexChartsServer({
      type: 'bar',
      series: mockSeries,
      options: mockOptions,
      width: 500,
      height: 300,
    })

    expect(ApexCharts.renderToHTML).toHaveBeenCalledWith(
      expect.objectContaining({
        chart: expect.objectContaining({
          type: 'bar',
          width: 500,
          height: 300,
        }),
        series: mockSeries,
      }),
      { width: 500, height: 300 }
    )

    expect(result.type).toBe('div')
    expect(result.props.dangerouslySetInnerHTML).toEqual({ __html: mockHTML })
  })

  it('should use default values when props are not provided', async () => {
    const mockHTML = '<div>Default chart</div>'
    ApexCharts.renderToHTML.mockResolvedValue(mockHTML)

    await ReactApexChartsServer({})

    expect(ApexCharts.renderToHTML).toHaveBeenCalledWith(
      expect.objectContaining({
        chart: expect.objectContaining({
          type: 'line',
          width: 400,
          height: 300,
        }),
        series: [],
      }),
      { width: 400, height: 300 }
    )
  })

  it('should apply className to the container div', async () => {
    const mockHTML = '<div>Chart</div>'
    ApexCharts.renderToHTML.mockResolvedValue(mockHTML)

    const result = await ReactApexChartsServer({
      className: 'my-custom-class',
      series: mockSeries,
      options: mockOptions,
    })

    expect(result.props.className).toBe('my-custom-class')
  })

  it('should pass through additional props to container div', async () => {
    const mockHTML = '<div>Chart</div>'
    ApexCharts.renderToHTML.mockResolvedValue(mockHTML)

    const result = await ReactApexChartsServer({
      series: mockSeries,
      options: mockOptions,
      'data-testid': 'test-chart',
      'aria-label': 'Test Chart',
    })

    expect(result.props['data-testid']).toBe('test-chart')
    expect(result.props['aria-label']).toBe('Test Chart')
  })

  it('should handle errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    ApexCharts.renderToHTML.mockRejectedValue(new Error('Render failed'))

    const result = await ReactApexChartsServer({
      series: mockSeries,
      options: mockOptions,
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to render ApexChart on server:',
      expect.any(Error)
    )
    expect(result.type).toBe('div')
    expect(result.props.children).toEqual(<p>Error rendering chart</p>)

    consoleErrorSpy.mockRestore()
  })

  it('should merge options correctly', async () => {
    const mockHTML = '<div>Chart</div>'
    ApexCharts.renderToHTML.mockResolvedValue(mockHTML)

    const customOptions = {
      chart: {
        id: 'custom-id',
        toolbar: { show: false }
      },
      colors: ['#FF4560']
    }

    await ReactApexChartsServer({
      type: 'area',
      series: mockSeries,
      options: customOptions,
      width: 600,
      height: 400,
    })

    expect(ApexCharts.renderToHTML).toHaveBeenCalledWith(
      expect.objectContaining({
        chart: expect.objectContaining({
          type: 'area',
          width: 600,
          height: 400,
          id: 'custom-id',
          toolbar: { show: false }
        }),
        colors: ['#FF4560'],
        series: mockSeries,
      }),
      { width: 600, height: 400 }
    )
  })

  it('should support all chart types', async () => {
    const mockHTML = '<div>Chart</div>'
    ApexCharts.renderToHTML.mockResolvedValue(mockHTML)

    const chartTypes = ['line', 'area', 'bar', 'pie', 'donut', 'scatter', 'bubble', 'heatmap']

    for (const type of chartTypes) {
      await ReactApexChartsServer({
        type,
        series: mockSeries,
        options: mockOptions,
      })

      expect(ApexCharts.renderToHTML).toHaveBeenCalledWith(
        expect.objectContaining({
          chart: expect.objectContaining({ type }),
        }),
        expect.any(Object)
      )
    }
  })
})

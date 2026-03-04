import React from 'react'
import ReactApexChartsServer from './react-apexcharts-core-server.jsx'

// Mock ApexCharts core module for tree-shaking variant
jest.mock('apexcharts/core', () => ({
  renderToHTML: jest.fn(),
}))

const ApexCharts = require('apexcharts/core')

describe('ReactApexChartsServer Core (Tree-shaking variant)', () => {
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

  it('should render chart HTML from server using apexcharts/core', async () => {
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

    const result = await ReactApexChartsServer({})

    expect(ApexCharts.renderToHTML).toHaveBeenCalledWith(
      expect.objectContaining({
        chart: expect.objectContaining({
          type: 'line',
          width: 400,
          height: 300,
        }),
      }),
      { width: 400, height: 300 }
    )

    expect(result.type).toBe('div')
  })

  it('should handle errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    ApexCharts.renderToHTML.mockRejectedValue(new Error('Render failed'))

    const result = await ReactApexChartsServer({
      type: 'bar',
      series: mockSeries,
      options: mockOptions,
    })

    expect(result.type).toBe('div')
    expect(result.props.children.type).toBe('p')
    expect(result.props.children.props.children).toBe('Error rendering chart')

    consoleSpy.mockRestore()
  })

  it('should apply className to container', async () => {
    const mockHTML = '<div>Chart</div>'
    ApexCharts.renderToHTML.mockResolvedValue(mockHTML)

    const result = await ReactApexChartsServer({
      type: 'line',
      series: mockSeries,
      options: mockOptions,
      className: 'my-chart',
    })

    expect(result.props.className).toBe('my-chart')
  })
})

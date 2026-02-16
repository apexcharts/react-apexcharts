// Mock for apexcharts/client module
const ApexCharts = jest.fn().mockImplementation(function(el, config) {
  const height = config?.chart?.height || 'auto'
  const width = config?.chart?.width || '100%'
  const type = config?.chart?.type || 'line'

  this.el = el
  this.opts = {
    chart: {
      height,
      width,
      type,
      ...config?.chart
    },
    series: config?.series || [],
    ...config
  }
  this.w = {
    config: {
      series: config?.series || [],
      chart: {
        type,
        height,
        width,
        ...config?.chart
      },
      ...config
    }
  }

  this.render = jest.fn().mockResolvedValue(undefined)
  this.destroy = jest.fn()
  this.updateOptions = jest.fn().mockImplementation((newConfig) => {
    // Update opts when updateOptions is called
    this.opts = {
      ...this.opts,
      ...newConfig,
      chart: {
        ...this.opts.chart,
        ...newConfig?.chart
      }
    }
    this.w.config = {
      ...this.w.config,
      ...newConfig,
      chart: {
        ...this.w.config.chart,
        ...newConfig?.chart
      }
    }
  })
  this.updateSeries = jest.fn().mockImplementation((newSeries) => {
    this.w.config.series = newSeries
  })

  return this
})

// Static methods
ApexCharts.exec = jest.fn()
ApexCharts.hydrate = jest.fn((el, options) => {
  const instance = {
    destroy: jest.fn(),
    render: jest.fn(),
    updateOptions: jest.fn(),
    updateSeries: jest.fn(),
  }
  return instance
})

export default ApexCharts

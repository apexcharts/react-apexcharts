import ApexCharts from 'apexcharts/dist/apexcharts.common'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

window.ApexCharts = ApexCharts

export default class Charts extends Component {
  constructor (props) {
    super(props)
    if (React.createRef) {
      this.chartRef = React.createRef()
    } else {
      this.setRef = el => this.chartRef = el
    }
    this.chart = null
  }

  render () {
    const { type, width, height, series, options, ...props } = this.props
    return React.createElement('div', {
      ref: React.createRef
        ? this.chartRef
        : this.setRef,
      ...props
    })
  }

  componentDidMount () {
    const current = React.createRef ? this.chartRef.current : this.chartRef
    this.chart = new ApexCharts(current, this.getConfig(this.props))
    this.chart.render()
  }

  getConfig ({ type, height, width, series, options }) {
    const newOptions = {
      chart: {
        type,
        height,
        width
      }
    }

    if (series) {
      newOptions.series = series;
    }

    return this.extend(options, newOptions)
  }

  isObject(item) {
    return (
      item && typeof item === 'object' && !Array.isArray(item) && item != null
    )
  }

  extend (target, source) {
    if (typeof Object.assign !== 'function') {
      (function () {
        Object.assign = function (target) {
          // We must check against these specific cases.
          if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object')
          }

          let output = Object(target)
          for (let index = 1; index < arguments.length; index++) {
            let source = arguments[index]
            if (source !== undefined && source !== null) {
              for (let nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                  output[nextKey] = source[nextKey]
                }
              }
            }
          }
          return output
        }
      })()
    }

    let output = Object.assign({}, target)
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, {
              [key]: source[key]
            })
          } else {
            output[key] = this.extend(target[key], source[key])
          }
        } else {
          Object.assign(output, {
            [key]: source[key]
          })
        }
      })
    }
    return output
  }

  componentDidUpdate (prevProps) {
    if (!this.chart) return null
    const { options, series } = this.props
    const prevOptions = JSON.stringify(prevProps.options)
    const prevSeries = JSON.stringify(prevProps.series)
    const currentOptions = JSON.stringify(options)
    const currentSeries = JSON.stringify(series)

    if (prevOptions !== currentOptions || prevSeries !== currentSeries) {
      if (prevSeries === currentSeries) {
        // series is not changed, but options are changed
        const configProps = Object.assign({}, this.props)
        if (configProps.series) {
          // exclude series since it hasn't changed
          delete configProps.series
        }
        this.chart.updateOptions(this.getConfig(configProps))
      } else if (prevOptions === currentOptions) {
        // options are not changed, just the series is changed
        this.chart.updateSeries(series)
      } else {
        // both might be changed
        this.chart.updateOptions(this.getConfig())
      }
    }
  }

  componentWillUnmount () {
    if (this.chart && typeof this.chart.destroy === 'function') this.chart.destroy()
  }
}

Charts.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.any,
  height: PropTypes.any,
  series: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired
}

Charts.defaultProps = {
  type: 'line',
  width: '100%',
  height: 'auto'
}

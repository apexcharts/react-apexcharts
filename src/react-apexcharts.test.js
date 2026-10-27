import React from 'react'
import { createRoot } from 'react-dom/client'
import { render } from '@testing-library/react'
import ApexCharts from 'apexcharts/client'
import Chart from './react-apexcharts.jsx'

// Mock ApexCharts client module - simplified for testing
jest.mock('apexcharts/client')

describe('ReactApexCharts (Client Component)', () => {
  const react19OnlyIt = Number(React.version.split('.')[0]) >= 19 ? it : it.skip
  const defaultProps = {
    type: 'bar',
    options: {
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    },
    series: [{
      data: [30, 40, 25, 50, 49, 21, 70, 51]
    }],
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<Chart {...defaultProps} />);
    root.unmount();
  })

  it('renders with custom width and height', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<Chart {...defaultProps} width={600} height={400} />);
    root.unmount();
  })

  it('renders with className', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<Chart {...defaultProps} className="custom-class" />);
    root.unmount();
  })

  it('accepts chartRef prop', () => {
    const chartRef = React.createRef()
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<Chart {...defaultProps} chartRef={chartRef} />);
    root.unmount();
  })

  it('renders with minimal props', () => {
    const minimalProps = {
      type: 'line',
      series: [],
      options: {}
    }

    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<Chart {...minimalProps} />);
    root.unmount();
  })

  react19OnlyIt('does not forward a React ref to the chart container', () => {
    const forwardedRef = React.createRef()
    const { container } = render(<Chart {...defaultProps} ref={forwardedRef} />)

    expect(ApexCharts).toHaveBeenCalledWith(
      container.querySelector('div'),
      expect.any(Object)
    )
    expect(forwardedRef.current).toBeNull()
  })
})

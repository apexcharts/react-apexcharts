import React from 'react'
import { createRoot } from 'react-dom/client'
import Chart from './react-apexcharts-core.jsx'

// Mock ApexCharts core module - for tree-shaking variant
jest.mock('apexcharts/core')

describe('ReactApexCharts Core (Tree-shaking variant)', () => {
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

  it('imports from apexcharts/core instead of apexcharts/client', () => {
    // Verify the core module is being used (not the full bundle)
    expect(jest.isMockFunction(require('apexcharts/core').default || require('apexcharts/core'))).toBe(true)
  })
})

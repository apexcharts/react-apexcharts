import ChartClient from '@/components/ChartClient'
import type { ApexOptions } from '@/types/apexcharts'
import Link from 'next/link'

export default function Home() {
  // Line Chart Configuration
  const lineChartOptions: ApexOptions = {
    chart: {
      id: 'line-chart-ssr',
      toolbar: {
        show: true
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Monthly Sales Data',
      align: 'left'
    },
    colors: ['#008FFB']
  }

  const lineChartSeries = [{
    name: 'Sales',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }]

  // Bar Chart Configuration
  const barChartOptions: ApexOptions = {
    chart: {
      id: 'bar-chart-ssr',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
    title: {
      text: 'Quarterly Revenue',
      align: 'left'
    },
    colors: ['#00E396', '#FEB019']
  }

  const barChartSeries = [{
    name: '2024',
    data: [44, 55, 57, 56]
  }, {
    name: '2025',
    data: [76, 85, 101, 98]
  }]

  // Donut Chart Configuration
  const donutChartOptions: ApexOptions = {
    chart: {
      id: 'donut-chart-ssr'
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D'],
    title: {
      text: 'Team Distribution',
      align: 'left'
    },
    legend: {
      position: 'bottom'
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560']
  }

  const donutChartSeries = [44, 55, 13, 33]

  // Area Chart Configuration
  const areaChartOptions: ApexOptions = {
    chart: {
      id: 'area-chart-ssr',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01',
        '2024-05-01', '2024-06-01', '2024-07-01'
      ]
    },
    title: {
      text: 'Website Traffic',
      align: 'left'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
      }
    },
    colors: ['#775DD0']
  }

  const areaChartSeries = [{
    name: 'Visitors',
    data: [31, 40, 28, 51, 42, 109, 100]
  }]

  return (
    <main>
      <h1>React ApexCharts 2.0.0 - Next.js SSR Example</h1>

      <div className="info-box">
        <p>
          This example demonstrates how to use <code>react-apexcharts 2.0.0</code> with Next.js 14+ App Router and Server-Side Rendering.
        </p>
        <p>
          Charts are rendered on the client side using the <code>&apos;use client&apos;</code> directive and Next.js <code>dynamic</code> import with <code>ssr: false</code>.
        </p>
      </div>

      <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '8px', border: '2px solid #10b981' }}>
        <h2 style={{ marginTop: 0, color: '#059669' }}>🖥️ Server Component Example</h2>
        <p style={{ color: '#047857', marginBottom: '1rem' }}>
          Want to fetch data on the server? Check out the <Link href="/server-data" style={{ color: '#059669', textDecoration: 'underline' }}>Server Component example</Link> to see how to combine server-side data fetching with client-side chart rendering.
        </p>
        <p style={{ color: '#718096', fontSize: '0.9rem', margin: 0 }}>
          This is the recommended pattern for most Next.js applications using ApexCharts.
        </p>
      </div>

      <h2>Line Chart</h2>
      <div className="chart-container">
        <ChartClient
          options={lineChartOptions}
          series={lineChartSeries}
          type="line"
          height={350}
        />
      </div>

      <h2>Bar Chart</h2>
      <div className="chart-container">
        <ChartClient
          options={barChartOptions}
          series={barChartSeries}
          type="bar"
          height={350}
        />
      </div>

      <h2>Donut Chart</h2>
      <div className="chart-container">
        <ChartClient
          options={donutChartOptions}
          series={donutChartSeries}
          type="donut"
          height={350}
        />
      </div>

      <h2>Area Chart</h2>
      <div className="chart-container">
        <ChartClient
          options={areaChartOptions}
          series={areaChartSeries}
          type="area"
          height={350}
        />
      </div>
    </main>
  )
}

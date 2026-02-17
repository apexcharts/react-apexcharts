import ChartClient from '@/components/ChartClient'
import type { ApexOptions } from '@/types/apexcharts'

// Simulate fetching data from an API or database on the server
async function getChartData() {
  // This runs on the server at build time or request time
  // You could fetch from a database, external API, etc.

  // Simulating an async operation
  await new Promise(resolve => setTimeout(resolve, 100))

  return {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    sales: [4500, 5200, 4800, 6100, 5900, 7200, 8400],
    revenue: [12000, 15000, 13500, 18000, 17500, 21000, 24500],
    timestamp: new Date().toISOString()
  }
}

// This is a Server Component - it runs on the server
export default async function ServerDataPage() {
  // Fetch data on the server
  const data = await getChartData()

  // Prepare chart configuration with server-fetched data
  const chartOptions: ApexOptions = {
    chart: {
      id: 'server-data-chart',
      toolbar: {
        show: true
      }
    },
    xaxis: {
      categories: data.categories
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    title: {
      text: 'Server-Side Data Fetching Example',
      align: 'left'
    },
    subtitle: {
      text: `Data fetched at: ${new Date(data.timestamp).toLocaleString()}`,
      align: 'left'
    },
    colors: ['#008FFB', '#00E396'],
    legend: {
      position: 'top'
    }
  }

  const chartSeries = [
    {
      name: 'Sales',
      data: data.sales
    },
    {
      name: 'Revenue',
      data: data.revenue
    }
  ]

  return (
    <main>
      <h1>Server Component with Client-Side Chart</h1>

      <div className="info-box">
        <p>
          This page is a <strong>Server Component</strong> that fetches data on the server.
        </p>
        <p>
          The data is passed as props to the <code>ChartClient</code> component, which renders
          the chart on the client side.
        </p>
        <p>
          This approach gives you the benefits of:
        </p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Server-side data fetching (can access databases, APIs with secrets, etc.)</li>
          <li>Reduced client-side JavaScript bundle</li>
          <li>Better SEO (page content is rendered on server)</li>
          <li>Client-side interactivity for the chart</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>How It Works</h2>
        <div style={{
          background: '#2d3748',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '0.9rem'
        }}>
          <p style={{ margin: '0.5rem 0' }}>1. Server Component fetches data (runs on server)</p>
          <p style={{ margin: '0.5rem 0' }}>2. Data is prepared and passed to Client Component</p>
          <p style={{ margin: '0.5rem 0' }}>3. HTML is sent to browser with data</p>
          <p style={{ margin: '0.5rem 0' }}>4. Client Component hydrates and renders the chart</p>
        </div>
      </div>

      <h2>Chart with Server-Fetched Data</h2>
      <div className="chart-container">
        <ChartClient
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={400}
        />
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Key Points:</h3>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>
            <strong>Server Component</strong> (this file): Can be async, fetches data, no <code>&apos;use client&apos;</code>
          </li>
          <li>
            <strong>Client Component</strong> (ChartClient): Has <code>&apos;use client&apos;</code>, uses dynamic import with <code>ssr: false</code>
          </li>
          <li>
            ApexCharts library is <strong>never</strong> loaded on the server - only in the browser
          </li>
          <li>
            You get the best of both worlds: server-side data fetching + client-side interactivity
          </li>
        </ul>
      </div>
    </main>
  )
}

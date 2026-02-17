import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'React ApexCharts SSR Example',
  description: 'Next.js SSR example using react-apexcharts 2.0.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

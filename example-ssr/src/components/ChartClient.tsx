'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { ApexOptions, ApexAxisChartSeries, ApexNonAxisChartSeries } from '@/types/apexcharts'

// Dynamically import ReactApexChart with no SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ChartClientProps {
  options: ApexOptions
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
  type?: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'boxPlot' | 'radar' | 'polarArea' | 'rangeBar' | 'rangeArea' | 'treemap'
  width?: string | number
  height?: string | number
}

export default function ChartClient({
  options,
  series,
  type = 'line',
  width = '100%',
  height = 350
}: ChartClientProps) {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type={type}
      width={width}
      height={height}
    />
  )
}

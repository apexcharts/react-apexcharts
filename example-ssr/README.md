# React ApexCharts SSR Example with Next.js

A simple example showing how to use `react-apexcharts` v2.0.0 with Next.js 14+ App Router.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## What's Inside

- **[Home Page](src/app/page.tsx)** (`/`) - Basic chart examples with static data
- **[Server Data Page](src/app/server-data/page.tsx)** (`/server-data`) - Server Component fetching data

## How to Use ApexCharts with Next.js

### 1. Client-Side Rendering (Simple)

Use `dynamic` import to disable SSR for the chart:

```tsx
// src/components/ChartClient.tsx
'use client'

import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function ChartClient({ options, series, type }) {
  return <ReactApexChart options={options} series={series} type={type} />
}
```

### 2. Server Component + Client Chart (Recommended)

Fetch data on the server, render chart on the client:

```tsx
// app/page.tsx - Server Component
import ChartClient from '@/components/ChartClient'

export default async function Page() {
  // This runs on the server
  const data = await fetchFromDatabase()

  // Chart renders on the client
  return <ChartClient options={options} series={data} />
}
```

## TypeScript Support

ApexCharts types are available through module augmentation. Import them like this:

```tsx
import type { ApexOptions } from '@/types/apexcharts'
```

See [src/types/apexcharts.ts](src/types/apexcharts.ts) for the type definitions.

## Key Points

✅ **react-apexcharts 2.0.0** requires **apexcharts 5.5.0+**
✅ Charts must be rendered on the **client side** (use `'use client'` directive)
✅ Use `dynamic(() => import('react-apexcharts'), { ssr: false })` to disable SSR
✅ You can fetch data on the server and pass it to client components

## About `react-apexcharts/server`

The package includes `/server` and `/hydrate` exports for true server-side rendering:
- `react-apexcharts/server` - Renders charts to HTML on the server
- `react-apexcharts/hydrate` - Hydrates server-rendered charts on the client

These require `apexcharts/ssr` and `apexcharts/client` which may need additional setup.

**For most applications, the Server Component pattern (shown in this example) is simpler and sufficient.**

## Learn More

- [React ApexCharts](https://github.com/apexcharts/react-apexcharts)
- [ApexCharts Documentation](https://apexcharts.com/docs/)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT

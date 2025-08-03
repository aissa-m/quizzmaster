// File: app/components/SparklineChart.tsx
'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Load chart component client-side
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SparklineChartProps {
  data: [number, number][]; // [timestamp, value]
}

export default function SparklineChart({ data }: SparklineChartProps) {
  const options: ApexOptions = {
    chart: {
      type: 'line',
      sparkline: { enabled: true },
    },
    stroke: { curve: 'smooth', width: 2 },
    tooltip: { enabled: true, x: { show: false } },
    xaxis: { type: 'datetime' },
  };

  return (
    <div className="w-full h-12">
      <ReactApexChart
        options={options}
        series={[{ data }]}
        type="line"
        height={50}
      />
    </div>
  );
}

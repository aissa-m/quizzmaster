// File: app/components/CategoryPieChart.tsx
'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Cargamos el chart solo en cliente
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CategoryPieChartProps {
  data: { name: string; value: number }[];
}

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  const options: ApexOptions = {
    chart: {
      type: 'pie',
      toolbar: { show: false },
    },
    labels: data.map(d => d.name),
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => `${Number(val).toFixed(1)}%`
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} intentos`
      }
    }
  };

  const series = data.map(d => d.value);

  return (
    <div className="w-full h-80">
      <ReactApexChart options={options} series={series} type="pie" height={320} />
    </div>
  );
}

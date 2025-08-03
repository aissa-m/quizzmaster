'use client';

import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
);

interface AttemptsChartProps {
  data: { name: string; value: number }[];
}

export default function AttemptsChart({ data }: AttemptsChartProps) {
  const options = {
    chart: {
      type: 'bar' as const,
      toolbar: { show: false },
    },
    xaxis: {
      categories: data.map(d => d.name),
      labels: { rotate: -45 },
    },
    plotOptions: {
      bar: { borderRadius: 4, horizontal: false },
    },
    dataLabels: { enabled: false },
    yaxis: {
      title: { text: 'Número de intentos' },
    },
  };

  const series = [
    {
      name: 'Intentos',
      data: data.map(d => d.value),
    },
  ];

  return (
    <div className="w-full h-80">
      <ReactApexChart options={options} series={series} type="bar" height="100%" />
    </div>
  );
}

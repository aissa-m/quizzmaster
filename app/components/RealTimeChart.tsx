'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import ApexCharts, { ApexOptions } from 'apexcharts';

// Load chart component only on client
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DATA_POINTS = 10;
const INTERVAL_MS = 1000;
const MAX_Y = 100;
const MIN_Y = 10;
const RANGE_MS = DATA_POINTS * INTERVAL_MS;

function getInitialData(): [number, number][] {
  const now = Date.now();
  return Array.from({ length: DATA_POINTS }, (_, i) => [
    now - (DATA_POINTS - i) * INTERVAL_MS,
    Math.floor(Math.random() * (MAX_Y - MIN_Y) + MIN_Y)
  ]);
}

export default function RealTimeChart() {
  const dataRef = useRef<[number, number][]>(getInitialData());
  // dummy state to trigger initial render
  const [, setTick] = useState(0);

  const options: ApexOptions = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        dynamicAnimation: { speed: INTERVAL_MS }
      },
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    title: { text: 'Dynamic Updating Chart', align: 'left' },
    markers: { size: 0 },
    xaxis: {
      type: 'datetime',
      range: RANGE_MS
    },
    yaxis: { max: MAX_Y },
    legend: { show: false }
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      const last = dataRef.current[dataRef.current.length - 1][0];
      const nextTime = last + INTERVAL_MS;
      const nextValue = Math.floor(Math.random() * (MAX_Y - MIN_Y) + MIN_Y);

      // slide window
      dataRef.current = [...dataRef.current.slice(1), [nextTime, nextValue]];

      // update chart series
      ApexCharts.exec('realtime', 'updateSeries', [{ data: dataRef.current }]);

      // trigger initial render
      setTick((t) => t + 1);
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="realtime-chart">
      <ReactApexChart
        options={options}
        series={[{ data: dataRef.current }]}
        type="line"
        height={350}
      />
    </div>
  );
}

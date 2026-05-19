'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const LeadsChartInner = dynamic(() => import('./LeadsChartInner'), { ssr: false });

export default function LeadsChart() {
  return <LeadsChartInner />;
}
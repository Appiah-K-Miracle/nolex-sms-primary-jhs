"use client";

import React from 'react';

export default function BarChart({ data, width = 300, height = 180 }: { data: { label: string; value: number }[]; width?: number; height?: number }) {
  const max = Math.max(...data.map(d => d.value), 1);
  const padding = 20;
  const barWidth = (width - padding * 2) / data.length * 0.7;

  return (
    <svg width={width} height={height} className="w-full" viewBox={`0 0 ${width} ${height}`}>
      {data.map((d, i) => {
        const x = padding + i * ((width - padding * 2) / data.length) + (((width - padding * 2) / data.length) - barWidth) / 2;
        const barHeight = (d.value / max) * (height - padding * 2);
        const y = height - padding - barHeight;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barWidth} height={barHeight} fill="#4f46e5" rx={4} />
            <text x={x + barWidth / 2} y={height - 6} fontSize={10} textAnchor="middle" fill="#374151">{d.label}</text>
            <text x={x + barWidth / 2} y={y - 6} fontSize={11} textAnchor="middle" fill="#111827">{d.value}</text>
          </g>
        );
      })}
    </svg>
  );
}

"use client";

import React from 'react';

export default function LineChart({ data, width = 320, height = 140 }: { data: number[]; width?: number; height?: number }){
  const padding = 20;
  const max = Math.max(...data, 1);
  const points = data.map((v, i) => {
    const x = padding + (i * (width - padding * 2) / Math.max(1, data.length - 1));
    const y = height - padding - (v / max) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full">
      <polyline fill="none" stroke="#4f46e5" strokeWidth={2} points={points} />
      {data.map((v,i)=>{
        const x = padding + (i * (width - padding * 2) / Math.max(1, data.length - 1));
        const y = height - padding - (v / max) * (height - padding * 2);
        return <circle key={i} cx={x} cy={y} r={3} fill="#4f46e5" />;
      })}
    </svg>
  );
}

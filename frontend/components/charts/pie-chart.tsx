"use client";

import React from 'react';

function polarToCartesian(cx:number, cy:number, r:number, angleInDegrees:number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return { x: cx + (r * Math.cos(angleInRadians)), y: cy + (r * Math.sin(angleInRadians)) };
}

function describeArc(cx:number, cy:number, r:number, startAngle:number, endAngle:number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

export default function PieChart({ data, size = 160 }: { data: { label: string; value: number; color?: string }[]; size?: number }){
  const total = data.reduce((s,d)=>s+d.value,0) || 1;
  let start = 0;
  const cx = size/2, cy = size/2, r = size/2 - 4;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((d, i) => {
        const angle = d.value / total * 360;
        const path = describeArc(cx, cy, r, start, start + angle);
        const color = d.color ?? ['#60a5fa','#34d399','#f97316','#ef4444','#a78bfa'][i % 5];
        start += angle;
        return <path key={d.label} d={path} fill={color} stroke="#fff" strokeWidth={1}/>;
      })}
    </svg>
  );
}

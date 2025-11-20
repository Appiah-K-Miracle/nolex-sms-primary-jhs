"use client";

import React from "react";

type Card = {
  id?: string | number;
  title: string;
  value: string | number;
  subtitle?: string;
  percent?: number;
};

export default function SummaryCards({ cards }: { cards: Card[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((c, idx) => (
        <div key={c.id ?? idx} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">{c.title}</div>
              <div className="text-2xl font-semibold mt-1">{c.value}</div>
              {c.subtitle && <div className="text-xs text-gray-400 mt-1">{c.subtitle}</div>}
            </div>
            <div className="ml-4">
              {typeof c.percent === 'number' ? (
                <div className="w-20">
                  <div className="text-xs text-gray-500 mb-1">{c.percent}%</div>
                  <div className="w-full h-2 bg-gray-100 rounded overflow-hidden">
                    <div className="h-2 bg-indigo-600 rounded" style={{ width: `${Math.max(0, Math.min(100, c.percent))}%` }} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

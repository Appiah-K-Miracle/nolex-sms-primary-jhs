"use client";

import SummaryCards from "../../../../components/teacher/summary-cards";
import { useState } from "react";

export default function AssessmentClassPage() {
  // Mock metrics
  const totalCA = 34;
  const pendingScores = 12;
  const completionRate = 84; // percent
  const todaysTasks = '3 assignments to grade';

  const cards = [
    { title: 'Total CA Activities Created', value: totalCA },
    { title: 'Pending Scores to Enter', value: pendingScores },
    { title: 'CA Completion Rate (%)', value: `${completionRate}%`, percent: completionRate },
    { title: "Today's Assessment Tasks", value: todaysTasks }
  ];

  const [mode, setMode] = useState<'single'|'bulk'>('single');

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Class Assessment (C.A)</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="mb-6 flex gap-3">
        <button onClick={() => setMode('single')} className={`px-3 py-2 rounded ${mode === 'single' ? 'bg-blue-600 text-white' : 'border'}`}>Single Entry</button>
        <button onClick={() => setMode('bulk')} className={`px-3 py-2 rounded ${mode === 'bulk' ? 'bg-blue-600 text-white' : 'border'}`}>Bulk Entry (Table)</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Continuous Assessment Entry</h3>
          <div className="mb-4 text-sm text-gray-600">CA Types: Assignment / Quiz / Class Test / Project / Homework</div>

          {mode === 'single' ? (
            <div className="space-y-3">
              <div className="w-full h-40 bg-gray-50 rounded flex items-center justify-center text-gray-400">Single score entry form placeholder</div>
            </div>
          ) : (
            <div className="w-full h-48 bg-gray-50 rounded flex items-center justify-center text-gray-400">Bulk table entry / Excel import placeholder</div>
          )}

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Gradebook (CA Only)</h3>
            <div className="w-full h-40 bg-gray-50 rounded flex items-center justify-center text-gray-400">Gradebook placeholder (auto-grade, pass/fail)</div>
          </div>
        </div>

        <aside className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Class Performance Insights</h3>
          <div className="w-full h-32 bg-gray-50 rounded flex items-center justify-center text-gray-400">Charts placeholder (trend / distribution)</div>
          <div className="mt-4 text-sm text-gray-600">
            <div>Top performers: 3 students</div>
            <div>Students struggling: 5 students</div>
            <div>Completion rate: {completionRate}%</div>
          </div>
        </aside>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold mb-3">Remarks & Feedback</h3>
        <div className="w-full h-28 bg-gray-50 rounded flex items-center justify-center text-gray-400">Remarks input & suggestions placeholder</div>
      </div>
    </div>
  );
}

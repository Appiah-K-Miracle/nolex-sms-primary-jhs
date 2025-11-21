"use client";

import { use } from 'react';
import SummaryCards from "../../../../../components/teacher/summary-cards";
import LineChart from "../../../../../components/charts/line-chart";

type Props = { params: { id: string } };

export default function StudentDetail({ params }: Props){
  const id = Number(params.id);
  // mock student
  const student = { id, name: 'John Doe', class: '3A', gender: 'M', parent: 'Mrs Doe' };

  const cards = [
    { title: 'Attendance %', value: '94%' },
    { title: 'Reports This Term', value: 2 },
    { title: 'Pending Signatures', value: 0 },
    { title: 'Behavior Alerts', value: 0 }
  ];

  const trend = [65,70,68,72,75,78];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Student: {student.name}</h1>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-gray-100 rounded">Open PDF</button>
          <button className="px-3 py-2 bg-gray-100 rounded">Download</button>
        </div>
      </div>

      <SummaryCards cards={cards} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Academic Summary</h3>
          <div className="text-sm text-gray-600 mb-3">CA and Exam results with remarks.</div>
          <div className="h-48"><LineChart data={trend} /></div>
        </div>

        <aside className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Bio</h3>
          <div className="text-sm text-gray-600">Class: {student.class}</div>
          <div className="text-sm text-gray-600">Gender: {student.gender}</div>
          <div className="text-sm text-gray-600">Parent: {student.parent}</div>
        </aside>
      </div>
    </div>
  );
}

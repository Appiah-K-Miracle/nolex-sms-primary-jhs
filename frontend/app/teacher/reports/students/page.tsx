"use client";

import Link from "next/link";
import SummaryCards from "../../../../components/teacher/summary-cards";

const students = [
  { id: 1, name: 'John Doe', class: '3A' },
  { id: 2, name: 'Jane Smith', class: '3A' },
  { id: 3, name: 'Ali Khan', class: '3A' }
];

export default function StudentsReport(){
  const cards = [
    { title: 'Total Students', value: students.length },
    { title: 'Reports Generated This Term', value: 24 },
    { title: 'Pending Parent Signatures', value: 2 },
    { title: 'Students With Behavior Alerts', value: 1 }
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Student Reports</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-3">Students</h3>
        <ul className="space-y-2">
          {students.map(s=> (
            <li key={s.id} className="flex items-center justify-between">
              <div>{s.name} <span className="text-xs text-gray-400">{s.class}</span></div>
              <div className="flex gap-2">
                <Link href={`/teacher/reports/students/${s.id}`} className="px-3 py-1 bg-gray-100 rounded text-sm">View</Link>
                <button className="px-3 py-1 bg-gray-100 rounded text-sm">Download PDF</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

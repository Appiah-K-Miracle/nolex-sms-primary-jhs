"use client";

import React from "react";
import Link from "next/link";
import LineChart from "../../../../../components/charts/line-chart";
import BarChart from "../../../../../components/charts/bar-chart";

type StudentRow = { id: number; name: string; present: number; absent: number; late: number };

const students: StudentRow[] = [
  { id:1, name: 'John Doe', present: 18, absent: 2, late: 1 },
  { id:2, name: 'Jane Smith', present: 19, absent: 1, late: 0 },
  { id:3, name: 'Ali Khan', present: 17, absent: 3, late: 2 },
  { id:4, name: 'Mary Adu', present: 20, absent: 0, late: 0 },
];

export default function AttendanceReport(){
  const weekly = [92, 90, 94, 91, 93];
  const absencesData = students.map(s => ({ label: s.name.split(' ')[0], value: s.absent }));

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Attendance Report</h1>
        <Link href="/teacher/reports/class" className="px-3 py-2 bg-gray-100 rounded">Back to Class</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-3">Class Attendance Table</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th>Name</th><th>Present</th><th>Absent</th><th>Late</th><th>Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="py-2">{s.name}</td>
                  <td>{s.present}</td>
                  <td>{s.absent}</td>
                  <td>{s.late}</td>
                  <td>{Math.round((s.present / (s.present + s.absent)) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Trends</h3>
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">Weekly Attendance Trend</div>
            <div className="h-32"><LineChart data={weekly} /></div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-2">Absences per Student</div>
            <div className="h-36"><BarChart data={absencesData} /></div>
          </div>
        </aside>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="px-3 py-2 bg-gray-100 rounded">Export Excel</button>
        <button className="px-3 py-2 bg-gray-100 rounded">Export PDF</button>
      </div>
    </div>
  );
}

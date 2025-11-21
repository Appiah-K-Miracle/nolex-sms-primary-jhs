"use client";

import React from "react";
import Link from "next/link";
import PieChart from "../../../../../components/charts/pie-chart";
import BarChart from "../../../../../components/charts/bar-chart";

const students = [
  { name: 'John Doe', ca: 12, exam: 40 },
  { name: 'Jane Smith', ca: 14, exam: 45 },
  { name: 'Ali Khan', ca: 10, exam: 35 },
  { name: 'Mary Adu', ca: 15, exam: 48 },
];

export default function AcademicReport(){
  const gradeDist = [{label:'A', value:2},{label:'B', value:1},{label:'C', value:1}];
  const subjectPerf = [{label:'Math', value:78},{label:'Eng', value:82},{label:'Sci', value:74}];

  const atRisk = students.filter(s => ((s.ca + s.exam) / 2) < 40);
  const top = students.slice().sort((a,b)=> (b.ca+b.exam)-(a.ca+a.exam)).slice(0,3);

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Academic Performance</h1>
        <Link href="/teacher/reports/class" className="px-3 py-2 bg-gray-100 rounded">Back to Class</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-3">Class Performance Table</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500"><th>Student</th><th>CA</th><th>Exam</th><th>Average</th><th>Grade</th></tr>
            </thead>
            <tbody>
              {students.map(s=>{
                const avg = Math.round((s.ca + s.exam)/2);
                const grade = avg >= 70 ? 'A' : avg >= 60 ? 'B' : avg >= 50 ? 'C' : 'D';
                return (<tr key={s.name} className="border-t"><td className="py-2">{s.name}</td><td>{s.ca}</td><td>{s.exam}</td><td>{avg}</td><td>{grade}</td></tr>);
              })}
            </tbody>
          </table>

        </div>

        <aside className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Analytics</h3>
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">Grade Distribution</div>
            <div className="h-36"><PieChart data={gradeDist} /></div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-2">Subject Comparison</div>
            <div className="h-40"><BarChart data={subjectPerf} /></div>
          </div>
        </aside>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h4 className="font-semibold">Students At Risk</h4>
          {atRisk.length === 0 ? <div className="text-sm text-gray-500">None</div> : <ul className="text-sm">{atRisk.map(a=><li key={a.name}>{a.name}</li>)}</ul>}
        </div>
        <div className="bg-white rounded shadow p-4">
          <h4 className="font-semibold">Top Performers</h4>
          <ul className="text-sm">{top.map(t=> <li key={t.name}>{t.name}</li>)}</ul>
        </div>
      </div>

      <div className="mt-4 flex gap-2"><button className="px-3 py-2 bg-gray-100 rounded">Export PDF</button><button className="px-3 py-2 bg-gray-100 rounded">Export Excel</button></div>
    </div>
  );
}

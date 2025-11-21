"use client";

import Link from "next/link";
import SummaryCards from "../../../../components/teacher/summary-cards";

export default function ClassReport(){
  const cards = [
    { title: 'Class Attendance Rate (%)', value: '92%' },
    { title: 'Average Class Score', value: '78%' },
    { title: 'Behavior Incidents Logged', value: 4 },
    { title: 'Total Students in Class', value: 32 }
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Class Report</h1>
        <div className="flex gap-2">
          <Link href="/teacher/reports/class/attendance" className="px-3 py-2 bg-gray-100 rounded">Attendance</Link>
          <Link href="/teacher/reports/class/academic" className="px-3 py-2 bg-gray-100 rounded">Academic</Link>
          <Link href="/teacher/reports/class/behavior" className="px-3 py-2 bg-gray-100 rounded">Behavior</Link>
        </div>
      </div>

      <SummaryCards cards={cards} />

      <div className="mt-6 bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Quick Notes</h3>
        <p className="text-sm text-gray-600">Use the subpages for detailed attendance, academic performance and behaviour exports.</p>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import SummaryCards from "../../../components/teacher/summary-cards";

export default function ReportsLanding(){
  const cards = [
    { title: 'Class Attendance Rate (%)', value: '92%' },
    { title: 'Average Class Score', value: '78%' },
    { title: 'Behavior Incidents', value: 4 },
    { title: 'Total Students', value: 32 }
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/teacher/reports/class" className="p-4 bg-white rounded shadow hover:shadow-md">Class Report</Link>
        <Link href="/teacher/reports/students" className="p-4 bg-white rounded shadow hover:shadow-md">Student Report</Link>
        <Link href="/teacher/reports/lesson-notes" className="p-4 bg-white rounded shadow hover:shadow-md">Lesson Note Status</Link>
      </div>
    </div>
  );
}

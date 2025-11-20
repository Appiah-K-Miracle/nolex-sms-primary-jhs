"use client";

import { useMemo } from "react";
import Link from "next/link";
import SummaryCards from "../../../../components/teacher/summary-cards";

type Student = {
  id: string;
  name: string;
  className: string;
  gender: string;
  parent: string;
  dob?: string;
  admissionNo?: string;
};

const mockStudent: Student = {
  id: 's1',
  name: 'Ama Osei',
  className: 'JHS 2',
  gender: 'Female',
  parent: 'Mr. Osei • 024xxxxxxx',
  dob: '2011-05-10',
  admissionNo: 'ADM-2020-001'
};

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  const s = mockStudent; // replace with fetch by params.id

  const totalStudents = 120; // context numbers (mock)
  const male = 58;
  const female = 62;
  const needingAttention = 6;

  const cards = [
    { title: 'Total Students', value: totalStudents },
    { title: 'Male Students', value: `${male} (${Math.round((male/Math.max(1,totalStudents))*100)}%)`, percent: Math.round((male/Math.max(1,totalStudents))*100) },
    { title: 'Female Students', value: `${female} (${Math.round((female/Math.max(1,totalStudents))*100)}%)`, percent: Math.round((female/Math.max(1,totalStudents))*100) },
    { title: 'Students Needing Attention', value: needingAttention }
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Student Profile</h1>
        <div className="flex gap-2">
          <Link href="/teacher/students" className="px-3 py-2 border rounded">Back to list</Link>
        </div>
      </div>

      <SummaryCards cards={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">{s.name.split(' ').map(p=>p[0]).join('')}</div>
            <div>
              <h2 className="text-xl font-semibold">{s.name}</h2>
              <div className="text-sm text-gray-500">{s.className} • {s.admissionNo}</div>
              <div className="text-sm mt-2">DOB: {s.dob} • Gender: {s.gender}</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Academic Summary</h3>
            <div className="w-full h-36 bg-gray-50 rounded flex items-center justify-center text-gray-400">Grades / performance charts placeholder</div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Attendance Summary</h3>
            <div className="w-full h-28 bg-gray-50 rounded flex items-center justify-center text-gray-400">Attendance chart placeholder</div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Behaviour History</h3>
            <div className="bg-white border rounded">
              <table className="w-full text-sm">
                <thead className="text-xs text-gray-500">
                  <tr>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2">2025-10-20</td>
                    <td className="p-2">Positive</td>
                    <td className="p-2">Helping others</td>
                    <td className="p-2">Helped classmates with exercise</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-2">Parent Contact</h3>
          <div className="text-sm">{s.parent}</div>

          <div className="mt-4">
            <h4 className="font-semibold">Quick Actions</h4>
            <div className="mt-2 flex flex-col gap-2">
              <Link href={`/teacher/students/attendance?class=${encodeURIComponent(s.className)}`} className="px-3 py-2 bg-blue-600 text-white rounded text-sm text-center">Mark Attendance</Link>
              <Link href={`/teacher/students/behaviour?student=${s.id}`} className="px-3 py-2 border rounded text-sm text-center">Add Behaviour</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

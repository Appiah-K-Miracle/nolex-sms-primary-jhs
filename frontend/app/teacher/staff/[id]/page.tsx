"use client";

import Link from "next/link";
import SummaryCards from "../../../../components/teacher/summary-cards";
import LineChart from "../../../../components/charts/line-chart";
import PieChart from "../../../../components/charts/pie-chart";

type Staff = { id: string; name: string; staffId: string; role: string; department: string; contact: string; dob?: string };

const mockStaff: Staff = { id: 'st1', name: 'Mrs. Akua Owusu', staffId: 'T-001', role: 'Teacher', department: 'Mathematics', contact: '024xxxxxxx', dob: '1985-03-12' };

export default function StaffProfile({ params }: { params: { id: string } }) {
  const s = mockStaff; // replace with fetch by params.id

  const total = 32; const teaching = 22; const nonTeaching = 10; const onLeave = 2;
  const cards = [
    { title: 'Total Staff', value: total },
    { title: 'Teaching Staff', value: `${teaching} Teachers` },
    { title: 'Non-Teaching Staff', value: `${nonTeaching} Staff Members` },
    { title: 'Staff on Leave Today', value: onLeave }
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Staff Profile</h1>
        <Link href="/teacher/staff/staff-list" className="px-3 py-2 border rounded">Back to list</Link>
      </div>

      <SummaryCards cards={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">{s.name.split(' ').map(p=>p[0]).join('')}</div>
            <div>
              <h2 className="text-xl font-semibold">{s.name}</h2>
              <div className="text-sm text-gray-500">{s.role} • {s.department}</div>
              <div className="text-sm mt-2">Staff ID: {s.staffId} • DOB: {s.dob}</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Attendance Summary</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
              <div className="lg:col-span-2 bg-gray-50 rounded p-2">
                <LineChart data={staffAttendanceTrend()} />
              </div>
              <div className="bg-gray-50 rounded p-2 text-center">
                <PieChart data={staffPresentAbsent()} size={140} />
                <div className="text-sm text-gray-600 mt-2">Present vs Absent (Month)</div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Leave History</h3>
            <div className="bg-white border rounded">
              <table className="w-full text-sm">
                <thead className="text-xs text-gray-500">
                  <tr>
                    <th className="p-2 text-left">From</th>
                    <th className="p-2">To</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2">2025-10-05</td>
                    <td className="p-2">2025-10-10</td>
                    <td className="p-2">Sick</td>
                    <td className="p-2">Approved</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-2">Contact</h3>
          <div className="text-sm">{s.contact}</div>

          <div className="mt-4">
            <h4 className="font-semibold">Quick Actions</h4>
            <div className="mt-2 flex flex-col gap-2">
              <Link href="/teacher/staff/attendance" className="px-3 py-2 bg-blue-600 text-white rounded text-sm text-center">View Attendance</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function staffAttendanceTrend(){
  // mock monthly percent for last 6 months
  return [98,97,96,98,95,97];
}

function staffPresentAbsent(){
  return [
    { label: 'Present', value: 420, color: '#34d399' },
    { label: 'Absent', value: 12, color: '#f87171' }
  ];
}

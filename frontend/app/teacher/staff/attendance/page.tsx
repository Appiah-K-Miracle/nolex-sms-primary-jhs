"use client";

import { useMemo, useState } from "react";
import SummaryCards from "../../../../components/teacher/summary-cards";

type Staff = { id: string; name: string; role: string; status?: 'Present'|'Absent'|'Late'|'Leave' };

const staffSeed: Staff[] = [
  { id: 'st1', name: 'Mrs. Akua Owusu', role: 'Teacher' },
  { id: 'st2', name: 'Mr. K. Boateng', role: 'Bursar' }
];

export default function StaffAttendancePage() {
  const [records, setRecords] = useState<Record<string,'Present'|'Absent'|'Late'|'Leave'>>({});

  function mark(id: string, status: 'Present'|'Absent'|'Late'|'Leave') {
    setRecords(prev => ({ ...prev, [id]: status }));
  }

  const present = Object.values(records).filter(s => s === 'Present').length;
  const absent = Object.values(records).filter(s => s === 'Absent').length;
  const late = Object.values(records).filter(s => s === 'Late').length;
  const monthlyRate = 94;

  const cards = [
    { title: 'Staff Present Today', value: `${present} Present` },
    { title: 'Staff Absent Today', value: `${absent} Absent` },
    { title: 'Staff Late Today', value: `${late} Late` },
    { title: 'Monthly Attendance Rate', value: `${monthlyRate}%`, percent: monthlyRate }
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Staff Attendance</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3 text-left">Staff</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {staffSeed.map(s => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{s.name}</td>
                <td className="p-3 text-center">{s.role}</td>
                <td className="p-3 text-center">{records[s.id] ?? '—'}</td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => mark(s.id, 'Present')} className="px-2 py-1 bg-green-600 text-white rounded text-xs">Present</button>
                    <button onClick={() => mark(s.id, 'Absent')} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Absent</button>
                    <button onClick={() => mark(s.id, 'Late')} className="px-2 py-1 bg-yellow-400 text-black rounded text-xs">Late</button>
                    <button onClick={() => mark(s.id, 'Leave')} className="px-2 py-1 bg-gray-300 text-black rounded text-xs">Leave</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

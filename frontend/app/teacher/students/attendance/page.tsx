"use client";

import { useMemo, useState } from "react";
import SummaryCards from "../../../../components/teacher/summary-cards";

type Student = { id: string; name: string; className: string; status?: 'Present' | 'Absent' | 'Late' };

const studentsSeed: Student[] = [
  { id: 's1', name: 'Ama Osei', className: 'JHS 2' },
  { id: 's2', name: 'Kofi Mensah', className: 'JHS 2' },
  { id: 's3', name: 'Esi Adjei', className: 'Primary 5A' }
];

export default function AttendancePage() {
  const [className, setClassName] = useState('JHS 2');
  const [records, setRecords] = useState<Record<string,'Present'|'Absent'|'Late'>>({});

  const classStudents = useMemo(() => studentsSeed.filter(s => s.className === className), [className]);

  function markAllPresent() {
    const next: Record<string,'Present'|'Absent'|'Late'> = {};
    classStudents.forEach(s => next[s.id] = 'Present');
    setRecords(next);
  }

  function toggleStatus(id: string, status: 'Present'|'Absent'|'Late') {
    setRecords(prev => ({ ...prev, [id]: status }));
  }

  const presentCount = classStudents.filter(s => records[s.id] === 'Present').length;
  const absentCount = classStudents.filter(s => records[s.id] === 'Absent').length;
  const lateCount = classStudents.filter(s => records[s.id] === 'Late').length;
  const todayAttendancePct = Math.round((presentCount / Math.max(1, classStudents.length)) * 100);

  const cards = [
    { title: "Today's Attendance", value: `${todayAttendancePct}%`, percent: todayAttendancePct },
    { title: 'Absent Students (Today)', value: absentCount },
    { title: 'Late Students (Today)', value: lateCount },
    { title: 'Average Monthly Attendance', value: '88%' }
  ];

  const classes = Array.from(new Set(studentsSeed.map(s => s.className)));

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Attendance</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="mb-4 flex gap-3 items-center">
        <label className="text-sm">Class</label>
        <select value={className} onChange={e => setClassName(e.target.value)} className="border rounded px-3 py-2">
          {classes.map(c => <option key={c}>{c}</option>)}
        </select>
        <button onClick={markAllPresent} className="px-3 py-2 bg-blue-600 text-white rounded">Present all</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {classStudents.map(s => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{s.name}</td>
                <td className="p-3 text-center">{records[s.id] ?? '—'}</td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => toggleStatus(s.id, 'Present')} className="px-2 py-1 bg-green-600 text-white rounded text-xs">Present</button>
                    <button onClick={() => toggleStatus(s.id, 'Absent')} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Absent</button>
                    <button onClick={() => toggleStatus(s.id, 'Late')} className="px-2 py-1 bg-yellow-400 text-black rounded text-xs">Late</button>
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

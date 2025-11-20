"use client";

import { useMemo, useState } from "react";
import SummaryCards from "../../../../components/teacher/summary-cards";

type BehaviourRecord = {
  id: string;
  student: string;
  className: string;
  type: 'Positive' | 'Warning' | 'Negative';
  category: string;
  notes: string;
  date: string;
};

const seed: BehaviourRecord[] = [
  { id: 'b1', student: 'Ama Osei', className: 'JHS 2', type: 'Positive', category: 'Helping', notes: 'Helped a classmate', date: '2025-10-20' },
  { id: 'b2', student: 'Kofi Mensah', className: 'JHS 2', type: 'Warning', category: 'Late', notes: 'Late to class', date: '2025-11-01' }
];

export default function BehaviourPage() {
  const [records, setRecords] = useState<BehaviourRecord[]>(seed);
  const [studentFilter, setStudentFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const students = Array.from(new Set(records.map(r => r.student)));

  const filtered = useMemo(() => records.filter(r => {
    if (studentFilter !== 'All' && r.student !== studentFilter) return false;
    if (typeFilter !== 'All' && r.type !== typeFilter) return false;
    return true;
  }), [records, studentFilter, typeFilter]);

  const total = records.length;
  const positive = records.filter(r => r.type === 'Positive').length;
  const negative = records.filter(r => r.type === 'Negative').length + records.filter(r => r.type === 'Warning').length;
  const repeated = 1; // mock

  const cards = [
    { title: 'Total Behaviour Records (This Term)', value: total },
    { title: 'Positive Records', value: `${positive} Positive` },
    { title: 'Negative/Warning Records', value: `${negative} Negative/Warning` },
    { title: 'Students with Repeated Incidents', value: repeated }
  ];

  function addRecord(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const rec: BehaviourRecord = {
      id: `b${records.length + 1}`,
      student: (data.get('student') as string) || 'Unknown',
      className: (data.get('class') as string) || 'Unknown',
      type: (data.get('type') as any) || 'Positive',
      category: (data.get('category') as string) || '',
      notes: (data.get('notes') as string) || '',
      date: new Date().toISOString().slice(0,10)
    };
    setRecords(prev => [rec, ...prev]);
    form.reset();
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Behaviour (Conduct)</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Add Behaviour Record</h3>
          <form onSubmit={addRecord} className="space-y-3">
            <div>
              <label className="text-sm">Student</label>
              <input name="student" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="text-sm">Class</label>
              <input name="class" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="text-sm">Type</label>
              <select name="type" className="w-full border rounded px-3 py-2">
                <option>Positive</option>
                <option>Warning</option>
                <option>Negative</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Category</label>
              <input name="category" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="text-sm">Description</label>
              <textarea name="notes" className="w-full border rounded px-3 py-2" rows={3} />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Record</button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Filters</h3>
          <div className="space-y-2">
            <select value={studentFilter} onChange={e=>setStudentFilter(e.target.value)} className="w-full border rounded px-3 py-2">
              <option>All</option>
              {students.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="w-full border rounded px-3 py-2">
              <option>All</option>
              <option>Positive</option>
              <option>Warning</option>
              <option>Negative</option>
            </select>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Behaviour History</h3>
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-500 bg-gray-50">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2">Student</th>
                <th className="p-2">Class</th>
                <th className="p-2">Type</th>
                <th className="p-2">Category</th>
                <th className="p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{r.date}</td>
                  <td className="p-2">{r.student}</td>
                  <td className="p-2 text-center">{r.className}</td>
                  <td className="p-2 text-center">{r.type}</td>
                  <td className="p-2">{r.category}</td>
                  <td className="p-2">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

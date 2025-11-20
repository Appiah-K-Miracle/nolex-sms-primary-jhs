"use client";

import { useState } from 'react';

const students = [
  { id: 1, name: 'Student 1' },
  { id: 2, name: 'Student 2' }
];

export default function EnterScores() {
  const [scores, setScores] = useState<{[k:number]: string}>({});

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold mb-4">Enter Exam Scores</h1>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="mb-4">Select Class / Subject / Exam (stub)</div>
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500">
            <tr>
              <th className="p-2 text-left">Student</th>
              <th className="p-2">Score</th>
              <th className="p-2">Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.name}</td>
                <td className="p-2 text-center"><input className="w-20 border rounded px-2 py-1" value={scores[s.id] || ''} onChange={e => setScores({...scores, [s.id]: e.target.value})} /></td>
                <td className="p-2 text-center">{scores[s.id] ? '—' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit Scores</button>
          <button className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";

type Row = { id: string; name: string; ca?: number; exam?: number };

export default function ScoreEntryTable({
  students,
  mode = 'single',
  onSave,
}: {
  students: Row[];
  mode?: 'single' | 'bulk';
  onSave?: (rows: Row[]) => void;
}) {
  const [rows, setRows] = useState<Row[]>(students);

  function updateScore(id: string, field: 'ca'|'exam', value: string) {
    setRows(r => r.map(x => x.id === id ? { ...x, [field]: value === '' ? undefined : Number(value) } : x));
  }

  return (
    <div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 bg-gray-50">
            <tr>
              <th className="p-2 text-left">Student</th>
              <th className="p-2">CA Score</th>
              <th className="p-2">Exam Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{r.name}</td>
                <td className="p-2 text-center">
                  <input value={r.ca ?? ''} onChange={(e)=>updateScore(r.id,'ca',e.target.value)} className="w-20 text-center border rounded px-2 py-1" />
                </td>
                <td className="p-2 text-center">
                  <input value={r.exam ?? ''} onChange={(e)=>updateScore(r.id,'exam',e.target.value)} className="w-20 text-center border rounded px-2 py-1" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={()=>onSave?.(rows)} className="px-3 py-2 bg-blue-600 text-white rounded">Save</button>
        <button onClick={()=>console.log('Export CSV', rows)} className="px-3 py-2 border rounded">Export CSV</button>
      </div>
    </div>
  );
}

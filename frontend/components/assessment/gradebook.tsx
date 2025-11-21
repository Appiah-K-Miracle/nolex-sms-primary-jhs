"use client";

import React from "react";

export default function Gradebook({
  rows,
  caWeight = 0.4,
  examWeight = 0.6,
}: {
  rows: { id: string; name: string; ca?: number; exam?: number }[];
  caWeight?: number;
  examWeight?: number;
}) {
  function finalScore(r: {ca?:number; exam?:number}){
    const ca = r.ca ?? 0;
    const ex = r.exam ?? 0;
    return Math.round(ca * caWeight + ex * examWeight);
  }

  function remark(score:number){
    if(score>=90) return 'Excellent';
    if(score>=75) return 'Very Good';
    if(score>=60) return 'Satisfactory';
    if(score>=50) return 'Needs Improvement';
    return 'Poor';
  }

  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead className="text-xs text-gray-500 bg-gray-50">
          <tr>
            <th className="p-2 text-left">Student</th>
            <th className="p-2 text-center">CA</th>
            <th className="p-2 text-center">Exam</th>
            <th className="p-2 text-center">Final</th>
            <th className="p-2">Remark</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => {
            const final = finalScore(r);
            return (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{r.name}</td>
                <td className="p-2 text-center">{r.ca ?? '—'}</td>
                <td className="p-2 text-center">{r.exam ?? '—'}</td>
                <td className="p-2 text-center font-semibold">{final}</td>
                <td className="p-2">{remark(final)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

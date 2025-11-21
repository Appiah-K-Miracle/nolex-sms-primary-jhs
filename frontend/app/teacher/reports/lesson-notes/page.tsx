"use client";

import React, { useMemo, useState } from "react";
import SummaryCards from "../../../../components/teacher/summary-cards";

type Note = { id:number; week:string; subject:string; topic:string; status: 'approved'|'pending'|'rejected'; comment?:string };

const sampleNotes: Note[] = [
  { id:1, week:'2025-W40', subject:'Math', topic:'Algebra', status:'approved' },
  { id:2, week:'2025-W41', subject:'Science', topic:'Plant Cells', status:'pending' },
  { id:3, week:'2025-W39', subject:'English', topic:'Poetry', status:'rejected', comment:'Needs more detail' }
];

export default function LessonNotes(){
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const totals = useMemo(()=>({ submitted: notes.length, approved: notes.filter(n=>n.status==='approved').length, pending: notes.filter(n=>n.status==='pending').length, rejected: notes.filter(n=>n.status==='rejected').length }), [notes]);

  const cards = [
    { title: 'Total Lesson Notes Submitted', value: totals.submitted },
    { title: 'Approved', value: totals.approved },
    { title: 'Pending Approval', value: totals.pending },
    { title: 'Rejected', value: totals.rejected }
  ];

  function setStatus(id:number, status: Note['status']){
    setNotes(ns => ns.map(n=> n.id===id ? { ...n, status } : n));
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Lesson Note Status</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="bg-white rounded shadow p-4 mt-4">
        <h3 className="font-semibold mb-3">Lesson Notes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500"><th>Week</th><th>Subject</th><th>Topic</th><th>Status</th><th>Comment</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {notes.map(n=> (
                <tr key={n.id} className="border-t">
                  <td className="py-2">{n.week}</td>
                  <td>{n.subject}</td>
                  <td>{n.topic}</td>
                  <td>
                    {n.status==='approved' && <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Approved</span>}
                    {n.status==='pending' && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Pending</span>}
                    {n.status==='rejected' && <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Rejected</span>}
                  </td>
                  <td>{n.comment ?? '-'}</td>
                  <td className="flex gap-2">
                    <button onClick={()=>setStatus(n.id,'approved')} className="px-2 py-1 bg-gray-100 rounded text-xs">Approve</button>
                    <button onClick={()=>setStatus(n.id,'rejected')} className="px-2 py-1 bg-gray-100 rounded text-xs">Reject</button>
                    <button className="px-2 py-1 bg-gray-100 rounded text-xs">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

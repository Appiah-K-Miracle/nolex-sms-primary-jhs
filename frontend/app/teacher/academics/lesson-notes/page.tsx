"use client";

import { useState } from 'react';
import { FileText } from 'lucide-react';
import SummaryCards from "../../../../components/teacher/summary-cards";

export default function LessonNotesPage() {
  const [notes, setNotes] = useState([{
    week: 1, subject: 'Mathematics', className: 'JHS 2', date: '2025-11-01', status: 'Pending', comments: ''
  }]);

  const submittedThisTerm = 42;
  const pendingApproval = 5;
  const approved = 37;
  const rejected = 0;

  const cards = [
    { title: 'Notes Submitted (This Term)', value: submittedThisTerm },
    { title: 'Notes Pending Approval', value: pendingApproval },
    { title: 'Approved Lesson Notes', value: approved },
    { title: 'Rejected / Needs Correction', value: rejected }
  ];

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold mb-4">Lesson Notes</h1>

      <SummaryCards cards={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <h2 className="font-semibold mb-3">Submit Lesson Note</h2>
          <form className="space-y-3">
            <div>
              <label className="text-sm">Class</label>
              <select className="w-full border rounded px-3 py-2">
                <option>JHS 2</option>
                <option>Primary 5A</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Subject</label>
              <select className="w-full border rounded px-3 py-2">
                <option>Mathematics</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Week Number</label>
              <input type="number" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="text-sm">Lesson Title</label>
              <input className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="text-sm">Objectives</label>
              <textarea className="w-full border rounded px-3 py-2" rows={3} />
            </div>
            <div>
              <label className="text-sm">Teaching Activities</label>
              <textarea className="w-full border rounded px-3 py-2" rows={3} />
            </div>
            <div>
              <label className="text-sm">File (optional)</label>
              <input type="file" className="w-full" />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
              <button type="button" className="px-4 py-2 border rounded">Save Draft</button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Lesson Note Status</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="pb-2">Week</th>
                <th className="pb-2">Subject</th>
                <th className="pb-2">Class</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((n, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2">{n.week}</td>
                  <td className="py-2">{n.subject}</td>
                  <td className="py-2">{n.className}</td>
                  <td className="py-2">{n.date}</td>
                  <td className="py-2">{n.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <h4 className="font-semibold">Analytics</h4>
            <div className="mt-2 w-full h-32 bg-gray-50 rounded flex items-center justify-center text-gray-400">Line chart placeholder</div>
            <div className="mt-3 w-full h-24 bg-gray-50 rounded flex items-center justify-center text-gray-400">Pie chart placeholder</div>
          </div>
        </div>
      </div>
    </div>
  );
}

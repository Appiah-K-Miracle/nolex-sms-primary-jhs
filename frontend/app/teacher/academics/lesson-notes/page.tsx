"use client";

import { useMemo, useState } from 'react';
import { FileText } from 'lucide-react';
import SummaryCards from "../../../../components/teacher/summary-cards";
import LineChart from "../../../../components/charts/line-chart";
import PieChart from "../../../../components/charts/pie-chart";
import BarChart from "../../../../components/charts/bar-chart";

export default function LessonNotesPage() {
  const [notes, setNotes] = useState([{
    week: 1, subject: 'Mathematics', className: 'JHS 2', date: '2025-11-01', status: 'Pending', comments: ''
  }]);

  const [range, setRange] = useState('7');

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

            <div className="mt-2">
              <label className="text-xs text-gray-500">Time range</label>
              <select className="w-full border rounded px-2 py-1 text-sm my-2" onChange={(e)=>setRange(e.target.value)} value={range}>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>

            <div className="mt-2">
              <div className="text-xs text-gray-500 mb-2">Submissions over time</div>
              <div className="h-32"><LineChart data={weeklyData(range)} /></div>
            </div>

            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-2">Status distribution</div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-24"><PieChart data={[{label:'Approved',value:approved},{label:'Pending',value:pendingApproval},{label:'Rejected',value:rejected}]} size={96} /></div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-2">Submissions by subject</div>
                  <div className="h-24"><BarChart data={submissionsBySubject()} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock analytic helpers
function weeklyData(range: string | number){
  const days = Number(range);
  // create simple trend: base + noise
  const base = 5;
  const arr: number[] = [];
  for(let i=0;i<Math.max(7, days);i++) arr.push(Math.max(0, Math.round(base + Math.sin(i/3)*2 + (i%3))));
  return arr.slice(-7);
}

function submissionsBySubject(){
  return [
    { label: 'Math', value: 12 },
    { label: 'English', value: 9 },
    { label: 'Science', value: 7 },
    { label: 'Social', value: 4 }
  ];
}

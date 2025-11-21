"use client";

import SummaryCards from "../../../../components/teacher/summary-cards";
import BarChart from "../../../../components/charts/bar-chart";
import PieChart from "../../../../components/charts/pie-chart";
import LineChart from "../../../../components/charts/line-chart";
import Gradebook from "../../../../components/assessment/gradebook";
import RemarksSuggestions from "../../../../components/assessment/remarks-suggestions";
import { useState } from "react";

export default function AssessmentExamsPage() {
  const examsAvailable = 3;
  const examsCompleted = 1;
  const totalStudents = 120;
  const subjectsAwaiting = 2;

  const cards = [
    { title: 'Exams Available to Score', value: examsAvailable },
    { title: 'Exams Completed', value: examsCompleted },
    { title: 'Total Students Registered', value: totalStudents },
    { title: 'Subjects Awaiting Submission', value: subjectsAwaiting }
  ];

  const [remarks, setRemarks] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [approved, setApproved] = useState(false);

  function handleSubmit() {
    if (typeof window !== 'undefined' && !window.confirm('Submit final grades for approval?')) return;
    setSubmitted(true);
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Examination Marks</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Exam Score Entry</h3>
          <div className="text-sm text-gray-600 mb-3">Select class → subject → exam type. Enter scores 0–100. Save draft / submit final.</div>
          <div>
            {/* Score entry table (exam scores) */}
            {/* reuse ScoreEntryTable but only exam column required */}
            <div className="mb-4">
              <div className="w-full">
                {/* simple inline table for mock scores */}
                <table className="w-full text-sm">
                  <thead className="text-xs text-gray-500 bg-gray-50">
                    <tr>
                      <th className="p-2 text-left">Student</th>
                      <th className="p-2 text-center">Score</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[{id:'s1',name:'Ama Osei'},{id:'s2',name:'Kofi Mensah'},{id:'s3',name:'Esi Adjei'}].map(s=> (
                      <tr key={s.id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{s.name}</td>
                        <td className="p-2 text-center"><input className="w-20 text-center border rounded px-2 py-1" /></td>
                        <td className="p-2"><button className="px-2 py-1 border rounded">Save</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Exam Gradebook</h3>
              {/* show combined exam gradebook (exam-only for now) */}
              <div className="w-full">
                <div className="w-full h-40">
                  <table className="w-full text-sm">
                    <thead className="text-xs text-gray-500 bg-gray-50">
                      <tr>
                        <th className="p-2 text-left">Student</th>
                        <th className="p-2 text-center">Exam</th>
                        <th className="p-2">Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t hover:bg-gray-50"><td className="p-2">Ama Osei</td><td className="p-2 text-center">88</td><td className="p-2">Very Good</td></tr>
                      <tr className="border-t hover:bg-gray-50"><td className="p-2">Kofi Mensah</td><td className="p-2 text-center">62</td><td className="p-2">Satisfactory</td></tr>
                      <tr className="border-t hover:bg-gray-50"><td className="p-2">Esi Adjei</td><td className="p-2 text-center">91</td><td className="p-2">Excellent</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Examination Performance Analytics</h3>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500 mb-2">Subject Performance Comparison</div>
              <div className="w-full h-36">
                <BarChart data={[{label:'Math', value:78},{label:'English', value:72},{label:'Science', value:69},{label:'ICT', value:82}]} />
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <div className="w-28">
                <div className="text-xs text-gray-500 mb-2">Grade Distribution</div>
                <PieChart data={[{label:'A', value:24, color:'#34d399'},{label:'B', value:40, color:'#60a5fa'},{label:'C', value:30, color:'#fbbf24'},{label:'D', value:6, color:'#f97316'}]} size={120} />
              </div>

              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-2">Trend (Previous → Current)</div>
                <div className="h-28">
                  <LineChart data={[72,75,78,77,80]} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <div>Pass rate: 78%</div>
            <div>Students at risk: 6</div>
          </div>
        </aside>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold mb-3">Report Card Preparation (Teacher)</h3>
        <div className="mb-3 text-sm text-gray-600">Combine Continuous Assessment (CA) and Exam scores into a final score. Review remarks then submit for approval.</div>

        <div>
          {/* Mock combined data: CA + Exam */}
          <Gradebook rows={combinedRows} caWeight={0.4} examWeight={0.6} />
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <label className="text-sm font-medium">Teacher Remarks (optional)</label>
            <textarea value={remarks} onChange={(e)=>setRemarks(e.target.value)} className="w-full border rounded p-2 mt-2" placeholder="Enter overall remarks for the class or specific notes..." />

            <div className="mt-3 flex items-center gap-2">
              <button onClick={handleSubmit} disabled={submitted} className={`px-3 py-2 rounded ${submitted ? 'bg-gray-300 text-gray-600' : 'bg-blue-600 text-white'}`}>
                {submitted ? 'Submitted for Approval' : 'Submit for Approval'}
              </button>

              {submitted && !approved && (
                <button onClick={()=>setApproved(true)} className="px-3 py-2 border rounded">Mark Approved (mock)</button>
              )}

              {approved && <div className="text-sm text-green-600 font-medium">Approved</div>}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Suggested Remarks</h4>
            <RemarksSuggestions score={Math.round(classAverage(combinedRows))} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock combined CA+Exam rows; in real app replace with server data
const combinedRows = [
  { id: 's1', name: 'Ama Osei', ca: 78, exam: 88 },
  { id: 's2', name: 'Kofi Mensah', ca: 62, exam: 62 },
  { id: 's3', name: 'Esi Adjei', ca: 91, exam: 91 },
];

function classAverage(rows:{ca?:number; exam?:number}[]){
  if(!rows.length) return 0;
  const avg = rows.reduce((s,r)=>s + ((r.ca ?? 0) * 0.4 + (r.exam ?? 0) * 0.6), 0) / rows.length;
  return avg;
}

 

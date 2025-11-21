"use client";

import SummaryCards from "../../../../components/teacher/summary-cards";
import { useState } from "react";
import ScoreEntryTable from "../../../../components/assessment/score-entry-table";
import Gradebook from "../../../../components/assessment/gradebook";
import RemarksSuggestions from "../../../../components/assessment/remarks-suggestions";
import BarChart from "../../../../components/charts/bar-chart";
import PieChart from "../../../../components/charts/pie-chart";
import LineChart from "../../../../components/charts/line-chart";

export default function AssessmentClassPage() {
  // Mock metrics
  const totalCA = 34;
  const pendingScores = 12;
  const completionRate = 84; // percent
  const todaysTasks = '3 assignments to grade';

  const cards = [
    { title: 'Total CA Activities Created', value: totalCA },
    { title: 'Pending Scores to Enter', value: pendingScores },
    { title: 'CA Completion Rate (%)', value: `${completionRate}%`, percent: completionRate },
    { title: "Today's Assessment Tasks", value: todaysTasks }
  ];

  const [mode, setMode] = useState<'single'|'bulk'>('single');

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Class Assessment (C.A)</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="mb-6 flex gap-3">
        <button onClick={() => setMode('single')} className={`px-3 py-2 rounded ${mode === 'single' ? 'bg-blue-600 text-white' : 'border'}`}>Single Entry</button>
        <button onClick={() => setMode('bulk')} className={`px-3 py-2 rounded ${mode === 'bulk' ? 'bg-blue-600 text-white' : 'border'}`}>Bulk Entry (Table)</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Continuous Assessment Entry</h3>
          <div className="mb-4 text-sm text-gray-600">CA Types: Assignment / Quiz / Class Test / Project / Homework</div>

          {mode === 'single' ? (
            <div className="space-y-3">
              <div>
                <ScoreEntryTable
                  students={[{id:'s1',name:'Ama Osei'},{id:'s2',name:'Kofi Mensah'},{id:'s3',name:'Esi Adjei'}]}
                  mode="single"
                  onSave={(rows)=>console.log('Saved CA rows',rows)}
                />
              </div>
            </div>
          ) : (
            <div>
              <ScoreEntryTable
                students={[{id:'s1',name:'Ama Osei'},{id:'s2',name:'Kofi Mensah'},{id:'s3',name:'Esi Adjei'}]}
                mode="bulk"
                onSave={(rows)=>console.log('Bulk saved',rows)}
              />
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Gradebook (CA Only)</h3>
            <Gradebook rows={[{id:'s1',name:'Ama Osei', ca: 78},{id:'s2',name:'Kofi Mensah',ca:62},{id:'s3',name:'Esi Adjei',ca:91}]} caWeight={1} examWeight={0} />
          </div>
        </div>

        <aside className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Class Performance Insights</h3>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500 mb-2">Subject Average Comparison</div>
              <div className="w-full h-28">
                <BarChart data={[{label:'Math',value:78},{label:'English',value:72},{label:'Science',value:69},{label:'ICT',value:82}]} />
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <div className="w-28">
                <div className="text-xs text-gray-500 mb-2">Grade Distribution</div>
                <PieChart data={[{label:'A',value:2,color:'#34d399'},{label:'B',value:5,color:'#60a5fa'},{label:'C',value:1,color:'#fbbf24'}]} size={120} />
              </div>

              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-2">Trend (Last 5)</div>
                <div className="h-20">
                  <LineChart data={[72,75,78,77,80]} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <div>Top performers: 3 students</div>
            <div>Students struggling: 5 students</div>
            <div>Completion rate: {completionRate}%</div>
          </div>
        </aside>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold mb-3">Remarks & Feedback</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <textarea placeholder="Enter remarks for class..." className="w-full h-28 border rounded p-2" />
            <div className="mt-2">
              <button className="px-3 py-2 bg-blue-600 text-white rounded">Save Remarks</button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Suggested Remarks</h4>
            <RemarksSuggestions score={75} />
          </div>
        </div>
      </div>
    </div>
  );
}

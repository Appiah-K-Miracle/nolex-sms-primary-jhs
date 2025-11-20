"use client";

import SummaryCards from "../../../../components/teacher/summary-cards";
import BarChart from "../../../../components/charts/bar-chart";
import PieChart from "../../../../components/charts/pie-chart";
import LineChart from "../../../../components/charts/line-chart";

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
          <div className="w-full h-48 bg-gray-50 rounded flex items-center justify-center text-gray-400">Score entry table placeholder</div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Exam Gradebook</h3>
            <div className="w-full h-40 bg-gray-50 rounded flex items-center justify-center text-gray-400">Combined exam gradebook placeholder</div>
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
        <div className="w-full h-28 bg-gray-50 rounded flex items-center justify-center text-gray-400">Combine CA + Exams → final score, remarks, submit for approval.</div>
      </div>
    </div>
  );
}

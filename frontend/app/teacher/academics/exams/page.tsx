"use client";

import Link from 'next/link';
import SummaryCards from "../../../../components/teacher/summary-cards";

const exams = [
  { id: 'e1', title: 'Math Mid-term', class: 'JHS 2', date: '2025-12-01', time: '10:00', type: 'Mid-term' }
];

export default function ExamsPage() {
  const upcoming = exams.length;
  const completed = 0; // mock
  const scoresEntered = 0; // mock
  const performanceAvg = 75; // mock percent

  const cards = [
    { title: 'Upcoming Exams', value: upcoming },
    { title: 'Exams Completed', value: completed },
    { title: 'Scores Entered', value: scoresEntered },
    { title: 'Performance Average', value: `${performanceAvg}%`, percent: performanceAvg }
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Exams</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Upcoming Exams</h3>
          <ul className="space-y-2">
            {exams.map(e => (
              <li key={e.id} className="p-3 border rounded flex items-center justify-between">
                <div>
                  <div className="font-medium">{e.title} • {e.class}</div>
                  <div className="text-xs text-gray-500">{e.date} • {e.time} • {e.type}</div>
                </div>
                <div className="flex gap-2">
                  <Link href="/teacher/academics/exams/enter-scores" className="px-3 py-2 bg-blue-600 text-white rounded">Enter Scores</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Uploaded Exam Questions</h3>
          <div className="text-sm text-gray-500">No uploaded papers yet.</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Performance Analytics</h3>
          <div className="w-full h-40 bg-gray-50 rounded flex items-center justify-center text-gray-400">Score distribution chart</div>
        </div>
      </div>
    </div>
  );
}

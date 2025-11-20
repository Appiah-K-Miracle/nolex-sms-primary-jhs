"use client";

import Link from "next/link";
import SummaryCards from "../../../../components/teacher/summary-cards";

const subjects = [
  { id: 'math', name: 'Mathematics', class: 'JHS 2', periods: 5 },
  { id: 'eng', name: 'English', class: 'Primary 5A', periods: 4 }
];

export default function SubjectsPage() {
  const totalSubjects = subjects.length;
  const submittedThisWeek = 12;
  const submittedThisTerm = 48;
  const performanceAvg = 78; // percent
  const materialsUploaded = 34;

  const cards = [
    { title: 'Total Subjects Assigned', value: totalSubjects },
    { title: 'Submitted Lesson Notes (This Week / Term)', value: `${submittedThisWeek} / ${submittedThisTerm}` },
    { title: 'Subject Performance Average', value: `${performanceAvg}%`, percent: performanceAvg },
    { title: 'Learning Materials Uploaded', value: materialsUploaded }
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Subjects</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjects.map(s => (
          <div key={s.id} className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-lg">{s.name}</h3>
            <p className="text-sm text-gray-600">Class: {s.class}</p>
            <p className="text-sm text-gray-600">Weekly periods: {s.periods}</p>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-2 bg-blue-600 text-white rounded text-sm">Upload Scheme</button>
              <Link href={`/teacher/academics/subjects/${s.id}`} className="px-3 py-2 border rounded text-sm">View Resources</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

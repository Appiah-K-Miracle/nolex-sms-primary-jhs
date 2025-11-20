"use client";

import Link from "next/link";
import { Users, Eye } from "lucide-react";
import SummaryCards from "../../../../components/teacher/summary-cards";

const classList = [
  { id: 'primary-5a', name: 'Primary 5A', students: 32, teacher: 'Mrs. Akua', subjects: ['Math', 'English'] },
  { id: 'jhs-2', name: 'JHS 2', students: 28, teacher: 'Mr. K. Ofori', subjects: ['Math','Science','ICT'] }
];

export default function ClassesPage() {
  const totalClasses = classList.length;
  const totalStudents = classList.reduce((s, c) => s + c.students, 0);
  const weeklyAttendanceAvg = 92; // mock percent
  const pendingTasks = '2 lesson notes pending | 3 assignments to grade';

  const cards = [
    { title: 'Total Classes Assigned', value: totalClasses },
    { title: 'Total Students Across All Classes', value: totalStudents },
    { title: 'Weekly Attendance Average', value: `${weeklyAttendanceAvg}%`, percent: weeklyAttendanceAvg },
    { title: 'Pending Class Tasks', value: pendingTasks }
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Classes</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {classList.map(c => (
          <div key={c.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="text-sm text-gray-600">{c.students} students • Teacher: {c.teacher}</p>
                <p className="text-sm text-gray-600 mt-2">Subjects: {c.subjects.join(', ')}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Link href={`/teacher/academics/classes/${c.id}`} className="px-3 py-2 bg-blue-600 text-white rounded">View Class</Link>
                <button className="text-sm text-gray-500">Details <Eye className="w-4 h-4 inline ml-1"/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

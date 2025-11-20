"use client";

import Link from 'next/link';
import SummaryCards from "../../../../components/teacher/summary-cards";

const assignments = [
  { id: 'a1', title: 'Algebra Worksheet', class: 'JHS 2', subject: 'Math', assigned: '2025-11-01', due: '2025-11-10', submissions: 20, status: 'Open' },
  { id: 'a2', title: 'Science Report', class: 'JHS 2', subject: 'Science', assigned: '2025-10-20', due: '2025-11-05', submissions: 28, status: 'Closed' }
];

export default function AssignmentsPage() {
  const totalAssignments = assignments.length;
  const pendingSubmissions = 8; // mock
  const pendingGrading = 3; // mock
  const completionRate = 82; // percent mock

  const cards = [
    { title: 'Total Assignments Given (This Term)', value: totalAssignments },
    { title: 'Pending Submissions', value: pendingSubmissions },
    { title: 'Assignments Pending Grading', value: pendingGrading },
    { title: 'Submission Completion Rate', value: `${completionRate}%`, percent: completionRate }
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <Link href="/teacher/academics/assignments/create" className="px-3 py-2 bg-blue-600 text-white rounded">Create Assignment</Link>
      </div>

      <SummaryCards cards={cards} />

      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Class</th>
              <th className="p-3">Assigned</th>
              <th className="p-3">Due</th>
              <th className="p-3">Submissions</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(a => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.title}</td>
                <td className="p-3 text-center">{a.class} • {a.subject}</td>
                <td className="p-3 text-center">{a.assigned}</td>
                <td className="p-3 text-center">{a.due}</td>
                <td className="p-3 text-center">{a.submissions}</td>
                <td className="p-3 text-center">{a.status}</td>
                <td className="p-3 text-center"><Link href={`/teacher/academics/assignments/${a.id}`} className="text-blue-600">View / Grade</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

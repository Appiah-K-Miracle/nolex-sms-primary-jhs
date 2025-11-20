"use client";

import { use } from 'react';
import Link from 'next/link';

interface Params { params: { id: string } }

function fetchSubject(id: string) {
  return {
    id,
    name: id === 'math' ? 'Mathematics' : 'English',
    outline: 'Course outline and syllabus goes here.',
    materials: [{ id: 1, title: 'Chapter 1 Notes' }],
    assignments: [{ id: 1, title: 'Algebra Worksheet', due: '2025-12-01' }]
  };
}

export default function SubjectDetails({ params }: Params) {
  const subject = fetchSubject(params.id);

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{subject.name}</h1>
          <p className="text-sm text-gray-600">{subject.outline}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Uploaded Materials</h3>
          <ul className="space-y-2 text-sm">
            {subject.materials.map(m => (
              <li key={m.id} className="p-2 border rounded">{m.title}</li>
            ))}
          </ul>

          <h3 className="font-semibold mt-6 mb-3">Assignments</h3>
          <ul className="space-y-2 text-sm">
            {subject.assignments.map(a => (
              <li key={a.id} className="p-2 border rounded flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs text-gray-500">Due: {a.due}</div>
                </div>
                <Link href="/teacher/academics/assignments" className="text-sm text-blue-600">View</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Performance Summary</h3>
          <div className="w-full h-40 bg-gray-50 rounded flex items-center justify-center text-gray-400">Chart placeholder</div>
        </div>
      </div>
    </div>
  );
}

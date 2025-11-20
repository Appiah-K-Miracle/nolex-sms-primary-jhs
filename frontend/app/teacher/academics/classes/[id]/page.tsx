"use client";

import { use } from 'react';
import Link from 'next/link';
import { Clock, FileText, Users } from 'lucide-react';

interface Params { params: { id: string } }

// simple fetch stub
function getClassData(id: string) {
  // sample
  return {
    id,
    name: id === 'jhs-2' ? 'JHS 2' : 'Primary 5A',
    size: id === 'jhs-2' ? 28 : 32,
    year: '2025/2026',
    students: Array.from({ length: id === 'jhs-2' ? 28 : 32 }).map((_, i) => ({ id: i+1, name: `Student ${i+1}`, grade: `${70 + (i%10)}%` }))
  };
}

export default function ClassDetails({ params }: Params) {
  const cls = getClassData(params.id);

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{cls.name}</h1>
          <p className="text-sm text-gray-600">Size: {cls.size} • Academic Year: {cls.year}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Take Attendance</button>
          <button className="px-3 py-2 bg-green-600 text-white rounded">Add Assignment</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="font-semibold mb-3">Students ({cls.size})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cls.students.slice(0,12).map(s => (
            <div key={s.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-gray-500">Performance snapshot: {s.grade}</p>
              </div>
              <div className="text-sm text-gray-600">Actions</div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/teacher/academics/classes" className="text-sm text-blue-600">Back to classes</Link>
        </div>
      </div>
    </div>
  );
}

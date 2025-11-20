"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AssignmentReview({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [score, setScore] = useState('');

  // sample data stub
  const assignment = { id: params.id, title: 'Algebra Worksheet', submissions: [{ student: 'Student 1', time: '2025-11-05', file: null } ] };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{assignment.title}</h1>
        <button onClick={() => router.back()} className="text-sm text-blue-600">Back</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold mb-3">Submissions</h3>
        {assignment.submissions.map((s, i) => (
          <div key={i} className="flex items-center justify-between p-2 border rounded mb-2">
            <div>
              <p className="font-medium">{s.student}</p>
              <p className="text-xs text-gray-500">{s.time}</p>
            </div>
            <div className="flex items-center gap-2">
              <input placeholder="Score" value={score} onChange={e => setScore(e.target.value)} className="border rounded px-2 py-1 w-20" />
              <button className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

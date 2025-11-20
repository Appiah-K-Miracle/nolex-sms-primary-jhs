"use client";

import { useState } from 'react';

export default function CreateAssignment() {
  const [title, setTitle] = useState('');

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold mb-4">Create Assignment</h1>
      <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
        <div className="space-y-3">
          <div>
            <label className="text-sm">Class</label>
            <select className="w-full border rounded px-3 py-2"><option>JHS 2</option></select>
          </div>
          <div>
            <label className="text-sm">Subject</label>
            <select className="w-full border rounded px-3 py-2"><option>Mathematics</option></select>
          </div>
          <div>
            <label className="text-sm">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="text-sm">Description</label>
            <textarea className="w-full border rounded px-3 py-2" rows={4} />
          </div>
          <div>
            <label className="text-sm">Due Date</label>
            <input type="date" className="w-full border rounded px-3 py-2" />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
            <button className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

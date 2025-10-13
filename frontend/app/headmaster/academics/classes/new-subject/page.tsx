"use client"

import { useState } from "react";

export default function NewSubjectPage() {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to create a new subject here
    console.log("New Subject:", { subjectName, subjectCode });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Subject</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="subjectName" className="block text-gray-700 font-bold mb-2">Subject Name</label>
            <input
              type="text"
              id="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subjectCode" className="block text-gray-700 font-bold mb-2">Subject Code</label>
            <input
              type="text"
              id="subjectCode"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
            Add Subject
          </button>
        </form>
      </div>
    </div>
  );
}

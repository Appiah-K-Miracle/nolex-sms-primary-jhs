"use client"

import { useState } from "react";

export default function NewClassPage() {
  const [className, setClassName] = useState("");
  const [classTeacher, setClassTeacher] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to create a new class here
    console.log("New Class:", { className, classTeacher });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Class</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="className" className="block text-gray-700 font-bold mb-2">Class Name</label>
            <input
              type="text"
              id="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="classTeacher" className="block text-gray-700 font-bold mb-2">Class Teacher</label>
            <input
              type="text"
              id="classTeacher"
              value={classTeacher}
              onChange={(e) => setClassTeacher(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
}

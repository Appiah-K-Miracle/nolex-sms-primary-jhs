"use client"

import { Plus } from "lucide-react";

const classes = [
  { id: 1, name: "Grade 1", teacher: "Mr. John Doe", subjects: 5 },
  { id: 2, name: "Grade 2", teacher: "Ms. Jane Smith", subjects: 5 },
  { id: 3, name: "Grade 3", teacher: "Mr. David Johnson", subjects: 6 },
  { id: 4, name: "Grade 4", teacher: "Ms. Emily Williams", subjects: 6 },
  { id: 5, name: "Grade 5", teacher: "Mr. Michael Brown", subjects: 7 },
];

export default function ClassesAndSubjectsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Classes & Subjects</h1>
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add New Class
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Class Name</th>
              <th className="px-4 py-2 text-left">Class Teacher</th>
              <th className="px-4 py-2 text-left">No. of Subjects</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.teacher}</td>
                <td className="px-4 py-2">{c.subjects}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:underline mr-4">View</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
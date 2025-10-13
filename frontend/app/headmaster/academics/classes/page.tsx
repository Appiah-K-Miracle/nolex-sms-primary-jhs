"use client"

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const classes = [
  { id: 1, name: "Grade 1", teacher: "Mr. John Doe", subjects: 5 },
  { id: 2, name: "Grade 2", teacher: "Ms. Jane Smith", subjects: 5 },
  { id: 3, name: "Grade 3", teacher: "Mr. David Johnson", subjects: 6 },
  { id: 4, name: "Grade 4", teacher: "Ms. Emily Williams", subjects: 6 },
  { id: 5, name: "Grade 5", teacher: "Mr. Michael Brown", subjects: 7 },
];

const subjects = [
  { id: 1, name: "Mathematics", code: "MATH101" },
  { id: 2, name: "English Language", code: "ENG101" },
  { id: 3, name: "Integrated Science", code: "SCI101" },
  { id: 4, name: "Social Studies", code: "SST101" },
  { id: 5, name: "Computing", code: "ICT101" },
  { id: 6, name: "Religious and Moral Education", code: "RME101" },
  { id: 7, name: "French", code: "FRE101" },
];

export default function ClassesAndSubjectsPage() {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    // Add your delete logic here
    console.log("Deleting:", selectedItem);
    setShowDeletePopup(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Classes & Subjects</h1>
        <Link href="/headmaster/academics/classes/new-class" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add New Class
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Classes</h2>
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
                  <Link href={`/headmaster/academics/classes/${c.id}`}>
                    <a className="text-blue-500 hover:underline mr-4">View</a>
                  </Link>
                  <button onClick={() => handleDeleteClick(c)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Subjects</h1>
        <Link href="/headmaster/academics/classes/new-subject" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add New Subject
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Subjects</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Subject Name</th>
              <th className="px-4 py-2 text-left">Subject Code</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.code}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDeleteClick(s)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete {selectedItem?.name}?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowDeletePopup(false)} className="text-gray-500 hover:underline mr-4">Cancel</button>
              <button onClick={confirmDelete} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

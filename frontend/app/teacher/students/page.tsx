"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SummaryCards from "../../../components/teacher/summary-cards";

type Student = {
  id: string;
  name: string;
  className: string;
  gender: "Male" | "Female";
  parent: string;
  photo?: string;
  performance?: number; // percent
};

const studentsSeed: Student[] = [
  { id: 's1', name: 'Ama Osei', className: 'JHS 2', gender: 'Female', parent: 'Mr. Osei • 024xxxxxxx', performance: 78 },
  { id: 's2', name: 'Kofi Mensah', className: 'JHS 2', gender: 'Male', parent: 'Mrs. Mensah • 020xxxxxxx', performance: 62 },
  { id: 's3', name: 'Esi Adjei', className: 'Primary 5A', gender: 'Female', parent: 'Mr. Adjei • 024yyyyyyy', performance: 91 }
];

export default function StudentsPage() {
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");

  const students = useMemo(() => studentsSeed, []);

  const filtered = useMemo(() => {
    return students.filter(s => {
      if (classFilter !== 'All' && s.className !== classFilter) return false;
      if (genderFilter !== 'All' && s.gender !== genderFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    });
  }, [students, query, classFilter, genderFilter]);

  const total = students.length;
  const male = students.filter(s => s.gender === 'Male').length;
  const female = students.filter(s => s.gender === 'Female').length;
  const needingAttention = students.filter(s => (s.performance ?? 100) < 65).length;

  const cards = [
    { title: 'Total Students', value: total },
    { title: 'Male Students', value: `${male} (${Math.round((male/Math.max(1,total))*100)}%)`, percent: Math.round((male/Math.max(1,total))*100) },
    { title: 'Female Students', value: `${female} (${Math.round((female/Math.max(1,total))*100)}%)`, percent: Math.round((female/Math.max(1,total))*100) },
    { title: 'Students Needing Attention', value: needingAttention }
  ];

  const classes = Array.from(new Set(students.map(s => s.className)));

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4 gap-3">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or ID" className="border rounded px-3 py-2 w-full md:w-1/3" />
        <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="border rounded px-3 py-2">
          <option>All</option>
          {classes.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} className="border rounded px-3 py-2">
          <option>All</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Parent Contact</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-3"><div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm">{s.name.split(' ').map(n=>n[0]).join('')}</div></td>
                <td className="p-3">{s.name}</td>
                <td className="p-3 text-center">{s.className}</td>
                <td className="p-3 text-center">{s.gender}</td>
                <td className="p-3 text-sm">{s.parent}</td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/teacher/students/${s.id}`} className="text-blue-600">View Profile</Link>
                    <Link href={`/teacher/students/attendance?class=${encodeURIComponent(s.className)}`} className="text-gray-600">Attendance</Link>
                    <Link href={`/teacher/students/behaviour?student=${s.id}`} className="text-gray-600">Behaviour</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const sections = [
  { id: 'classes', label: 'Classes', href: '/teacher/academics/classes' },
  { id: 'subjects', label: 'Subjects', href: '/teacher/academics/subjects' },
  { id: 'lesson-notes', label: 'Lesson Notes', href: '/teacher/academics/lesson-notes' },
  { id: 'timetable', label: 'Time-Table', href: '/teacher/academics/timetable' },
  { id: 'assignments', label: 'Assignment', href: '/teacher/academics/assignments' },
  { id: 'exams', label: 'Exams', href: '/teacher/academics/exams' }
];

export default function AcademicsIndex() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 lg:p-6 xl:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Academics</h1>
          <p className="text-sm text-gray-600">Select a subsection from the dropdown to manage academics.</p>
        </div>
        <div className="relative">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-4 py-2 bg-white border rounded shadow-sm">
            Sections
            <ChevronDown className="w-4 h-4" />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg">
              <ul className="p-2">
                {sections.map(s => (
                  <li key={s.id} className="mb-1">
                    <Link href={s.href} className="block px-3 py-2 rounded hover:bg-gray-50">{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map(s => (
          <Link key={s.id} href={s.href} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md">
            <h3 className="font-semibold text-gray-900 mb-2">{s.label}</h3>
            <p className="text-sm text-gray-600">Open the {s.label} management tools.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

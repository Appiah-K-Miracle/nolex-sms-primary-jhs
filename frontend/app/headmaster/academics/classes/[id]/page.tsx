"use client"

import { useParams } from "next/navigation";

const classes = [
  { id: 1, name: "Grade 1", teacher: "Mr. John Doe", subjects: 5 },
  { id: 2, name: "Grade 2", teacher: "Ms. Jane Smith", subjects: 5 },
  { id: 3, name: "Grade 3", teacher: "Mr. David Johnson", subjects: 6 },
  { id: 4, name: "Grade 4", teacher: "Ms. Emily Williams", subjects: 6 },
  { id: 5, name: "Grade 5", teacher: "Mr. Michael Brown", subjects: 7 },
];

export default function ViewClassPage() {
  const params = useParams();
  const { id } = params;

  const classId = typeof id === 'string' ? parseInt(id, 10) : NaN;
  const classData = classes.find((c) => c.id === classId);

  if (!classData) {
    return <div>Class not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{classData.name}</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">
          <span className="font-bold">Class Teacher:</span> {classData.teacher}
        </p>
        <p className="mb-4">
          <span className="font-bold">Number of Subjects:</span> {classData.subjects}
        </p>
      </div>
    </div>
  );
}

"use client"

import { useState } from "react";
import { 
  Calendar, 
  Users, 
  Search, 
  Filter, 
  Eye,
  Edit3,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

// Mock class data - same as in main attendance page
const classData = [
  { id: 1, name: "N1A", grade: "Nursery 1", total: 12, present: 11, absent: 1, late: 0 },
  { id: 2, name: "N1B", grade: "Nursery 1", total: 13, present: 13, absent: 0, late: 0 },
  { id: 3, name: "N2A", grade: "Nursery 2", total: 14, present: 13, absent: 1, late: 0 },
  { id: 4, name: "N2B", grade: "Nursery 2", total: 14, present: 14, absent: 0, late: 0 },
  { id: 5, name: "K1A", grade: "Kindergarten 1", total: 11, present: 10, absent: 1, late: 0 },
  { id: 6, name: "K1B", grade: "Kindergarten 1", total: 11, present: 11, absent: 0, late: 0 },
  { id: 7, name: "K1C", grade: "Kindergarten 1", total: 10, present: 10, absent: 0, late: 0 },
  { id: 8, name: "K2A", grade: "Kindergarten 2", total: 15, present: 14, absent: 0, late: 1 },
  { id: 9, name: "K2B", grade: "Kindergarten 2", total: 15, present: 15, absent: 0, late: 0 },
  { id: 10, name: "1A", grade: "Grade 1", total: 12, present: 11, absent: 1, late: 0 },
  { id: 11, name: "1B", grade: "Grade 1", total: 12, present: 11, absent: 1, late: 0 },
  { id: 12, name: "1C", grade: "Grade 1", total: 11, present: 11, absent: 0, late: 0 },
  { id: 13, name: "2A", grade: "Grade 2", total: 17, present: 16, absent: 1, late: 0 },
  { id: 14, name: "2B", grade: "Grade 2", total: 16, present: 16, absent: 0, late: 0 },
  { id: 15, name: "3A", grade: "Grade 3", total: 15, present: 14, absent: 1, late: 0 },
  { id: 16, name: "3B", grade: "Grade 3", total: 15, present: 15, absent: 0, late: 0 },
  { id: 17, name: "4A", grade: "Grade 4", total: 16, present: 14, absent: 1, late: 1 },
  { id: 18, name: "4B", grade: "Grade 4", total: 16, present: 15, absent: 1, late: 0 },
  { id: 19, name: "5A", grade: "Grade 5", total: 14, present: 13, absent: 1, late: 0 },
  { id: 20, name: "5B", grade: "Grade 5", total: 14, present: 14, absent: 0, late: 0 },
  { id: 21, name: "6A", grade: "Grade 6", total: 27, present: 26, absent: 0, late: 1 }
];

export default function QuickMarkAttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return "text-green-600 bg-green-100";
    if (rate >= 90) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const filteredClasses = classData.filter(cls => {
    const matchesGrade = selectedGrade === "all" || cls.grade === selectedGrade;
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cls.grade.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link
                  href="/headmaster/students/attendance"
                  className="text-indigo-100 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Calendar className="w-8 h-8" />
                  Quick Mark Attendance
                </h1>
              </div>
              <p className="text-indigo-100">Select a class to mark attendance</p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-sm font-medium">Today's Date</p>
              <p className="text-lg font-bold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Grades</option>
              <option value="Nursery 1">Nursery 1</option>
              <option value="Nursery 2">Nursery 2</option>
              <option value="Kindergarten 1">Kindergarten 1</option>
              <option value="Kindergarten 2">Kindergarten 2</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Class</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by class name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Class Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900">{classItem.name}</h4>
                <p className="text-sm text-gray-600">{classItem.grade}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{classItem.total}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="bg-green-100 p-2 rounded-lg mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                </div>
                <p className="text-sm font-medium text-gray-700">Present</p>
                <p className="text-lg font-bold text-green-600">{classItem.present}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-red-100 p-2 rounded-lg mb-2">
                  <XCircle className="w-6 h-6 text-red-600 mx-auto" />
                </div>
                <p className="text-sm font-medium text-gray-700">Absent</p>
                <p className="text-lg font-bold text-red-600">{classItem.absent}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-100 p-2 rounded-lg mb-2">
                  <Clock className="w-6 h-6 text-yellow-600 mx-auto" />
                </div>
                <p className="text-sm font-medium text-gray-700">Late</p>
                <p className="text-lg font-bold text-yellow-600">{classItem.late}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Attendance Rate</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor((classItem.present / classItem.total) * 100)}`}>
                {Math.round((classItem.present / classItem.total) * 100)}%
              </span>
            </div>
            
            <div className="flex gap-2">
              <Link
                href={`/headmaster/students/attendance/mark/${classItem.id}`}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Mark Attendance
              </Link>
              <Link
                href={`/headmaster/students/attendance/view/${classItem.id}`}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
              >
                <Eye className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
}
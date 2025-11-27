"use client";

import { useState } from "react";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  GraduationCap,
  FileText,
  BarChart3,
  Star,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Activity,
  ChevronRight,
  Download,
  Share
} from "lucide-react";
import Link from "next/link";

// Mock data for teacher's classes
const teacherClasses = [
  {
    id: 1,
    name: "Mathematics - Class 6A",
    subject: "Mathematics",
    grade: "Class 6A",
    students: 28,
    present: 26,
    absent: 2,
    room: "Room 101",
    schedule: [
      { day: "Monday", time: "9:00 AM - 10:00 AM" },
      { day: "Wednesday", time: "9:00 AM - 10:00 AM" },
      { day: "Friday", time: "9:00 AM - 10:00 AM" }
    ],
    averageGrade: 78.5,
    pendingAssignments: 3,
    completedLessons: 15,
    totalLessons: 20,
    performance: "good",
    lastActivity: "2 hours ago",
    status: "active"
  },
  {
    id: 2,
    name: "Mathematics - Class 6B",
    subject: "Mathematics",
    grade: "Class 6B",
    students: 30,
    present: 28,
    absent: 2,
    room: "Room 101",
    schedule: [
      { day: "Tuesday", time: "10:30 AM - 11:30 AM" },
      { day: "Thursday", time: "10:30 AM - 11:30 AM" },
      { day: "Saturday", time: "8:00 AM - 9:00 AM" }
    ],
    averageGrade: 82.3,
    pendingAssignments: 2,
    completedLessons: 16,
    totalLessons: 20,
    performance: "excellent",
    lastActivity: "4 hours ago",
    status: "active"
  },
  {
    id: 3,
    name: "Mathematics - Class 5A",
    subject: "Mathematics",
    grade: "Class 5A",
    students: 25,
    present: 23,
    absent: 2,
    room: "Room 102",
    schedule: [
      { day: "Monday", time: "2:00 PM - 3:00 PM" },
      { day: "Wednesday", time: "2:00 PM - 3:00 PM" },
      { day: "Friday", time: "11:00 AM - 12:00 PM" }
    ],
    averageGrade: 75.8,
    pendingAssignments: 4,
    completedLessons: 12,
    totalLessons: 18,
    performance: "average",
    lastActivity: "1 day ago",
    status: "active"
  },
  {
    id: 4,
    name: "Mathematics - Class 5B",
    subject: "Mathematics",
    grade: "Class 5B",
    students: 27,
    present: 25,
    absent: 2,
    room: "Room 102",
    schedule: [
      { day: "Tuesday", time: "2:00 PM - 3:00 PM" },
      { day: "Thursday", time: "2:00 PM - 3:00 PM" },
      { day: "Saturday", time: "9:30 AM - 10:30 AM" }
    ],
    averageGrade: 80.1,
    pendingAssignments: 1,
    completedLessons: 14,
    totalLessons: 18,
    performance: "good",
    lastActivity: "6 hours ago",
    status: "active"
  },
  {
    id: 5,
    name: "Mathematics - Class 4A",
    subject: "Mathematics",
    grade: "Class 4A",
    students: 22,
    present: 22,
    absent: 0,
    room: "Room 103",
    schedule: [
      { day: "Monday", time: "11:00 AM - 12:00 PM" },
      { day: "Thursday", time: "11:00 AM - 12:00 PM" }
    ],
    averageGrade: 85.2,
    pendingAssignments: 2,
    completedLessons: 10,
    totalLessons: 15,
    performance: "excellent",
    lastActivity: "3 hours ago",
    status: "active"
  }
];

const getPerformanceColor = (performance: string) => {
  switch (performance) {
    case "excellent":
      return "text-green-600 bg-green-100";
    case "good":
      return "text-blue-600 bg-blue-100";
    case "average":
      return "text-yellow-600 bg-yellow-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const getPerformanceIcon = (performance: string) => {
  switch (performance) {
    case "excellent":
      return <TrendingUp className="h-4 w-4" />;
    case "good":
      return <Target className="h-4 w-4" />;
    case "average":
      return <Activity className="h-4 w-4" />;
    default:
      return <TrendingDown className="h-4 w-4" />;
  }
};

export default function TeacherClasses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const filteredClasses = teacherClasses.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === "all" || cls.performance === filterBy;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-600">Manage your assigned classes and track student progress</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="h-4 w-4" />
            New Class
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Classes</p>
              <p className="text-3xl font-bold text-gray-900">{teacherClasses.length}</p>
              <p className="text-sm text-green-600 mt-1">All active</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">
                {teacherClasses.reduce((sum, cls) => sum + cls.students, 0)}
              </p>
              <p className="text-sm text-blue-600 mt-1">Across all classes</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
              <p className="text-3xl font-bold text-gray-900">
                {(teacherClasses.reduce((sum, cls) => sum + cls.averageGrade, 0) / teacherClasses.length).toFixed(1)}%
              </p>
              <p className="text-sm text-green-600 mt-1">+2.3% from last month</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <GraduationCap className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Work</p>
              <p className="text-3xl font-bold text-gray-900">
                {teacherClasses.reduce((sum, cls) => sum + cls.pendingAssignments, 0)}
              </p>
              <p className="text-sm text-orange-600 mt-1">Assignments to grade</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-xl">
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-full sm:w-64"
              />
            </div>

            {/* Filter */}
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">All Performance</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-orange-100 text-orange-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <BarChart3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === "list" ? "bg-orange-100 text-orange-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Classes Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClasses.map((classData) => (
            <div key={classData.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {classData.grade}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{classData.subject}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {classData.students} students
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {classData.room}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Performance Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(classData.performance)}`}>
                    {getPerformanceIcon(classData.performance)}
                    {classData.performance.charAt(0).toUpperCase() + classData.performance.slice(1)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Updated {classData.lastActivity}
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Grade</span>
                    <span className="text-sm font-semibold text-gray-900">{classData.averageGrade}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Attendance Today</span>
                    <span className="text-sm font-semibold text-green-600">
                      {classData.present}/{classData.students}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Lesson Progress</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {classData.completedLessons}/{classData.totalLessons}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(classData.completedLessons / classData.totalLessons) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/teacher/classes/${classData.id}`}
                    className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-700 py-2 px-3 rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Link>
                  <Link
                    href={`/teacher/attendance?class=${classData.id}`}
                    className="bg-green-50 hover:bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <UserCheck className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/teacher/grades?class=${classData.id}`}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <GraduationCap className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pending
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClasses.map((classData) => (
                  <tr key={classData.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-orange-100 p-2 rounded-lg mr-3">
                          <BookOpen className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {classData.grade}
                          </div>
                          <div className="text-sm text-gray-500">
                            {classData.room}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{classData.students}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {classData.present}/{classData.students}
                      </div>
                      <div className="text-sm text-gray-500">
                        {((classData.present / classData.students) * 100).toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{classData.averageGrade}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(classData.performance)}`}>
                        {getPerformanceIcon(classData.performance)}
                        {classData.performance.charAt(0).toUpperCase() + classData.performance.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{classData.pendingAssignments}</div>
                      <div className="text-sm text-gray-500">assignments</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/teacher/classes/${classData.id}`}
                          className="text-orange-600 hover:text-orange-900 p-2 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/teacher/attendance?class=${classData.id}`}
                          className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <UserCheck className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/teacher/grades?class=${classData.id}`}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <GraduationCap className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/teacher/attendance/quick"
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl p-6 text-white transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Take Attendance</h3>
              <p className="text-green-100 text-sm">Mark today's attendance for all classes</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-200" />
          </div>
        </Link>

        <Link
          href="/teacher/grades/pending"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl p-6 text-white transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Grade Assignments</h3>
              <p className="text-blue-100 text-sm">
                {teacherClasses.reduce((sum, cls) => sum + cls.pendingAssignments, 0)} pending submissions
              </p>
            </div>
            <GraduationCap className="h-8 w-8 text-blue-200" />
          </div>
        </Link>

        <Link
          href="/teacher/reports/class"
          className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 rounded-xl p-6 text-white transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Generate Reports</h3>
              <p className="text-purple-100 text-sm">Class performance and progress reports</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-200" />
          </div>
        </Link>
      </div>
    </div>
  );
}
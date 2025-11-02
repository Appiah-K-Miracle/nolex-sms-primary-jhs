"use client"

import { useState } from "react";
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Filter, 
  Search, 
  Download, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Edit3,
  UserCheck,
  UserX,
  Target,
  Info,
  FileText,
  Activity,
  CalendarDays,
  PieChart,
  ChevronDown,
  ChevronRight,
  BookOpen,
  School,
  Home,
  Phone,
  Mail,
  User,
  Award,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

// Mock attendance data
const attendanceData = {
  todayStats: {
    totalStudents: 245,
    present: 234,
    absent: 8,
    late: 3,
    attendanceRate: 95.5
  },
  
  weeklyStats: {
    monday: { present: 238, absent: 7, late: 0, rate: 97.1 },
    tuesday: { present: 235, absent: 8, late: 2, rate: 95.9 },
    wednesday: { present: 240, absent: 4, late: 1, rate: 98.0 },
    thursday: { present: 234, absent: 8, late: 3, rate: 95.5 },
    friday: { present: 242, absent: 3, late: 0, rate: 98.8 }
  },
  
  gradeStats: [
    { grade: "Nursery 1", total: 25, present: 24, absent: 1, late: 0, rate: 96.0 },
    { grade: "Nursery 2", total: 28, present: 27, absent: 1, late: 0, rate: 96.4 },
    { grade: "Kindergarten 1", total: 32, present: 31, absent: 1, late: 0, rate: 96.9 },
    { grade: "Kindergarten 2", total: 30, present: 29, absent: 0, late: 1, rate: 96.7 },
    { grade: "Grade 1", total: 35, present: 33, absent: 2, late: 0, rate: 94.3 },
    { grade: "Grade 2", total: 33, present: 32, absent: 1, late: 0, rate: 97.0 },
    { grade: "Grade 3", total: 30, present: 29, absent: 1, late: 0, rate: 96.7 },
    { grade: "Grade 4", total: 32, present: 29, absent: 2, late: 1, rate: 90.6 },
    { grade: "Grade 5", total: 28, present: 27, absent: 1, late: 0, rate: 96.4 },
    { grade: "Grade 6", total: 27, present: 26, absent: 0, late: 1, rate: 96.3 }
  ],
  
  recentAbsences: [
    {
      id: 1,
      studentId: "NLX2024GRADE51234",
      name: "Kwame Asante",
      grade: "Grade 5",
      class: "5A",
      date: "2024-10-30",
      status: "Absent",
      reason: "Sick",
      excused: true,
      parent: "Kofi Asante",
      contact: "+233 24 123 4567"
    },
    {
      id: 2,
      studentId: "NLX2024GRADE42567",
      name: "Akosua Mensah",
      grade: "Grade 4",
      class: "4B",
      date: "2024-10-30",
      status: "Late",
      reason: "Transportation delay",
      excused: true,
      parent: "Yaw Mensah",
      contact: "+233 24 567 8901"
    },
    {
      id: 3,
      studentId: "NLX2024GRADE31890",
      name: "Ama Osei",
      grade: "Grade 3",
      class: "3A",
      date: "2024-10-29",
      status: "Absent",
      reason: "Family emergency",
      excused: true,
      parent: "Kwaku Osei",
      contact: "+233 24 345 6789"
    }
  ],
  
  monthlyTrends: [
    { month: "September", rate: 96.2 },
    { month: "October", rate: 95.8 },
    { month: "November", rate: 97.1 }
  ]
};

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

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "mark", label: "Mark Attendance", icon: UserCheck },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "trends", label: "Analytics", icon: TrendingUp }
  ];

  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return "text-green-600 bg-green-100";
    if (rate >= 90) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800";
      case "Absent": return "bg-red-100 text-red-800";
      case "Late": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredClasses = classData.filter(cls => 
    selectedGrade === "all" || cls.grade === selectedGrade
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Calendar className="w-8 h-8" />
                Student Attendance
              </h1>
              <p className="text-indigo-100 mt-1">Track and manage student attendance records</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium">Today's Date</p>
                <p className="text-lg font-bold">{new Date().toLocaleDateString()}</p>
              </div>
              <Link
                href="/headmaster/students/attendance/mark"
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <UserCheck className="w-5 h-5" />
                Quick Mark
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{attendanceData.todayStats.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-gray-900">{attendanceData.todayStats.present}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Absent Today</p>
              <p className="text-2xl font-bold text-gray-900">{attendanceData.todayStats.absent}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Late Today</p>
              <p className="text-2xl font-bold text-gray-900">{attendanceData.todayStats.late}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-gray-900">{attendanceData.todayStats.attendanceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Weekly Attendance Overview */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CalendarDays className="w-6 h-6 text-blue-600" />
                  Weekly Attendance Overview
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {Object.entries(attendanceData.weeklyStats).map(([day, stats]) => (
                    <div key={day} className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 capitalize">{day}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Present:</span>
                          <span className="text-green-600 font-medium">{stats.present}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Absent:</span>
                          <span className="text-red-600 font-medium">{stats.absent}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Late:</span>
                          <span className="text-yellow-600 font-medium">{stats.late}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <span className={`text-sm font-semibold px-2 py-1 rounded-full ${getAttendanceColor(stats.rate)}`}>
                            {stats.rate}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grade-wise Attendance */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <School className="w-6 h-6 text-green-600" />
                  Grade-wise Attendance (Today)
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Grade</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Total</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Present</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Absent</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Late</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Rate</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.gradeStats.map((grade, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{grade.grade}</td>
                          <td className="py-3 px-4">{grade.total}</td>
                          <td className="py-3 px-4">
                            <span className="text-green-600 font-medium">{grade.present}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-red-600 font-medium">{grade.absent}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-yellow-600 font-medium">{grade.late}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getAttendanceColor(grade.rate)}`}>
                              {grade.rate}%
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Link
                              href={`/headmaster/students/attendance/view/grade/${grade.grade.toLowerCase().replace(' ', '-')}`}
                              className="text-indigo-600 hover:text-indigo-800"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Absences */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  Recent Absences & Late Arrivals
                </h3>
                
                <div className="space-y-4">
                  {attendanceData.recentAbsences.map((record) => (
                    <div key={record.id} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{record.name}</h4>
                            <p className="text-sm text-gray-600">{record.grade} - {record.class} • ID: {record.studentId}</p>
                            <p className="text-sm text-gray-600">Parent: {record.parent} • {record.contact}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">{record.date}</p>
                          <p className="text-sm text-gray-600">Reason: {record.reason}</p>
                          {record.excused && (
                            <p className="text-xs text-green-600 mt-1">✓ Excused</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "mark" && (
            <div className="space-y-8">
              {/* Date and Filter Selection */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                  Mark Attendance
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

              {/* Class Attendance Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses
                  .filter(cls => cls.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((classItem) => (
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
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Attendance Rate</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor((classItem.present / classItem.total) * 100)}`}>
                        {Math.round((classItem.present / classItem.total) * 100)}%
                      </span>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
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
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-8">
              {/* Report Filters */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-green-600" />
                  Attendance Reports
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option>Daily Report</option>
                      <option>Weekly Report</option>
                      <option>Monthly Report</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Class</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option>All Classes</option>
                      <option>Nursery Classes</option>
                      <option>Kindergarten Classes</option>
                      <option>Primary Classes</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Generate Report
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Export PDF
                  </button>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Export Excel
                  </button>
                </div>
              </div>

              {/* Sample Report Preview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Daily Attendance Report - {new Date().toLocaleDateString()}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Overall Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Students:</span>
                        <span className="font-medium">{attendanceData.todayStats.totalStudents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Present:</span>
                        <span className="text-green-600 font-medium">{attendanceData.todayStats.present}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Absent:</span>
                        <span className="text-red-600 font-medium">{attendanceData.todayStats.absent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Late:</span>
                        <span className="text-yellow-600 font-medium">{attendanceData.todayStats.late}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span>Attendance Rate:</span>
                        <span className="font-bold text-green-600">{attendanceData.todayStats.attendanceRate}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Best Performing Grades</h4>
                    <div className="space-y-2 text-sm">
                      {attendanceData.gradeStats
                        .sort((a, b) => b.rate - a.rate)
                        .slice(0, 5)
                        .map((grade, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{grade.grade}:</span>
                          <span className="font-medium text-blue-600">{grade.rate}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Alerts & Notifications</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span>3 students with poor attendance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        <span>2 pending parent notifications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Overall attendance above target</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Detailed Grade Breakdown */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Grade</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Enrolled</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Present</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Absent</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Late</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Rate</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.gradeStats.map((grade, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium">{grade.grade}</td>
                          <td className="py-3 px-4">{grade.total}</td>
                          <td className="py-3 px-4 text-green-600">{grade.present}</td>
                          <td className="py-3 px-4 text-red-600">{grade.absent}</td>
                          <td className="py-3 px-4 text-yellow-600">{grade.late}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getAttendanceColor(grade.rate)}`}>
                              {grade.rate}%
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {grade.rate >= 95 ? (
                              <span className="text-green-600 font-medium">Excellent</span>
                            ) : grade.rate >= 90 ? (
                              <span className="text-yellow-600 font-medium">Good</span>
                            ) : (
                              <span className="text-red-600 font-medium">Needs Attention</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "trends" && (
            <div className="space-y-8">
              {/* Monthly Trends */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  Monthly Attendance Trends
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {attendanceData.monthlyTrends.map((month, index) => (
                    <div key={index} className="bg-white rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{month.month}</h4>
                        <div className="flex items-center gap-1">
                          {month.rate > 96 ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${month.rate > 96 ? 'text-green-600' : 'text-red-600'}`}>
                            {month.rate > 96 ? '+0.9%' : '-0.4%'}
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">{month.rate}%</div>
                        <p className="text-sm text-gray-600">Average Attendance</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <PieChart className="w-6 h-6 text-blue-600" />
                    Grade Performance Analysis
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
                      <span className="font-medium text-green-800">Excellent (95%+)</span>
                      <span className="text-green-900 font-bold">
                        {attendanceData.gradeStats.filter(g => g.rate >= 95).length} grades
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg">
                      <span className="font-medium text-yellow-800">Good (90-94%)</span>
                      <span className="text-yellow-900 font-bold">
                        {attendanceData.gradeStats.filter(g => g.rate >= 90 && g.rate < 95).length} grades
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                      <span className="font-medium text-red-800">Needs Attention (below 90%)</span>
                      <span className="text-red-900 font-bold">
                        {attendanceData.gradeStats.filter(g => g.rate < 90).length} grades
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-orange-600" />
                    Key Insights
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-900">Best Performing Grade</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {attendanceData.gradeStats.reduce((best, current) => 
                          current.rate > best.rate ? current : best
                        ).grade} with {attendanceData.gradeStats.reduce((best, current) => 
                          current.rate > best.rate ? current : best
                        ).rate}% attendance
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-gray-900">Attention Required</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {attendanceData.gradeStats.filter(g => g.rate < 90).length === 0 
                          ? "All grades meeting attendance targets" 
                          : `${attendanceData.gradeStats.filter(g => g.rate < 90).length} grade(s) below 90% attendance`
                        }
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">Overall Target</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        School target: 95% | Current: {attendanceData.todayStats.attendanceRate}%
                        <span className={`ml-2 ${attendanceData.todayStats.attendanceRate >= 95 ? 'text-green-600' : 'text-red-600'}`}>
                          ({attendanceData.todayStats.attendanceRate >= 95 ? 'Target Met' : 'Below Target'})
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
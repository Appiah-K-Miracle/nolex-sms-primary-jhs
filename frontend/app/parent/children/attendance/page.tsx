"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Filter,
  Download,
  Eye,
  User,
  CalendarDays,
  FileText,
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search
} from "lucide-react";

export default function ChildrenAttendancePage() {
  const [selectedChild, setSelectedChild] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("2025-11");
  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview");
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample attendance data
  const children = [
    {
      id: "1",
      name: "Kwame Mensah",
      class: "Primary 6A",
      photo: "/avatars/student1.jpg",
      attendance: {
        totalDays: 22,
        present: 20,
        absent: 2,
        late: 1,
        excused: 1,
        percentage: 91,
        streak: 5,
        lastAbsent: "2025-11-15"
      }
    },
    {
      id: "2", 
      name: "Ama Mensah",
      class: "Primary 4B",
      photo: "/avatars/student2.jpg",
      attendance: {
        totalDays: 22,
        present: 21,
        absent: 1,
        late: 0,
        excused: 0,
        percentage: 95,
        streak: 12,
        lastAbsent: "2025-10-28"
      }
    }
  ];

  const recentAttendance = [
    { date: "2025-11-18", child: "Kwame Mensah", status: "present", time: "07:45", notes: "" },
    { date: "2025-11-18", child: "Ama Mensah", status: "present", time: "07:30", notes: "" },
    { date: "2025-11-17", child: "Kwame Mensah", status: "present", time: "07:50", notes: "" },
    { date: "2025-11-17", child: "Ama Mensah", status: "present", time: "07:35", notes: "" },
    { date: "2025-11-16", child: "Kwame Mensah", status: "late", time: "08:15", notes: "Traffic delay" },
    { date: "2025-11-16", child: "Ama Mensah", status: "present", time: "07:28", notes: "" },
    { date: "2025-11-15", child: "Kwame Mensah", status: "absent", time: "-", notes: "Sick leave" },
    { date: "2025-11-15", child: "Ama Mensah", status: "present", time: "07:32", notes: "" }
  ];

  const monthlyStats = {
    totalSchoolDays: 22,
    totalPresent: 41,
    totalAbsent: 3,
    totalLate: 1,
    averageAttendance: 93,
    bestStreak: 12,
    concerningTrends: 0
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "absent":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "late":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "excused":
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "text-green-700 bg-green-50 border-green-200";
      case "absent":
        return "text-red-700 bg-red-50 border-red-200";
      case "late":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "excused":
        return "text-blue-700 bg-blue-50 border-blue-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getAttendanceGrade = (percentage: number) => {
    if (percentage >= 95) return { grade: "Excellent", color: "text-green-600" };
    if (percentage >= 90) return { grade: "Good", color: "text-blue-600" };
    if (percentage >= 85) return { grade: "Satisfactory", color: "text-yellow-600" };
    if (percentage >= 80) return { grade: "Needs Improvement", color: "text-orange-600" };
    return { grade: "Poor", color: "text-red-600" };
  };

  const filteredAttendance = selectedChild === "all" 
    ? recentAttendance 
    : recentAttendance.filter(record => {
        const child = children.find(c => c.name === record.child);
        return child?.id === selectedChild;
      });

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">Children's Attendance</h1>
            <p className="text-blue-100 text-sm lg:text-base xl:text-lg">
              Track daily attendance, punctuality, and patterns
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Children</option>
                {children.map(child => (
                  <option key={child.id} value={child.id}>{child.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="2025-11">November 2025</option>
                <option value="2025-10">October 2025</option>
                <option value="2025-09">September 2025</option>
                <option value="2025-08">August 2025</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
              <div className="flex rounded-lg border border-gray-300">
                <button
                  onClick={() => setViewMode("overview")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                    viewMode === "overview" 
                      ? "bg-blue-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setViewMode("detailed")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                    viewMode === "detailed" 
                      ? "bg-blue-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Detailed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total School Days</p>
              <p className="text-2xl font-bold text-gray-900">{monthlyStats.totalSchoolDays}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <CalendarDays className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present Days</p>
              <p className="text-2xl font-bold text-green-600">{monthlyStats.totalPresent}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Attendance</p>
              <p className="text-2xl font-bold text-blue-600">{monthlyStats.averageAttendance}%</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Best Streak</p>
              <p className="text-2xl font-bold text-purple-600">{monthlyStats.bestStreak} days</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Children Attendance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {children.map((child) => {
          const attendanceGrade = getAttendanceGrade(child.attendance.percentage);
          
          return (
            <div key={child.id} className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg lg:text-xl">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900">{child.name}</h3>
                    <p className="text-gray-600">{child.class}</p>
                    <p className={`text-sm font-medium ${attendanceGrade.color}`}>
                      {attendanceGrade.grade} • {child.attendance.percentage}%
                    </p>
                  </div>
                </div>
                <Link
                  href={`/parent/children/attendance/${child.id}`}
                  className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Link>
              </div>

              {/* Attendance Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{child.attendance.present}</div>
                  <div className="text-xs text-gray-600">Present</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{child.attendance.absent}</div>
                  <div className="text-xs text-gray-600">Absent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{child.attendance.late}</div>
                  <div className="text-xs text-gray-600">Late</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{child.attendance.streak}</div>
                  <div className="text-xs text-gray-600">Day Streak</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Attendance Rate</span>
                  <span className="font-semibold text-gray-900">{child.attendance.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      child.attendance.percentage >= 95 ? 'bg-green-500' :
                      child.attendance.percentage >= 90 ? 'bg-blue-500' :
                      child.attendance.percentage >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${child.attendance.percentage}%` }}
                  />
                </div>
              </div>

              {/* Last Activity */}
              <div className="text-sm text-gray-600">
                <span>Last absent: </span>
                <span className="font-medium">{new Date(child.attendance.lastAbsent).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Attendance Records */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
        <div className="p-6 lg:p-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Recent Attendance</h2>
              <p className="text-gray-600">Latest attendance records for your children</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search records..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Link
                href="/parent/children/attendance/calendar"
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 font-medium"
              >
                <Calendar className="w-4 h-4" />
                Calendar View
              </Link>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {record.child.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {record.child}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.time === "-" ? (
                      <span className="text-gray-400">-</span>
                    ) : (
                      record.time
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {record.notes || <span className="text-gray-400">No notes</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/parent/children/attendance/${children.find(c => c.name === record.child)?.id}?date=${record.date}`}
                      className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredAttendance.length} records
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 text-sm">Page 1 of 1</span>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
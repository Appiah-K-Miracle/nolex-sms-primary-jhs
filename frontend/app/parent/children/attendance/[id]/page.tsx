"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  Edit,
  User,
  CalendarDays,
  FileText,
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  MapPin,
  Phone,
  Mail,
  Trash2,
  Eye,
  BookOpen,
  Users,
  Award,
  Activity
} from "lucide-react";

export default function ChildAttendanceDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const childId = params.id as string;
  const selectedDate = searchParams.get('date');
  
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMonth, setSelectedMonth] = useState("2025-11");
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  // Sample child data
  const childData = childId === "1" ? {
    id: "1",
    name: "Kwame Mensah",
    class: "Primary 6A",
    rollNumber: "P6A-001",
    dateOfBirth: "2012-03-15",
    parent: "Mrs. Akosua Mensah",
    contact: "+233 20 456 7890",
    email: "akosua.mensah@email.com",
    address: "123 Accra Street, Kumasi",
    photo: "/avatars/student1.jpg",
    attendance: {
      totalDays: 22,
      present: 20,
      absent: 2,
      late: 1,
      excused: 1,
      percentage: 91,
      streak: 5,
      lastAbsent: "2025-11-15",
      punctualityRate: 95,
      averageArrivalTime: "07:45"
    }
  } : {
    id: "2",
    name: "Ama Mensah", 
    class: "Primary 4B",
    rollNumber: "P4B-015",
    dateOfBirth: "2014-07-22",
    parent: "Mrs. Akosua Mensah",
    contact: "+233 20 456 7890",
    email: "akosua.mensah@email.com",
    address: "123 Accra Street, Kumasi",
    photo: "/avatars/student2.jpg",
    attendance: {
      totalDays: 22,
      present: 21,
      absent: 1,
      late: 0,
      excused: 0,
      percentage: 95,
      streak: 12,
      lastAbsent: "2025-10-28",
      punctualityRate: 100,
      averageArrivalTime: "07:32"
    }
  };

  const attendanceRecords = childId === "1" ? [
    { date: "2025-11-18", status: "present", timeIn: "07:45", timeOut: "14:30", notes: "", temperature: "36.5°C" },
    { date: "2025-11-17", status: "present", timeIn: "07:50", timeOut: "14:30", notes: "", temperature: "36.2°C" },
    { date: "2025-11-16", status: "late", timeIn: "08:15", timeOut: "14:30", notes: "Traffic delay", temperature: "36.4°C" },
    { date: "2025-11-15", status: "absent", timeIn: "-", timeOut: "-", notes: "Sick leave - fever", temperature: "-" },
    { date: "2025-11-14", status: "present", timeIn: "07:42", timeOut: "14:30", notes: "", temperature: "36.3°C" },
    { date: "2025-11-13", status: "present", timeIn: "07:48", timeOut: "14:30", notes: "", temperature: "36.1°C" },
    { date: "2025-11-12", status: "present", timeIn: "07:46", timeOut: "14:30", notes: "", temperature: "36.6°C" },
    { date: "2025-11-11", status: "present", timeIn: "07:44", timeOut: "14:30", notes: "", temperature: "36.0°C" },
    { date: "2025-11-10", status: "present", timeIn: "07:41", timeOut: "14:30", notes: "", temperature: "36.4°C" },
    { date: "2025-11-09", status: "present", timeIn: "07:47", timeOut: "14:30", notes: "", temperature: "36.2°C" }
  ] : [
    { date: "2025-11-18", status: "present", timeIn: "07:30", timeOut: "14:30", notes: "", temperature: "36.1°C" },
    { date: "2025-11-17", status: "present", timeIn: "07:35", timeOut: "14:30", notes: "", temperature: "36.3°C" },
    { date: "2025-11-16", status: "present", timeIn: "07:28", timeOut: "14:30", notes: "", temperature: "36.0°C" },
    { date: "2025-11-15", status: "present", timeIn: "07:32", timeOut: "14:30", notes: "", temperature: "36.2°C" },
    { date: "2025-11-14", status: "present", timeIn: "07:29", timeOut: "14:30", notes: "", temperature: "36.4°C" },
    { date: "2025-11-13", status: "present", timeIn: "07:31", timeOut: "14:30", notes: "", temperature: "36.1°C" },
    { date: "2025-11-12", status: "present", timeIn: "07:33", timeOut: "14:30", notes: "", temperature: "36.5°C" },
    { date: "2025-11-11", status: "present", timeIn: "07:27", timeOut: "14:30", notes: "", temperature: "36.0°C" },
    { date: "2025-11-10", status: "present", timeIn: "07:30", timeOut: "14:30", notes: "", temperature: "36.3°C" },
    { date: "2025-11-09", status: "present", timeIn: "07:34", timeOut: "14:30", notes: "", temperature: "36.2°C" }
  ];

  const monthlyAnalytics = {
    attendanceTrend: [
      { month: "Aug", percentage: 95 },
      { month: "Sep", percentage: 92 },
      { month: "Oct", percentage: 94 },
      { month: "Nov", percentage: childData.attendance.percentage }
    ],
    punctualityTrend: [
      { month: "Aug", onTime: 18, late: 2 },
      { month: "Sep", onTime: 19, late: 1 },
      { month: "Oct", onTime: 20, late: 2 },
      { month: "Nov", onTime: childData.attendance.present - (childData.attendance.late || 0), late: childData.attendance.late || 0 }
    ],
    absentReasons: [
      { reason: "Illness", count: 3, percentage: 60 },
      { reason: "Family Emergency", count: 1, percentage: 20 },
      { reason: "Medical Appointment", count: 1, percentage: 20 }
    ]
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
    if (percentage >= 95) return { grade: "Excellent", color: "text-green-600", bgColor: "bg-green-50" };
    if (percentage >= 90) return { grade: "Good", color: "text-blue-600", bgColor: "bg-blue-50" };
    if (percentage >= 85) return { grade: "Satisfactory", color: "text-yellow-600", bgColor: "bg-yellow-50" };
    if (percentage >= 80) return { grade: "Needs Improvement", color: "text-orange-600", bgColor: "bg-orange-50" };
    return { grade: "Poor", color: "text-red-600", bgColor: "bg-red-50" };
  };

  const attendanceGrade = getAttendanceGrade(childData.attendance.percentage);

  // Delete confirmation modal
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">Confirm Action</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to request correction for this attendance record? This will notify the school administration.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowDeleteModal(false);
              setSelectedRecord(null);
              // Handle request correction logic here
            }}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Request Correction
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/parent/children/attendance"
              className="mr-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold">{childData.name}'s Attendance</h1>
              <p className="text-purple-100 text-sm lg:text-base xl:text-lg">
                {childData.class} • Roll No: {childData.rollNumber}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/parent/children/attendance/${childId}/edit`}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              <Edit className="w-4 h-4" />
              Request Correction
            </Link>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className={`rounded-lg lg:rounded-xl shadow-sm p-6 border ${attendanceGrade.bgColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className={`text-2xl font-bold ${attendanceGrade.color}`}>{childData.attendance.percentage}%</p>
              <p className={`text-xs font-medium ${attendanceGrade.color}`}>{attendanceGrade.grade}</p>
            </div>
            <div className={`p-3 rounded-lg ${attendanceGrade.bgColor}`}>
              <BarChart3 className={`w-6 h-6 ${attendanceGrade.color}`} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present Days</p>
              <p className="text-2xl font-bold text-green-600">{childData.attendance.present}</p>
              <p className="text-xs text-gray-500">of {childData.attendance.totalDays} days</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-purple-600">{childData.attendance.streak}</p>
              <p className="text-xs text-gray-500">consecutive days</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Punctuality</p>
              <p className="text-2xl font-bold text-blue-600">{childData.attendance.punctualityRate}%</p>
              <p className="text-xs text-gray-500">on-time arrivals</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Child Information Card */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-2xl lg:text-3xl">
              {childData.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">{childData.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Class:</span>
                  <span className="font-medium">{childData.class}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Roll Number:</span>
                  <span className="font-medium">{childData.rollNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Date of Birth:</span>
                  <span className="font-medium">{new Date(childData.dateOfBirth).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Parent:</span>
                  <span className="font-medium">{childData.parent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{childData.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{childData.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "records", label: "Daily Records", icon: CalendarDays },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
              { id: "patterns", label: "Patterns", icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 lg:p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Monthly Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">{childData.attendance.totalDays}</div>
                    <div className="text-sm text-gray-600">Total School Days</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{childData.attendance.present}</div>
                    <div className="text-sm text-gray-600">Days Present</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-red-600">{childData.attendance.absent}</div>
                    <div className="text-sm text-gray-600">Days Absent</div>
                  </div>
                </div>
              </div>

              {/* Attendance Progress */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Progress</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Attendance</span>
                    <span className="text-sm font-bold text-gray-900">{childData.attendance.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        childData.attendance.percentage >= 95 ? 'bg-green-500' :
                        childData.attendance.percentage >= 90 ? 'bg-blue-500' :
                        childData.attendance.percentage >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${childData.attendance.percentage}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    Target: 95% • Current: {childData.attendance.percentage}% • Grade: {attendanceGrade.grade}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {attendanceRecords.slice(0, 5).map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(record.status)}
                        <div>
                          <div className="font-medium text-gray-900">{new Date(record.date).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-600">
                            {record.status === "present" ? `Arrived at ${record.timeIn}` :
                             record.status === "late" ? `Late arrival at ${record.timeIn}` :
                             record.status === "absent" ? "Absent" : record.status}
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Daily Records Tab */}
          {activeTab === "records" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Daily Attendance Records</h3>
                  <p className="text-gray-600">Detailed daily attendance tracking</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="2025-11">November 2025</option>
                    <option value="2025-10">October 2025</option>
                    <option value="2025-09">September 2025</option>
                  </select>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceRecords.map((record, index) => (
                      <tr key={index} className={`hover:bg-gray-50 ${selectedDate === record.date ? 'bg-blue-50' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                            {getStatusIcon(record.status)}
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.timeIn === "-" ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            <span className={record.status === "late" ? "text-yellow-600 font-medium" : ""}>
                              {record.timeIn}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.timeOut === "-" ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            record.timeOut
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.temperature === "-" ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            record.temperature
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {record.notes || <span className="text-gray-400">No notes</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedRecord(record);
                                setShowDeleteModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              Correct
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trend</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-4 gap-4">
                    {monthlyAnalytics.attendanceTrend.map((month, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold text-gray-900">{month.percentage}%</div>
                        <div className="text-sm text-gray-600">{month.month}</div>
                        <div className={`mt-2 h-2 rounded-full ${
                          month.percentage >= 95 ? 'bg-green-500' :
                          month.percentage >= 90 ? 'bg-blue-500' :
                          month.percentage >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} style={{ width: `${month.percentage}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Punctuality Analysis</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Monthly Punctuality</h4>
                      <div className="space-y-2">
                        {monthlyAnalytics.punctualityTrend.map((month, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{month.month}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-green-600 font-medium">{month.onTime} on-time</span>
                              <span className="text-sm text-yellow-600 font-medium">{month.late} late</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Average Arrival Time</h4>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{childData.attendance.averageArrivalTime}</div>
                        <div className="text-sm text-gray-600">Average arrival time</div>
                        <div className="mt-2 text-xs text-gray-500">
                          School starts at 8:00 AM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {childData.attendance.absent > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Absence Reasons</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-3">
                      {monthlyAnalytics.absentReasons.map((reason, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-900">{reason.reason}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">{reason.count} days</span>
                            <span className="text-sm text-gray-500">({reason.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Patterns Tab */}
          {activeTab === "patterns" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Patterns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-3">Weekly Pattern</h4>
                    <div className="space-y-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => {
                        const attendance = [95, 92, 96, 89, 94][index]; // Sample data
                        return (
                          <div key={day} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{day}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    attendance >= 95 ? 'bg-green-500' :
                                    attendance >= 90 ? 'bg-blue-500' :
                                    'bg-yellow-500'
                                  }`}
                                  style={{ width: `${attendance}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{attendance}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-3">Performance Indicators</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Consistency</span>
                        <span className="text-sm font-medium text-green-600">Excellent</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Punctuality</span>
                        <span className="text-sm font-medium text-blue-600">Very Good</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Improvement Trend</span>
                        <span className="text-sm font-medium text-green-600">Positive</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Risk Level</span>
                        <span className="text-sm font-medium text-green-600">Low</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Excellent attendance record!</p>
                        <p className="text-sm text-gray-600">Keep up the great work with consistent attendance.</p>
                      </div>
                    </div>
                    {childData.attendance.late > 0 && (
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Minor punctuality concern</p>
                          <p className="text-sm text-gray-600">Consider adjusting morning routine to avoid late arrivals.</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Positive trend</p>
                        <p className="text-sm text-gray-600">Attendance shows consistent improvement over time.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
}
"use client"

import { useState } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Download, 
  Filter, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  User,
  Phone,
  Mail,
  FileText,
  Search,
  CalendarDays,
  Target,
  Award,
  Activity,
  RefreshCw,
  BookOpen,
  Home,
  ChevronDown,
  ChevronRight,
  Printer,
  Info
} from "lucide-react";
import Link from "next/link";

// Mock attendance data for a specific class
const classAttendanceData = {
  classInfo: {
    id: "1",
    name: "5A",
    grade: "Grade 5",
    teacher: "Mrs. Osei",
    totalStudents: 14,
    academicYear: "2024/2025",
    term: "Term 1"
  },
  
  monthlyStats: {
    currentMonth: "October 2024",
    totalDays: 22,
    averageAttendance: 95.8,
    bestDay: { date: "2024-10-15", rate: 100 },
    worstDay: { date: "2024-10-22", rate: 85.7 }
  },
  
  studentStats: [
    {
      id: 1,
      studentId: "NLX2024GRADE51234",
      name: "Kwame Asante",
      photo: null,
      totalDays: 22,
      present: 21,
      absent: 1,
      late: 0,
      excused: 1,
      rate: 95.5,
      trend: "stable",
      parent: {
        name: "Kofi Asante",
        phone: "+233 24 123 4567"
      }
    },
    {
      id: 2,
      studentId: "NLX2024GRADE52345",
      name: "Akosua Mensah",
      photo: null,
      totalDays: 22,
      present: 22,
      absent: 0,
      late: 0,
      excused: 0,
      rate: 100,
      trend: "improving",
      parent: {
        name: "Yaw Mensah",
        phone: "+233 24 567 8901"
      }
    },
    {
      id: 3,
      studentId: "NLX2024GRADE53456",
      name: "Kofi Osei",
      photo: null,
      totalDays: 22,
      present: 19,
      absent: 2,
      late: 1,
      excused: 2,
      rate: 86.4,
      trend: "declining",
      parent: {
        name: "Ama Osei",
        phone: "+233 24 345 6789"
      }
    },
    {
      id: 4,
      studentId: "NLX2024GRADE54567",
      name: "Ama Appiah",
      photo: null,
      totalDays: 22,
      present: 20,
      absent: 0,
      late: 2,
      excused: 0,
      rate: 90.9,
      trend: "stable",
      parent: {
        name: "Kwaku Appiah",
        phone: "+233 24 456 7890"
      }
    },
    {
      id: 5,
      studentId: "NLX2024GRADE55678",
      name: "Yaw Bonsu",
      photo: null,
      totalDays: 22,
      present: 22,
      absent: 0,
      late: 0,
      excused: 0,
      rate: 100,
      trend: "excellent",
      parent: {
        name: "Akua Bonsu",
        phone: "+233 24 678 9012"
      }
    },
    {
      id: 6,
      studentId: "NLX2024GRADE56789",
      name: "Efua Darko",
      photo: null,
      totalDays: 22,
      present: 21,
      absent: 0,
      late: 1,
      excused: 0,
      rate: 95.5,
      trend: "stable",
      parent: {
        name: "Kwame Darko",
        phone: "+233 24 789 0123"
      }
    }
  ],
  
  dailyAttendance: [
    { date: "2024-10-28", present: 13, absent: 1, late: 0, rate: 92.9 },
    { date: "2024-10-29", present: 14, absent: 0, late: 0, rate: 100 },
    { date: "2024-10-30", present: 13, absent: 1, late: 0, rate: 92.9 },
    { date: "2024-10-31", present: 14, absent: 0, late: 0, rate: 100 },
    { date: "2024-11-01", present: 12, absent: 1, late: 1, rate: 85.7 }
  ],
  
  weeklyTrends: [
    { week: "Week 1", rate: 96.4 },
    { week: "Week 2", rate: 94.6 },
    { week: "Week 3", rate: 97.9 },
    { week: "Week 4", rate: 95.2 }
  ]
};

export default function ViewAttendancePage({ params }: { params: { id: string } }) {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState("2024-10");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDetails, setShowDetails] = useState(false);

  const { classInfo, monthlyStats, studentStats, dailyAttendance, weeklyTrends } = classAttendanceData;

  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return "text-green-600 bg-green-100";
    if (rate >= 85) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case "excellent":
        return <Award className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Fair": return "bg-yellow-100 text-yellow-800";
      case "Poor": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAttendanceStatus = (rate: number) => {
    if (rate >= 95) return "Excellent";
    if (rate >= 85) return "Good";
    if (rate >= 75) return "Fair";
    return "Poor";
  };

  const filteredStudents = studentStats.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const status = getAttendanceStatus(student.rate);
    const matchesFilter = filterStatus === "all" || status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rate":
        return b.rate - a.rate;
      case "absent":
        return b.absent - a.absent;
      default:
        return 0;
    }
  });

  const overallStats = {
    totalPresent: studentStats.reduce((sum, s) => sum + s.present, 0),
    totalAbsent: studentStats.reduce((sum, s) => sum + s.absent, 0),
    totalLate: studentStats.reduce((sum, s) => sum + s.late, 0),
    averageRate: studentStats.reduce((sum, s) => sum + s.rate, 0) / studentStats.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/headmaster/students/attendance"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Eye className="w-8 h-8" />
                  Attendance Report - {classInfo.name}
                </h1>
                <p className="text-indigo-100 mt-1">
                  {classInfo.grade} • Teacher: {classInfo.teacher} • {classInfo.totalStudents} Students
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium">Academic Year</p>
                <p className="text-lg font-bold">{classInfo.academicYear}</p>
              </div>
              <button
                onClick={() => window.print()}
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Printer className="w-5 h-5" />
                Print Report
              </button>
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
              <p className="text-2xl font-bold text-gray-900">{classInfo.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Average Present</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(overallStats.totalPresent / studentStats.length)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Absences</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.totalAbsent}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Late</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.totalLate}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Class Average</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.averageRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="term">This Term</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Students</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="name">Name</option>
              <option value="rate">Attendance Rate</option>
              <option value="absent">Absences</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Students</option>
              <option value="excellent">Excellent (95%+)</option>
              <option value="good">Good (85-94%)</option>
              <option value="fair">Fair (75-84%)</option>
              <option value="poor">Poor (below 75%)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Showing {sortedStudents.length} of {studentStats.length} students
            </span>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
            >
              {showDetails ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              {showDetails ? "Hide" : "Show"} Details
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Excel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generate PDF
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Trends */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Weekly Attendance Trends
          </h3>
          
          <div className="space-y-4">
            {weeklyTrends.map((week, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{week.week}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${week.rate}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${getAttendanceColor(week.rate)}`}>
                    {week.rate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-green-600" />
            Monthly Summary
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">Total School Days</span>
              <span className="text-lg font-bold text-gray-900">{monthlyStats.totalDays}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">Average Attendance</span>
              <span className={`text-lg font-bold px-2 py-1 rounded ${getAttendanceColor(monthlyStats.averageAttendance)}`}>
                {monthlyStats.averageAttendance}%
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">Best Day</span>
              <div className="text-right">
                <p className="text-sm text-gray-600">{monthlyStats.bestDay.date}</p>
                <p className="text-lg font-bold text-green-600">{monthlyStats.bestDay.rate}%</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">Needs Attention</span>
              <div className="text-right">
                <p className="text-sm text-gray-600">{monthlyStats.worstDay.date}</p>
                <p className="text-lg font-bold text-red-600">{monthlyStats.worstDay.rate}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Attendance Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600" />
          Individual Student Attendance ({sortedStudents.length})
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Present</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Absent</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Late</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Trend</th>
                {showDetails && (
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Parent Contact</th>
                )}
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student, index) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{student.studentId}</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">{student.present}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">{student.absent}</span>
                    {student.excused > 0 && (
                      <span className="text-xs text-gray-500 ml-1">({student.excused} excused)</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-yellow-600 font-medium">{student.late}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getAttendanceColor(student.rate)}`}>
                      {student.rate}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(getAttendanceStatus(student.rate))}`}>
                      {getAttendanceStatus(student.rate)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      {getTrendIcon(student.trend)}
                      <span className="text-sm text-gray-600 capitalize">{student.trend}</span>
                    </div>
                  </td>
                  {showDetails && (
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{student.parent.name}</p>
                        <p className="text-gray-600">{student.parent.phone}</p>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No students found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Alerts and Recommendations */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          Alerts & Recommendations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="font-medium text-gray-900">Students at Risk</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {studentStats.filter(s => s.rate < 85).length} student(s) with poor attendance
            </p>
            <div className="space-y-1">
              {studentStats.filter(s => s.rate < 85).map((student) => (
                <p key={student.id} className="text-xs text-red-600">
                  • {student.name} ({student.rate}%)
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Perfect Attendance</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {studentStats.filter(s => s.rate === 100).length} student(s) with perfect attendance
            </p>
            <div className="space-y-1">
              {studentStats.filter(s => s.rate === 100).map((student) => (
                <p key={student.id} className="text-xs text-green-600">
                  • {student.name}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Actions Needed</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span className="text-gray-600">
                  {studentStats.filter(s => s.absent > 3).length} parent meetings recommended
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-gray-600">Follow up on excused absences</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-600">Recognize perfect attendance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
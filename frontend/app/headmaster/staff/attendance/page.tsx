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
  RefreshCw,
  MapPin,
  Briefcase
} from "lucide-react";
import Link from "next/link";

// Mock staff attendance data
const staffAttendanceData = {
  todayStats: {
    totalStaff: 45,
    present: 42,
    absent: 2,
    late: 1,
    attendanceRate: 93.3
  },
  
  weeklyStats: {
    monday: { present: 43, absent: 1, late: 1, rate: 95.6 },
    tuesday: { present: 44, absent: 1, late: 0, rate: 97.8 },
    wednesday: { present: 42, absent: 2, late: 1, rate: 93.3 },
    thursday: { present: 43, absent: 2, late: 0, rate: 95.6 },
    friday: { present: 44, absent: 1, late: 0, rate: 97.8 }
  },
  
  departmentStats: [
    { department: "Teaching Staff", total: 28, present: 26, absent: 1, late: 1, rate: 92.9 },
    { department: "Administrative", total: 8, present: 8, absent: 0, late: 0, rate: 100.0 },
    { department: "Support Staff", total: 6, present: 6, absent: 0, late: 0, rate: 100.0 },
    { department: "Security", total: 3, present: 2, absent: 1, late: 0, rate: 66.7 }
  ],
  
  recentAbsences: [
    {
      id: 1,
      staffId: "NLX2024STF001",
      name: "Mr. Kwame Boateng",
      position: "Mathematics Teacher",
      department: "Teaching Staff",
      date: "2024-11-01",
      status: "Absent",
      reason: "Sick Leave",
      approved: true,
      contact: "+233 24 123 4567",
      emergencyContact: "Mrs. Boateng - +233 24 123 4568"
    },
    {
      id: 2,
      staffId: "NLX2024STF015",
      name: "Ms. Akosua Mensah",
      position: "English Teacher",
      department: "Teaching Staff",
      date: "2024-11-01",
      status: "Late",
      reason: "Traffic delay",
      approved: false,
      contact: "+233 24 567 8901",
      emergencyContact: "Mr. Mensah - +233 24 567 8902"
    },
    {
      id: 3,
      staffId: "NLX2024STF032",
      name: "Mr. Joseph Tetteh",
      position: "Security Guard",
      department: "Security",
      date: "2024-10-31",
      status: "Absent",
      reason: "Family emergency",
      approved: true,
      contact: "+233 24 345 6789",
      emergencyContact: "Mrs. Tetteh - +233 24 345 6790"
    }
  ],
  
  monthlyTrends: [
    { month: "August", rate: 94.2 },
    { month: "September", rate: 96.8 },
    { month: "October", rate: 95.1 },
    { month: "November", rate: 93.3 }
  ]
};

// Mock staff by department
const staffByDepartment = [
  {
    id: 1,
    department: "Teaching Staff",
    staff: [
      { id: 1, name: "Mr. Kwame Boateng", position: "Mathematics Teacher", status: "Absent", shift: "Morning" },
      { id: 2, name: "Ms. Akosua Mensah", position: "English Teacher", status: "Late", shift: "Morning" },
      { id: 3, name: "Mrs. Ama Osei", position: "Science Teacher", status: "Present", shift: "Morning" },
      { id: 4, name: "Mr. Yaw Asante", position: "Social Studies Teacher", status: "Present", shift: "Morning" },
      { id: 5, name: "Ms. Abena Gyamfi", position: "Art Teacher", status: "Present", shift: "Morning" }
    ]
  },
  {
    id: 2,
    department: "Administrative",
    staff: [
      { id: 6, name: "Mrs. Grace Adjei", position: "Vice Principal", status: "Present", shift: "Full Day" },
      { id: 7, name: "Mr. Samuel Ofori", position: "Accountant", status: "Present", shift: "Full Day" },
      { id: 8, name: "Ms. Joyce Appiah", position: "Secretary", status: "Present", shift: "Full Day" },
      { id: 9, name: "Mr. Daniel Oppong", position: "IT Administrator", status: "Present", shift: "Full Day" }
    ]
  },
  {
    id: 3,
    department: "Support Staff",
    staff: [
      { id: 10, name: "Mr. Kofi Asare", position: "Janitor", status: "Present", shift: "Morning" },
      { id: 11, name: "Mrs. Mavis Osei", position: "Cook", status: "Present", shift: "Morning" },
      { id: 12, name: "Mr. Francis Boadu", position: "Driver", status: "Present", shift: "Full Day" }
    ]
  },
  {
    id: 4,
    department: "Security",
    staff: [
      { id: 13, name: "Mr. Joseph Tetteh", position: "Security Guard", status: "Absent", shift: "Night" },
      { id: 14, name: "Mr. Emmanuel Darko", position: "Security Guard", status: "Present", shift: "Day" },
      { id: 15, name: "Mr. Prince Okyere", position: "Security Guard", status: "Present", shift: "Evening" }
    ]
  }
];

export default function StaffAttendancePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "mark", label: "Mark Attendance", icon: UserCheck },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "analytics", label: "Analytics", icon: TrendingUp }
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

  const filteredDepartments = staffByDepartment.filter(dept => 
    selectedDepartment === "all" || dept.department === selectedDepartment
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Calendar className="w-8 h-8" />
                Staff Attendance
              </h1>
              <p className="text-blue-100 mt-1">Track and manage staff attendance records</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium">Today's Date</p>
                <p className="text-lg font-bold">{new Date().toLocaleDateString()}</p>
              </div>
              <Link
                href="/headmaster/staff/attendance/mark"
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <UserCheck className="w-5 h-5" />
                Quick Mark
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">{staffAttendanceData.todayStats.totalStaff}</p>
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
              <p className="text-2xl font-bold text-gray-900">{staffAttendanceData.todayStats.present}</p>
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
              <p className="text-2xl font-bold text-gray-900">{staffAttendanceData.todayStats.absent}</p>
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
              <p className="text-2xl font-bold text-gray-900">{staffAttendanceData.todayStats.late}</p>
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
              <p className="text-2xl font-bold text-gray-900">{staffAttendanceData.todayStats.attendanceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg">
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
                      ? "border-blue-500 text-blue-600"
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
                  Weekly Staff Attendance Overview
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {Object.entries(staffAttendanceData.weeklyStats).map(([day, stats]) => (
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

              {/* Department-wise Attendance */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-green-600" />
                  Department-wise Attendance (Today)
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Department</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Total</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Present</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Absent</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Late</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Rate</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffAttendanceData.departmentStats.map((dept, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{dept.department}</td>
                          <td className="py-3 px-4">{dept.total}</td>
                          <td className="py-3 px-4">
                            <span className="text-green-600 font-medium">{dept.present}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-red-600 font-medium">{dept.absent}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-yellow-600 font-medium">{dept.late}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getAttendanceColor(dept.rate)}`}>
                              {dept.rate}%
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Link
                              href={`/headmaster/staff/attendance/department/${dept.department.toLowerCase().replace(' ', '-')}`}
                              className="text-blue-600 hover:text-blue-800"
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
                  Recent Staff Absences & Late Arrivals
                </h3>
                
                <div className="space-y-4">
                  {staffAttendanceData.recentAbsences.map((record) => (
                    <div key={record.id} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{record.name}</h4>
                            <p className="text-sm text-gray-600">{record.position} • {record.department}</p>
                            <p className="text-sm text-gray-600">ID: {record.staffId} • {record.contact}</p>
                            <p className="text-sm text-gray-600">Emergency: {record.emergencyContact}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">{record.date}</p>
                          <p className="text-sm text-gray-600">Reason: {record.reason}</p>
                          {record.approved && (
                            <p className="text-xs text-green-600 mt-1">✓ Approved</p>
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
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                  Mark Staff Attendance
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Department</label>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Departments</option>
                      <option value="Teaching Staff">Teaching Staff</option>
                      <option value="Administrative">Administrative</option>
                      <option value="Support Staff">Support Staff</option>
                      <option value="Security">Security</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Staff</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search by name or position..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Attendance Grid */}
              <div className="space-y-8">
                {filteredDepartments.map((department) => (
                  <div key={department.id} className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                      {department.department}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {department.staff
                        .filter(staff => staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       staff.position.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((staff) => (
                        <div key={staff.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900">{staff.name}</h5>
                              <p className="text-sm text-gray-600">{staff.position}</p>
                              <p className="text-xs text-gray-500">Shift: {staff.shift}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(staff.status)}`}>
                              {staff.status}
                            </span>
                            <div className="flex gap-1">
                              <Link
                                href={`/headmaster/staff/attendance/${staff.id}`}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                              >
                                <Edit3 className="w-3 h-3" />
                              </Link>
                              <Link
                                href={`/headmaster/staff/attendance/${staff.id}`}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors"
                              >
                                <Eye className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
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
                  Staff Attendance Reports
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option>All Departments</option>
                      <option>Teaching Staff</option>
                      <option>Administrative</option>
                      <option>Support Staff</option>
                      <option>Security</option>
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
                <h3 className="text-xl font-bold text-gray-900 mb-6">Daily Staff Attendance Report - {new Date().toLocaleDateString()}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Overall Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Staff:</span>
                        <span className="font-medium">{staffAttendanceData.todayStats.totalStaff}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Present:</span>
                        <span className="text-green-600 font-medium">{staffAttendanceData.todayStats.present}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Absent:</span>
                        <span className="text-red-600 font-medium">{staffAttendanceData.todayStats.absent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Late:</span>
                        <span className="text-yellow-600 font-medium">{staffAttendanceData.todayStats.late}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span>Attendance Rate:</span>
                        <span className="font-bold text-green-600">{staffAttendanceData.todayStats.attendanceRate}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Best Performing Departments</h4>
                    <div className="space-y-2 text-sm">
                      {staffAttendanceData.departmentStats
                        .sort((a, b) => b.rate - a.rate)
                        .slice(0, 4)
                        .map((dept, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="truncate">{dept.department}:</span>
                          <span className="font-medium text-blue-600">{dept.rate}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Alerts & Notifications</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span>{staffAttendanceData.recentAbsences.filter(r => r.status === "Absent").length} staff absent today</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span>{staffAttendanceData.recentAbsences.filter(r => r.status === "Late").length} staff arrived late</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Overall attendance above 90%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Detailed Department Breakdown */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Department</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Staff</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Present</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Absent</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Late</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Rate</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffAttendanceData.departmentStats.map((dept, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium">{dept.department}</td>
                          <td className="py-3 px-4">{dept.total}</td>
                          <td className="py-3 px-4 text-green-600">{dept.present}</td>
                          <td className="py-3 px-4 text-red-600">{dept.absent}</td>
                          <td className="py-3 px-4 text-yellow-600">{dept.late}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getAttendanceColor(dept.rate)}`}>
                              {dept.rate}%
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {dept.rate >= 95 ? (
                              <span className="text-green-600 font-medium">Excellent</span>
                            ) : dept.rate >= 90 ? (
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

          {activeTab === "analytics" && (
            <div className="space-y-8">
              {/* Monthly Trends */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  Monthly Staff Attendance Trends
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {staffAttendanceData.monthlyTrends.map((month, index) => (
                    <div key={index} className="bg-white rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{month.month}</h4>
                        <div className="flex items-center gap-1">
                          {month.rate > 95 ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${month.rate > 95 ? 'text-green-600' : 'text-red-600'}`}>
                            {month.rate > 95 ? '+1.2%' : '-0.8%'}
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
                    Department Performance Analysis
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
                      <span className="font-medium text-green-800">Excellent (95%+)</span>
                      <span className="text-green-900 font-bold">
                        {staffAttendanceData.departmentStats.filter(d => d.rate >= 95).length} departments
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg">
                      <span className="font-medium text-yellow-800">Good (90-94%)</span>
                      <span className="text-yellow-900 font-bold">
                        {staffAttendanceData.departmentStats.filter(d => d.rate >= 90 && d.rate < 95).length} departments
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                      <span className="font-medium text-red-800">Needs Attention (below 90%)</span>
                      <span className="text-red-900 font-bold">
                        {staffAttendanceData.departmentStats.filter(d => d.rate < 90).length} departments
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
                        <span className="font-medium text-gray-900">Best Performing Department</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {staffAttendanceData.departmentStats.reduce((best, current) => 
                          current.rate > best.rate ? current : best
                        ).department} with {staffAttendanceData.departmentStats.reduce((best, current) => 
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
                        {staffAttendanceData.departmentStats.filter(d => d.rate < 90).length === 0 
                          ? "All departments meeting attendance targets" 
                          : `${staffAttendanceData.departmentStats.filter(d => d.rate < 90).length} department(s) below 90% attendance`
                        }
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">Overall Target</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        School target: 95% | Current: {staffAttendanceData.todayStats.attendanceRate}%
                        <span className={`ml-2 ${staffAttendanceData.todayStats.attendanceRate >= 95 ? 'text-green-600' : 'text-red-600'}`}>
                          ({staffAttendanceData.todayStats.attendanceRate >= 95 ? 'Target Met' : 'Below Target'})
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
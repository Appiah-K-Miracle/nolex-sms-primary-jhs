"use client";

import React, { useState } from "react";
import { 
  Clock, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Filter, 
  Search, 
  User,
  MapPin,
  Phone,
  Mail,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Eye,
  ChevronLeft,
  ChevronRight,
  Info,
  Bell,
  Zap
} from "lucide-react";

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused' | 'sick';
  timeIn?: string;
  timeOut?: string;
  reason?: string;
  excusedBy?: string;
  notes?: string;
}

interface MonthlyAttendance {
  month: string;
  year: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  percentage: number;
  records: AttendanceRecord[];
}

interface StudentAttendance {
  studentId: number;
  name: string;
  class: string;
  currentTermPercentage: number;
  yearToDatePercentage: number;
  totalPresentDays: number;
  totalSchoolDays: number;
  consecutivePresentDays: number;
  monthlyData: MonthlyAttendance[];
}

export default function AttendancePage() {
  const [selectedChild, setSelectedChild] = useState<number>(1);
  const [selectedMonth, setSelectedMonth] = useState<string>("2025-11");
  const [viewMode, setViewMode] = useState<'calendar' | 'summary'>('calendar');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // Sample attendance data
  const attendanceData: StudentAttendance[] = [
    {
      studentId: 1,
      name: "Kwame Mensah",
      class: "JHS 2",
      currentTermPercentage: 95.2,
      yearToDatePercentage: 93.8,
      totalPresentDays: 87,
      totalSchoolDays: 92,
      consecutivePresentDays: 12,
      monthlyData: [
        {
          month: "November",
          year: 2025,
          totalDays: 21,
          presentDays: 20,
          absentDays: 1,
          lateDays: 2,
          excusedDays: 0,
          percentage: 95.2,
          records: [
            { date: "2025-11-01", status: "present", timeIn: "07:45", timeOut: "15:30" },
            { date: "2025-11-02", status: "present", timeIn: "07:50", timeOut: "15:30" },
            { date: "2025-11-03", status: "present", timeIn: "07:42", timeOut: "15:30" },
            { date: "2025-11-04", status: "absent", reason: "Sick", notes: "Fever and headache" },
            { date: "2025-11-05", status: "present", timeIn: "07:48", timeOut: "15:30" },
            { date: "2025-11-06", status: "late", timeIn: "08:15", timeOut: "15:30", reason: "Traffic jam" },
            { date: "2025-11-07", status: "present", timeIn: "07:40", timeOut: "15:30" },
            { date: "2025-11-08", status: "present", timeIn: "07:52", timeOut: "15:30" },
            { date: "2025-11-09", status: "present", timeIn: "07:45", timeOut: "15:30" },
            { date: "2025-11-10", status: "present", timeIn: "07:38", timeOut: "15:30" },
            { date: "2025-11-11", status: "late", timeIn: "08:20", timeOut: "15:30", reason: "Medical appointment" },
            { date: "2025-11-12", status: "present", timeIn: "07:46", timeOut: "15:30" },
            { date: "2025-11-13", status: "present", timeIn: "07:43", timeOut: "15:30" },
            { date: "2025-11-14", status: "present", timeIn: "07:47", timeOut: "15:30" },
            { date: "2025-11-15", status: "present", timeIn: "07:41", timeOut: "15:30" }
          ]
        },
        {
          month: "October",
          year: 2025,
          totalDays: 23,
          presentDays: 21,
          absentDays: 2,
          lateDays: 1,
          excusedDays: 0,
          percentage: 91.3,
          records: []
        },
        {
          month: "September",
          year: 2025,
          totalDays: 22,
          presentDays: 22,
          absentDays: 0,
          lateDays: 3,
          excusedDays: 0,
          percentage: 100,
          records: []
        }
      ]
    },
    {
      studentId: 2,
      name: "Ama Mensah",
      class: "Primary 5",
      currentTermPercentage: 98.1,
      yearToDatePercentage: 96.5,
      totalPresentDays: 90,
      totalSchoolDays: 92,
      consecutivePresentDays: 25,
      monthlyData: [
        {
          month: "November",
          year: 2025,
          totalDays: 21,
          presentDays: 21,
          absentDays: 0,
          lateDays: 1,
          excusedDays: 0,
          percentage: 100,
          records: [
            { date: "2025-11-01", status: "present", timeIn: "07:40", timeOut: "15:00" },
            { date: "2025-11-02", status: "present", timeIn: "07:35", timeOut: "15:00" },
            { date: "2025-11-03", status: "present", timeIn: "07:38", timeOut: "15:00" },
            { date: "2025-11-04", status: "present", timeIn: "07:42", timeOut: "15:00" },
            { date: "2025-11-05", status: "present", timeIn: "07:36", timeOut: "15:00" }
          ]
        }
      ]
    }
  ];

  const children = [
    { id: 1, name: "Kwame Mensah", class: "JHS 2" },
    { id: 2, name: "Ama Mensah", class: "Primary 5" }
  ];

  const selectedStudentData = attendanceData.find(student => student.studentId === selectedChild);
  const selectedMonthData = selectedStudentData?.monthlyData.find(month => 
    `${month.year}-${month.month.toLowerCase().slice(0, 3) === 'nov' ? '11' : 
     month.month.toLowerCase().slice(0, 3) === 'oct' ? '10' : 
     month.month.toLowerCase().slice(0, 3) === 'sep' ? '09' : '01'}` === selectedMonth
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200';
      case 'absent': return 'bg-red-100 text-red-800 border-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'excused': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sick': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      case 'late': return <Clock className="w-4 h-4" />;
      case 'excused': return <Info className="w-4 h-4" />;
      case 'sick': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return "text-green-600";
    if (percentage >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
  };

  // Generate calendar days for selected month
  const generateCalendarDays = () => {
    if (!selectedMonthData) return [];
    
    const year = selectedMonthData.year;
    const month = selectedMonthData.month.toLowerCase().slice(0, 3) === 'nov' ? 10 : 
                  selectedMonthData.month.toLowerCase().slice(0, 3) === 'oct' ? 9 : 8; // 0-indexed
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) { // 6 weeks × 7 days
      const dateString = currentDate.toISOString().split('T')[0];
      const isCurrentMonth = currentDate.getMonth() === month;
      const record = selectedMonthData.records.find(r => r.date === dateString);
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
      
      days.push({
        date: new Date(currentDate),
        dateString,
        isCurrentMonth,
        isWeekend,
        record: isCurrentMonth ? record : null
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 flex items-center gap-3">
              <Clock className="w-8 h-8 lg:w-10 lg:h-10" />
              Attendance Tracking
            </h1>
            <p className="text-emerald-100 text-sm lg:text-base xl:text-lg">
              Monitor daily attendance, punctuality, and attendance patterns
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <button className="bg-white text-emerald-600 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Download className="w-4 h-4 lg:w-5 lg:h-5" />
              Download Report
            </button>
            <button className="bg-emerald-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5" />
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Student:</label>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.class})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Month:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="2025-11">November 2025</option>
                <option value="2025-10">October 2025</option>
                <option value="2025-09">September 2025</option>
              </select>
            </div>
          </div>

          {/* View Mode */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'calendar' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('summary')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'summary' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Summary
            </button>
          </div>
        </div>
      </div>

      {selectedStudentData && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Current Term</h3>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className={`text-2xl lg:text-3xl font-bold mb-1 ${getAttendanceColor(selectedStudentData.currentTermPercentage)}`}>
                {selectedStudentData.currentTermPercentage}%
              </div>
              <p className="text-xs lg:text-sm text-gray-600">Attendance</p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Year to Date</h3>
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div className={`text-2xl lg:text-3xl font-bold mb-1 ${getAttendanceColor(selectedStudentData.yearToDatePercentage)}`}>
                {selectedStudentData.yearToDatePercentage}%
              </div>
              <p className="text-xs lg:text-sm text-gray-600">Overall</p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Present Days</h3>
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {selectedStudentData.totalPresentDays}
              </div>
              <p className="text-xs lg:text-sm text-gray-600">of {selectedStudentData.totalSchoolDays}</p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Perfect Streak</h3>
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-yellow-600 mb-1">
                {selectedStudentData.consecutivePresentDays}
              </div>
              <p className="text-xs lg:text-sm text-gray-600">days</p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">This Month</h3>
                <Target className="w-5 h-5 text-indigo-600" />
              </div>
              <div className={`text-2xl lg:text-3xl font-bold mb-1 ${selectedMonthData ? getAttendanceColor(selectedMonthData.percentage) : 'text-gray-400'}`}>
                {selectedMonthData?.percentage || 0}%
              </div>
              <p className="text-xs lg:text-sm text-gray-600">
                {selectedMonthData?.presentDays || 0}/{selectedMonthData?.totalDays || 0} days
              </p>
            </div>
          </div>

          {/* Main Content */}
          {viewMode === 'calendar' && selectedMonthData ? (
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm">
              <div className="p-4 lg:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedMonthData.month} {selectedMonthData.year} Calendar
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Present</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Absent</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Late</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 lg:p-6">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`aspect-square p-2 text-sm border rounded-lg cursor-pointer transition-all ${
                        !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' :
                        day.isWeekend ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'
                      } ${
                        day.record ? 
                          day.record.status === 'present' ? 'border-green-200 bg-green-50' :
                          day.record.status === 'absent' ? 'border-red-200 bg-red-50' :
                          day.record.status === 'late' ? 'border-yellow-200 bg-yellow-50' :
                          'border-gray-200' : 'border-gray-200'
                      }`}
                      onClick={() => day.record && setShowDetails(day.dateString)}
                    >
                      <div className="flex flex-col h-full">
                        <div className="text-center mb-1">
                          {day.date.getDate()}
                        </div>
                        {day.record && (
                          <div className="flex-1 flex items-center justify-center">
                            <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                              day.record.status === 'present' ? 'bg-green-500 text-white' :
                              day.record.status === 'absent' ? 'bg-red-500 text-white' :
                              day.record.status === 'late' ? 'bg-yellow-500 text-white' :
                              'bg-blue-500 text-white'
                            }`}>
                              {getStatusIcon(day.record.status)}
                            </div>
                          </div>
                        )}
                        {day.record?.timeIn && (
                          <div className="text-xs text-center text-gray-600">
                            {day.record.timeIn}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Legend</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Present ({selectedMonthData.presentDays} days)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span>Absent ({selectedMonthData.absentDays} days)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <span>Late ({selectedMonthData.lateDays} days)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4 text-blue-500" />
                      <span>Excused ({selectedMonthData.excusedDays} days)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Summary View */
            <div className="space-y-6">
              {/* Monthly Trends */}
              <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Attendance Trends</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {selectedStudentData.monthlyData.map((month, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {month.month} {month.year}
                        </h3>
                        <div className={`text-xl font-bold ${getAttendanceColor(month.percentage)}`}>
                          {month.percentage}%
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Days:</span>
                          <span className="font-medium">{month.totalDays}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Present:</span>
                          <span className="font-medium text-green-600">{month.presentDays}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Absent:</span>
                          <span className="font-medium text-red-600">{month.absentDays}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Late:</span>
                          <span className="font-medium text-yellow-600">{month.lateDays}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                          <div 
                            className={`h-2 rounded-full ${
                              month.percentage >= 95 ? 'bg-green-500' :
                              month.percentage >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${month.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Records */}
              {selectedMonthData && (
                <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Attendance Records</h2>
                  
                  <div className="space-y-3">
                    {selectedMonthData.records.slice(-10).reverse().map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg border ${getStatusColor(record.status)}`}>
                            {getStatusIcon(record.status)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {new Date(record.date).toLocaleDateString('en-GB', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                              })}
                            </p>
                            <p className="text-sm text-gray-600 capitalize">{record.status}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          {record.timeIn && (
                            <p className="text-sm font-medium text-gray-900">
                              In: {record.timeIn}
                            </p>
                          )}
                          {record.timeOut && (
                            <p className="text-sm text-gray-600">
                              Out: {record.timeOut}
                            </p>
                          )}
                          {record.reason && (
                            <p className="text-xs text-gray-500 mt-1">
                              {record.reason}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Detail Modal */}
          {showDetails && selectedMonthData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Attendance Details</h3>
                  <button 
                    onClick={() => setShowDetails(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                  >
                    ×
                  </button>
                </div>
                
                {(() => {
                  const record = selectedMonthData.records.find(r => r.date === showDetails);
                  if (!record) return null;
                  
                  return (
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                        <p className="text-gray-900">
                          {new Date(record.date).toLocaleDateString('en-GB', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded border ${getStatusColor(record.status)}`}>
                            {getStatusIcon(record.status)}
                          </div>
                          <span className="capitalize font-medium">{record.status}</span>
                        </div>
                      </div>
                      
                      {record.timeIn && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Time In:</label>
                          <p className="text-gray-900">{record.timeIn}</p>
                        </div>
                      )}
                      
                      {record.timeOut && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Time Out:</label>
                          <p className="text-gray-900">{record.timeOut}</p>
                        </div>
                      )}
                      
                      {record.reason && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reason:</label>
                          <p className="text-gray-900">{record.reason}</p>
                        </div>
                      )}
                      
                      {record.notes && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Notes:</label>
                          <p className="text-gray-900">{record.notes}</p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
"use client"

import { useState } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  TrendingUp, 
  BarChart3, 
  Download, 
  Eye, 
  Edit3, 
  Trash2,
  Award,
  Activity,
  FileText,
  Target,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

// Mock staff attendance data for individual staff member
const getStaffAttendanceById = (id: string) => {
  const staffAttendanceData = [
    {
      id: 1,
      staffId: "NLX2024STF001",
      staffName: "Akosua Mensah",
      position: "Mathematics Teacher",
      department: "Mathematics",
      email: "akosua.mensah@nolex.edu.gh",
      phone: "+233 24 123 4567",
      photo: null,
      attendanceStats: {
        totalDays: 100,
        present: 95,
        absent: 3,
        late: 2,
        percentage: 95.0,
        punctualityRate: 93.0
      },
      monthlyAttendance: [
        { month: "January", present: 20, absent: 1, late: 0, total: 21 },
        { month: "February", present: 19, absent: 0, late: 1, total: 20 },
        { month: "March", present: 22, absent: 0, late: 0, total: 22 },
        { month: "April", present: 18, absent: 1, late: 1, total: 20 },
        { month: "May", present: 16, absent: 1, late: 0, total: 17 }
      ],
      recentAttendance: [
        { date: "2024-11-01", status: "Present", timeIn: "07:45", timeOut: "15:30", hoursWorked: 7.75 },
        { date: "2024-10-31", status: "Present", timeIn: "07:50", timeOut: "15:30", hoursWorked: 7.67 },
        { date: "2024-10-30", status: "Late", timeIn: "08:15", timeOut: "15:30", hoursWorked: 7.25 },
        { date: "2024-10-29", status: "Present", timeIn: "07:40", timeOut: "15:30", hoursWorked: 7.83 },
        { date: "2024-10-28", status: "Present", timeIn: "07:45", timeOut: "15:30", hoursWorked: 7.75 }
      ],
      performanceMetrics: {
        onTimeArrival: 93.0,
        earlyDeparture: 2.0,
        averageHoursPerDay: 7.8,
        overtimeHours: 15.5
      }
    },
    {
      id: 2,
      staffId: "NLX2024STF002",
      staffName: "Kwaku Asante",
      position: "English Teacher",
      department: "English",
      email: "kwaku.asante@nolex.edu.gh",
      phone: "+233 24 234 5678",
      photo: null,
      attendanceStats: {
        totalDays: 98,
        present: 92,
        absent: 4,
        late: 2,
        percentage: 93.9,
        punctualityRate: 91.8
      },
      monthlyAttendance: [
        { month: "January", present: 19, absent: 2, late: 0, total: 21 },
        { month: "February", present: 18, absent: 1, late: 1, total: 20 },
        { month: "March", present: 21, absent: 1, late: 0, total: 22 },
        { month: "April", present: 17, absent: 2, late: 1, total: 20 },
        { month: "May", present: 17, absent: 0, late: 0, total: 17 }
      ],
      recentAttendance: [
        { date: "2024-11-01", status: "Present", timeIn: "07:50", timeOut: "15:30", hoursWorked: 7.67 },
        { date: "2024-10-31", status: "Present", timeIn: "07:45", timeOut: "15:30", hoursWorked: 7.75 },
        { date: "2024-10-30", status: "Present", timeIn: "07:55", timeOut: "15:30", hoursWorked: 7.58 },
        { date: "2024-10-29", status: "Late", timeIn: "08:10", timeOut: "15:30", hoursWorked: 7.33 },
        { date: "2024-10-28", status: "Absent", timeIn: "", timeOut: "", hoursWorked: 0 }
      ],
      performanceMetrics: {
        onTimeArrival: 91.8,
        earlyDeparture: 3.5,
        averageHoursPerDay: 7.6,
        overtimeHours: 12.0
      }
    },
    {
      id: 3,
      staffId: "NLX2024STF003",
      staffName: "Ama Osei",
      position: "Science Teacher",
      department: "Science",
      email: "ama.osei@nolex.edu.gh",
      phone: "+233 24 345 6789",
      photo: null,
      attendanceStats: {
        totalDays: 102,
        present: 100,
        absent: 1,
        late: 1,
        percentage: 98.0,
        punctualityRate: 97.1
      },
      monthlyAttendance: [
        { month: "January", present: 21, absent: 0, late: 0, total: 21 },
        { month: "February", present: 20, absent: 0, late: 0, total: 20 },
        { month: "March", present: 22, absent: 0, late: 0, total: 22 },
        { month: "April", present: 19, absent: 1, late: 0, total: 20 },
        { month: "May", present: 16, absent: 0, late: 1, total: 17 }
      ],
      recentAttendance: [
        { date: "2024-11-01", status: "Present", timeIn: "07:35", timeOut: "15:30", hoursWorked: 7.92 },
        { date: "2024-10-31", status: "Present", timeIn: "07:40", timeOut: "15:30", hoursWorked: 7.83 },
        { date: "2024-10-30", status: "Present", timeIn: "07:30", timeOut: "15:30", hoursWorked: 8.0 },
        { date: "2024-10-29", status: "Present", timeIn: "07:35", timeOut: "15:30", hoursWorked: 7.92 },
        { date: "2024-10-28", status: "Present", timeIn: "07:40", timeOut: "15:30", hoursWorked: 7.83 }
      ],
      performanceMetrics: {
        onTimeArrival: 97.1,
        earlyDeparture: 1.0,
        averageHoursPerDay: 7.9,
        overtimeHours: 18.5
      }
    },
    {
      id: 4,
      staffId: "NLX2024STF004",
      staffName: "Yaw Darko",
      position: "ICT Coordinator",
      department: "ICT",
      email: "yaw.darko@nolex.edu.gh",
      phone: "+233 24 456 7890",
      photo: null,
      attendanceStats: {
        totalDays: 96,
        present: 90,
        absent: 4,
        late: 2,
        percentage: 93.8,
        punctualityRate: 91.7
      },
      monthlyAttendance: [
        { month: "January", present: 18, absent: 2, late: 1, total: 21 },
        { month: "February", present: 19, absent: 1, late: 0, total: 20 },
        { month: "March", present: 21, absent: 1, late: 0, total: 22 },
        { month: "April", present: 18, absent: 1, late: 1, total: 20 },
        { month: "May", present: 16, absent: 1, late: 0, total: 17 }
      ],
      recentAttendance: [
        { date: "2024-11-01", status: "Present", timeIn: "08:00", timeOut: "15:30", hoursWorked: 7.5 },
        { date: "2024-10-31", status: "Present", timeIn: "07:55", timeOut: "15:30", hoursWorked: 7.58 },
        { date: "2024-10-30", status: "Present", timeIn: "08:05", timeOut: "15:30", hoursWorked: 7.42 },
        { date: "2024-10-29", status: "Present", timeIn: "07:50", timeOut: "15:30", hoursWorked: 7.67 },
        { date: "2024-10-28", status: "Late", timeIn: "08:20", timeOut: "15:30", hoursWorked: 7.17 }
      ],
      performanceMetrics: {
        onTimeArrival: 91.7,
        earlyDeparture: 2.8,
        averageHoursPerDay: 7.5,
        overtimeHours: 14.2
      }
    },
    {
      id: 5,
      staffId: "NLX2024STF005",
      staffName: "Adwoa Frimpong",
      position: "School Nurse",
      department: "Health Services",
      email: "adwoa.frimpong@nolex.edu.gh",
      phone: "+233 24 567 8901",
      photo: null,
      attendanceStats: {
        totalDays: 105,
        present: 98,
        absent: 5,
        late: 2,
        percentage: 93.3,
        punctualityRate: 91.4
      },
      monthlyAttendance: [
        { month: "January", present: 19, absent: 2, late: 0, total: 21 },
        { month: "February", present: 18, absent: 1, late: 1, total: 20 },
        { month: "March", present: 21, absent: 1, late: 0, total: 22 },
        { month: "April", present: 18, absent: 1, late: 1, total: 20 },
        { month: "May", present: 16, absent: 1, late: 0, total: 17 }
      ],
      recentAttendance: [
        { date: "2024-11-01", status: "Present", timeIn: "07:45", timeOut: "15:30", hoursWorked: 7.75 },
        { date: "2024-10-31", status: "Present", timeIn: "07:50", timeOut: "15:30", hoursWorked: 7.67 },
        { date: "2024-10-30", status: "Present", timeIn: "07:40", timeOut: "15:30", hoursWorked: 7.83 },
        { date: "2024-10-29", status: "Absent", timeIn: "", timeOut: "", hoursWorked: 0 },
        { date: "2024-10-28", status: "Present", timeIn: "07:45", timeOut: "15:30", hoursWorked: 7.75 }
      ],
      performanceMetrics: {
        onTimeArrival: 91.4,
        earlyDeparture: 4.2,
        averageHoursPerDay: 7.7,
        overtimeHours: 10.8
      }
    },
    {
      id: 6,
      staffId: "NLX2024STF006",
      staffName: "Kofi Boateng",
      position: "Vice Principal",
      department: "Administration",
      email: "kofi.boateng@nolex.edu.gh",
      phone: "+233 24 678 9012",
      photo: null,
      attendanceStats: {
        totalDays: 108,
        present: 106,
        absent: 1,
        late: 1,
        percentage: 98.1,
        punctualityRate: 97.2
      },
      monthlyAttendance: [
        { month: "January", present: 21, absent: 0, late: 0, total: 21 },
        { month: "February", present: 20, absent: 0, late: 0, total: 20 },
        { month: "March", present: 22, absent: 0, late: 0, total: 22 },
        { month: "April", present: 20, absent: 0, late: 0, total: 20 },
        { month: "May", present: 16, absent: 1, late: 0, total: 17 }
      ],
      recentAttendance: [
        { date: "2024-11-01", status: "Present", timeIn: "07:30", timeOut: "16:00", hoursWorked: 8.5 },
        { date: "2024-10-31", status: "Present", timeIn: "07:25", timeOut: "16:00", hoursWorked: 8.58 },
        { date: "2024-10-30", status: "Present", timeIn: "07:35", timeOut: "16:00", hoursWorked: 8.42 },
        { date: "2024-10-29", status: "Present", timeIn: "07:30", timeOut: "16:00", hoursWorked: 8.5 },
        { date: "2024-10-28", status: "Present", timeIn: "07:30", timeOut: "16:00", hoursWorked: 8.5 }
      ],
      performanceMetrics: {
        onTimeArrival: 97.2,
        earlyDeparture: 0.5,
        averageHoursPerDay: 8.5,
        overtimeHours: 25.0
      }
    },
    {
      id: 7,
      staffId: "NLX2024STF007",
      staffName: "Abena Gyamfi",
      position: "Librarian",
      department: "Library Services",
      email: "abena.gyamfi@nolex.edu.gh",
      phone: "+233 24 789 0123",
      photo: null,
      attendanceStats: {
        totalDays: 85,
        present: 75,
        absent: 8,
        late: 2,
        percentage: 88.2,
        punctualityRate: 86.0
      },
      monthlyAttendance: [
        { month: "January", present: 16, absent: 3, late: 2, total: 21 },
        { month: "February", present: 17, absent: 2, late: 1, total: 20 },
        { month: "March", present: 19, absent: 2, late: 1, total: 22 },
        { month: "April", present: 17, absent: 2, late: 1, total: 20 },
        { month: "May", present: 14, absent: 2, late: 1, total: 17 }
      ],
      recentAttendance: [
        { date: "2024-11-01", status: "Present", timeIn: "08:00", timeOut: "15:00", hoursWorked: 7.0 },
        { date: "2024-10-31", status: "Late", timeIn: "08:30", timeOut: "15:00", hoursWorked: 6.5 },
        { date: "2024-10-30", status: "Present", timeIn: "08:00", timeOut: "15:00", hoursWorked: 7.0 },
        { date: "2024-10-29", status: "Absent", timeIn: "", timeOut: "", hoursWorked: 0 },
        { date: "2024-10-28", status: "Present", timeIn: "08:00", timeOut: "15:00", hoursWorked: 7.0 }
      ],
      performanceMetrics: {
        onTimeArrival: 86.0,
        earlyDeparture: 8.5,
        averageHoursPerDay: 6.8,
        overtimeHours: 8.0
      }
    },
    {
      id: 8,
      staffId: "NLX2024STF008",
      staffName: "Kwame Amoah",
      position: "Security Supervisor",
      department: "Security",
      email: "kwame.amoah@nolex.edu.gh",
      phone: "+233 24 890 1234",
      photo: null,
      attendanceStats: {
        totalDays: 95,
        present: 80,
        absent: 12,
        late: 3,
        percentage: 84.2,
        punctualityRate: 81.1
      },
      monthlyAttendance: [
        { month: "January", present: 15, absent: 4, late: 2, total: 21 },
        { month: "February", present: 16, absent: 3, late: 1, total: 20 },
        { month: "March", present: 18, absent: 3, late: 1, total: 22 },
        { month: "April", present: 16, absent: 3, late: 1, total: 20 },
        { month: "May", present: 13, absent: 3, late: 1, total: 17 }
      ],
      recentAttendance: [
        { date: "2024-11-01", status: "Absent", timeIn: "", timeOut: "", hoursWorked: 0 },
        { date: "2024-10-31", status: "Present", timeIn: "06:00", timeOut: "14:00", hoursWorked: 8.0 },
        { date: "2024-10-30", status: "Present", timeIn: "06:00", timeOut: "14:00", hoursWorked: 8.0 },
        { date: "2024-10-29", status: "Late", timeIn: "06:30", timeOut: "14:00", hoursWorked: 7.5 },
        { date: "2024-10-28", status: "Present", timeIn: "06:00", timeOut: "14:00", hoursWorked: 8.0 }
      ],
      performanceMetrics: {
        onTimeArrival: 81.1,
        earlyDeparture: 5.5,
        averageHoursPerDay: 7.7,
        overtimeHours: 12.5
      }
    }
  ];
  
  return staffAttendanceData.find(staff => staff.id === parseInt(id));
};

interface StaffAttendanceDetailPageProps {
  params: {
    id: string;
  };
}

export default function StaffAttendanceDetailPage({ params }: StaffAttendanceDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMonth, setSelectedMonth] = useState("all");
  
  const staff = getStaffAttendanceById(params.id);

  if (!staff) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Staff Member Not Found</h3>
          <p className="text-gray-600 mb-4">The requested staff member could not be found.</p>
          <Link
            href="/headmaster/staff/attendance"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Staff Attendance
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800";
      case "Absent": return "bg-red-100 text-red-800";
      case "Late": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Absent": return <XCircle className="w-4 h-4 text-red-600" />;
      case "Late": return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "daily", label: "Daily Records", icon: Calendar },
    { id: "monthly", label: "Monthly Summary", icon: TrendingUp },
    { id: "leave", label: "Leave Records", icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/headmaster/staff/attendance"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{staff.staffName}</h1>
                  <p className="text-blue-100">{staff.position} • {staff.staffId}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm text-center">
                <p className="text-sm font-medium">Attendance Rate</p>
                <p className="text-2xl font-bold">{staff.attendanceStats.percentage}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Present Days</p>
              <p className="text-2xl font-bold text-gray-900">{staff.attendanceStats.present}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Absent Days</p>
              <p className="text-2xl font-bold text-gray-900">{staff.attendanceStats.absent}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Late Days</p>
              <p className="text-2xl font-bold text-gray-900">{staff.attendanceStats.late}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Punctuality</p>
              <p className="text-2xl font-bold text-gray-900">{staff.attendanceStats.punctualityRate}%</p>
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
              {/* Performance Metrics */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">On-Time Arrival</h4>
                    <p className="text-2xl font-bold text-green-600">{staff.performanceMetrics.onTimeArrival}%</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Early Departure</h4>
                    <p className="text-2xl font-bold text-red-600">{staff.performanceMetrics.earlyDeparture}%</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Avg Hours/Day</h4>
                    <p className="text-2xl font-bold text-blue-600">{staff.performanceMetrics.averageHoursPerDay}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Overtime Hours</h4>
                    <p className="text-2xl font-bold text-purple-600">{staff.performanceMetrics.overtimeHours}</p>
                  </div>
                </div>
              </div>

              {/* Recent Attendance Summary */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Attendance (Last 7 Days)</h3>
                <div className="space-y-3">
                  {staff.recentAttendance.slice(0, 7).map((record, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(record.status)}
                        <div>
                          <h4 className="font-medium text-gray-900">{record.date}</h4>
                          <p className="text-sm text-gray-600">{record.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {record.timeIn} - {record.timeOut}
                        </p>
                        <p className="text-sm text-gray-600">{record.hoursWorked} hours</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff Information */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Staff Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Department</label>
                    <p className="text-gray-900 font-medium">{staff.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Position</label>
                    <p className="text-gray-900 font-medium">{staff.position}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900 font-medium">{staff.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-gray-900 font-medium">{staff.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "daily" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Daily Attendance Records</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Time In</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Time Out</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Hours Worked</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.recentAttendance.map((record, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{record.date}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-900">{record.timeIn}</td>
                          <td className="py-3 px-4 text-gray-900">{record.timeOut}</td>
                          <td className="py-3 px-4 text-gray-900">{record.hoursWorked} hours</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "monthly" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Attendance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {staff.monthlyAttendance.map((month, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">{month.month}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Present:</span>
                          <span className="text-green-600 font-medium">{month.present}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Absent:</span>
                          <span className="text-red-600 font-medium">{month.absent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Late:</span>
                          <span className="text-yellow-600 font-medium">{month.late}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-600">Total:</span>
                          <span className="font-bold text-gray-900">{month.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rate:</span>
                          <span className="font-bold text-blue-600">
                            {((month.present / month.total) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "leave" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Leave Records</h3>
                <div className="space-y-4">
                  {staff.leaveRecords.map((leave, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{leave.type}</h4>
                        <p className="text-sm text-gray-600">
                          {leave.startDate} to {leave.endDate} ({leave.days} day{leave.days > 1 ? 's' : ''})
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        leave.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {leave.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
        <Link
          href={`/headmaster/staff/${staff.id}`}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
        >
          <Eye className="w-5 h-5" />
          View Full Profile
        </Link>
      </div>
    </div>
  );
}
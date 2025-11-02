"use client"

import { useState } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Download,
  Eye,
  User,
  Mail,
  Phone,
  Building,
  Filter,
  Search,
  Target,
  Award,
  Activity
} from "lucide-react";
import Link from "next/link";

// Mock department attendance data
const getDepartmentAttendanceData = (department: string) => {
  const departmentName = department.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const departmentData = {
    mathematics: {
      name: "Mathematics",
      totalStaff: 8,
      presentToday: 7,
      absentToday: 1,
      lateToday: 0,
      attendanceRate: 87.5,
      punctualityRate: 100.0,
      staffList: [
        {
          id: 1,
          name: "Akosua Mensah",
          employeeId: "NLX2024STAFF001",
          position: "Senior Mathematics Teacher",
          email: "akosua.mensah@nolex.edu.gh",
          phone: "+233 24 123 4567",
          todayStatus: "Present",
          timeIn: "07:45",
          timeOut: "15:30",
          weeklyAttendance: 95.0,
          monthlyAttendance: 92.3
        },
        {
          id: 9,
          name: "Kwame Osei",
          employeeId: "NLX2024STAFF009",
          position: "Mathematics Teacher",
          email: "kwame.osei@nolex.edu.gh",
          phone: "+233 24 234 5678",
          todayStatus: "Present",
          timeIn: "07:50",
          timeOut: "15:30",
          weeklyAttendance: 90.0,
          monthlyAttendance: 88.5
        },
        {
          id: 10,
          name: "Ama Boateng",
          employeeId: "NLX2024STAFF010",
          position: "Mathematics Teacher",
          email: "ama.boateng@nolex.edu.gh",
          phone: "+233 24 345 6789",
          todayStatus: "Absent",
          timeIn: "",
          timeOut: "",
          weeklyAttendance: 80.0,
          monthlyAttendance: 82.1
        }
      ],
      weeklyTrend: [
        { day: "Monday", present: 8, absent: 0, rate: 100 },
        { day: "Tuesday", present: 7, absent: 1, rate: 87.5 },
        { day: "Wednesday", present: 8, absent: 0, rate: 100 },
        { day: "Thursday", present: 6, absent: 2, rate: 75 },
        { day: "Friday", present: 7, absent: 1, rate: 87.5 }
      ],
      monthlyStats: {
        totalDays: 22,
        avgPresent: 7.2,
        avgAbsent: 0.8,
        avgRate: 90.0
      }
    },
    english: {
      name: "English",
      totalStaff: 6,
      presentToday: 6,
      absentToday: 0,
      lateToday: 0,
      attendanceRate: 100.0,
      punctualityRate: 100.0,
      staffList: [
        {
          id: 2,
          name: "Kwaku Asante",
          employeeId: "NLX2024STAFF002",
          position: "Senior English Teacher",
          email: "kwaku.asante@nolex.edu.gh",
          phone: "+233 24 234 5678",
          todayStatus: "Present",
          timeIn: "07:40",
          timeOut: "15:30",
          weeklyAttendance: 100.0,
          monthlyAttendance: 96.7
        }
      ],
      weeklyTrend: [
        { day: "Monday", present: 6, absent: 0, rate: 100 },
        { day: "Tuesday", present: 6, absent: 0, rate: 100 },
        { day: "Wednesday", present: 5, absent: 1, rate: 83.3 },
        { day: "Thursday", present: 6, absent: 0, rate: 100 },
        { day: "Friday", present: 6, absent: 0, rate: 100 }
      ],
      monthlyStats: {
        totalDays: 22,
        avgPresent: 5.8,
        avgAbsent: 0.2,
        avgRate: 96.7
      }
    },
    science: {
      name: "Science",
      totalStaff: 5,
      presentToday: 5,
      absentToday: 0,
      lateToday: 0,
      attendanceRate: 100.0,
      punctualityRate: 100.0,
      staffList: [
        {
          id: 3,
          name: "Ama Osei",
          employeeId: "NLX2024STAFF003",
          position: "Senior Science Teacher",
          email: "ama.osei@nolex.edu.gh",
          phone: "+233 24 345 6789",
          todayStatus: "Present",
          timeIn: "07:35",
          timeOut: "15:30",
          weeklyAttendance: 100.0,
          monthlyAttendance: 98.0
        }
      ],
      weeklyTrend: [
        { day: "Monday", present: 5, absent: 0, rate: 100 },
        { day: "Tuesday", present: 5, absent: 0, rate: 100 },
        { day: "Wednesday", present: 5, absent: 0, rate: 100 },
        { day: "Thursday", present: 4, absent: 1, rate: 80 },
        { day: "Friday", present: 5, absent: 0, rate: 100 }
      ],
      monthlyStats: {
        totalDays: 22,
        avgPresent: 4.9,
        avgAbsent: 0.1,
        avgRate: 98.0
      }
    }
  };

  const defaultData = {
    name: departmentName,
    totalStaff: 3,
    presentToday: 2,
    absentToday: 1,
    lateToday: 0,
    attendanceRate: 66.7,
    punctualityRate: 100.0,
    staffList: [
      {
        id: 11,
        name: "Staff Member",
        employeeId: "NLX2024STAFF011",
        position: `${departmentName} Staff`,
        email: "staff@nolex.edu.gh",
        phone: "+233 24 000 0000",
        todayStatus: "Present",
        timeIn: "08:00",
        timeOut: "15:30",
        weeklyAttendance: 85.0,
        monthlyAttendance: 80.0
      }
    ],
    weeklyTrend: [
      { day: "Monday", present: 3, absent: 0, rate: 100 },
      { day: "Tuesday", present: 2, absent: 1, rate: 66.7 },
      { day: "Wednesday", present: 3, absent: 0, rate: 100 },
      { day: "Thursday", present: 2, absent: 1, rate: 66.7 },
      { day: "Friday", present: 2, absent: 1, rate: 66.7 }
    ],
    monthlyStats: {
      totalDays: 22,
      avgPresent: 2.4,
      avgAbsent: 0.6,
      avgRate: 80.0
    }
  };

  return departmentData[department.toLowerCase()] || defaultData;
};

interface DepartmentAttendancePageProps {
  params: {
    department: string;
  };
}

export default function DepartmentAttendancePage({ params }: DepartmentAttendancePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  
  const departmentData = getDepartmentAttendanceData(params.department);

  const filteredStaff = departmentData.staffList.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      case "Present": return <CheckCircle className="w-4 h-4" />;
      case "Absent": return <XCircle className="w-4 h-4" />;
      case "Late": return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/headmaster/staff/attendance"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Building className="w-8 h-8" />
                  {departmentData.name} Department
                </h1>
                <p className="text-purple-100 mt-1">Attendance overview and management</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Today's Date</p>
              <p className="text-lg font-bold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">{departmentData.totalStaff}</p>
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
              <p className="text-2xl font-bold text-gray-900">{departmentData.presentToday}</p>
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
              <p className="text-2xl font-bold text-gray-900">{departmentData.absentToday}</p>
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
              <p className="text-2xl font-bold text-gray-900">{departmentData.attendanceRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Punctuality</p>
              <p className="text-2xl font-bold text-gray-900">{departmentData.punctualityRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Trend Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Attendance Trend</h3>
        <div className="grid grid-cols-5 gap-4">
          {departmentData.weeklyTrend.map((day, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-100 rounded-lg p-4 mb-2">
                <div className={`h-16 rounded flex items-end justify-center ${
                  day.rate >= 90 ? 'bg-green-500' : 
                  day.rate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                }`} style={{ height: `${day.rate}px` }}>
                  <span className="text-white text-xs font-bold mb-1">{day.rate}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700">{day.day}</p>
              <p className="text-xs text-gray-500">{day.present}/{day.present + day.absent}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Staff List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Staff Member</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Position</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Today's Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Time In</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Time Out</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Weekly Rate</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Monthly Rate</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{staff.name}</p>
                        <p className="text-sm text-gray-500">{staff.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900">{staff.position}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 w-fit ${getStatusColor(staff.todayStatus)}`}>
                      {getStatusIcon(staff.todayStatus)}
                      {staff.todayStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900 font-medium">
                      {staff.timeIn || "—"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900 font-medium">
                      {staff.timeOut || "—"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{staff.weeklyAttendance}%</span>
                      {staff.weeklyAttendance >= 90 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{staff.monthlyAttendance}%</span>
                      {staff.monthlyAttendance >= 90 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Link
                      href={`/headmaster/staff/attendance/${staff.id}`}
                      className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No staff found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
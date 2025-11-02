"use client"

import { useState } from "react";
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowLeft,
  Download,
  FileText,
  Eye,
  Edit3,
  Filter,
  Search,
  BarChart3,
  TrendingUp,
  School,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

// Mock data based on grade parameter
const getGradeData = (grade: string) => {
  const gradeMap: { [key: string]: any } = {
    "nursery-1": {
      gradeName: "Nursery 1",
      classes: [
        { id: 1, name: "N1A", total: 12, present: 11, absent: 1, late: 0, rate: 91.7 },
        { id: 2, name: "N1B", total: 13, present: 13, absent: 0, late: 0, rate: 100.0 }
      ],
      totalStudents: 25,
      presentToday: 24,
      absentToday: 1,
      lateToday: 0,
      overallRate: 96.0
    },
    "nursery-2": {
      gradeName: "Nursery 2", 
      classes: [
        { id: 3, name: "N2A", total: 14, present: 13, absent: 1, late: 0, rate: 92.9 },
        { id: 4, name: "N2B", total: 14, present: 14, absent: 0, late: 0, rate: 100.0 }
      ],
      totalStudents: 28,
      presentToday: 27,
      absentToday: 1,
      lateToday: 0,
      overallRate: 96.4
    },
    "kindergarten-1": {
      gradeName: "Kindergarten 1",
      classes: [
        { id: 5, name: "K1A", total: 11, present: 10, absent: 1, late: 0, rate: 90.9 },
        { id: 6, name: "K1B", total: 11, present: 11, absent: 0, late: 0, rate: 100.0 },
        { id: 7, name: "K1C", total: 10, present: 10, absent: 0, late: 0, rate: 100.0 }
      ],
      totalStudents: 32,
      presentToday: 31,
      absentToday: 1,
      lateToday: 0,
      overallRate: 96.9
    },
    "kindergarten-2": {
      gradeName: "Kindergarten 2",
      classes: [
        { id: 8, name: "K2A", total: 15, present: 14, absent: 0, late: 1, rate: 93.3 },
        { id: 9, name: "K2B", total: 15, present: 15, absent: 0, late: 0, rate: 100.0 }
      ],
      totalStudents: 30,
      presentToday: 29,
      absentToday: 0,
      lateToday: 1,
      overallRate: 96.7
    },
    "grade-1": {
      gradeName: "Grade 1",
      classes: [
        { id: 10, name: "1A", total: 12, present: 11, absent: 1, late: 0, rate: 91.7 },
        { id: 11, name: "1B", total: 12, present: 11, absent: 1, late: 0, rate: 91.7 },
        { id: 12, name: "1C", total: 11, present: 11, absent: 0, late: 0, rate: 100.0 }
      ],
      totalStudents: 35,
      presentToday: 33,
      absentToday: 2,
      lateToday: 0,
      overallRate: 94.3
    },
    "grade-2": {
      gradeName: "Grade 2",
      classes: [
        { id: 13, name: "2A", total: 17, present: 16, absent: 1, late: 0, rate: 94.1 },
        { id: 14, name: "2B", total: 16, present: 16, absent: 0, late: 0, rate: 100.0 }
      ],
      totalStudents: 33,
      presentToday: 32,
      absentToday: 1,
      lateToday: 0,
      overallRate: 97.0
    },
    "grade-3": {
      gradeName: "Grade 3",
      classes: [
        { id: 15, name: "3A", total: 15, present: 14, absent: 1, late: 0, rate: 93.3 },
        { id: 16, name: "3B", total: 15, present: 15, absent: 0, late: 0, rate: 100.0 }
      ],
      totalStudents: 30,
      presentToday: 29,
      absentToday: 1,
      lateToday: 0,
      overallRate: 96.7
    },
    "grade-4": {
      gradeName: "Grade 4",
      classes: [
        { id: 17, name: "4A", total: 16, present: 14, absent: 1, late: 1, rate: 87.5 },
        { id: 18, name: "4B", total: 16, present: 15, absent: 1, late: 0, rate: 93.8 }
      ],
      totalStudents: 32,
      presentToday: 29,
      absentToday: 2,
      lateToday: 1,
      overallRate: 90.6
    },
    "grade-5": {
      gradeName: "Grade 5",
      classes: [
        { id: 19, name: "5A", total: 14, present: 13, absent: 1, late: 0, rate: 92.9 },
        { id: 20, name: "5B", total: 14, present: 14, absent: 0, late: 0, rate: 100.0 }
      ],
      totalStudents: 28,
      presentToday: 27,
      absentToday: 1,
      lateToday: 0,
      overallRate: 96.4
    },
    "grade-6": {
      gradeName: "Grade 6",
      classes: [
        { id: 21, name: "6A", total: 27, present: 26, absent: 0, late: 1, rate: 96.3 }
      ],
      totalStudents: 27,
      presentToday: 26,
      absentToday: 0,
      lateToday: 1,
      overallRate: 96.3
    }
  };
  
  return gradeMap[grade] || gradeMap["grade-1"];
};

interface GradeAttendancePageProps {
  params: {
    grade: string;
  };
}

export default function GradeAttendancePage({ params }: GradeAttendancePageProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const gradeData = getGradeData(params.grade);
  
  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return "text-green-600 bg-green-100";
    if (rate >= 90) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };
  
  const filteredClasses = gradeData.classes.filter((cls: any) =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <School className="w-8 h-8" />
                  {gradeData.gradeName} Attendance
                </h1>
              </div>
              <p className="text-indigo-100">Detailed attendance overview for {gradeData.gradeName}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium">Today's Date</p>
                <p className="text-lg font-bold">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium">Overall Rate</p>
                <p className="text-lg font-bold">{gradeData.overallRate}%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Grade Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{gradeData.totalStudents}</p>
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
              <p className="text-2xl font-bold text-gray-900">{gradeData.presentToday}</p>
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
              <p className="text-2xl font-bold text-gray-900">{gradeData.absentToday}</p>
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
              <p className="text-2xl font-bold text-gray-900">{gradeData.lateToday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            Class-wise Breakdown
          </h3>
          <div className="flex gap-3">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generate PDF
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Classes</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by class name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Class Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredClasses.map((classItem: any) => (
          <div key={classItem.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900">{classItem.name}</h4>
                <p className="text-sm text-gray-600">{gradeData.gradeName}</p>
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
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor(classItem.rate)}`}>
                {classItem.rate}%
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

      {/* Grade Performance Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          {gradeData.gradeName} Performance Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Overall Statistics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Classes:</span>
                <span className="font-medium">{gradeData.classes.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Students:</span>
                <span className="font-medium">{gradeData.totalStudents}</span>
              </div>
              <div className="flex justify-between">
                <span>Present Today:</span>
                <span className="text-green-600 font-medium">{gradeData.presentToday}</span>
              </div>
              <div className="flex justify-between">
                <span>Absent Today:</span>
                <span className="text-red-600 font-medium">{gradeData.absentToday}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span>Overall Rate:</span>
                <span className="font-bold text-green-600">{gradeData.overallRate}%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Class Performance</h4>
            <div className="space-y-2 text-sm">
              {gradeData.classes
                .sort((a: any, b: any) => b.rate - a.rate)
                .map((cls: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <span>{cls.name}:</span>
                  <span className={`font-medium ${cls.rate >= 95 ? 'text-green-600' : cls.rate >= 90 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {cls.rate}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Grade Status</h4>
            <div className="space-y-3">
              {gradeData.overallRate >= 95 ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Excellent Performance</span>
                </div>
              ) : gradeData.overallRate >= 90 ? (
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Good Performance</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Needs Attention</span>
                </div>
              )}
              
              <div className="text-sm text-gray-600">
                <p>Target: 95%</p>
                <p>Current: {gradeData.overallRate}%</p>
                <p className={`${gradeData.overallRate >= 95 ? 'text-green-600' : 'text-red-600'}`}>
                  {gradeData.overallRate >= 95 ? 'Target Met ✓' : `${(95 - gradeData.overallRate).toFixed(1)}% to target`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
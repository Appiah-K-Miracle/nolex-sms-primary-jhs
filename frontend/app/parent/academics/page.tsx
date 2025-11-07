"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Clock, 
  Target, 
  Award, 
  BarChart3, 
  PieChart, 
  Download, 
  Filter, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  Star,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  GraduationCap,
  FileText,
  Zap,
  Activity,
  LineChart,
  User,
  BookmarkCheck,
  Calendar as CalendarIcon,
  ClockIcon
} from "lucide-react";

interface SubjectPerformance {
  subject: string;
  currentGrade: string;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  teacher: string;
  lastTest: {
    score: number;
    date: string;
    total: number;
  };
  assignments: {
    completed: number;
    total: number;
    avgScore: number;
  };
  attendance: number;
}

interface ChildData {
  id: number;
  name: string;
  class: string;
  overallGPA: number;
  rank: number;
  totalStudents: number;
  attendance: number;
  subjects: SubjectPerformance[];
}

export default function AcademicsPage() {
  const [selectedChild, setSelectedChild] = useState<number>(1);
  const [selectedTerm, setSelectedTerm] = useState("current");
  const [viewType, setViewType] = useState<'overview' | 'detailed'>('overview');

  // Sample academic data
  const childrenData: ChildData[] = [
    {
      id: 1,
      name: "Kwame Mensah",
      class: "JHS 2",
      overallGPA: 3.4,
      rank: 8,
      totalStudents: 45,
      attendance: 95,
      subjects: [
        {
          subject: "Mathematics",
          currentGrade: "A",
          percentage: 85,
          trend: "up",
          teacher: "Mr. Osei",
          lastTest: { score: 85, date: "2025-11-03", total: 100 },
          assignments: { completed: 8, total: 10, avgScore: 82 },
          attendance: 98
        },
        {
          subject: "English Language",
          currentGrade: "B+",
          percentage: 78,
          trend: "stable",
          teacher: "Mrs. Addo",
          lastTest: { score: 76, date: "2025-11-01", total: 100 },
          assignments: { completed: 9, total: 10, avgScore: 79 },
          attendance: 96
        },
        {
          subject: "Science",
          currentGrade: "A-",
          percentage: 82,
          trend: "up",
          teacher: "Dr. Asante",
          lastTest: { score: 84, date: "2025-10-30", total: 100 },
          assignments: { completed: 7, total: 8, avgScore: 85 },
          attendance: 94
        },
        {
          subject: "Social Studies",
          currentGrade: "B",
          percentage: 75,
          trend: "down",
          teacher: "Mr. Boateng",
          lastTest: { score: 72, date: "2025-10-28", total: 100 },
          assignments: { completed: 6, total: 8, avgScore: 73 },
          attendance: 92
        },
        {
          subject: "ICT",
          currentGrade: "A",
          percentage: 88,
          trend: "up",
          teacher: "Ms. Owusu",
          lastTest: { score: 90, date: "2025-11-02", total: 100 },
          assignments: { completed: 10, total: 10, avgScore: 87 },
          attendance: 100
        },
        {
          subject: "French",
          currentGrade: "B-",
          percentage: 70,
          trend: "stable",
          teacher: "Mme. Kone",
          lastTest: { score: 68, date: "2025-10-29", total: 100 },
          assignments: { completed: 5, total: 7, avgScore: 71 },
          attendance: 89
        }
      ]
    },
    {
      id: 2,
      name: "Ama Mensah",
      class: "Primary 5",
      overallGPA: 3.7,
      rank: 3,
      totalStudents: 38,
      attendance: 98,
      subjects: [
        {
          subject: "Mathematics",
          currentGrade: "A",
          percentage: 88,
          trend: "up",
          teacher: "Mrs. Asante",
          lastTest: { score: 89, date: "2025-11-03", total: 100 },
          assignments: { completed: 9, total: 10, avgScore: 87 },
          attendance: 100
        },
        {
          subject: "English Language",
          currentGrade: "A-",
          percentage: 85,
          trend: "up",
          teacher: "Mr. Adjei",
          lastTest: { score: 86, date: "2025-11-01", total: 100 },
          assignments: { completed: 10, total: 10, avgScore: 84 },
          attendance: 98
        },
        {
          subject: "Science",
          currentGrade: "B+",
          percentage: 80,
          trend: "stable",
          teacher: "Dr. Mensah",
          lastTest: { score: 78, date: "2025-10-30", total: 100 },
          assignments: { completed: 8, total: 9, avgScore: 81 },
          attendance: 96
        },
        {
          subject: "Social Studies",
          currentGrade: "A",
          percentage: 90,
          trend: "up",
          teacher: "Mrs. Tetteh",
          lastTest: { score: 92, date: "2025-10-28", total: 100 },
          assignments: { completed: 9, total: 9, avgScore: 89 },
          attendance: 99
        },
        {
          subject: "Creative Arts",
          currentGrade: "A",
          percentage: 92,
          trend: "up",
          teacher: "Ms. Nkrumah",
          lastTest: { score: 95, date: "2025-11-02", total: 100 },
          assignments: { completed: 8, total: 8, avgScore: 93 },
          attendance: 100
        },
        {
          subject: "Physical Education",
          currentGrade: "B+",
          percentage: 78,
          trend: "stable",
          teacher: "Mr. Akoto",
          lastTest: { score: 80, date: "2025-10-29", total: 100 },
          assignments: { completed: 6, total: 7, avgScore: 77 },
          attendance: 94
        }
      ]
    }
  ];

  const selectedChildData = childrenData.find(child => child.id === selectedChild);

  const getGradeColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 bg-green-50";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-50";
    if (percentage >= 60) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return "text-green-600";
    if (percentage >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 flex items-center gap-3">
              <BookOpen className="w-8 h-8 lg:w-10 lg:h-10" />
              Academic Reports
            </h1>
            <p className="text-blue-100 text-sm lg:text-base xl:text-lg">
              Comprehensive overview of your children's academic performance
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <button className="bg-white text-blue-600 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Download className="w-4 h-4 lg:w-5 lg:h-5" />
              Download Report
            </button>
            <Link
              href="/parent/academics/progress"
              className="bg-blue-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base"
            >
              <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5" />
              Progress Tracking
            </Link>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Child Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Student:</label>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {childrenData.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.class})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Term:</label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="current">Current Term</option>
                <option value="previous">Previous Term</option>
                <option value="year">Full Academic Year</option>
              </select>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewType('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewType === 'overview' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setViewType('detailed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewType === 'detailed' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Detailed
            </button>
          </div>
        </div>
      </div>

      {selectedChildData && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Overall GPA</h3>
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {selectedChildData.overallGPA}
              </div>
              <p className="text-xs lg:text-sm text-gray-600">Out of 4.0</p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Class Rank</h3>
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                #{selectedChildData.rank}
              </div>
              <p className="text-xs lg:text-sm text-gray-600">of {selectedChildData.totalStudents}</p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Attendance</h3>
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div className={`text-2xl lg:text-3xl font-bold mb-1 ${getAttendanceColor(selectedChildData.attendance)}`}>
                {selectedChildData.attendance}%
              </div>
              <p className="text-xs lg:text-sm text-gray-600">This term</p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Subjects</h3>
                <BookOpen className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {selectedChildData.subjects.length}
              </div>
              <p className="text-xs lg:text-sm text-gray-600">
                {selectedChildData.subjects.filter(s => s.percentage >= 80).length} above 80%
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <Link
              href="/parent/academics/grades"
              className="bg-white rounded-lg lg:rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 lg:p-6 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Grade Reports</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Detailed grade breakdown by subject and assessment
                  </p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    View Reports
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Link>

            <Link
              href="/parent/academics/attendance"
              className="bg-white rounded-lg lg:rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 lg:p-6 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Attendance Tracking</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Monitor daily attendance and punctuality records
                  </p>
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    View Attendance
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ClockIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Link>

            <Link
              href="/parent/academics/progress"
              className="bg-white rounded-lg lg:rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 lg:p-6 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Analysis</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Visual charts and trends of academic progress
                  </p>
                  <div className="flex items-center text-purple-600 text-sm font-medium">
                    View Charts
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <LineChart className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Link>
          </div>

          {/* Subject Performance */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm">
            <div className="p-4 lg:p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Subject Performance</h2>
              <p className="text-sm text-gray-600 mt-1">Current term academic standing by subject</p>
            </div>

            <div className="p-4 lg:p-6">
              {viewType === 'overview' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  {selectedChildData.subjects.map((subject, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 lg:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{subject.subject}</h3>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(subject.trend)}
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(subject.percentage)}`}>
                            {subject.currentGrade}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current Score:</span>
                          <span className="font-medium">{subject.percentage}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Teacher:</span>
                          <span className="font-medium">{subject.teacher}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Attendance:</span>
                          <span className={`font-medium ${getAttendanceColor(subject.attendance)}`}>
                            {subject.attendance}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              subject.percentage >= 80 ? 'bg-green-500' :
                              subject.percentage >= 70 ? 'bg-yellow-500' : 
                              subject.percentage >= 60 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${subject.percentage}%` }}
                          ></div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="text-center">
                            <p className="text-xs text-gray-600">Last Test</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {subject.lastTest.score}/{subject.lastTest.total}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-600">Assignments</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {subject.assignments.completed}/{subject.assignments.total}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Detailed View */
                <div className="space-y-6">
                  {selectedChildData.subjects.map((subject, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                          <h3 className="text-xl font-semibold text-gray-900">{subject.subject}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(subject.percentage)}`}>
                            {subject.currentGrade} ({subject.percentage}%)
                          </span>
                          {getTrendIcon(subject.trend)}
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Teacher: <span className="font-medium text-gray-900">{subject.teacher}</span></p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-blue-900 mb-2">Last Test</h4>
                          <p className="text-lg font-bold text-blue-700">
                            {subject.lastTest.score}/{subject.lastTest.total}
                          </p>
                          <p className="text-xs text-blue-600">
                            {new Date(subject.lastTest.date).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-green-900 mb-2">Assignments</h4>
                          <p className="text-lg font-bold text-green-700">
                            {subject.assignments.completed}/{subject.assignments.total}
                          </p>
                          <p className="text-xs text-green-600">
                            Avg: {subject.assignments.avgScore}%
                          </p>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-purple-900 mb-2">Attendance</h4>
                          <p className={`text-lg font-bold ${getAttendanceColor(subject.attendance)}`}>
                            {subject.attendance}%
                          </p>
                          <p className="text-xs text-purple-600">This term</p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-orange-900 mb-2">Performance</h4>
                          <p className="text-lg font-bold text-orange-700">
                            {subject.percentage >= 80 ? 'Excellent' :
                             subject.percentage >= 70 ? 'Good' :
                             subject.percentage >= 60 ? 'Average' : 'Needs Improvement'}
                          </p>
                          <p className="text-xs text-orange-600">Current level</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress to A Grade (80%)</span>
                          <span>{subject.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${
                              subject.percentage >= 80 ? 'bg-green-500' :
                              subject.percentage >= 70 ? 'bg-yellow-500' : 
                              subject.percentage >= 60 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(subject.percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
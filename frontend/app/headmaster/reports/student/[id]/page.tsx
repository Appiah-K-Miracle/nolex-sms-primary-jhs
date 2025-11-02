"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Printer, 
  Edit3, 
  Trash2, 
  Calendar, 
  User, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Award, 
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw
} from "lucide-react";

export default function StudentReportDetailPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [reportDetail, setReportDetail] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample detailed report data based on ID
  const reportDatabase = {
    "1": {
      id: 1,
      title: "Academic Performance Summary - Grade 6",
      type: "Academic Performance",
      description: "Comprehensive analysis of Grade 6 student performance across all subjects for the first quarter",
      generatedDate: "2025-11-01",
      generatedBy: "John Smith",
      status: "completed",
      fileSize: "2.4 MB",
      downloadCount: 45,
      lastDownloaded: "2025-11-02",
      
      // Academic Performance Specific Data
      studentCount: 120,
      subjectCount: 8,
      averageScore: 78.5,
      passRate: 92.3,
      topPerformers: 15,
      needsAttention: 8,
      
      // Subject breakdown
      subjects: [
        { name: "Mathematics", average: 82.4, passRate: 95.0, topScore: 98, lowScore: 45 },
        { name: "English Language", average: 79.8, passRate: 90.8, topScore: 96, lowScore: 52 },
        { name: "Science", average: 76.2, passRate: 88.3, topScore: 94, lowScore: 38 },
        { name: "Social Studies", average: 81.1, passRate: 93.3, topScore: 97, lowScore: 48 },
        { name: "French", average: 73.5, passRate: 85.0, topScore: 92, lowScore: 35 },
        { name: "ICT", average: 85.3, passRate: 96.7, topScore: 99, lowScore: 58 },
        { name: "Creative Arts", average: 88.1, passRate: 98.3, topScore: 100, lowScore: 65 },
        { name: "Physical Education", average: 90.2, passRate: 100.0, topScore: 100, lowScore: 72 }
      ],
      
      // Performance categories
      performanceBreakdown: {
        excellent: { count: 28, percentage: 23.3, range: "90-100%" },
        veryGood: { count: 45, percentage: 37.5, range: "80-89%" },
        good: { count: 32, percentage: 26.7, range: "70-79%" },
        satisfactory: { count: 12, percentage: 10.0, range: "60-69%" },
        needsImprovement: { count: 3, percentage: 2.5, range: "Below 60%" }
      },
      
      // Top performers
      topStudents: [
        { id: "STU001", name: "Sarah Johnson", average: 96.8, rank: 1 },
        { id: "STU045", name: "Michael Chen", average: 95.2, rank: 2 },
        { id: "STU023", name: "Aisha Osei", average: 94.7, rank: 3 },
        { id: "STU067", name: "David Mensah", average: 93.9, rank: 4 },
        { id: "STU089", name: "Grace Asante", average: 93.1, rank: 5 }
      ],
      
      // Students needing attention
      strugglingStudents: [
        { id: "STU012", name: "John Boateng", average: 48.2, subjects: ["Mathematics", "Science"] },
        { id: "STU078", name: "Mary Addo", average: 52.8, subjects: ["English", "French"] },
        { id: "STU034", name: "Prince Owusu", average: 56.1, subjects: ["Mathematics", "Social Studies"] }
      ],
      
      // Insights and recommendations
      insights: [
        {
          type: "strength",
          title: "Strong Performance in Creative Arts & PE",
          description: "Students excel in practical subjects with 98.3% and 100% pass rates respectively"
        },
        {
          type: "concern",
          title: "Mathematics & Science Challenges",
          description: "8 students struggling in core STEM subjects require additional support"
        },
        {
          type: "recommendation",
          title: "Implement Peer Tutoring Program",
          description: "Top performers could mentor struggling students in Mathematics and Science"
        }
      ]
    },
    
    "2": {
      id: 2,
      title: "Attendance Analysis - October 2025",
      type: "Attendance",
      description: "Monthly attendance tracking and analysis for all students across all grade levels",
      generatedDate: "2025-10-31",
      generatedBy: "Mary Johnson",
      status: "completed",
      fileSize: "1.8 MB",
      downloadCount: 32,
      lastDownloaded: "2025-11-01",
      
      // Attendance Specific Data
      studentCount: 450,
      schoolDays: 22,
      totalPossibleAttendance: 9900,
      totalPresent: 9326,
      averageAttendance: 94.2,
      perfectAttendance: 67,
      chronicAbsent: 12,
      tardyCount: 89,
      
      // Grade level breakdown
      gradeBreakdown: [
        { grade: "Grade 1", students: 60, attendance: 96.8, absences: 42 },
        { grade: "Grade 2", students: 58, attendance: 95.4, absences: 59 },
        { grade: "Grade 3", students: 62, attendance: 94.1, absences: 81 },
        { grade: "Grade 4", students: 65, attendance: 93.7, absences: 90 },
        { grade: "Grade 5", students: 68, attendance: 92.8, absences: 108 },
        { grade: "Grade 6", students: 67, attendance: 93.2, absences: 101 },
        { grade: "JHS 1", students: 70, attendance: 94.5, absences: 85 }
      ],
      
      // Daily attendance pattern
      dailyPattern: [
        { day: "Monday", attendance: 92.1, absences: 36 },
        { day: "Tuesday", attendance: 95.8, absences: 19 },
        { day: "Wednesday", attendance: 96.2, absences: 17 },
        { day: "Thursday", attendance: 94.9, absences: 23 },
        { day: "Friday", attendance: 91.5, absences: 38 }
      ],
      
      insights: [
        {
          type: "concern",
          title: "Monday & Friday Attendance Drops",
          description: "Attendance rates drop significantly on Mondays (92.1%) and Fridays (91.5%)"
        },
        {
          type: "strength",
          title: "Mid-week Consistency",
          description: "Excellent attendance on Tuesday-Thursday with rates above 94%"
        },
        {
          type: "recommendation",
          title: "Weekend Activity Program",
          description: "Consider engaging weekend programs to improve Monday motivation"
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      const report = reportDatabase[params.id as keyof typeof reportDatabase];
      setReportDetail(report || null);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [params.id]);

  const handleDeleteReport = () => {
    // Handle delete logic here
    console.log("Deleting report:", reportDetail);
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading report details...</span>
        </div>
      </div>
    );
  }

  if (!reportDetail) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h2>
          <p className="text-gray-600 mb-4">The requested student report could not be found.</p>
          <Link
            href="/headmaster/reports/student"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/reports/student" 
              className="text-white hover:text-blue-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{reportDetail.title}</h1>
              <p className="text-blue-100">{reportDetail.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Report Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Generated Date</p>
              <p className="text-lg font-bold text-gray-900">{reportDetail.generatedDate}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Generated By</p>
              <p className="text-lg font-bold text-gray-900">{reportDetail.generatedBy}</p>
            </div>
            <User className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">File Size</p>
              <p className="text-lg font-bold text-gray-900">{reportDetail.fileSize}</p>
            </div>
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Downloads</p>
              <p className="text-lg font-bold text-gray-900">{reportDetail.downloadCount}</p>
            </div>
            <Download className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Performance Report Content */}
          {reportDetail.type === "Academic Performance" && (
            <>
              {/* Overall Statistics */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{reportDetail.studentCount}</p>
                    <p className="text-gray-600">Total Students</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                      <BarChart3 className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-600">{reportDetail.averageScore}%</p>
                    <p className="text-gray-600">Average Score</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-600">{reportDetail.passRate}%</p>
                    <p className="text-gray-600">Pass Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-3">
                      <Award className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-orange-600">{reportDetail.topPerformers}</p>
                    <p className="text-gray-600">Top Performers</p>
                  </div>
                </div>
              </div>

              {/* Subject Performance */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Subject Performance Analysis</h2>
                <div className="space-y-4">
                  {reportDetail.subjects.map((subject: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900">{subject.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          subject.passRate >= 95 ? 'bg-green-100 text-green-800' :
                          subject.passRate >= 85 ? 'bg-blue-100 text-blue-800' :
                          subject.passRate >= 75 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {subject.passRate}% Pass Rate
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Average Score</p>
                          <p className="font-bold text-lg">{subject.average}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Highest Score</p>
                          <p className="font-bold text-lg text-green-600">{subject.topScore}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Lowest Score</p>
                          <p className="font-bold text-lg text-red-600">{subject.lowScore}%</p>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${subject.average}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Distribution */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Distribution</h2>
                <div className="space-y-4">
                  {Object.entries(reportDetail.performanceBreakdown).map(([key, data]: [string, any]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                        <p className="text-sm text-gray-600">{data.range}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{data.count}</p>
                        <p className="text-sm text-gray-600">{data.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Attendance Report Content */}
          {reportDetail.type === "Attendance" && (
            <>
              {/* Attendance Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Attendance Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{reportDetail.studentCount}</p>
                    <p className="text-gray-600">Total Students</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-600">{reportDetail.averageAttendance}%</p>
                    <p className="text-gray-600">Average Attendance</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                      <Award className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-600">{reportDetail.perfectAttendance}</p>
                    <p className="text-gray-600">Perfect Attendance</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-3">
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <p className="text-3xl font-bold text-red-600">{reportDetail.chronicAbsent}</p>
                    <p className="text-gray-600">Chronic Absent</p>
                  </div>
                </div>
              </div>

              {/* Grade Level Breakdown */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Attendance by Grade Level</h2>
                <div className="space-y-4">
                  {reportDetail.gradeBreakdown.map((grade: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{grade.grade}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          grade.attendance >= 95 ? 'bg-green-100 text-green-800' :
                          grade.attendance >= 90 ? 'bg-blue-100 text-blue-800' :
                          grade.attendance >= 85 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {grade.attendance}%
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Students</p>
                          <p className="font-bold text-lg">{grade.students}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Attendance Rate</p>
                          <p className="font-bold text-lg text-green-600">{grade.attendance}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Absences</p>
                          <p className="font-bold text-lg text-red-600">{grade.absences}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${grade.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Insights and Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Insights & Recommendations</h2>
            <div className="space-y-4">
              {reportDetail.insights.map((insight: any, index: number) => (
                <div key={index} className={`border-l-4 p-4 rounded-r-lg ${
                  insight.type === 'strength' ? 'border-green-500 bg-green-50' :
                  insight.type === 'concern' ? 'border-red-500 bg-red-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex items-start gap-3">
                    {insight.type === 'strength' && <TrendingUp className="w-5 h-5 text-green-600 mt-1" />}
                    {insight.type === 'concern' && <TrendingDown className="w-5 h-5 text-red-600 mt-1" />}
                    {insight.type === 'recommendation' && <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />}
                    <div>
                      <h3 className="font-medium text-gray-900">{insight.title}</h3>
                      <p className="text-gray-700 mt-1">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" />
                Print Report
              </button>
              <Link
                href={`/headmaster/reports/student/edit/${reportDetail.id}`}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit Report
              </Link>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Report
              </button>
            </div>
          </div>

          {/* Top Performers (for Academic reports) */}
          {reportDetail.type === "Academic Performance" && reportDetail.topStudents && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
              <div className="space-y-3">
                {reportDetail.topStudents.map((student: any, index: number) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                      }`}>
                        {student.rank}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.id}</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-600">{student.average}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Students Needing Attention */}
          {reportDetail.strugglingStudents && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Needs Attention</h3>
              <div className="space-y-3">
                {reportDetail.strugglingStudents.map((student: any) => (
                  <div key={student.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <span className="text-red-600 font-bold">{student.average}%</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.map((subject: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-green-600">Completed</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Last Downloaded</p>
                <p className="font-medium">{reportDetail.lastDownloaded || 'Never'}</p>
              </div>
              <div>
                <p className="text-gray-600">Report Type</p>
                <p className="font-medium">{reportDetail.type}</p>
              </div>
              <div>
                <p className="text-gray-600">File Format</p>
                <p className="font-medium">PDF Document</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Report</h3>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{reportDetail.title}"</span>?
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">This will permanently remove:</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Report file ({reportDetail.fileSize})</li>
                  <li>• All associated data and analytics</li>
                  <li>• Download history ({reportDetail.downloadCount} downloads)</li>
                  <li>• Generated insights and recommendations</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleDeleteReport}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
              >
                Delete Report
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
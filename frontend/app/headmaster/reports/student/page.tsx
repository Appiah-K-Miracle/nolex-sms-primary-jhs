"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit3, 
  Trash2, 
  Calendar, 
  Users, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw
} from "lucide-react";

export default function StudentReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterDateRange, setFilterDateRange] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sample student reports data
  const [studentReports, setStudentReports] = useState([
    {
      id: 1,
      title: "Academic Performance Summary - Grade 6",
      type: "Academic Performance",
      description: "Comprehensive analysis of Grade 6 student performance across all subjects",
      generatedDate: "2025-11-01",
      generatedBy: "John Smith",
      status: "completed",
      fileSize: "2.4 MB",
      downloadCount: 45,
      studentCount: 120,
      subjectCount: 8,
      averageScore: 78.5,
      passRate: 92.3,
      topPerformers: 15,
      needsAttention: 8
    },
    {
      id: 2,
      title: "Attendance Analysis - October 2025",
      type: "Attendance",
      description: "Monthly attendance tracking and analysis for all students",
      generatedDate: "2025-10-31",
      generatedBy: "Mary Johnson",
      status: "completed",
      fileSize: "1.8 MB",
      downloadCount: 32,
      studentCount: 450,
      averageAttendance: 94.2,
      perfectAttendance: 67,
      chronicAbsent: 12,
      tardyCount: 89
    },
    {
      id: 3,
      title: "Behavioral Assessment Report",
      type: "Behavior",
      description: "Student behavior tracking and disciplinary action summary",
      generatedDate: "2025-10-28",
      generatedBy: "Robert Davis",
      status: "completed",
      fileSize: "3.1 MB",
      downloadCount: 23,
      studentCount: 450,
      incidents: 24,
      resolved: 20,
      pending: 4,
      commendations: 156
    },
    {
      id: 4,
      title: "Class Progress Report - Grade 4A",
      type: "Class Progress",
      description: "Detailed progress tracking for Grade 4A students",
      generatedDate: "2025-10-25",
      generatedBy: "Sarah Wilson",
      status: "processing",
      fileSize: "1.2 MB",
      downloadCount: 8,
      studentCount: 28,
      subjectCount: 7,
      averageScore: 82.1,
      improvement: 15,
      declined: 3
    },
    {
      id: 5,
      title: "Extracurricular Participation Report",
      type: "Activities",
      description: "Student participation in extracurricular activities and clubs",
      generatedDate: "2025-10-20",
      generatedBy: "Michael Brown",
      status: "completed",
      fileSize: "2.7 MB",
      downloadCount: 19,
      studentCount: 450,
      activeParticipants: 287,
      clubs: 15,
      sports: 8,
      competitions: 12
    }
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Academic Performance':
        return <BarChart3 className="w-5 h-5 text-blue-500" />;
      case 'Attendance':
        return <Calendar className="w-5 h-5 text-purple-500" />;
      case 'Behavior':
        return <Users className="w-5 h-5 text-orange-500" />;
      case 'Class Progress':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'Activities':
        return <Activity className="w-5 h-5 text-indigo-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleDeleteClick = (report: any) => {
    setReportToDelete(report);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (reportToDelete) {
      setStudentReports(prev => prev.filter(report => report.id !== reportToDelete.id));
      setShowDeleteModal(false);
      setReportToDelete(null);
    }
  };

  const filteredReports = studentReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    const matchesType = filterType === "all" || report.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const reportTypes = [...new Set(studentReports.map(report => report.type))];
  const reportStats = {
    total: studentReports.length,
    completed: studentReports.filter(r => r.status === 'completed').length,
    processing: studentReports.filter(r => r.status === 'processing').length,
    totalDownloads: studentReports.reduce((sum, r) => sum + r.downloadCount, 0)
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
          <span className="ml-2 text-gray-600">Loading student reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Student Reports</h1>
            <p className="text-blue-100">Generate, manage, and analyze student performance reports</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/headmaster/reports/student/generate"
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Generate Report
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Reports</p>
              <p className="text-3xl font-bold text-gray-900">{reportStats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-600">{reportStats.completed}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Processing</p>
              <p className="text-3xl font-bold text-yellow-600">{reportStats.processing}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Downloads</p>
              <p className="text-3xl font-bold text-purple-600">{reportStats.totalDownloads}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Download className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {reportTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={filterDateRange}
            onChange={(e) => setFilterDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Reports ({filteredReports.length})</h2>
        </div>

        <div className="p-6">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Link
                href="/headmaster/reports/student/generate"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Generate New Report
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeIcon(report.type)}
                        <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                          {getStatusIcon(report.status)}
                          <span className="capitalize">{report.status}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{report.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Generated Date</p>
                          <p className="font-medium">{report.generatedDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Generated By</p>
                          <p className="font-medium">{report.generatedBy}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">File Size</p>
                          <p className="font-medium">{report.fileSize}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Downloads</p>
                          <p className="font-medium">{report.downloadCount}</p>
                        </div>
                      </div>

                      {/* Report Specific Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                        {report.type === 'Academic Performance' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Students</p>
                              <p className="text-lg font-bold text-blue-600">{report.studentCount}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Average Score</p>
                              <p className="text-lg font-bold text-green-600">{report.averageScore}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Pass Rate</p>
                              <p className="text-lg font-bold text-green-600">{report.passRate}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Top Performers</p>
                              <p className="text-lg font-bold text-purple-600">{report.topPerformers}</p>
                            </div>
                          </>
                        )}
                        
                        {report.type === 'Attendance' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Students</p>
                              <p className="text-lg font-bold text-blue-600">{report.studentCount}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Avg Attendance</p>
                              <p className="text-lg font-bold text-green-600">{report.averageAttendance}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Perfect Attendance</p>
                              <p className="text-lg font-bold text-green-600">{report.perfectAttendance}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Chronic Absent</p>
                              <p className="text-lg font-bold text-red-600">{report.chronicAbsent}</p>
                            </div>
                          </>
                        )}

                        {report.type === 'Behavior' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Total Incidents</p>
                              <p className="text-lg font-bold text-orange-600">{report.incidents}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Resolved</p>
                              <p className="text-lg font-bold text-green-600">{report.resolved}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Pending</p>
                              <p className="text-lg font-bold text-yellow-600">{report.pending}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Commendations</p>
                              <p className="text-lg font-bold text-blue-600">{report.commendations}</p>
                            </div>
                          </>
                        )}

                        {report.type === 'Class Progress' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Students</p>
                              <p className="text-lg font-bold text-blue-600">{report.studentCount}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Average Score</p>
                              <p className="text-lg font-bold text-green-600">{report.averageScore}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Improved</p>
                              <p className="text-lg font-bold text-green-600">{report.improvement}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Declined</p>
                              <p className="text-lg font-bold text-red-600">{report.declined}</p>
                            </div>
                          </>
                        )}

                        {report.type === 'Activities' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Participants</p>
                              <p className="text-lg font-bold text-blue-600">{report.activeParticipants}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Clubs</p>
                              <p className="text-lg font-bold text-purple-600">{report.clubs}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Sports</p>
                              <p className="text-lg font-bold text-green-600">{report.sports}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Competitions</p>
                              <p className="text-lg font-bold text-orange-600">{report.competitions}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        href={`/headmaster/reports/student/${report.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Report"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      
                      {report.status === 'completed' && (
                        <button
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Download Report"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      )}
                      
                      <Link
                        href={`/headmaster/reports/student/edit/${report.id}`}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Report"
                      >
                        <Edit3 className="w-5 h-5" />
                      </Link>
                      
                      <button
                        onClick={() => handleDeleteClick(report)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Report"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && reportToDelete && (
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
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{reportToDelete.title}"</span>?
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">This will permanently remove:</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Report file ({reportToDelete.fileSize})</li>
                  <li>• All associated data and analytics</li>
                  <li>• Download history ({reportToDelete.downloadCount} downloads)</li>
                  <li>• Generated insights and recommendations</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleDeleteConfirm}
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
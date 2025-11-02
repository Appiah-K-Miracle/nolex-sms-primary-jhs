"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit3, 
  Trash2, 
  Calendar, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Clock, 
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  UserCheck,
  UserX,
  Briefcase,
  GraduationCap,
  Target
} from "lucide-react";

export default function StaffReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sample staff reports data
  const [staffReports, setStaffReports] = useState([
    {
      id: 1,
      title: "Staff Performance Evaluation - Q3 2025",
      type: "Performance Review",
      description: "Comprehensive evaluation of staff performance across all departments",
      generatedDate: "2025-11-01",
      generatedBy: "HR Manager",
      status: "completed",
      fileSize: "3.8 MB",
      downloadCount: 42,
      period: "Quarterly",
      department: "All Departments",
      staffCount: 48,
      averageRating: 4.2,
      excellentPerformers: 15,
      needsImprovement: 6,
      metrics: {
        punctuality: 92.5,
        productivity: 87.3,
        teamwork: 89.1,
        professionalism: 91.8
      }
    },
    {
      id: 2,
      title: "Teaching Staff Assessment - October 2025",
      type: "Teaching Assessment",
      description: "Monthly assessment of teaching staff performance and student feedback",
      generatedDate: "2025-10-30",
      generatedBy: "Academic Coordinator",
      status: "completed",
      fileSize: "2.9 MB",
      downloadCount: 35,
      period: "Monthly",
      department: "Academic",
      staffCount: 28,
      averageRating: 4.4,
      excellentPerformers: 12,
      needsImprovement: 3,
      metrics: {
        lessonDelivery: 88.7,
        studentEngagement: 91.2,
        curriculum: 85.9,
        assessment: 87.4
      }
    },
    {
      id: 3,
      title: "Attendance & Punctuality Report - October 2025",
      type: "Attendance Report", 
      description: "Staff attendance patterns, leave usage, and punctuality analysis",
      generatedDate: "2025-10-28",
      generatedBy: "HR Assistant",
      status: "processing",
      fileSize: "1.6 MB",
      downloadCount: 23,
      period: "Monthly",
      department: "All Departments",
      staffCount: 48,
      averageAttendance: 94.8,
      perfectAttendance: 32,
      lateArrivals: 18,
      metrics: {
        attendance: 94.8,
        punctuality: 87.5,
        leaveUsage: 12.3,
        overtime: 8.7
      }
    },
    {
      id: 4,
      title: "Professional Development Progress - 2025",
      type: "Training Report",
      description: "Staff training completion rates and professional development activities",
      generatedDate: "2025-10-25",
      generatedBy: "Training Coordinator",
      status: "completed",
      fileSize: "2.4 MB",
      downloadCount: 28,
      period: "Yearly",
      department: "All Departments",
      staffCount: 48,
      trainingCompleted: 42,
      certificationsPending: 12,
      skillsImproved: 156,
      metrics: {
        completionRate: 87.5,
        satisfaction: 91.3,
        skillGrowth: 78.2,
        certification: 68.9
      }
    },
    {
      id: 5,
      title: "Departmental Productivity Analysis - Q3 2025",
      type: "Productivity Report",
      description: "Analysis of departmental efficiency and productivity metrics",
      generatedDate: "2025-10-20",
      generatedBy: "Operations Manager",
      status: "completed",
      fileSize: "3.2 MB",
      downloadCount: 31,
      period: "Quarterly",
      department: "All Departments",
      staffCount: 48,
      productivityScore: 85.7,
      targetAchievement: 89.2,
      efficiencyGains: 12.5,
      metrics: {
        taskCompletion: 88.4,
        qualityScore: 92.1,
        efficiency: 85.7,
        innovation: 76.8
      }
    },
    {
      id: 6,
      title: "Non-Teaching Staff Evaluation - October 2025",
      type: "Support Staff Review",
      description: "Performance review of administrative and support staff members",
      generatedDate: "2025-10-18",
      generatedBy: "Admin Manager",
      status: "completed",
      fileSize: "2.1 MB",
      downloadCount: 19,
      period: "Monthly",
      department: "Administration",
      staffCount: 20,
      averageRating: 4.1,
      excellentPerformers: 8,
      needsImprovement: 2,
      metrics: {
        reliability: 91.5,
        communication: 87.8,
        initiative: 82.3,
        accuracy: 89.7
      }
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
      case 'Performance Review':
        return <Award className="w-5 h-5 text-blue-500" />;
      case 'Teaching Assessment':
        return <GraduationCap className="w-5 h-5 text-purple-500" />;
      case 'Attendance Report':
        return <UserCheck className="w-5 h-5 text-green-500" />;
      case 'Training Report':
        return <Briefcase className="w-5 h-5 text-orange-500" />;
      case 'Productivity Report':
        return <Target className="w-5 h-5 text-red-500" />;
      case 'Support Staff Review':
        return <Users className="w-5 h-5 text-indigo-500" />;
      default:
        return <BarChart3 className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleDeleteClick = (report: any) => {
    setReportToDelete(report);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (reportToDelete) {
      setStaffReports(prev => prev.filter(report => report.id !== reportToDelete.id));
      setShowDeleteModal(false);
      setReportToDelete(null);
    }
  };

  const filteredReports = staffReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    const matchesType = filterType === "all" || report.type === filterType;
    const matchesDepartment = filterDepartment === "all" || report.department === filterDepartment;
    const matchesPeriod = filterPeriod === "all" || report.period === filterPeriod;
    
    return matchesSearch && matchesStatus && matchesType && matchesDepartment && matchesPeriod;
  });

  const reportTypes = [...new Set(staffReports.map(report => report.type))];
  const departments = [...new Set(staffReports.map(report => report.department))];
  const periods = [...new Set(staffReports.map(report => report.period))];
  
  const reportStats = {
    total: staffReports.length,
    completed: staffReports.filter(r => r.status === 'completed').length,
    processing: staffReports.filter(r => r.status === 'processing').length,
    totalDownloads: staffReports.reduce((sum, r) => sum + r.downloadCount, 0),
    totalStaff: 48,
    averageRating: 4.2
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-purple-600" />
          <span className="ml-2 text-gray-600">Loading staff reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Staff Reports</h1>
            <p className="text-purple-100">Comprehensive staff performance, attendance, and development analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/headmaster/reports/staff/generate"
              className="bg-white text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Generate Report
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Reports</p>
              <p className="text-3xl font-bold text-gray-900">{reportStats.total}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="w-8 h-8 text-purple-600" />
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
              <p className="text-gray-600 text-sm">Total Staff</p>
              <p className="text-3xl font-bold text-blue-600">{reportStats.totalStaff}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Rating</p>
              <p className="text-3xl font-bold text-orange-600">{reportStats.averageRating}/5</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Downloads</p>
              <p className="text-3xl font-bold text-red-600">{reportStats.totalDownloads}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Download className="w-8 h-8 text-red-600" />
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
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {reportTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Periods</option>
            {periods.map(period => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>

          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Staff Reports ({filteredReports.length})</h2>
        </div>

        <div className="p-6">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Link
                href="/headmaster/reports/staff/generate"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
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
                      
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Generated Date</p>
                          <p className="font-medium">{report.generatedDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Generated By</p>
                          <p className="font-medium">{report.generatedBy}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Department</p>
                          <p className="font-medium">{report.department}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Period</p>
                          <p className="font-medium">{report.period}</p>
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
                        {(report.type === 'Performance Review' || report.type === 'Teaching Assessment' || report.type === 'Support Staff Review') && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Staff Count</p>
                              <p className="text-lg font-bold text-blue-600">{report.staffCount}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Average Rating</p>
                              <p className="text-lg font-bold text-green-600">{report.averageRating}/5</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Excellent</p>
                              <p className="text-lg font-bold text-purple-600">{report.excellentPerformers}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Needs Improvement</p>
                              <p className="text-lg font-bold text-orange-600">{report.needsImprovement}</p>
                            </div>
                          </>
                        )}

                        {report.type === 'Attendance Report' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Staff Count</p>
                              <p className="text-lg font-bold text-blue-600">{report.staffCount}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Avg Attendance</p>
                              <p className="text-lg font-bold text-green-600">{report.averageAttendance}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Perfect Attendance</p>
                              <p className="text-lg font-bold text-purple-600">{report.perfectAttendance}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Late Arrivals</p>
                              <p className="text-lg font-bold text-red-600">{report.lateArrivals}</p>
                            </div>
                          </>
                        )}

                        {report.type === 'Training Report' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Staff Count</p>
                              <p className="text-lg font-bold text-blue-600">{report.staffCount}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Training Completed</p>
                              <p className="text-lg font-bold text-green-600">{report.trainingCompleted}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Pending Certifications</p>
                              <p className="text-lg font-bold text-orange-600">{report.certificationsPending}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Skills Improved</p>
                              <p className="text-lg font-bold text-purple-600">{report.skillsImproved}</p>
                            </div>
                          </>
                        )}

                        {report.type === 'Productivity Report' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Staff Count</p>
                              <p className="text-lg font-bold text-blue-600">{report.staffCount}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Productivity Score</p>
                              <p className="text-lg font-bold text-green-600">{report.productivityScore}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Target Achievement</p>
                              <p className="text-lg font-bold text-purple-600">{report.targetAchievement}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Efficiency Gains</p>
                              <p className="text-lg font-bold text-orange-600">{report.efficiencyGains}%</p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Performance Metrics Bar */}
                      <div className="mt-4 space-y-2">
                        {Object.entries(report.metrics).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 w-20 capitalize">{key}:</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${value}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 w-12">{value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        href={`/headmaster/reports/staff/${report.id}`}
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
                        href={`/headmaster/reports/staff/edit/${report.id}`}
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
                <h3 className="text-lg font-semibold text-gray-900">Delete Staff Report</h3>
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
                  <li>• Staff report file ({reportToDelete.fileSize})</li>
                  <li>• Performance evaluation data for {reportToDelete.staffCount} staff members</li>
                  <li>• Download history ({reportToDelete.downloadCount} downloads)</li>
                  <li>• Generated analytics and insights</li>
                  <li>• Historical performance comparisons</li>
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
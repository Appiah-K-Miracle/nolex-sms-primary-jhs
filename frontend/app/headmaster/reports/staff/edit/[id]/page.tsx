"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  FileText, 
  Calendar, 
  Users, 
  Award, 
  TrendingUp, 
  Building, 
  UserCheck, 
  BarChart3, 
  Settings, 
  Eye, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Target,
  GraduationCap,
  Briefcase,
  Star,
  Clock
} from "lucide-react";

export default function StaffReportEditPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    status: "draft",
    dateFrom: "",
    dateTo: "",
    departments: [] as string[],
    roles: [] as string[],
    performanceLevels: [] as string[],
    includeCharts: true,
    includeComments: false,
    groupBy: "department",
    showTrends: true,
    includeRatings: true,
    includeAttendance: false,
    includeTraining: true,
    detailLevel: "summary",
    performanceMetrics: true,
    goalTracking: false,
    peerReviews: false,
    selfAssessment: false,
    managerFeedback: true,
    developmentPlans: false,
    certificationsTracking: false,
    attendanceAnalysis: true,
    productivityMeasures: true
  });

  // Sample report data - MATCHING MAIN PAGE DATA
  const sampleReportData = {
    "1": {
      id: 1,
      title: "Q3 Performance Review - 2025",
      description: "Comprehensive performance analysis of all teaching and non-teaching staff for Q3 2025",
      type: "Performance Report",
      status: "completed",
      dateFrom: "2025-07-01",
      dateTo: "2025-09-30",
      departments: ["Teaching Staff", "Administrative"],
      roles: ["Teacher", "Manager", "Support"],
      performanceLevels: ["Excellent", "Good"],
      generatedDate: "2025-10-15",
      generatedBy: "HR Manager",
      fileSize: "2.4 MB"
    },
    "2": {
      id: 2,
      title: "Teaching Assessment Report - November 2025",
      description: "Detailed assessment of teaching effectiveness and student feedback analysis",
      type: "Teaching Assessment",
      status: "completed",
      dateFrom: "2025-10-01",
      dateTo: "2025-10-31",
      departments: ["Mathematics", "Science", "Languages"],
      roles: ["Teacher", "Department Head"],
      performanceLevels: ["Excellent", "Good", "Satisfactory"],
      generatedDate: "2025-11-01",
      generatedBy: "Academic Director",
      fileSize: "1.9 MB"
    },
    "3": {
      id: 3,
      title: "Staff Attendance Analysis - Q3 2025",
      description: "Comprehensive analysis of staff attendance patterns and leave management",
      type: "Attendance Report",
      status: "completed",
      dateFrom: "2025-07-01",
      dateTo: "2025-09-30",
      departments: ["Teaching Staff", "Administrative", "Support Staff"],
      roles: ["Teacher", "Manager", "Assistant"],
      performanceLevels: ["Excellent", "Good", "Satisfactory"],
      generatedDate: "2025-10-20",
      generatedBy: "HR Assistant",
      fileSize: "1.6 MB"
    },
    "4": {
      id: 4,
      title: "Training Progress Report - Q3 2025",
      description: "Assessment of staff training programs and professional development progress",
      type: "Training Report",
      status: "completed",
      dateFrom: "2025-07-01",
      dateTo: "2025-09-30",
      departments: ["Teaching Staff", "Administrative"],
      roles: ["Teacher", "Coordinator"],
      performanceLevels: ["Excellent", "Good"],
      generatedDate: "2025-10-12",
      generatedBy: "Training Coordinator",
      fileSize: "2.2 MB"
    },
    "5": {
      id: 5,
      title: "Productivity Analysis Report - Q3 2025",
      description: "Comprehensive analysis of staff productivity and efficiency metrics",
      type: "Productivity Report",
      status: "completed",
      dateFrom: "2025-07-01",
      dateTo: "2025-09-30",
      departments: ["Teaching Staff", "Administrative"],
      roles: ["Teacher", "Manager"],
      performanceLevels: ["Excellent", "Good"],
      generatedDate: "2025-10-08",
      generatedBy: "Operations Manager",
      fileSize: "2.7 MB",
      status: "completed",
      dateFrom: "2025-10-01",
      dateTo: "2025-10-31",
      departments: ["Academic", "Administration", "Support Services"],
      roles: ["Teacher", "Principal", "Accountant", "Secretary", "Maintenance Staff"],
      performanceLevels: ["Excellent", "Good", "Satisfactory", "Needs Improvement"],
      generatedDate: "2025-10-28",
      generatedBy: "HR Assistant",
      fileSize: "2.1 MB"
    }
  };

  // Available options
  const reportTypes = [
    "Performance Review",
    "Teaching Assessment",
    "Attendance Report",
    "Training Report",
    "Productivity Report",
    "Support Staff Review",
    "Leadership Assessment",
    "Annual Evaluation"
  ];

  const departments = [
    "Academic",
    "Administration", 
    "Support Services",
    "IT Department",
    "Library",
    "Maintenance",
    "Security",
    "Transportation",
    "Food Services",
    "Health Services"
  ];

  const roles = [
    "Headmaster/Principal",
    "Deputy Head",
    "Senior Teacher",
    "Teacher",
    "Department Head",
    "Academic Coordinator",
    "Librarian",
    "IT Coordinator",
    "Accountant",
    "Secretary",
    "Administrative Assistant",
    "Maintenance Staff",
    "Security Guard",
    "Cleaner",
    "Driver",
    "Cook",
    "Nurse"
  ];

  const performanceLevels = [
    "Outstanding",
    "Excellent", 
    "Good",
    "Satisfactory",
    "Needs Improvement",
    "Unsatisfactory"
  ];

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      const report = sampleReportData[params.id as keyof typeof sampleReportData];
      if (report) {
        setReportData(report);
        setFormData({
          title: report.title,
          description: report.description,
          type: report.type,
          status: report.status,
          dateFrom: report.dateFrom,
          dateTo: report.dateTo,
          departments: report.departments,
          roles: report.roles,
          performanceLevels: report.performanceLevels,
          includeCharts: true,
          includeComments: false,
          groupBy: "department",
          showTrends: true,
          includeRatings: true,
          includeAttendance: false,
          includeTraining: true,
          detailLevel: "summary",
          performanceMetrics: true,
          goalTracking: false,
          peerReviews: false,
          selfAssessment: false,
          managerFeedback: true,
          developmentPlans: false,
          certificationsTracking: false,
          attendanceAnalysis: true,
          productivityMeasures: true
        });
      }
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [params.id]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleSave = async (regenerate = false) => {
    setSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
    
    if (regenerate) {
      // Redirect to the updated report
      window.location.href = `/headmaster/reports/staff/${params.id}`;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-purple-600" />
          <span className="ml-2 text-gray-600">Loading report data...</span>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h2>
          <p className="text-gray-600 mb-4">The requested staff report could not be found.</p>
          <Link
            href="/headmaster/reports/staff"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href={`/headmaster/reports/staff/${params.id}`}
              className="text-white hover:text-purple-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Staff Report</h1>
              <p className="text-purple-100">Modify report settings and regenerate</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/headmaster/reports/staff/${params.id}`}
              className="bg-white text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter report title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter report description"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    {reportTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Report Period</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                <input
                  type="date"
                  value={formData.dateFrom}
                  onChange={(e) => handleInputChange('dateFrom', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                <input
                  type="date"
                  value={formData.dateTo}
                  onChange={(e) => handleInputChange('dateTo', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {formData.dateFrom && formData.dateTo && (
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-800">
                  Report period: {new Date(formData.dateFrom).toLocaleDateString()} - {new Date(formData.dateTo).toLocaleDateString()}
                  {' '}({Math.ceil((new Date(formData.dateTo).getTime() - new Date(formData.dateFrom).getTime()) / (1000 * 60 * 60 * 24))} days)
                </p>
              </div>
            )}
          </div>

          {/* Departments Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Departments</h2>
              <span className="text-sm text-gray-500">({formData.departments.length} selected)</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {departments.map(dept => (
                <label key={dept} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.departments.includes(dept)}
                    onChange={(e) => handleArrayChange('departments', dept, e.target.checked)}
                    className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{dept}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Roles Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Staff Roles</h2>
              <span className="text-sm text-gray-500">({formData.roles.length} selected)</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {roles.map(role => (
                <label key={role} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.roles.includes(role)}
                    onChange={(e) => handleArrayChange('roles', role, e.target.checked)}
                    className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{role}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Performance Levels Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Performance Levels</h2>
              <span className="text-sm text-gray-500">({formData.performanceLevels.length} selected)</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {performanceLevels.map(level => (
                <label key={level} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.performanceLevels.includes(level)}
                    onChange={(e) => handleArrayChange('performanceLevels', level, e.target.checked)}
                    className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Report Configuration */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Report Configuration</h2>
            </div>
            
            <div className="space-y-6">
              {/* Performance Analysis Options */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Analysis</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.performanceMetrics}
                      onChange={(e) => handleInputChange('performanceMetrics', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Performance Metrics</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.goalTracking}
                      onChange={(e) => handleInputChange('goalTracking', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Goal Tracking</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.attendanceAnalysis}
                      onChange={(e) => handleInputChange('attendanceAnalysis', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Attendance Analysis</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.productivityMeasures}
                      onChange={(e) => handleInputChange('productivityMeasures', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Productivity Measures</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.developmentPlans}
                      onChange={(e) => handleInputChange('developmentPlans', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Development Plans</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.certificationsTracking}
                      onChange={(e) => handleInputChange('certificationsTracking', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Certifications</span>
                  </label>
                </div>
              </div>

              {/* Feedback Options */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Feedback & Reviews</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.managerFeedback}
                      onChange={(e) => handleInputChange('managerFeedback', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Manager Feedback</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.peerReviews}
                      onChange={(e) => handleInputChange('peerReviews', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Peer Reviews</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.selfAssessment}
                      onChange={(e) => handleInputChange('selfAssessment', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Self Assessment</span>
                  </label>
                </div>
              </div>

              {/* Display Options */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Display Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group By</label>
                    <select
                      value={formData.groupBy}
                      onChange={(e) => handleInputChange('groupBy', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="department">Department</option>
                      <option value="role">Role</option>
                      <option value="performance">Performance Level</option>
                      <option value="date">Date</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Detail Level</label>
                    <select
                      value={formData.detailLevel}
                      onChange={(e) => handleInputChange('detailLevel', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="summary">Summary</option>
                      <option value="detailed">Detailed</option>
                      <option value="comprehensive">Comprehensive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Options</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.includeCharts}
                      onChange={(e) => handleInputChange('includeCharts', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Include Charts</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.showTrends}
                      onChange={(e) => handleInputChange('showTrends', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Show Trends</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.includeRatings}
                      onChange={(e) => handleInputChange('includeRatings', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Include Ratings</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.includeAttendance}
                      onChange={(e) => handleInputChange('includeAttendance', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Include Attendance</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.includeTraining}
                      onChange={(e) => handleInputChange('includeTraining', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Include Training</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.includeComments}
                      onChange={(e) => handleInputChange('includeComments', e.target.checked)}
                      className="text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Include Comments</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Save Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Changes</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
              >
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save & Regenerate'}
              </button>
              
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save as Draft
              </button>
              
              <Link
                href={`/headmaster/reports/staff/${params.id}`}
                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Cancel
              </Link>
            </div>
          </div>

          {/* Current Report Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Report</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Original Title</p>
                <p className="font-medium text-gray-900">{reportData.title}</p>
              </div>
              <div>
                <p className="text-gray-600">Report Type</p>
                <p className="font-medium text-gray-900">{reportData.type}</p>
              </div>
              <div>
                <p className="text-gray-600">Generated Date</p>
                <p className="font-medium text-gray-900">{reportData.generatedDate}</p>
              </div>
              <div>
                <p className="text-gray-600">File Size</p>
                <p className="font-medium text-gray-900">{reportData.fileSize}</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-green-600 capitalize">{reportData.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Departments:</span>
                <span className="font-medium">{formData.departments.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Roles:</span>
                <span className="font-medium">{formData.roles.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Performance Levels:</span>
                <span className="font-medium">{formData.performanceLevels.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Period:</span>
                <span className="font-medium">
                  {formData.dateFrom && formData.dateTo 
                    ? `${Math.ceil((new Date(formData.dateTo).getTime() - new Date(formData.dateFrom).getTime()) / (1000 * 60 * 60 * 24))} days`
                    : 'Not set'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Charts:</span>
                <span className="font-medium">{formData.includeCharts ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Detail Level:</span>
                <span className="font-medium capitalize">{formData.detailLevel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
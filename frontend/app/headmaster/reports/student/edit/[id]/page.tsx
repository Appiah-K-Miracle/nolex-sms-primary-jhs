"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  X, 
  Calendar, 
  User, 
  Users, 
  GraduationCap, 
  FileText, 
  BarChart3, 
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Book,
  Target,
  TrendingUp,
  Clock,
  Settings
} from "lucide-react";

export default function EditStudentReportPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    status: "draft",
    classes: [] as string[],
    subjects: [] as string[],
    dateRange: {
      from: "",
      to: ""
    },
    includeMetrics: {
      academic: true,
      attendance: true,
      behavior: true,
      extracurricular: false
    },
    filters: {
      minAttendance: 0,
      performanceLevel: "all",
      behaviorStatus: "all"
    },
    reportSettings: {
      includeCharts: true,
      includeComments: true,
      groupByClass: false,
      showTrends: true
    }
  });

  // Sample report data for editing
  // Report data for editing - MATCHING MAIN PAGE DATA
  const reportDatabase = {
    "1": {
      id: 1,
      title: "Academic Performance Summary - Grade 6",
      description: "Comprehensive analysis of Grade 6 student performance across all subjects",
      type: "Academic Performance",
      status: "completed",
      generatedDate: "2025-11-01",
      generatedBy: "John Smith",
      classes: ["Grade 6A", "Grade 6B", "Grade 6C"],
      subjects: ["Mathematics", "English", "Science", "Social Studies", "French", "ICT", "Creative Arts", "PE"],
      dateRange: {
        from: "2025-09-01",
        to: "2025-11-01"
      },
      includeMetrics: {
        academic: true,
        attendance: true,
        behavior: true,
        extracurricular: true
      },
      filters: {
        minAttendance: 75,
        performanceLevel: "all",
        behaviorStatus: "all"
      },
      reportSettings: {
        includeCharts: true,
        includeComments: true,
        groupByClass: true,
        showTrends: true
      }
    },
    "2": {
      id: 2,
      title: "Attendance Analysis - October 2025",
      description: "Monthly attendance tracking and analysis for all students",
      type: "Attendance",
      status: "completed",
      generatedDate: "2025-10-31",
      generatedBy: "Mary Johnson",
      classes: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"],
      subjects: [],
      dateRange: {
        from: "2025-10-01",
        to: "2025-10-31"
      },
      includeMetrics: {
        academic: false,
        attendance: true,
        behavior: false,
        extracurricular: false
      },
      filters: {
        minAttendance: 0,
        performanceLevel: "all",
        behaviorStatus: "all"
      },
      reportSettings: {
        includeCharts: true,
        includeComments: true,
        groupByClass: true,
        showTrends: true
      }
    },
    "3": {
      id: 3,
      title: "Behavioral Assessment Report",
      description: "Student behavior tracking and disciplinary action summary",
      type: "Behavior",
      status: "completed",
      generatedDate: "2025-10-28",
      generatedBy: "Robert Davis",
      classes: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"],
      subjects: [],
      dateRange: {
        from: "2025-10-01",
        to: "2025-10-28"
      },
      includeMetrics: {
        academic: false,
        attendance: false,
        behavior: true,
        extracurricular: false
      },
      filters: {
        minAttendance: 0,
        performanceLevel: "all",
        behaviorStatus: "all"
      },
      reportSettings: {
        includeCharts: true,
        includeComments: true,
        groupByClass: true,
        showTrends: false
      }
    },
    "4": {
      id: 4,
      title: "Class Progress Report - Grade 4A",
      description: "Detailed progress tracking for Grade 4A students",
      type: "Class Progress",
      status: "completed",
      generatedDate: "2025-10-25",
      generatedBy: "Susan Wilson",
      classes: ["Grade 4A"],
      subjects: ["Mathematics", "English", "Science", "Social Studies", "French", "ICT", "Creative Arts", "PE"],
      dateRange: {
        from: "2025-09-01",
        to: "2025-10-25"
      },
      includeMetrics: {
        academic: true,
        attendance: true,
        behavior: false,
        extracurricular: false
      },
      filters: {
        minAttendance: 70,
        performanceLevel: "all",
        behaviorStatus: "all"
      },
      reportSettings: {
        includeCharts: true,
        includeComments: true,
        groupByClass: false,
        showTrends: true
      }
    },
    "5": {
      id: 5,
      title: "Parent Engagement Report",
      description: "Analysis of parent participation in school activities and communication",
      type: "Parent Engagement",
      status: "completed",
      generatedDate: "2025-10-22",
      generatedBy: "Patricia Moore",
      classes: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"],
      subjects: [],
      dateRange: {
        from: "2025-09-01",
        to: "2025-10-22"
      },
      includeMetrics: {
        academic: false,
        attendance: false,
        behavior: false,
        extracurricular: true
      },
      filters: {
        minAttendance: 0,
        performanceLevel: "all",
        behaviorStatus: "all"
      },
      reportSettings: {
        includeCharts: true,
        includeComments: true,
        groupByClass: true,
        showTrends: true
      }
    }
  };

  const availableClasses = ["JHS 1A", "JHS 1B", "JHS 1C", "JHS 2A", "JHS 2B", "JHS 2C", "JHS 3A", "JHS 3B"];
  const availableSubjects = ["Mathematics", "English", "Science", "Social Studies", "French", "ICT", "RME", "Physical Education"];
  const reportTypes = [
    "Academic Performance",
    "Attendance Report", 
    "Behavioral Assessment",
    "Progress Tracking",
    "Subject Analysis",
    "Class Summary"
  ];

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      const report = reportDatabase[params.id as keyof typeof reportDatabase];
      if (report) {
        setReportData(report);
        setFormData({
          title: report.title,
          description: report.description,
          type: report.type,
          status: report.status,
          classes: report.classes,
          subjects: report.subjects,
          dateRange: report.dateRange,
          includeMetrics: report.includeMetrics,
          filters: report.filters,
          reportSettings: report.reportSettings
        });
      }
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
    alert("Report updated successfully!");
  };

  const handleClassToggle = (className: string) => {
    setFormData(prev => ({
      ...prev,
      classes: prev.classes.includes(className)
        ? prev.classes.filter(c => c !== className)
        : [...prev.classes, className]
    }));
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading report for editing...</span>
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
          <p className="text-gray-600 mb-4">The requested student report could not be found for editing.</p>
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
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href={`/headmaster/reports/student/${params.id}`}
              className="text-white hover:text-blue-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Student Report</h1>
              <p className="text-blue-100">Modify report settings and regenerate with updated parameters</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/headmaster/reports/student/${params.id}`}
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Link>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter report title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter report description"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    {reportTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="completed">Completed</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Date Range
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                <input
                  type="date"
                  value={formData.dateRange.from}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    dateRange: { ...prev.dateRange, from: e.target.value }
                  }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                <input
                  type="date"
                  value={formData.dateRange.to}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    dateRange: { ...prev.dateRange, to: e.target.value }
                  }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Classes Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Select Classes
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableClasses.map(className => (
                <label key={className} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.classes.includes(className)}
                    onChange={() => handleClassToggle(className)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{className}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Subjects Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Book className="w-5 h-5 text-orange-600" />
              Select Subjects
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableSubjects.map(subject => (
                <label key={subject} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject)}
                    onChange={() => handleSubjectToggle(subject)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{subject}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Metrics to Include */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Metrics to Include
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.includeMetrics).map(([metric, enabled]) => (
                <label key={metric} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      includeMetrics: { ...prev.includeMetrics, [metric]: e.target.checked }
                    }))}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900 capitalize">
                      {metric === 'extracurricular' ? 'Extra-curricular' : metric}
                    </span>
                    <p className="text-sm text-gray-600">
                      {metric === 'academic' && 'Include grades and academic performance'}
                      {metric === 'attendance' && 'Include attendance records and patterns'}
                      {metric === 'behavior' && 'Include behavioral assessments'}
                      {metric === 'extracurricular' && 'Include clubs and sports participation'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-600" />
              Filters
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Attendance (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.filters.minAttendance}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    filters: { ...prev.filters, minAttendance: parseInt(e.target.value) }
                  }))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>0%</span>
                  <span>{formData.filters.minAttendance}%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Performance Level</label>
                  <select
                    value={formData.filters.performanceLevel}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      filters: { ...prev.filters, performanceLevel: e.target.value }
                    }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Students</option>
                    <option value="excellent">Excellent (80%+)</option>
                    <option value="good">Good (60-79%)</option>
                    <option value="average">Average (40-59%)</option>
                    <option value="below">Below Average (&lt;40%)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Behavior Status</label>
                  <select
                    value={formData.filters.behaviorStatus}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      filters: { ...prev.filters, behaviorStatus: e.target.value }
                    }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Students</option>
                    <option value="excellent">Excellent Behavior</option>
                    <option value="good">Good Behavior</option>
                    <option value="needs-improvement">Needs Improvement</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Report Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-600" />
              Report Settings
            </h3>
            
            <div className="space-y-4">
              {Object.entries(formData.reportSettings).map(([setting, enabled]) => (
                <label key={setting} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {setting.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      reportSettings: { ...prev.reportSettings, [setting]: e.target.checked }
                    }))}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Current Report Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Report Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Original Type</p>
                <p className="font-medium">{reportData.type}</p>
              </div>
              <div>
                <p className="text-gray-600">Created Date</p>
                <p className="font-medium">{reportData.generatedDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Created By</p>
                <p className="font-medium">{reportData.generatedBy}</p>
              </div>
              <div>
                <p className="text-gray-600">Current Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-green-600 capitalize">{reportData.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Save Actions */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Options</h3>
            <div className="space-y-3">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save & Regenerate
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Save as Draft
              </button>
              <Link
                href={`/headmaster/reports/student/${params.id}`}
                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel Changes
              </Link>
            </div>
          </div>

          {/* Preview Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Classes:</span> {formData.classes.length} selected</p>
              <p><span className="font-medium">Subjects:</span> {formData.subjects.length} selected</p>
              <p><span className="font-medium">Metrics:</span> {Object.values(formData.includeMetrics).filter(Boolean).length} enabled</p>
              <p><span className="font-medium">Period:</span> {
                formData.dateRange.from && formData.dateRange.to 
                  ? `${formData.dateRange.from} to ${formData.dateRange.to}`
                  : 'Not set'
              }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  Users, 
  TrendingUp, 
  Building, 
  Filter, 
  Settings, 
  Save,
  Plus,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  User,
  Award,
  RefreshCw,
  Target,
  Star,
  Clock,
  BookOpen
} from "lucide-react";

export default function GenerateStaffReportPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reportType: "",
    dateFrom: "",
    dateTo: "",
    departments: [] as string[],
    roles: [] as string[],
    performanceLevels: [] as string[],
    includeCharts: true,
    includeComments: true,
    groupBy: "department",
    showTrends: true,
    includeRatings: true,
    includeAttendance: true,
    includeTraining: true,
    detailLevel: "summary",
    performanceMetrics: true,
    goalTracking: false,
    peerReviews: false,
    selfAssessment: false,
    managerFeedback: true,
    developmentPlans: true,
    certificationsTracking: false,
    attendanceAnalysis: true,
    productivityMeasures: true,
    reportPeriod: "monthly"
  });

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
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate a mock report ID and redirect to the new report
    const newReportId = Math.floor(Math.random() * 1000) + 100;
    
    console.log("Generated staff report:", { id: newReportId, data: formData });
    
    setIsGenerating(false);
    router.push(`/headmaster/reports/staff/${newReportId}`);
  };

  const isFormValid = formData.title && formData.reportType && formData.dateFrom && formData.dateTo;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/reports/staff"
              className="text-white hover:text-purple-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Generate Staff Report</h1>
              <p className="text-purple-100">Create a new comprehensive staff analysis report</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-purple-100 text-sm">Current Period</div>
            <div className="text-white font-medium">November 2025</div>
          </div>
        </div>
      </div>

      {/* Generation Progress (when generating) */}
      {isGenerating && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Generating Your Report...</h3>
              <p className="text-blue-700">Please wait while we analyze staff data and compile the comprehensive report.</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-blue-600 mt-2">
              <span>Processing staff data...</span>
              <span>75%</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Report Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., Q4 2025 Staff Performance Review"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Describe the purpose and scope of this staff report"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type *</label>
                <select
                  value={formData.reportType}
                  onChange={(e) => handleInputChange('reportType', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="">Select report type</option>
                  {reportTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Period Type</label>
                <select
                  value={formData.reportPeriod}
                  onChange={(e) => handleInputChange('reportPeriod', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Report Period
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Date *</label>
                <input
                  type="date"
                  value={formData.dateFrom}
                  onChange={(e) => handleInputChange('dateFrom', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Date *</label>
                <input
                  type="date"
                  value={formData.dateTo}
                  onChange={(e) => handleInputChange('dateTo', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
            </div>
            {formData.dateFrom && formData.dateTo && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-700">
                  Report will cover: <strong>{formData.dateFrom}</strong> to <strong>{formData.dateTo}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Analysis Options */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Analysis Options
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'includeRatings', label: 'Performance Ratings', icon: Star, desc: 'Staff ratings & scores' },
                { key: 'includeAttendance', label: 'Attendance', icon: Clock, desc: 'Attendance patterns' },
                { key: 'includeTraining', label: 'Training Records', icon: BookOpen, desc: 'Professional development' },
                { key: 'performanceMetrics', label: 'Performance Metrics', icon: Target, desc: 'KPI measurements' },
                { key: 'goalTracking', label: 'Goal Tracking', icon: TrendingUp, desc: 'Achievement tracking' },
                { key: 'peerReviews', label: 'Peer Reviews', icon: Users, desc: 'Colleague feedback' },
                { key: 'selfAssessment', label: 'Self Assessment', icon: User, desc: 'Self-evaluation data' },
                { key: 'managerFeedback', label: 'Manager Feedback', icon: Award, desc: 'Supervisor reviews' }
              ].map(({ key, label, icon: Icon, desc }) => (
                <div key={key} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={formData[key as keyof typeof formData] as boolean}
                      onChange={(e) => handleInputChange(key, e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">{label}</div>
                    <div className="text-xs text-gray-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Building className="w-5 h-5 text-purple-600" />
              Departments
              <span className="text-sm text-gray-500 font-normal">(Optional)</span>
            </h2>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Selected: {formData.departments.length} of {departments.length} departments
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange('departments', departments)}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('departments', [])}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {departments.map(department => (
                  <div key={department} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.departments.includes(department)}
                      onChange={(e) => handleArrayChange('departments', department, e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{department}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Staff Roles */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Staff Roles
              <span className="text-sm text-gray-500 font-normal">(Optional)</span>
            </h2>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Selected: {formData.roles.length} of {roles.length} roles
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange('roles', roles)}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('roles', [])}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {roles.map(role => (
                  <div key={role} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.roles.includes(role)}
                      onChange={(e) => handleArrayChange('roles', role, e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Levels */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Performance Levels
              <span className="text-sm text-gray-500 font-normal">(Optional)</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {performanceLevels.map(level => (
                <div key={level} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.performanceLevels.includes(level)}
                    onChange={(e) => handleArrayChange('performanceLevels', level, e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Report Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" />
              Report Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group By</label>
                <select
                  value={formData.groupBy}
                  onChange={(e) => handleInputChange('groupBy', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="department">Department</option>
                  <option value="role">Role</option>
                  <option value="performance">Performance Level</option>
                  <option value="date">Date</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detail Level</label>
                <select
                  value={formData.detailLevel}
                  onChange={(e) => handleInputChange('detailLevel', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="summary">Summary</option>
                  <option value="detailed">Detailed</option>
                  <option value="comprehensive">Comprehensive</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'includeCharts', label: 'Include Charts', desc: 'Visual charts and graphs' },
                { key: 'includeComments', label: 'Include Comments', desc: 'Analysis and insights' },
                { key: 'showTrends', label: 'Show Trends', desc: 'Performance trends' },
                { key: 'developmentPlans', label: 'Development Plans', desc: 'Growth planning' },
                { key: 'certificationsTracking', label: 'Certifications', desc: 'Professional certs' },
                { key: 'attendanceAnalysis', label: 'Attendance Analysis', desc: 'Detailed attendance' }
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    checked={formData[key as keyof typeof formData] as boolean}
                    onChange={(e) => handleInputChange(key, e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-700">{label}</div>
                    <div className="text-xs text-gray-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Form Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {formData.title ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                )}
                <span className={formData.title ? "text-green-700" : "text-gray-500"}>
                  Report Title
                </span>
              </div>
              <div className="flex items-center gap-3">
                {formData.reportType ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                )}
                <span className={formData.reportType ? "text-green-700" : "text-gray-500"}>
                  Report Type
                </span>
              </div>
              <div className="flex items-center gap-3">
                {formData.dateFrom && formData.dateTo ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                )}
                <span className={formData.dateFrom && formData.dateTo ? "text-green-700" : "text-gray-500"}>
                  Date Range
                </span>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h3>
            <button
              onClick={handleGenerate}
              disabled={!isFormValid || isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3 font-medium disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Generate Staff Report
                </>
              )}
            </button>
            {!isFormValid && (
              <p className="text-sm text-red-600 mt-2">
                Please fill in all required fields (marked with *)
              </p>
            )}
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Preview</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-600">Title:</span>
                <p className="font-medium">{formData.title || "Not set"}</p>
              </div>
              <div>
                <span className="text-gray-600">Type:</span>
                <p className="font-medium">{formData.reportType || "Not set"}</p>
              </div>
              <div>
                <span className="text-gray-600">Period:</span>
                <p className="font-medium">
                  {formData.dateFrom && formData.dateTo 
                    ? `${formData.dateFrom} to ${formData.dateTo}`
                    : 'Not set'
                  }
                </p>
              </div>
              <div>
                <span className="text-gray-600">Departments:</span>
                <p className="font-medium">{formData.departments.length} selected</p>
              </div>
              <div>
                <span className="text-gray-600">Roles:</span>
                <p className="font-medium">{formData.roles.length} selected</p>
              </div>
              <div>
                <span className="text-gray-600">Analysis Options:</span>
                <div className="mt-1">
                  {[
                    formData.includeRatings && "Ratings",
                    formData.includeAttendance && "Attendance",
                    formData.includeTraining && "Training",
                    formData.performanceMetrics && "Performance",
                    formData.goalTracking && "Goals"
                  ].filter(Boolean).map((option, index) => (
                    <span key={index} className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                      {option}
                    </span>
                  ))}
                  {[
                    formData.includeRatings,
                    formData.includeAttendance,
                    formData.includeTraining,
                    formData.performanceMetrics,
                    formData.goalTracking
                  ].filter(Boolean).length === 0 && (
                    <span className="text-gray-500 text-xs">No options selected</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
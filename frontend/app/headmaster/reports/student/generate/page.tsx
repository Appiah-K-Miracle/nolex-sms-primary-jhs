"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  RefreshCw,
  Plus,
  X
} from "lucide-react";

export default function GenerateStudentReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  
  const [formData, setFormData] = useState({
    reportType: "",
    title: "",
    description: "",
    dateRange: {
      startDate: "",
      endDate: "",
      preset: ""
    },
    scope: {
      classes: [] as string[],
      students: [] as string[],
      subjects: [] as string[]
    },
    filters: {
      performanceThreshold: "",
      attendanceThreshold: "",
      behaviorIncidents: false,
      includeInactive: false
    },
    output: {
      format: "pdf",
      includeCharts: true,
      includeRecommendations: true,
      includeStudentList: true,
      detailLevel: "comprehensive"
    }
  });

  // Sample data for dropdowns
  const reportTypes = [
    {
      id: "academic_performance",
      name: "Academic Performance Report",
      description: "Comprehensive analysis of student academic achievements",
      icon: BarChart3
    },
    {
      id: "attendance_analysis",
      name: "Attendance Analysis Report",
      description: "Student attendance patterns and trends",
      icon: Calendar
    },
    {
      id: "behavioral_assessment",
      name: "Behavioral Assessment Report",
      description: "Student behavior tracking and disciplinary records",
      icon: Users
    },
    {
      id: "class_progress",
      name: "Class Progress Report",
      description: "Detailed progress tracking for specific classes",
      icon: FileText
    },
    {
      id: "extracurricular",
      name: "Extracurricular Participation Report",
      description: "Student involvement in activities and clubs",
      icon: Users
    }
  ];

  const availableClasses = [
    { id: "1", name: "Grade 1", students: 60 },
    { id: "2", name: "Grade 2", students: 58 },
    { id: "3", name: "Grade 3", students: 62 },
    { id: "4", name: "Grade 4", students: 65 },
    { id: "5", name: "Grade 5", students: 68 },
    { id: "6", name: "Grade 6", students: 67 },
    { id: "7", name: "JHS 1", students: 70 },
    { id: "8", name: "JHS 2", students: 72 },
    { id: "9", name: "JHS 3", students: 69 }
  ];

  const availableSubjects = [
    "Mathematics", "English Language", "Science", "Social Studies", 
    "French", "ICT", "Creative Arts", "Physical Education", "Religious & Moral Education"
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    const [parent, child] = field.split('.');
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [child]: checked 
          ? [...(prev[parent as keyof typeof prev] as any)[child], value]
          : ((prev[parent as keyof typeof prev] as any)[child] as string[]).filter((item: string) => item !== value)
      }
    }));
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    setReportGenerated(true);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Report Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => handleInputChange('reportType', type.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.reportType === type.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  formData.reportType === type.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <type.icon className={`w-5 h-5 ${
                    formData.reportType === type.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{type.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Report Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter a descriptive title for your report"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Provide additional details about this report (optional)"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Date Range & Scope</h2>
        
        {/* Date Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Quick Select</label>
              <select
                value={formData.dateRange.preset}
                onChange={(e) => handleInputChange('dateRange.preset', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Custom Range</option>
                <option value="current_week">Current Week</option>
                <option value="current_month">Current Month</option>
                <option value="current_quarter">Current Quarter</option>
                <option value="current_term">Current Term</option>
                <option value="current_year">Current Academic Year</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Start Date</label>
              <input
                type="date"
                value={formData.dateRange.startDate}
                onChange={(e) => handleInputChange('dateRange.startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">End Date</label>
              <input
                type="date"
                value={formData.dateRange.endDate}
                onChange={(e) => handleInputChange('dateRange.endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Class Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Classes</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableClasses.map((classItem) => (
              <label key={classItem.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.scope.classes.includes(classItem.id)}
                  onChange={(e) => handleArrayChange('scope.classes', classItem.id, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{classItem.name} ({classItem.students} students)</span>
              </label>
            ))}
          </div>
        </div>

        {/* Subject Selection (for academic reports) */}
        {formData.reportType === 'academic_performance' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSubjects.map((subject) => (
                <label key={subject} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.scope.subjects.includes(subject)}
                    onChange={(e) => handleArrayChange('scope.subjects', subject, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{subject}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Filters & Criteria</h2>
        
        {/* Performance Filters */}
        {formData.reportType === 'academic_performance' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Performance Threshold (%)
              </label>
              <select
                value={formData.filters.performanceThreshold}
                onChange={(e) => handleInputChange('filters.performanceThreshold', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Performance Levels</option>
                <option value="90">Excellent (90% and above)</option>
                <option value="80">Very Good (80% and above)</option>
                <option value="70">Good (70% and above)</option>
                <option value="60">Satisfactory (60% and above)</option>
                <option value="below_60">Below Average (Below 60%)</option>
              </select>
            </div>
          </div>
        )}

        {/* Attendance Filters */}
        {formData.reportType === 'attendance_analysis' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attendance Threshold (%)
            </label>
            <select
              value={formData.filters.attendanceThreshold}
              onChange={(e) => handleInputChange('filters.attendanceThreshold', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Attendance Levels</option>
              <option value="95">Excellent (95% and above)</option>
              <option value="90">Good (90% and above)</option>
              <option value="85">Satisfactory (85% and above)</option>
              <option value="below_85">Poor (Below 85%)</option>
            </select>
          </div>
        )}

        {/* General Filters */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="behaviorIncidents"
              checked={formData.filters.behaviorIncidents}
              onChange={(e) => handleInputChange('filters.behaviorIncidents', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="behaviorIncidents" className="ml-2 text-sm text-gray-700">
              Include behavior incidents data
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeInactive"
              checked={formData.filters.includeInactive}
              onChange={(e) => handleInputChange('filters.includeInactive', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="includeInactive" className="ml-2 text-sm text-gray-700">
              Include inactive/transferred students
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Output Configuration</h2>
        
        {/* Output Format */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'pdf', label: 'PDF Document', icon: FileText },
              { value: 'excel', label: 'Excel Spreadsheet', icon: BarChart3 },
              { value: 'both', label: 'Both Formats', icon: Download }
            ].map((format) => (
              <div
                key={format.value}
                onClick={() => handleInputChange('output.format', format.value)}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.output.format === format.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <format.icon className={`w-6 h-6 mx-auto mb-2 ${
                    formData.output.format === format.value ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                  <span className="text-sm font-medium">{format.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Level */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Detail Level</label>
          <div className="space-y-2">
            {[
              { value: 'summary', label: 'Summary Only', description: 'High-level overview with key metrics' },
              { value: 'standard', label: 'Standard Detail', description: 'Balanced view with essential information' },
              { value: 'comprehensive', label: 'Comprehensive', description: 'Detailed analysis with all available data' }
            ].map((level) => (
              <label key={level.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <input
                  type="radio"
                  name="detailLevel"
                  value={level.value}
                  checked={formData.output.detailLevel === level.value}
                  onChange={(e) => handleInputChange('output.detailLevel', e.target.value)}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-900">{level.label}</div>
                  <div className="text-sm text-gray-600">{level.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Include in Report</h3>
          
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.output.includeCharts}
                onChange={(e) => handleInputChange('output.includeCharts', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Charts and visualizations</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.output.includeRecommendations}
                onChange={(e) => handleInputChange('output.includeRecommendations', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">AI-powered recommendations</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.output.includeStudentList}
                onChange={(e) => handleInputChange('output.includeStudentList', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Individual student listings</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  if (reportGenerated) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Generated Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your student report "{formData.title}" has been generated and is ready for download.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Report Type</p>
                  <p className="font-medium">
                    {reportTypes.find(t => t.id === formData.reportType)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Format</p>
                  <p className="font-medium uppercase">{formData.output.format}</p>
                </div>
                <div>
                  <p className="text-gray-500">Classes</p>
                  <p className="font-medium">{formData.scope.classes.length} selected</p>
                </div>
                <div>
                  <p className="text-gray-500">File Size</p>
                  <p className="font-medium">2.4 MB</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium">
                <Download className="w-5 h-5" />
                Download Report
              </button>
              
              <div className="flex gap-3">
                <Link
                  href="/headmaster/reports/student"
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  View All Reports
                </Link>
                <button
                  onClick={() => {
                    setReportGenerated(false);
                    setCurrentStep(1);
                    setFormData({
                      reportType: "",
                      title: "",
                      description: "",
                      dateRange: { startDate: "", endDate: "", preset: "" },
                      scope: { classes: [], students: [], subjects: [] },
                      filters: { performanceThreshold: "", attendanceThreshold: "", behaviorIncidents: false, includeInactive: false },
                      output: { format: "pdf", includeCharts: true, includeRecommendations: true, includeStudentList: true, detailLevel: "comprehensive" }
                    });
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Generate Another
                </button>
              </div>
            </div>
          </div>
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
              <h1 className="text-2xl font-bold text-white">Generate Student Report</h1>
              <p className="text-blue-100">Create comprehensive student performance and analysis reports</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Report Type</span>
          <span>Scope & Date</span>
          <span>Filters</span>
          <span>Output</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-2 rounded-lg transition-colors ${
            currentStep === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          Previous
        </button>

        {currentStep < 4 ? (
          <button
            onClick={nextStep}
            disabled={!formData.reportType || !formData.title}
            className={`px-6 py-2 rounded-lg transition-colors ${
              !formData.reportType || !formData.title
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating || !formData.reportType || !formData.title}
            className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              isGenerating || !formData.reportType || !formData.title
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Generate Report
              </>
            )}
          </button>
        )}
      </div>

      {/* Generation Progress Modal */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Report</h3>
              <p className="text-gray-600 mb-4">
                Please wait while we compile your student report. This may take a few moments.
              </p>
              <div className="bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-500">Processing data and generating insights...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
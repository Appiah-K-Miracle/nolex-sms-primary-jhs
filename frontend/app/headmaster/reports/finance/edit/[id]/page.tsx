"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  X, 
  Calendar, 
  FileText, 
  Settings, 
  TrendingUp, 
  DollarSign,
  Plus,
  Minus,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Filter,
  Download,
  Upload,
  Users,
  Building,
  Clock,
  BarChart3
} from "lucide-react";

export default function EditFinanceReportPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    status: "",
    dateFrom: "",
    dateTo: "",
    departments: [] as string[],
    categories: [] as string[],
    includeRevenue: true,
    includeExpenses: true,
    includeKPIs: true,
    includeInsights: true,
    includeCharts: true,
    includeComparison: false,
    includeForecasting: false,
    groupBy: "department",
    detailLevel: "summary",
    currency: "GHS",
    roundingPrecision: 2,
    includeVAT: true,
    budgetComparison: true,
    monthlyBreakdown: false,
    quarterlyBreakdown: true,
    customFilters: [] as string[]
  });

  // Sample report data for editing - MATCHING MAIN PAGE DATA
  const reportDatabase = {
    "1": {
      id: 1,
      title: "Monthly Financial Summary - October 2025",
      description: "Complete overview of school finances including income, expenses, and balance sheet",
      type: "Financial Summary",
      status: "completed",
      dateFrom: "2025-10-01",
      dateTo: "2025-10-31",
      departments: ["Academic", "Administration", "Infrastructure"],
      categories: ["Revenue", "Expenses", "Assets", "Liabilities"],
      generatedDate: "2025-11-01",
      generatedBy: "Finance Manager",
      fileSize: "3.2 MB"
    },
    "2": {
      id: 2,
      title: "Fee Collection Analysis - Term 1",
      description: "Detailed analysis of student fee collection rates and outstanding balances",
      type: "Fee Collection",
      status: "completed",
      dateFrom: "2025-09-01",
      dateTo: "2025-10-31",
      departments: ["Academic", "Boarding", "Transport"],
      categories: ["Tuition", "Boarding", "Transport", "Extras"],
      generatedDate: "2025-10-28",
      generatedBy: "Accounts Officer",
      fileSize: "2.1 MB"
    },
    "3": {
      id: 3,
      title: "Expense Breakdown Report - Q3 2025",
      description: "Quarterly breakdown of all school expenses by category and department",
      type: "Expense Analysis",
      status: "processing",
      dateFrom: "2025-07-01",
      dateTo: "2025-09-30",
      departments: ["Operations", "Salaries", "Maintenance"],
      categories: ["Operations", "Staff Costs", "Maintenance", "Supplies"],
      generatedDate: "2025-10-25",
      generatedBy: "Budget Controller",
      fileSize: "2.8 MB"
    },
    "4": {
      id: 4,
      title: "Payroll and Benefits Summary - October 2025",
      description: "Complete payroll analysis including salaries, benefits, and tax deductions",
      type: "Payroll Report",
      status: "completed",
      dateFrom: "2025-10-01",
      dateTo: "2025-10-31",
      departments: ["Teaching Staff", "Administrative", "Support Staff"],
      categories: ["Basic Salaries", "Benefits", "Deductions"],
      generatedDate: "2025-11-01",
      generatedBy: "HR Manager",
      fileSize: "1.8 MB"
    },
    "5": {
      id: 5,
      title: "Budget vs Actual Analysis - Q4 2025",
      description: "Comprehensive budget variance analysis comparing planned vs actual spending",
      type: "Budget Analysis",
      status: "draft",
      dateFrom: "2025-10-01",
      dateTo: "2025-12-31",
      departments: ["Academic", "Infrastructure", "Operations"],
      categories: ["Budget", "Actual", "Variance"],
      generatedDate: "2025-11-04",
      generatedBy: "Budget Controller",
      fileSize: "3.5 MB"
    }
  };

  // Available options
  const reportTypes = [
    "Financial Summary",
    "Revenue Report",
    "Expense Analysis", 
    "Fee Collection",
    "Payroll Report",
    "Budget Analysis",
    "Cash Flow Statement",
    "Balance Sheet",
    "Income Statement",
    "Financial Forecast"
  ];

  const departments = [
    "Academic",
    "Administration", 
    "Infrastructure",
    "Teaching Staff",
    "Support Staff",
    "Operations",
    "Maintenance",
    "IT Department",
    "Library",
    "Transport",
    "Boarding",
    "Security",
    "Food Services"
  ];

  const categories = [
    "Revenue",
    "Expenses", 
    "Assets",
    "Liabilities",
    "School Fees",
    "Salaries & Benefits",
    "Utilities",
    "Supplies",
    "Maintenance",
    "Transport",
    "Food & Catering",
    "Insurance",
    "Professional Services",
    "Marketing",
    "Technology"
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
          dateFrom: report.dateFrom,
          dateTo: report.dateTo,
          departments: report.departments,
          categories: report.categories,
          includeRevenue: true,
          includeExpenses: true,
          includeKPIs: true,
          includeInsights: true,
          includeCharts: true,
          includeComparison: false,
          includeForecasting: false,
          groupBy: "department",
          detailLevel: "summary",
          currency: "GHS",
          roundingPrecision: 2,
          includeVAT: true,
          budgetComparison: true,
          monthlyBreakdown: false,
          quarterlyBreakdown: true,
          customFilters: []
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

  const handleArrayChange = (field: string, value: string, action: 'add' | 'remove') => {
    setFormData(prev => ({
      ...prev,
      [field]: action === 'add' 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Saving report:", formData);
    setSaving(false);
    setShowSuccessMessage(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
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
          <p className="text-gray-600 mb-4">The requested financial report could not be found.</p>
          <Link
            href="/headmaster/reports/finance"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
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
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href={`/headmaster/reports/finance/${reportData.id}`}
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Financial Report</h1>
              <p className="text-green-100">Modify report settings and parameters</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href={`/headmaster/reports/finance/${reportData.id}`}
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Link>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">Report updated successfully!</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter report title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter report description"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    {reportTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  value={formData.dateFrom}
                  onChange={(e) => handleInputChange('dateFrom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  value={formData.dateTo}
                  onChange={(e) => handleInputChange('dateTo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Departments & Categories */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Building className="w-5 h-5 text-green-600" />
              Departments & Categories
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Departments
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {departments.map(dept => (
                    <label key={dept} className="flex items-center gap-2 p-2 rounded border hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.departments.includes(dept)}
                        onChange={(e) => handleArrayChange('departments', dept, e.target.checked ? 'add' : 'remove')}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Categories
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center gap-2 p-2 rounded border hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category)}
                        onChange={(e) => handleArrayChange('categories', category, e.target.checked ? 'add' : 'remove')}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Report Content
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.includeRevenue}
                    onChange={(e) => handleInputChange('includeRevenue', e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Revenue Analysis</span>
                    <p className="text-sm text-gray-600">Include revenue breakdown</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.includeExpenses}
                    onChange={(e) => handleInputChange('includeExpenses', e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Expense Analysis</span>
                    <p className="text-sm text-gray-600">Include expense breakdown</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.includeKPIs}
                    onChange={(e) => handleInputChange('includeKPIs', e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">KPI Metrics</span>
                    <p className="text-sm text-gray-600">Key performance indicators</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.includeInsights}
                    onChange={(e) => handleInputChange('includeInsights', e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Financial Insights</span>
                    <p className="text-sm text-gray-600">Analysis and recommendations</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.includeCharts}
                    onChange={(e) => handleInputChange('includeCharts', e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Charts & Graphs</span>
                    <p className="text-sm text-gray-600">Visual data representation</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.budgetComparison}
                    onChange={(e) => handleInputChange('budgetComparison', e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Budget Comparison</span>
                    <p className="text-sm text-gray-600">Compare with budget figures</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Report Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-600" />
              Report Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group By
                </label>
                <select
                  value={formData.groupBy}
                  onChange={(e) => handleInputChange('groupBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="department">Department</option>
                  <option value="category">Category</option>
                  <option value="month">Month</option>
                  <option value="quarter">Quarter</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detail Level
                </label>
                <select
                  value={formData.detailLevel}
                  onChange={(e) => handleInputChange('detailLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="summary">Summary</option>
                  <option value="detailed">Detailed</option>
                  <option value="comprehensive">Comprehensive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="GHS">Ghana Cedis (GHS)</option>
                  <option value="USD">US Dollars (USD)</option>
                  <option value="EUR">Euros (EUR)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rounding Precision
                </label>
                <select
                  value={formData.roundingPrecision}
                  onChange={(e) => handleInputChange('roundingPrecision', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value={0}>Whole numbers</option>
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
                </select>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-green-600" />
              Advanced Options
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.includeVAT}
                  onChange={(e) => handleInputChange('includeVAT', e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Include VAT calculations</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.monthlyBreakdown}
                  onChange={(e) => handleInputChange('monthlyBreakdown', e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Monthly breakdown</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.quarterlyBreakdown}
                  onChange={(e) => handleInputChange('quarterlyBreakdown', e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Quarterly breakdown</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.includeComparison}
                  onChange={(e) => handleInputChange('includeComparison', e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Period comparison</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.includeForecasting}
                  onChange={(e) => handleInputChange('includeForecasting', e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Financial forecasting</span>
              </label>
            </div>
          </div>

          {/* Report Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              Report Information
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Report ID:</span>
                <span className="font-medium">#{reportData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium">{new Date(reportData.generatedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created By:</span>
                <span className="font-medium">{reportData.generatedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">File Size:</span>
                <span className="font-medium">{reportData.fileSize}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
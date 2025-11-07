"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  DollarSign, 
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
  Calculator,
  Users,
  RefreshCw
} from "lucide-react";

export default function GenerateFinanceReportPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reportType: "",
    dateFrom: "",
    dateTo: "",
    includeRevenue: true,
    includeExpenses: true,
    includeBudget: true,
    includeProfitLoss: true,
    includeAssets: false,
    includeLiabilities: false,
    includeCashFlow: true,
    includePayroll: true,
    includeFees: true,
    includeOtherIncome: true,
    accountCategories: [] as string[],
    departments: [] as string[],
    minimumAmount: "",
    reportPeriod: "monthly",
    groupBy: "category",
    includeCharts: true,
    includeComments: true,
    includeTrends: true,
    currencyFormat: "GHS",
    showVariance: true,
    compareToPrevious: true
  });

  // Available options
  const reportTypes = [
    "Income Statement",
    "Balance Sheet", 
    "Cash Flow Statement",
    "Budget Analysis",
    "Expense Report",
    "Revenue Analysis",
    "Financial Summary",
    "Audit Report"
  ];

  const accountCategories = [
    "School Fees",
    "Registration Fees",
    "Examination Fees",
    "Transport Fees",
    "Library Fees",
    "Laboratory Fees",
    "Sports Fees",
    "Activity Fees",
    "Staff Salaries",
    "Utilities",
    "Maintenance",
    "Supplies",
    "Equipment",
    "Marketing",
    "Insurance",
    "Legal & Professional",
    "Training & Development",
    "Travel & Transport",
    "Communication",
    "Security",
    "Cleaning Services",
    "Food & Catering",
    "Other Income",
    "Other Expenses"
  ];

  const departments = [
    "Academic Affairs",
    "Administration", 
    "Finance",
    "Human Resources",
    "Student Affairs",
    "Facilities",
    "IT Department",
    "Library",
    "Sports",
    "Transport",
    "Catering",
    "Security",
    "Maintenance"
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
    
    console.log("Generated finance report:", { id: newReportId, data: formData });
    
    setIsGenerating(false);
    router.push(`/headmaster/reports/finance/${newReportId}`);
  };

  const isFormValid = formData.title && formData.reportType && formData.dateFrom && formData.dateTo;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/reports/finance"
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Generate Finance Report</h1>
              <p className="text-green-100">Create a new comprehensive financial analysis report</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-green-100 text-sm">Current Period</div>
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
              <p className="text-blue-700">Please wait while we analyze your financial data and compile the report.</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-blue-600 mt-2">
              <span>Processing financial data...</span>
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
              <FileText className="w-5 h-5 text-green-600" />
              Report Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Q4 2025 Financial Performance Report"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe the purpose and scope of this financial report"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type *</label>
                <select
                  value={formData.reportType}
                  onChange={(e) => handleInputChange('reportType', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="daily">Daily</option>
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
              <Calendar className="w-5 h-5 text-green-600" />
              Report Period
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Date *</label>
                <input
                  type="date"
                  value={formData.dateFrom}
                  onChange={(e) => handleInputChange('dateFrom', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Date *</label>
                <input
                  type="date"
                  value={formData.dateTo}
                  onChange={(e) => handleInputChange('dateTo', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
            {formData.dateFrom && formData.dateTo && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  Report will cover: <strong>{formData.dateFrom}</strong> to <strong>{formData.dateTo}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Financial Data Sections */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Financial Data to Include
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'includeRevenue', label: 'Revenue', icon: TrendingUp, desc: 'School fees, donations' },
                { key: 'includeExpenses', label: 'Expenses', icon: Calculator, desc: 'Operational costs' },
                { key: 'includeBudget', label: 'Budget Analysis', icon: BarChart3, desc: 'Budget vs actual' },
                { key: 'includeProfitLoss', label: 'Profit & Loss', icon: PieChart, desc: 'P&L statement' },
                { key: 'includeAssets', label: 'Assets', icon: Building, desc: 'School assets' },
                { key: 'includeLiabilities', label: 'Liabilities', icon: AlertTriangle, desc: 'Outstanding debts' },
                { key: 'includeCashFlow', label: 'Cash Flow', icon: Activity, desc: 'Money movement' },
                { key: 'includePayroll', label: 'Payroll', icon: Users, desc: 'Staff payments' }
              ].map(({ key, label, icon: Icon, desc }) => (
                <div key={key} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={formData[key as keyof typeof formData] as boolean}
                      onChange={(e) => handleInputChange(key, e.target.checked)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
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

          {/* Account Categories (Collapsible) */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5 text-green-600" />
              Account Categories
              <span className="text-sm text-gray-500 font-normal">(Optional)</span>
            </h2>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Selected: {formData.accountCategories.length} of {accountCategories.length} categories
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange('accountCategories', accountCategories)}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('accountCategories', [])}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {accountCategories.map(category => (
                  <div key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.accountCategories.includes(category)}
                      onChange={(e) => handleArrayChange('accountCategories', category, e.target.checked)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Building className="w-5 h-5 text-green-600" />
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
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
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
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{department}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-600" />
              Report Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Amount (GHS)</label>
                <input
                  type="number"
                  value={formData.minimumAmount}
                  onChange={(e) => handleInputChange('minimumAmount', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group By</label>
                <select
                  value={formData.groupBy}
                  onChange={(e) => handleInputChange('groupBy', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="category">Category</option>
                  <option value="department">Department</option>
                  <option value="month">Month</option>
                  <option value="account">Account</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={formData.currencyFormat}
                  onChange={(e) => handleInputChange('currencyFormat', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="GHS">GHS (Ghana Cedis)</option>
                  <option value="USD">USD (US Dollars)</option>
                  <option value="EUR">EUR (Euros)</option>
                  <option value="GBP">GBP (British Pounds)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'includeCharts', label: 'Include Charts', desc: 'Visual charts and graphs' },
                { key: 'includeComments', label: 'Include Comments', desc: 'Analysis and insights' },
                { key: 'includeTrends', label: 'Show Trends', desc: 'Trend analysis' },
                { key: 'showVariance', label: 'Show Variance', desc: 'Budget variance' },
                { key: 'compareToPrevious', label: 'Compare Previous', desc: 'Period comparison' }
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    checked={formData[key as keyof typeof formData] as boolean}
                    onChange={(e) => handleInputChange(key, e.target.checked)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
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
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3 font-medium disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Generate Finance Report
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
                <span className="text-gray-600">Sections:</span>
                <div className="mt-1">
                  {[
                    formData.includeRevenue && "Revenue",
                    formData.includeExpenses && "Expenses", 
                    formData.includeBudget && "Budget",
                    formData.includeProfitLoss && "P&L",
                    formData.includeCashFlow && "Cash Flow"
                  ].filter(Boolean).map((section, index) => (
                    <span key={index} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                      {section}
                    </span>
                  ))}
                  {[
                    formData.includeRevenue,
                    formData.includeExpenses, 
                    formData.includeBudget,
                    formData.includeProfitLoss,
                    formData.includeCashFlow
                  ].filter(Boolean).length === 0 && (
                    <span className="text-gray-500 text-xs">No sections selected</span>
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
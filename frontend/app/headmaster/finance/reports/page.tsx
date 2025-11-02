"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  BarChart3, 
  Download, 
  Calendar, 
  FileText, 
  Filter,
  DollarSign,
  TrendingUp,
  Users,
  Receipt,
  Eye,
  Printer
} from "lucide-react";

export default function FinanceReportsPage() {
  const [reportType, setReportType] = useState("financial-summary");
  const [dateRange, setDateRange] = useState("this-month");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    {
      id: "financial-summary",
      title: "Financial Summary",
      description: "Overview of income, expenses, and balance",
      icon: BarChart3
    },
    {
      id: "fee-collection",
      title: "Fee Collection Report",
      description: "Student fee payments and outstanding amounts",
      icon: DollarSign
    },
    {
      id: "expense-analysis",
      title: "Expense Analysis",
      description: "Detailed breakdown of school expenses by category",
      icon: Receipt
    },
    {
      id: "payroll-summary",
      title: "Payroll Summary",
      description: "Staff salary payments and payroll costs",
      icon: Users
    },
    {
      id: "budget-variance",
      title: "Budget vs Actual",
      description: "Compare actual spending against budget",
      icon: TrendingUp
    }
  ];

  const dateRanges = [
    { value: "today", label: "Today" },
    { value: "this-week", label: "This Week" },
    { value: "this-month", label: "This Month" },
    { value: "last-month", label: "Last Month" },
    { value: "this-quarter", label: "This Quarter" },
    { value: "this-year", label: "This Year" },
    { value: "custom", label: "Custom Range" }
  ];

  const expenseCategories = [
    "Utilities",
    "Maintenance",
    "Office Supplies",
    "Food & Catering",
    "Transportation",
    "Teaching Materials",
    "Technology",
    "Security",
    "Insurance",
    "Marketing",
    "Professional Services"
  ];

  // Sample report data
  const reportData = {
    "financial-summary": {
      totalIncome: 2850000,
      totalExpenses: 1650000,
      netBalance: 1200000,
      feeCollection: 2400000,
      otherIncome: 450000,
      majorExpenses: [
        { category: "Staff Salaries", amount: 850000 },
        { category: "Utilities", amount: 120000 },
        { category: "Maintenance", amount: 85000 },
        { category: "Teaching Materials", amount: 75000 }
      ]
    },
    "fee-collection": {
      totalCollected: 2400000,
      totalOutstanding: 650000,
      collectionRate: 78.7,
      feeTypes: [
        { type: "Tuition Fees", collected: 1800000, outstanding: 450000 },
        { type: "Transport Fees", collected: 350000, outstanding: 120000 },
        { type: "Lunch Fees", collected: 250000, outstanding: 80000 }
      ]
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Here you would actually generate and download the report
      console.log("Generated report:", {
        type: reportType,
        dateRange,
        categories: selectedCategories
      });
    }, 2000);
  };

  const handlePreviewReport = () => {
    console.log("Preview report:", {
      type: reportType,
      dateRange,
      categories: selectedCategories
    });
  };

  const getReportConfig = () => {
    return reportTypes.find(r => r.id === reportType);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm border border-green-300 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/finance" 
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Financial Reports</h1>
              <p className="text-green-100">Generate comprehensive financial reports</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Type Selection */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Report Type</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTypes.map(report => {
                  const IconComponent = report.icon;
                  return (
                    <div
                      key={report.id}
                      onClick={() => setReportType(report.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        reportType === report.id
                          ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                          : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className={`w-5 h-5 ${reportType === report.id ? 'text-green-600' : 'text-gray-500'}`} />
                        <h3 className={`font-medium ${reportType === report.id ? 'text-green-900' : 'text-gray-900'}`}>
                          {report.title}
                        </h3>
                      </div>
                      <p className={`text-sm ${reportType === report.id ? 'text-green-700' : 'text-gray-600'}`}>
                        {report.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Date Range Selection */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Date Range</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {dateRanges.map(range => (
                  <button
                    key={range.value}
                    onClick={() => setDateRange(range.value)}
                    className={`p-3 text-sm rounded-lg border transition-colors ${
                      dateRange === range.value
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 text-gray-700 hover:border-green-300'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              {dateRange === "custom" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Filters (for expense analysis) */}
          {reportType === "expense-analysis" && (
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Expense Categories</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {expenseCategories.map(category => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedCategories(expenseCategories)}
                    className="text-green-600 hover:text-green-700 text-sm font-medium mr-4"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Report Preview & Actions */}
        <div className="space-y-6">
          {/* Quick Preview */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Report Preview</h2>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  {getReportConfig() && <getReportConfig().icon className="w-8 h-8 text-green-600" />}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  {getReportConfig()?.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {dateRange === "custom" 
                    ? `${customStartDate} to ${customEndDate}`
                    : dateRanges.find(r => r.value === dateRange)?.label
                  }
                </p>
              </div>

              {/* Sample Data Preview */}
              {reportType === "financial-summary" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Total Income</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(reportData["financial-summary"].totalIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Total Expenses</span>
                    <span className="font-medium text-red-600">
                      {formatCurrency(reportData["financial-summary"].totalExpenses)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-3">
                    <span className="text-gray-900 font-medium">Net Balance</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(reportData["financial-summary"].netBalance)}
                    </span>
                  </div>
                </div>
              )}

              {reportType === "fee-collection" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Total Collected</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(reportData["fee-collection"].totalCollected)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Outstanding</span>
                    <span className="font-medium text-red-600">
                      {formatCurrency(reportData["fee-collection"].totalOutstanding)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-3">
                    <span className="text-gray-900 font-medium">Collection Rate</span>
                    <span className="font-bold text-blue-600">
                      {reportData["fee-collection"].collectionRate}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={handlePreviewReport}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview Report
              </button>
              
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Generate PDF
                  </>
                )}
              </button>

              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                <Printer className="w-4 h-4" />
                Print Report
              </button>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Financial Summary</p>
                      <p className="text-xs text-gray-600">October 2025</p>
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Fee Collection</p>
                      <p className="text-xs text-gray-600">September 2025</p>
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
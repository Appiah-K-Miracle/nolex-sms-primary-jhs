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
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building,
  CreditCard,
  Target,
  Calculator,
  Banknote,
  Receipt,
  FileText,
  Eye,
  Users
} from "lucide-react";

export default function FinanceReportDetailPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [reportDetail, setReportDetail] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample detailed finance report data based on ID - MATCHING MAIN PAGE DATA
  const financeReportDatabase = {
    "1": {
      id: 1,
      title: "Monthly Financial Summary - October 2025",
      description: "Complete overview of school finances including income, expenses, and balance sheet",
      type: "Financial Summary",
      status: "completed",
      generatedDate: "2025-11-01",
      generatedBy: "Finance Manager",
      dateFrom: "2025-10-01",
      dateTo: "2025-10-31",
      fileSize: "3.2 MB",
      downloadCount: 67,
      lastDownloaded: "2025-11-05",
      
      // Financial Overview
      totalRevenue: 425000.00,
      totalExpenses: 387500.00,
      netIncome: 37500.00,
      budgetVariance: 8.8,
      profitMargin: 8.8,
      
      // Department breakdown
      departments: [
        { 
          name: "Academic", 
          revenue: 295000.00, 
          expenses: 245000.00, 
          budget: 250000.00, 
          variance: -2.0,
          profitMargin: 16.9
        },
        { 
          name: "Administration", 
          revenue: 85000.00, 
          expenses: 87500.00, 
          budget: 85000.00, 
          variance: 2.9,
          profitMargin: -2.9
        },
        { 
          name: "Infrastructure", 
          revenue: 45000.00, 
          expenses: 55000.00, 
          budget: 52000.00, 
          variance: 5.8,
          profitMargin: -22.2
        }
      ],
      
      // Revenue Sources
      revenueBreakdown: [
        { category: "School Fees", amount: 320000.00, percentage: 75.3, trend: 5.2 },
        { category: "Registration Fees", amount: 45000.00, percentage: 10.6, trend: 2.1 },
        { category: "Extra Activities", amount: 35000.00, percentage: 8.2, trend: -1.5 },
        { category: "Infrastructure Income", amount: 25000.00, percentage: 5.9, trend: 12.8 }
      ],
      
      // Expense Categories
      expenseBreakdown: [
        { category: "Salaries & Benefits", amount: 175000.00, percentage: 45.2, budget: 170000.00, variance: 2.9 },
        { category: "Utilities", amount: 45000.00, percentage: 11.6, budget: 42000.00, variance: 7.1 },
        { category: "Supplies & Materials", amount: 38000.00, percentage: 9.8, budget: 40000.00, variance: -5.0 },
        { category: "Maintenance", amount: 42000.00, percentage: 10.8, budget: 40000.00, variance: 5.0 },
        { category: "Infrastructure", amount: 52500.00, percentage: 13.5, budget: 50000.00, variance: 5.0 },
        { category: "Other Expenses", amount: 35000.00, percentage: 9.0, budget: 37000.00, variance: -5.4 }
      ],
      
      // Key Performance Indicators
      kpis: [
        { metric: "Fee Collection Rate", value: 89.5, unit: "%", trend: "up", target: 90.0 },
        { metric: "Expense Growth", value: -2.3, unit: "%", trend: "down", target: 0.0 },
        { metric: "Profit Margin", value: 8.8, unit: "%", trend: "up", target: 10.0 },
        { metric: "Revenue Growth", value: 5.2, unit: "%", trend: "up", target: 7.0 },
        { metric: "Budget Variance", value: 8.8, unit: "%", trend: "up", target: 5.0 },
        { metric: "Operating Efficiency", value: 91.2, unit: "%", trend: "up", target: 93.0 }
      ],
      
      // Financial Insights
      insights: [
        {
          type: "positive",
          title: "Strong Fee Collection",
          description: "Fee collection rate of 89.5% shows excellent financial discipline and parent cooperation"
        },
        {
          type: "positive", 
          title: "Expense Control",
          description: "Expense growth reduced by 2.3% demonstrating effective cost management"
        },
        {
          type: "recommendation",
          title: "Profit Margin Improvement",
          description: "Current 8.8% profit margin can be optimized to reach 10% target through strategic planning"
        }
      ],
      
      accounts: [
        { name: "General Fund", balance: 285000.00, type: "Operating", lastUpdated: "2025-10-31" },
        { name: "Fee Collection Account", balance: 125000.00, type: "Revenue", lastUpdated: "2025-10-31" },
        { name: "Emergency Reserve", balance: 150000.00, type: "Reserve", lastUpdated: "2025-10-31" },
        { name: "Infrastructure Fund", balance: 75000.00, type: "Capital", lastUpdated: "2025-10-31" }
      ]
    },
    "2": {
      id: 2,
      title: "Fee Collection Analysis - Term 1",
      description: "Detailed analysis of student fee collection rates and outstanding balances",
      type: "Fee Collection",
      status: "completed",
      generatedDate: "2025-10-28",
      generatedBy: "Accounts Officer",
      dateFrom: "2025-09-01",
      dateTo: "2025-10-31",
      fileSize: "2.1 MB",
      downloadCount: 34,
      lastDownloaded: "2025-11-04",
      
      totalRevenue: 320000.00,
      totalExpected: 365000.00,
      netIncome: 320000.00,
      budgetVariance: 87.7,
      profitMargin: 87.7,
      
      departments: [
        { name: "Tuition", revenue: 250000.00, expenses: 0.00, budget: 280000.00, variance: -10.7, profitMargin: 100.0 },
        { name: "Boarding", revenue: 45000.00, expenses: 0.00, budget: 50000.00, variance: -10.0, profitMargin: 100.0 },
        { name: "Transport", revenue: 15000.00, expenses: 0.00, budget: 20000.00, variance: -25.0, profitMargin: 100.0 },
        { name: "Extras", revenue: 10000.00, expenses: 0.00, budget: 15000.00, variance: -33.3, profitMargin: 100.0 }
      ],
      
      revenueBreakdown: [
        { category: "Tuition Fees", amount: 250000.00, percentage: 78.1, trend: 5.2 },
        { category: "Boarding Fees", amount: 45000.00, percentage: 14.1, trend: -2.3 },
        { category: "Transport Fees", amount: 15000.00, percentage: 4.7, trend: -8.5 },
        { category: "Extra Activities", amount: 10000.00, percentage: 3.1, trend: 2.1 }
      ],
      
      expenseBreakdown: [
        { category: "Outstanding Balances", amount: 45000.00, percentage: 100.0, budget: 30000.00, variance: 50.0 }
      ],
      
      kpis: [
        { metric: "Collection Rate", value: 87.7, unit: "%", trend: "up", target: 90.0 },
        { metric: "On-Time Payments", value: 78.2, unit: "%", trend: "up", target: 85.0 },
        { metric: "Late Payments", value: 9.5, unit: "%", trend: "down", target: 5.0 },
        { metric: "Default Rate", value: 12.3, unit: "%", trend: "down", target: 8.0 },
        { metric: "Outstanding Amount", value: 45000.00, unit: "GHS", trend: "down", target: 30000.00 }
      ],
      
      insights: [
        {
          type: "positive",
          title: "Good Collection Rate",
          description: "87.7% collection rate shows strong fee collection performance"
        },
        {
          type: "concern",
          title: "Outstanding Balances",
          description: "GHS 45,000 in outstanding balances needs attention and follow-up"
        },
        {
          type: "recommendation",
          title: "Payment Plan Options",
          description: "Consider flexible payment plans to improve collection rates and reduce defaults"
        }
      ],
      
      accounts: [
        { name: "Fee Collection Account", balance: 320000.00, type: "Revenue", lastUpdated: "2025-10-31" },
        { name: "Outstanding Receivables", balance: 45000.00, type: "Receivable", lastUpdated: "2025-10-31" },
        { name: "Tuition Reserve", balance: 85000.00, type: "Reserve", lastUpdated: "2025-10-31" }
      ]
    },
    "3": {
      id: 3,
      title: "Expense Breakdown Report - Q3 2025",
      description: "Quarterly breakdown of all school expenses by category and department",
      type: "Expense Analysis",
      status: "processing",
      generatedDate: "2025-10-25",
      generatedBy: "Budget Controller",
      dateFrom: "2025-07-01",
      dateTo: "2025-09-30",
      fileSize: "2.8 MB",
      downloadCount: 18,
      lastDownloaded: "2025-11-02",
      
      totalRevenue: 0.00,
      totalExpenses: 285000.00,
      netIncome: -285000.00,
      budgetVariance: -3.2,
      profitMargin: -100.0,
      
      departments: [
        { name: "Operations", revenue: 0.00, expenses: 130000.00, budget: 125000.00, variance: 4.0, profitMargin: -100.0 },
        { name: "Salaries", revenue: 0.00, expenses: 91500.00, budget: 95000.00, variance: -3.7, profitMargin: -100.0 },
        { name: "Maintenance", revenue: 0.00, expenses: 36500.00, budget: 35000.00, variance: 4.3, profitMargin: -100.0 },
        { name: "Supplies", revenue: 0.00, expenses: 27000.00, budget: 30000.00, variance: -10.0, profitMargin: -100.0 }
      ],
      
      revenueBreakdown: [],
      
      expenseBreakdown: [
        { category: "Operations", amount: 130000.00, percentage: 45.6, budget: 125000.00, variance: 4.0 },
        { category: "Staff Costs", amount: 91500.00, percentage: 32.1, budget: 95000.00, variance: -3.7 },
        { category: "Maintenance", amount: 36500.00, percentage: 12.8, budget: 35000.00, variance: 4.3 },
        { category: "Supplies", amount: 27000.00, percentage: 9.5, budget: 30000.00, variance: -10.0 }
      ],
      
      kpis: [
        { metric: "Budget Variance", value: -3.2, unit: "%", trend: "down", target: 0.0 },
        { metric: "Operational Costs", value: 45.6, unit: "%", trend: "up", target: 40.0 },
        { metric: "Staff Cost Ratio", value: 32.1, unit: "%", trend: "down", target: 35.0 },
        { metric: "Maintenance Efficiency", value: 87.2, unit: "%", trend: "up", target: 90.0 },
        { metric: "Supply Cost Control", value: 90.0, unit: "%", trend: "up", target: 95.0 }
      ],
      
      insights: [
        {
          type: "positive",
          title: "Staff Cost Control",
          description: "Staff costs came in 3.7% under budget showing good salary management"
        },
        {
          type: "concern",
          title: "Operational Cost Increase",
          description: "Operations costs 4% over budget, need to identify cost drivers"
        },
        {
          type: "recommendation",
          title: "Cost Optimization Review",
          description: "Conduct quarterly cost review to identify savings opportunities"
        }
      ],
      
      accounts: [
        { name: "Operations Account", balance: 45000.00, type: "Operating", lastUpdated: "2025-09-30" },
        { name: "Maintenance Fund", balance: 25000.00, type: "Maintenance", lastUpdated: "2025-09-30" },
        { name: "Supply Budget", balance: 15000.00, type: "Supply", lastUpdated: "2025-09-30" }
      ]
    },
    "4": {
      id: 4,
      title: "Payroll and Benefits Summary - October 2025",
      description: "Complete payroll analysis including salaries, benefits, and tax deductions",
      type: "Payroll Report",
      status: "completed",
      generatedDate: "2025-11-01",
      generatedBy: "HR Manager",
      dateFrom: "2025-10-01",
      dateTo: "2025-10-31",
      fileSize: "1.8 MB",
      downloadCount: 25,
      lastDownloaded: "2025-11-03",
      
      totalRevenue: 0.00,
      totalExpenses: 145000.00,
      netIncome: -145000.00,
      budgetVariance: 2.8,
      profitMargin: -100.0,
      
      departments: [
        { name: "Teaching Staff", revenue: 0.00, expenses: 98500.00, budget: 95000.00, variance: 3.7, profitMargin: -100.0 },
        { name: "Administrative", revenue: 0.00, expenses: 28500.00, budget: 30000.00, variance: -5.0, profitMargin: -100.0 },
        { name: "Support Staff", revenue: 0.00, expenses: 18000.00, budget: 18000.00, variance: 0.0, profitMargin: -100.0 }
      ],
      
      revenueBreakdown: [],
      
      expenseBreakdown: [
        { category: "Basic Salaries", amount: 112000.00, percentage: 77.2, budget: 110000.00, variance: 1.8 },
        { category: "Benefits & Allowances", amount: 18500.00, percentage: 12.8, budget: 20000.00, variance: -7.5 },
        { category: "Tax Deductions", amount: 9500.00, percentage: 6.6, budget: 9000.00, variance: 5.6 },
        { category: "Other Deductions", amount: 5000.00, percentage: 3.4, budget: 5000.00, variance: 0.0 }
      ],
      
      kpis: [
        { metric: "Payroll Cost Ratio", value: 37.4, unit: "%", trend: "stable", target: 35.0 },
        { metric: "Benefits Coverage", value: 92.5, unit: "%", trend: "up", target: 95.0 },
        { metric: "Budget Adherence", value: 97.2, unit: "%", trend: "up", target: 98.0 },
        { metric: "Staff Retention", value: 94.8, unit: "%", trend: "up", target: 95.0 },
        { metric: "Overtime Ratio", value: 8.2, unit: "%", trend: "down", target: 6.0 }
      ],
      
      insights: [
        {
          type: "positive",
          title: "Budget Control",
          description: "Payroll expenses stayed within 2.8% of budget showing excellent cost management"
        },
        {
          type: "positive",
          title: "Staff Retention",
          description: "94.8% staff retention rate indicates good employee satisfaction"
        },
        {
          type: "recommendation",
          title: "Overtime Management",
          description: "Consider workload redistribution to reduce overtime expenses"
        }
      ],
      
      accounts: [
        { name: "Salary Account", balance: 25000.00, type: "Payroll", lastUpdated: "2025-10-31" },
        { name: "Benefits Fund", balance: 12000.00, type: "Benefits", lastUpdated: "2025-10-31" },
        { name: "Tax Withholding", balance: 9500.00, type: "Tax", lastUpdated: "2025-10-31" }
      ]
    },
    "5": {
      id: 5,
      title: "Budget vs Actual Analysis - Q4 2025",
      description: "Comprehensive budget variance analysis comparing planned vs actual spending",
      type: "Budget Analysis",
      status: "draft",
      generatedDate: "2025-11-04",
      generatedBy: "Budget Controller",
      dateFrom: "2025-10-01",
      dateTo: "2025-12-31",
      fileSize: "3.5 MB",
      downloadCount: 8,
      lastDownloaded: "2025-11-05",
      
      totalRevenue: 380000.00,
      totalExpenses: 342000.00,
      netIncome: 38000.00,
      budgetVariance: 10.0,
      profitMargin: 10.0,
      
      departments: [
        { name: "Academic", revenue: 280000.00, expenses: 215000.00, budget: 220000.00, variance: -2.3, profitMargin: 23.2 },
        { name: "Infrastructure", revenue: 65000.00, expenses: 78000.00, budget: 75000.00, variance: 4.0, profitMargin: -20.0 },
        { name: "Operations", revenue: 35000.00, expenses: 49000.00, budget: 47000.00, variance: 4.3, profitMargin: -40.0 }
      ],
      
      revenueBreakdown: [
        { category: "Projected Revenue", amount: 380000.00, percentage: 100.0, trend: 8.5 },
        { category: "Actual Revenue", amount: 285000.00, percentage: 75.0, trend: 5.2 },
        { category: "Pending Collections", amount: 95000.00, percentage: 25.0, trend: 15.8 }
      ],
      
      expenseBreakdown: [
        { category: "Academic Operations", amount: 215000.00, percentage: 62.9, budget: 220000.00, variance: -2.3 },
        { category: "Infrastructure", amount: 78000.00, percentage: 22.8, budget: 75000.00, variance: 4.0 },
        { category: "General Operations", amount: 49000.00, percentage: 14.3, budget: 47000.00, variance: 4.3 }
      ],
      
      kpis: [
        { metric: "Budget Accuracy", value: 90.0, unit: "%", trend: "up", target: 95.0 },
        { metric: "Revenue Target", value: 75.0, unit: "%", trend: "up", target: 90.0 },
        { metric: "Expense Control", value: 96.5, unit: "%", trend: "up", target: 98.0 },
        { metric: "Variance Range", value: 10.0, unit: "%", trend: "stable", target: 5.0 },
        { metric: "Forecast Accuracy", value: 87.5, unit: "%", trend: "up", target: 92.0 }
      ],
      
      insights: [
        {
          type: "positive",
          title: "Expense Management",
          description: "Overall expenses tracking well within budget limits across departments"
        },
        {
          type: "concern",
          title: "Revenue Gap",
          description: "25% revenue shortfall requires attention to collection strategies"
        },
        {
          type: "recommendation",
          title: "Budget Revision",
          description: "Consider mid-year budget adjustments based on current performance trends"
        }
      ],
      
      accounts: [
        { name: "Budget Allocation", balance: 190000.00, type: "Budget", lastUpdated: "2025-11-04" },
        { name: "Contingency Fund", balance: 35000.00, type: "Reserve", lastUpdated: "2025-11-04" },
        { name: "Revenue Tracking", balance: 285000.00, type: "Revenue", lastUpdated: "2025-11-04" }
      ]
    }
  };

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      const report = financeReportDatabase[params.id as keyof typeof financeReportDatabase];
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
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
              href="/headmaster/reports/finance" 
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{reportDetail.title}</h1>
              <p className="text-green-100">{reportDetail.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <Link
              href={`/headmaster/reports/finance/edit/${reportDetail.id}`}
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Report Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(reportDetail.totalRevenue)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(reportDetail.totalExpenses)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${reportDetail.netIncome >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Net Income</p>
              <p className={`text-2xl font-bold ${reportDetail.netIncome >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {formatCurrency(reportDetail.netIncome)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Profit Margin</p>
              <p className="text-2xl font-bold text-purple-600">{reportDetail.profitMargin}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Metadata */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600">Report Type</p>
            <p className="font-semibold text-gray-900">{reportDetail.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reportDetail.status)}`}>
              {reportDetail.status.charAt(0).toUpperCase() + reportDetail.status.slice(1)}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Generated Date</p>
            <p className="font-semibold text-gray-900">{new Date(reportDetail.generatedDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Generated By</p>
            <p className="font-semibold text-gray-900">{reportDetail.generatedBy}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Period</p>
            <p className="font-semibold text-gray-900">
              {new Date(reportDetail.dateFrom).toLocaleDateString()} - {new Date(reportDetail.dateTo).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">File Size</p>
            <p className="font-semibold text-gray-900">{reportDetail.fileSize}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Downloads</p>
            <p className="font-semibold text-gray-900">{reportDetail.downloadCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Downloaded</p>
            <p className="font-semibold text-gray-900">{new Date(reportDetail.lastDownloaded).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Department Performance</h2>
        <div className="grid gap-4">
          {reportDetail.departments.map((dept: any, index: number) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{dept.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  dept.profitMargin > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {dept.profitMargin > 0 ? '+' : ''}{dept.profitMargin}% Margin
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Revenue</p>
                  <p className="font-bold text-lg text-green-600">{formatCurrency(dept.revenue)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Expenses</p>
                  <p className="font-bold text-lg text-red-600">{formatCurrency(dept.expenses)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Budget Variance</p>
                  <p className={`font-bold text-lg ${dept.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {dept.variance > 0 ? '+' : ''}{dept.variance}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Breakdown */}
      {reportDetail.revenueBreakdown && reportDetail.revenueBreakdown.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Revenue Sources</h2>
          <div className="space-y-4">
            {reportDetail.revenueBreakdown.map((item: any, index: number) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{item.category}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.trend > 0 ? 'bg-green-100 text-green-800' :
                    item.trend < 0 ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.trend > 0 ? '+' : ''}{item.trend}% Trend
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Amount</p>
                    <p className="font-bold text-lg text-green-600">{formatCurrency(item.amount)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Percentage</p>
                    <p className="font-bold text-lg text-blue-600">{item.percentage}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expense Analysis */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Expense Analysis</h2>
        <div className="space-y-4">
          {reportDetail.expenseBreakdown.map((item: any, index: number) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{item.category}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.variance > 0 ? 'bg-red-100 text-red-800' :
                  item.variance < 0 ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.variance > 0 ? '+' : ''}{item.variance}% vs Budget
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Actual</p>
                  <p className="font-bold text-lg text-red-600">{formatCurrency(item.amount)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Budget</p>
                  <p className="font-bold text-lg text-gray-600">{formatCurrency(item.budget)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Percentage</p>
                  <p className="font-bold text-lg text-blue-600">{item.percentage}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportDetail.kpis.map((kpi: any, index: number) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{kpi.metric}</h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  kpi.trend === 'up' ? 'bg-green-100 text-green-800' :
                  kpi.trend === 'down' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {kpi.trend === 'up' ? '↗' : kpi.trend === 'down' ? '↘' : '→'} {kpi.trend}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current:</span>
                  <span className="font-bold">{kpi.value}{kpi.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Target:</span>
                  <span className="text-gray-600">{kpi.target}{kpi.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Insights</h2>
        <div className="space-y-4">
          {reportDetail.insights.map((insight: any, index: number) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              insight.type === 'positive' ? 'bg-green-50 border-green-400' :
              insight.type === 'concern' ? 'bg-yellow-50 border-yellow-400' :
              insight.type === 'recommendation' ? 'bg-blue-50 border-blue-400' :
              'bg-gray-50 border-gray-400'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  insight.type === 'positive' ? 'bg-green-100' :
                  insight.type === 'concern' ? 'bg-yellow-100' :
                  insight.type === 'recommendation' ? 'bg-blue-100' :
                  'bg-gray-100'
                }`}>
                  {insight.type === 'positive' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                   insight.type === 'concern' ? <AlertTriangle className="w-5 h-5 text-yellow-600" /> :
                   insight.type === 'recommendation' ? <Target className="w-5 h-5 text-blue-600" /> :
                   <Target className="w-5 h-5 text-gray-600" />}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{insight.title}</h3>
                  <p className="text-gray-600">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Balances */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Balances</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportDetail.accounts.map((account: any, index: number) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{account.name}</h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                  {account.type}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Balance:</span>
                  <span className="font-bold text-green-600">{formatCurrency(account.balance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated:</span>
                  <span className="text-gray-600">{new Date(account.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Financial Report</h3>
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
                  <li>• Financial data covering {reportDetail.dateFrom} to {reportDetail.dateTo}</li>
                  <li>• Revenue analysis ({formatCurrency(reportDetail.totalRevenue)})</li>
                  <li>• Expense breakdown ({formatCurrency(reportDetail.totalExpenses)})</li>
                  <li>• Department performance data ({reportDetail.departments.length} departments)</li>
                  <li>• KPI metrics and financial insights</li>
                  <li>• Report file ({reportDetail.fileSize})</li>
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
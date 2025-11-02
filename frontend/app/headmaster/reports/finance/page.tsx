"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  DollarSign, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit3, 
  Trash2, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  CreditCard,
  Wallet,
  Receipt
} from "lucide-react";

export default function FinanceReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sample finance reports data
  const [financeReports, setFinanceReports] = useState([
    {
      id: 1,
      title: "Monthly Financial Summary - October 2025",
      type: "Financial Summary",
      description: "Complete overview of school finances including income, expenses, and balance sheet",
      generatedDate: "2025-11-01",
      generatedBy: "Finance Manager",
      status: "completed",
      fileSize: "3.2 MB",
      downloadCount: 67,
      period: "Monthly",
      totalRevenue: 425000,
      totalExpenses: 387500,
      netIncome: 37500,
      categories: ["Fees", "Expenses", "Payroll", "Infrastructure"],
      highlights: {
        feeCollection: 89.5,
        expenseGrowth: -2.3,
        profitMargin: 8.8
      }
    },
    {
      id: 2,
      title: "Fee Collection Analysis - Term 1",
      type: "Fee Collection",
      description: "Detailed analysis of student fee collection rates and outstanding balances",
      generatedDate: "2025-10-28",
      generatedBy: "Accounts Officer",
      status: "completed", 
      fileSize: "2.1 MB",
      downloadCount: 34,
      period: "Termly",
      totalRevenue: 320000,
      totalExpected: 365000,
      collectionRate: 87.7,
      outstandingAmount: 45000,
      categories: ["Tuition", "Boarding", "Transport", "Extras"],
      highlights: {
        onTimePayments: 78.2,
        latePayments: 9.5,
        defaultRate: 12.3
      }
    },
    {
      id: 3,
      title: "Expense Breakdown Report - Q3 2025",
      type: "Expense Analysis",
      description: "Quarterly breakdown of all school expenses by category and department",
      generatedDate: "2025-10-25",
      generatedBy: "Budget Controller",
      status: "processing",
      fileSize: "2.8 MB",
      downloadCount: 18,
      period: "Quarterly",
      totalExpenses: 285000,
      budgetVariance: -3.2,
      categories: ["Operations", "Salaries", "Maintenance", "Supplies"],
      highlights: {
        operationalCosts: 45.6,
        staffCosts: 32.1,
        maintenanceCosts: 12.8,
        suppliesCosts: 9.5
      }
    },
    {
      id: 4,
      title: "Payroll Summary - October 2025",
      type: "Payroll Report",
      description: "Monthly payroll processing summary with tax deductions and benefits",
      generatedDate: "2025-10-30",
      generatedBy: "HR Manager",
      status: "completed",
      fileSize: "1.9 MB",
      downloadCount: 45,
      period: "Monthly",
      totalPayroll: 145000,
      staffCount: 48,
      averageSalary: 3021,
      categories: ["Salaries", "Benefits", "Deductions", "Taxes"],
      highlights: {
        salaryIncrease: 5.2,
        benefitsCost: 12.5,
        taxDeductions: 18.3
      }
    },
    {
      id: 5,
      title: "Budget vs Actual Analysis - YTD 2025",
      type: "Budget Analysis",
      description: "Year-to-date comparison of budgeted vs actual income and expenditure",
      generatedDate: "2025-10-20",
      generatedBy: "Finance Director",
      status: "completed",
      fileSize: "4.1 MB",
      downloadCount: 52,
      period: "Yearly",
      budgetedRevenue: 1250000,
      actualRevenue: 1180000,
      budgetVariance: -5.6,
      categories: ["Revenue", "Operating Expenses", "Capital Expenses", "Reserves"],
      highlights: {
        revenueVariance: -5.6,
        expenseVariance: 3.2,
        savingsTarget: 87.4
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
      case 'Financial Summary':
        return <BarChart3 className="w-5 h-5 text-green-500" />;
      case 'Fee Collection':
        return <CreditCard className="w-5 h-5 text-blue-500" />;
      case 'Expense Analysis':
        return <Receipt className="w-5 h-5 text-red-500" />;
      case 'Payroll Report':
        return <Wallet className="w-5 h-5 text-purple-500" />;
      case 'Budget Analysis':
        return <PieChart className="w-5 h-5 text-orange-500" />;
      default:
        return <DollarSign className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleDeleteClick = (report: any) => {
    setReportToDelete(report);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (reportToDelete) {
      setFinanceReports(prev => prev.filter(report => report.id !== reportToDelete.id));
      setShowDeleteModal(false);
      setReportToDelete(null);
    }
  };

  const filteredReports = financeReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    const matchesType = filterType === "all" || report.type === filterType;
    const matchesPeriod = filterPeriod === "all" || report.period === filterPeriod;
    
    return matchesSearch && matchesStatus && matchesType && matchesPeriod;
  });

  const reportTypes = [...new Set(financeReports.map(report => report.type))];
  const reportPeriods = [...new Set(financeReports.map(report => report.period))];
  
  const reportStats = {
    total: financeReports.length,
    completed: financeReports.filter(r => r.status === 'completed').length,
    processing: financeReports.filter(r => r.status === 'processing').length,
    totalDownloads: financeReports.reduce((sum, r) => sum + r.downloadCount, 0),
    totalRevenue: financeReports.reduce((sum, r) => sum + (r.totalRevenue || 0), 0),
    averageMargin: 8.5
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
          <span className="ml-2 text-gray-600">Loading finance reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Finance Reports</h1>
            <p className="text-green-100">Comprehensive financial analysis and reporting dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/headmaster/reports/finance/generate"
              className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
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
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 className="w-8 h-8 text-green-600" />
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
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(reportStats.totalRevenue)}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Profit Margin</p>
              <p className="text-3xl font-bold text-purple-600">{reportStats.averageMargin}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <PieChart className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {reportTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Periods</option>
            {reportPeriods.map(period => (
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
          <h2 className="text-xl font-semibold text-gray-900">Finance Reports ({filteredReports.length})</h2>
        </div>

        <div className="p-6">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Link
                href="/headmaster/reports/finance/generate"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
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
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Generated Date</p>
                          <p className="font-medium">{report.generatedDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Generated By</p>
                          <p className="font-medium">{report.generatedBy}</p>
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

                      {/* Financial Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                        {report.type === 'Financial Summary' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Total Revenue</p>
                              <p className="text-lg font-bold text-green-600">{formatCurrency(report.totalRevenue)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Total Expenses</p>
                              <p className="text-lg font-bold text-red-600">{formatCurrency(report.totalExpenses)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Net Income</p>
                              <p className="text-lg font-bold text-blue-600">{formatCurrency(report.netIncome)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Profit Margin</p>
                              <p className="text-lg font-bold text-purple-600">{report.highlights.profitMargin}%</p>
                            </div>
                          </>
                        )}
                        
                        {report.type === 'Fee Collection' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Total Expected</p>
                              <p className="text-lg font-bold text-blue-600">{formatCurrency(report.totalExpected)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Collected</p>
                              <p className="text-lg font-bold text-green-600">{formatCurrency(report.totalRevenue)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Collection Rate</p>
                              <p className="text-lg font-bold text-green-600">{report.collectionRate}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Outstanding</p>
                              <p className="text-lg font-bold text-red-600">{formatCurrency(report.outstandingAmount)}</p>
                            </div>
                          </>
                        )}

                        {report.type === 'Expense Analysis' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Total Expenses</p>
                              <p className="text-lg font-bold text-red-600">{formatCurrency(report.totalExpenses)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Budget Variance</p>
                              <p className={`text-lg font-bold ${report.budgetVariance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {report.budgetVariance}%
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Operational</p>
                              <p className="text-lg font-bold text-blue-600">{report.highlights.operationalCosts}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Staff Costs</p>
                              <p className="text-lg font-bold text-purple-600">{report.highlights.staffCosts}%</p>
                            </div>
                          </>
                        )}

                        {report.type === 'Payroll Report' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Total Payroll</p>
                              <p className="text-lg font-bold text-green-600">{formatCurrency(report.totalPayroll)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Staff Count</p>
                              <p className="text-lg font-bold text-blue-600">{report.staffCount}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Average Salary</p>
                              <p className="text-lg font-bold text-purple-600">{formatCurrency(report.averageSalary)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Salary Increase</p>
                              <p className="text-lg font-bold text-green-600">{report.highlights.salaryIncrease}%</p>
                            </div>
                          </>
                        )}

                        {report.type === 'Budget Analysis' && (
                          <>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Budgeted</p>
                              <p className="text-lg font-bold text-blue-600">{formatCurrency(report.budgetedRevenue)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Actual</p>
                              <p className="text-lg font-bold text-green-600">{formatCurrency(report.actualRevenue)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Variance</p>
                              <p className={`text-lg font-bold ${report.budgetVariance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {report.budgetVariance}%
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Savings Target</p>
                              <p className="text-lg font-bold text-purple-600">{report.highlights.savingsTarget}%</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        href={`/headmaster/reports/finance/${report.id}`}
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
                        href={`/headmaster/reports/finance/edit/${report.id}`}
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
                <h3 className="text-lg font-semibold text-gray-900">Delete Finance Report</h3>
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
                  <li>• Financial report file ({reportToDelete.fileSize})</li>
                  <li>• All financial data and analytics</li>
                  <li>• Download history ({reportToDelete.downloadCount} downloads)</li>
                  <li>• Generated charts and insights</li>
                  <li>• Historical financial comparisons</li>
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
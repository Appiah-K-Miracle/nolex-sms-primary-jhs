"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard, 
  PiggyBank, 
  Receipt,
  Calendar,
  ArrowRight,
  BarChart3,
  PieChart
} from "lucide-react";

export default function FinanceOverviewPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  // Sample financial data
  const financialSummary = {
    totalRevenue: 2450000,
    totalExpenses: 1850000,
    netIncome: 600000,
    pendingFees: 350000,
    totalStudents: 842,
    paidStudents: 756,
    pendingStudents: 86
  };

  const recentTransactions = [
    {
      id: 1,
      type: "income",
      description: "School Fees - Grade 5A",
      amount: 45000,
      date: "2025-10-30",
      status: "completed"
    },
    {
      id: 2,
      type: "expense",
      description: "Teaching Materials Purchase",
      amount: 25000,
      date: "2025-10-30",
      status: "completed"
    },
    {
      id: 3,
      type: "income",
      description: "Lunch Fees - October",
      amount: 120000,
      date: "2025-10-29",
      status: "completed"
    },
    {
      id: 4,
      type: "expense",
      description: "Staff Salary - October",
      amount: 850000,
      date: "2025-10-28",
      status: "completed"
    },
    {
      id: 5,
      type: "income",
      description: "Transport Fees - October",
      amount: 85000,
      date: "2025-10-27",
      status: "pending"
    }
  ];

  const quickActions = [
    {
      title: "Collect Fees",
      description: "Record new fee payments",
      href: "/headmaster/finance/fees/collect",
      icon: CreditCard,
      color: "bg-green-500"
    },
    {
      title: "Add Expense",
      description: "Record school expenses",
      href: "/headmaster/finance/expenses/add",
      icon: Receipt,
      color: "bg-red-500"
    },
    {
      title: "Process Payroll",
      description: "Manage staff salaries",
      href: "/headmaster/finance/payroll/process",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Generate Report",
      description: "Create financial reports",
      href: "/headmaster/finance/reports",
      icon: BarChart3,
      color: "bg-purple-500"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <DollarSign className="w-8 h-8" />
                Finance Overview
              </h1>
              <p className="text-green-100 mt-1">Monitor school financial performance and manage transactions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium">Net Income</p>
                <p className="text-2xl font-bold">{formatCurrency(financialSummary.netIncome)}</p>
              </div>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg backdrop-blur-sm text-white border-0 focus:ring-2 focus:ring-white/50"
              >
                <option value="This Week" className="text-gray-900">This Week</option>
                <option value="This Month" className="text-gray-900">This Month</option>
                <option value="This Quarter" className="text-gray-900">This Quarter</option>
                <option value="This Year" className="text-gray-900">This Year</option>
              </select>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(financialSummary.totalRevenue)}</p>
              <p className="text-sm text-green-500 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% from last month
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(financialSummary.totalExpenses)}</p>
              <p className="text-sm text-red-500 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.3% from last month
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Receipt className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Income</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(financialSummary.netIncome)}</p>
              <p className="text-sm text-green-500 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +18.2% from last month
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <PiggyBank className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Fees</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(financialSummary.pendingFees)}</p>
              <p className="text-sm text-orange-500 flex items-center mt-1">
                <TrendingDown className="w-4 h-4 mr-1" />
                -5.1% from last month
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <Link 
                href="/headmaster/finance/transactions" 
                className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className={`w-4 h-4 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`} />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Fee Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg mr-3 ${action.color}`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{action.title}</p>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Fee Collection Status */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Fee Collection Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Students</span>
                  <span className="font-semibold">{financialSummary.totalStudents}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">Fees Paid</span>
                    <span className="font-semibold text-green-600">{financialSummary.paidStudents}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(financialSummary.paidStudents / financialSummary.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {Math.round((financialSummary.paidStudents / financialSummary.totalStudents) * 100)}% collection rate
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-600">Pending Payments</span>
                    <span className="font-semibold text-orange-600">{financialSummary.pendingStudents}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${(financialSummary.pendingStudents / financialSummary.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <Link 
                  href="/headmaster/finance/fees" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-center block mt-4"
                >
                  Manage Fee Collections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
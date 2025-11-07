"use client";

import React, { useState } from "react";
import { 
  CreditCard, 
  DollarSign, 
  Receipt, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Download, 
  Search, 
  Filter, 
  Eye,
  Plus,
  Smartphone,
  Building2,
  User,
  FileText,
  TrendingUp,
  TrendingDown,
  Target,
  Banknote,
  Wallet,
  PiggyBank,
  BarChart3,
  History,
  Bell,
  Info,
  ExternalLink,
  Copy,
  CheckSquare,
  GraduationCap,
  BookOpen,
  Car
} from "lucide-react";

interface FeeItem {
  id: number;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  category: 'tuition' | 'books' | 'uniform' | 'transport' | 'extra' | 'exam' | 'boarding';
  academicTerm: string;
  paidAmount?: number;
  paidDate?: string;
  paymentMethod?: string;
  transactionId?: string;
  installments?: {
    total: number;
    paid: number;
    nextDue: string;
    nextAmount: number;
  };
}

interface Payment {
  id: number;
  date: string;
  amount: number;
  method: 'mobile_money' | 'bank_transfer' | 'cash' | 'cheque' | 'card';
  transactionId: string;
  status: 'completed' | 'pending' | 'failed';
  feeItems: string[];
  receiptNumber: string;
  processedBy: string;
}

interface StudentAccount {
  studentId: number;
  name: string;
  class: string;
  totalBalance: number;
  outstandingAmount: number;
  advancePayment: number;
  nextPaymentDue: string;
  nextPaymentAmount: number;
  feeItems: FeeItem[];
  payments: Payment[];
  paymentPlan?: {
    type: 'full' | 'installment';
    installments: number;
    frequency: 'monthly' | 'termly';
  };
}

export default function PaymentsPage() {
  const [selectedChild, setSelectedChild] = useState<number>(1);
  const [selectedView, setSelectedView] = useState<'overview' | 'fees' | 'payments' | 'statements'>('overview');
  const [selectedTerm, setSelectedTerm] = useState("current");
  const [showPaymentModal, setShowPaymentModal] = useState<number | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState<number | null>(null);

  // Sample payment data
  const studentAccounts: StudentAccount[] = [
    {
      studentId: 1,
      name: "Kwame Mensah",
      class: "JHS 2",
      totalBalance: -850, // Negative means amount owed
      outstandingAmount: 850,
      advancePayment: 0,
      nextPaymentDue: "2025-12-15",
      nextPaymentAmount: 450,
      paymentPlan: {
        type: 'installment',
        installments: 3,
        frequency: 'monthly'
      },
      feeItems: [
        {
          id: 1,
          description: "School Fees - Term 1, 2025",
          amount: 1200,
          dueDate: "2025-11-30",
          status: "partial",
          category: "tuition",
          academicTerm: "Term 1, 2025",
          paidAmount: 800,
          paidDate: "2025-10-15",
          paymentMethod: "mobile_money",
          transactionId: "MM2025101501",
          installments: {
            total: 3,
            paid: 2,
            nextDue: "2025-12-15",
            nextAmount: 400
          }
        },
        {
          id: 2,
          description: "Textbooks & Materials",
          amount: 350,
          dueDate: "2025-11-15",
          status: "paid",
          category: "books",
          academicTerm: "Term 1, 2025",
          paidAmount: 350,
          paidDate: "2025-11-10",
          paymentMethod: "bank_transfer",
          transactionId: "BT2025111001"
        },
        {
          id: 3,
          description: "School Uniform",
          amount: 200,
          dueDate: "2025-10-30",
          status: "paid",
          category: "uniform",
          academicTerm: "Term 1, 2025",
          paidAmount: 200,
          paidDate: "2025-10-25",
          paymentMethod: "cash",
          transactionId: "CASH202510250001"
        },
        {
          id: 4,
          description: "Transportation (Term 1)",
          amount: 300,
          dueDate: "2025-12-20",
          status: "pending",
          category: "transport",
          academicTerm: "Term 1, 2025"
        },
        {
          id: 5,
          description: "Examination Fees",
          amount: 150,
          dueDate: "2025-11-10",
          status: "overdue",
          category: "exam",
          academicTerm: "Term 1, 2025"
        }
      ],
      payments: [
        {
          id: 1,
          date: "2025-11-10",
          amount: 350,
          method: "bank_transfer",
          transactionId: "BT2025111001",
          status: "completed",
          feeItems: ["Textbooks & Materials"],
          receiptNumber: "RCP2025111001",
          processedBy: "Mrs. Asante"
        },
        {
          id: 2,
          date: "2025-10-25",
          amount: 200,
          method: "cash",
          transactionId: "CASH202510250001",
          status: "completed",
          feeItems: ["School Uniform"],
          receiptNumber: "RCP2025102501",
          processedBy: "Mr. Boateng"
        },
        {
          id: 3,
          date: "2025-10-15",
          amount: 400,
          method: "mobile_money",
          transactionId: "MM2025101501",
          status: "completed",
          feeItems: ["School Fees - Term 1, 2025 (Installment 1)"],
          receiptNumber: "RCP2025101501",
          processedBy: "System"
        },
        {
          id: 4,
          date: "2025-09-15",
          amount: 400,
          method: "mobile_money",
          transactionId: "MM2025091501",
          status: "completed",
          feeItems: ["School Fees - Term 1, 2025 (Initial Payment)"],
          receiptNumber: "RCP2025091501",
          processedBy: "System"
        }
      ]
    },
    {
      studentId: 2,
      name: "Ama Mensah",
      class: "Primary 5",
      totalBalance: 150, // Positive means advance payment
      outstandingAmount: 0,
      advancePayment: 150,
      nextPaymentDue: "2025-12-30",
      nextPaymentAmount: 800,
      feeItems: [
        {
          id: 6,
          description: "School Fees - Term 1, 2025",
          amount: 800,
          dueDate: "2025-11-30",
          status: "paid",
          category: "tuition",
          academicTerm: "Term 1, 2025",
          paidAmount: 800,
          paidDate: "2025-10-20",
          paymentMethod: "bank_transfer",
          transactionId: "BT2025102001"
        },
        {
          id: 7,
          description: "Textbooks & Materials",
          amount: 250,
          dueDate: "2025-11-15",
          status: "paid",
          category: "books",
          academicTerm: "Term 1, 2025",
          paidAmount: 250,
          paidDate: "2025-11-12",
          paymentMethod: "mobile_money",
          transactionId: "MM2025111201"
        },
        {
          id: 8,
          description: "Art Supplies",
          amount: 100,
          dueDate: "2025-12-01",
          status: "paid",
          category: "extra",
          academicTerm: "Term 1, 2025",
          paidAmount: 100,
          paidDate: "2025-11-28",
          paymentMethod: "cash",
          transactionId: "CASH202511280001"
        }
      ],
      payments: [
        {
          id: 5,
          date: "2025-11-28",
          amount: 100,
          method: "cash",
          transactionId: "CASH202511280001",
          status: "completed",
          feeItems: ["Art Supplies"],
          receiptNumber: "RCP2025112801",
          processedBy: "Ms. Nkrumah"
        },
        {
          id: 6,
          date: "2025-11-12",
          amount: 250,
          method: "mobile_money",
          transactionId: "MM2025111201",
          status: "completed",
          feeItems: ["Textbooks & Materials"],
          receiptNumber: "RCP2025111201",
          processedBy: "System"
        },
        {
          id: 7,
          date: "2025-10-20",
          amount: 950, // Overpaid by 150
          method: "bank_transfer",
          transactionId: "BT2025102001",
          status: "completed",
          feeItems: ["School Fees - Term 1, 2025", "Advance Payment"],
          receiptNumber: "RCP2025102001",
          processedBy: "Mrs. Asante"
        }
      ]
    }
  ];

  const children = [
    { id: 1, name: "Kwame Mensah", class: "JHS 2" },
    { id: 2, name: "Ama Mensah", class: "Primary 5" }
  ];

  const selectedStudentAccount = studentAccounts.find(account => account.studentId === selectedChild);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'partial': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4" />;
      case 'partial': return <TrendingUp className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tuition': return <GraduationCap className="w-4 h-4" />;
      case 'books': return <BookOpen className="w-4 h-4" />;
      case 'uniform': return <User className="w-4 h-4" />;
      case 'transport': return <Car className="w-4 h-4" />;
      case 'extra': return <Plus className="w-4 h-4" />;
      case 'exam': return <FileText className="w-4 h-4" />;
      default: return <Receipt className="w-4 h-4" />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'mobile_money': return <Smartphone className="w-4 h-4" />;
      case 'bank_transfer': return <Building2 className="w-4 h-4" />;
      case 'card': return <CreditCard className="w-4 h-4" />;
      case 'cash': return <Banknote className="w-4 h-4" />;
      case 'cheque': return <FileText className="w-4 h-4" />;
      default: return <Wallet className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return 'text-green-600'; // Advance payment
    if (balance < 0) return 'text-red-600'; // Amount owed
    return 'text-gray-600'; // Zero balance
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 flex items-center gap-3">
              <CreditCard className="w-8 h-8 lg:w-10 lg:h-10" />
              Fees & Payments
            </h1>
            <p className="text-green-100 text-sm lg:text-base xl:text-lg">
              Track school fees, payment history, and manage payment plans
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <button className="bg-white text-green-600 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Download className="w-4 h-4 lg:w-5 lg:h-5" />
              Download Statement
            </button>
            <button className="bg-green-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-green-400 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
              Make Payment
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Student:</label>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.class})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Term:</label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="current">Current Term</option>
                <option value="previous">Previous Term</option>
                <option value="year">Full Academic Year</option>
              </select>
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'fees', label: 'Fee Items' },
              { id: 'payments', label: 'Payments' },
              { id: 'statements', label: 'Statements' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id as any)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedView === tab.id ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedStudentAccount && (
        <>
          {/* Account Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Account Balance</h3>
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
              <div className={`text-2xl lg:text-3xl font-bold mb-1 ${getBalanceColor(selectedStudentAccount.totalBalance)}`}>
                {formatCurrency(Math.abs(selectedStudentAccount.totalBalance))}
              </div>
              <p className="text-xs lg:text-sm text-gray-600">
                {selectedStudentAccount.totalBalance > 0 ? 'Credit Balance' : 
                 selectedStudentAccount.totalBalance < 0 ? 'Amount Due' : 'Zero Balance'}
              </p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Outstanding</h3>
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-red-600 mb-1">
                {formatCurrency(selectedStudentAccount.outstandingAmount)}
              </div>
              <p className="text-xs lg:text-sm text-gray-600">Amount overdue</p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Next Payment</h3>
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-1">
                {formatCurrency(selectedStudentAccount.nextPaymentAmount)}
              </div>
              <p className="text-xs lg:text-sm text-gray-600">
                Due: {new Date(selectedStudentAccount.nextPaymentDue).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Payment Plan</h3>
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-1">
                {selectedStudentAccount.paymentPlan?.installments || 1}x
              </div>
              <p className="text-xs lg:text-sm text-gray-600 capitalize">
                {selectedStudentAccount.paymentPlan?.frequency || 'full'} plan
              </p>
            </div>
          </div>

          {/* Main Content */}
          {selectedView === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Recent Fees */}
              <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Fee Items</h2>
                  <button
                    onClick={() => setSelectedView('fees')}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    View All
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {selectedStudentAccount.feeItems.slice(0, 4).map((feeItem) => (
                    <div key={feeItem.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg border ${getStatusColor(feeItem.status)}`}>
                          {getStatusIcon(feeItem.status)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{feeItem.description}</h4>
                          <p className="text-xs text-gray-600">Due: {new Date(feeItem.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(feeItem.amount)}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(feeItem.status)}`}>
                          {feeItem.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Payments */}
              <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Payments</h2>
                  <button
                    onClick={() => setSelectedView('payments')}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    View All
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {selectedStudentAccount.payments.slice(0, 4).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          {getPaymentMethodIcon(payment.method)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">
                            {payment.feeItems.join(', ')}
                          </h4>
                          <p className="text-xs text-gray-600">{new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{formatCurrency(payment.amount)}</p>
                        <button
                          onClick={() => setShowReceiptModal(payment.id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          View Receipt
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'fees' && (
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm">
              <div className="p-4 lg:p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Fee Items</h2>
                <p className="text-sm text-gray-600 mt-1">All fee items for the selected term</p>
              </div>

              <div className="p-4 lg:p-6">
                <div className="space-y-4">
                  {selectedStudentAccount.feeItems.map((feeItem) => (
                    <div key={feeItem.id} className="border border-gray-200 rounded-lg p-4 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div className="flex items-center space-x-3 mb-2 lg:mb-0">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getCategoryIcon(feeItem.category)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{feeItem.description}</h3>
                            <p className="text-sm text-gray-600 capitalize">{feeItem.category} • {feeItem.academicTerm}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(feeItem.status)}`}>
                            {getStatusIcon(feeItem.status)}
                            <span className="ml-1 capitalize">{feeItem.status}</span>
                          </span>
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">{formatCurrency(feeItem.amount)}</p>
                            <p className="text-sm text-gray-600">Due: {new Date(feeItem.dueDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* Payment Progress */}
                      {feeItem.status === 'partial' && feeItem.paidAmount && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Payment Progress</span>
                            <span>{formatCurrency(feeItem.paidAmount)} of {formatCurrency(feeItem.amount)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(feeItem.paidAmount / feeItem.amount) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            Remaining: {formatCurrency(feeItem.amount - feeItem.paidAmount)}
                          </p>
                        </div>
                      )}

                      {/* Installment Info */}
                      {feeItem.installments && (
                        <div className="bg-blue-50 rounded-lg p-3 mb-4">
                          <h4 className="text-sm font-semibold text-blue-900 mb-2">Installment Plan</h4>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                            <div>
                              <p className="text-blue-700">Total Installments</p>
                              <p className="font-semibold text-blue-900">{feeItem.installments.total}</p>
                            </div>
                            <div>
                              <p className="text-blue-700">Paid</p>
                              <p className="font-semibold text-blue-900">{feeItem.installments.paid}</p>
                            </div>
                            <div>
                              <p className="text-blue-700">Next Due</p>
                              <p className="font-semibold text-blue-900">{new Date(feeItem.installments.nextDue).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-blue-700">Next Amount</p>
                              <p className="font-semibold text-blue-900">{formatCurrency(feeItem.installments.nextAmount)}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Payment Details */}
                      {feeItem.paidAmount && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <p className="font-medium">Paid Amount</p>
                            <p className="text-green-600 font-semibold">{formatCurrency(feeItem.paidAmount)}</p>
                          </div>
                          <div>
                            <p className="font-medium">Payment Date</p>
                            <p>{feeItem.paidDate && new Date(feeItem.paidDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="font-medium">Payment Method</p>
                            <p className="capitalize">{feeItem.paymentMethod?.replace('_', ' ')}</p>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-100">
                        {(feeItem.status === 'pending' || feeItem.status === 'partial' || feeItem.status === 'overdue') && (
                          <button
                            onClick={() => setShowPaymentModal(feeItem.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                          >
                            Make Payment
                          </button>
                        )}
                        {feeItem.transactionId && (
                          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
                            View Receipt
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'payments' && (
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm">
              <div className="p-4 lg:p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
                <p className="text-sm text-gray-600 mt-1">All payments made for this student</p>
              </div>

              <div className="p-4 lg:p-6">
                <div className="space-y-4">
                  {selectedStudentAccount.payments.map((payment) => (
                    <div key={payment.id} className="border border-gray-200 rounded-lg p-4 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div className="flex items-center space-x-4 mb-2 lg:mb-0">
                          <div className="p-3 bg-green-100 rounded-lg">
                            {getPaymentMethodIcon(payment.method)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Payment #{payment.receiptNumber}</h3>
                            <p className="text-sm text-gray-600">{new Date(payment.date).toLocaleDateString('en-GB', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">{formatCurrency(payment.amount)}</p>
                          <p className="text-sm text-gray-600 capitalize">{payment.method.replace('_', ' ')}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Payment For</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {payment.feeItems.map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Transaction Details</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>ID: {payment.transactionId}</p>
                            <p>Status: <span className={`capitalize ${payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{payment.status}</span></p>
                            <p>Processed by: {payment.processedBy}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Receipt</h4>
                          <div className="space-y-2">
                            <button
                              onClick={() => setShowReceiptModal(payment.id)}
                              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm w-full"
                            >
                              <Eye className="w-4 h-4 inline mr-2" />
                              View Receipt
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm w-full">
                              <Download className="w-4 h-4 inline mr-2" />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'statements' && (
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Account Statements</h3>
                <p className="text-gray-600 mb-6">
                  Generate and download detailed account statements for any period.
                </p>
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                      <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                      <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 w-full">
                    <Download className="w-4 h-4" />
                    Generate Statement
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Make Payment</h3>
              <button 
                onClick={() => setShowPaymentModal(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {(() => {
                const feeItem = selectedStudentAccount?.feeItems.find(f => f.id === showPaymentModal);
                if (!feeItem) return null;
                
                const remainingAmount = feeItem.amount - (feeItem.paidAmount || 0);
                
                return (
                  <>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{feeItem.description}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Total Amount: {formatCurrency(feeItem.amount)}</p>
                        {feeItem.paidAmount && (
                          <p>Paid Amount: {formatCurrency(feeItem.paidAmount)}</p>
                        )}
                        <p className="font-semibold">Remaining: {formatCurrency(remainingAmount)}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Amount</label>
                      <input 
                        type="number" 
                        placeholder="0.00"
                        max={remainingAmount}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                        <option value="">Select payment method</option>
                        <option value="mobile_money">Mobile Money</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="cash">Cash</option>
                      </select>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button 
                        onClick={() => setShowPaymentModal(null)}
                        className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        Proceed to Payment
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Payment Receipt</h3>
              <button 
                onClick={() => setShowReceiptModal(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              {(() => {
                const payment = selectedStudentAccount?.payments.find(p => p.id === showReceiptModal);
                if (!payment) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="text-center border-b border-gray-200 pb-4">
                      <h4 className="text-lg font-semibold text-gray-900">Nolex SMS Primary JHS</h4>
                      <p className="text-sm text-gray-600">Official Payment Receipt</p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Receipt No:</span>
                        <span className="font-medium">{payment.receiptNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{new Date(payment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Student:</span>
                        <span className="font-medium">{selectedStudentAccount.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Class:</span>
                        <span className="font-medium">{selectedStudentAccount.class}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium capitalize">{payment.method.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-medium">{payment.transactionId}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <h5 className="font-medium text-gray-900 mb-2">Payment Details</h5>
                      <div className="space-y-2">
                        {payment.feeItems.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item}</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                          <span>Total Paid:</span>
                          <span className="text-green-600">{formatCurrency(payment.amount)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                      <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
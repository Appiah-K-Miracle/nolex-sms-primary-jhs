"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  User, 
  CreditCard, 
  Receipt, 
  Clock,
  CheckCircle,
  XCircle,
  Edit3,
  Printer,
  Download,
  Send,
  MessageSquare
} from "lucide-react";

export default function FeeDetailPage({ params }: { params: { id: string } }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feeDetail, setFeeDetail] = useState<any>(null);

  // Sample fee database - in real app, this would be fetched from API
  const feeDatabase = [
    {
      id: 1,
      studentId: "NLX2025G301",
      studentName: "John Doe",
      grade: "Grade 3",
      class: "Grade 3A",
      feeType: "Tuition",
      amount: 120000,
      dueDate: "2025-11-15",
      paidDate: "2025-10-28",
      status: "paid",
      paymentMethod: "Bank Transfer",
      receiptNo: "RCP001234",
      academicYear: "2025/2026",
      term: "First Term",
      description: "Tuition fees for first term academic year 2025/2026",
      createdDate: "2025-09-15",
      createdBy: "Finance Department",
      parentInfo: {
        name: "Robert Doe",
        phone: "+233 24 123 4567",
        email: "robert.doe@email.com"
      },
      paymentHistory: [
        {
          id: 1,
          amount: 120000,
          date: "2025-10-28",
          method: "Bank Transfer",
          reference: "TXN789123456",
          receivedBy: "Mrs. Sarah Johnson"
        }
      ],
      reminders: [
        {
          id: 1,
          date: "2025-11-10",
          type: "SMS",
          status: "sent",
          message: "Reminder: Tuition fee payment due on 2025-11-15"
        }
      ]
    },
    {
      id: 2,
      studentId: "NLX2025G302",
      studentName: "Jane Smith",
      grade: "Grade 3",
      class: "Grade 3B",
      feeType: "Transport",
      amount: 15000,
      dueDate: "2025-11-01",
      paidDate: null,
      status: "pending",
      paymentMethod: null,
      receiptNo: null,
      academicYear: "2025/2026",
      term: "First Term",
      description: "Transport fees for first term academic year 2025/2026",
      createdDate: "2025-09-15",
      createdBy: "Finance Department",
      parentInfo: {
        name: "Michael Smith",
        phone: "+233 24 987 6543",
        email: "michael.smith@email.com"
      },
      paymentHistory: [],
      reminders: [
        {
          id: 1,
          date: "2025-10-25",
          type: "SMS",
          status: "sent",
          message: "Reminder: Transport fee payment due on 2025-11-01"
        },
        {
          id: 2,
          date: "2025-10-30",
          type: "Email",
          status: "sent",
          message: "Final reminder: Transport fee payment overdue"
        }
      ]
    },
    {
      id: 3,
      studentId: "NLX2025G201",
      studentName: "Michael Johnson",
      grade: "Grade 2",
      class: "Grade 2A",
      feeType: "Lunch",
      amount: 8000,
      dueDate: "2025-11-01",
      paidDate: "2025-10-30",
      status: "paid",
      paymentMethod: "Cash",
      receiptNo: "RCP001235",
      academicYear: "2025/2026",
      term: "First Term",
      description: "Lunch fees for first term academic year 2025/2026",
      createdDate: "2025-09-15",
      createdBy: "Finance Department",
      parentInfo: {
        name: "Sarah Johnson",
        phone: "+233 24 555 1234",
        email: "sarah.johnson@email.com"
      },
      paymentHistory: [
        {
          id: 1,
          amount: 8000,
          date: "2025-10-30",
          method: "Cash",
          reference: "CASH001235",
          receivedBy: "Mr. David Wilson"
        }
      ],
      reminders: []
    }
  ];

  // Simulate data fetching
  React.useEffect(() => {
    const fetchFeeDetail = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fee = feeDatabase.find(f => f.id === parseInt(params.id));
      setFeeDetail(fee);
      setLoading(false);
    };

    fetchFeeDetail();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm border border-green-300 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/finance/fees" 
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Fee Details</h1>
              <p className="text-green-100">Loading fee information...</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fee details...</p>
        </div>
      </div>
    );
  }

  if (!feeDetail) {
    return (
      <div className="p-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm border border-green-300 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/finance/fees" 
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Fee Details</h1>
              <p className="text-green-100">Fee record not found</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Fee Record Not Found</h3>
          <p className="text-gray-600 mb-6">The fee record with ID {params.id} could not be found.</p>
          <Link
            href="/headmaster/finance/fees"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Fee Management
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'overdue':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/headmaster/finance/fees"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Fee Management
          </Link>
        </div>
        <div className="flex gap-3">
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <Link
            href={`/headmaster/finance/fees/edit/${feeDetail.id}`}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Fee Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fee Details Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Fee Details</h2>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(feeDetail.status)}`}>
                  {getStatusIcon(feeDetail.status)}
                  <span className="text-sm font-medium capitalize">{feeDetail.status}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Fee Type</label>
                    <p className="text-lg font-semibold text-gray-900">{feeDetail.feeType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Amount</label>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(feeDetail.amount)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Academic Period</label>
                    <p className="text-gray-900">{feeDetail.academicYear} - {feeDetail.term}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <p className="text-gray-900">{feeDetail.description}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Due Date</label>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {feeDetail.dueDate}
                    </p>
                  </div>
                  {feeDetail.paidDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Paid Date</label>
                      <p className="text-green-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {feeDetail.paidDate}
                      </p>
                    </div>
                  )}
                  {feeDetail.paymentMethod && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Payment Method</label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        {feeDetail.paymentMethod}
                      </p>
                    </div>
                  )}
                  {feeDetail.receiptNo && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Receipt Number</label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-gray-400" />
                        {feeDetail.receiptNo}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
            </div>
            <div className="p-6">
              {feeDetail.paymentHistory.length > 0 ? (
                <div className="space-y-4">
                  {feeDetail.paymentHistory.map((payment) => (
                    <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                            <p className="text-sm text-gray-500">{payment.date} • {payment.method}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Reference: {payment.reference}</p>
                          <p className="text-sm text-gray-500">Received by: {payment.receivedBy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No payment history available</p>
                </div>
              )}
            </div>
          </div>

          {/* Reminders History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Reminders Sent</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
                  <Send className="w-4 h-4" />
                  Send Reminder
                </button>
              </div>
            </div>
            <div className="p-6">
              {feeDetail.reminders.length > 0 ? (
                <div className="space-y-4">
                  {feeDetail.reminders.map((reminder) => (
                    <div key={reminder.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <MessageSquare className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{reminder.type} Reminder</p>
                            <p className="text-sm text-gray-500">{reminder.date}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {reminder.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 ml-11">{reminder.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No reminders sent yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Student Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Student Information</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{feeDetail.studentName}</p>
                  <p className="text-sm text-gray-500">{feeDetail.studentId}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Grade & Class</label>
                  <p className="text-gray-900">{feeDetail.grade} - {feeDetail.class}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Parent/Guardian</label>
                  <p className="text-gray-900">{feeDetail.parentInfo.name}</p>
                  <p className="text-sm text-gray-500">{feeDetail.parentInfo.phone}</p>
                  <p className="text-sm text-gray-500">{feeDetail.parentInfo.email}</p>
                </div>
              </div>
              <Link
                href={`/headmaster/students/${feeDetail.studentId}`}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-center block mt-4"
              >
                View Student Profile
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {feeDetail.status !== 'paid' && (
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Record Payment
                  </button>
                )}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Reminder
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print Receipt
                </button>
              </div>
            </div>
          </div>

          {/* Fee Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Created Date</label>
                  <p className="text-gray-900">{feeDetail.createdDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created By</label>
                  <p className="text-gray-900">{feeDetail.createdBy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  User, 
  Building, 
  Receipt, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit3,
  Printer,
  Download,
  Tag,
  FileText,
  CreditCard
} from "lucide-react";

export default function ExpenseDetailPage({ params }: { params: { id: string } }) {
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expenseDetail, setExpenseDetail] = useState<any>(null);

  // Sample expense database - in real app, this would be fetched from API
  const expenseDatabase = [
    {
      id: 1,
      title: "Teaching Materials Purchase",
      category: "Educational",
      amount: 25000,
      date: "2025-10-30",
      vendor: "Educational Supplies Ltd",
      status: "approved",
      approvedBy: "John Smith",
      approvedDate: "2025-10-25",
      description: "Purchase of textbooks, notebooks, and learning materials for Grade 3 students. This includes mathematics workbooks, English readers, science kits, and art supplies for the upcoming term.",
      receiptNumber: "EXP001234",
      paymentMethod: "Bank Transfer",
      requestedBy: "Sarah Johnson",
      requestDate: "2025-10-20",
      budgetCategory: "Educational Materials",
      vendorInfo: {
        name: "Educational Supplies Ltd",
        contact: "+233 24 555 0123",
        email: "orders@edusupplies.com.gh",
        address: "123 Education Street, Accra"
      },
      attachments: [
        {
          id: 1,
          name: "Invoice_EXP001234.pdf",
          type: "Invoice",
          size: "245 KB",
          uploadedDate: "2025-10-20"
        },
        {
          id: 2,
          name: "Receipt_Payment.jpg",
          type: "Receipt",
          size: "180 KB",
          uploadedDate: "2025-10-30"
        }
      ],
      approvalHistory: [
        {
          id: 1,
          action: "Submitted",
          by: "Sarah Johnson",
          date: "2025-10-20",
          comment: "Urgent request for teaching materials"
        },
        {
          id: 2,
          action: "Approved",
          by: "John Smith",
          date: "2025-10-25",
          comment: "Approved for educational purposes"
        }
      ]
    },
    {
      id: 2,
      title: "Office Cleaning Supplies",
      category: "Maintenance",
      amount: 8500,
      date: "2025-10-28",
      vendor: "CleanCorp Ghana",
      status: "pending",
      approvedBy: null,
      approvedDate: null,
      description: "Monthly supply of cleaning materials including detergents, mops, brooms, and sanitizers for office maintenance.",
      receiptNumber: "EXP001235",
      paymentMethod: "Cash",
      requestedBy: "Michael Davis",
      requestDate: "2025-10-25",
      budgetCategory: "Maintenance",
      vendorInfo: {
        name: "CleanCorp Ghana",
        contact: "+233 24 777 8888",
        email: "orders@cleancorp.gh",
        address: "45 Cleaning Avenue, Kumasi"
      },
      attachments: [
        {
          id: 1,
          name: "Quote_Cleaning_Supplies.pdf",
          type: "Quote",
          size: "165 KB",
          uploadedDate: "2025-10-25"
        }
      ],
      approvalHistory: [
        {
          id: 1,
          action: "Submitted",
          by: "Michael Davis",
          date: "2025-10-25",
          comment: "Regular monthly cleaning supplies order"
        }
      ]
    },
    {
      id: 3,
      title: "Computer Repair Services",
      category: "Technology",
      amount: 3200,
      date: "2025-10-26",
      vendor: "TechFix Solutions",
      status: "paid",
      approvedBy: "John Smith",
      approvedDate: "2025-10-24",
      description: "Repair of 5 desktop computers in the computer lab. Issues included RAM upgrades, hard drive replacements, and software installations.",
      receiptNumber: "EXP001236",
      paymentMethod: "Mobile Money",
      requestedBy: "David Wilson",
      requestDate: "2025-10-22",
      budgetCategory: "Technology Maintenance",
      vendorInfo: {
        name: "TechFix Solutions",
        contact: "+233 20 444 5555",
        email: "support@techfix.gh",
        address: "78 Tech Street, Accra"
      },
      attachments: [
        {
          id: 1,
          name: "Service_Report.pdf",
          type: "Service Report",
          size: "320 KB",
          uploadedDate: "2025-10-26"
        },
        {
          id: 2,
          name: "Payment_Receipt.jpg",
          type: "Receipt",
          size: "210 KB",
          uploadedDate: "2025-10-26"
        }
      ],
      approvalHistory: [
        {
          id: 1,
          action: "Submitted",
          by: "David Wilson",
          date: "2025-10-22",
          comment: "Urgent computer repairs needed for lab"
        },
        {
          id: 2,
          action: "Approved",
          by: "John Smith",
          date: "2025-10-24",
          comment: "Approved for immediate repair"
        },
        {
          id: 3,
          action: "Paid",
          by: "Finance Department",
          date: "2025-10-26",
          comment: "Payment processed via mobile money"
        }
      ]
    }
  ];

  // Simulate data fetching
  React.useEffect(() => {
    const fetchExpenseDetail = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const expense = expenseDatabase.find(e => e.id === parseInt(params.id));
      setExpenseDetail(expense);
      setLoading(false);
    };

    fetchExpenseDetail();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm border border-green-300 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/finance/expenses" 
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Expense Details</h1>
              <p className="text-green-100">Loading expense information...</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading expense details...</p>
        </div>
      </div>
    );
  }

  if (!expenseDetail) {
    return (
      <div className="p-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm border border-green-300 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/finance/expenses" 
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Expense Details</h1>
              <p className="text-green-100">Expense record not found</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Expense Record Not Found</h3>
          <p className="text-gray-600 mb-6">The expense record with ID {params.id} could not be found.</p>
          <Link
            href="/headmaster/finance/expenses"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Expense Management
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'paid':
        return <CheckCircle className="w-6 h-6 text-blue-500" />;
      case 'rejected':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'paid':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected':
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

  const handleApproval = (action: string) => {
    console.log(`${action} expense:`, expenseDetail);
    setShowApprovalModal(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm border border-green-300 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/finance/expenses" 
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Expense Details</h1>
              <p className="text-green-100">Detailed expense information</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(expenseDetail.status)}
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(expenseDetail.status)}`}>
              {expenseDetail.status.charAt(0).toUpperCase() + expenseDetail.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Expense Information */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Expense Information</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{expenseDetail.title}</h3>
                <p className="text-gray-600">{expenseDetail.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{expenseDetail.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium text-lg">{formatCurrency(expenseDetail.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{expenseDetail.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium">{expenseDetail.paymentMethod}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Vendor Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vendor:</span>
                      <span className="font-medium">{expenseDetail.vendor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact:</span>
                      <span className="font-medium">{expenseDetail.vendorInfo.contact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{expenseDetail.vendorInfo.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Approval History */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Approval History</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {expenseDetail.approvalHistory.map((item: any, index: number) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{item.action}</h4>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">by {item.by}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Information</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(expenseDetail.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(expenseDetail.status)}`}>
                    {expenseDetail.status.charAt(0).toUpperCase() + expenseDetail.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount</span>
                <span className="font-bold text-lg">{formatCurrency(expenseDetail.amount)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Requested By</span>
                <span className="font-medium">{expenseDetail.requestedBy}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Request Date</span>
                <span className="font-medium">{expenseDetail.requestDate}</span>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Attachments</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {expenseDetail.attachments.map((attachment: any) => (
                  <div key={attachment.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                      <p className="text-xs text-gray-600">{attachment.type} • {attachment.size}</p>
                    </div>
                    <button className="text-green-600 hover:text-green-700">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <Link
                href={`/headmaster/finance/expenses/edit/${params.id}`}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Edit Expense
              </Link>

              <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Download Receipt
              </button>

              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                <Printer className="w-4 h-4" />
                Print Details
              </button>

              {expenseDetail.status === 'pending' && (
                <button
                  onClick={() => setShowApprovalModal(true)}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Expense
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Approve Expense</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to approve this expense of {formatCurrency(expenseDetail.amount)}?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleApproval('approve')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
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
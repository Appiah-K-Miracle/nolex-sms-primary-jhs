"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  Download,
  Print,
  Share2,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Receipt,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Info,
  Calendar,
  DollarSign,
  RefreshCw,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  Eye,
  EyeOff,
  Star,
  Flag,
  MoreVertical,
  Copy,
  ExternalLink,
  Edit3,
  Trash2,
  Plus,
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  History,
  Settings,
  Bell,
  BellOff,
  Archive,
  Send
} from "lucide-react";

export default function PaymentDetailPage() {
  const params = useParams();
  const paymentId = params.id as string;
  
  const [activeTab, setActiveTab] = useState<'details' | 'receipt' | 'history' | 'related'>('details');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);

  // Sample payment data - in a real app, this would be fetched based on paymentId
  const payment = {
    id: `PAY${paymentId.padStart(6, '0')}`,
    transactionId: `TXN${paymentId}${new Date().getFullYear()}`,
    reference: `REF-NOLEX-${paymentId}-2025`,
    amount: 850.00,
    currency: "GHS",
    status: "completed", // pending, completed, failed, refunded, disputed
    paymentDate: "2025-01-15T14:30:00Z",
    dueDate: "2025-01-10T23:59:59Z",
    
    // Payment details
    description: "School Fees - JHS 2B - Term 1, 2025",
    category: "tuition", // tuition, uniform, books, transport, events, extras
    academic: {
      term: "Term 1",
      year: "2025",
      student: "Kwame Mensah",
      class: "JHS 2B",
      studentId: "STU001234"
    },
    
    // Breakdown
    breakdown: [
      { item: "Tuition Fee", amount: 600.00, type: "required" },
      { item: "Development Levy", amount: 100.00, type: "required" },
      { item: "Library Fee", amount: 50.00, type: "required" },
      { item: "Sports & Activities", amount: 75.00, type: "optional" },
      { item: "PTA Dues", amount: 25.00, type: "optional" }
    ],
    
    // Payment method
    paymentMethod: {
      type: "mobile_money", // mobile_money, bank_card, bank_transfer, cash, cheque
      provider: "MTN Mobile Money",
      accountNumber: "*****8901",
      transactionFee: 8.50,
      network: "MTN",
      reference: "MM240115143045"
    },
    
    // Payer information
    payer: {
      name: "John Mensah",
      phone: "+233 24 123 4567",
      email: "john.mensah@email.com",
      relationship: "Father"
    },
    
    // Processing information
    processing: {
      initiatedBy: "Parent Portal",
      processedBy: "Automated System",
      approvedBy: "Mrs. Dorothy Asante",
      processingTime: "2 minutes",
      confirmationCode: "CNF789456123",
      receiptNumber: "RCP2025010001"
    },
    
    // Status history
    statusHistory: [
      {
        status: "initiated",
        timestamp: "2025-01-15T14:28:00Z",
        description: "Payment initiated by parent",
        actor: "John Mensah"
      },
      {
        status: "processing",
        timestamp: "2025-01-15T14:29:00Z",
        description: "Payment being processed by mobile money provider",
        actor: "MTN Mobile Money"
      },
      {
        status: "completed",
        timestamp: "2025-01-15T14:30:00Z",
        description: "Payment successfully completed and verified",
        actor: "System"
      },
      {
        status: "recorded",
        timestamp: "2025-01-15T14:31:00Z",
        description: "Payment recorded in student account",
        actor: "Finance Office"
      }
    ],
    
    // Related information
    relatedPayments: [
      {
        id: "PAY000123",
        description: "Uniform Payment",
        amount: 120.00,
        date: "2024-12-15T10:00:00Z",
        status: "completed"
      },
      {
        id: "PAY000089",
        description: "Book Fees - Term 1",
        amount: 200.00,
        date: "2024-12-10T16:30:00Z",
        status: "completed"
      }
    ],
    
    // Additional details
    notes: "Payment made on time. Thank you for your prompt payment.",
    tags: ["term-1", "tuition", "on-time"],
    receiptAvailable: true,
    refundEligible: false,
    disputeEligible: true,
    
    // Financial details
    balance: {
      previousBalance: 850.00,
      paidAmount: 850.00,
      remainingBalance: 0.00,
      nextDueAmount: 850.00,
      nextDueDate: "2025-04-10T23:59:59Z"
    },
    
    // School information
    school: {
      name: "Nolex SMS Primary & JHS",
      accountNumber: "ACC-NOLEX-2025",
      bankDetails: {
        bank: "GCB Bank",
        accountNumber: "1234567890",
        branch: "Accra Main"
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-100 border-green-200';
      case 'pending': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'processing': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'failed': return 'text-red-700 bg-red-100 border-red-200';
      case 'refunded': return 'text-purple-700 bg-purple-100 border-purple-200';
      case 'disputed': return 'text-orange-700 bg-orange-100 border-orange-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'processing': return <RefreshCw className="w-5 h-5 animate-spin" />;
      case 'failed': return <XCircle className="w-5 h-5" />;
      case 'refunded': return <RefreshCw className="w-5 h-5" />;
      case 'disputed': return <AlertTriangle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'mobile_money': return <Smartphone className="w-5 h-5" />;
      case 'bank_card': return <CreditCard className="w-5 h-5" />;
      case 'bank_transfer': return <Building className="w-5 h-5" />;
      case 'cash': return <Wallet className="w-5 h-5" />;
      case 'cheque': return <FileText className="w-5 h-5" />;
      default: return <DollarSign className="w-5 h-5" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: payment.currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download the receipt
    console.log('Downloading receipt for payment:', payment.id);
  };

  const handlePrintReceipt = () => {
    // In a real app, this would open the print dialog
    console.log('Printing receipt for payment:', payment.id);
  };

  const handleSharePayment = () => {
    // In a real app, this would open sharing options
    console.log('Sharing payment details:', payment.id);
  };

  const handleDispute = () => {
    setShowDisputeModal(true);
  };

  const handleRefund = () => {
    setShowRefundModal(true);
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/parent/payments"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Payment Details</h1>
          <p className="text-gray-600">Transaction ID: {payment.transactionId}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadReceipt}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={handlePrintReceipt}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            <Print className="w-5 h-5" />
          </button>
          <button
            onClick={handleSharePayment}
            className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Payment Summary */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6 lg:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg border ${getStatusColor(payment.status)}`}>
                    {getStatusIcon(payment.status)}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{formatCurrency(payment.amount)}</h2>
                </div>
                <p className="text-lg text-gray-600 mb-2">{payment.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Payment ID: {payment.id}</span>
                  <span>•</span>
                  <span>Paid on {formatDate(payment.paymentDate)}</span>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full font-medium border ${getStatusColor(payment.status)}`}>
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>

            {/* Key Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Student</p>
                    <p className="text-gray-600">{payment.academic.student} - {payment.academic.class}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Academic Period</p>
                    <p className="text-gray-600">{payment.academic.term}, {payment.academic.year}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {getPaymentMethodIcon(payment.paymentMethod.type)}
                  <div>
                    <p className="font-medium text-gray-900">Payment Method</p>
                    <p className="text-gray-600">{payment.paymentMethod.provider}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Receipt className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Receipt Number</p>
                    <p className="text-gray-600">{payment.processing.receiptNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleDownloadReceipt}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
              
              <button
                onClick={handlePrintReceipt}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Print className="w-4 h-4" />
                Print
              </button>

              {payment.disputeEligible && (
                <button
                  onClick={handleDispute}
                  className="px-4 py-2 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-colors flex items-center gap-2"
                >
                  <Flag className="w-4 h-4" />
                  Dispute
                </button>
              )}

              {payment.refundEligible && (
                <button
                  onClick={handleRefund}
                  className="px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Request Refund
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'details', name: 'Payment Details', icon: Info },
                  { id: 'receipt', name: 'Receipt', icon: Receipt },
                  { id: 'history', name: 'Transaction History', icon: History },
                  { id: 'related', name: 'Related Payments', icon: FileText }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {tab.name}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Payment Breakdown */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        {payment.breakdown.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-gray-900">{item.item}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.type === 'required' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {item.type}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">{formatCurrency(item.amount)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-200 mt-4 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">Transaction Fee</span>
                          <span className="font-medium text-gray-900">{formatCurrency(payment.paymentMethod.transactionFee)}</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-300 mt-4 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-900">Total Paid</span>
                          <span className="text-lg font-bold text-gray-900">{formatCurrency(payment.amount + payment.paymentMethod.transactionFee)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payer Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">{payment.payer.name}</p>
                          <p className="text-sm text-gray-600">{payment.payer.relationship}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">Phone</p>
                          <p className="text-sm text-gray-600">{payment.payer.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 md:col-span-2">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">Email</p>
                          <p className="text-sm text-gray-600">{payment.payer.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Details</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-blue-900">Provider</p>
                          <p className="text-blue-800">{payment.paymentMethod.provider}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-blue-900">Account Number</p>
                          <p className="text-blue-800">{payment.paymentMethod.accountNumber}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-blue-900">Reference</p>
                          <p className="text-blue-800">{payment.paymentMethod.reference}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-blue-900">Network</p>
                          <p className="text-blue-800">{payment.paymentMethod.network}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Processing Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-gray-900">Initiated By</p>
                        <p className="text-gray-600">{payment.processing.initiatedBy}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">Processed By</p>
                        <p className="text-gray-600">{payment.processing.processedBy}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">Approved By</p>
                        <p className="text-gray-600">{payment.processing.approvedBy}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">Processing Time</p>
                        <p className="text-gray-600">{payment.processing.processingTime}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900">Confirmation Code</p>
                        <p className="text-gray-600 font-mono">{payment.processing.confirmationCode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Balance Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Balance Information</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-green-900">Previous Balance</p>
                          <p className="text-green-800">{formatCurrency(payment.balance.previousBalance)}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-green-900">Amount Paid</p>
                          <p className="text-green-800">{formatCurrency(payment.balance.paidAmount)}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-green-900">Remaining Balance</p>
                          <p className="text-green-800">{formatCurrency(payment.balance.remainingBalance)}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-green-900">Next Due Amount</p>
                          <p className="text-green-800">{formatCurrency(payment.balance.nextDueAmount)}</p>
                        </div>
                        
                        <div className="md:col-span-2">
                          <p className="font-medium text-green-900">Next Due Date</p>
                          <p className="text-green-800">{formatDate(payment.balance.nextDueDate)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {payment.notes && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-900">{payment.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'receipt' && (
                <div className="space-y-6">
                  {/* Receipt Header */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Receipt</h3>
                    <p className="text-gray-600">Official receipt for payment transaction</p>
                  </div>

                  {/* School Information */}
                  <div className="text-center border-b border-gray-200 pb-6">
                    <h4 className="text-xl font-bold text-blue-900">{payment.school.name}</h4>
                    <p className="text-gray-600">School Account: {payment.school.accountNumber}</p>
                  </div>

                  {/* Receipt Details */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-gray-900">Receipt Number:</p>
                        <p className="text-gray-600">{payment.processing.receiptNumber}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Transaction ID:</p>
                        <p className="text-gray-600">{payment.transactionId}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Payment Date:</p>
                        <p className="text-gray-600">{formatDate(payment.paymentDate)}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Payment Method:</p>
                        <p className="text-gray-600">{payment.paymentMethod.provider}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="font-medium text-gray-900 mb-2">Paid by:</p>
                      <p className="text-gray-600">{payment.payer.name} ({payment.payer.relationship})</p>
                      <p className="text-gray-600">{payment.payer.phone}</p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="font-medium text-gray-900 mb-2">Student Information:</p>
                      <p className="text-gray-600">{payment.academic.student}</p>
                      <p className="text-gray-600">{payment.academic.class} - {payment.academic.term}, {payment.academic.year}</p>
                    </div>
                  </div>

                  {/* Payment Breakdown */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4">Payment Details</h4>
                    <div className="space-y-2">
                      {payment.breakdown.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600">{item.item}</span>
                          <span className="text-gray-900">{formatCurrency(item.amount)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transaction Fee</span>
                          <span className="text-gray-900">{formatCurrency(payment.paymentMethod.transactionFee)}</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-300 pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-900">Total Paid</span>
                          <span className="text-gray-900">{formatCurrency(payment.amount + payment.paymentMethod.transactionFee)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Receipt Footer */}
                  <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-4">
                    <p>This is an official receipt generated electronically.</p>
                    <p>For any queries, contact the school finance office.</p>
                    <p className="mt-2 font-mono">Receipt generated on {formatDate(new Date().toISOString())}</p>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Transaction Status History</h3>
                  
                  <div className="space-y-4">
                    {payment.statusHistory.map((status, index) => (
                      <div key={index} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getStatusColor(status.status)}`}>
                            {getStatusIcon(status.status)}  
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 capitalize">{status.status.replace('_', ' ')}</h4>
                            <span className="text-sm text-gray-500">{formatDate(status.timestamp)}</span>
                          </div>
                          <p className="text-gray-700 text-sm mb-1">{status.description}</p>
                          <p className="text-gray-500 text-xs">By: {status.actor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'related' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Related Payments</h3>
                  
                  {payment.relatedPayments.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No related payments found</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {payment.relatedPayments.map((related) => (
                        <Link
                          key={related.id}
                          href={`/parent/payments/${related.id.replace('PAY', '')}`}
                          className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{related.description}</h4>
                              <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                                <span>ID: {related.id}</span>
                                <span>{formatDate(related.date)}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(related.status)}`}>
                                  {related.status}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-gray-900">{formatCurrency(related.amount)}</div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium text-2xl text-green-600">{formatCurrency(payment.amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Method:</span>
                <span className="font-medium">{payment.paymentMethod.provider}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{formatRelativeTime(payment.paymentDate)}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={handleDownloadReceipt}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
              <button
                onClick={handlePrintReceipt}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Print className="w-4 h-4" />
                Print Receipt
              </button>
              <button
                onClick={handleSharePayment}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Details
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Copy className="w-4 h-4" />
                Copy Transaction ID
              </button>
            </div>
          </div>

          {/* Student Information */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Student Information</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-blue-900">{payment.academic.student}</p>
                <p className="text-blue-700">{payment.academic.class}</p>
              </div>
              <div>
                <p className="text-sm text-blue-800">Academic Period</p>
                <p className="font-medium text-blue-900">{payment.academic.term}, {payment.academic.year}</p>
              </div>
              <div>
                <p className="text-sm text-blue-800">Student ID</p>
                <p className="font-medium text-blue-900">{payment.academic.studentId}</p>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">Need Help?</h3>
            <div className="space-y-3">
              <p className="text-yellow-800 text-sm">
                If you have questions about this payment or need assistance, please contact our finance office.
              </p>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                  Contact Finance Office
                </button>
                <button
                  onClick={handleDispute}
                  className="w-full px-4 py-2 border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-sm"
                >
                  Report Issue
                </button>
              </div>
            </div>
          </div>

          {/* Payment Tags */}
          {payment.tags.length > 0 && (
            <div className="bg-gray-50 rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {payment.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
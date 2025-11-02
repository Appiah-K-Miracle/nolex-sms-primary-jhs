"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  Download,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  User,
  Calendar,
  DollarSign
} from "lucide-react";

export default function FeeManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterGrade, setFilterGrade] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feeToDelete, setFeeToDelete] = useState<any>(null);

  // Sample fee data
  const feeRecords = [
    {
      id: 1,
      studentId: "NLX2025G301",
      studentName: "John Doe",
      grade: "Grade 3",
      feeType: "Tuition",
      amount: 500,
      dueDate: "2025-11-15",
      paidDate: "2025-10-28",
      status: "paid",
      paymentMethod: "Bank Transfer",
      receiptNo: "RCP001234"
    },
    {
      id: 2,
      studentId: "NLX2025G302",
      studentName: "Jane Smith",
      grade: "Grade 3",
      feeType: "Lunch",
      amount: 120,
      dueDate: "2025-11-01",
      paidDate: null,
      status: "pending",
      paymentMethod: null,
      receiptNo: null
    },
    {
      id: 3,
      studentId: "NLX2025G401",
      studentName: "Mike Johnson",
      grade: "Grade 4",
      feeType: "Transport",
      amount: 80,
      dueDate: "2025-10-25",
      paidDate: null,
      status: "overdue",
      paymentMethod: null,
      receiptNo: null
    },
    {
      id: 4,
      studentId: "NLX2025G502",
      studentName: "Sarah Wilson",
      grade: "Grade 5",
      feeType: "Tuition",
      amount: 550,
      dueDate: "2025-11-10",
      paidDate: "2025-11-01",
      status: "paid",
      paymentMethod: "Cash",
      receiptNo: "RCP001235"
    },
    {
      id: 5,
      studentId: "NLX2025G203",
      studentName: "David Brown",
      grade: "Grade 2",
      feeType: "Activity",
      amount: 45,
      dueDate: "2025-11-20",
      paidDate: null,
      status: "pending",
      paymentMethod: null,
      receiptNo: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'overdue':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openDeleteModal = (fee: any) => {
    setFeeToDelete(fee);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    // Delete logic here
    console.log("Deleting fee:", feeToDelete);
    setShowDeleteModal(false);
    setFeeToDelete(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredFees = feeRecords.filter(fee => {
    const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.feeType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || fee.status === filterStatus;
    const matchesGrade = filterGrade === "all" || fee.grade === filterGrade;
    
    return matchesSearch && matchesStatus && matchesGrade;
  });

  const summaryStats = {
    totalFees: feeRecords.reduce((sum, fee) => sum + fee.amount, 0),
    paidFees: feeRecords.filter(fee => fee.status === 'paid').reduce((sum, fee) => sum + fee.amount, 0),
    pendingFees: feeRecords.filter(fee => fee.status === 'pending').reduce((sum, fee) => sum + fee.amount, 0),
    overdueFees: feeRecords.filter(fee => fee.status === 'overdue').reduce((sum, fee) => sum + fee.amount, 0)
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm border border-green-300 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Fee Management</h1>
            <p className="text-green-100">Track and manage student fee payments</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/headmaster/finance/fees/collect"
              className="bg-white hover:bg-gray-100 text-green-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              Collect Payment
            </Link>
            <Link
              href="/headmaster/finance/fees/setup"
              className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Fee Setup
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Fees</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(summaryStats.totalFees)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Paid</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(summaryStats.paidFees)}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-yellow-600">{formatCurrency(summaryStats.pendingFees)}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(summaryStats.overdueFees)}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by student name, ID, or fee type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Grades</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
              </select>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Records Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{fee.studentName}</div>
                        <div className="text-sm text-gray-500">{fee.studentId} • {fee.grade}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{fee.feeType}</div>
                    {fee.receiptNo && (
                      <div className="text-sm text-gray-500">Receipt: {fee.receiptNo}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(fee.amount)}</div>
                    {fee.paymentMethod && (
                      <div className="text-sm text-gray-500">{fee.paymentMethod}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{fee.dueDate}</div>
                    {fee.paidDate && (
                      <div className="text-sm text-green-600">Paid: {fee.paidDate}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(fee.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(fee.status)}`}>
                        {fee.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/headmaster/finance/fees/${fee.id}`}
                        className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/headmaster/finance/fees/edit/${fee.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => openDeleteModal(fee)}
                        className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredFees.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <DollarSign className="w-12 h-12 mx-auto text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No fee records found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center mb-4">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Fee Record</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete the fee record for "<strong>{feeToDelete?.studentName}</strong>" - {feeToDelete?.feeType}? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
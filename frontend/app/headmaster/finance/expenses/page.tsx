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
  Receipt,
  Calendar,
  DollarSign,
  Tag,
  User,
  Building
} from "lucide-react";

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<any>(null);

  // Sample expense data
  const expenses = [
    {
      id: 1,
      title: "Teaching Materials Purchase",
      category: "Educational",
      amount: 25000,
      date: "2025-10-30",
      vendor: "Educational Supplies Ltd",
      status: "approved",
      approvedBy: "John Smith",
      description: "Textbooks and learning materials for Grade 3",
      receiptNumber: "EXP001234",
      paymentMethod: "Bank Transfer"
    },
    {
      id: 2,
      title: "Monthly Electricity Bill",
      category: "Utilities",
      amount: 1200,
      date: "2025-10-28",
      vendor: "ECG Ghana",
      status: "paid",
      approvedBy: "Sarah Johnson",
      description: "Electricity bill for October 2025",
      receiptNumber: "EXP001235",
      paymentMethod: "Direct Debit"
    },
    {
      id: 3,
      title: "Office Furniture",
      category: "Infrastructure",
      amount: 8500,
      date: "2025-10-25",
      vendor: "Office Solutions Ghana",
      status: "pending",
      approvedBy: null,
      description: "Chairs and desks for administrative office",
      receiptNumber: null,
      paymentMethod: null
    },
    {
      id: 4,
      title: "Internet Service",
      category: "Technology",
      amount: 350,
      date: "2025-10-20",
      vendor: "MTN Business",
      status: "paid",
      approvedBy: "Michael Brown",
      description: "Monthly internet subscription",
      receiptNumber: "EXP001236",
      paymentMethod: "Mobile Money"
    },
    {
      id: 5,
      title: "School Bus Maintenance",
      category: "Transportation",
      amount: 2800,
      date: "2025-10-18",
      vendor: "Auto Care Services",
      status: "approved",
      approvedBy: "John Smith",
      description: "Routine maintenance and repairs for school bus",
      receiptNumber: "EXP001237",
      paymentMethod: "Cash"
    }
  ];

  const categories = [
    "Educational", "Utilities", "Infrastructure", "Technology", 
    "Transportation", "Administrative", "Maintenance", "Staff", "Other"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const openDeleteModal = (expense: any) => {
    setExpenseToDelete(expense);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    console.log("Deleting expense:", expenseToDelete);
    setShowDeleteModal(false);
    setExpenseToDelete(null);
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || expense.category === filterCategory;
    const matchesStatus = filterStatus === "all" || expense.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const summaryStats = {
    totalExpenses: expenses.reduce((sum, expense) => sum + expense.amount, 0),
    approvedExpenses: expenses.filter(expense => expense.status === 'approved').reduce((sum, expense) => sum + expense.amount, 0),
    paidExpenses: expenses.filter(expense => expense.status === 'paid').reduce((sum, expense) => sum + expense.amount, 0),
    pendingExpenses: expenses.filter(expense => expense.status === 'pending').reduce((sum, expense) => sum + expense.amount, 0)
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm border border-green-300 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Expense Management</h1>
            <p className="text-green-100">Track and manage school expenses</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/headmaster/finance/expenses/add"
              className="bg-white hover:bg-gray-100 text-green-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Expense
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(summaryStats.totalExpenses)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(summaryStats.approvedExpenses)}</p>
            </div>
            <Receipt className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Paid</p>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(summaryStats.paidExpenses)}</p>
            </div>
            <Building className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-yellow-600">{formatCurrency(summaryStats.pendingExpenses)}</p>
            </div>
            <Tag className="w-8 h-8 text-yellow-500" />
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
                  placeholder="Search by title, vendor, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="paid">Paid</option>
                <option value="rejected">Rejected</option>
              </select>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{expense.title}</div>
                      <div className="text-sm text-gray-500">{expense.vendor}</div>
                      {expense.receiptNumber && (
                        <div className="text-xs text-gray-400">Receipt: {expense.receiptNumber}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(expense.amount)}</div>
                    {expense.paymentMethod && (
                      <div className="text-sm text-gray-500">{expense.paymentMethod}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{expense.date}</div>
                    {expense.approvedBy && (
                      <div className="text-sm text-gray-500">By: {expense.approvedBy}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/headmaster/finance/expenses/${expense.id}`}
                        className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/headmaster/finance/expenses/edit/${expense.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => openDeleteModal(expense)}
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
        
        {filteredExpenses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Receipt className="w-12 h-12 mx-auto text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Expense</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete the expense "<strong>{expenseToDelete?.title}</strong>"? This action cannot be undone.
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
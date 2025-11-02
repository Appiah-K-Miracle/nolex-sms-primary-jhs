"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  X,
  DollarSign,
  Calendar,
  Building,
  Tag,
  FileText,
  Upload,
  Trash2
} from "lucide-react";

export default function EditExpensePage({ params }: { params: { id: string } }) {
  // Sample expense data for editing
  const [expenseData, setExpenseData] = useState({
    title: "Teaching Materials Purchase",
    category: "Educational",
    amount: 25000,
    date: "2025-10-30",
    vendor: "Educational Supplies Ltd",
    description: "Purchase of textbooks, notebooks, and learning materials for Grade 3 students. This includes mathematics workbooks, English readers, science kits, and art supplies for the upcoming term.",
    budgetCategory: "Educational Materials",
    paymentMethod: "Bank Transfer",
    vendorContact: "+233 24 555 0123",
    vendorEmail: "orders@edusupplies.com.gh",
    vendorAddress: "123 Education Street, Accra"
  });

  const [attachments, setAttachments] = useState([
    {
      id: 1,
      name: "Invoice_EDU_001234.pdf",
      size: "245 KB",
      type: "PDF"
    }
  ]);

  const [errors, setErrors] = useState<any>({});

  const categories = [
    "Educational", "Utilities", "Infrastructure", "Technology", 
    "Transportation", "Administrative", "Maintenance", "Staff", "Other"
  ];

  const budgetCategories = [
    "Educational Materials", "Facility Maintenance", "Technology Equipment",
    "Transportation Costs", "Utility Bills", "Administrative Expenses",
    "Staff Development", "Infrastructure", "Emergency Repairs"
  ];

  const paymentMethods = [
    "Bank Transfer", "Cash", "Cheque", "Mobile Money", "Credit Card"
  ];

  const validateForm = () => {
    const newErrors: any = {};

    if (!expenseData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!expenseData.category) {
      newErrors.category = "Category is required";
    }

    if (!expenseData.amount || expenseData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!expenseData.date) {
      newErrors.date = "Date is required";
    }

    if (!expenseData.vendor.trim()) {
      newErrors.vendor = "Vendor is required";
    }

    if (!expenseData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!expenseData.budgetCategory) {
      newErrors.budgetCategory = "Budget category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission
      console.log("Updating expense:", expenseData);
      // Here you would typically make an API call to update the expense
    }
  };

  const handleChange = (field: string, value: any) => {
    setExpenseData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newAttachment = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: `${(file.size / 1024).toFixed(0)} KB`,
          type: file.type.split('/')[1].toUpperCase()
        };
        setAttachments(prev => [...prev, newAttachment]);
      });
    }
  };

  const removeAttachment = (id: number) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/headmaster/finance/expenses/${params.id}`}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Expense Details
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Edit Expense</h1>
            <p className="text-gray-600 mt-1">Update expense information and details</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Basic Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expense Title *</label>
                      <input
                        type="text"
                        value={expenseData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.title ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter expense title"
                      />
                      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                        <select
                          value={expenseData.category}
                          onChange={(e) => handleChange('category', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            errors.category ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget Category *</label>
                        <select
                          value={expenseData.budgetCategory}
                          onChange={(e) => handleChange('budgetCategory', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            errors.budgetCategory ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select budget category</option>
                          {budgetCategories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        {errors.budgetCategory && <p className="text-red-500 text-sm mt-1">{errors.budgetCategory}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount (GHS) *</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={expenseData.amount}
                          onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            errors.amount ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0.00"
                        />
                        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                        <input
                          type="date"
                          value={expenseData.date}
                          onChange={(e) => handleChange('date', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            errors.date ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                      <select
                        value={expenseData.paymentMethod}
                        onChange={(e) => handleChange('paymentMethod', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select payment method</option>
                        {paymentMethods.map((method) => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    rows={4}
                    value={expenseData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter detailed description of the expense..."
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Vendor Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Vendor Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name *</label>
                      <input
                        type="text"
                        value={expenseData.vendor}
                        onChange={(e) => handleChange('vendor', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.vendor ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter vendor name"
                      />
                      {errors.vendor && <p className="text-red-500 text-sm mt-1">{errors.vendor}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                      <input
                        type="tel"
                        value={expenseData.vendorContact}
                        onChange={(e) => handleChange('vendorContact', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+233 XX XXX XXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={expenseData.vendorEmail}
                        onChange={(e) => handleChange('vendorEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="vendor@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        rows={3}
                        value={expenseData.vendorAddress}
                        onChange={(e) => handleChange('vendorAddress', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter vendor address"
                      />
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Attachments
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          <span className="text-blue-600 hover:text-blue-700">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOC, JPG, PNG up to 10MB</p>
                      </label>
                    </div>

                    {/* Existing Attachments */}
                    {attachments.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                        {attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                                <p className="text-xs text-gray-500">{attachment.type} • {attachment.size}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAttachment(attachment.id)}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Link
                href={`/headmaster/finance/expenses/${params.id}`}
                className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Link>
              
              <button
                type="submit"
                className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Update Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
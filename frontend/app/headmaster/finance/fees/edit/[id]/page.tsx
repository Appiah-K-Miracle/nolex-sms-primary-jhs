"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  X,
  DollarSign,
  Calendar,
  User,
  Book,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function EditFeePage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [feeData, setFeeData] = useState<any>(null);
  const [originalData, setOriginalData] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  // Sample fee database for editing
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
      academicYear: "2025/2026",
      term: "First Term",
      description: "Tuition fees for first term academic year 2025/2026",
      status: "pending"
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
      academicYear: "2025/2026",
      term: "First Term",
      description: "Transport fees for first term academic year 2025/2026",
      status: "pending"
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
      academicYear: "2025/2026",
      term: "First Term",
      description: "Lunch fees for first term academic year 2025/2026",
      status: "paid"
    }
  ];

  // Simulate data fetching
  React.useEffect(() => {
    const fetchFeeData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fee = feeDatabase.find(f => f.id === parseInt(params.id));
      if (fee) {
        setFeeData({...fee});
        setOriginalData({...fee});
      }
      setLoading(false);
    };

    fetchFeeData();
  }, [params.id]);

  const feeTypes = [
    "Tuition",
    "Lunch",
    "Transport",
    "Activity",
    "Library",
    "Laboratory",
    "Sports",
    "Examination",
    "Development",
    "Other"
  ];

  const academicTerms = [
    "First Term",
    "Second Term",
    "Third Term"
  ];

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
              <h1 className="text-2xl font-bold text-white">Edit Fee</h1>
              <p className="text-green-100">Loading fee data...</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fee information...</p>
        </div>
      </div>
    );
  }

  if (!feeData) {
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
              <h1 className="text-2xl font-bold text-white">Edit Fee</h1>
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

  const academicYears = [
    "2024/2025",
    "2025/2026",
    "2026/2027"
  ];

  const grades = [
    "Nursery 1", "Nursery 2",
    "Kindergarten 1", "Kindergarten 2", 
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"
  ];

  const validateForm = () => {
    const newErrors: any = {};

    if (!feeData.feeType) {
      newErrors.feeType = "Fee type is required";
    }

    if (!feeData.amount || feeData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!feeData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    if (!feeData.academicYear) {
      newErrors.academicYear = "Academic year is required";
    }

    if (!feeData.term) {
      newErrors.term = "Term is required";
    }

    if (!feeData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSaving(true);
      try {
        // Simulate API call to update fee
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log("Updated fee:", feeData);
        console.log("Changes:", {
          before: originalData,
          after: feeData
        });
        
        // Show success message or redirect
        alert("Fee record updated successfully!");
        
        // In a real app, you might redirect to the detail page
        // router.push(`/headmaster/finance/fees/${params.id}`);
        
      } catch (error) {
        console.error("Error updating fee:", error);
        alert("Failed to update fee record. Please try again.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleChange = (field: string, value: any) => {
    setFeeData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/headmaster/finance/fees/${params.id}`}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Fee Details
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Edit Fee Record</h1>
            <p className="text-gray-600 mt-1">Update fee information for {feeData.studentName}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Student Information (Read-only) */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Student Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                      <input
                        type="text"
                        value={feeData.studentName}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                      <input
                        type="text"
                        value={feeData.studentId}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                      <input
                        type="text"
                        value={feeData.grade}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                      <input
                        type="text"
                        value={feeData.class}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Fee Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Fee Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type *</label>
                      <select
                        value={feeData.feeType}
                        onChange={(e) => handleChange('feeType', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.feeType ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select fee type</option>
                        {feeTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.feeType && <p className="text-red-500 text-sm mt-1">{errors.feeType}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount (GHS) *</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={feeData.amount}
                        onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.amount ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0.00"
                      />
                      {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                      <input
                        type="date"
                        value={feeData.dueDate}
                        onChange={(e) => handleChange('dueDate', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.dueDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Academic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    Academic Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                      <select
                        value={feeData.academicYear}
                        onChange={(e) => handleChange('academicYear', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.academicYear ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select academic year</option>
                        {academicYears.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      {errors.academicYear && <p className="text-red-500 text-sm mt-1">{errors.academicYear}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Term *</label>
                      <select
                        value={feeData.term}
                        onChange={(e) => handleChange('term', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.term ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select term</option>
                        {academicTerms.map((term) => (
                          <option key={term} value={term}>{term}</option>
                        ))}
                      </select>
                      {errors.term && <p className="text-red-500 text-sm mt-1">{errors.term}</p>}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    rows={4}
                    value={feeData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter fee description..."
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Status Display */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      feeData.status === 'paid' 
                        ? 'bg-green-100 text-green-800'
                        : feeData.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {feeData.status.charAt(0).toUpperCase() + feeData.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Status can only be changed through payment processing
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Link
                href={`/headmaster/finance/fees/${params.id}`}
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
                Update Fee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
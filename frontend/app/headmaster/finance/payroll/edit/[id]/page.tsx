"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  X,
  DollarSign,
  User,
  Calculator,
  TrendingUp,
  TrendingDown,
  Building
} from "lucide-react";

export default function EditPayrollPage({ params }: { params: { id: string } }) {
  // Sample payroll data for editing
  const [payrollData, setPayrollData] = useState({
    staffId: "STF001",
    name: "John Smith",
    department: "Teaching",
    position: "Mathematics Teacher",
    baseSalary: 2500,
    allowances: {
      transport: 200,
      lunch: 150,
      housing: 150
    },
    deductions: {
      tax: 150,
      socialSecurity: 50,
      pension: 50
    },
    payPeriod: "2025-10",
    paymentMethod: "Bank Transfer",
    bankName: "GCB Bank",
    accountNumber: "****1234",
    branchCode: "GH001",
    workingDays: 22,
    presentDays: 20,
    overtimeHours: 8,
    overtimeRate: 15
  });

  const [errors, setErrors] = useState<any>({});

  const departments = ["Teaching", "Administrative", "Support", "Management"];
  const paymentMethods = ["Bank Transfer", "Cash", "Mobile Money", "Cheque"];

  // Calculate totals
  const totalAllowances = Object.values(payrollData.allowances).reduce((sum, value) => sum + value, 0);
  const totalDeductions = Object.values(payrollData.deductions).reduce((sum, value) => sum + value, 0);
  const overtimePay = payrollData.overtimeHours * payrollData.overtimeRate;
  const grossSalary = payrollData.baseSalary + totalAllowances + overtimePay;
  const netSalary = grossSalary - totalDeductions;

  const validateForm = () => {
    const newErrors: any = {};

    if (!payrollData.baseSalary || payrollData.baseSalary <= 0) {
      newErrors.baseSalary = "Base salary must be greater than 0";
    }

    if (!payrollData.payPeriod) {
      newErrors.payPeriod = "Pay period is required";
    }

    if (!payrollData.workingDays || payrollData.workingDays <= 0) {
      newErrors.workingDays = "Working days must be greater than 0";
    }

    if (payrollData.presentDays > payrollData.workingDays) {
      newErrors.presentDays = "Present days cannot exceed working days";
    }

    if (payrollData.overtimeHours < 0) {
      newErrors.overtimeHours = "Overtime hours cannot be negative";
    }

    if (payrollData.overtimeRate < 0) {
      newErrors.overtimeRate = "Overtime rate cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission
      console.log("Updating payroll:", payrollData);
      // Here you would typically make an API call to update the payroll
    }
  };

  const handleChange = (field: string, value: any) => {
    setPayrollData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAllowanceChange = (type: string, value: number) => {
    setPayrollData(prev => ({
      ...prev,
      allowances: { ...prev.allowances, [type]: value }
    }));
  };

  const handleDeductionChange = (type: string, value: number) => {
    setPayrollData(prev => ({
      ...prev,
      deductions: { ...prev.deductions, [type]: value }
    }));
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
            href={`/headmaster/finance/payroll/${params.id}`}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Payroll Details
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Edit Payroll</h1>
            <p className="text-gray-600 mt-1">Update payroll information for {payrollData.name}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Staff & Basic Info */}
              <div className="space-y-6">
                {/* Staff Information (Read-only) */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Staff Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Staff Name</label>
                      <input
                        type="text"
                        value={payrollData.name}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Staff ID</label>
                      <input
                        type="text"
                        value={payrollData.staffId}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        value={payrollData.position}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={payrollData.department}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Basic Salary */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Basic Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Base Salary (GHS) *</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={payrollData.baseSalary}
                        onChange={(e) => handleChange('baseSalary', parseFloat(e.target.value))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.baseSalary ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0.00"
                      />
                      {errors.baseSalary && <p className="text-red-500 text-sm mt-1">{errors.baseSalary}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pay Period *</label>
                      <input
                        type="month"
                        value={payrollData.payPeriod}
                        onChange={(e) => handleChange('payPeriod', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.payPeriod ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.payPeriod && <p className="text-red-500 text-sm mt-1">{errors.payPeriod}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                      <select
                        value={payrollData.paymentMethod}
                        onChange={(e) => handleChange('paymentMethod', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {paymentMethods.map((method) => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Attendance Data */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Attendance & Overtime
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Working Days *</label>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={payrollData.workingDays}
                        onChange={(e) => handleChange('workingDays', parseInt(e.target.value))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.workingDays ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.workingDays && <p className="text-red-500 text-sm mt-1">{errors.workingDays}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Present Days *</label>
                      <input
                        type="number"
                        min="0"
                        max={payrollData.workingDays}
                        value={payrollData.presentDays}
                        onChange={(e) => handleChange('presentDays', parseInt(e.target.value))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.presentDays ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.presentDays && <p className="text-red-500 text-sm mt-1">{errors.presentDays}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Overtime Hours</label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={payrollData.overtimeHours}
                        onChange={(e) => handleChange('overtimeHours', parseFloat(e.target.value))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.overtimeHours ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.overtimeHours && <p className="text-red-500 text-sm mt-1">{errors.overtimeHours}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Overtime Rate (GHS/hour)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={payrollData.overtimeRate}
                        onChange={(e) => handleChange('overtimeRate', parseFloat(e.target.value))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.overtimeRate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.overtimeRate && <p className="text-red-500 text-sm mt-1">{errors.overtimeRate}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column - Allowances */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Allowances
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(payrollData.allowances).map(([type, value]) => (
                      <div key={type}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {type} Allowance (GHS)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={value}
                          onChange={(e) => handleAllowanceChange(type, parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                    ))}
                    
                    {/* Total Allowances Display */}
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-700">Total Allowances</span>
                        <span className="text-lg font-bold text-green-700">{formatCurrency(totalAllowances)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Bank Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={payrollData.bankName}
                        onChange={(e) => handleChange('bankName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter bank name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        value={payrollData.accountNumber}
                        onChange={(e) => handleChange('accountNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter account number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Branch Code</label>
                      <input
                        type="text"
                        value={payrollData.branchCode}
                        onChange={(e) => handleChange('branchCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter branch code"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Deductions & Summary */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-red-500" />
                    Deductions
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(payrollData.deductions).map(([type, value]) => (
                      <div key={type}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {type === 'socialSecurity' ? 'Social Security' : type} (GHS)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={value}
                          onChange={(e) => handleDeductionChange(type, parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                    ))}
                    
                    {/* Total Deductions Display */}
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-red-700">Total Deductions</span>
                        <span className="text-lg font-bold text-red-700">{formatCurrency(totalDeductions)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Salary Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Base Salary</span>
                      <span className="font-medium text-gray-900">{formatCurrency(payrollData.baseSalary)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Total Allowances</span>
                      <span className="font-medium text-green-600">{formatCurrency(totalAllowances)}</span>
                    </div>
                    
                    {overtimePay > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Overtime Pay</span>
                        <span className="font-medium text-blue-600">{formatCurrency(overtimePay)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Gross Salary</span>
                      <span className="font-bold text-blue-700">{formatCurrency(grossSalary)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Total Deductions</span>
                      <span className="font-medium text-red-600">{formatCurrency(totalDeductions)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 bg-white rounded-lg px-3 border-2 border-green-200">
                      <span className="text-lg font-bold text-gray-900">Net Salary</span>
                      <span className="text-xl font-bold text-green-700">{formatCurrency(netSalary)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Link
                href={`/headmaster/finance/payroll/${params.id}`}
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
                Update Payroll
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
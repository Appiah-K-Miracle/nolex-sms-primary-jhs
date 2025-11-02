"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calculator, 
  Users, 
  DollarSign, 
  Calendar, 
  CheckCircle,
  Clock,
  User,
  FileText,
  Download,
  Eye,
  AlertTriangle
} from "lucide-react";

export default function ProcessPayrollPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2025-11");
  const [processingStage, setProcessingStage] = useState("review"); // review, calculating, complete
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);

  // Sample staff data for payroll processing
  const staffData = [
    {
      id: 1,
      employeeId: "EMP001",
      name: "John Smith",
      position: "Headmaster",
      department: "Administration",
      basicSalary: 150000,
      allowances: {
        housing: 45000,
        transport: 20000,
        medical: 10000
      },
      deductions: {
        tax: 18500,
        pension: 12750,
        insurance: 5000
      },
      attendance: {
        workingDays: 22,
        presentDays: 22,
        absentDays: 0,
        overtimeHours: 0
      }
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Mary Johnson",
      position: "Senior Teacher",
      department: "Academic",
      basicSalary: 80000,
      allowances: {
        housing: 24000,
        transport: 15000,
        medical: 8000
      },
      deductions: {
        tax: 10200,
        pension: 6800,
        insurance: 3000
      },
      attendance: {
        workingDays: 22,
        presentDays: 21,
        absentDays: 1,
        overtimeHours: 4
      }
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "David Wilson",
      position: "Teacher",
      department: "Academic",
      basicSalary: 65000,
      allowances: {
        housing: 19500,
        transport: 12000,
        medical: 6500
      },
      deductions: {
        tax: 8320,
        pension: 5525,
        insurance: 2500
      },
      attendance: {
        workingDays: 22,
        presentDays: 22,
        absentDays: 0,
        overtimeHours: 2
      }
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Sarah Brown",
      position: "Accountant",
      department: "Administration",
      basicSalary: 70000,
      allowances: {
        housing: 21000,
        transport: 14000,
        medical: 7000
      },
      deductions: {
        tax: 8960,
        pension: 5950,
        insurance: 2800
      },
      attendance: {
        workingDays: 22,
        presentDays: 22,
        absentDays: 0,
        overtimeHours: 0
      }
    },
    {
      id: 5,
      employeeId: "EMP005",
      name: "Michael Davis",
      position: "Security Guard",
      department: "Support",
      basicSalary: 35000,
      allowances: {
        housing: 10500,
        transport: 8000,
        medical: 3500
      },
      deductions: {
        tax: 4550,
        pension: 2975,
        insurance: 1500
      },
      attendance: {
        workingDays: 22,
        presentDays: 22,
        absentDays: 0,
        overtimeHours: 8
      }
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateNetSalary = (staff: any) => {
    const totalAllowances = Object.values(staff.allowances).reduce((sum: number, val: any) => sum + val, 0);
    const totalDeductions = Object.values(staff.deductions).reduce((sum: number, val: any) => sum + val, 0);
    const attendanceDeduction = (staff.attendance.absentDays / staff.attendance.workingDays) * staff.basicSalary;
    const overtimePay = staff.attendance.overtimeHours * 200; // 200 GHS per hour
    
    return staff.basicSalary + totalAllowances + overtimePay - totalDeductions - attendanceDeduction;
  };

  const getTotalPayroll = () => {
    return staffData.reduce((total, staff) => total + calculateNetSalary(staff), 0);
  };

  const handleStaffSelection = (staffId: string) => {
    setSelectedStaff(prev => 
      prev.includes(staffId) 
        ? prev.filter(id => id !== staffId)
        : [...prev, staffId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStaff.length === staffData.length) {
      setSelectedStaff([]);
    } else {
      setSelectedStaff(staffData.map(staff => staff.id.toString()));
    }
  };

  const handleProcessPayroll = () => {
    setProcessingStage("calculating");
    
    // Simulate processing time
    setTimeout(() => {
      setProcessingStage("complete");
    }, 3000);
  };

  const generatePayslips = () => {
    console.log("Generating payslips for selected staff");
    // Here you would generate PDF payslips
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm border border-green-300 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/finance" 
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Process Payroll</h1>
              <p className="text-green-100">Calculate and process staff salaries</p>
            </div>
          </div>
        </div>
      </div>

      {processingStage === "review" && (
        <>
          {/* Period Selection */}
          <div className="bg-white rounded-xl shadow-lg mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payroll Period</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">Select Period:</label>
                </div>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="2025-11">November 2025</option>
                  <option value="2025-10">October 2025</option>
                  <option value="2025-09">September 2025</option>
                </select>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Total Staff</p>
                      <p className="text-2xl font-bold text-blue-900">{staffData.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Total Payroll</p>
                      <p className="text-2xl font-bold text-green-900">{formatCurrency(getTotalPayroll())}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600">Selected</p>
                      <p className="text-2xl font-bold text-yellow-900">{selectedStaff.length}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600">Selected Amount</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {formatCurrency(
                          staffData
                            .filter(staff => selectedStaff.includes(staff.id.toString()))
                            .reduce((total, staff) => total + calculateNetSalary(staff), 0)
                        )}
                      </p>
                    </div>
                    <Calculator className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Selection */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Staff Selection</h2>
                <button
                  onClick={handleSelectAll}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  {selectedStaff.length === staffData.length ? "Deselect All" : "Select All"}
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        <input
                          type="checkbox"
                          checked={selectedStaff.length === staffData.length}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Employee</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Basic Salary</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Allowances</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Deductions</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Net Salary</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffData.map(staff => {
                      const netSalary = calculateNetSalary(staff);
                      const totalAllowances = Object.values(staff.allowances).reduce((sum: number, val: any) => sum + val, 0);
                      const totalDeductions = Object.values(staff.deductions).reduce((sum: number, val: any) => sum + val, 0);
                      
                      return (
                        <tr key={staff.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <input
                              type="checkbox"
                              checked={selectedStaff.includes(staff.id.toString())}
                              onChange={() => handleStaffSelection(staff.id.toString())}
                              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <User className="w-8 h-8 text-gray-400 bg-gray-100 rounded-full p-1" />
                              <div>
                                <p className="font-medium text-gray-900">{staff.name}</p>
                                <p className="text-sm text-gray-600">{staff.employeeId} • {staff.position}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{staff.department}</td>
                          <td className="py-3 px-4 font-medium">{formatCurrency(staff.basicSalary)}</td>
                          <td className="py-3 px-4 text-green-600">{formatCurrency(totalAllowances)}</td>
                          <td className="py-3 px-4 text-red-600">{formatCurrency(totalDeductions)}</td>
                          <td className="py-3 px-4 font-bold text-gray-900">{formatCurrency(netSalary)}</td>
                          <td className="py-3 px-4">
                            <button className="text-green-600 hover:text-green-700 p-1">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  {selectedStaff.length} of {staffData.length} staff selected
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/headmaster/finance"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    onClick={handleProcessPayroll}
                    disabled={selectedStaff.length === 0}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Calculator className="w-4 h-4" />
                    Process Payroll ({selectedStaff.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {processingStage === "calculating" && (
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payroll...</h3>
            <p className="text-gray-600 mb-4">Calculating salaries, allowances, and deductions</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{width: "75%"}}></div>
            </div>
          </div>
        </div>
      )}

      {processingStage === "complete" && (
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-900">Payroll Processed Successfully</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <h3 className="font-medium text-green-900">Payroll Processing Complete</h3>
                  <p className="text-sm text-green-700">
                    Successfully processed payroll for {selectedStaff.length} staff members for {selectedPeriod}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Staff Processed</p>
                <p className="text-2xl font-bold text-gray-900">{selectedStaff.length}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    staffData
                      .filter(staff => selectedStaff.includes(staff.id.toString()))
                      .reduce((total, staff) => total + calculateNetSalary(staff), 0)
                  )}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Processing Date</p>
                <p className="text-2xl font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={generatePayslips}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Generate Payslips
              </button>
              <Link
                href="/headmaster/finance/payroll"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4" />
                View Payroll Records
              </Link>
              <button
                onClick={() => setProcessingStage("review")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Process Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  User, 
  CreditCard, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Edit3,
  Printer,
  Download,
  Building,
  Phone,
  Mail,
  MapPin,
  Calculator,
  FileText,
  TrendingUp,
  TrendingDown,
  XCircle
} from "lucide-react";

export default function PayrollDetailPage({ params }: { params: { id: string } }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [payrollDetail, setPayrollDetail] = useState<any>(null);

  // Sample payroll database - in real app, this would be fetched from API
  const payrollDatabase = [
    {
      id: 1,
      staffId: "STF001",
      employeeId: "EMP001",
      name: "John Smith",
      department: "Administration",
      position: "Headmaster",
      employmentType: "Full-time",
      joinDate: "2023-09-01",
      period: "November 2025",
      baseSalary: 150000,
      allowances: {
        housing: 45000,
        transport: 20000,
        medical: 10000,
        overtime: 0
      },
      deductions: {
        tax: 18500,
        pension: 12750,
        insurance: 5000,
        loan: 0
      },
      grossSalary: 225000,
      totalAllowances: 75000,
      totalDeductions: 36250,
      netSalary: 188750,
      status: "paid",
      paymentDate: "2025-10-30",
      paymentMethod: "Bank Transfer",
      bankDetails: {
        accountName: "John Smith",
        accountNumber: "1234567890",
        bankName: "Ghana Commercial Bank",
        branch: "Accra Main"
      },
      attendance: {
        workingDays: 22,
        presentDays: 22,
        absentDays: 0,
        leaveDays: 0,
        overtimeHours: 0
      },
      contactInfo: {
        phone: "+233 24 123 4567",
        email: "john.smith@school.gh",
        address: "123 Teaching Street, Accra"
      }
    },
    {
      id: 2,
      staffId: "STF002",
      employeeId: "EMP002",
      name: "Mary Johnson",
      department: "Academic",
      position: "Senior Teacher",
      employmentType: "Full-time",
      joinDate: "2022-01-15",
      period: "November 2025",
      baseSalary: 80000,
      allowances: {
        housing: 24000,
        transport: 15000,
        medical: 8000,
        overtime: 800
      },
      deductions: {
        tax: 10200,
        pension: 6800,
        insurance: 3000,
        loan: 5000
      },
      grossSalary: 127800,
      totalAllowances: 47800,
      totalDeductions: 25000,
      netSalary: 102800,
      status: "pending",
      paymentDate: null,
      paymentMethod: "Bank Transfer",
      bankDetails: {
        accountName: "Mary Johnson",
        accountNumber: "0987654321",
        bankName: "Access Bank",
        branch: "Kumasi Branch"
      },
      attendance: {
        workingDays: 22,
        presentDays: 21,
        absentDays: 1,
        leaveDays: 0,
        overtimeHours: 4
      },
      contactInfo: {
        phone: "+233 24 987 6543",
        email: "mary.johnson@school.gh",
        address: "456 Education Avenue, Kumasi"
      }
    },
    {
      id: 3,
      staffId: "STF003",
      employeeId: "EMP003",
      name: "David Wilson",
      department: "Academic",
      position: "Teacher",
      employmentType: "Full-time",
      joinDate: "2024-03-01",
      period: "November 2025",
      baseSalary: 65000,
      allowances: {
        housing: 19500,
        transport: 12000,
        medical: 6500,
        overtime: 400
      },
      deductions: {
        tax: 8320,
        pension: 5525,
        insurance: 2500,
        loan: 3000
      },
      grossSalary: 103400,
      totalAllowances: 38400,
      totalDeductions: 19345,
      netSalary: 84055,
      status: "paid",
      paymentDate: "2025-10-30",
      paymentMethod: "Mobile Money",
      bankDetails: {
        accountName: "David Wilson",
        accountNumber: "MTN-024-555-7890",
        bankName: "MTN Mobile Money",
        branch: "Mobile Money"
      },
      attendance: {
        workingDays: 22,
        presentDays: 22,
        absentDays: 0,
        leaveDays: 0,
        overtimeHours: 2
      },
      contactInfo: {
        phone: "+233 24 555 7890",
        email: "david.wilson@school.gh",
        address: "789 Learning Close, Tamale"
      }
    }
  ];

  // Simulate data fetching
  React.useEffect(() => {
    const fetchPayrollDetail = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const payroll = payrollDatabase.find(p => p.id === parseInt(params.id));
      setPayrollDetail(payroll);
      setLoading(false);
    };

    fetchPayrollDetail();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm border border-green-300 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/finance/payroll" 
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Payroll Details</h1>
              <p className="text-green-100">Loading payroll information...</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payroll details...</p>
        </div>
      </div>
    );
  }

  if (!payrollDetail) {
    return (
      <div className="p-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm border border-green-300 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/finance/payroll" 
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Payroll Details</h1>
              <p className="text-green-100">Payroll record not found</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Payroll Record Not Found</h3>
          <p className="text-gray-600 mb-6">The payroll record with ID {params.id} could not be found.</p>
          <Link
            href="/headmaster/finance/payroll"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Payroll Management
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'processing':
        return <Clock className="w-6 h-6 text-blue-500" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handlePayment = () => {
    console.log("Processing payment for:", payrollDetail);
    setShowPaymentModal(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 backdrop-blur-sm border border-green-300 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/finance/payroll" 
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Payroll Details</h1>
              <p className="text-green-100">Detailed payroll information for {payrollDetail.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(payrollDetail.status)}
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(payrollDetail.status)}`}>
              {payrollDetail.status.charAt(0).toUpperCase() + payrollDetail.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print Payslip
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <Link
            href={`/headmaster/finance/payroll/edit/${payrollDetail.id}`}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Payroll Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payroll Summary Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Payroll Summary - {payrollDetail.payPeriod}</h2>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(payrollDetail.status)}`}>
                  {getStatusIcon(payrollDetail.status)}
                  <span className="text-sm font-medium capitalize">{payrollDetail.status}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Gross Salary */}
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Calculator className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-blue-600 font-medium">Gross Salary</p>
                  <p className="text-2xl font-bold text-blue-700">{formatCurrency(payrollDetail.grossSalary)}</p>
                </div>

                {/* Total Deductions */}
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-sm text-red-600 font-medium">Total Deductions</p>
                  <p className="text-2xl font-bold text-red-700">{formatCurrency(payrollDetail.totalDeductions)}</p>
                </div>

                {/* Net Salary */}
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-green-600 font-medium">Net Salary</p>
                  <p className="text-2xl font-bold text-green-700">{formatCurrency(payrollDetail.netSalary)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Salary Breakdown */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Salary Breakdown</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Earnings */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Earnings
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Base Salary</span>
                      <span className="font-medium text-gray-900">{formatCurrency(payrollDetail.baseSalary)}</span>
                    </div>
                    {Object.entries(payrollDetail.allowances).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 capitalize">{key} Allowance</span>
                        <span className="font-medium text-green-600">{formatCurrency(value as number)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center py-2 font-semibold">
                      <span className="text-gray-900">Total Earnings</span>
                      <span className="text-green-600">{formatCurrency(payrollDetail.grossSalary)}</span>
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    Deductions
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(payrollDetail.deductions).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 capitalize">{key === 'socialSecurity' ? 'Social Security' : key}</span>
                        <span className="font-medium text-red-600">{formatCurrency(value as number)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center py-2 font-semibold">
                      <span className="text-gray-900">Total Deductions</span>
                      <span className="text-red-600">{formatCurrency(payrollDetail.totalDeductions)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance & Tax Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Data */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Attendance Data</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Working Days</span>
                    <span className="font-medium text-gray-900">{payrollDetail.attendanceData.workingDays}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Present Days</span>
                    <span className="font-medium text-green-600">{payrollDetail.attendanceData.presentDays}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Absent Days</span>
                    <span className="font-medium text-red-600">{payrollDetail.attendanceData.absentDays}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Overtime Hours</span>
                    <span className="font-medium text-blue-600">{payrollDetail.attendanceData.overtimeHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Tax Information</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taxable Income</span>
                    <span className="font-medium text-gray-900">{formatCurrency(payrollDetail.taxInformation.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax Rate</span>
                    <span className="font-medium text-gray-900">{payrollDetail.taxInformation.taxRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Tax</span>
                    <span className="font-medium text-red-600">{formatCurrency(payrollDetail.taxInformation.monthlyTax)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">YTD Tax</span>
                    <span className="font-medium text-red-600">{formatCurrency(payrollDetail.taxInformation.yearToDateTax)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payroll History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Payroll History</h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Period</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Gross Salary</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Net Salary</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Pay Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollDetail.payrollHistory.map((record: any, index: number) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 text-sm text-gray-900">{record.month}</td>
                        <td className="py-3 text-sm text-gray-900">{formatCurrency(record.grossSalary)}</td>
                        <td className="py-3 text-sm font-medium text-green-600">{formatCurrency(record.netSalary)}</td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-600">{record.payDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Staff Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Staff Information</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{payrollDetail.name}</p>
                  <p className="text-sm text-gray-500">{payrollDetail.staffId}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Position</label>
                  <p className="text-gray-900">{payrollDetail.position}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Department</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {payrollDetail.department}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Employment Type</label>
                  <p className="text-gray-900">{payrollDetail.employmentType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Join Date</label>
                  <p className="text-gray-900">{payrollDetail.joinDate}</p>
                </div>
              </div>
              <Link
                href={`/headmaster/staff/${payrollDetail.staffId}`}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-center block mt-4"
              >
                View Staff Profile
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{payrollDetail.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{payrollDetail.contact.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-900">{payrollDetail.contact.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Bank Details</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Bank Name</label>
                  <p className="text-gray-900">{payrollDetail.bankDetails.bankName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Account Number</label>
                  <p className="text-gray-900">{payrollDetail.bankDetails.accountNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Branch Code</label>
                  <p className="text-gray-900">{payrollDetail.bankDetails.branchCode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {payrollDetail.status === 'pending' && (
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Process Payment
                  </button>
                )}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Generate Payslip
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
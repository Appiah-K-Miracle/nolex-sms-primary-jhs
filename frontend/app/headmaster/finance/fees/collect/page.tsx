"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  CreditCard, 
  CheckCircle, 
  Receipt,
  User,
  DollarSign,
  Calendar,
  Download
} from "lucide-react";

export default function FeeCollectionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [paymentData, setPaymentData] = useState({
    amount: "",
    paymentMethod: "cash",
    transactionId: "",
    notes: ""
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Sample students with outstanding fees
  const studentsWithFees = [
    {
      id: 1,
      studentId: "NLX2025G301",
      name: "John Doe",
      grade: "Grade 3",
      class: "Grade 3A",
      outstandingFees: [
        { type: "Tuition", amount: 120000, dueDate: "2025-11-15" },
        { type: "Transport", amount: 15000, dueDate: "2025-11-01" }
      ],
      totalOutstanding: 135000
    },
    {
      id: 2,
      studentId: "NLX2025G302",
      name: "Jane Smith",
      grade: "Grade 3",
      class: "Grade 3B",
      outstandingFees: [
        { type: "Tuition", amount: 120000, dueDate: "2025-11-15" },
        { type: "Lunch", amount: 8000, dueDate: "2025-11-01" }
      ],
      totalOutstanding: 128000
    },
    {
      id: 3,
      studentId: "NLX2025G201",
      name: "Michael Johnson",
      grade: "Grade 2",
      class: "Grade 2A",
      outstandingFees: [
        { type: "Tuition", amount: 110000, dueDate: "2025-11-15" }
      ],
      totalOutstanding: 110000
    },
    {
      id: 4,
      studentId: "NLX2025G401",
      name: "Sarah Wilson",
      grade: "Grade 4",
      class: "Grade 4A",
      outstandingFees: [
        { type: "Tuition", amount: 130000, dueDate: "2025-11-15" },
        { type: "Transport", amount: 15000, dueDate: "2025-11-01" },
        { type: "Lunch", amount: 8000, dueDate: "2025-11-01" }
      ],
      totalOutstanding: 153000
    }
  ];

  const grades = ["all", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredStudents = studentsWithFees.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "all" || student.grade === selectedGrade;
    
    return matchesSearch && matchesGrade;
  });

  const handleStudentSelect = (student: any) => {
    setSelectedStudent(student);
    setPaymentData({
      amount: student.totalOutstanding.toString(),
      paymentMethod: "cash",
      transactionId: "",
      notes: ""
    });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit to your backend
    console.log("Processing payment:", {
      student: selectedStudent,
      payment: paymentData
    });
    setShowSuccessModal(true);
  };

  const resetForm = () => {
    setSelectedStudent(null);
    setPaymentData({
      amount: "",
      paymentMethod: "cash",
      transactionId: "",
      notes: ""
    });
    setShowSuccessModal(false);
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
              <h1 className="text-2xl font-bold text-white">Fee Collection</h1>
              <p className="text-green-100">Collect and record student fee payments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Selection */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Student</h2>
            
            {/* Search and Filter */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name or student ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>
                    {grade === "all" ? "All Grades" : grade}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Students List */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {filteredStudents.length > 0 ? (
              <div className="space-y-3">
                {filteredStudents.map(student => (
                  <div
                    key={student.id}
                    onClick={() => handleStudentSelect(student)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedStudent?.id === student.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-900">{student.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">{student.studentId} • {student.class}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">{formatCurrency(student.totalOutstanding)}</p>
                        <p className="text-xs text-gray-500">{student.outstandingFees.length} fee(s)</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No students found with outstanding fees</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
          </div>

          {selectedStudent ? (
            <form onSubmit={handlePaymentSubmit} className="p-6">
              {/* Student Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-2">{selectedStudent.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{selectedStudent.studentId} • {selectedStudent.class}</p>
                
                <div className="space-y-2">
                  {selectedStudent.outstandingFees.map((fee: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{fee.type}</span>
                      <span className="font-medium">{formatCurrency(fee.amount)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                    <span className="font-medium text-gray-900">Total Outstanding</span>
                    <span className="font-bold text-lg text-red-600">{formatCurrency(selectedStudent.totalOutstanding)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to Pay <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={paymentData.paymentMethod}
                    onChange={(e) => setPaymentData({...paymentData, paymentMethod: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="cash">Cash</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="mobile_money">Mobile Money</option>
                    <option value="card">Card Payment</option>
                    <option value="cheque">Cheque</option>
                  </select>
                </div>

                {(paymentData.paymentMethod === "bank_transfer" || paymentData.paymentMethod === "mobile_money" || paymentData.paymentMethod === "card") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      value={paymentData.transactionId}
                      onChange={(e) => setPaymentData({...paymentData, transactionId: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter transaction ID"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={paymentData.notes}
                    onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Any additional notes..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <CreditCard className="w-4 h-4" />
                    Process Payment
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Select a student to process payment</p>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-6">
                Payment of {formatCurrency(parseFloat(paymentData.amount || "0"))} has been recorded for {selectedStudent?.name}.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={resetForm}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Receipt className="w-4 h-4" />
                  Print Receipt
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  New Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
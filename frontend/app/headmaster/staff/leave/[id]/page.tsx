"use client"

import { useState } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Download, 
  Edit3, 
  Trash2,
  Send,
  MessageSquare,
  Check,
  X,
  Eye,
  Printer
} from "lucide-react";
import Link from "next/link";

// Function to get leave application data by ID
const getLeaveApplicationById = (id: string) => {
  const leaveApplications = [
    {
      id: 1,
      leaveId: "LV2024001",
      staffId: "NLX2024STF001",
      staffName: "Mr. Kwame Boateng",
      position: "Mathematics Teacher",
      department: "Teaching Staff",
      email: "kwame.boateng@nolex.edu.gh",
      phone: "+233 24 123 4567",
      leaveType: "Annual Leave",
      startDate: "2024-11-15",
      endDate: "2024-11-19",
      duration: 5,
      reason: "Family vacation and personal time. I need to spend quality time with my family and attend my son's graduation ceremony.",
      status: "Pending",
      appliedDate: "2024-10-28",
      approver: "Mrs. Grace Adjei",
      priority: "Normal",
      documents: [
        { name: "Leave Application Form", type: "PDF", size: "125 KB" },
        { name: "Travel Itinerary", type: "PDF", size: "89 KB" }
      ],
      emergencyContact: {
        name: "Mrs. Boateng",
        phone: "+233 24 123 4568",
        relationship: "Spouse"
      },
      workHandover: "All grade 6 mathematics classes will be covered by Mr. Joseph Asante. All lesson plans and materials have been prepared and handed over.",
      coverageArrangement: "Mr. Joseph Asante will handle my classes during my absence. He can be reached at +233 24 567 8901.",
      returnDate: "2024-11-20",
      medicalCertificate: null,
      additionalNotes: "All assignments and lesson plans have been prepared in advance. Emergency contact information is provided.",
      approvalHistory: [
        {
          action: "Applied",
          date: "2024-10-28 09:30 AM",
          by: "Kwame Boateng",
          note: "Leave application submitted"
        },
        {
          action: "Acknowledged",
          date: "2024-10-28 02:15 PM",
          by: "Grace Adjei",
          note: "Application received and under review"
        }
      ],
      leaveBalance: {
        annual: 15,
        sick: 10,
        emergency: 3,
        used: 7
      }
    },
    {
      id: 2,
      leaveId: "LV2024002",
      staffId: "NLX2024STF015",
      staffName: "Ms. Akosua Mensah",
      position: "English Teacher",
      department: "Teaching Staff",
      email: "akosua.mensah@nolex.edu.gh",
      phone: "+233 24 567 8901",
      leaveType: "Sick Leave",
      startDate: "2024-11-05",
      endDate: "2024-11-07",
      duration: 3,
      reason: "Flu and fever - doctor recommended rest",
      status: "Approved",
      appliedDate: "2024-11-02",
      approver: "Mrs. Grace Adjei",
      priority: "High",
      documents: [
        { name: "Medical Certificate", type: "PDF", size: "156 KB" }
      ],
      emergencyContact: {
        name: "Mr. Mensah",
        phone: "+233 24 567 8902",
        relationship: "Spouse"
      },
      workHandover: "English lessons for Classes 1A, 1B and 1C have been prepared. Reading materials and assignments are ready for substitute teacher.",
      coverageArrangement: "Mrs. Elizabeth Nyong will handle all English classes. Lesson plans and materials have been provided.",
      returnDate: "2024-11-08",
      medicalCertificate: "medical_cert_mensah_nov2024.pdf",
      additionalNotes: "Doctor has advised complete rest for 3 days. Will resume work on November 8, 2024.",
      approvalHistory: [
        {
          action: "Applied",
          date: "2024-11-02 11:45 AM",
          by: "Akosua Mensah",
          note: "Sick leave application with medical certificate"
        },
        {
          action: "Approved",
          date: "2024-11-02 01:30 PM",
          by: "Grace Adjei",
          note: "Approved due to medical reasons. Get well soon."
        }
      ],
      leaveBalance: {
        annual: 13,
        sick: 4,
        emergency: 4,
        used: 9
      }
    },
    {
      id: 3,
      leaveId: "LV2024003",
      staffId: "NLX2024STF022",
      staffName: "Mr. Joseph Tetteh",
      position: "Security Guard",
      department: "Security",
      email: "joseph.tetteh@nolex.edu.gh",
      phone: "+233 24 345 6789",
      leaveType: "Emergency Leave",
      startDate: "2024-10-30",
      endDate: "2024-11-01",
      duration: 3,
      reason: "Family emergency requiring immediate attention",
      status: "Approved",
      appliedDate: "2024-10-29",
      approver: "Mr. Samuel Ofori",
      priority: "High",
      documents: [],
      emergencyContact: {
        name: "Mrs. Tetteh",
        phone: "+233 24 345 6790",
        relationship: "Spouse"
      },
      workHandover: "Security duties have been coordinated with the security team. Evening shift arrangements are in place.",
      coverageArrangement: "Mr. Kwame Amoah will cover the evening security shift. All security protocols have been briefed.",
      returnDate: "2024-11-02",
      medicalCertificate: null,
      additionalNotes: "Family emergency requires immediate travel to Tamale. Will return as soon as situation permits.",
      approvalHistory: [
        {
          action: "Applied",
          date: "2024-10-29 07:20 AM",
          by: "Joseph Tetteh",
          note: "Emergency leave application - family emergency"
        },
        {
          action: "Approved",
          date: "2024-10-29 08:45 AM",
          by: "Samuel Ofori",
          note: "Emergency leave approved. Take care of family matters."
        }
      ],
      leaveBalance: {
        annual: 9,
        sick: 9,
        emergency: 2,
        used: 14
      }
    },
    {
      id: 4,
      leaveId: "LV2024004",
      staffId: "NLX2024STF008",
      staffName: "Mrs. Ama Osei",
      position: "Science Teacher",
      department: "Teaching Staff",
      email: "ama.osei@nolex.edu.gh",
      phone: "+233 24 789 0123",
      leaveType: "Study Leave",
      startDate: "2024-11-20",
      endDate: "2024-11-22",
      duration: 3,
      reason: "Attending professional development workshop",
      status: "Pending",
      appliedDate: "2024-10-25",
      approver: "Mrs. Grace Adjei",
      priority: "Normal",
      documents: [
        { name: "Workshop Registration", type: "PDF", size: "98 KB" }
      ],
      emergencyContact: {
        name: "Mr. Osei",
        phone: "+233 24 789 0124",
        relationship: "Spouse"
      },
      workHandover: "Science experiments and practical sessions for Classes 3A and 3B are prepared. Laboratory materials are organized and ready.",
      coverageArrangement: "Mr. Francis Appiah will handle all science classes. Workshop materials will be shared upon return.",
      returnDate: "2024-11-23",
      medicalCertificate: null,
      additionalNotes: "This professional development workshop will enhance teaching methods in science education. Certificate will be provided upon completion.",
      approvalHistory: [
        {
          action: "Applied",
          date: "2024-10-25 03:15 PM",
          by: "Ama Osei",
          note: "Study leave application for professional development"
        },
        {
          action: "Under Review",
          date: "2024-10-26 10:00 AM",
          by: "Grace Adjei",
          note: "Reviewing application and workshop details"
        }
      ],
      leaveBalance: {
        annual: 14,
        sick: 10,
        emergency: 5,
        used: 7
      }
    },
    {
      id: 5,
      leaveId: "LV2024005",
      staffId: "NLX2024STF012",
      staffName: "Mr. Yaw Asante",
      position: "Social Studies Teacher",
      department: "Teaching Staff",
      email: "yaw.asante@nolex.edu.gh",
      phone: "+233 24 456 7890",
      leaveType: "Annual Leave",
      startDate: "2024-11-10",
      endDate: "2024-11-12",
      duration: 3,
      reason: "Personal time and rest",
      status: "Rejected",
      appliedDate: "2024-11-08",
      approver: "Mrs. Grace Adjei",
      priority: "Normal",
      documents: [],
      emergencyContact: {
        name: "Mrs. Asante",
        phone: "+233 24 456 7891",
        relationship: "Spouse"
      },
      workHandover: "Social Studies lessons for Classes 2A, 2B and 2C have been prepared as backup in case approval is granted.",
      coverageArrangement: "Coverage arrangement was to be confirmed pending approval.",
      returnDate: "2024-11-13",
      medicalCertificate: null,
      additionalNotes: "Short notice leave request for personal matters.",
      rejectionReason: "Insufficient notice period - requires 2 weeks advance notice for annual leave",
      approvalHistory: [
        {
          action: "Applied",
          date: "2024-11-08 04:30 PM",
          by: "Yaw Asante",
          note: "Annual leave application for personal time"
        },
        {
          action: "Rejected",
          date: "2024-11-09 09:15 AM",
          by: "Grace Adjei",
          note: "Application rejected due to insufficient notice period"
        }
      ],
      leaveBalance: {
        annual: 6,
        sick: 7,
        emergency: 3,
        used: 18
      }
    }
  ];

  return leaveApplications.find(leave => leave.id === parseInt(id));
};

export default function LeaveApplicationDetailPage({ params }: { params: { id: string } }) {
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [approvalNote, setApprovalNote] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  
  const application = getLeaveApplicationById(params.id);

  if (!application) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Leave Application Not Found</h3>
          <p className="text-gray-600 mb-4">The requested leave application could not be found.</p>
          <Link
            href="/headmaster/staff/leave"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Leave Management
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Approved": return "bg-green-100 text-green-800 border-green-200";
      case "Rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Normal": return "bg-blue-100 text-blue-800";
      case "Low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case "Annual Leave": return "bg-blue-100 text-blue-800";
      case "Sick Leave": return "bg-red-100 text-red-800";
      case "Emergency Leave": return "bg-orange-100 text-orange-800";
      case "Maternity/Paternity": return "bg-pink-100 text-pink-800";
      case "Study Leave": return "bg-purple-100 text-purple-800";
      case "Compassionate Leave": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleApproval = () => {
    // Handle approval logic here
    console.log("Approving application with note:", approvalNote);
    setShowApprovalModal(false);
    // Redirect or update state
  };

  const handleRejection = () => {
    // Handle rejection logic here
    console.log("Rejecting application with reason:", rejectionReason);
    setShowRejectionModal(false);
    // Redirect or update state
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/headmaster/staff/leave"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Leave Application Details</h1>
                <p className="text-emerald-100">Application ID: {application.leaveId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                {application.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(application.priority)}`}>
                {application.priority} Priority
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Applicant Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Applicant Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{application.staffName}</h4>
                <p className="text-gray-600">{application.position}</p>
                <p className="text-sm text-gray-500">Staff ID: {application.staffId}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{application.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{application.phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Leave Balance Summary</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm text-gray-600">Annual Leave</p>
                <p className="text-lg font-bold text-blue-600">{application.leaveBalance.annual} days</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm text-gray-600">Sick Leave</p>
                <p className="text-lg font-bold text-red-600">{application.leaveBalance.sick} days</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm text-gray-600">Emergency</p>
                <p className="text-lg font-bold text-orange-600">{application.leaveBalance.emergency} days</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm text-gray-600">Used This Year</p>
                <p className="text-lg font-bold text-gray-600">{application.leaveBalance.used} days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Details */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Leave Details</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Leave Type</label>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLeaveTypeColor(application.leaveType)}`}>
                {application.leaveType}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Duration</label>
              <p className="text-gray-900 font-medium">{application.duration} days</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
              <p className="text-gray-900 font-medium">{application.startDate}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
              <p className="text-gray-900 font-medium">{application.endDate}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Applied Date</label>
              <p className="text-gray-900 font-medium">{application.appliedDate}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Expected Return</label>
              <p className="text-gray-900 font-medium">{application.returnDate}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Approver</label>
              <p className="text-gray-900 font-medium">{application.approver}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Reason for Leave</label>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-900">{application.reason}</p>
          </div>
        </div>
      </div>

      {/* Work Coverage & Emergency Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Work Coverage</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Work Handover</label>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-900 text-sm">{application.workHandover}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Coverage Arrangement</label>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-900 text-sm">{application.coverageArrangement}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Emergency Contact</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Contact Name</label>
              <p className="text-gray-900 font-medium">{application.emergencyContact.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
              <p className="text-gray-900 font-medium">{application.emergencyContact.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Relationship</label>
              <p className="text-gray-900 font-medium">{application.emergencyContact.relationship}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents & Additional Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Supporting Documents</h3>
          {application.documents.length > 0 ? (
            <div className="space-y-3">
              {application.documents.map((doc, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No documents uploaded</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Additional Notes</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-900">{application.additionalNotes || "No additional notes provided."}</p>
          </div>
        </div>
      </div>

      {/* Approval History */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Approval History</h3>
        <div className="space-y-4">
          {application.approvalHistory.map((history, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{history.action}</h4>
                  <span className="text-sm text-gray-500">{history.date}</span>
                </div>
                <p className="text-sm text-gray-600">By: {history.by}</p>
                <p className="text-sm text-gray-700 mt-1">{history.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
            <Printer className="w-5 h-5" />
            Print
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
            <Send className="w-5 h-5" />
            Notify
          </button>
        </div>

        {application.status === "Pending" && (
          <div className="flex gap-3">
            <button
              onClick={() => setShowRejectionModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Reject
            </button>
            <button
              onClick={() => setShowApprovalModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              Approve
            </button>
          </div>
        )}
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Approve Leave Application</h3>
            
            <p className="text-gray-600 mb-4">
              Are you sure you want to approve this leave application for <strong>{application.staffName}</strong>?
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Approval Note (Optional)</label>
              <textarea
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                placeholder="Add any additional notes..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApproval}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Leave Application</h3>
            
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting this leave application for <strong>{application.staffName}</strong>.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rejection Reason <span className="text-red-500">*</span></label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a detailed reason for rejection..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectionModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRejection}
                disabled={!rejectionReason.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
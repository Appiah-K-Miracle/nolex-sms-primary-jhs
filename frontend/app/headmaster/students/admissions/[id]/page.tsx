"use client"

import { useState } from "react";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  School, 
  FileText, 
  Download, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Users, 
  Heart, 
  Shield, 
  Star,
  Eye,
  MessageSquare,
  UserCheck,
  CalendarDays,
  Printer,
  Send,
  Archive,
  MoreVertical,
  Info,
  Award,
  Activity,
  Upload
} from "lucide-react";
import Link from "next/link";

// Mock data for a specific application
const applicationData = {
  id: 1,
  applicationNumber: "ADM2024001",
  status: "Under Review",
  priority: "High",
  submissionDate: "2024-10-15",
  lastUpdated: "2024-10-25",
  student: {
    firstName: "Sarah",
    middleName: "Grace",
    lastName: "Johnson",
    dateOfBirth: "2015-03-15",
    age: 9,
    gender: "Female",
    nationality: "Ghanaian",
    religion: "Christian",
    gradeApplying: "Grade 4",
    previousSchool: "Little Angels Kindergarten",
    address: "123 Oak Street, East Legon, Accra",
    medicalConditions: "None",
    allergies: "Peanuts",
    bloodGroup: "O+",
    specialNeeds: "None",
    photoUrl: null
  },
  parents: {
    primary: {
      title: "Mr.",
      firstName: "Michael",
      lastName: "Johnson",
      relationship: "Father",
      occupation: "Software Engineer",
      workplace: "Tech Solutions Ltd",
      phone: "+233 244 567 890",
      email: "michael.johnson@email.com",
      address: "123 Oak Street, East Legon, Accra",
      emergencyContact: "+233 244 567 891"
    },
    secondary: {
      title: "Mrs.",
      firstName: "Grace",
      lastName: "Johnson",
      relationship: "Mother",
      occupation: "Teacher",
      workplace: "Accra International School",
      phone: "+233 244 567 892",
      email: "grace.johnson@email.com",
      address: "123 Oak Street, East Legon, Accra",
      emergencyContact: "+233 244 567 893"
    }
  },
  additional: {
    transportationNeeded: true,
    lunchRequired: true,
    afterSchoolProgram: false,
    extracurricularInterests: ["Sports", "Music", "Art"],
    languagesSpoken: "English, Twi",
    hobbies: "Reading, Drawing, Playing Soccer",
    reasonForApplying: "We believe Nolex Primary provides excellent academic foundation and character development opportunities for our daughter.",
    hearAboutSchool: "Friend/Family",
    expectedStartDate: "2025-01-15",
    specialRequests: "Please ensure she sits with other children who speak English as we're working on her confidence."
  },
  documents: {
    birth_certificate: { name: "Birth_Certificate_Sarah_Johnson.pdf", uploaded: true, verified: true },
    medical_report: { name: "Medical_Report_Sarah_Johnson.pdf", uploaded: true, verified: true },
    vaccination_records: { name: "Vaccination_Records_Sarah_Johnson.pdf", uploaded: true, verified: false },
    academic_transcript: { name: "Academic_Transcript_Sarah_Johnson.pdf", uploaded: true, verified: true },
    passport_photo: { name: "Passport_Photo_Sarah_Johnson.jpg", uploaded: true, verified: true },
    parent_id: { name: "Parent_ID_Johnson.pdf", uploaded: true, verified: true },
    proof_of_residence: { name: "Proof_of_Residence_Johnson.pdf", uploaded: false, verified: false }
  },
  timeline: [
    { id: 1, date: "2024-10-15", action: "Application Submitted", description: "Initial application submitted online", type: "submitted" },
    { id: 2, date: "2024-10-16", action: "Documents Received", description: "All required documents uploaded", type: "document" },
    { id: 3, date: "2024-10-18", action: "Initial Review", description: "Application passed initial screening", type: "review" },
    { id: 4, date: "2024-10-22", action: "Interview Scheduled", description: "Parent interview scheduled for November 5th", type: "interview" },
    { id: 5, date: "2024-10-25", action: "Status Updated", description: "Moved to Under Review status", type: "status" }
  ],
  interview: {
    scheduled: true,
    date: "2024-11-05",
    time: "10:00 AM",
    interviewer: "Mrs. Patricia Mensah",
    location: "Principal's Office",
    notes: "Parent interview to discuss student's needs and school expectations"
  },
  fees: {
    applicationFee: 100,
    admissionFee: 500,
    registrationFee: 300,
    firstTermFees: 2500,
    total: 3400,
    paid: 100,
    balance: 3300
  }
};

const statusColors = {
  "Pending Review": { color: "#f59e0b", bgColor: "#fef3c7", textColor: "#92400e" },
  "Under Review": { color: "#3b82f6", bgColor: "#dbeafe", textColor: "#1e40af" },
  "Approved": { color: "#10b981", bgColor: "#d1fae5", textColor: "#065f46" },
  "Rejected": { color: "#ef4444", bgColor: "#fee2e2", textColor: "#991b1b" },
  "Waitlisted": { color: "#8b5cf6", bgColor: "#ede9fe", textColor: "#5b21b6" }
};

export default function ApplicationDetailPage({ params }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState(applicationData.status);

  const statusInfo = statusColors[applicationData.status] || statusColors["Pending Review"];

  const handleStatusChange = () => {
    console.log("Status changed to:", newStatus);
    setShowStatusModal(false);
  };

  const handleDeleteApplication = () => {
    console.log("Deleting application:", applicationData.applicationNumber);
    setShowDeleteModal(false);
  };

  const getTimelineIcon = (type) => {
    switch (type) {
      case "submitted": return <FileText className="w-4 h-4" />;
      case "document": return <Upload className="w-4 h-4" />;
      case "review": return <Eye className="w-4 h-4" />;
      case "interview": return <Calendar className="w-4 h-4" />;
      case "status": return <Activity className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getTimelineColor = (type) => {
    switch (type) {
      case "submitted": return "bg-blue-100 text-blue-600";
      case "document": return "bg-green-100 text-green-600";
      case "review": return "bg-purple-100 text-purple-600";
      case "interview": return "bg-orange-100 text-orange-600";
      case "status": return "bg-indigo-100 text-indigo-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/headmaster/students/admissions"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <User className="w-8 h-8" />
                  {applicationData.student.firstName} {applicationData.student.lastName}
                </h1>
                <p className="text-blue-100 mt-1">Application #{applicationData.applicationNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span 
                className="px-4 py-2 rounded-full text-sm font-bold"
                style={{ 
                  backgroundColor: statusInfo.bgColor, 
                  color: statusInfo.textColor 
                }}
              >
                {applicationData.status}
              </span>
              <div className="flex gap-2">
                <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
                  <Printer className="w-5 h-5" />
                </button>
                <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Application Date</p>
              <p className="text-xl font-bold text-blue-600">{applicationData.submissionDate}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Grade Applying</p>
              <p className="text-xl font-bold text-green-600">{applicationData.student.gradeApplying}</p>
            </div>
            <School className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Priority Level</p>
              <p className="text-xl font-bold text-orange-600">{applicationData.priority}</p>
            </div>
            <Star className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Interview Status</p>
              <p className="text-xl font-bold text-purple-600">{applicationData.interview.scheduled ? "Scheduled" : "Pending"}</p>
            </div>
            <CalendarDays className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="flex border-b border-gray-100">
          {[
            { id: "overview", label: "Overview", icon: Eye },
            { id: "student", label: "Student Details", icon: User },
            { id: "parents", label: "Parent Info", icon: Users },
            { id: "documents", label: "Documents", icon: FileText },
            { id: "timeline", label: "Timeline", icon: Activity },
            { id: "interview", label: "Interview", icon: MessageSquare }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex-1 px-6 py-4 font-semibold focus:outline-none transition-all duration-300 relative ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white" 
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Student Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Student Summary</h3>
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {applicationData.student.firstName[0]}{applicationData.student.lastName[0]}
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {applicationData.student.firstName} {applicationData.student.middleName} {applicationData.student.lastName}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><span className="text-gray-600">Age:</span> <span className="font-medium">{applicationData.student.age} years old</span></p>
                    <p><span className="text-gray-600">Gender:</span> <span className="font-medium">{applicationData.student.gender}</span></p>
                    <p><span className="text-gray-600">Grade:</span> <span className="font-medium">{applicationData.student.gradeApplying}</span></p>
                    <p><span className="text-gray-600">Previous School:</span> <span className="font-medium">{applicationData.student.previousSchool}</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Application Progress</h3>
              <div className="space-y-4">
                {[
                  { step: "Application Submitted", completed: true, current: false },
                  { step: "Documents Verified", completed: true, current: false },
                  { step: "Initial Review", completed: true, current: false },
                  { step: "Interview Scheduled", completed: true, current: true },
                  { step: "Final Decision", completed: false, current: false },
                  { step: "Enrollment", completed: false, current: false }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.completed ? "bg-green-500 text-white" :
                      item.current ? "bg-blue-500 text-white" :
                      "bg-gray-200 text-gray-500"
                    }`}>
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : item.current ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        item.completed ? "text-green-600" :
                        item.current ? "text-blue-600" :
                        "text-gray-500"
                      }`}>
                        {item.step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => setShowStatusModal(true)}
                  className="p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 flex flex-col items-center gap-2"
                >
                  <UserCheck className="w-6 h-6" />
                  <span className="text-sm font-medium">Update Status</span>
                </button>
                <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 flex flex-col items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm font-medium">Schedule Interview</span>
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 flex flex-col items-center gap-2">
                  <Send className="w-6 h-6" />
                  <span className="text-sm font-medium">Send Message</span>
                </button>
                <Link 
                  href={`/headmaster/students/admissions/edit/${applicationData.id}`}
                  className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-300 flex flex-col items-center gap-2"
                >
                  <Edit3 className="w-6 h-6" />
                  <span className="text-sm font-medium">Edit Application</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{applicationData.parents.primary.title} {applicationData.parents.primary.firstName} {applicationData.parents.primary.lastName}</p>
                    <p className="text-sm text-gray-600">{applicationData.parents.primary.relationship}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{applicationData.parents.primary.phone}</p>
                    <p className="text-sm text-gray-600">Primary Phone</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{applicationData.parents.primary.email}</p>
                    <p className="text-sm text-gray-600">Email Address</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Details */}
            {applicationData.interview.scheduled && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Interview</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{applicationData.interview.date}</p>
                      <p className="text-sm text-gray-600">Interview Date</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{applicationData.interview.time}</p>
                      <p className="text-sm text-gray-600">Interview Time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{applicationData.interview.location}</p>
                      <p className="text-sm text-gray-600">Location</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{applicationData.interview.interviewer}</p>
                      <p className="text-sm text-gray-600">Interviewer</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Document Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Document Status</h3>
              <div className="space-y-3">
                {Object.entries(applicationData.documents).map(([key, doc]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    <div className="flex items-center gap-2">
                      {doc.uploaded ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      {doc.verified && (
                        <Award className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "student" && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Student Information</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h4>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">First Name</label>
                      <p className="font-semibold text-gray-900">{applicationData.student.firstName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Middle Name</label>
                      <p className="font-semibold text-gray-900">{applicationData.student.middleName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Name</label>
                      <p className="font-semibold text-gray-900">{applicationData.student.lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                      <p className="font-semibold text-gray-900">{applicationData.student.dateOfBirth}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Gender</label>
                      <p className="font-semibold text-gray-900">{applicationData.student.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Nationality</label>
                      <p className="font-semibold text-gray-900">{applicationData.student.nationality}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Religion</label>
                      <p className="font-semibold text-gray-900">{applicationData.student.religion}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Blood Group</label>
                      <p className="font-semibold text-gray-900">{applicationData.student.bloodGroup}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Home Address</label>
                    <p className="font-semibold text-gray-900">{applicationData.student.address}</p>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Academic Details</h4>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Grade Applying For</label>
                    <p className="font-semibold text-gray-900">{applicationData.student.gradeApplying}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Previous School</label>
                    <p className="font-semibold text-gray-900">{applicationData.student.previousSchool}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Expected Start Date</label>
                    <p className="font-semibold text-gray-900">{applicationData.additional.expectedStartDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Health & Additional Information */}
            <div className="space-y-6">
              {/* Health Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Health Information</h4>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Medical Conditions</label>
                    <p className="font-semibold text-gray-900">{applicationData.student.medicalConditions || "None"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Allergies</label>
                    <p className="font-semibold text-gray-900">{applicationData.student.allergies || "None"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Special Needs</label>
                    <p className="font-semibold text-gray-900">{applicationData.student.specialNeeds || "None"}</p>
                  </div>
                </div>
              </div>

              {/* Interests & Preferences */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Interests & Preferences</h4>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Languages Spoken</label>
                    <p className="font-semibold text-gray-900">{applicationData.additional.languagesSpoken}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Hobbies</label>
                    <p className="font-semibold text-gray-900">{applicationData.additional.hobbies}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Extracurricular Interests</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {applicationData.additional.extracurricularInterests.map((interest, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* School Services */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">School Services</h4>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Transportation</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${applicationData.additional.transportationNeeded ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {applicationData.additional.transportationNeeded ? 'Required' : 'Not Required'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Lunch Program</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${applicationData.additional.lunchRequired ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {applicationData.additional.lunchRequired ? 'Required' : 'Not Required'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">After School Program</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${applicationData.additional.afterSchoolProgram ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {applicationData.additional.afterSchoolProgram ? 'Required' : 'Not Required'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "parents" && (
        <div className="space-y-8">
          {/* Primary Parent */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-green-600" />
              Primary Parent/Guardian
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                  <div className="bg-green-50 rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Full Name</label>
                        <p className="font-semibold text-gray-900">
                          {applicationData.parents.primary.title} {applicationData.parents.primary.firstName} {applicationData.parents.primary.lastName}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Relationship</label>
                        <p className="font-semibold text-gray-900">{applicationData.parents.primary.relationship}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Address</label>
                      <p className="font-semibold text-gray-900">{applicationData.parents.primary.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact & Professional</h4>
                  <div className="bg-green-50 rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone Number</label>
                        <p className="font-semibold text-gray-900">{applicationData.parents.primary.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email Address</label>
                        <p className="font-semibold text-gray-900">{applicationData.parents.primary.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Occupation</label>
                        <p className="font-semibold text-gray-900">{applicationData.parents.primary.occupation}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Workplace</label>
                        <p className="font-semibold text-gray-900">{applicationData.parents.primary.workplace}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                        <p className="font-semibold text-gray-900">{applicationData.parents.primary.emergencyContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Parent */}
          {applicationData.parents.secondary.firstName && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Secondary Parent/Guardian
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                    <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Full Name</label>
                          <p className="font-semibold text-gray-900">
                            {applicationData.parents.secondary.title} {applicationData.parents.secondary.firstName} {applicationData.parents.secondary.lastName}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Relationship</label>
                          <p className="font-semibold text-gray-900">{applicationData.parents.secondary.relationship}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Address</label>
                        <p className="font-semibold text-gray-900">{applicationData.parents.secondary.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact & Professional</h4>
                    <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Phone Number</label>
                          <p className="font-semibold text-gray-900">{applicationData.parents.secondary.phone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Email Address</label>
                          <p className="font-semibold text-gray-900">{applicationData.parents.secondary.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Occupation</label>
                          <p className="font-semibold text-gray-900">{applicationData.parents.secondary.occupation}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Workplace</label>
                          <p className="font-semibold text-gray-900">{applicationData.parents.secondary.workplace}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                          <p className="font-semibold text-gray-900">{applicationData.parents.secondary.emergencyContact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "documents" && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Document Management</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(applicationData.documents).map(([key, doc]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 capitalize">
                    {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h4>
                  <div className="flex items-center gap-2">
                    {doc.uploaded ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    {doc.verified && (
                      <Award className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-gray-600">Status: </span>
                    <span className={`font-medium ${doc.uploaded ? 'text-green-600' : 'text-red-600'}`}>
                      {doc.uploaded ? 'Uploaded' : 'Missing'}
                    </span>
                  </div>
                  
                  {doc.uploaded && (
                    <>
                      <div className="text-sm">
                        <span className="text-gray-600">File: </span>
                        <span className="font-medium text-gray-900">{doc.name}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Verified: </span>
                        <span className={`font-medium ${doc.verified ? 'text-green-600' : 'text-orange-600'}`}>
                          {doc.verified ? 'Yes' : 'Pending'}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex gap-2 mt-4">
                  {doc.uploaded ? (
                    <>
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </>
                  ) : (
                    <button className="w-full bg-gray-100 text-gray-500 py-2 px-3 rounded-lg text-sm cursor-not-allowed">
                      Not Uploaded
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Application Timeline</h3>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-8">
              {applicationData.timeline.map((event, index) => (
                <div key={event.id} className="relative flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getTimelineColor(event.type)}`}>
                    {getTimelineIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{event.action}</h4>
                      <span className="text-sm text-gray-500">{event.date}</span>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "interview" && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Interview Management</h3>
          
          {applicationData.interview.scheduled ? (
            <div className="space-y-8">
              {/* Interview Details */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Interview</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{applicationData.interview.date}</p>
                        <p className="text-sm text-gray-600">Interview Date</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{applicationData.interview.time}</p>
                        <p className="text-sm text-gray-600">Interview Time</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{applicationData.interview.location}</p>
                        <p className="text-sm text-gray-600">Location</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{applicationData.interview.interviewer}</p>
                        <p className="text-sm text-gray-600">Interviewer</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Notes: {applicationData.interview.notes}</p>
                </div>
              </div>

              {/* Interview Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Reschedule Interview
                </button>
                <button className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Reminder
                </button>
                <button className="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Add Notes
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">No Interview Scheduled</h4>
              <p className="text-gray-600 mb-6">Schedule an interview with the parent/guardian to discuss the application.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 mx-auto">
                <Calendar className="w-5 h-5" />
                Schedule Interview
              </button>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8">
        <div className="flex gap-4">
          <Link 
            href={`/headmaster/students/admissions/edit/${applicationData.id}`}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Edit3 className="w-5 h-5" />
            Edit Application
          </Link>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Details
          </button>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowStatusModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <UserCheck className="w-5 h-5" />
            Update Status
          </button>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Delete Application
          </button>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Update Application Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
                  <p className="text-lg font-semibold text-gray-900">{applicationData.status}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Pending Review">Pending Review</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Waitlisted">Waitlisted</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleStatusChange}
                  className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Delete Application</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete the application for "<strong>{applicationData.student.firstName} {applicationData.student.lastName}</strong>"? This action cannot be undone.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-red-800 mb-2">This will permanently remove:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Student application data ({applicationData.applicationNumber})</li>
                  <li>• All uploaded documents</li>
                  <li>• Parent contact information</li>
                  <li>• Application timeline and notes</li>
                  <li>• Interview schedules</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteApplication}
                  className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Delete Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
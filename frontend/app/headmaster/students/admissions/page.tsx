"use client"

import { useState } from "react";
import { 
  UserPlus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  Download,
  Upload,
  Calendar,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  User,
  Phone,
  Mail,
  MapPin,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  Star,
  TrendingUp,
  Activity,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Award,
  School,
  Home,
  Calendar as CalendarIcon,
  UserCheck
} from "lucide-react";
import Link from "next/link";

const admissionStatuses = [
  { id: 1, name: "Pending Review", color: "#f59e0b", bgColor: "#fef3c7", textColor: "#92400e" },
  { id: 2, name: "Under Review", color: "#3b82f6", bgColor: "#dbeafe", textColor: "#1e40af" },
  { id: 3, name: "Approved", color: "#10b981", bgColor: "#d1fae5", textColor: "#065f46" },
  { id: 4, name: "Rejected", color: "#ef4444", bgColor: "#fee2e2", textColor: "#991b1b" },
  { id: 5, name: "Waitlisted", color: "#8b5cf6", bgColor: "#ede9fe", textColor: "#5b21b6" },
];

const admissionApplications = [
  {
    id: 1,
    applicationNumber: "ADM2024001",
    studentName: "Sarah Johnson",
    parentName: "Michael Johnson",
    dateOfBirth: "2015-03-15",
    gradeApplying: "Grade 4",
    applicationDate: "2024-10-15",
    status: "Pending Review",
    email: "michael.johnson@email.com",
    phone: "+233 244 567 890",
    address: "123 Oak Street, Accra",
    previousSchool: "Little Angels Kindergarten",
    emergencyContact: "+233 244 567 891",
    medicalConditions: "None",
    documents: ["Birth Certificate", "Medical Report", "Previous School Records"],
    interviewDate: null,
    admissionFee: 500,
    priority: "Normal"
  },
  {
    id: 2,
    applicationNumber: "ADM2024002",
    studentName: "David Chen",
    parentName: "Lisa Chen",
    dateOfBirth: "2016-08-22",
    gradeApplying: "Grade 3",
    applicationDate: "2024-10-18",
    status: "Under Review",
    email: "lisa.chen@email.com",
    phone: "+233 244 123 456",
    address: "456 Maple Avenue, Kumasi",
    previousSchool: "Rainbow Nursery",
    emergencyContact: "+233 244 123 457",
    medicalConditions: "Mild Asthma",
    documents: ["Birth Certificate", "Medical Report", "Vaccination Records"],
    interviewDate: "2024-11-05",
    admissionFee: 500,
    priority: "High"
  },
  {
    id: 3,
    applicationNumber: "ADM2024003",
    studentName: "Emily Davis",
    parentName: "Robert Davis",
    dateOfBirth: "2014-12-10",
    gradeApplying: "Grade 5",
    applicationDate: "2024-10-20",
    status: "Approved",
    email: "robert.davis@email.com",
    phone: "+233 244 789 012",
    address: "789 Pine Road, Tamale",
    previousSchool: "Bright Stars Academy",
    emergencyContact: "+233 244 789 013",
    medicalConditions: "None",
    documents: ["Birth Certificate", "Medical Report", "Academic Transcript"],
    interviewDate: "2024-10-28",
    admissionFee: 500,
    priority: "Normal"
  },
  {
    id: 4,
    applicationNumber: "ADM2024004",
    studentName: "James Wilson",
    parentName: "Mary Wilson",
    dateOfBirth: "2017-05-18",
    gradeApplying: "Grade 1",
    applicationDate: "2024-10-22",
    status: "Waitlisted",
    email: "mary.wilson@email.com",
    phone: "+233 244 345 678",
    address: "321 Cedar Lane, Ho",
    previousSchool: "First Steps Kindergarten",
    emergencyContact: "+233 244 345 679",
    medicalConditions: "Food Allergies (Nuts)",
    documents: ["Birth Certificate", "Medical Report"],
    interviewDate: "2024-11-10",
    admissionFee: 500,
    priority: "Normal"
  },
  {
    id: 5,
    applicationNumber: "ADM2024005",
    studentName: "Grace Thompson",
    parentName: "John Thompson",
    dateOfBirth: "2015-09-30",
    gradeApplying: "Grade 4",
    applicationDate: "2024-10-25",
    status: "Rejected",
    email: "john.thompson@email.com",
    phone: "+233 244 901 234",
    address: "654 Birch Street, Cape Coast",
    previousSchool: "Golden Gate Primary",
    emergencyContact: "+233 244 901 235",
    medicalConditions: "None",
    documents: ["Birth Certificate"],
    interviewDate: "2024-10-30",
    admissionFee: 500,
    priority: "Low"
  }
];

const gradeCapacity = [
  { grade: "Grade 1", capacity: 50, admitted: 45, pending: 8, available: 5 },
  { grade: "Grade 2", capacity: 45, admitted: 42, pending: 3, available: 3 },
  { grade: "Grade 3", capacity: 45, admitted: 40, pending: 5, available: 5 },
  { grade: "Grade 4", capacity: 40, admitted: 35, pending: 7, available: 5 },
  { grade: "Grade 5", capacity: 40, admitted: 38, pending: 4, available: 2 },
  { grade: "Grade 6", capacity: 35, admitted: 33, pending: 2, available: 2 },
];

const recentActivities = [
  { id: 1, action: "Application Submitted", student: "Sarah Johnson", time: "2 hours ago", type: "new" },
  { id: 2, action: "Interview Scheduled", student: "David Chen", time: "4 hours ago", type: "update" },
  { id: 3, action: "Application Approved", student: "Emily Davis", time: "6 hours ago", type: "approved" },
  { id: 4, action: "Document Uploaded", student: "James Wilson", time: "1 day ago", type: "document" },
];

export default function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterGrade, setFilterGrade] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  const getStatusInfo = (status) => {
    const statusInfo = admissionStatuses.find(s => s.name === status);
    return statusInfo || admissionStatuses[0];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-100";
      case "Normal": return "text-blue-600 bg-blue-100";
      case "Low": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const filteredApplications = admissionApplications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    const matchesGrade = filterGrade === "all" || app.gradeApplying === filterGrade;
    return matchesSearch && matchesStatus && matchesGrade;
  });

  const statsData = {
    totalApplications: admissionApplications.length,
    pendingReview: admissionApplications.filter(app => app.status === "Pending Review").length,
    approved: admissionApplications.filter(app => app.status === "Approved").length,
    rejected: admissionApplications.filter(app => app.status === "Rejected").length,
    totalCapacity: gradeCapacity.reduce((acc, grade) => acc + grade.capacity, 0),
    totalAdmitted: gradeCapacity.reduce((acc, grade) => acc + grade.admitted, 0),
    totalAvailable: gradeCapacity.reduce((acc, grade) => acc + grade.available, 0)
  };

  const openDeleteModal = (application) => {
    setApplicationToDelete(application);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting application:", applicationToDelete);
    setShowDeleteModal(false);
    setApplicationToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <UserPlus className="w-10 h-10" />
                Student Admissions
              </h1>
              <p className="text-green-100 text-lg">Manage student applications and enrollment process</p>
              <div className="flex items-center gap-6 mt-4 text-green-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">{statsData.totalApplications} Applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{statsData.totalAdmitted} Admitted</span>
                </div>
                <div className="flex items-center gap-2">
                  <School className="w-4 h-4" />
                  <span className="text-sm">{statsData.totalAvailable} Available Spots</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="/headmaster/students/admissions/create"
                className="bg-white hover:bg-green-50 text-green-700 border-2 border-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Application
              </Link>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Upload className="w-5 h-5 mr-2" />
                Import Applications
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-green-400/20 rounded-full translate-y-16"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Applications</p>
              <p className="text-3xl font-bold text-blue-600">{statsData.totalApplications}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-blue-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>15% increase this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Review</p>
              <p className="text-3xl font-bold text-orange-600">{statsData.pendingReview}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-orange-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span>Requires attention</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Approved</p>
              <p className="text-3xl font-bold text-green-600">{statsData.approved}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-600 text-sm">
            <UserCheck className="w-4 h-4 mr-1" />
            <span>Ready for enrollment</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Available Spots</p>
              <p className="text-3xl font-bold text-purple-600">{statsData.totalAvailable}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-purple-600 text-sm">
            <School className="w-4 h-4 mr-1" />
            <span>Across all grades</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 relative ${
              activeTab === "overview" 
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white" 
                : "text-gray-500 hover:text-green-600 hover:bg-green-50"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <div className="flex items-center justify-center gap-2">
              <Eye className="w-5 h-5" />
              <span>Overview</span>
            </div>
          </button>
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 relative ${
              activeTab === "applications" 
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" 
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("applications")}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              <span>Applications ({admissionApplications.length})</span>
            </div>
          </button>
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 relative ${
              activeTab === "capacity" 
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white" 
                : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
            }`}
            onClick={() => setActiveTab("capacity")}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              <span>Grade Capacity</span>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link 
                href="/headmaster/students/admissions/create"
                className="p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                <span>New Application</span>
              </Link>
              <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <CalendarIcon className="w-5 h-5" />
                <span>Schedule Interview</span>
              </button>
              <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Download className="w-5 h-5" />
                <span>Export Data</span>
              </button>
              <button className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Mail className="w-5 h-5" />
                <span>Send Notifications</span>
              </button>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Application Status Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {admissionStatuses.map((status) => {
                const count = admissionApplications.filter(app => app.status === status.name).length;
                const percentage = ((count / admissionApplications.length) * 100).toFixed(1);
                return (
                  <div key={status.id} className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: status.color }}
                      ></div>
                      <h4 className="font-semibold text-gray-900">{status.name}</h4>
                    </div>
                    <div className="text-2xl font-bold mb-1" style={{ color: status.color }}>{count}</div>
                    <div className="text-sm text-gray-500">{percentage}% of total</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${percentage}%`, 
                          backgroundColor: status.color 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "new" ? "bg-green-100 text-green-600" :
                    activity.type === "update" ? "bg-blue-100 text-blue-600" :
                    activity.type === "approved" ? "bg-purple-100 text-purple-600" :
                    "bg-orange-100 text-orange-600"
                  }`}>
                    {activity.type === "new" && <Plus className="w-5 h-5" />}
                    {activity.type === "update" && <Calendar className="w-5 h-5" />}
                    {activity.type === "approved" && <CheckCircle className="w-5 h-5" />}
                    {activity.type === "document" && <FileText className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.student} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "applications" && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Status</option>
                  {admissionStatuses.map((status) => (
                    <option key={status.id} value={status.name}>{status.name}</option>
                  ))}
                </select>
                <select 
                  value={filterGrade} 
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Grades</option>
                  {gradeCapacity.map((grade) => (
                    <option key={grade.grade} value={grade.grade}>{grade.grade}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-colors ${viewMode === "list" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-colors ${viewMode === "grid" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Applications List/Grid */}
          {viewMode === "list" ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-50 to-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Student</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Application #</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Grade</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Priority</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Applied Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredApplications.map((application) => {
                      const statusInfo = getStatusInfo(application.status);
                      return (
                        <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                {application.studentName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{application.studentName}</div>
                                <div className="text-sm text-gray-500">{application.parentName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-900">{application.applicationNumber}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-900">{application.gradeApplying}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span 
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{ 
                                backgroundColor: statusInfo.bgColor, 
                                color: statusInfo.textColor 
                              }}
                            >
                              {application.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(application.priority)}`}>
                              {application.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900">{application.applicationDate}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Link 
                                href={`/headmaster/students/admissions/${application.id}`}
                                className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <Link 
                                href={`/headmaster/students/admissions/edit/${application.id}`}
                                className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </Link>
                              <button 
                                onClick={() => openDeleteModal(application)}
                                className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApplications.map((application) => {
                const statusInfo = getStatusInfo(application.status);
                return (
                  <div key={application.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                    <div 
                      className="h-2"
                      style={{ backgroundColor: statusInfo.color }}
                    ></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {application.studentName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{application.studentName}</h3>
                            <p className="text-sm text-gray-600">{application.applicationNumber}</p>
                          </div>
                        </div>
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: statusInfo.bgColor, 
                            color: statusInfo.textColor 
                          }}
                        >
                          {application.status}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Grade Applying:</span>
                          <span className="font-medium">{application.gradeApplying}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Parent:</span>
                          <span className="font-medium">{application.parentName}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Applied:</span>
                          <span className="font-medium">{application.applicationDate}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Priority:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(application.priority)}`}>
                            {application.priority}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/headmaster/students/admissions/${application.id}`}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                        >
                          View Details
                        </Link>
                        <button 
                          onClick={() => openDeleteModal(application)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === "capacity" && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Grade Capacity Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradeCapacity.map((grade) => {
              const occupancyRate = ((grade.admitted / grade.capacity) * 100).toFixed(1);
              return (
                <div key={grade.grade} className="p-6 border border-gray-200 rounded-xl hover:border-green-300 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">{grade.grade}</h4>
                    <span className="text-sm text-gray-500">Capacity: {grade.capacity}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Admitted:</span>
                      <span className="font-medium text-green-600">{grade.admitted}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pending:</span>
                      <span className="font-medium text-orange-600">{grade.pending}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-medium text-blue-600">{grade.available}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Occupancy:</span>
                      <span className="font-medium text-purple-600">{occupancyRate}%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>0</span>
                      <span>{grade.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="flex h-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500"
                          style={{ width: `${(grade.admitted / grade.capacity) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-orange-400"
                          style={{ width: `${(grade.pending / grade.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Admitted</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span>Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && applicationToDelete && (
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
                Are you sure you want to delete the application for "<strong>{applicationToDelete.studentName}</strong>"? This action cannot be undone.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-red-800 mb-2">This will permanently remove:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Student application data ({applicationToDelete.applicationNumber})</li>
                  <li>• All uploaded documents</li>
                  <li>• Parent contact information</li>
                  <li>• Application history and notes</li>
                  <li>• Interview schedules (if any)</li>
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
                  onClick={handleDeleteConfirm}
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
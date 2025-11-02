"use client"

import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Plus, 
  Filter, 
  Search, 
  Download, 
  BarChart3, 
  TrendingUp,
  Eye,
  Edit3,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CalendarDays,
  PieChart,
  Activity,
  Award,
  Target,
  Info,
  RefreshCw,
  Send,
  MessageSquare,
  Trash2,
  CheckCheck,
  X
} from "lucide-react";
import Link from "next/link";

// Mock leave data
const leaveData = {
  summary: {
    totalApplications: 23,
    pendingApproval: 5,
    approved: 16,
    rejected: 2,
    thisMonth: 8
  },
  
  leaveTypes: [
    { type: "Annual Leave", used: 45, total: 120, rate: 37.5 },
    { type: "Sick Leave", used: 23, total: 60, rate: 38.3 },
    { type: "Emergency Leave", used: 8, total: 20, rate: 40.0 },
    { type: "Maternity/Paternity", used: 12, total: 30, rate: 40.0 },
    { type: "Study Leave", used: 3, total: 15, rate: 20.0 },
    { type: "Compassionate Leave", used: 6, total: 20, rate: 30.0 }
  ],
  
  recentApplications: [
    {
      id: 1,
      leaveId: "LV2024001",
      staffId: "NLX2024STF001",
      staffName: "Mr. Kwame Boateng",
      position: "Mathematics Teacher",
      department: "Teaching Staff",
      leaveType: "Annual Leave",
      startDate: "2024-11-15",
      endDate: "2024-11-19",
      duration: 5,
      reason: "Family vacation and personal time",
      status: "Pending",
      appliedDate: "2024-10-28",
      approver: "Mrs. Grace Adjei",
      priority: "Normal",
      documents: ["Medical Certificate"],
      contact: "+233 24 123 4567",
      emergencyContact: "Mrs. Boateng - +233 24 123 4568"
    },
    {
      id: 2,
      leaveId: "LV2024002",
      staffId: "NLX2024STF015",
      staffName: "Ms. Akosua Mensah",
      position: "English Teacher",
      department: "Teaching Staff",
      leaveType: "Sick Leave",
      startDate: "2024-11-05",
      endDate: "2024-11-07",
      duration: 3,
      reason: "Flu and fever - doctor recommended rest",
      status: "Approved",
      appliedDate: "2024-11-02",
      approver: "Mrs. Grace Adjei",
      priority: "High",
      documents: ["Medical Certificate"],
      contact: "+233 24 567 8901",
      emergencyContact: "Mr. Mensah - +233 24 567 8902"
    },
    {
      id: 3,
      leaveId: "LV2024003",
      staffId: "NLX2024STF022",
      staffName: "Mr. Joseph Tetteh",
      position: "Security Guard",
      department: "Security",
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
      contact: "+233 24 345 6789",
      emergencyContact: "Mrs. Tetteh - +233 24 345 6790"
    },
    {
      id: 4,
      leaveId: "LV2024004",
      staffId: "NLX2024STF008",
      staffName: "Mrs. Ama Osei",
      position: "Science Teacher",
      department: "Teaching Staff",
      leaveType: "Study Leave",
      startDate: "2024-11-20",
      endDate: "2024-11-22",
      duration: 3,
      reason: "Attending professional development workshop",
      status: "Pending",
      appliedDate: "2024-10-25",
      approver: "Mrs. Grace Adjei",
      priority: "Normal",
      documents: ["Workshop Registration"],
      contact: "+233 24 789 0123",
      emergencyContact: "Mr. Osei - +233 24 789 0124"
    },
    {
      id: 5,
      leaveId: "LV2024005",
      staffId: "NLX2024STF012",
      staffName: "Mr. Yaw Asante",
      position: "Social Studies Teacher",
      department: "Teaching Staff",
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
      contact: "+233 24 456 7890",
      emergencyContact: "Mrs. Asante - +233 24 456 7891",
      rejectionReason: "Insufficient notice period - requires 2 weeks advance notice"
    }
  ],
  
  monthlyStats: [
    { month: "August", applications: 15, approved: 12, rejected: 1, pending: 2 },
    { month: "September", applications: 18, approved: 15, rejected: 2, pending: 1 },
    { month: "October", applications: 12, approved: 10, rejected: 1, pending: 1 },
    { month: "November", applications: 8, approved: 5, rejected: 0, pending: 3 }
  ]
};

export default function LeaveManagementPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "applications", label: "Leave Applications", icon: FileText },
    { id: "calendar", label: "Leave Calendar", icon: Calendar },
    { id: "reports", label: "Reports", icon: Activity },
    { id: "settings", label: "Leave Policies", icon: Target }
  ];

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

  const openApprovalModal = (application: any) => {
    setSelectedApplication(application);
    setShowApprovalModal(true);
  };

  const filteredApplications = leaveData.recentApplications.filter(app => {
    const matchesSearch = app.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.leaveId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.leaveType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "all" || app.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Calendar className="w-8 h-8" />
                Leave Management
              </h1>
              <p className="text-emerald-100 mt-1">Manage staff leave applications and approvals</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium">Pending Approvals</p>
                <p className="text-lg font-bold">{leaveData.summary.pendingApproval}</p>
              </div>
              <Link
                href="/headmaster/staff/leave/select-staff"
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Apply Leave
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-teal-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{leaveData.summary.totalApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-gray-900">{leaveData.summary.pendingApproval}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{leaveData.summary.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{leaveData.summary.rejected}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <CalendarDays className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{leaveData.summary.thisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Leave Type Analytics */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <PieChart className="w-6 h-6 text-emerald-600" />
                  Leave Type Usage Analytics
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {leaveData.leaveTypes.map((leaveType, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{leaveType.type}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(leaveType.type)}`}>
                          {leaveType.rate}%
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Used:</span>
                          <span className="font-medium">{leaveType.used} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Available:</span>
                          <span className="font-medium">{leaveType.total - leaveType.used} days</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full" 
                            style={{ width: `${leaveType.rate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Trends */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Monthly Leave Application Trends
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {leaveData.monthlyStats.map((month, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">{month.month}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total:</span>
                          <span className="font-medium">{month.applications}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Approved:</span>
                          <span className="text-green-600 font-medium">{month.approved}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rejected:</span>
                          <span className="text-red-600 font-medium">{month.rejected}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pending:</span>
                          <span className="text-yellow-600 font-medium">{month.pending}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Applications Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-emerald-600" />
                  Recent Leave Applications
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Leave ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Staff</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Duration</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Priority</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveData.recentApplications.slice(0, 5).map((application) => (
                        <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{application.leaveId}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{application.staffName}</p>
                              <p className="text-sm text-gray-600">{application.position}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(application.leaveType)}`}>
                              {application.leaveType}
                            </span>
                          </td>
                          <td className="py-3 px-4">{application.duration} days</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                              {application.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(application.priority)}`}>
                              {application.priority}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Link
                                href={`/headmaster/staff/leave/${application.id}`}
                                className="text-emerald-600 hover:text-emerald-800"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              {application.status === "Pending" && (
                                <button className="text-blue-600 hover:text-blue-800">
                                  <CheckCheck className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "applications" && (
            <div className="space-y-8">
              {/* Filters */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Filter Leave Applications</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search by name, ID, or type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="all">All Departments</option>
                      <option value="Teaching Staff">Teaching Staff</option>
                      <option value="Administrative">Administrative</option>
                      <option value="Support Staff">Support Staff</option>
                      <option value="Security">Security</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="all">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
                    <div className="flex gap-2">
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        <Filter className="w-4 h-4" />
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <div key={application.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{application.staffName}</h4>
                          <p className="text-sm text-gray-600">{application.position} • {application.department}</p>
                          <p className="text-sm text-gray-600">ID: {application.staffId} • Leave ID: {application.leaveId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">Applied: {application.appliedDate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-2">Leave Details</h5>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-600">Type:</span> 
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(application.leaveType)}`}>
                              {application.leaveType}
                            </span>
                          </p>
                          <p><span className="text-gray-600">Duration:</span> <span className="font-medium">{application.duration} days</span></p>
                          <p><span className="text-gray-600">From:</span> <span className="font-medium">{application.startDate}</span></p>
                          <p><span className="text-gray-600">To:</span> <span className="font-medium">{application.endDate}</span></p>
                          <p><span className="text-gray-600">Priority:</span> 
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(application.priority)}`}>
                              {application.priority}
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-2">Reason & Documents</h5>
                        <p className="text-sm text-gray-700 mb-2">{application.reason}</p>
                        {application.documents.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Documents:</p>
                            <ul className="text-xs text-gray-600">
                              {application.documents.map((doc, index) => (
                                <li key={index} className="flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-2">Contact & Approval</h5>
                        <div className="space-y-1 text-sm">
                          <p className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">{application.contact}</span>
                          </p>
                          <p className="flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">{application.emergencyContact}</span>
                          </p>
                          <p><span className="text-gray-600">Approver:</span> <span className="font-medium">{application.approver}</span></p>
                          {application.status === "Rejected" && application.rejectionReason && (
                            <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
                              <p className="text-xs text-red-700"><strong>Rejection Reason:</strong></p>
                              <p className="text-xs text-red-600">{application.rejectionReason}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        <Link
                          href={`/headmaster/staff/leave/${application.id}`}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Link>
                        {application.status === "Pending" && (
                          <>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                              <CheckCheck className="w-4 h-4" />
                              Approve
                            </button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                              <X className="w-4 h-4" />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Notify
                        </button>
                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-emerald-600" />
                Leave Calendar View
              </h3>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View Coming Soon</h3>
                <p className="text-gray-600">Interactive calendar showing all staff leave schedules and conflicts.</p>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Leave Reports & Analytics</h3>
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Reporting</h3>
                  <p className="text-gray-600">Comprehensive leave analytics, usage patterns, and compliance reports.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Leave Policies & Settings</h3>
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Policy Configuration</h3>
                  <p className="text-gray-600">Configure leave types, policies, approval workflows, and system settings.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Leave Application Details</h3>
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{selectedApplication.staffName}</h4>
                    <p className="text-gray-600">{selectedApplication.position} • {selectedApplication.department}</p>
                    <p className="text-sm text-gray-500">Staff ID: {selectedApplication.staffId}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Leave ID</label>
                    <p className="text-gray-900">{selectedApplication.leaveId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLeaveTypeColor(selectedApplication.leaveType)}`}>
                      {selectedApplication.leaveType}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <p className="text-gray-900">{selectedApplication.duration} days</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <p className="text-gray-900">{selectedApplication.startDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <p className="text-gray-900">{selectedApplication.endDate}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-900">{selectedApplication.reason}</p>
                  </div>
                </div>
                
                {selectedApplication.status === "Rejected" && selectedApplication.rejectionReason && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason</label>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-700">{selectedApplication.rejectionReason}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {selectedApplication.status === "Pending" && (
                  <>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
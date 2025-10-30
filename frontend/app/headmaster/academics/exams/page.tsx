"use client"

import { useState } from "react";
import { 
  Plus, 
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
  Settings,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Star,
  MapPin,
  Target,
  MoreVertical,
  FileText,
  Award,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Clipboard,
  Timer,
  AlertTriangle,
  Save,
  Copy,
  Printer
} from "lucide-react";
import Link from "next/link";

const examTypes = [
  { id: 1, name: "Mid-Term Examination", code: "MID", color: "#3b82f6", duration: "2 weeks" },
  { id: 2, name: "End of Term Examination", code: "EOT", color: "#10b981", duration: "3 weeks" },
  { id: 3, name: "Class Test", code: "CT", color: "#f59e0b", duration: "1 week" },
  { id: 4, name: "Quiz", code: "QZ", color: "#8b5cf6", duration: "1 day" },
  { id: 5, name: "Assignment", code: "ASG", color: "#ef4444", duration: "1 week" },
];

const examinations = [
  {
    id: 1,
    name: "First Term Mid-Term Examination",
    type: "Mid-Term Examination",
    status: "Active",
    startDate: "2024-11-15",
    endDate: "2024-11-29",
    classes: ["Grade 1", "Grade 2", "Grade 3"],
    subjects: 8,
    totalStudents: 180,
    completedExams: 45,
    progress: 65,
    createdBy: "Mr. John Doe",
    createdDate: "2024-10-20"
  },
  {
    id: 2,
    name: "Grade 4-6 Class Test Series",
    type: "Class Test",
    status: "Scheduled",
    startDate: "2024-12-02",
    endDate: "2024-12-06",
    classes: ["Grade 4", "Grade 5", "Grade 6"],
    subjects: 6,
    totalStudents: 85,
    completedExams: 0,
    progress: 0,
    createdBy: "Ms. Sarah Davis",
    createdDate: "2024-10-25"
  },
  {
    id: 3,
    name: "End of First Term Examination",
    type: "End of Term Examination",
    status: "Draft",
    startDate: "2024-12-10",
    endDate: "2024-12-20",
    classes: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"],
    subjects: 8,
    totalStudents: 265,
    completedExams: 0,
    progress: 0,
    createdBy: "Mr. Michael Brown",
    createdDate: "2024-10-28"
  }
];

const subjects = [
  { id: 1, name: "Mathematics", code: "MATH", color: "#10b981" },
  { id: 2, name: "English Language", code: "ENG", color: "#3b82f6" },
  { id: 3, name: "Science", code: "SCI", color: "#8b5cf6" },
  { id: 4, name: "Social Studies", code: "SST", color: "#f59e0b" },
  { id: 5, name: "Computing", code: "ICT", color: "#ef4444" },
  { id: 6, name: "RME", code: "RME", color: "#06b6d4" },
  { id: 7, name: "French", code: "FRE", color: "#84cc16" },
  { id: 8, name: "Physical Education", code: "PE", color: "#f97316" },
];

const recentActivities = [
  { id: 1, action: "Created", item: "Grade 5 Mathematics Quiz", user: "Mr. John Doe", time: "2 hours ago", type: "create" },
  { id: 2, action: "Updated", item: "Mid-Term Exam Schedule", user: "Ms. Sarah Davis", time: "4 hours ago", type: "update" },
  { id: 3, action: "Published", item: "Grade 3 English Test Results", user: "Ms. Emily Williams", time: "6 hours ago", type: "publish" },
  { id: 4, action: "Scheduled", item: "End Term Examinations", user: "Mr. Michael Brown", time: "1 day ago", type: "schedule" },
];

export default function ExaminationsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      case "Completed": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    const examType = examTypes.find(t => t.name === type);
    return examType?.color || "#6b7280";
  };

  const openDeleteModal = (exam) => {
    setExamToDelete(exam);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    // Here you would handle the actual deletion
    console.log("Deleting exam:", examToDelete);
    setShowDeleteModal(false);
    setExamToDelete(null);
  };

  const filteredExaminations = examinations.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || exam.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <FileText className="w-10 h-10" />
                Examination Management
              </h1>
              <p className="text-purple-100 text-lg">Create, manage, and monitor academic assessments</p>
              <div className="flex items-center gap-6 mt-4 text-purple-100">
                <div className="flex items-center gap-2">
                  <Clipboard className="w-4 h-4" />
                  <span className="text-sm">{examinations.length} Examinations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{examinations.reduce((acc, exam) => acc + exam.totalStudents, 0)} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">{subjects.length} Subjects</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="/headmaster/academics/exams/create"
                className="bg-white hover:bg-purple-50 text-purple-700 border-2 border-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Examination
              </Link>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Upload className="w-5 h-5 mr-2" />
                Import Questions
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-purple-400/20 rounded-full translate-y-16"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Exams</p>
              <p className="text-3xl font-bold text-green-600">
                {examinations.filter(e => e.status === "Active").length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>12% increase</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Scheduled Exams</p>
              <p className="text-3xl font-bold text-blue-600">
                {examinations.filter(e => e.status === "Scheduled").length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-blue-600 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>Next: Nov 15</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold text-purple-600">
                {examinations.reduce((acc, exam) => acc + exam.totalStudents, 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-purple-600 text-sm">
            <Award className="w-4 h-4 mr-1" />
            <span>85% completion</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Average Score</p>
              <p className="text-3xl font-bold text-orange-600">78%</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-xl">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-orange-600 text-sm">
            <Star className="w-4 h-4 mr-1" />
            <span>Above target</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 relative ${
              activeTab === "overview" 
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white" 
                : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
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
              activeTab === "examinations" 
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" 
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("examinations")}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              <span>Examinations ({examinations.length})</span>
            </div>
          </button>
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 relative ${
              activeTab === "results" 
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white" 
                : "text-gray-500 hover:text-green-600 hover:bg-green-50"
            }`}
            onClick={() => setActiveTab("results")}
          >
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5" />
              <span>Results & Analytics</span>
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
                href="/headmaster/academics/exams/create"
                className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                <span>Create Exam</span>
              </Link>
              <Link 
                href="/headmaster/academics/exams/schedule"
                className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Exam</span>
              </Link>
              <Link 
                href="/headmaster/academics/exams/results"
                className="p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <BarChart3 className="w-5 h-5" />
                <span>View Results</span>
              </Link>
              <button className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Download className="w-5 h-5" />
                <span>Export Data</span>
              </button>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "create" ? "bg-green-100 text-green-600" :
                    activity.type === "update" ? "bg-blue-100 text-blue-600" :
                    activity.type === "publish" ? "bg-purple-100 text-purple-600" :
                    "bg-orange-100 text-orange-600"
                  }`}>
                    {activity.type === "create" && <Plus className="w-5 h-5" />}
                    {activity.type === "update" && <Edit3 className="w-5 h-5" />}
                    {activity.type === "publish" && <CheckCircle className="w-5 h-5" />}
                    {activity.type === "schedule" && <Calendar className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {activity.action} {activity.item}
                    </p>
                    <p className="text-sm text-gray-600">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Types Overview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Examination Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examTypes.map((type) => (
                <div key={type.id} className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: type.color }}
                    ></div>
                    <h4 className="font-semibold text-gray-900">{type.name}</h4>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Code: {type.code}</span>
                    <span>Duration: {type.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "examinations" && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search examinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-colors ${viewMode === "list" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-colors ${viewMode === "grid" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Examinations List/Grid */}
          {viewMode === "list" ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Examination</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Schedule</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Progress</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Students</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredExaminations.map((exam) => (
                      <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: getTypeColor(exam.type) }}
                            ></div>
                            <div>
                              <div className="font-semibold text-gray-900">{exam.name}</div>
                              <div className="text-sm text-gray-500">{exam.classes.length} classes</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900">{exam.type}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                            {exam.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{exam.startDate}</div>
                            <div className="text-gray-500">to {exam.endDate}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${exam.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{exam.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{exam.totalStudents}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link 
                              href={`/headmaster/academics/exams/${exam.id}`}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link 
                              href={`/headmaster/academics/exams/edit/${exam.id}`}
                              className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>
                            <button 
                              onClick={() => openDeleteModal(exam)}
                              className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExaminations.map((exam) => (
                <div key={exam.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div 
                    className="h-2"
                    style={{ backgroundColor: getTypeColor(exam.type) }}
                  ></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{exam.name}</h3>
                        <p className="text-sm text-gray-600">{exam.type}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                        {exam.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Start Date:</span>
                        <span className="font-medium">{exam.startDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">End Date:</span>
                        <span className="font-medium">{exam.endDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Students:</span>
                        <span className="font-medium">{exam.totalStudents}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-medium">{exam.progress}%</span>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${exam.progress}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/headmaster/academics/exams/${exam.id}`}
                        className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                      >
                        View Details
                      </Link>
                      <button 
                        onClick={() => openDeleteModal(exam)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "results" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Overview</h3>
              <div className="h-64 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Performance charts will be displayed here</p>
                </div>
              </div>
            </div>

            {/* Grade Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Grade Distribution</h3>
              <div className="space-y-4">
                {["A", "B", "C", "D", "F"].map((grade, index) => {
                  const percentage = [35, 25, 20, 15, 5][index];
                  const color = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#6b7280"][index];
                  return (
                    <div key={grade} className="flex items-center gap-4">
                      <div className="w-8 text-center font-bold text-gray-700">{grade}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="h-3 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%`, backgroundColor: color }}
                        ></div>
                      </div>
                      <div className="w-12 text-right text-sm font-medium text-gray-700">{percentage}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Subject Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Subject Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjects.map((subject) => (
                <div key={subject.id} className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    ></div>
                    <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Average:</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Highest:</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pass Rate:</span>
                      <span className="font-medium">92%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && examToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Delete Examination</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete "<strong>{examToDelete.name}</strong>"? This action cannot be undone.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-red-800 mb-2">This will permanently remove:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• All examination data and records</li>
                  <li>• {examToDelete.totalStudents} student registrations</li>
                  <li>• {examToDelete.classes.length} class assignments</li>
                  <li>• Progress tracking and results</li>
                  <li>• Associated schedules and settings</li>
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
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
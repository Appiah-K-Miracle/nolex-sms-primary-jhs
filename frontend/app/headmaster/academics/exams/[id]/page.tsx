"use client"

import { useState } from "react";
import { 
  FileText,
  Calendar,
  Clock,
  Users,
  BookOpen,
  MapPin,
  Target,
  ArrowLeft,
  Edit3,
  Trash2,
  Download,
  Printer,
  Share2,
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  Timer,
  Settings,
  Eye,
  BarChart3,
  TrendingUp,
  Activity,
  Plus,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

// Sample examination data - in real app this would come from props/API
const examinationData = {
  id: 1,
  name: "First Term Mid-Term Examination",
  type: "Mid-Term Examination",
  status: "Active",
  description: "Comprehensive mid-semester assessment covering all subjects taught in the first half of the term. This examination aims to evaluate student understanding and progress in key learning areas.",
  startDate: "2024-11-15",
  endDate: "2024-11-29",
  startTime: "08:00",
  endTime: "12:00",
  duration: 120,
  venue: "Main Hall",
  totalMarks: 100,
  passMarks: 50,
  totalStudents: 180,
  completedStudents: 120,
  progress: 67,
  instructions: "Students must arrive 30 minutes before the examination starts. Bring writing materials and a calculator for Mathematics. Mobile phones are strictly prohibited.",
  createdBy: "Mr. John Doe",
  createdDate: "2024-10-20",
  lastModified: "2024-11-10",
  classes: [
    { id: 1, name: "Grade 1", students: 45, completed: 30, average: 78.5 },
    { id: 2, name: "Grade 2", students: 42, completed: 28, average: 75.2 },
    { id: 3, name: "Grade 3", students: 38, completed: 25, average: 81.3 },
    { id: 4, name: "Grade 4", students: 35, completed: 22, average: 72.8 },
    { id: 5, name: "Grade 5", students: 40, completed: 15, average: 79.1 },
    { id: 6, name: "Grade 6", students: 33, completed: 0, average: 0 }
  ],
  subjects: [
    { id: 1, name: "Mathematics", code: "MATH", color: "#10b981", completed: 85, average: 76.4 },
    { id: 2, name: "English Language", code: "ENG", color: "#3b82f6", completed: 82, average: 73.8 },
    { id: 3, name: "Science", code: "SCI", color: "#8b5cf6", completed: 78, average: 81.2 },
    { id: 4, name: "Social Studies", code: "SST", color: "#f59e0b", completed: 75, average: 69.5 },
    { id: 5, name: "Computing", code: "ICT", color: "#ef4444", completed: 70, average: 84.7 },
    { id: 6, name: "RME", code: "RME", color: "#06b6d4", completed: 68, average: 77.9 }
  ],
  timeline: [
    { date: "2024-10-20", event: "Examination created", user: "Mr. John Doe", type: "create" },
    { date: "2024-10-25", event: "Schedule updated", user: "Ms. Sarah Davis", type: "update" },
    { date: "2024-11-10", event: "Instructions modified", user: "Mr. John Doe", type: "update" },
    { date: "2024-11-15", event: "Examination started", user: "System", type: "start" },
    { date: "2024-11-16", event: "First batch completed", user: "System", type: "progress" }
  ]
};

export default function ViewExaminationPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const exam = examinationData; // In real app: fetch based on params.id

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      case "Completed": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCompletionRate = (completed, total) => {
    return total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/headmaster/academics/exams"
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold flex items-center gap-3">
                    <FileText className="w-10 h-10" />
                    {exam.name}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(exam.status)}`}>
                    {exam.status}
                  </span>
                </div>
                <p className="text-blue-100 text-lg">{exam.type} • {exam.venue}</p>
                <div className="flex items-center gap-6 mt-4 text-blue-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{exam.startDate} to {exam.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{exam.completedStudents}/{exam.totalStudents} Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    <span className="text-sm">{exam.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">{exam.progress}% Complete</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link 
                href={`/headmaster/academics/exams/edit/${exam.id}`}
                className="bg-white hover:bg-blue-50 text-blue-700 border-2 border-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                Edit Exam
              </Link>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Examination Progress</h3>
          <span className="text-2xl font-bold text-blue-600">{exam.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-300 relative"
            style={{ width: `${exam.progress}%` }}
          >
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs font-bold">
              {exam.completedStudents}/{exam.totalStudents}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>Started: {exam.startDate}</span>
          <span>Ends: {exam.endDate}</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 ${
              activeTab === "overview" 
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <div className="flex items-center justify-center gap-2">
              <Eye className="w-5 h-5" />
              <span>Overview</span>
            </div>
          </button>
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 ${
              activeTab === "participants" 
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("participants")}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              <span>Participants ({exam.totalStudents})</span>
            </div>
          </button>
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 ${
              activeTab === "progress" 
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("progress")}
          >
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5" />
              <span>Progress & Results</span>
            </div>
          </button>
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 ${
              activeTab === "timeline" 
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("timeline")}
          >
            <div className="flex items-center justify-center gap-2">
              <Activity className="w-5 h-5" />
              <span>Timeline</span>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Examination Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Examination Name</label>
                    <div className="text-lg font-semibold text-gray-900">{exam.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Type</label>
                    <div className="text-gray-900">{exam.type}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Duration</label>
                    <div className="text-gray-900">{exam.duration} minutes</div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Venue</label>
                    <div className="flex items-center gap-2 text-gray-900">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      {exam.venue}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Schedule</label>
                    <div className="text-gray-900">{exam.startDate} to {exam.endDate}</div>
                    <div className="text-sm text-gray-500">{exam.startTime} - {exam.endTime}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Marks</label>
                    <div className="text-gray-900">{exam.passMarks}/{exam.totalMarks} (Pass/Total)</div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Created By</label>
                    <div className="text-gray-900">{exam.createdBy}</div>
                    <div className="text-sm text-gray-500">{exam.createdDate}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Last Modified</label>
                    <div className="text-gray-900">{exam.lastModified}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Instructions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{exam.description}</p>
              
              <h4 className="text-lg font-bold text-gray-900 mb-4">Instructions</h4>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-gray-700">{exam.instructions}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 flex flex-col items-center gap-2">
                  <Download className="w-6 h-6" />
                  <span className="text-sm font-medium">Export Data</span>
                </button>
                <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 flex flex-col items-center gap-2">
                  <Printer className="w-6 h-6" />
                  <span className="text-sm font-medium">Print Report</span>
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 flex flex-col items-center gap-2">
                  <Share2 className="w-6 h-6" />
                  <span className="text-sm font-medium">Share Results</span>
                </button>
                <button className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-300 flex flex-col items-center gap-2">
                  <RefreshCw className="w-6 h-6" />
                  <span className="text-sm font-medium">Refresh Data</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Status Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(exam.status)}`}>
                    {exam.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Progress:</span>
                  <span className="font-bold text-blue-600">{exam.progress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-bold">{exam.completedStudents}/{exam.totalStudents}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Classes:</span>
                  <span className="font-bold">{exam.classes.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subjects:</span>
                  <span className="font-bold">{exam.subjects.length}</span>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Summary</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">78.2%</div>
                  <div className="text-sm text-green-700">Average Score</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">85.5%</div>
                  <div className="text-sm text-blue-700">Pass Rate</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-purple-700">Highest Score</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {exam.timeline.slice(0, 3).map((event, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      event.type === "create" ? "bg-green-500" :
                      event.type === "update" ? "bg-blue-500" :
                      event.type === "start" ? "bg-purple-500" :
                      "bg-orange-500"
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{event.event}</div>
                      <div className="text-xs text-gray-500">{event.date} • {event.user}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "participants" && (
        <div className="space-y-6">
          {/* Classes Overview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Classes Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exam.classes.map((classData) => (
                <div key={classData.id} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-900">{classData.name}</h4>
                    <span className="text-sm text-gray-500">{classData.students} students</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-medium">{classData.completed}/{classData.students}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-medium">{getCompletionRate(classData.completed, classData.students)}%</span>
                    </div>
                    {classData.average > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Average:</span>
                        <span className="font-medium text-blue-600">{classData.average}%</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getCompletionRate(classData.completed, classData.students)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subjects Overview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Subjects Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exam.subjects.map((subject) => (
                <div key={subject.id} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    ></div>
                    <h4 className="font-bold text-gray-900">{subject.name}</h4>
                    <span className="text-sm text-gray-500">({subject.code})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Completed:</span>
                      <div className="font-medium">{subject.completed} students</div>
                    </div>
                    {subject.average > 0 && (
                      <div>
                        <span className="text-gray-600">Average:</span>
                        <div className="font-medium" style={{ color: subject.color }}>{subject.average}%</div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(subject.completed / exam.totalStudents) * 100}%`,
                          backgroundColor: subject.color 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Analytics</h3>
            <div className="h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Performance charts and analytics will be displayed here</p>
                <p className="text-gray-400 text-sm">Real-time progress tracking and detailed statistics</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Examination Timeline</h3>
          <div className="space-y-6">
            {exam.timeline.map((event, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  event.type === "create" ? "bg-green-100 text-green-600" :
                  event.type === "update" ? "bg-blue-100 text-blue-600" :
                  event.type === "start" ? "bg-purple-100 text-purple-600" :
                  "bg-orange-100 text-orange-600"
                }`}>
                  {event.type === "create" && <Plus className="w-5 h-5" />}
                  {event.type === "update" && <Edit3 className="w-5 h-5" />}
                  {event.type === "start" && <Activity className="w-5 h-5" />}
                  {event.type === "progress" && <CheckCircle className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{event.event}</div>
                  <div className="text-sm text-gray-600">by {event.user} on {event.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
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
                Are you sure you want to delete this examination? This action cannot be undone.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-red-800 mb-2">This will permanently remove:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• All examination data and records</li>
                  <li>• Student progress and results</li>
                  <li>• Associated schedules and settings</li>
                  <li>• Performance analytics</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors">
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
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  Edit,
  Download,
  Share2,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Clock,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Activity,
  User,
  GraduationCap,
  Heart,
  Star,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  FileText,
  Users,
  ThumbsUp,
  AlertTriangle,
  Smile,
  ChevronRight,
  Eye,
  Bell,
  Settings,
  MoreVertical,
  Trash2
} from "lucide-react";

export default function ChildDetailsPage() {
  const params = useParams();
  const childId = params.id as string;
  const [activeTab, setActiveTab] = useState("overview");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample data - In real app, this would be fetched based on childId
  const childData = {
    id: parseInt(childId),
    name: childId === "1" ? "Kwame Mensah" : "Ama Mensah",
    photo: null,
    dateOfBirth: childId === "1" ? "2010-03-15" : "2012-08-22",
    age: childId === "1" ? 15 : 13,
    class: childId === "1" ? "JHS 2" : "Primary 5",
    studentId: childId === "1" ? "NX2025001" : "NX2025002",
    admissionDate: childId === "1" ? "2020-09-01" : "2019-09-01",
    
    // Contact Information
    homeAddress: "123 Independence Ave, Accra",
    emergencyContact: "+233 24 123 4567",
    parentEmail: "akosua.mensah@email.com",
    
    // Academic Performance
    currentGPA: childId === "1" ? 3.4 : 3.7,
    rank: childId === "1" ? 8 : 3,
    totalStudents: childId === "1" ? 45 : 38,
    attendance: childId === "1" ? 95 : 98,
    behavior: childId === "1" ? "Excellent" : "Very Good",
    
    // Health Information
    medicalConditions: childId === "1" ? ["None"] : ["Mild Asthma"],
    allergies: ["None"],
    bloodGroup: childId === "1" ? "O+" : "A+",
    lastMedicalCheckup: "2025-09-15",
    
    // Subjects and Grades
    subjects: childId === "1" ? [
      { name: "Mathematics", grade: "A", percentage: 85, teacher: "Mr. Osei", trend: "up", assignments: 12, completed: 11 },
      { name: "English Language", grade: "B+", percentage: 78, teacher: "Mrs. Addo", trend: "stable", assignments: 10, completed: 10 },
      { name: "Science", grade: "A-", percentage: 82, teacher: "Dr. Asante", trend: "up", assignments: 8, completed: 8 },
      { name: "Social Studies", grade: "B", percentage: 75, teacher: "Mr. Boateng", trend: "down", assignments: 9, completed: 8 },
      { name: "ICT", grade: "A", percentage: 88, teacher: "Ms. Owusu", trend: "up", assignments: 6, completed: 6 },
      { name: "French", grade: "B-", percentage: 70, teacher: "Mme. Kone", trend: "stable", assignments: 7, completed: 6 }
    ] : [
      { name: "Mathematics", grade: "A", percentage: 88, teacher: "Mrs. Asante", trend: "up", assignments: 10, completed: 10 },
      { name: "English Language", grade: "A-", percentage: 85, teacher: "Mr. Adjei", trend: "up", assignments: 9, completed: 9 },
      { name: "Science", grade: "B+", percentage: 80, teacher: "Dr. Mensah", trend: "stable", assignments: 7, completed: 7 },
      { name: "Social Studies", grade: "A", percentage: 90, teacher: "Mrs. Tetteh", trend: "up", assignments: 8, completed: 8 },
      { name: "Creative Arts", grade: "A", percentage: 92, teacher: "Ms. Nkrumah", trend: "up", assignments: 5, completed: 5 },
      { name: "Physical Education", grade: "B+", percentage: 78, teacher: "Mr. Akoto", trend: "stable", assignments: 4, completed: 4 }
    ],
    
    // Attendance Details
    attendanceRecord: [
      { date: "2025-11-05", status: "Present", timeIn: "7:45 AM", timeOut: "2:30 PM", reason: "" },
      { date: "2025-11-04", status: "Present", timeIn: "7:50 AM", timeOut: "2:30 PM", reason: "" },
      { date: "2025-11-03", status: "Present", timeIn: "7:42 AM", timeOut: "2:30 PM", reason: "" },
      { date: "2025-11-02", status: "Absent", timeIn: "-", timeOut: "-", reason: "Sick" },
      { date: "2025-11-01", status: "Present", timeIn: "8:05 AM", timeOut: "2:30 PM", reason: "" },
      { date: "2025-10-31", status: "Present", timeIn: "7:55 AM", timeOut: "2:30 PM", reason: "" },
      { date: "2025-10-30", status: "Late", timeIn: "8:15 AM", timeOut: "2:30 PM", reason: "Traffic" }
    ],
    
    // Upcoming Events
    upcomingEvents: childId === "1" ? [
      { title: "Mathematics Exam", date: "2025-11-15", time: "9:00 AM", type: "exam", location: "Room 101" },
      { title: "Science Project Due", date: "2025-11-20", time: "2:00 PM", type: "assignment", location: "Science Lab" },
      { title: "Parent-Teacher Meeting", date: "2025-11-25", time: "10:00 AM", type: "meeting", location: "Conference Room" },
      { title: "Sports Day", date: "2025-12-01", time: "8:00 AM", type: "event", location: "School Field" }
    ] : [
      { title: "English Essay Competition", date: "2025-11-12", time: "11:00 AM", type: "competition", location: "Assembly Hall" },
      { title: "Science Fair", date: "2025-11-18", time: "1:00 PM", type: "event", location: "School Grounds" },
      { title: "Creative Arts Exhibition", date: "2025-11-22", time: "3:00 PM", type: "exhibition", location: "Art Room" },
      { title: "Term Break Begins", date: "2025-12-15", time: "All Day", type: "holiday", location: "N/A" }
    ],
    
    // Recent Activities
    recentActivities: [
      { 
        type: "grade", 
        title: "New Test Result",
        description: `Scored ${childId === "1" ? "85" : "88"}% in Mathematics test`, 
        date: "2025-11-03",
        details: "Excellent performance in algebra section"
      },
      { 
        type: "attendance", 
        title: "Perfect Week",
        description: "Perfect attendance this week", 
        date: "2025-11-01",
        details: "On time every day"
      },
      { 
        type: "achievement", 
        title: "Academic Award",
        description: childId === "1" ? "Won Science Quiz competition" : "Selected for Creative Arts Exhibition", 
        date: "2025-10-28",
        details: "Outstanding performance recognized by teachers"
      },
      {
        type: "behavior",
        title: "Positive Behavior",
        description: "Helped a classmate with assignments",
        date: "2025-10-25",
        details: "Shows excellent leadership and cooperation"
      }
    ],
    
    // Strengths and Areas for Improvement
    strengths: childId === "1" ? 
      ["Mathematics", "Science", "Problem Solving", "Leadership", "Analytical Thinking"] :
      ["Creative Arts", "Social Studies", "Communication", "Creativity", "Teamwork"],
    improvements: childId === "1" ? 
      ["Language Arts", "Time Management", "Group Work", "French Language"] :
      ["Science Practicals", "Sports Activities", "Mathematics Speed", "Reading Comprehension"],
    
    // Teacher Comments
    teacherComments: [
      { 
        teacher: childId === "1" ? "Mr. Osei" : "Mrs. Asante", 
        subject: "Mathematics", 
        comment: childId === "1" ? "Shows excellent analytical skills and problem-solving abilities" : "Very dedicated and hardworking student", 
        date: "2025-10-30",
        rating: 5
      },
      { 
        teacher: childId === "1" ? "Mrs. Addo" : "Mr. Adjei", 
        subject: "English", 
        comment: childId === "1" ? "Needs to improve writing skills and vocabulary" : "Excellent communication skills and participation", 
        date: "2025-10-28",
        rating: childId === "1" ? 3 : 5
      },
      { 
        teacher: childId === "1" ? "Dr. Asante" : "Ms. Nkrumah", 
        subject: childId === "1" ? "Science" : "Creative Arts", 
        comment: childId === "1" ? "Outstanding in practical experiments" : "Exceptional artistic talent and creativity", 
        date: "2025-10-27",
        rating: 5
      }
    ],

    // Behavior Assessment Details
    behaviorMetrics: {
      discipline: 95,
      cooperation: childId === "1" ? 88 : 92,
      participation: 92,
      respect: 90,
      leadership: childId === "1" ? 85 : 78,
      punctuality: childId === "1" ? 90 : 95
    },

    // Extracurricular Activities
    extracurriculars: childId === "1" ? [
      { name: "Science Club", role: "Member", status: "Active", joinDate: "2024-09-01" },
      { name: "Math Olympiad Team", role: "Participant", status: "Active", joinDate: "2024-10-15" },
      { name: "Debate Society", role: "Secretary", status: "Active", joinDate: "2024-09-01" }
    ] : [
      { name: "Art Club", role: "Vice President", status: "Active", joinDate: "2023-09-01" },
      { name: "School Choir", role: "Member", status: "Active", joinDate: "2024-01-15" },
      { name: "Drama Club", role: "Lead Actor", status: "Active", joinDate: "2024-09-01" }
    ],

    // Financial Information
    fees: {
      tuitionFee: 2000,
      uniformFee: 300,
      booksFee: 250,
      transportFee: 400,
      totalPaid: 2450,
      totalDue: 500,
      nextPaymentDue: "2025-12-01"
    }
  };

  // Delete confirmation modal
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove {childData.name} from your children list? This action cannot be undone.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle deletion logic here
              setShowDeleteModal(false);
              // Redirect to children list
            }}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center mb-4 lg:mb-0">
            <Link 
              href="/parent/children"
              className="mr-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xl lg:text-2xl font-bold text-white">
                  {childData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold">{childData.name}</h1>
                <p className="text-indigo-100 text-sm lg:text-base xl:text-lg">
                  {childData.class} • ID: {childData.studentId} • Age: {childData.age}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-white/20 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Download className="w-4 h-4 lg:w-5 lg:h-5" />
              Download Report
            </button>
            <Link
              href={`/parent/children/${childId}/edit`}
              className="bg-white text-indigo-600 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base"
            >
              <Edit className="w-4 h-4 lg:w-5 lg:h-5" />
              Edit Profile
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base"
            >
              <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current GPA</p>
              <p className="text-2xl font-bold text-blue-600">{childData.currentGPA}</p>
              <p className="text-xs text-gray-500">Rank #{childData.rank} of {childData.totalStudents}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-green-600">{childData.attendance}%</p>
              <p className="text-xs text-gray-500">This term</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Behavior</p>
              <p className="text-lg font-bold text-purple-600">{childData.behavior}</p>
              <div className="flex items-center mt-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className={`w-3 h-3 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Activities</p>
              <p className="text-2xl font-bold text-orange-600">{childData.extracurriculars.length}</p>
              <p className="text-xs text-gray-500">Active clubs</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 lg:px-8 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: User },
              { id: "academics", label: "Academics", icon: BookOpen },
              { id: "attendance", label: "Attendance", icon: Clock },
              { id: "behavior", label: "Behavior", icon: Heart },
              { id: "activities", label: "Activities", icon: Activity },
              { id: "health", label: "Health", icon: Heart },
              { id: "finance", label: "Finance", icon: Target }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 font-medium text-sm lg:text-base transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <tab.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 lg:p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Full Name:</span>
                      <span className="font-medium">{childData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student ID:</span>
                      <span className="font-medium">{childData.studentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date of Birth:</span>
                      <span className="font-medium">{new Date(childData.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">{childData.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class:</span>
                      <span className="font-medium">{childData.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Admission Date:</span>
                      <span className="font-medium">{new Date(childData.admissionDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Academic Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current GPA:</span>
                      <span className="font-bold text-blue-600">{childData.currentGPA}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class Rank:</span>
                      <span className="font-medium">#{childData.rank} of {childData.totalStudents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Attendance Rate:</span>
                      <span className="font-medium text-green-600">{childData.attendance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Behavior Rating:</span>
                      <span className="font-medium text-purple-600">{childData.behavior}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Subjects:</span>
                      <span className="font-medium">{childData.subjects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Extracurriculars:</span>
                      <span className="font-medium">{childData.extracurriculars.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strengths and Improvements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5" />
                    Strengths & Talents
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {childData.strengths.map((strength, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Areas for Growth
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {childData.improvements.map((improvement, index) => (
                      <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        {improvement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-6 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">{childData.parentEmail}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">{childData.emergencyContact}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Home: {childData.homeAddress}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "academics" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Academic Performance</h3>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    Current Term
                  </button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    Previous Term
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {childData.subjects.map((subject, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                      <div className="flex items-center space-x-2">
                        {subject.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {subject.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                        <span className="text-xl font-bold text-gray-900">{subject.grade}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Percentage:</span>
                        <span className="font-medium">{subject.percentage}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Teacher:</span>
                        <span className="font-medium">{subject.teacher}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Assignments:</span>
                        <span className="font-medium">{subject.completed}/{subject.assignments}</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                        <div 
                          className={`h-3 rounded-full ${
                            subject.percentage >= 85 ? 'bg-green-500' :
                            subject.percentage >= 75 ? 'bg-blue-500' :
                            subject.percentage >= 65 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${subject.percentage}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-2">
                        {subject.percentage >= 85 ? 'Excellent' :
                         subject.percentage >= 75 ? 'Good' :
                         subject.percentage >= 65 ? 'Average' : 'Needs Improvement'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Teacher Comments */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Recent Teacher Comments</h4>
                <div className="space-y-4">
                  {childData.teacherComments.map((comment, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium text-gray-900">{comment.teacher}</span>
                          <span className="text-gray-500 ml-2">• {comment.subject}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map((star) => (
                            <Star key={star} className={`w-4 h-4 ${star <= comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{comment.comment}</p>
                      <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-8">
              {/* Attendance Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{childData.attendance}%</div>
                  <div className="text-green-700 font-medium">Overall Rate</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {childData.attendanceRecord.filter(r => r.status === 'Present').length}
                  </div>
                  <div className="text-blue-700 font-medium">Days Present</div>
                </div>
                <div className="bg-red-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {childData.attendanceRecord.filter(r => r.status === 'Absent').length}
                  </div>
                  <div className="text-red-700 font-medium">Days Absent</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {childData.attendanceRecord.filter(r => r.status === 'Late').length}
                  </div>
                  <div className="text-yellow-700 font-medium">Times Late</div>
                </div>
              </div>

              {/* Attendance Records */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900">Recent Attendance Records</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Out</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {childData.attendanceRecord.map((record, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(record.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              record.status === 'Present' ? 'bg-green-100 text-green-800' :
                              record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.timeIn}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.timeOut}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.reason || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "behavior" && (
            <div className="space-y-8">
              {/* Behavior Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(childData.behaviorMetrics).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900 capitalize">{key}</h4>
                      <span className="text-2xl font-bold text-purple-600">{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          value >= 90 ? 'bg-green-500' :
                          value >= 80 ? 'bg-blue-500' :
                          value >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {value >= 90 ? 'Excellent' :
                       value >= 80 ? 'Good' :
                       value >= 70 ? 'Average' : 'Needs Improvement'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Overall Behavior Assessment */}
              <div className="bg-purple-50 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">Overall Behavior Rating</h3>
                <div className="text-5xl font-bold text-purple-600 mb-4">{childData.behavior}</div>
                <div className="flex justify-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className={`w-8 h-8 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-purple-700 max-w-2xl mx-auto">
                  {childData.name} demonstrates {childData.behavior.toLowerCase()} behavior in class and shows respect for teachers and fellow students.
                </p>
              </div>
            </div>
          )}

          {activeTab === "activities" && (
            <div className="space-y-8">
              {/* Recent Activities */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities & Achievements</h3>
                <div className="space-y-4">
                  {childData.recentActivities.map((activity, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${
                          activity.type === 'grade' ? 'bg-blue-100' :
                          activity.type === 'attendance' ? 'bg-green-100' :
                          activity.type === 'achievement' ? 'bg-yellow-100' :
                          activity.type === 'behavior' ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          {activity.type === 'grade' && <BookOpen className="w-6 h-6 text-blue-600" />}
                          {activity.type === 'attendance' && <CheckCircle className="w-6 h-6 text-green-600" />}
                          {activity.type === 'achievement' && <Award className="w-6 h-6 text-yellow-600" />}
                          {activity.type === 'behavior' && <Heart className="w-6 h-6 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{activity.title}</h4>
                          <p className="text-gray-700 mb-2">{activity.description}</p>
                          <p className="text-sm text-gray-600 mb-2">{activity.details}</p>
                          <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extracurricular Activities */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Extracurricular Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {childData.extracurriculars.map((activity, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">{activity.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Role:</span>
                          <span className="font-medium">{activity.role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Joined:</span>
                          <span className="font-medium">{new Date(activity.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "health" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Medical Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Blood Group:</span>
                      <span className="font-medium">{childData.bloodGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Checkup:</span>
                      <span className="font-medium">{new Date(childData.lastMedicalCheckup).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Medical Conditions:</span>
                      <div className="mt-2">
                        {childData.medicalConditions.map((condition, index) => (
                          <span key={index} className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Allergies:</span>
                      <div className="mt-2">
                        {childData.allergies.map((allergy, index) => (
                          <span key={index} className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Health & Wellness
                  </h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">Healthy</div>
                      <p className="text-blue-700">Overall health status</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-lg font-semibold text-green-600">Good</div>
                        <div className="text-xs text-gray-600">Physical</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-lg font-semibold text-green-600">Good</div>
                        <div className="text-xs text-gray-600">Mental</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "finance" && (
            <div className="space-y-8">
              {/* Fee Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">GH₵ {childData.fees.tuitionFee}</div>
                  <div className="text-blue-700 font-medium">Tuition Fee</div>
                </div>
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">GH₵ {childData.fees.totalPaid}</div>
                  <div className="text-green-700 font-medium">Total Paid</div>
                </div>
                <div className="bg-red-50 rounded-lg p-6 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">GH₵ {childData.fees.totalDue}</div>
                  <div className="text-red-700 font-medium">Outstanding</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-6 text-center">
                  <div className="text-lg font-bold text-yellow-600 mb-2">{new Date(childData.fees.nextPaymentDue).toLocaleDateString()}</div>
                  <div className="text-yellow-700 font-medium">Next Due Date</div>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Fee Breakdown</h4>
                <div className="space-y-4">
                  {[
                    { name: "Tuition Fee", amount: childData.fees.tuitionFee, status: "Paid" },
                    { name: "Uniform Fee", amount: childData.fees.uniformFee, status: "Paid" },
                    { name: "Books Fee", amount: childData.fees.booksFee, status: "Pending" },
                    { name: "Transport Fee", amount: childData.fees.transportFee, status: "Pending" }
                  ].map((fee, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">{fee.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-gray-900">GH₵ {fee.amount}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          fee.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {fee.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {childData.upcomingEvents.map((event, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{event.title}</h4>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  event.type === 'exam' ? 'bg-red-100 text-red-800' :
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                  event.type === 'event' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {event.type}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                <p>🕐 {event.time}</p>
                <p>📍 {event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
}
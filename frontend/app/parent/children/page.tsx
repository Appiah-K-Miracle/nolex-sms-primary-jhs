"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Award, 
  AlertTriangle, 
  CheckCircle, 
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Filter,
  Search,
  Calendar,
  GraduationCap,
  Target,
  Activity,
  BarChart3,
  PieChart,
  ChevronRight,
  Download,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  User,
  Heart,
  ThumbsUp,
  Smile,
  LayoutDashboard
} from "lucide-react";

export default function ChildrenPage() {
  const [selectedChild, setSelectedChild] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for children with comprehensive details
  const children = [
    {
      id: 1,
      name: "Kwame Mensah",
      photo: null,
      dateOfBirth: "2010-03-15",
      age: 15,
      class: "JHS 2",
      studentId: "NX2025001",
      admissionDate: "2020-09-01",
      
      // Academic Performance
      currentGPA: 3.4,
      rank: 8,
      totalStudents: 45,
      attendance: 95,
      behavior: "Excellent",
      
      // Subjects and Grades
      subjects: [
        { name: "Mathematics", grade: "A", percentage: 85, teacher: "Mr. Osei", trend: "up" },
        { name: "English Language", grade: "B+", percentage: 78, teacher: "Mrs. Addo", trend: "stable" },
        { name: "Science", grade: "A-", percentage: 82, teacher: "Dr. Asante", trend: "up" },
        { name: "Social Studies", grade: "B", percentage: 75, teacher: "Mr. Boateng", trend: "down" },
        { name: "ICT", grade: "A", percentage: 88, teacher: "Ms. Owusu", trend: "up" },
        { name: "French", grade: "B-", percentage: 70, teacher: "Mme. Kone", trend: "stable" }
      ],
      
      // Upcoming Events
      upcomingEvents: [
        { title: "Mathematics Exam", date: "2025-11-15", type: "exam" },
        { title: "Science Project Due", date: "2025-11-20", type: "assignment" },
        { title: "Parent-Teacher Meeting", date: "2025-11-25", type: "meeting" }
      ],
      
      // Recent Activities
      recentActivities: [
        { type: "grade", description: "Scored 85% in Mathematics test", date: "2025-11-03" },
        { type: "attendance", description: "Perfect attendance this week", date: "2025-11-01" },
        { type: "achievement", description: "Won Science Quiz competition", date: "2025-10-28" }
      ],
      
      // Strengths and Areas for Improvement
      strengths: ["Mathematics", "Science", "Problem Solving", "Leadership"],
      improvements: ["Language Arts", "Time Management", "Group Work"],
      
      // Teacher Comments
      teacherComments: [
        { teacher: "Mr. Osei", subject: "Mathematics", comment: "Shows excellent analytical skills", date: "2025-10-30" },
        { teacher: "Mrs. Addo", subject: "English", comment: "Needs to improve writing skills", date: "2025-10-28" }
      ]
    },
    {
      id: 2,
      name: "Ama Mensah",
      photo: null,
      dateOfBirth: "2012-08-22",
      age: 13,
      class: "Primary 5",
      studentId: "NX2025002",
      admissionDate: "2019-09-01",
      
      // Academic Performance
      currentGPA: 3.7,
      rank: 3,
      totalStudents: 38,
      attendance: 98,
      behavior: "Very Good",
      
      // Subjects and Grades
      subjects: [
        { name: "Mathematics", grade: "A", percentage: 88, teacher: "Mrs. Asante", trend: "up" },
        { name: "English Language", grade: "A-", percentage: 85, teacher: "Mr. Adjei", trend: "up" },
        { name: "Science", grade: "B+", percentage: 80, teacher: "Dr. Mensah", trend: "stable" },
        { name: "Social Studies", grade: "A", percentage: 90, teacher: "Mrs. Tetteh", trend: "up" },
        { name: "Creative Arts", grade: "A", percentage: 92, teacher: "Ms. Nkrumah", trend: "up" },
        { name: "Physical Education", grade: "B+", percentage: 78, teacher: "Mr. Akoto", trend: "stable" }
      ],
      
      // Upcoming Events
      upcomingEvents: [
        { title: "English Essay Competition", date: "2025-11-12", type: "competition" },
        { title: "Science Fair", date: "2025-11-18", type: "event" },
        { title: "Creative Arts Exhibition", date: "2025-11-22", type: "exhibition" }
      ],
      
      // Recent Activities
      recentActivities: [
        { type: "achievement", description: "Selected for Creative Arts Exhibition", date: "2025-11-02" },
        { type: "grade", description: "Scored 90% in Social Studies test", date: "2025-10-30" },
        { type: "participation", description: "Participated in school debate", date: "2025-10-25" }
      ],
      
      // Strengths and Areas for Improvement
      strengths: ["Creative Arts", "Social Studies", "Communication", "Creativity"],
      improvements: ["Science Practicals", "Sports Activities", "Mathematics Speed"],
      
      // Teacher Comments
      teacherComments: [
        { teacher: "Mrs. Asante", subject: "Mathematics", comment: "Very dedicated and hardworking", date: "2025-10-29" },
        { teacher: "Ms. Nkrumah", subject: "Creative Arts", comment: "Exceptional artistic talent", date: "2025-10-27" }
      ]
    }
  ];

  const selectedChildData = selectedChild ? children.find(child => child.id === selectedChild) : null;

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">My Children</h1>
            <p className="text-purple-100 text-sm lg:text-base xl:text-lg">
              Monitor your children's academic progress and school activities
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <button className="bg-white text-purple-600 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Download className="w-4 h-4 lg:w-5 lg:h-5" />
              Download Reports
            </button>
            <Link
              href="/parent/communication/messages"
              className="bg-purple-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-purple-400 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base"
            >
              <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5" />
              Contact Teachers
            </Link>
          </div>
        </div>
      </div>

      {/* Children Selection Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {children.map((child) => (
          <div 
            key={child.id} 
            className={`bg-white rounded-lg lg:rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border-2 ${
              selectedChild === child.id ? 'border-blue-500 shadow-lg' : 'border-transparent'
            }`}
            onClick={() => setSelectedChild(selectedChild === child.id ? null : child.id)}
          >
            <div className="p-6 lg:p-8">
              {/* Child Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-lg lg:text-xl font-semibold text-white">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900">{child.name}</h3>
                    <p className="text-sm lg:text-base text-gray-600">{child.class} • ID: {child.studentId}</p>
                    <p className="text-xs lg:text-sm text-gray-500">Age: {child.age} years</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Rank</p>
                  <p className="text-xl lg:text-2xl font-bold text-purple-600">
                    #{child.rank}
                  </p>
                  <p className="text-xs text-gray-500">of {child.totalStudents}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6">
                <div className="text-center p-3 lg:p-4 bg-blue-50 rounded-lg">
                  <p className="text-lg lg:text-xl font-bold text-blue-600">{child.currentGPA}</p>
                  <p className="text-xs lg:text-sm text-gray-600">GPA</p>
                </div>
                <div className="text-center p-3 lg:p-4 bg-green-50 rounded-lg">
                  <p className="text-lg lg:text-xl font-bold text-green-600">{child.attendance}%</p>
                  <p className="text-xs lg:text-sm text-gray-600">Attendance</p>
                </div>
                <div className="text-center p-3 lg:p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Smile className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
                  </div>
                  <p className="text-xs lg:text-sm text-purple-600 font-semibold">{child.behavior}</p>
                </div>
              </div>

              {/* Top Subjects */}
              <div className="mb-6">
                <h4 className="text-sm lg:text-base font-semibold text-gray-900 mb-3">Top Performing Subjects</h4>
                <div className="space-y-2">
                  {child.subjects
                    .sort((a, b) => b.percentage - a.percentage)
                    .slice(0, 3)
                    .map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-2 lg:p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          subject.trend === 'up' ? 'bg-green-500' : 
                          subject.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'
                        }`}></div>
                        <span className="text-sm lg:text-base text-gray-700">{subject.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm lg:text-base font-semibold text-gray-900">{subject.grade}</span>
                        <span className="text-xs lg:text-sm text-gray-500">({subject.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Event */}
              <div className="p-3 lg:p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
                  <span className="text-sm lg:text-base font-semibold text-orange-800">Next Event</span>
                </div>
                <p className="text-sm lg:text-base text-orange-700">
                  {child.upcomingEvents[0]?.title} - {new Date(child.upcomingEvents[0]?.date).toLocaleDateString()}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-gray-500">Click to view details</span>
                <ChevronRight className={`w-5 h-5 transition-transform ${
                  selectedChild === child.id ? 'rotate-90' : ''
                } text-gray-400`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View */}
      {selectedChildData && (
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 lg:px-8">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "academics", label: "Academics", icon: BookOpen },
                { id: "attendance", label: "Attendance", icon: Clock },
                { id: "behavior", label: "Behavior", icon: Heart },
                { id: "activities", label: "Activities", icon: Activity }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 border-b-2 font-medium text-sm lg:text-base transition-colors ${
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
              <div className="space-y-6 lg:space-y-8">
                {/* Student Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Student Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Full Name:</span>
                        <span className="font-medium">{selectedChildData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Student ID:</span>
                        <span className="font-medium">{selectedChildData.studentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Class:</span>
                        <span className="font-medium">{selectedChildData.class}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium">{selectedChildData.age} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Admission Date:</span>
                        <span className="font-medium">{new Date(selectedChildData.admissionDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Academic Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current GPA:</span>
                        <span className="font-bold text-blue-600">{selectedChildData.currentGPA}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Class Rank:</span>
                        <span className="font-medium">#{selectedChildData.rank} of {selectedChildData.totalStudents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Attendance:</span>
                        <span className="font-medium text-green-600">{selectedChildData.attendance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Behavior:</span>
                        <span className="font-medium text-purple-600">{selectedChildData.behavior}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strengths and Improvements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5" />
                      Strengths
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedChildData.strengths.map((strength, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Areas for Improvement
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedChildData.improvements.map((improvement, index) => (
                        <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                          {improvement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "academics" && (
              <div className="space-y-6 lg:space-y-8">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Subject Performance</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  {selectedChildData.subjects.map((subject, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 lg:p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                        <div className="flex items-center space-x-2">
                          {subject.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                          {subject.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                          <span className="text-lg font-bold text-gray-900">{subject.grade}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Percentage:</span>
                          <span className="font-medium">{subject.percentage}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Teacher:</span>
                          <span className="font-medium">{subject.teacher}</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                          <div 
                            className={`h-2 rounded-full ${
                              subject.percentage >= 80 ? 'bg-green-500' :
                              subject.percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${subject.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="space-y-6">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Attendance Overview</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{selectedChildData.attendance}%</div>
                    <div className="text-green-700 font-medium">Overall Attendance</div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">28</div>
                    <div className="text-blue-700 font-medium">Days Present</div>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">2</div>
                    <div className="text-red-700 font-medium">Days Absent</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Recent Attendance</h4>
                  <div className="space-y-2">
                    {[
                      { date: "2025-11-05", status: "Present", time: "7:45 AM" },
                      { date: "2025-11-04", status: "Present", time: "7:50 AM" },
                      { date: "2025-11-03", status: "Present", time: "7:42 AM" },
                      { date: "2025-11-02", status: "Absent", time: "-" },
                      { date: "2025-11-01", status: "Present", time: "8:05 AM" }
                    ].map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-gray-700">{new Date(record.date).toLocaleDateString()}</span>
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-600">{record.time}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {record.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "behavior" && (
              <div className="space-y-6">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Behavior Assessment</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-semibold text-purple-800 mb-4">Overall Behavior</h4>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-2">{selectedChildData.behavior}</div>
                      <div className="flex justify-center mb-4">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className={`w-6 h-6 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { category: "Discipline", score: 95, color: "green" },
                      { category: "Cooperation", score: 88, color: "blue" },
                      { category: "Participation", score: 92, color: "purple" },
                      { category: "Respect", score: 90, color: "indigo" }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{item.category}</span>
                          <span className="font-bold text-gray-900">{item.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-${item.color}-500`}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activities" && (
              <div className="space-y-6">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Recent Activities</h3>
                
                <div className="space-y-4">
                  {selectedChildData.recentActivities.map((activity, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 lg:p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'grade' ? 'bg-blue-100' :
                          activity.type === 'attendance' ? 'bg-green-100' :
                          activity.type === 'achievement' ? 'bg-yellow-100' : 'bg-purple-100'
                        }`}>
                          {activity.type === 'grade' && <BookOpen className="w-5 h-5 text-blue-600" />}
                          {activity.type === 'attendance' && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {activity.type === 'achievement' && <Award className="w-5 h-5 text-yellow-600" />}
                          {activity.type === 'participation' && <Users className="w-5 h-5 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.description}</p>
                          <p className="text-sm text-gray-600 mt-1">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
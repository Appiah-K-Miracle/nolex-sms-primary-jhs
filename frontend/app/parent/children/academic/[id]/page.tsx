"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  BarChart3,
  Calendar,
  Download,
  Edit,
  Trash2,
  ChevronRight,
  Star,
  Clock,
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  GraduationCap,
  Activity,
  Eye,
  Plus,
  Filter,
  Search,
  MoreVertical,
  LineChart,
  PieChart
} from "lucide-react";

export default function ChildAcademicDetailsPage() {
  const params = useParams();
  const childId = params.id as string;
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("current-term");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | null>(null);

  // Sample data - In real app, this would be fetched based on childId
  const childData = {
    id: parseInt(childId),
    name: childId === "1" ? "Kwame Mensah" : "Ama Mensah",
    class: childId === "1" ? "JHS 2" : "Primary 5",
    photo: null,
    overallGPA: childId === "1" ? 3.4 : 3.7,
    rank: childId === "1" ? 8 : 3,
    totalStudents: childId === "1" ? 45 : 38,
    termGPA: childId === "1" ? 3.6 : 3.8,
    previousTermGPA: childId === "1" ? 3.2 : 3.6,
    trend: "up",
    
    // Academic History
    academicHistory: [
      { term: "Term 1 2024/2025", gpa: childId === "1" ? 3.2 : 3.5, rank: childId === "1" ? 12 : 5 },
      { term: "Term 2 2024/2025", gpa: childId === "1" ? 3.4 : 3.6, rank: childId === "1" ? 10 : 4 },  
      { term: "Term 3 2024/2025", gpa: childId === "1" ? 3.6 : 3.8, rank: childId === "1" ? 8 : 3 }
    ],
    
    subjects: childId === "1" ? [
      { 
        id: 1,
        name: "Mathematics", 
        currentGrade: "A", 
        percentage: 85, 
        teacher: "Mr. Osei",
        trend: "up",
        lastUpdated: "2025-11-10",
        creditHours: 4,
        description: "Advanced algebra, geometry, and basic calculus concepts",
        learningObjectives: [
          "Solve complex algebraic equations",
          "Understand geometric principles", 
          "Apply mathematical reasoning to real-world problems"
        ],
        assignments: [
          { id: 1, title: "Algebra Test", score: 88, maxScore: 100, date: "2025-11-05", type: "test", weight: 20 },
          { id: 2, title: "Geometry Assignment", score: 92, maxScore: 100, date: "2025-11-01", type: "assignment", weight: 15 },
          { id: 3, title: "Mid-term Exam", score: 82, maxScore: 100, date: "2025-10-28", type: "exam", weight: 30 },
          { id: 4, title: "Problem Solving Quiz", score: 90, maxScore: 100, date: "2025-10-25", type: "quiz", weight: 10 },
          { id: 5, title: "Class Participation", score: 95, maxScore: 100, date: "2025-10-20", type: "participation", weight: 10 }
        ],
        attendance: 96,
        behaviorGrade: "Excellent",
        teacherComments: [
          { date: "2025-11-10", comment: "Shows excellent analytical skills and problem-solving abilities. Consistently participates in class discussions.", teacher: "Mr. Osei" },
          { date: "2025-10-28", comment: "Great improvement in geometry concepts. Keep up the good work!", teacher: "Mr. Osei" }
        ],
        upcomingAssessments: [
          { title: "Final Exam", date: "2025-11-20", type: "exam", weight: 40 },
          { title: "Project Presentation", date: "2025-11-25", type: "project", weight: 20 }
        ]
      }
    ] : [
      { 
        id: 5,
        name: "Mathematics", 
        currentGrade: "A", 
        percentage: 88, 
        teacher: "Mrs. Asante",
        trend: "up",
        lastUpdated: "2025-11-11",
        creditHours: 4,
        description: "Basic arithmetic, word problems, and mathematical reasoning",
        learningObjectives: [
          "Master basic arithmetic operations",
          "Solve word problems effectively",
          "Develop logical thinking skills"
        ],
        assignments: [
          { id: 6, title: "Arithmetic Test", score: 95, maxScore: 100, date: "2025-11-06", type: "test", weight: 25 },
          { id: 7, title: "Word Problems", score: 85, maxScore: 100, date: "2025-11-02", type: "assignment", weight: 20 },
          { id: 8, title: "Monthly Assessment", score: 90, maxScore: 100, date: "2025-10-30", type: "exam", weight: 30 },
          { id: 9, title: "Mental Math Quiz", score: 92, maxScore: 100, date: "2025-10-27", type: "quiz", weight: 15 }
        ],
        attendance: 100,
        behaviorGrade: "Excellent",
        teacherComments: [
          { date: "2025-11-11", comment: "Very dedicated and hardworking student. Shows great enthusiasm for learning.", teacher: "Mrs. Asante" },
          { date: "2025-10-30", comment: "Excellent performance in problem-solving activities.", teacher: "Mrs. Asante" }
        ],
        upcomingAssessments: [
          { title: "Problem Solving Test", date: "2025-11-21", type: "test", weight: 25 },
          { title: "End of Term Exam", date: "2025-12-05", type: "exam", weight: 35 }
        ]
      }
    ],
    
    // Academic Goals
    academicGoals: [
      { goal: "Improve Mathematics grade to A+", targetDate: "2025-12-15", status: "in-progress", progress: 75 },
      { goal: "Maintain perfect attendance", targetDate: "2025-12-15", status: "on-track", progress: 95 },
      { goal: "Complete all assignments on time", targetDate: "2025-12-15", status: "achieved", progress: 100 }
    ],
    
    // Study Schedule
    studySchedule: [
      { day: "Monday", subject: "Mathematics", time: "4:00 PM - 5:00 PM", type: "homework" },
      { day: "Tuesday", subject: "English", time: "4:00 PM - 5:00 PM", type: "reading" },
      { day: "Wednesday", subject: "Science", time: "4:00 PM - 5:00 PM", type: "lab-review" },
      { day: "Thursday", subject: "Mathematics", time: "4:00 PM - 5:00 PM", type: "practice" },
      { day: "Friday", subject: "Review", time: "4:00 PM - 6:00 PM", type: "general-review" }
    ],
    
    // Performance Insights
    performanceInsights: {
      strengths: ["Problem solving", "Logical reasoning", "Class participation"],
      weaknesses: ["Time management", "Written expression", "Test anxiety"],
      recommendations: [
        "Practice more timed exercises to improve speed",
        "Work on writing skills through regular practice",
        "Use relaxation techniques before tests"
      ]
    }
  };

  // Get the first subject for detailed view (in real app, would handle multiple subjects)
  const subject = childData.subjects[0];

  // Calculate weighted average
  const calculateWeightedAverage = (assignments: any[]) => {
    const totalWeight = assignments.reduce((sum, assignment) => sum + assignment.weight, 0);
    const weightedSum = assignments.reduce((sum, assignment) => 
      sum + (assignment.score / assignment.maxScore * 100) * assignment.weight, 0
    );
    return totalWeight > 0 ? (weightedSum / totalWeight).toFixed(1) : "0.0";
  };

  // Delete confirmation modal
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">Remove Assignment</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove this assignment from the academic record? This action cannot be undone.
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
              setSelectedAssignmentId(null);
            }}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/parent/children/academic"
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
                <p className="text-blue-100 text-sm lg:text-base xl:text-lg">
                  {childData.class} • Academic Performance Details
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-white/20 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Download className="w-4 h-4 lg:w-5 lg:h-5" />
              Export Report
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
              <p className="text-2xl font-bold text-blue-600">{childData.termGPA}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">+{(childData.termGPA - childData.previousTermGPA).toFixed(1)}</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Class Rank</p>
              <p className="text-2xl font-bold text-green-600">#{childData.rank}</p>
              <p className="text-xs text-gray-500">of {childData.totalStudents}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-purple-600">{subject.attendance}%</p>
              <p className="text-xs text-purple-500">This term</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Assignments</p>
              <p className="text-2xl font-bold text-orange-600">{subject.assignments.length}</p>
              <p className="text-xs text-orange-500">Completed</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 lg:px-8 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: GraduationCap },
              { id: "subjects", label: "Subject Details", icon: BookOpen },
              { id: "assignments", label: "Assignments", icon: FileText },
              { id: "progress", label: "Progress Tracking", icon: LineChart },
              { id: "goals", label: "Academic Goals", icon: Target },
              { id: "schedule", label: "Study Schedule", icon: Calendar }
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
              {/* Academic Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Performance Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overall GPA:</span>
                      <span className="font-bold text-blue-600">{childData.overallGPA}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Term GPA:</span>
                      <span className="font-bold text-green-600">{childData.termGPA}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class Rank:</span>
                      <span className="font-medium">#{childData.rank} of {childData.totalStudents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trend:</span>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600 font-medium">Improving</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-green-800 mb-2">Top Strengths:</p>
                      <div className="flex flex-wrap gap-2">
                        {childData.performanceInsights.strengths.map((strength, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-800 mb-2">Areas for Growth:</p>
                      <div className="flex flex-wrap gap-2">
                        {childData.performanceInsights.weaknesses.map((weakness, index) => (
                          <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                            {weakness}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic History Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Academic History</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {childData.academicHistory.map((term, index) => (
                    <div key={index} className={`text-center p-4 rounded-lg border-2 ${
                      index === childData.academicHistory.length - 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}>
                      <p className="text-lg font-bold text-gray-900">{term.gpa}</p>
                      <p className="text-sm text-gray-600">{term.term}</p>
                      <p className="text-xs text-gray-500">Rank #{term.rank}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Teacher Recommendations
                </h3>
                <div className="space-y-3">
                  {childData.performanceInsights.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-yellow-800">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "subjects" && (
            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{subject.name}</h3>
                      <p className="text-gray-600">Teacher: {subject.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{subject.currentGrade}</p>
                    <p className="text-sm text-gray-500">{subject.percentage}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Course Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Credit Hours:</span>
                        <span className="font-medium">{subject.creditHours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Attendance Rate:</span>
                        <span className="font-medium text-green-600">{subject.attendance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Behavior Grade:</span>
                        <span className="font-medium text-purple-600">{subject.behaviorGrade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium">{new Date(subject.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Learning Objectives</h4>
                    <div className="space-y-2">
                      {subject.learningObjectives.map((objective, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Course Description</h4>
                  <p className="text-gray-700">{subject.description}</p>
                </div>

                {/* Teacher Comments */}
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Recent Teacher Comments</h4>
                  <div className="space-y-4">
                    {subject.teacherComments.map((comment, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                        <p className="text-gray-700 mb-2">{comment.comment}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{comment.teacher}</span>
                          <span>•</span>
                          <span>{new Date(comment.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Assignments & Assessments</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Weighted Average: <span className="font-bold text-blue-600">{calculateWeightedAverage(subject.assignments)}%</span>
                  </span>
                  <Link
                    href={`/parent/children/academic/${childId}/${subject.id}/edit`}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Grades
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {subject.assignments.map((assignment) => (
                        <tr key={assignment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{assignment.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              assignment.type === 'exam' ? 'bg-red-100 text-red-800' :
                              assignment.type === 'test' ? 'bg-blue-100 text-blue-800' :
                              assignment.type === 'assignment' ? 'bg-green-100 text-green-800' :
                              assignment.type === 'quiz' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {assignment.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {assignment.score}/{assignment.maxScore}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`font-medium ${
                              (assignment.score / assignment.maxScore * 100) >= 80 ? 'text-green-600' :
                              (assignment.score / assignment.maxScore * 100) >= 70 ? 'text-blue-600' :
                              (assignment.score / assignment.maxScore * 100) >= 60 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {Math.round((assignment.score / assignment.maxScore) * 100)}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {assignment.weight}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(assignment.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedAssignmentId(assignment.id);
                                  setShowDeleteModal(true);
                                }}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
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

              {/* Upcoming Assessments */}
              <div className="bg-orange-50 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Assessments
                </h4>
                <div className="space-y-3">
                  {subject.upcomingAssessments.map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{assessment.title}</p>
                        <p className="text-sm text-gray-600">Weight: {assessment.weight}%</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          assessment.type === 'exam' ? 'bg-red-100 text-red-800' :
                          assessment.type === 'test' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {assessment.type}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{new Date(assessment.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "progress" && (
            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Progress Tracking</h3>
                
                {/* GPA Trend */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">GPA Trend</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {childData.academicHistory.map((term, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{term.gpa}</div>
                        <div className="text-sm text-gray-600">{term.term}</div>
                        <div className="text-xs text-gray-500">Rank #{term.rank}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Assignment Performance Trends</h4>
                    <div className="space-y-3">
                      {subject.assignments.map((assignment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">{assignment.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{Math.round((assignment.score / assignment.maxScore) * 100)}%</span>
                            {index > 0 && (
                              Math.round((assignment.score / assignment.maxScore) * 100) > 
                              Math.round((subject.assignments[index-1].score / subject.assignments[index-1].maxScore) * 100) ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700">Average Score</span>
                          <span className="font-bold text-blue-800">
                            {Math.round(subject.assignments.reduce((sum, a) => sum + (a.score / a.maxScore * 100), 0) / subject.assignments.length)}%
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-green-700">Best Performance</span>
                          <span className="font-bold text-green-800">
                            {Math.max(...subject.assignments.map(a => Math.round((a.score / a.maxScore) * 100)))}%
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-orange-700">Improvement Needed</span>
                          <span className="font-bold text-orange-800">
                            {Math.min(...subject.assignments.map(a => Math.round((a.score / a.maxScore) * 100)))}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "goals" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Academic Goals</h3>
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Goal
                </button>
              </div>

              <div className="space-y-4">
                {childData.academicGoals.map((goal, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{goal.goal}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        goal.status === 'achieved' ? 'bg-green-100 text-green-800' :
                        goal.status === 'on-track' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {goal.status.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            goal.progress >= 80 ? 'bg-green-500' :
                            goal.progress >= 60 ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Target Date: {new Date(goal.targetDate).toLocaleDateString()}</span>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Study Schedule</h3>
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Schedule
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                  {childData.studySchedule.map((session, index) => (
                    <div key={index} className="p-6 border-b md:border-r lg:border-r-0 lg:last:border-r-0 border-gray-200 last:border-b-0">
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 mb-2">{session.day}</h4>
                        <p className="text-sm text-gray-600 mb-2">{session.time}</p>
                        <div className="mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            session.type === 'homework' ? 'bg-blue-100 text-blue-800' :
                            session.type === 'reading' ? 'bg-green-100 text-green-800' :
                            session.type === 'practice' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {session.subject}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 capitalize">{session.type.replace('-', ' ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
}
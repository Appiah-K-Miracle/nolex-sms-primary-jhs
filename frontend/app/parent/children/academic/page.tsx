"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Star,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  User,
  GraduationCap,
  Activity,
  RefreshCw,
  Search,
  Plus,
  MoreVertical
} from "lucide-react";

export default function AcademicProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-term");
  const [selectedChild, setSelectedChild] = useState("all");
  const [activeView, setActiveView] = useState("overview");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);

  // Sample data for children's academic progress
  const children = [
    {
      id: 1,
      name: "Kwame Mensah",
      class: "JHS 2",
      photo: null,
      overallGPA: 3.4,
      rank: 8,
      totalStudents: 45,
      termGPA: 3.6,
      previousTermGPA: 3.2,
      trend: "up",
      
      subjects: [
        { 
          id: 1,
          name: "Mathematics", 
          currentGrade: "A", 
          percentage: 85, 
          teacher: "Mr. Osei",
          trend: "up",
          lastUpdated: "2025-11-10",
          assignments: [
            { title: "Algebra Test", score: 88, maxScore: 100, date: "2025-11-05", type: "test" },
            { title: "Geometry Assignment", score: 92, maxScore: 100, date: "2025-11-01", type: "assignment" },
            { title: "Mid-term Exam", score: 82, maxScore: 100, date: "2025-10-28", type: "exam" }
          ],
          attendance: 96
        },
        { 
          id: 2,
          name: "English Language", 
          currentGrade: "B+", 
          percentage: 78, 
          teacher: "Mrs. Addo",
          trend: "stable",
          lastUpdated: "2025-11-08",
          assignments: [
            { title: "Essay Writing", score: 75, maxScore: 100, date: "2025-11-03", type: "assignment" },
            { title: "Reading Comprehension", score: 82, maxScore: 100, date: "2025-10-30", type: "test" },
            { title: "Grammar Quiz", score: 78, maxScore: 100, date: "2025-10-25", type: "quiz" }
          ],
          attendance: 94
        },
        { 
          id: 3,
          name: "Science", 
          currentGrade: "A-", 
          percentage: 82, 
          teacher: "Dr. Asante",
          trend: "up",
          lastUpdated: "2025-11-09",
          assignments: [
            { title: "Chemistry Lab Report", score: 90, maxScore: 100, date: "2025-11-04", type: "lab" },
            { title: "Physics Test", score: 78, maxScore: 100, date: "2025-10-29", type: "test" },
            { title: "Biology Project", score: 85, maxScore: 100, date: "2025-10-26", type: "project" }
          ],
          attendance: 98
        },
        { 
          id: 4,
          name: "Social Studies", 
          currentGrade: "B", 
          percentage: 75, 
          teacher: "Mr. Boateng",
          trend: "down",
          lastUpdated: "2025-11-07",
          assignments: [
            { title: "History Essay", score: 70, maxScore: 100, date: "2025-11-02", type: "assignment" },
            { title: "Geography Quiz", score: 80, maxScore: 100, date: "2025-10-27", type: "quiz" },
            { title: "Civics Test", score: 75, maxScore: 100, date: "2025-10-24", type: "test" }
          ],
          attendance: 92
        }
      ],
      
      termProgress: {
        first: { gpa: 3.2, rank: 12 },
        second: { gpa: 3.4, rank: 10 },
        current: { gpa: 3.6, rank: 8 }
      },
      
      strengths: ["Mathematics", "Science", "Problem Solving"],
      improvements: ["Language Arts", "Social Studies", "Time Management"],
      
      upcomingAssessments: [
        { subject: "Mathematics", title: "Final Exam", date: "2025-11-20", type: "exam" },
        { subject: "English", title: "Oral Presentation", date: "2025-11-18", type: "presentation" },
        { subject: "Science", title: "Lab Practical", date: "2025-11-22", type: "practical" }
      ]
    },
    {
      id: 2,
      name: "Ama Mensah",
      class: "Primary 5",
      photo: null,
      overallGPA: 3.7,
      rank: 3,
      totalStudents: 38,
      termGPA: 3.8,
      previousTermGPA: 3.6,
      trend: "up",
      
      subjects: [
        { 
          id: 5,
          name: "Mathematics", 
          currentGrade: "A", 
          percentage: 88, 
          teacher: "Mrs. Asante",
          trend: "up",
          lastUpdated: "2025-11-11",
          assignments: [
            { title: "Arithmetic Test", score: 95, maxScore: 100, date: "2025-11-06", type: "test" },
            { title: "Word Problems", score: 85, maxScore: 100, date: "2025-11-02", type: "assignment" },
            { title: "Monthly Assessment", score: 90, maxScore: 100, date: "2025-10-30", type: "exam" }
          ],
          attendance: 100
        },
        { 
          id: 6,
          name: "English Language", 
          currentGrade: "A-", 
          percentage: 85, 
          teacher: "Mr. Adjei",
          trend: "up",
          lastUpdated: "2025-11-10",
          assignments: [
            { title: "Creative Writing", score: 88, maxScore: 100, date: "2025-11-05", type: "assignment" },
            { title: "Spelling Test", score: 90, maxScore: 100, date: "2025-11-01", type: "test" },
            { title: "Reading Assessment", score: 82, maxScore: 100, date: "2025-10-28", type: "test" }
          ],
          attendance: 97
        },
        { 
          id: 7,
          name: "Science", 
          currentGrade: "B+", 
          percentage: 80, 
          teacher: "Dr. Mensah",
          trend: "stable",
          lastUpdated: "2025-11-09",
          assignments: [
            { title: "Nature Study", score: 85, maxScore: 100, date: "2025-11-04", type: "project" },
            { title: "Simple Experiments", score: 78, maxScore: 100, date: "2025-10-31", type: "practical" },
            { title: "Science Quiz", score: 80, maxScore: 100, date: "2025-10-26", type: "quiz" }
          ],
          attendance: 95
        },
        { 
          id: 8,
          name: "Creative Arts", 
          currentGrade: "A", 
          percentage: 92, 
          teacher: "Ms. Nkrumah",
          trend: "up",
          lastUpdated: "2025-11-12",
          assignments: [
            { title: "Art Portfolio", score: 95, maxScore: 100, date: "2025-11-07", type: "project" },
            { title: "Craft Work", score: 90, maxScore: 100, date: "2025-11-03", type: "assignment" },
            { title: "Drawing Test", score: 92, maxScore: 100, date: "2025-10-29", type: "test" }
          ],
          attendance: 98
        }
      ],
      
      termProgress: {
        first: { gpa: 3.5, rank: 5 },
        second: { gpa: 3.6, rank: 4 },
        current: { gpa: 3.8, rank: 3 }
      },
      
      strengths: ["Creative Arts", "Mathematics", "Communication"],
      improvements: ["Science Practicals", "Physical Education", "Time Management"],
      
      upcomingAssessments: [
        { subject: "Creative Arts", title: "Exhibition Preparation", date: "2025-11-19", type: "project" },
        { subject: "Mathematics", title: "Problem Solving Test", date: "2025-11-21", type: "test" },
        { subject: "English", title: "Story Writing", date: "2025-11-25", type: "assignment" }
      ]
    }
  ];

  // Filter children based on selection
  const filteredChildren = selectedChild === "all" ? children : children.filter(child => child.id === parseInt(selectedChild));

  // Calculate overall statistics
  const overallStats = {
    totalSubjects: children.reduce((acc, child) => acc + child.subjects.length, 0),
    averageGPA: children.reduce((acc, child) => acc + child.overallGPA, 0) / children.length,
    topPerformer: children.reduce((prev, current) => (prev.overallGPA > current.overallGPA) ? prev : current),
    improvingSubjects: children.reduce((acc, child) => 
      acc + child.subjects.filter(subject => subject.trend === "up").length, 0
    ),
    decliningSubjects: children.reduce((acc, child) => 
      acc + child.subjects.filter(subject => subject.trend === "down").length, 0
    )
  };

  // Delete confirmation modal
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">Remove Grade Entry</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove this grade entry? This action cannot be undone and may affect the student's overall academic record.
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
              setSelectedGradeId(null);
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
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">Academic Progress</h1>
            <p className="text-indigo-100 text-sm lg:text-base xl:text-lg">
              Track your children's academic performance and growth
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <button className="bg-white/20 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Download className="w-4 h-4 lg:w-5 lg:h-5" />
              Export Progress
            </button>
            <Link
              href="/parent/children"
              className="bg-white text-indigo-600 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base"
            >
              <Users className="w-4 h-4 lg:w-5 lg:h-5" />
              View All Children
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Children</option>
                {children.map((child) => (
                  <option key={child.id} value={child.id.toString()}>
                    {child.name} ({child.class})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="current-term">Current Term</option>
                <option value="previous-term">Previous Term</option>
                <option value="full-year">Full Academic Year</option>
                <option value="last-year">Last Academic Year</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveView("overview")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === "overview" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveView("detailed")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === "detailed" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Detailed
            </button>
            <button
              onClick={() => setActiveView("analytics")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === "analytics" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average GPA</p>
              <p className="text-2xl font-bold text-blue-600">{overallStats.averageGPA.toFixed(1)}</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +0.2 this term
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Subjects</p>
              <p className="text-2xl font-bold text-green-600">{overallStats.totalSubjects}</p>
              <p className="text-xs text-gray-500">Across all children</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Improving</p>
              <p className="text-2xl font-bold text-orange-600">{overallStats.improvingSubjects}</p>
              <p className="text-xs text-orange-500">Subjects trending up</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Top Performer</p>
              <p className="text-lg font-bold text-purple-600">{overallStats.topPerformer.name}</p>
              <p className="text-xs text-purple-500">GPA: {overallStats.topPerformer.overallGPA}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeView === "overview" && (
        <div className="space-y-8">
          {/* Children Progress Cards */}
          {filteredChildren.map((child) => (
            <div key={child.id} className="bg-white rounded-lg lg:rounded-xl shadow-sm">
              {/* Child Header */}
              <div className="p-6 lg:p-8 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-lg lg:text-xl font-semibold text-white">
                        {child.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">{child.name}</h3>
                      <p className="text-gray-600">{child.class} • Rank #{child.rank} of {child.totalStudents}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-2xl lg:text-3xl font-bold text-blue-600">{child.termGPA}</p>
                      <p className="text-sm text-gray-500">Current GPA</p>
                      <div className="flex items-center justify-end mt-1">
                        {child.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-xs ${child.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                          {child.trend === "up" ? "+" : ""}{(child.termGPA - child.previousTermGPA).toFixed(1)}
                        </span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/parent/children/academic/${child.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Subject Performance */}
              <div className="p-6 lg:p-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Subject Performance</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {child.subjects.map((subject) => (
                    <div key={subject.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900">{subject.name}</h5>
                        <div className="flex items-center gap-2">
                          {subject.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                          {subject.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                          <span className="text-lg font-bold text-gray-900">{subject.currentGrade}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Percentage:</span>
                          <span className="font-medium">{subject.percentage}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Teacher:</span>
                          <span className="font-medium">{subject.teacher}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Attendance:</span>
                          <span className="font-medium">{subject.attendance}%</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className={`h-2 rounded-full ${
                            subject.percentage >= 85 ? 'bg-green-500' :
                            subject.percentage >= 75 ? 'bg-blue-500' :
                            subject.percentage >= 65 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${subject.percentage}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Updated: {new Date(subject.lastUpdated).toLocaleDateString()}
                        </span>
                        <div className="flex gap-1">
                          <Link
                            href={`/parent/children/academic/${child.id}/${subject.id}`}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/parent/children/academic/${child.id}/${subject.id}/edit`}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedGradeId(subject.id);
                              setShowDeleteModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Assignments */}
                <div className="mt-8">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">Recent Assignments & Tests</h5>
                  <div className="space-y-3">
                    {child.subjects
                      .flatMap(subject => 
                        subject.assignments.map(assignment => ({
                          ...assignment,
                          subject: subject.name,
                          subjectId: subject.id
                        }))
                      )
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 5)
                      .map((assignment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                assignment.type === 'exam' ? 'bg-red-100 text-red-800' :
                                assignment.type === 'test' ? 'bg-blue-100 text-blue-800' :
                                assignment.type === 'assignment' ? 'bg-green-100 text-green-800' :
                                assignment.type === 'quiz' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {assignment.type}
                              </span>
                              <span className="font-medium text-gray-900">{assignment.title}</span>
                              <span className="text-gray-500">• {assignment.subject}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{new Date(assignment.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-gray-900">{assignment.score}/{assignment.maxScore}</span>
                            <p className="text-sm text-gray-500">{Math.round((assignment.score / assignment.maxScore) * 100)}%</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeView === "detailed" && (
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Detailed Academic Analysis</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>

          {filteredChildren.map((child) => (
            <div key={child.id} className="mb-8 last:mb-0">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{child.name} - Detailed Analysis</h4>
                
                {/* Term Progress Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{child.termProgress.first.gpa}</p>
                    <p className="text-sm text-gray-600">First Term</p>
                    <p className="text-xs text-gray-500">Rank #{child.termProgress.first.rank}</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{child.termProgress.second.gpa}</p>
                    <p className="text-sm text-gray-600">Second Term</p>
                    <p className="text-xs text-gray-500">Rank #{child.termProgress.second.rank}</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border-2 border-blue-500">
                    <p className="text-2xl font-bold text-purple-600">{child.termProgress.current.gpa}</p>
                    <p className="text-sm text-gray-600">Current Term</p>
                    <p className="text-xs text-gray-500">Rank #{child.termProgress.current.rank}</p>
                  </div>
                </div>

                {/* Strengths and Improvements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Academic Strengths
                    </h5>
                    <div className="space-y-2">
                      {child.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-green-700">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Areas for Improvement
                    </h5>
                    <div className="space-y-2">
                      {child.improvements.map((improvement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span className="text-orange-700">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeView === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Trends */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Trends</h3>
            <div className="space-y-6">
              {filteredChildren.map((child) => (
                <div key={child.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h4 className="font-semibold text-gray-900 mb-4">{child.name}</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{child.termProgress.first.gpa}</div>
                      <div className="text-xs text-gray-500">Term 1</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{child.termProgress.second.gpa}</div>
                      <div className="text-xs text-gray-500">Term 2</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{child.termProgress.current.gpa}</div>
                      <div className="text-xs text-gray-500">Current</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Distribution */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Subject Performance Distribution</h3>
            <div className="space-y-4">
              {['A', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'].map((grade) => {
                const count = filteredChildren.reduce((acc, child) => 
                  acc + child.subjects.filter(subject => subject.currentGrade === grade).length, 0
                );
                const percentage = count > 0 ? (count / overallStats.totalSubjects) * 100 : 0;
                
                return (
                  <div key={grade} className="flex items-center gap-4">
                    <div className="w-8 text-sm font-medium text-gray-700">{grade}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            grade.startsWith('A') ? 'bg-green-500' :
                            grade.startsWith('B') ? 'bg-blue-500' :
                            grade.startsWith('C') ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-sm text-gray-600 text-right">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Assessments */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Assessments</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredChildren.map((child) => (
            <div key={child.id} className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4" />
                {child.name}
              </h4>
              <div className="space-y-3">
                {child.upcomingAssessments.map((assessment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{assessment.title}</p>
                      <p className="text-sm text-gray-600">{assessment.subject}</p>
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
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
}
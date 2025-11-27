"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  User,
  Calendar,
  BarChart,
  LineChart,
  Edit,
  Download,
  Share2,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  FileText,
  Calculator,
  Eye,
  Filter,
  Search,
  ChevronRight,
  Info,
  Lightbulb,
  Users,
  Medal
} from "lucide-react";

export default function GradeDetailPage() {
  const params = useParams();
  const gradeId = params.id as string;
  
  const [selectedView, setSelectedView] = useState<'overview' | 'breakdown' | 'history' | 'analysis'>('overview');
  const [selectedTerm, setSelectedTerm] = useState("current");

  // Sample grade data
  const gradeRecord = {
    id: parseInt(gradeId),
    student: {
      name: "Kwame Mensah",
      class: "JHS 2A",
      studentId: "STU001",
      photo: "/students/kwame.jpg"
    },
    subject: {
      name: "Mathematics",
      teacher: "Mr. Asante",
      code: "MATH201",
      credit: 4
    },
    currentTerm: {
      term: "Term 1, 2025",
      overallGrade: "B+",
      percentage: 78.5,
      position: 8,
      totalStudents: 32,
      letterGrade: "B+",
      gradePoint: 3.5,
      status: "passing"
    },
    assessments: [
      {
        id: 1,
        type: "Quiz",
        title: "Algebra Fundamentals Quiz 1",
        date: "2025-10-15",
        maxScore: 20,
        score: 18,
        percentage: 90,
        weight: 10,
        feedback: "Excellent understanding of algebraic concepts. Keep up the good work!"
      },
      {
        id: 2,
        type: "Assignment",
        title: "Problem Solving Assignment",
        date: "2025-10-22",
        maxScore: 25,
        score: 19,
        percentage: 76,
        weight: 15,
        feedback: "Good work overall. Need to show more detailed working in complex problems."
      },
      {
        id: 3,
        type: "Test",
        title: "Mid-Term Mathematics Test",
        date: "2025-11-05",
        maxScore: 100,
        score: 75,
        percentage: 75,
        weight: 40,
        feedback: "Solid performance. Geometry section needs improvement. Practice more word problems."
      },
      {
        id: 4,
        type: "Project",
        title: "Real-world Math Applications",
        date: "2025-11-12",
        maxScore: 50,
        score: 42,
        percentage: 84,
        weight: 20,
        feedback: "Creative approach to problem-solving. Excellent presentation skills demonstrated."
      },
      {
        id: 5,
        type: "Homework",
        title: "Daily Assignments Average",
        date: "Ongoing",
        maxScore: 100,
        score: 82,
        percentage: 82,
        weight: 15,
        feedback: "Consistent submission. Quality of work is improving steadily."
      }
    ],
    termHistory: [
      {
        term: "Term 3, 2024",
        grade: "B",
        percentage: 74.2,
        position: 12,
        totalStudents: 30
      },
      {
        term: "Term 2, 2024", 
        grade: "B-",
        percentage: 69.8,
        position: 15,
        totalStudents: 30
      },
      {
        term: "Term 1, 2024",
        grade: "C+",
        percentage: 65.5,
        position: 18,
        totalStudents: 30
      }
    ],
    strengths: [
      "Strong understanding of algebraic concepts",
      "Excellent problem-solving approach", 
      "Consistent homework submission",
      "Good participation in class discussions",
      "Shows improvement in complex calculations"
    ],
    areasForImprovement: [
      "Geometry concepts need reinforcement",
      "Word problem interpretation skills",
      "Showing detailed working steps",
      "Time management during tests",
      "Application of formulas in complex scenarios"
    ],
    teacherRecommendations: [
      "Practice geometry problems daily for 15 minutes",
      "Work on word problem strategies with parent guidance",
      "Use math journal to show detailed working",
      "Join after-school math support sessions",
      "Focus on understanding rather than memorization"
    ],
    classStatistics: {
      average: 71.2,
      highest: 94.5,
      lowest: 45.8,
      aboveAverage: 15,
      belowAverage: 17,
      distribution: {
        "A": 3,
        "B+": 5,
        "B": 7,
        "B-": 4,
        "C+": 6,
        "C": 4,
        "C-": 2,
        "D": 1
      }
    },
    nextAssessments: [
      {
        type: "Quiz",
        title: "Geometry Quiz",
        date: "2025-11-20",
        topics: ["Angles", "Triangles", "Circles"]
      },
      {
        type: "Test",
        title: "End of Term Exam",
        date: "2025-12-10",
        topics: ["All topics covered this term"]
      }
    ]
  };

  const getGradeColor = (grade: string) => {
    switch (grade[0]) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'F': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    if (percentage >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getAssessmentTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'quiz': return <Clock className="w-4 h-4" />;
      case 'test': return <FileText className="w-4 h-4" />;
      case 'assignment': return <Edit className="w-4 h-4" />;
      case 'project': return <Award className="w-4 h-4" />;
      case 'homework': return <BookOpen className="w-4 h-4" />;
      default: return <Calculator className="w-4 h-4" />;
    }
  };

  const getAssessmentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'quiz': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'test': return 'bg-red-100 text-red-800 border-red-200';
      case 'assignment': return 'bg-green-100 text-green-800 border-green-200';
      case 'project': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'homework': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateWeightedScore = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    gradeRecord.assessments.forEach(assessment => {
      totalWeightedScore += (assessment.percentage * assessment.weight / 100);
      totalWeight += assessment.weight;
    });
    
    return totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/parent/academics/grades"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Grade Details</h1>
          <p className="text-gray-600">
            {gradeRecord.subject.name} • {gradeRecord.currentTerm.term}
          </p>
        </div>
      </div>

      {/* Student & Subject Info */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{gradeRecord.student.name}</h2>
              <p className="text-gray-600">{gradeRecord.student.class} • {gradeRecord.student.studentId}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-gray-900">{gradeRecord.subject.name}</span>
            </div>
            <p className="text-gray-600">{gradeRecord.subject.teacher} • {gradeRecord.subject.code}</p>
          </div>
        </div>

        {/* Grade Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
            <div className={`text-3xl font-bold mb-1 ${getPercentageColor(gradeRecord.currentTerm.percentage)}`}>
              {gradeRecord.currentTerm.percentage}%
            </div>
            <div className="text-sm text-gray-600">Current Score</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <div className={`text-3xl font-bold mb-1 px-3 py-1 rounded-lg ${getGradeColor(gradeRecord.currentTerm.letterGrade)}`}>
              {gradeRecord.currentTerm.letterGrade}
            </div>
            <div className="text-sm text-gray-600">Letter Grade</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {gradeRecord.currentTerm.position}
            </div>
            <div className="text-sm text-gray-600">Class Rank</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {gradeRecord.currentTerm.gradePoint}
            </div>
            <div className="text-sm text-gray-600">Grade Point</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/parent/academics/grades/${gradeId}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Request Review
        </Link>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Report
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Contact Teacher
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart },
              { id: 'breakdown', name: 'Assessment Breakdown', icon: Calculator },
              { id: 'history', name: 'Grade History', icon: LineChart },
              { id: 'analysis', name: 'Performance Analysis', icon: Target }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedView(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedView === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {selectedView === 'overview' && (
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Current Performance</span>
                        <span>{gradeRecord.currentTerm.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${gradeRecord.currentTerm.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Class Average</span>
                        <span>{gradeRecord.classStatistics.average}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gray-400 h-2 rounded-full"
                          style={{ width: `${gradeRecord.classStatistics.average}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Position</h3>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      #{gradeRecord.currentTerm.position}
                    </div>
                    <p className="text-gray-600 mb-4">
                      out of {gradeRecord.currentTerm.totalStudents} students
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      {gradeRecord.currentTerm.position <= 10 ? (
                        <Medal className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <Users className="w-5 h-5 text-gray-500" />
                      )}
                      <span className="text-sm text-gray-600">
                        {gradeRecord.currentTerm.position <= 10 ? 'Top 10 Position' : 'Good Standing'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strengths and Areas for Improvement */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-900">Strengths</h3>
                  </div>
                  <ul className="space-y-2">
                    {gradeRecord.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2 text-green-800">
                        <Star className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-orange-600" />
                    <h3 className="text-lg font-semibold text-orange-900">Areas for Improvement</h3>
                  </div>
                  <ul className="space-y-2">
                    {gradeRecord.areasForImprovement.map((area, index) => (
                      <li key={index} className="flex items-start gap-2 text-orange-800">
                        <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Teacher Recommendations */}
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">Teacher Recommendations</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gradeRecord.teacherRecommendations.map((recommendation, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                        </div>
                        <span className="text-sm text-gray-700">{recommendation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'breakdown' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Assessment Breakdown</h3>
                <div className="text-sm text-gray-600">
                  Weighted Average: <span className="font-semibold">{calculateWeightedScore().toFixed(1)}%</span>
                </div>
              </div>

              <div className="space-y-4">
                {gradeRecord.assessments.map((assessment) => (
                  <div key={assessment.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg border ${getAssessmentTypeColor(assessment.type)}`}>
                          {getAssessmentTypeIcon(assessment.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{assessment.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAssessmentTypeColor(assessment.type)}`}>
                              {assessment.type}
                            </span>
                            <span>{new Date(assessment.date).toLocaleDateString()}</span>
                            <span>Weight: {assessment.weight}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {assessment.score}/{assessment.maxScore}
                        </div>
                        <div className={`text-lg font-semibold ${getPercentageColor(assessment.percentage)}`}>
                          {assessment.percentage}%
                        </div>
                      </div>
                    </div>

                    {/* Score Visualization */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Score</span>
                        <span>{assessment.score} / {assessment.maxScore}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            assessment.percentage >= 80 ? 'bg-green-500' :
                            assessment.percentage >= 70 ? 'bg-blue-500' :
                            assessment.percentage >= 60 ? 'bg-yellow-500' :
                            assessment.percentage >= 50 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${assessment.percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Teacher Feedback */}
                    {assessment.feedback && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm mb-1">Teacher Feedback</p>
                            <p className="text-gray-700 text-sm">{assessment.feedback}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'history' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Grade History Trend</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="text-2xl font-bold text-blue-600">{gradeRecord.currentTerm.percentage}%</div>
                    <div className="text-sm text-gray-600">Current Term</div>
                    <div className="text-xs text-blue-600 font-medium">Grade: {gradeRecord.currentTerm.grade}</div>
                  </div>
                  {gradeRecord.termHistory.map((term, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border-l-4 border-gray-300">
                      <div className="text-2xl font-bold text-gray-600">{term.percentage}%</div>
                      <div className="text-sm text-gray-600">{term.term}</div>
                      <div className="text-xs text-gray-500 font-medium">Grade: {term.grade}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trend Analysis */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Performance Trend</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">Improving</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Performance has improved by {(gradeRecord.currentTerm.percentage - gradeRecord.termHistory[0].percentage).toFixed(1)} percentage points since last term
                  </div>
                </div>
              </div>

              {/* Position History */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Class Position History</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-900">Current Term</span>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">Position #{gradeRecord.currentTerm.position}</div>
                      <div className="text-sm text-blue-700">out of {gradeRecord.currentTerm.totalStudents}</div>
                    </div>
                  </div>
                  {gradeRecord.termHistory.map((term, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{term.term}</span>
                      <div className="text-right">
                        <div className="font-bold text-gray-600">Position #{term.position}</div>
                        <div className="text-sm text-gray-500">out of {term.totalStudents}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'analysis' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Analysis</h3>
              
              {/* Class Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Class Statistics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Highest Score:</span>
                      <span className="font-semibold text-green-600">{gradeRecord.classStatistics.highest}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class Average:</span>
                      <span className="font-semibold text-blue-600">{gradeRecord.classStatistics.average}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Your Score:</span>
                      <span className={`font-semibold ${getPercentageColor(gradeRecord.currentTerm.percentage)}`}>
                        {gradeRecord.currentTerm.percentage}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lowest Score:</span>
                      <span className="font-semibold text-red-600">{gradeRecord.classStatistics.lowest}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Grade Distribution</h4>
                  <div className="space-y-3">
                    {Object.entries(gradeRecord.classStatistics.distribution).map(([grade, count]) => (
                      <div key={grade} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${getGradeColor(grade)}`}>
                            {grade}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(count / gradeRecord.currentTerm.totalStudents) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upcoming Assessments */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-semibold text-yellow-900">Upcoming Assessments</h4>
                </div>
                <div className="space-y-3">
                  {gradeRecord.nextAssessments.map((assessment, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{assessment.title}</h5>
                          <p className="text-sm text-gray-600">
                            {assessment.type} • {new Date(assessment.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-yellow-700 mt-1">
                            Topics: {assessment.topics.join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            {Math.ceil((new Date(assessment.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Recommendations */}
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-900">Study Recommendations</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-green-900 mb-2">Focus Areas</h5>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Geometry problem solving</li>
                      <li>• Word problem strategies</li>
                      <li>• Formula applications</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-green-900 mb-2">Study Tips</h5>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Practice daily for 30 minutes</li>
                      <li>• Use visual aids for geometry</li>
                      <li>• Show all working steps</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
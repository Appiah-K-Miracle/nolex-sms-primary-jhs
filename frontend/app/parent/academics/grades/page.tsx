"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  FileText, 
  Download, 
  Filter, 
  Search, 
  Eye,
  ChevronDown,
  ChevronRight,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Target,
  Star,
  User,
  BookmarkCheck,
  Zap,
  Activity
} from "lucide-react";

interface Assessment {
  id: number;
  name: string;
  type: 'test' | 'assignment' | 'quiz' | 'project' | 'exam';
  date: string;
  score: number;
  totalMarks: number;
  percentage: number;
  weight: number;
  feedback?: string;
  submissionDate?: string;
  status: 'graded' | 'pending' | 'late' | 'missing';
}

interface SubjectGrades {
  subject: string;
  teacher: string;
  class: string;
  currentGrade: string;
  currentPercentage: number;
  trend: 'up' | 'down' | 'stable';
  assessments: Assessment[];
  termAverage: number;
  yearAverage: number;
  classAverage: number;
  position: number;
  totalStudents: number;
  nextAssessment?: {
    name: string;
    date: string;
    type: string;
  };
}

export default function GradesPage() {
  const [selectedChild, setSelectedChild] = useState<number>(1);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedTerm, setSelectedTerm] = useState("current");
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  // Sample grades data
  const gradesData: SubjectGrades[] = [
    {
      subject: "Mathematics",
      teacher: "Mr. Osei",
      class: "JHS 2",
      currentGrade: "A",
      currentPercentage: 85,
      trend: "up",
      termAverage: 85,
      yearAverage: 82,
      classAverage: 75,
      position: 3,
      totalStudents: 45,
      nextAssessment: {
        name: "Mid-Term Examination",
        date: "2025-11-15",
        type: "exam"
      },
      assessments: [
        {
          id: 1,
          name: "Algebra Test",
          type: "test",
          date: "2025-11-03",
          score: 85,
          totalMarks: 100,
          percentage: 85,
          weight: 15,
          feedback: "Excellent work on quadratic equations. Keep practicing word problems.",
          status: "graded"
        },
        {
          id: 2,
          name: "Geometry Assignment",
          type: "assignment",
          date: "2025-10-28",
          score: 88,
          totalMarks: 100,
          percentage: 88,
          weight: 10,
          feedback: "Good understanding of geometric principles.",
          submissionDate: "2025-10-28",
          status: "graded"
        },
        {
          id: 3,
          name: "Weekly Quiz 8",
          type: "quiz",
          date: "2025-10-25",
          score: 78,
          totalMarks: 100,
          percentage: 78,
          weight: 5,
          status: "graded"
        },
        {
          id: 4,
          name: "Statistics Project",
          type: "project",
          date: "2025-10-20",
          score: 92,
          totalMarks: 100,
          percentage: 92,
          weight: 20,
          feedback: "Outstanding data analysis and presentation skills.",
          submissionDate: "2025-10-19",
          status: "graded"
        },
        {
          id: 5,
          name: "Chapter 6 Test",
          type: "test",
          date: "2025-10-15",
          score: 82,
          totalMarks: 100,
          percentage: 82,
          weight: 15,
          status: "graded"
        }
      ]
    },
    {
      subject: "English Language",
      teacher: "Mrs. Addo",
      class: "JHS 2",
      currentGrade: "B+",
      currentPercentage: 78,
      trend: "stable",
      termAverage: 78,
      yearAverage: 76,
      classAverage: 72,
      position: 8,
      totalStudents: 45,
      nextAssessment: {
        name: "Essay Writing Assessment",
        date: "2025-11-12",
        type: "assignment"
      },
      assessments: [
        {
          id: 6,
          name: "Reading Comprehension Test",
          type: "test",
          date: "2025-11-01",
          score: 76,
          totalMarks: 100,
          percentage: 76,
          weight: 15,
          feedback: "Good comprehension skills. Work on vocabulary expansion.",
          status: "graded"
        },
        {
          id: 7,
          name: "Creative Writing Assignment",
          type: "assignment",
          date: "2025-10-26",
          score: 82,
          totalMarks: 100,
          percentage: 82,
          weight: 20,
          feedback: "Creative ideas! Focus on grammar and sentence structure.",
          submissionDate: "2025-10-26",
          status: "graded"
        },
        {
          id: 8,
          name: "Grammar Quiz",
          type: "quiz",
          date: "2025-10-22",
          score: 74,
          totalMarks: 100,
          percentage: 74,
          weight: 5,
          status: "graded"
        },
        {
          id: 9,
          name: "Literature Analysis",
          type: "assignment",
          date: "2025-10-18",
          score: 80,
          totalMarks: 100,
          percentage: 80,
          weight: 15,
          feedback: "Good analysis of themes. Expand on character development.",
          submissionDate: "2025-10-17",
          status: "graded"
        }
      ]
    },
    {
      subject: "Science",
      teacher: "Dr. Asante",
      class: "JHS 2",
      currentGrade: "A-",
      currentPercentage: 82,
      trend: "up",
      termAverage: 82,
      yearAverage: 80,
      classAverage: 76,
      position: 5,
      totalStudents: 45,
      nextAssessment: {
        name: "Physics Practical Exam",
        date: "2025-11-18",
        type: "exam"
      },
      assessments: [
        {
          id: 10,
          name: "Chemistry Lab Report",
          type: "assignment",
          date: "2025-10-30",
          score: 84,
          totalMarks: 100,
          percentage: 84,
          weight: 15,
          feedback: "Excellent lab technique and data recording.",
          submissionDate: "2025-10-30",
          status: "graded"
        },
        {
          id: 11,
          name: "Biology Test",
          type: "test",
          date: "2025-10-24",
          score: 86,
          totalMarks: 100,
          percentage: 86,
          weight: 15,
          feedback: "Strong understanding of cell biology concepts.",
          status: "graded"
        },
        {
          id: 12,
          name: "Physics Quiz",
          type: "quiz",
          date: "2025-10-20",
          score: 78,
          totalMarks: 100,
          percentage: 78,
          weight: 5,
          status: "graded"
        }
      ]
    }
  ];

  const children = [
    { id: 1, name: "Kwame Mensah", class: "JHS 2" },
    { id: 2, name: "Ama Mensah", class: "Primary 5" }
  ];

  const filteredGrades = selectedSubject === "all" 
    ? gradesData 
    : gradesData.filter(grade => grade.subject === selectedSubject);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'graded': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'late': return 'bg-red-100 text-red-800';
      case 'missing': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getAssessmentTypeIcon = (type: string) => {
    switch (type) {
      case 'test': return <FileText className="w-4 h-4" />;
      case 'assignment': return <BookmarkCheck className="w-4 h-4" />;
      case 'quiz': return <Zap className="w-4 h-4" />;
      case 'project': return <Target className="w-4 h-4" />;
      case 'exam': return <Award className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const toggleSubjectExpansion = (subject: string) => {
    setExpandedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const calculateWeightedAverage = (assessments: Assessment[]) => {
    const totalWeight = assessments.reduce((sum, assessment) => sum + assessment.weight, 0);
    const weightedSum = assessments.reduce((sum, assessment) => 
      sum + (assessment.percentage * assessment.weight), 0);
    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 flex items-center gap-3">
              <FileText className="w-8 h-8 lg:w-10 lg:h-10" />
              Grade Reports
            </h1>
            <p className="text-green-100 text-sm lg:text-base xl:text-lg">
              Detailed assessment scores and academic performance tracking
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <button className="bg-white text-green-600 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Download className="w-4 h-4 lg:w-5 lg:h-5" />
              Export Grades
            </button>
            <button className="bg-green-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-green-400 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5" />
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Student:</label>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.class})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Subject:</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Subjects</option>
                {gradesData.map(grade => (
                  <option key={grade.subject} value={grade.subject}>
                    {grade.subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Term:</label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="current">Current Term</option>
                <option value="previous">Previous Term</option>
                <option value="year">Full Year</option>
              </select>
            </div>
          </div>

          {/* View Mode */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('summary')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'summary' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'detailed' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Detailed
            </button>
          </div>
        </div>
      </div>

      {/* Grade Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Overall Average</h3>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
            {Math.round(filteredGrades.reduce((sum, grade) => sum + grade.currentPercentage, 0) / filteredGrades.length)}%
          </div>
          <p className="text-xs lg:text-sm text-gray-600">Current term</p>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Highest Grade</h3>
            <Award className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-1">
            {Math.max(...filteredGrades.map(grade => grade.currentPercentage))}%
          </div>
          <p className="text-xs lg:text-sm text-gray-600">
            {filteredGrades.find(grade => grade.currentPercentage === Math.max(...filteredGrades.map(g => g.currentPercentage)))?.subject}
          </p>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Subjects Above 80%</h3>
            <Star className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-yellow-600 mb-1">
            {filteredGrades.filter(grade => grade.currentPercentage >= 80).length}
          </div>
          <p className="text-xs lg:text-sm text-gray-600">of {filteredGrades.length} subjects</p>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Pending Assessments</h3>
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-1">
            {filteredGrades.filter(grade => grade.nextAssessment).length}
          </div>
          <p className="text-xs lg:text-sm text-gray-600">Upcoming</p>
        </div>
      </div>

      {/* Subject Grades */}
      <div className="space-y-4 lg:space-y-6">
        {filteredGrades.map((subjectGrade, index) => (
          <div key={index} className="bg-white rounded-lg lg:rounded-xl shadow-sm">
            {/* Subject Header */}
            <div 
              className="p-4 lg:p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSubjectExpansion(subjectGrade.subject)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 flex items-center gap-2">
                      {subjectGrade.subject}
                      {getTrendIcon(subjectGrade.trend)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {subjectGrade.teacher} • {subjectGrade.class}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`text-xl lg:text-2xl font-bold ${getGradeColor(subjectGrade.currentPercentage)}`}>
                      {subjectGrade.currentGrade}
                    </div>
                    <div className="text-sm text-gray-600">
                      {subjectGrade.currentPercentage}%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Rank</div>
                    <div className="text-lg font-semibold text-gray-900">
                      #{subjectGrade.position}
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedSubjects.includes(subjectGrade.subject) ? 'rotate-180' : ''
                  }`} />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600">Term Average</p>
                  <p className="text-sm font-semibold text-gray-900">{subjectGrade.termAverage}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600">Class Average</p>
                  <p className="text-sm font-semibold text-gray-900">{subjectGrade.classAverage}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600">Assessments</p>
                  <p className="text-sm font-semibold text-gray-900">{subjectGrade.assessments.length}</p>
                </div>
                {subjectGrade.nextAssessment && (
                  <div className="text-center hidden lg:block">
                    <p className="text-xs text-gray-600">Next Assessment</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(subjectGrade.nextAssessment.date).toLocaleDateString('en-GB', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Expanded Content */}
            {expandedSubjects.includes(subjectGrade.subject) && (
              <div className="p-4 lg:p-6">
                {/* Next Assessment Alert */}
                {subjectGrade.nextAssessment && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Upcoming Assessment</h4>
                        <p className="text-blue-700">
                          {subjectGrade.nextAssessment.name} • {new Date(subjectGrade.nextAssessment.date).toLocaleDateString()} • {subjectGrade.nextAssessment.type}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Assessment List */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Assessments</h4>
                  
                  {viewMode === 'summary' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {subjectGrade.assessments.slice(0, 4).map((assessment) => (
                        <div key={assessment.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getAssessmentTypeIcon(assessment.type)}
                              <h5 className="font-medium text-gray-900">{assessment.name}</h5>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                              {assessment.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">
                                {new Date(assessment.date).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                Weight: {assessment.weight}%
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`text-lg font-bold ${getGradeColor(assessment.percentage)}`}>
                                {assessment.score}/{assessment.totalMarks}
                              </p>
                              <p className="text-sm text-gray-600">
                                {assessment.percentage}%
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {subjectGrade.assessments.map((assessment) => (
                        <div key={assessment.id} className="border border-gray-200 rounded-lg p-4 lg:p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                            <div className="flex items-center space-x-3 mb-2 lg:mb-0">
                              {getAssessmentTypeIcon(assessment.type)}
                              <div>
                                <h5 className="font-semibold text-gray-900">{assessment.name}</h5>
                                <p className="text-sm text-gray-600 capitalize">{assessment.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assessment.status)}`}>
                                {assessment.status}
                              </span>
                              <div className="text-right">
                                <p className={`text-xl font-bold ${getGradeColor(assessment.percentage)}`}>
                                  {assessment.score}/{assessment.totalMarks}
                                </p>
                                <p className="text-sm text-gray-600">{assessment.percentage}%</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-600">Assessment Date</p>
                              <p className="text-sm font-medium text-gray-900">
                                {new Date(assessment.date).toLocaleDateString()}
                              </p>
                            </div>
                            {assessment.submissionDate && (
                              <div>
                                <p className="text-xs text-gray-600">Submitted</p>
                                <p className="text-sm font-medium text-gray-900">
                                  {new Date(assessment.submissionDate).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                            <div>
                              <p className="text-xs text-gray-600">Weight</p>
                              <p className="text-sm font-medium text-gray-900">{assessment.weight}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Grade Impact</p>
                              <p className="text-sm font-medium text-gray-900">
                                {((assessment.percentage * assessment.weight) / 100).toFixed(1)} pts
                              </p>
                            </div>
                          </div>

                          {assessment.feedback && (
                            <div className="bg-gray-50 rounded-lg p-3">
                              <h6 className="text-sm font-semibold text-gray-900 mb-1">Teacher Feedback</h6>
                              <p className="text-sm text-gray-700">{assessment.feedback}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredGrades.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No grades found</h3>
          <p className="text-gray-600">
            No grade data available for the selected filters.
          </p>
        </div>
      )}
    </div>
  );
}
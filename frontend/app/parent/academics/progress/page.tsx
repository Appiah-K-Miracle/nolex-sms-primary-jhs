"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Target, 
  Award, 
  BookOpen, 
  Calendar, 
  Download, 
  Filter, 
  User,
  Zap,
  Activity,
  Star,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  ChevronRight,
  Settings,
  RefreshCw,
  Info
} from "lucide-react";

interface ProgressData {
  studentId: number;
  name: string;
  class: string;
  
  // Overall Progress
  overallGPA: number;
  previousGPA: number;
  targetGPA: number;
  classRank: number;
  previousRank: number;
  totalStudents: number;
  
  // Subject Progress
  subjects: {
    name: string;
    currentGrade: number;
    previousGrade: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
    monthlyScores: { month: string; score: number }[];
    strengths: string[];
    improvements: string[];
  }[];
  
  // Performance Metrics
  performanceMetrics: {
    academicGrowth: number;
    effortLevel: number;
    participationScore: number;
    homeworkCompletion: number;
    testPerformance: number;
  };
  
  // Goals and Targets
  goals: {
    id: number;
    title: string;
    description: string;
    targetDate: string;
    progress: number;
    status: 'on-track' | 'behind' | 'ahead' | 'completed';
    subject?: string;
  }[];
  
  // Recent Achievements
  achievements: {
    title: string;
    description: string;
    date: string;
    type: 'academic' | 'behavior' | 'participation' | 'improvement';
    icon: string;
  }[];
}

export default function ProgressPage() {
  const [selectedChild, setSelectedChild] = useState<number>(1);
  const [selectedTimeframe, setSelectedTimeframe] = useState("term");
  const [selectedView, setSelectedView] = useState<'overview' | 'subjects' | 'goals'>('overview');

  // Sample progress data
  const progressData: ProgressData[] = [
    {
      studentId: 1,
      name: "Kwame Mensah",
      class: "JHS 2",
      overallGPA: 3.4,
      previousGPA: 3.1,
      targetGPA: 3.6,
      classRank: 8,
      previousRank: 12,
      totalStudents: 45,
      
      subjects: [
        {
          name: "Mathematics",
          currentGrade: 85,
          previousGrade: 78,
          target: 88,
          trend: "up",
          monthlyScores: [
            { month: "Sep", score: 72 },
            { month: "Oct", score: 78 },
            { month: "Nov", score: 85 }
          ],
          strengths: ["Problem solving", "Algebra", "Logical thinking"],
          improvements: ["Word problems", "Speed", "Geometry"]
        },
        {
          name: "English",
          currentGrade: 78,
          previousGrade: 75,
          target: 82,
          trend: "up",
          monthlyScores: [
            { month: "Sep", score: 73 },
            { month: "Oct", score: 75 },
            { month: "Nov", score: 78 }
          ],
          strengths: ["Reading comprehension", "Creative writing"],
          improvements: ["Grammar", "Vocabulary", "Essay structure"]
        },
        {
          name: "Science",
          currentGrade: 82,
          previousGrade: 80,
          target: 85,
          trend: "up",
          monthlyScores: [
            { month: "Sep", score: 77 },
            { month: "Oct", score: 80 },
            { month: "Nov", score: 82 }
          ],
          strengths: ["Practical work", "Scientific method", "Data analysis"],
          improvements: ["Theory memorization", "Report writing"]
        },
        {
          name: "Social Studies",
          currentGrade: 75,
          previousGrade: 78,
          target: 80,
          trend: "down",
          monthlyScores: [
            { month: "Sep", score: 80 },
            { month: "Oct", score: 78 },
            { month: "Nov", score: 75 }
          ],
          strengths: ["Historical knowledge", "Map reading"],
          improvements: ["Essay writing", "Current affairs", "Research skills"]
        }
      ],
      
      performanceMetrics: {
        academicGrowth: 85,
        effortLevel: 78,
        participationScore: 82,
        homeworkCompletion: 90,
        testPerformance: 81
      },
      
      goals: [
        {
          id: 1,
          title: "Achieve 88% in Mathematics",
          description: "Focus on geometry and word problems to reach target grade",
          targetDate: "2025-12-15",
          progress: 75,
          status: "on-track",
          subject: "Mathematics"
        },
        {
          id: 2,
          title: "Improve Essay Writing",
          description: "Practice essay structure and vocabulary expansion",
          targetDate: "2025-11-30",
          progress: 60,
          status: "behind",
          subject: "English"
        },
        {
          id: 3,
          title: "Perfect Attendance",
          description: "Maintain 100% attendance for the term",
          targetDate: "2025-12-20",
          progress: 95,
          status: "on-track"
        }
      ],
      
      achievements: [
        {
          title: "Mathematics Excellence",
          description: "Scored highest in algebra test",
          date: "2025-11-03",
          type: "academic",
          icon: "🏆"
        },
        {
          title: "Perfect Week Attendance",
          description: "Full attendance for 2 consecutive weeks",
          date: "2025-10-30",
          type: "behavior",
          icon: "⭐"
        },
        {
          title: "Science Project Leader",
          description: "Led team to win science fair competition",
          date: "2025-10-25",
          type: "participation",
          icon: "🔬"
        },
        {
          title: "Most Improved",
          description: "Biggest improvement in monthly assessment",
          date: "2025-10-20",
          type: "improvement",
          icon: "📈"
        }
      ]
    }
  ];

  const selectedStudentData = progressData.find(student => student.studentId === selectedChild);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800 border-green-200';
      case 'ahead': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'behind': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAchievementTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'behavior': return 'bg-green-100 text-green-800';
      case 'participation': return 'bg-purple-100 text-purple-800';
      case 'improvement': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 95) return "text-green-600";
    if (percentage >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  // Simple chart simulation (in a real app, you'd use a charting library)
  const SimpleLineChart = ({ data, color = "blue" }: { data: { month: string; score: number }[], color?: string }) => (
    <div className="h-24 flex items-end space-x-2">
      {data.map((point, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div 
            className={`w-full bg-${color}-500 rounded-t`}
            style={{ height: `${(point.score / 100) * 80}px` }}
          ></div>
          <span className="text-xs text-gray-600 mt-1">{point.month}</span>
        </div>
      ))}
    </div>
  );

  const children = [
    { id: 1, name: "Kwame Mensah", class: "JHS 2" },
    { id: 2, name: "Ama Mensah", class: "Primary 5" }
  ];

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 lg:w-10 lg:h-10" />
              Progress Analytics
            </h1>
            <p className="text-purple-100 text-sm lg:text-base xl:text-lg">
              Track academic growth, achievements, and goal progress over time
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <button className="bg-white text-purple-600 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Download className="w-4 h-4 lg:w-5 lg:h-5" />
              Export Analytics
            </button>
            <button className="bg-purple-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-purple-400 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Target className="w-4 h-4 lg:w-5 lg:h-5" />
              Set New Goals
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
              <Calendar className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Period:</label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="term">Current Term</option>
                <option value="year">Academic Year</option>
                <option value="quarter">Last Quarter</option>
              </select>
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedView('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'overview' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedView('subjects')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'subjects' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Subjects
            </button>
            <button
              onClick={() => setSelectedView('goals')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'goals' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Goals
            </button>
          </div>
        </div>
      </div>

      {selectedStudentData && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Overall GPA</h3>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {selectedStudentData.overallGPA}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +{(selectedStudentData.overallGPA - selectedStudentData.previousGPA).toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">from {selectedStudentData.previousGPA}</span>
              </div>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Class Rank</h3>
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                #{selectedStudentData.classRank}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{selectedStudentData.previousRank - selectedStudentData.classRank}
                </span>
                <span className="text-xs text-gray-500">positions</span>
              </div>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Academic Growth</h3>
                <LineChart className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">
                {selectedStudentData.performanceMetrics.academicGrowth}%
              </div>
              <p className="text-xs text-gray-600">Growth rate</p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Goals Progress</h3>
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-1">
                {Math.round(selectedStudentData.goals.reduce((sum, goal) => sum + goal.progress, 0) / selectedStudentData.goals.length)}%
              </div>
              <p className="text-xs text-gray-600">Average progress</p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Achievements</h3>
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-yellow-600 mb-1">
                {selectedStudentData.achievements.length}
              </div>
              <p className="text-xs text-gray-600">This term</p>
            </div>
          </div>

          {/* Main Content */}
          {selectedView === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Performance Metrics */}
              <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
                
                <div className="space-y-4">
                  {Object.entries(selectedStudentData.performanceMetrics).map(([metric, value]) => (
                    <div key={metric} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium">{value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            value >= 85 ? 'bg-green-500' :
                            value >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h2>
                
                <div className="space-y-4">
                  {selectedStudentData.achievements.slice(0, 4).map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAchievementTypeColor(achievement.type)}`}>
                            {achievement.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(achievement.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'subjects' && (
            <div className="space-y-6">
              {selectedStudentData.subjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                      <h3 className="text-xl font-semibold text-gray-900">{subject.name}</h3>
                      {getTrendIcon(subject.trend)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Current: <strong className={getGradeColor(subject.currentGrade, subject.target)}>{subject.currentGrade}%</strong></span>
                      <span>Target: <strong>{subject.target}%</strong></span>
                      <span>Progress: <strong>{Math.round((subject.currentGrade / subject.target) * 100)}%</strong></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Progress Chart */}
                    <div className="lg:col-span-2">
                      <h4 className="text-sm font-semibold text-gray-900 mb-4">Progress Over Time</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <SimpleLineChart data={subject.monthlyScores} color="blue" />
                      </div>
                      
                      {/* Target Line */}
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                        <span>Target: {subject.target}%</span>
                        <span className={`font-medium ${
                          subject.currentGrade >= subject.target ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {subject.currentGrade >= subject.target ? 'Target Achieved!' : `${subject.target - subject.currentGrade}% to go`}
                        </span>
                      </div>
                    </div>

                    {/* Strengths & Improvements */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Strengths
                        </h4>
                        <div className="space-y-1">
                          {subject.strengths.map((strength, idx) => (
                            <span key={idx} className="block text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-orange-900 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Areas for Growth
                        </h4>
                        <div className="space-y-1">
                          {subject.improvements.map((improvement, idx) => (
                            <span key={idx} className="block text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                              {improvement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedView === 'goals' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Academic Goals</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4" />
                    Add New Goal
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {selectedStudentData.goals.map((goal) => (
                    <div key={goal.id} className="border border-gray-200 rounded-lg p-4 lg:p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{goal.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                          {goal.subject && (
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {goal.subject}
                            </span>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(goal.status)}`}>
                          {goal.status.replace('-', ' ')}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                goal.status === 'completed' ? 'bg-green-500' :
                                goal.status === 'on-track' ? 'bg-blue-500' :
                                goal.status === 'ahead' ? 'bg-purple-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Target Date:</span>
                          <span className="font-medium">
                            {new Date(goal.targetDate).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${
                            new Date(goal.targetDate) > new Date() ? 'text-gray-600' : 'text-red-600'
                          }`}>
                            {new Date(goal.targetDate) > new Date() 
                              ? `${Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left`
                              : 'Overdue'
                            }
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
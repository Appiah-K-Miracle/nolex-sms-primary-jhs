"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Star,
  BarChart3,
  PieChart,
  User,
  MessageSquare,
  Phone,
  Mail,
  Eye,
  Edit3,
  Download,
  FileText,
  Award,
  Lightbulb,
  Users,
  Activity,
  Filter,
  RefreshCw,
  ChevronRight,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  MinusCircle
} from "lucide-react";

export default function ProgressDetailPage() {
  const params = useParams();
  const progressId = params.id as string;
  
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("current_term");

  // Sample progress record data
  const progressRecord = {
    id: parseInt(progressId),
    student: {
      name: "Kwame Mensah",
      class: "JHS 2A",
      studentId: "STU001",
      photo: "/images/students/student1.jpg"
    },
    period: {
      current: "Term 1, 2025",
      academicYear: "2024-2025"
    },
    overallProgress: {
      currentGPA: 3.2,
      previousGPA: 2.8,
      percentageImprovement: 14.3,
      classRank: 8,
      totalStudents: 32,
      overallGrade: "B+",
      status: "Improving",
      targetGPA: 3.5
    },
    subjectProgress: [
      {
        subject: "Mathematics",
        teacher: "Mr. Asante",
        currentGrade: "B+",
        previousGrade: "B",
        improvement: "+5%",
        status: "improving",
        score: 78.5,
        target: 85,
        effort: "Excellent",
        conduct: "Good",
        comments: "Shows excellent understanding of algebraic concepts. Needs to work on word problems."
      },
      {
        subject: "English Language",
        teacher: "Mrs. Osei",
        currentGrade: "A-",
        previousGrade: "B+",
        improvement: "+8%",
        status: "improving",
        score: 82.3,
        target: 85,
        effort: "Very Good",
        conduct: "Excellent",
        comments: "Outstanding improvement in essay writing. Continue building vocabulary."
      },
      {
        subject: "Science",
        teacher: "Mr. Boateng",
        currentGrade: "B",
        previousGrade: "B+",
        improvement: "-3%",
        status: "declining",
        score: 75.8,
        target: 80,
        effort: "Good",
        conduct: "Fair",
        comments: "Needs more practice with laboratory procedures. Theory understanding is solid."
      },
      {
        subject: "Social Studies",
        teacher: "Mrs. Adjei",
        currentGrade: "B+",
        previousGrade: "B",
        improvement: "+6%",
        status: "improving",
        score: 79.2,
        target: 82,
        effort: "Very Good",
        conduct: "Excellent",
        comments: "Great engagement in class discussions. Continue with current study habits."
      },
      {
        subject: "RME",
        teacher: "Rev. Mensah",
        currentGrade: "A",
        previousGrade: "A-",
        improvement: "+4%",
        status: "improving",
        score: 88.5,
        target: 90,
        effort: "Excellent",
        conduct: "Excellent",
        comments: "Excellent moral understanding and application. Keep up the good work."
      },
      {
        subject: "ICT",
        teacher: "Mr. Darko",
        currentGrade: "B-",
        previousGrade: "C+",
        improvement: "+12%",
        status: "improving",
        score: 70.4,
        target: 78,
        effort: "Good",
        conduct: "Good",
        comments: "Significant improvement in programming skills. Practice more typing speed."
      }
    ],
    goals: [
      {
        id: 1,
        category: "Academic",
        title: "Improve Mathematics Score",
        description: "Achieve 85% or above in Mathematics by end of term",
        target: 85,
        current: 78.5,
        progress: 92.4,
        status: "on_track",
        deadline: "2025-12-15",
        strategies: [
          "Complete extra practice problems daily",
          "Attend after-school tutoring sessions",
          "Form study group with classmates"
        ]
      },
      {
        id: 2,
        category: "Academic",
        title: "Maintain English Excellence",
        description: "Maintain A- grade or above in English Language",
        target: 85,
        current: 82.3,
        progress: 96.8,
        status: "achieved",
        deadline: "2025-12-15",
        strategies: [
          "Read one novel per month",
          "Practice essay writing weekly",
          "Expand vocabulary with 10 new words daily"
        ]
      },
      {
        id: 3,
        category: "Behavioral",
        title: "Improve Science Lab Participation",
        description: "Actively participate in all science laboratory sessions",
        target: 100,
        current: 75,
        progress: 75,
        status: "needs_attention",
        deadline: "2025-11-30",
        strategies: [
          "Prepare for lab sessions in advance",
          "Ask questions during experiments",
          "Practice safety procedures"
        ]
      },
      {
        id: 4,
        category: "Personal",
        title: "Time Management",
        description: "Submit all assignments on time consistently",
        target: 100,
        current: 95,
        progress: 95,
        status: "on_track",
        deadline: "2025-12-15",
        strategies: [
          "Use assignment planner daily",
          "Set reminders for due dates",
          "Complete assignments 1 day early"
        ]
      }
    ],
    skillsDevelopment: {
      academic: {
        criticalThinking: 78,
        problemSolving: 82,
        research: 75,
        communication: 85,
        collaboration: 80
      },
      personal: {
        leadership: 70,
        timeManagement: 88,
        selfDiscipline: 85,
        adaptability: 75,
        creativity: 80
      },
      social: {
        teamwork: 90,
        empathy: 85,
        conflictResolution: 70,
        culturalAwareness: 88,
        communityService: 75
      }
    },
    attendanceImpact: {
      totalDays: 68,
      present: 65,
      absent: 3,
      attendanceRate: 95.6,
      impactOnGrades: "Minimal",
      concernLevel: "Low"
    },
    parentEngagement: {
      lastMeeting: "2025-10-15",
      upcomingMeeting: "2025-11-20",
      communicationFrequency: "Weekly",
      homeworkSupport: "High",
      extracurricularSupport: "Medium"
    },
    recommendations: [
      {
        type: "academic",
        priority: "high",
        subject: "Science",
        title: "Increase Laboratory Engagement",
        description: "Student needs to be more active during science laboratory sessions",
        action: "Schedule meeting with science teacher to discuss lab participation strategies",
        timeline: "Within 1 week"
      },
      {
        type: "academic",
        priority: "medium",
        subject: "Mathematics",
        title: "Maintain Current Momentum",
        description: "Continue with current study habits to reach target score",
        action: "Keep attending after-school tutoring and complete daily practice",
        timeline: "Ongoing"
      },
      {
        type: "personal",
        priority: "low",
        subject: "General",
        title: "Leadership Development",
        description: "Consider opportunities to develop leadership skills",
        action: "Explore class representative or club leadership positions",
        timeline: "Next term"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'improving': return 'text-green-700 bg-green-100 border-green-200';
      case 'declining': return 'text-red-700 bg-red-100 border-red-200';
      case 'stable': return 'text-blue-700 bg-blue-100 border-blue-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'achieved': return 'text-green-700 bg-green-100 border-green-200';
      case 'on_track': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'needs_attention': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'at_risk': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getImprovementIcon = (improvement: string) => {
    if (improvement.startsWith('+')) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (improvement.startsWith('-')) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return <MinusCircle className="w-4 h-4 text-gray-600" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-700 bg-red-100 border-red-200';
      case 'medium': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'low': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getProgressBarColor = (progress: number, status: string) => {
    if (status === 'achieved') return 'bg-green-600';
    if (status === 'on_track' && progress >= 70) return 'bg-blue-600';
    if (status === 'needs_attention') return 'bg-orange-600';
    return 'bg-red-600';
  };

  const getSkillLevel = (score: number) => {
    if (score >= 85) return { level: 'Excellent', color: 'text-green-700 bg-green-100' };
    if (score >= 75) return { level: 'Good', color: 'text-blue-700 bg-blue-100' };
    if (score >= 65) return { level: 'Satisfactory', color: 'text-orange-700 bg-orange-100' };
    return { level: 'Needs Improvement', color: 'text-red-700 bg-red-100' };
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/parent/academics/progress"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{progressRecord.student.name}</h1>
              <p className="text-gray-600">
                {progressRecord.student.class} • Student ID: {progressRecord.student.studentId}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/parent/academics/progress/${progressId}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            <span className="hidden sm:inline">Edit Goals</span>
          </Link>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Overall Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg lg:rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Current GPA</h3>
            <BarChart3 className="w-5 h-5 opacity-80" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{progressRecord.overallProgress.currentGPA}</span>
            <span className="text-sm opacity-80">/ 4.0</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm opacity-90">
            <TrendingUp className="w-4 h-4" />
            <span>+{progressRecord.overallProgress.percentileImprovement}% from last term</span>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Class Rank</h3>
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{progressRecord.overallProgress.classRank}</span>
            <span className="text-sm text-gray-600">of {progressRecord.overallProgress.totalStudents}</span>
          </div>
          <div className="mt-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(progressRecord.overallProgress.status.toLowerCase())}`}>
              {progressRecord.overallProgress.status}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Target Progress</h3>
            <Target className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{progressRecord.overallProgress.targetGPA}</span>
            <span className="text-sm text-gray-600">target</span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(progressRecord.overallProgress.currentGPA / progressRecord.overallProgress.targetGPA) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 mt-1">
              {Math.round((progressRecord.overallProgress.currentGPA / progressRecord.overallProgress.targetGPA) * 100)}% to target
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Attendance Impact</h3>
            <Activity className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{progressRecord.attendanceImpact.attendanceRate}%</span>
          </div>
          <div className="mt-2">
            <span className="text-xs text-gray-600">
              {progressRecord.attendanceImpact.impactOnGrades} impact on grades
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Subject Progress', icon: BookOpen },
              { id: 'goals', name: 'Goals & Targets', icon: Target },
              { id: 'skills', name: 'Skills Development', icon: Star },
              { id: 'recommendations', name: 'Recommendations', icon: Lightbulb }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Subject Progress Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Subject Progress Overview</h2>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="current_term">Current Term</option>
                  <option value="previous_term">Previous Term</option>
                  <option value="year_to_date">Year to Date</option>
                </select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {progressRecord.subjectProgress.map((subject, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{subject.subject}</h3>
                        <p className="text-sm text-gray-600">{subject.teacher}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{subject.currentGrade}</div>
                        <div className="flex items-center gap-1 text-sm">
                          {getImprovementIcon(subject.improvement)}
                          <span className={subject.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                            {subject.improvement}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Current Score:</span>
                        <span className="font-medium">{subject.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${subject.status === 'improving' ? 'bg-green-500' : subject.status === 'declining' ? 'bg-red-500' : 'bg-blue-500'}`}
                          style={{ width: `${(subject.score / 100) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Target:</span>
                        <span className="font-medium">{subject.target}%</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <span className="text-sm text-gray-600">Effort:</span>
                          <span className="block font-medium text-gray-900">{subject.effort}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Conduct:</span>
                          <span className="block font-medium text-gray-900">{subject.conduct}</span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-white rounded border">
                        <p className="text-sm font-medium text-gray-900 mb-1">Teacher Comments:</p>
                        <p className="text-sm text-gray-700">{subject.comments}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Goals & Targets Tab */}
          {activeTab === 'goals' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Academic & Personal Goals</h2>
                <Link
                  href={`/parent/academics/progress/${progressId}/edit`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Goal
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {progressRecord.goals.map((goal) => (
                  <div key={goal.id} className="bg-white border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGoalStatusColor(goal.status)}`}>
                            {goal.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                          <span className="text-xs text-gray-500">{goal.category}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${getProgressBarColor(goal.progress, goal.status)}`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Current / Target:</span>
                        <span className="font-medium">{goal.current} / {goal.target}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Deadline:</span> {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Strategies:</p>
                      <ul className="space-y-1">
                        {goal.strategies.map((strategy, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Development Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Skills Development Assessment</h2>
                <p className="text-gray-600">Comprehensive evaluation of academic, personal, and social skills development</p>
              </div>

              {/* Academic Skills */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Academic Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(progressRecord.skillsDevelopment.academic).map(([skill, score]) => {
                    const skillInfo = getSkillLevel(score);
                    return (
                      <div key={skill} className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900 capitalize">
                            {skill.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${skillInfo.color}`}>
                            {skillInfo.level}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className={`h-2 rounded-full ${score >= 85 ? 'bg-green-500' : score >= 75 ? 'bg-blue-500' : score >= 65 ? 'bg-orange-500' : 'bg-red-500'}`}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{score}/100</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Personal Skills */}
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(progressRecord.skillsDevelopment.personal).map(([skill, score]) => {
                    const skillInfo = getSkillLevel(score);
                    return (
                      <div key={skill} className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900 capitalize">
                            {skill.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${skillInfo.color}`}>
                            {skillInfo.level}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className={`h-2 rounded-full ${score >= 85 ? 'bg-green-500' : score >= 75 ? 'bg-blue-500' : score >= 65 ? 'bg-orange-500' : 'bg-red-500'}`}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{score}/100</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Skills */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Social Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(progressRecord.skillsDevelopment.social).map(([skill, score]) => {
                    const skillInfo = getSkillLevel(score);
                    return (
                      <div key={skill} className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900 capitalize">
                            {skill.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${skillInfo.color}`}>
                            {skillInfo.level}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className={`h-2 rounded-full ${score >= 85 ? 'bg-green-500' : score >= 75 ? 'bg-blue-500' : score >= 65 ? 'bg-orange-500' : 'bg-red-500'}`}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{score}/100</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Teacher & School Recommendations</h2>
                <p className="text-gray-600">Personalized recommendations to support your child's academic and personal growth</p>
              </div>

              <div className="space-y-4">
                {progressRecord.recommendations.map((rec, index) => (
                  <div key={index} className="bg-white border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                              {rec.priority.toUpperCase()} PRIORITY
                            </span>
                            <span className="text-sm text-gray-600">{rec.subject}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="ml-14 space-y-3">
                      <p className="text-gray-700">{rec.description}</p>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-medium text-gray-900 mb-2">Recommended Action:</p>
                        <p className="text-gray-700">{rec.action}</p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Timeline: {rec.timeline}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>Type: {rec.type}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Schedule Meeting
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Mark as Addressed
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Parent Engagement Summary */}
      <div className="bg-blue-50 rounded-lg lg:rounded-xl border border-blue-200 p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">Parent Engagement Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{progressRecord.parentEngagement.communicationFrequency}</div>
            <div className="text-sm text-blue-700">Communication Frequency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{progressRecord.parentEngagement.homeworkSupport}</div>
            <div className="text-sm text-blue-700">Homework Support Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">
              {new Date(progressRecord.parentEngagement.lastMeeting).toLocaleDateString()}
            </div>
            <div className="text-sm text-blue-700">Last Meeting</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">
              {new Date(progressRecord.parentEngagement.upcomingMeeting).toLocaleDateString()}
            </div>
            <div className="text-sm text-blue-700">Next Meeting</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <MessageSquare className="w-6 h-6 text-blue-600 mb-2" />
            <div className="font-medium text-gray-900">Message Teachers</div>
            <div className="text-sm text-gray-600">Send a message to all subject teachers</div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Calendar className="w-6 h-6 text-green-600 mb-2" />
            <div className="font-medium text-gray-900">Schedule Meeting</div>
            <div className="text-sm text-gray-600">Book a parent-teacher conference</div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <FileText className="w-6 h-6 text-purple-600 mb-2" />
            <div className="font-medium text-gray-900">View Full Report</div>
            <div className="text-sm text-gray-600">Download comprehensive progress report</div>
          </button>
        </div>
      </div>
    </div>
  );
}
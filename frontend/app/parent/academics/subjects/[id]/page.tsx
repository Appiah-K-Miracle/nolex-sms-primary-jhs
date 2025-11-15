"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft,
  BookOpen,
  User,
  Clock,
  Calendar,
  Target,
  TrendingUp,
  Award,
  Star,
  AlertCircle,
  CheckCircle,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Share2,
  Bell,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  FileText,
  Video,
  Headphones,
  Image,
  ExternalLink,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Bookmark,
  Heart,
  Eye,
  ThumbsUp,
  Calculator,
  Beaker,
  Globe,
  Palette,
  Music,
  Zap,
  Edit,
  Plus,
  Filter,
  Search,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Settings,
  Lightbulb,
  GraduationCap,
  Timer,
  Users,
  Presentation
} from "lucide-react";

interface SubjectDetailsProps {
  params: {
    id: string;
  };
}

export default function SubjectDetailsPage({ params }: SubjectDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [expandedSection, setExpandedSection] = useState("");

  // Sample subject data (in real app, this would be fetched based on params.id)
  const subjectData = {
    id: params.id,
    name: "Mathematics",
    icon: Calculator,
    color: "blue",
    category: "core",
    difficulty: "intermediate",
    description: "Comprehensive study of numbers, shapes, patterns, and mathematical reasoning through problem-solving and logical thinking.",
    fullDescription: "Mathematics is a fundamental subject that develops critical thinking, problem-solving skills, and logical reasoning. Our curriculum covers arithmetic, algebra, geometry, statistics, and basic calculus concepts appropriate for the grade level. Students engage in both theoretical understanding and practical applications of mathematical concepts.",
    childId: "1",
    childName: "Kwame Mensah",
    childClass: "Primary 6A",
    teacher: {
      name: "Mr. Osei",
      email: "osei@nolexsms.edu.gh",
      phone: "+233 24 123 4567",
      office: "Math Department, Block A",
      qualifications: "BSc Mathematics Education, MSc Applied Mathematics",
      experience: "8 years teaching experience",
      avatar: "/images/teachers/osei.jpg",
      subjects: ["Mathematics", "Statistics"],
      officeHours: "Mon-Fri: 2:00 PM - 4:00 PM"
    },
    schedule: [
      { day: "Monday", time: "8:00 AM - 8:40 AM", room: "Class 6A" },
      { day: "Wednesday", time: "8:00 AM - 8:40 AM", room: "Class 6A" },
      { day: "Friday", time: "8:00 AM - 8:40 AM", room: "Class 6A" }
    ],
    currentGrade: "A-",
    averageScore: 85,
    totalLessons: 45,
    completedLessons: 32,
    attendanceRate: 96,
    studyTime: "4.5 hrs/week",
    progress: 71,
    upcomingAssignments: 3,
    
    // Detailed Performance Data
    gradeHistory: [
      { period: "Term 1", grade: "B+", score: 82, trend: "up" },
      { period: "Term 2", grade: "A-", score: 85, trend: "up" },
      { period: "Current", grade: "A-", score: 85, trend: "stable" }
    ],
    
    assessmentBreakdown: [
      { type: "Tests", count: 8, average: 87, weight: 40 },
      { type: "Assignments", count: 15, average: 83, weight: 30 },
      { type: "Projects", count: 3, average: 90, weight: 20 },
      { type: "Participation", count: 25, average: 85, weight: 10 }
    ],
    
    topicPerformance: [
      { topic: "Algebra", score: 92, status: "excellent", lessons: 8 },
      { topic: "Geometry", score: 88, status: "good", lessons: 6 },
      { topic: "Statistics", score: 75, status: "needs_work", lessons: 4 },
      { topic: "Word Problems", score: 70, status: "needs_work", lessons: 5 },
      { topic: "Fractions", score: 90, status: "excellent", lessons: 7 }
    ],
    
    strengths: [
      "Problem-solving techniques",
      "Algebraic manipulation",
      "Geometric reasoning",
      "Pattern recognition",
      "Mathematical communication"
    ],
    
    improvements: [
      "Word problem interpretation",
      "Statistical analysis",
      "Speed in calculations",
      "Graph interpretation"
    ],
    
    // Learning Resources
    resources: {
      textbooks: [
        { 
          title: "Primary Mathematics 6A", 
          author: "Singapore Math", 
          type: "textbook",
          progress: 75,
          chapters: 12,
          completedChapters: 9,
          lastAccessed: "2025-11-14"
        },
        { 
          title: "Math Practice Workbook", 
          author: "Ghana Education Service", 
          type: "workbook",
          progress: 68,
          chapters: 10,
          completedChapters: 7,
          lastAccessed: "2025-11-13"
        }
      ],
      videos: [
        {
          title: "Introduction to Algebra",
          duration: "15:32",
          completed: true,
          views: 3,
          rating: 4.8,
          lastWatched: "2025-11-12"
        },
        {
          title: "Solving Linear Equations",
          duration: "22:15", 
          completed: true,
          views: 2,
          rating: 4.9,
          lastWatched: "2025-11-10"
        },
        {
          title: "Geometry Basics",
          duration: "18:45",
          completed: false,
          views: 1,
          rating: 4.7,
          lastWatched: "2025-11-08"
        }
      ],
      worksheets: [
        {
          title: "Algebraic Expressions Practice",
          questions: 25,
          completed: 20,
          score: 88,
          timeSpent: "45 mins",
          dueDate: "2025-11-18"
        },
        {
          title: "Geometry Problem Set",
          questions: 15,
          completed: 15,
          score: 92,
          timeSpent: "35 mins",
          dueDate: "2025-11-15"
        }
      ],
      interactive: [
        {
          title: "Math Game: Fraction Master",
          type: "game",
          playtime: "2.5 hours",
          level: "Advanced",
          score: 1250,
          lastPlayed: "2025-11-13"
        },
        {
          title: "Graphing Calculator Simulator",
          type: "tool",
          uses: 15,
          lastUsed: "2025-11-14"
        }
      ]
    },
    
    // Recent Activities
    recentActivities: [
      {
        id: 1,
        type: "assignment",
        title: "Algebraic Expressions Homework",
        date: "2025-11-14",
        score: 88,
        status: "graded",
        feedback: "Excellent work on simplifying expressions. Work on word problems."
      },
      {
        id: 2,
        type: "test",
        title: "Geometry Unit Test",
        date: "2025-11-12",
        score: 92,
        status: "graded",
        feedback: "Outstanding understanding of geometric principles."
      },
      {
        id: 3,
        type: "lesson",
        title: "Introduction to Statistics",
        date: "2025-11-11",
        status: "attended",
        participation: "active"
      },
      {
        id: 4,
        type: "project",
        title: "Math in Real Life Presentation",
        date: "2025-11-09",
        score: 90,
        status: "completed",
        feedback: "Creative presentation with good mathematical reasoning."
      }
    ],
    
    // Upcoming Events
    upcomingEvents: [
      {
        type: "test",
        title: "Statistics Quiz",
        date: "2025-11-18",
        time: "8:00 AM",
        topics: ["Mean, Median, Mode", "Data Interpretation"]
      },
      {
        type: "assignment",
        title: "Word Problems Worksheet",
        dueDate: "2025-11-20",
        status: "not_started"
      },
      {
        type: "project",
        title: "Geometry Art Project",
        dueDate: "2025-11-25",
        status: "in_progress"
      }
    ],
    
    // Communication History
    communications: [
      {
        date: "2025-11-10",
        type: "message",
        from: "Mr. Osei",
        subject: "Excellent Progress",
        message: "Kwame is showing excellent progress in algebra. Keep up the good work!"
      },
      {
        date: "2025-11-05",
        type: "note",
        from: "Mr. Osei", 
        subject: "Assignment Reminder",
        message: "Please remind Kwame to complete the geometry worksheet by Friday."
      }
    ]
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      pink: "from-pink-500 to-pink-600",
      red: "from-red-500 to-red-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600 bg-green-50";
      case "good": return "text-blue-600 bg-blue-50";
      case "needs_work": return "text-orange-600 bg-orange-50";
      case "poor": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down": return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getColorClasses(subjectData.color)} rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white`}>
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/parent/academics/subjects"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <subjectData.icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">{subjectData.name}</h1>
              <p className="text-blue-100 text-sm lg:text-base">
                {subjectData.childName} • {subjectData.childClass}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{subjectData.currentGrade}</div>
            <div className="text-sm text-blue-100">Current Grade</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{subjectData.averageScore}%</div>
            <div className="text-sm text-blue-100">Average Score</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{subjectData.progress}%</div>
            <div className="text-sm text-blue-100">Progress</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{subjectData.attendanceRate}%</div>
            <div className="text-sm text-blue-100">Attendance</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex flex-wrap border-b border-gray-200">
          {[
            { id: "overview", label: "Overview", icon: Eye },
            { id: "performance", label: "Performance", icon: BarChart3 },
            { id: "resources", label: "Resources", icon: BookOpen },
            { id: "activities", label: "Activities", icon: Activity },
            { id: "communication", label: "Communication", icon: MessageSquare }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 lg:p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Subject Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Subject</h3>
                <p className="text-gray-600 leading-relaxed">{subjectData.fullDescription}</p>
              </div>

              {/* Teacher Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Teacher Information</h3>
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{subjectData.teacher.name}</h4>
                    <p className="text-gray-600 mb-3">{subjectData.teacher.qualifications}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{subjectData.teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{subjectData.teacher.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{subjectData.teacher.office}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{subjectData.teacher.officeHours}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Link
                        href={`mailto:${subjectData.teacher.email}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Send Message
                      </Link>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                        Schedule Meeting
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Class Schedule */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Class Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {subjectData.schedule.map((session, index) => (
                    <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="font-semibold text-blue-900">{session.day}</div>
                      <div className="text-blue-700">{session.time}</div>
                      <div className="text-sm text-blue-600">{session.room}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Learning Objectives</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {subjectData.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-900 mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-600" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {subjectData.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {subjectData.upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        event.type === 'test' ? 'bg-red-100' : 
                        event.type === 'assignment' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        {event.type === 'test' && <Target className="w-6 h-6 text-red-600" />}
                        {event.type === 'assignment' && <FileText className="w-6 h-6 text-blue-600" />}
                        {event.type === 'project' && <Presentation className="w-6 h-6 text-green-600" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <div className="text-sm text-gray-600">
                          {event.date && `${event.date}${event.time ? ` at ${event.time}` : ''}`}
                          {event.dueDate && `Due: ${event.dueDate}`}
                        </div>
                        {event.topics && (
                          <div className="text-sm text-gray-500 mt-1">
                            Topics: {event.topics.join(", ")}
                          </div>
                        )}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'not_started' ? 'bg-gray-100 text-gray-700' :
                        event.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {event.status?.replace('_', ' ') || 'Scheduled'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === "performance" && (
            <div className="space-y-8">
              {/* Grade History */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Grade History</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {subjectData.gradeHistory.map((period, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                      <h4 className="font-semibold text-gray-900 mb-2">{period.period}</h4>
                      <div className="text-3xl font-bold text-blue-600 mb-1">{period.grade}</div>
                      <div className="text-sm text-gray-600 mb-3">{period.score}%</div>
                      <div className="flex items-center justify-center gap-1">
                        {getTrendIcon(period.trend)}
                        <span className="text-sm text-gray-500 capitalize">{period.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment Breakdown */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Assessment Breakdown</h3>
                <div className="space-y-4">
                  {subjectData.assessmentBreakdown.map((assessment, index) => (
                    <div key={index} className="bg-white border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">{assessment.type}</h4>
                        <span className="text-sm text-gray-500">{assessment.weight}% of grade</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{assessment.count}</div>
                          <div className="text-sm text-gray-500">Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{assessment.average}%</div>
                          <div className="text-sm text-gray-500">Average Score</div>
                        </div>
                        <div className="text-center">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${getProgressColor(assessment.average)}`}
                              style={{ width: `${assessment.average}%` }}
                            />
                          </div>
                          <div className="text-sm text-gray-500 mt-1">Performance</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topic Performance */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Topic Performance</h3>
                <div className="space-y-3">
                  {subjectData.topicPerformance.map((topic, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{topic.topic}</h4>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(topic.status)}`}>
                            {topic.status.replace('_', ' ')}
                          </span>
                          <span className="text-lg font-bold text-gray-900">{topic.score}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(topic.score)}`}
                              style={{ width: `${topic.score}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{topic.lessons} lessons</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <div className="space-y-8">
              {/* Textbooks */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Textbooks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjectData.resources.textbooks.map((book, index) => (
                    <div key={index} className="bg-white border rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{book.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{book.completedChapters}/{book.chapters} chapters</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${book.progress}%` }}
                              />
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Last accessed: {book.lastAccessed}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Videos */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Educational Videos</h3>
                <div className="space-y-4">
                  {subjectData.resources.videos.map((video, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Video className="w-8 h-8 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{video.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span>{video.duration}</span>
                            <span>Watched {video.views} times</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{video.rating}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Last watched: {video.lastWatched}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {video.completed && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                            <Play className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Worksheets */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Practice Worksheets</h3>
                <div className="space-y-4">
                  {subjectData.resources.worksheets.map((worksheet, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{worksheet.title}</h4>
                        <span className="text-lg font-bold text-green-600">{worksheet.score}%</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Questions:</span>
                          <div className="font-medium">{worksheet.completed}/{worksheet.questions}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Time Spent:</span>
                          <div className="font-medium">{worksheet.timeSpent}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Due Date:</span>
                          <div className="font-medium">{worksheet.dueDate}</div>
                        </div>
                        <div className="flex justify-end">
                          <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-xs font-medium hover:bg-blue-200 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Resources */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactive Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjectData.resources.interactive.map((resource, index) => (
                    <div key={index} className="bg-white border rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Zap className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                          <p className="text-sm text-gray-600 mb-3 capitalize">{resource.type}</p>
                          <div className="space-y-2 text-sm">
                            {resource.playtime && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Playtime:</span>
                                <span className="font-medium">{resource.playtime}</span>
                              </div>
                            )}
                            {resource.score && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">High Score:</span>
                                <span className="font-medium">{resource.score}</span>
                              </div>
                            )}
                            {resource.uses && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Uses:</span>
                                <span className="font-medium">{resource.uses}</span>
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-3">
                            Last used: {resource.lastUsed || resource.lastPlayed}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === "activities" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Recent Activities</h3>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Activities</option>
                    <option value="assignments">Assignments</option>
                    <option value="tests">Tests</option>
                    <option value="lessons">Lessons</option>
                  </select>
                  <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {subjectData.recentActivities.map((activity) => (
                  <div key={activity.id} className="bg-white border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        activity.type === 'assignment' ? 'bg-blue-100' :
                        activity.type === 'test' ? 'bg-red-100' :
                        activity.type === 'lesson' ? 'bg-green-100' :
                        'bg-purple-100'
                      }`}>
                        {activity.type === 'assignment' && <FileText className="w-6 h-6 text-blue-600" />}
                        {activity.type === 'test' && <Target className="w-6 h-6 text-red-600" />}
                        {activity.type === 'lesson' && <BookOpen className="w-6 h-6 text-green-600" />}
                        {activity.type === 'project' && <Presentation className="w-6 h-6 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                            <p className="text-sm text-gray-600">{activity.date}</p>
                          </div>
                          <div className="text-right">
                            {activity.score && (
                              <div className="text-lg font-bold text-green-600">{activity.score}%</div>
                            )}
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              activity.status === 'graded' ? 'bg-green-100 text-green-800' :
                              activity.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              activity.status === 'attended' ? 'bg-gray-100 text-gray-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {activity.status}
                            </div>
                          </div>
                        </div>
                        {activity.feedback && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                            <h5 className="font-medium text-blue-900 mb-1">Teacher Feedback</h5>
                            <p className="text-sm text-blue-800">{activity.feedback}</p>
                          </div>
                        )}
                        {activity.participation && (
                          <div className="mt-2">
                            <span className="text-sm text-gray-600">Participation: </span>
                            <span className="text-sm font-medium text-green-600 capitalize">{activity.participation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Communication Tab */}
          {activeTab === "communication" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Communications</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Message
                </button>
              </div>

              <div className="space-y-4">
                {subjectData.communications.map((comm, index) => (
                  <div key={index} className="bg-white border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{comm.subject}</h4>
                            <p className="text-sm text-gray-600">From: {comm.from}</p>
                          </div>
                          <div className="text-sm text-gray-500">{comm.date}</div>
                        </div>
                        <p className="text-gray-700">{comm.message}</p>
                        <div className="flex gap-2 mt-4">
                          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition-colors">
                            Reply
                          </button>
                          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition-colors">
                            Forward
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Contact Teacher</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    href={`mailto:${subjectData.teacher.email}`}
                    className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Send Email</div>
                      <div className="text-sm text-gray-600">Direct message</div>
                    </div>
                  </Link>
                  <Link
                    href={`tel:${subjectData.teacher.phone}`}
                    className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Call</div>
                      <div className="text-sm text-gray-600">Voice call</div>
                    </div>
                  </Link>
                  <button className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Schedule</div>
                      <div className="text-sm text-gray-600">Book meeting</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
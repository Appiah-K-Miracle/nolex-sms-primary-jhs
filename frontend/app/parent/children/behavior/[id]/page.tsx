"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { 
  ArrowLeft,
  Award,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  Edit,
  User,
  Calendar,
  FileText,
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  Shield,
  Heart,
  Zap,
  Target,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  BookOpen,
  Activity,
  Phone,
  Mail,
  MapPin,
  Eye,
  MessageSquare,
  Trash2,
  Plus
} from "lucide-react";

export default function ChildBehaviorDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const childId = params.id as string;
  const selectedReportId = searchParams.get('reportId');
  
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("this_month");
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Sample child data
  const childData = childId === "1" ? {
    id: "1",
    name: "Kwame Mensah",
    class: "Primary 6A",
    rollNumber: "P6A-001",
    dateOfBirth: "2012-03-15",
    parent: "Mrs. Akosua Mensah",
    contact: "+233 20 456 7890",
    email: "akosua.mensah@email.com",
    address: "123 Accra Street, Kumasi",
    photo: "/avatars/student1.jpg",
    behavior: {
      overallRating: 4.2,
      totalIncidents: 23,
      positiveReports: 18,
      concerningReports: 5,
      improvementTrend: "positive",
      lastIncident: "2025-11-10",
      strongAreas: ["Academic Performance", "Peer Cooperation", "Problem Solving"],
      improvementAreas: ["Punctuality", "Following Instructions"],
      behaviorPoints: 156,
      rank: "Good Standing",
      consecutivePositiveDays: 8
    }
  } : {
    id: "2",
    name: "Ama Mensah", 
    class: "Primary 4B",
    rollNumber: "P4B-015",
    dateOfBirth: "2014-07-22",
    parent: "Mrs. Akosua Mensah",
    contact: "+233 20 456 7890",
    email: "akosua.mensah@email.com",
    address: "123 Accra Street, Kumasi",
    photo: "/avatars/student2.jpg",
    behavior: {
      overallRating: 4.7,
      totalIncidents: 15,
      positiveReports: 14,
      concerningReports: 1,
      improvementTrend: "positive",
      lastIncident: "2025-10-15",
      strongAreas: ["Leadership", "Helpfulness", "Academic Performance", "Creativity"],
      improvementAreas: ["Noise Level"],
      behaviorPoints: 198,
      rank: "Excellent Standing",
      consecutivePositiveDays: 25
    }
  };

  const behaviorReports = childId === "1" ? [
    {
      id: 1,
      date: "2025-11-14",
      type: "positive",
      category: "academic",
      title: "Excellent Mathematics Performance",
      description: "Showed outstanding problem-solving skills during math class and helped struggling classmates understand complex concepts. Demonstrated leadership and patience.",
      teacher: "Mr. Osei",
      subject: "Mathematics",
      severity: "high",
      points: 10,
      followUpRequired: false,
      parentNotified: true,
      witnesses: ["Ms. Adjei", "Student Helper"],
      timeOfIncident: "10:30 AM",
      location: "Mathematics Classroom",
      interventions: [],
      photos: []
    },
    {
      id: 2,
      date: "2025-11-12",
      type: "concern",
      category: "behavioral",
      title: "Late Assignment Submission",
      description: "Assignment submitted two days late without proper communication. When questioned, student was defensive and made excuses rather than taking responsibility.",
      teacher: "Ms. Oppong",
      subject: "English",
      severity: "low",
      points: -3,
      followUpRequired: true,
      parentNotified: true,
      witnesses: [],
      timeOfIncident: "2:15 PM",
      location: "English Classroom",
      interventions: ["Parent meeting scheduled", "Study schedule review"],
      photos: []
    },
    {
      id: 3,
      date: "2025-11-10",
      type: "positive",
      category: "social",
      title: "Peer Mediation Success",
      description: "Successfully mediated a conflict between two classmates during break time. Showed excellent communication skills and helped both parties reach a peaceful resolution.",
      teacher: "Mr. Adjei",
      subject: "General",
      severity: "medium",
      points: 8,
      followUpRequired: false,
      parentNotified: true,
      witnesses: ["Mrs. Asante", "Playground supervisor"],
      timeOfIncident: "12:45 PM",
      location: "School Playground",
      interventions: [],
      photos: []
    },
    {
      id: 4,
      date: "2025-11-08",
      type: "neutral",
      category: "academic",
      title: "Science Lab Participation",
      description: "Participated adequately in science experiment but could have been more proactive in asking questions and engaging with the material. Shows understanding but lacks enthusiasm.",
      teacher: "Dr. Mensah",
      subject: "Science",
      severity: "low",
      points: 2,
      followUpRequired: false,
      parentNotified: false,
      witnesses: [],
      timeOfIncident: "11:00 AM",
      location: "Science Laboratory",
      interventions: [],
      photos: []
    }
  ] : [
    {
      id: 5,
      date: "2025-11-13",
      type: "positive",
      category: "leadership",
      title: "Outstanding Class Leadership",
      description: "Led the class environmental project with exceptional organizational skills. Motivated all classmates to participate and achieved 100% participation in the tree planting initiative.",
      teacher: "Mrs. Asante",
      subject: "Environmental Studies",
      severity: "high",
      points: 12,
      followUpRequired: false,
      parentNotified: true,
      witnesses: ["Mr. Osei", "Class Monitor"],
      timeOfIncident: "9:00 AM",
      location: "School Garden",
      interventions: [],
      photos: ["tree_planting.jpg"]
    },
    {
      id: 6,
      date: "2025-11-11",
      type: "positive",
      category: "character",
      title: "Honesty and Integrity",
      description: "Found a wallet in the playground and immediately brought it to the office. Refused any reward and expressed that doing the right thing was reward enough.",
      teacher: "Mr. Adjei",
      subject: "General",
      severity: "high",
      points: 10,
      followUpRequired: false,
      parentNotified: true,
      witnesses: ["Office Secretary", "Mr. Boateng"],
      timeOfIncident: "1:20 PM",
      location: "School Playground",
      interventions: [],
      photos: []
    }
  ];

  const monthlyAnalytics = {
    pointsHistory: [
      { month: "Aug", points: 145, positive: 12, negative: 2 },
      { month: "Sep", points: 158, positive: 15, negative: 3 },
      { month: "Oct", points: 172, positive: 16, negative: 1 },
      { month: "Nov", points: childData.behavior.behaviorPoints, positive: childData.behavior.positiveReports, negative: childData.behavior.concerningReports }
    ],
    categoryBreakdown: [
      { category: "Academic", positive: 8, negative: 1, percentage: 89 },
      { category: "Social", positive: 6, negative: 1, percentage: 86 },
      { category: "Behavioral", positive: 3, negative: 2, percentage: 60 },
      { category: "Character", positive: 4, negative: 0, percentage: 100 },
      { category: "Leadership", positive: 3, negative: 1, percentage: 75 }
    ],
    teacherFeedback: [
      { teacher: "Mr. Osei", subject: "Mathematics", rating: 4.5, comments: "Excellent student with strong problem-solving skills" },
      { teacher: "Mrs. Asante", subject: "English", rating: 4.0, comments: "Good participation, needs to improve punctuality" },
      { teacher: "Dr. Mensah", subject: "Science", rating: 4.2, comments: "Shows great curiosity and asks thoughtful questions" },
      { teacher: "Ms. Oppong", subject: "Social Studies", rating: 3.8, comments: "Capable student but sometimes lacks focus" }
    ]
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "concern":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "neutral":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "positive":
        return "text-green-700 bg-green-50 border-green-200";
      case "concern":
        return "text-red-700 bg-red-50 border-red-200";
      case "neutral":
        return "text-blue-700 bg-blue-50 border-blue-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "academic":
        return <BookOpen className="w-4 h-4" />;
      case "social":
        return <Users className="w-4 h-4" />;
      case "behavioral":
        return <Shield className="w-4 h-4" />;
      case "character":
        return <Heart className="w-4 h-4" />;
      case "leadership":
        return <Star className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
    if (rating >= 3.0) return "text-orange-600";
    return "text-red-600";
  };

  const getRankColor = (rank: string) => {
    if (rank.includes("Excellent")) return "text-green-600 bg-green-50";
    if (rank.includes("Good")) return "text-blue-600 bg-blue-50";
    if (rank.includes("Satisfactory")) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  // Delete confirmation modal
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">Request Report Review</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to request a review of this behavior report? This will notify the school administration and the reporting teacher.
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
              setShowDeleteModal(false);
              setSelectedReport(null);
              // Handle request review logic here
            }}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Request Review
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/parent/children/behavior"
              className="mr-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold">{childData.name}'s Behavior Profile</h1>
              <p className="text-purple-100 text-sm lg:text-base xl:text-lg">
                {childData.class} • Roll No: {childData.rollNumber}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/parent/children/behavior/${childId}/edit`}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              <MessageSquare className="w-4 h-4" />
              Contact Teacher
            </Link>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Rating</p>
              <div className="flex items-center gap-2 mt-1">
                <p className={`text-2xl font-bold ${getRatingColor(childData.behavior.overallRating)}`}>
                  {childData.behavior.overallRating.toFixed(1)}
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(childData.behavior.overallRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Behavior Points</p>
              <p className="text-2xl font-bold text-purple-600">{childData.behavior.behaviorPoints}</p>
              <p className={`text-xs font-medium px-2 py-1 rounded-full mt-1 ${getRankColor(childData.behavior.rank)}`}>
                {childData.behavior.rank}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Positive Reports</p>
              <p className="text-2xl font-bold text-green-600">{childData.behavior.positiveReports}</p>
              <p className="text-xs text-gray-500">vs {childData.behavior.concerningReports} concerns</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Positive Streak</p>
              <p className="text-2xl font-bold text-blue-600">{childData.behavior.consecutivePositiveDays}</p>
              <p className="text-xs text-gray-500">consecutive days</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Child Information Card */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-2xl lg:text-3xl">
              {childData.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">{childData.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Class:</span>
                  <span className="font-medium">{childData.class}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Roll Number:</span>
                  <span className="font-medium">{childData.rollNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Date of Birth:</span>
                  <span className="font-medium">{new Date(childData.dateOfBirth).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Parent:</span>
                  <span className="font-medium">{childData.parent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{childData.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{childData.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "reports", label: "Behavior Reports", icon: FileText },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
              { id: "strengths", label: "Strengths & Growth", icon: Award },
              { id: "feedback", label: "Teacher Feedback", icon: MessageSquare }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 lg:p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Behavior Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Behavior Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-green-900">Positive Behaviors</h4>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">{childData.behavior.positiveReports}</div>
                    <div className="text-sm text-green-700">Reports this month</div>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <div className="flex items-center gap-3 mb-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h4 className="font-medium text-red-900">Areas for Growth</h4>
                    </div>
                    <div className="text-2xl font-bold text-red-600 mb-1">{childData.behavior.concerningReports}</div>
                    <div className="text-sm text-red-700">Reports this month</div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="w-5 h-5 text-purple-600" />
                      <h4 className="font-medium text-purple-900">Behavior Points</h4>
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">{childData.behavior.behaviorPoints}</div>
                    <div className="text-sm text-purple-700">{childData.behavior.rank}</div>
                  </div>
                </div>
              </div>

              {/* Strong Areas */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Strong Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {childData.behavior.strongAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      <Award className="w-4 h-4" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Improvement Areas */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas for Growth</h3>
                <div className="flex flex-wrap gap-2">
                  {childData.behavior.improvementAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      <Target className="w-4 h-4" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {behaviorReports.slice(0, 5).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(report.type)}
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(report.category)}
                          <span className="text-sm text-gray-600 capitalize">{report.category}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{report.title}</div>
                          <div className="text-sm text-gray-600">{new Date(report.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                          {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.points > 0 
                            ? "text-green-700 bg-green-100" 
                            : report.points < 0 
                            ? "text-red-700 bg-red-100" 
                            : "text-gray-700 bg-gray-100"
                        }`}>
                          {report.points > 0 ? '+' : ''}{report.points}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Behavior Reports Tab */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Detailed Behavior Reports</h3>
                  <p className="text-gray-600">Complete history of behavior observations and incidents</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="this_week">This Week</option>
                    <option value="this_month">This Month</option>
                    <option value="last_month">Last Month</option>
                    <option value="this_term">This Term</option>
                  </select>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {behaviorReports.map((report) => (
                  <div key={report.id} className={`border rounded-lg p-6 ${selectedReportId === report.id.toString() ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-white'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(report.type)}
                          {getCategoryIcon(report.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{report.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                              {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              report.points > 0 
                                ? "text-green-700 bg-green-100" 
                                : report.points < 0 
                                ? "text-red-700 bg-red-100" 
                                : "text-gray-700 bg-gray-100"
                            }`}>
                              {report.points > 0 ? '+' : ''}{report.points} points
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3">{report.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Date:</span>
                              <div className="font-medium">{new Date(report.date).toLocaleDateString()}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Time:</span>
                              <div className="font-medium">{report.timeOfIncident}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Location:</span>
                              <div className="font-medium">{report.location}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Teacher:</span>
                              <div className="font-medium">{report.teacher}</div>
                            </div>
                          </div>

                          {report.witnesses.length > 0 && (
                            <div className="mt-3">
                              <span className="text-gray-500 text-sm">Witnesses:</span>
                              <div className="text-sm font-medium">{report.witnesses.join(', ')}</div>
                            </div>
                          )}

                          {report.interventions.length > 0 && (
                            <div className="mt-3">
                              <span className="text-gray-500 text-sm">Interventions:</span>
                              <ul className="list-disc list-inside text-sm font-medium ml-4">
                                {report.interventions.map((intervention, index) => (
                                  <li key={index}>{intervention}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setShowDeleteModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1 text-sm"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Request Review
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Parent Notified: {report.parentNotified ? 'Yes' : 'No'}</span>
                        <span>Follow-up Required: {report.followUpRequired ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Subject: {report.subject}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Points History</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-4 gap-4">
                    {monthlyAnalytics.pointsHistory.map((month, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold text-gray-900">{month.points}</div>
                        <div className="text-sm text-gray-600">{month.month}</div>
                        <div className="mt-2 text-xs text-gray-500">
                          +{month.positive} / -{month.negative}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
                <div className="space-y-4">
                  {monthlyAnalytics.categoryBreakdown.map((category, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(category.category.toLowerCase())}
                          <span className="font-medium text-gray-900">{category.category}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{category.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            category.percentage >= 90 ? 'bg-green-500' :
                            category.percentage >= 70 ? 'bg-blue-500' :
                            category.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{category.positive} positive</span>
                        <span>{category.negative} concerns</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Strengths & Growth Tab */}
          {activeTab === "strengths" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600" />
                    Key Strengths
                  </h3>
                  <div className="space-y-3">
                    {childData.behavior.strongAreas.map((area, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-900">{area}</span>
                        </div>
                        <p className="text-sm text-green-700 mt-2">
                          Consistently demonstrates excellence in this area with positive teacher feedback.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-yellow-600" />
                    Growth Opportunities
                  </h3>
                  <div className="space-y-3">
                    {childData.behavior.improvementAreas.map((area, index) => (
                      <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          <span className="font-medium text-yellow-900">{area}</span>
                        </div>
                        <p className="text-sm text-yellow-700 mt-2">
                          Area identified for focused improvement with teacher support and home reinforcement.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Recommendations</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">Continue Building on Strengths</p>
                        <p className="text-sm text-blue-700">Encourage leadership opportunities and peer mentoring to further develop social skills.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">Focus Areas for Growth</p>
                        <p className="text-sm text-blue-700">Implement morning routine checklist and positive reinforcement for punctuality improvements.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">Collaborative Approach</p>
                        <p className="text-sm text-blue-700">Regular communication between home and school to maintain consistency in expectations.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Teacher Feedback Tab */}
          {activeTab === "feedback" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Teacher Feedback by Subject</h3>
                <div className="space-y-4">
                  {monthlyAnalytics.teacherFeedback.map((feedback, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{feedback.subject}</h4>
                          <p className="text-sm text-gray-600">Teacher: {feedback.teacher}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(feedback.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`text-sm font-medium ${getRatingColor(feedback.rating)}`}>
                            {feedback.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700">{feedback.comments}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Teacher Assessment</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Academic Behavior</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Class Participation</span>
                          <span className="font-medium text-green-600">Excellent</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Homework Completion</span>
                          <span className="font-medium text-blue-600">Good</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Following Instructions</span>
                          <span className="font-medium text-yellow-600">Needs Improvement</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Social Behavior</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Peer Relationships</span>
                          <span className="font-medium text-green-600">Excellent</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Conflict Resolution</span>
                          <span className="font-medium text-green-600">Excellent</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Leadership Skills</span>
                          <span className="font-medium text-blue-600">Good</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Award,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  Eye,
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
  Activity
} from "lucide-react";

export default function ChildrenBehaviorPage() {
  const [selectedChild, setSelectedChild] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("this_month");
  const [behaviorFilter, setBehaviorFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample behavior data
  const children = [
    {
      id: "1",
      name: "Kwame Mensah",
      class: "Primary 6A",
      photo: "/avatars/student1.jpg",
      behavior: {
        overallRating: 4.2,
        totalIncidents: 8,
        positiveReports: 15,
        concerningReports: 3,
        improvementTrend: "positive",
        lastIncident: "2025-11-10",
        strongAreas: ["Academic Performance", "Peer Cooperation"],
        improvementAreas: ["Punctuality", "Following Instructions"]
      }
    },
    {
      id: "2", 
      name: "Ama Mensah",
      class: "Primary 4B",
      photo: "/avatars/student2.jpg",
      behavior: {
        overallRating: 4.7,
        totalIncidents: 12,
        positiveReports: 22,
        concerningReports: 1,
        improvementTrend: "positive",
        lastIncident: "2025-10-15",
        strongAreas: ["Leadership", "Helpfulness", "Academic Performance"],
        improvementAreas: ["Noise Level"]
      }
    }
  ];

  const recentReports = [
    {
      id: 1,
      date: "2025-11-18",
      child: "Kwame Mensah",
      type: "positive",
      category: "academic",
      title: "Excellent Mathematics Performance",
      description: "Showed outstanding problem-solving skills during math class and helped struggling classmates",
      teacher: "Mr. Osei",
      severity: "high",
      points: 10
    },
    {
      id: 2,
      date: "2025-11-17",
      child: "Ama Mensah",
      type: "positive",
      category: "social",
      title: "Peer Leadership",
      description: "Demonstrated excellent leadership during group project and ensured everyone participated",
      teacher: "Mrs. Asante",
      severity: "medium",
      points: 8
    },
    {
      id: 3,
      date: "2025-11-16",
      child: "Kwame Mensah",
      type: "concern",
      category: "behavioral",
      title: "Late Submission",
      description: "Assignment submitted two days late without proper communication",
      teacher: "Ms. Oppong",
      severity: "low",
      points: -3
    },
    {
      id: 4,
      date: "2025-11-15",
      child: "Ama Mensah",
      type: "positive",
      category: "character",
      title: "Honesty and Integrity",
      description: "Admitted to mistake and helped clean up after accidental spill in cafeteria",
      teacher: "Mr. Adjei",
      severity: "medium",
      points: 7
    },
    {
      id: 5,
      date: "2025-11-14",
      child: "Kwame Mensah",
      type: "neutral",
      category: "academic",
      title: "Classroom Participation",
      description: "Participated well in science discussion but could contribute more frequently",
      teacher: "Dr. Mensah",
      severity: "low",
      points: 2
    }
  ];

  const behaviorCategories = [
    { value: "all", label: "All Categories", icon: Activity },
    { value: "academic", label: "Academic", icon: BookOpen },
    { value: "social", label: "Social Skills", icon: Users },
    { value: "behavioral", label: "Behavior", icon: Shield },
    { value: "character", label: "Character", icon: Heart },
    { value: "leadership", label: "Leadership", icon: Star }
  ];

  const behaviorStats = {
    totalReports: 35,
    positiveReports: 28,
    concerningReports: 7,
    averageRating: 4.45,
    improvementRate: 15,
    topStrengths: ["Academic Excellence", "Peer Cooperation", "Honesty"]
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-purple-700 bg-purple-100";
      case "medium":
        return "text-blue-700 bg-blue-100";
      case "low":
        return "text-gray-700 bg-gray-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
    if (rating >= 3.0) return "text-orange-600";
    return "text-red-600";
  };

  const filteredReports = recentReports.filter(report => {
    const childMatch = selectedChild === "all" || children.find(c => c.name === report.child)?.id === selectedChild;
    const categoryMatch = behaviorFilter === "all" || report.category === behaviorFilter;
    return childMatch && categoryMatch;
  });

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">Behavior Reports</h1>
            <p className="text-purple-100 text-sm lg:text-base xl:text-lg">
              Track character development, positive behaviors, and areas for improvement
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Children</option>
                {children.map(child => (
                  <option key={child.id} value={child.id}>{child.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="last_month">Last Month</option>
                <option value="this_term">This Term</option>
                <option value="this_year">This Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={behaviorFilter}
                onChange={(e) => setBehaviorFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {behaviorCategories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <div className="flex rounded-lg border border-gray-300">
                <button
                  onClick={() => setBehaviorFilter("positive")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                    behaviorFilter === "positive" 
                      ? "bg-green-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Positive
                </button>
                <button
                  onClick={() => setBehaviorFilter("concern")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                    behaviorFilter === "concern" 
                      ? "bg-red-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Concerns
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{behaviorStats.totalReports}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Positive Reports</p>
              <p className="text-2xl font-bold text-green-600">{behaviorStats.positiveReports}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className={`text-2xl font-bold ${getRatingColor(behaviorStats.averageRating)}`}>
                {behaviorStats.averageRating.toFixed(1)}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Improvement Rate</p>
              <p className="text-2xl font-bold text-purple-600">+{behaviorStats.improvementRate}%</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Children Behavior Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {children.map((child) => (
          <div key={child.id} className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg lg:text-xl">
                    {child.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">{child.name}</h3>
                  <p className="text-gray-600">{child.class}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(child.behavior.overallRating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-sm font-medium ${getRatingColor(child.behavior.overallRating)}`}>
                      {child.behavior.overallRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href={`/parent/children/behavior/${child.id}`}
                className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                View Details
              </Link>
            </div>

            {/* Behavior Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{child.behavior.positiveReports}</div>
                <div className="text-xs text-gray-600">Positive</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-600">{child.behavior.concerningReports}</div>
                <div className="text-xs text-gray-600">Concerns</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{child.behavior.totalIncidents}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Performance</span>
                <span className="font-semibold text-gray-900">{child.behavior.overallRating.toFixed(1)}/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    child.behavior.overallRating >= 4.5 ? 'bg-green-500' :
                    child.behavior.overallRating >= 4.0 ? 'bg-blue-500' :
                    child.behavior.overallRating >= 3.5 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(child.behavior.overallRating / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Strong Areas */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Strong Areas</h4>
              <div className="flex flex-wrap gap-2">
                {child.behavior.strongAreas.map((area, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Improvement Areas */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Areas for Growth</h4>
              <div className="flex flex-wrap gap-2">
                {child.behavior.improvementAreas.map((area, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Trend Indicator */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {child.behavior.improvementTrend === "positive" ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`font-medium ${
                  child.behavior.improvementTrend === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  {child.behavior.improvementTrend === "positive" ? "Improving" : "Needs Attention"}
                </span>
              </div>
              <span className="text-gray-500">
                Last incident: {new Date(child.behavior.lastIncident).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Behavior Reports */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
        <div className="p-6 lg:p-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Recent Behavior Reports</h2>
              <p className="text-gray-600">Latest behavior observations and feedback from teachers</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <Link
                href="/parent/children/behavior/analytics"
                className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2 font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </Link>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(report.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {report.child.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {report.child}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(report.type)}`}>
                      {getTypeIcon(report.type)}
                      {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-gray-600">
                      {getCategoryIcon(report.category)}
                      <span className="text-sm capitalize">{report.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="font-medium truncate">{report.title}</div>
                    <div className="text-gray-500 truncate text-xs mt-1">{report.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {report.teacher}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      report.points > 0 
                        ? "text-green-700 bg-green-100" 
                        : report.points < 0 
                        ? "text-red-700 bg-red-100" 
                        : "text-gray-700 bg-gray-100"
                    }`}>
                      {report.points > 0 ? '+' : ''}{report.points}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/parent/children/behavior/${children.find(c => c.name === report.child)?.id}?reportId=${report.id}`}
                      className="text-purple-600 hover:text-purple-900 flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredReports.length} reports
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 text-sm">Page 1 of 1</span>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Behavior Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {behaviorCategories.slice(1).map((category) => {
          const categoryReports = recentReports.filter(r => r.category === category.value);
          const positiveCount = categoryReports.filter(r => r.type === "positive").length;
          const totalCount = categoryReports.length;
          const percentage = totalCount > 0 ? (positiveCount / totalCount) * 100 : 0;
          
          return (
            <div key={category.value} className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <category.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.label}</h3>
                  <p className="text-sm text-gray-600">{totalCount} reports</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Positive Rate</span>
                  <span className="font-medium text-gray-900">{percentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      percentage >= 80 ? 'bg-green-500' :
                      percentage >= 60 ? 'bg-blue-500' :
                      percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{positiveCount} positive</span>
                  <span>{totalCount - positiveCount} areas for growth</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
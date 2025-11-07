"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Printer, 
  Edit3, 
  Trash2, 
  Calendar, 
  User, 
  Users, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Target, 
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  UserCheck,
  GraduationCap,
  Briefcase,
  Star
} from "lucide-react";

export default function StaffReportDetailPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [reportDetail, setReportDetail] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample detailed report data based on ID - MATCHING MAIN PAGE DATA
  const reportDatabase = {
    "1": {
      id: 1,
      title: "Q3 Performance Review - 2025",
      type: "Performance Report",
      description: "Comprehensive performance analysis of all teaching and non-teaching staff for Q3 2025",
      generatedDate: "2025-10-15",
      generatedBy: "HR Manager",
      status: "completed",
      fileSize: "2.4 MB",
      downloadCount: 28,
      lastDownloaded: "2025-11-02",
      
      // Performance Specific Data
      staffCount: 48,
      averageRating: 4.2,
      excellentPerformers: 18,
      needsImprovement: 2,
      
      // Department breakdown
      departments: [
        { name: "Teaching Staff", staff: 28, avgRating: 4.3, excellent: 12, needsWork: 0 },
        { name: "Administrative", staff: 12, avgRating: 4.1, excellent: 4, needsWork: 1 },
        { name: "Support Staff", staff: 8, avgRating: 4.0, excellent: 2, needsWork: 1 }
      ],
      
      // Performance metrics
      performanceMetrics: {
        punctuality: 96.3,
        productivity: 88.5,
        teamwork: 91.2,
        professionalism: 93.8,
        communication: 89.4,
        initiative: 86.7
      },
      
      // Top performers
      topPerformers: [
        { id: "STF001", name: "Dr. Sarah Johnson", department: "Academic", role: "Senior Teacher", rating: 4.9, strengths: ["Leadership", "Innovation"] },
        { id: "STF012", name: "Michael Brown", department: "Administration", role: "Accountant", rating: 4.8, strengths: ["Accuracy", "Reliability"] },
        { id: "STF023", name: "Grace Asante", department: "Academic", role: "Mathematics Teacher", rating: 4.7, strengths: ["Student Engagement", "Results"] },
        { id: "STF034", name: "Robert Wilson", department: "Support Services", role: "IT Coordinator", rating: 4.6, strengths: ["Technical Skills", "Problem Solving"] },
        { id: "STF045", name: "Mary Osei", department: "Academic", role: "English Teacher", rating: 4.6, strengths: ["Curriculum Development", "Mentoring"] }
      ],
      
      // Staff needing improvement
      improvementNeeded: [
        { id: "STF056", name: "John Mensah", department: "Support Services", role: "Maintenance", rating: 3.2, areas: ["Punctuality", "Communication"] },
        { id: "STF067", name: "Patricia Addo", department: "Administration", role: "Secretary", rating: 3.4, areas: ["Initiative", "Technology Skills"] },
        { id: "STF078", name: "James Owusu", department: "Academic", role: "Science Teacher", rating: 3.5, areas: ["Student Engagement", "Lesson Planning"] }
      ],
      
      // Performance trends
      trends: [
        { metric: "Overall Performance", current: 4.2, previous: 4.0, change: 5.0 },
        { metric: "Punctuality", current: 92.5, previous: 89.8, change: 3.0 },
        { metric: "Productivity", current: 87.3, previous: 85.1, change: 2.6 },
        { metric: "Team Collaboration", current: 89.1, previous: 91.2, change: -2.3 }
      ],
      
      // Insights and recommendations
      insights: [
        {
          type: "strength",
          title: "Improved Overall Performance",
          description: "Average staff rating increased by 5% compared to Q2, showing positive development"
        },
        {
          type: "concern",
          title: "Declining Team Collaboration",
          description: "Team collaboration scores dropped by 2.3%, requiring attention to team dynamics"
        },
        {
          type: "recommendation",
          title: "Targeted Training Programs",
          description: "Implement specialized training for staff scoring below 3.5 in key performance areas"
        }
      ]
    },
    
    "2": {
      id: 2,
      title: "Teaching Staff Assessment - October 2025",
      type: "Teaching Assessment",
      description: "Monthly assessment of teaching staff performance and student feedback analysis",
      generatedDate: "2025-10-30",
      generatedBy: "Academic Coordinator",
      status: "completed",
      fileSize: "2.9 MB",
      downloadCount: 35,
      lastDownloaded: "2025-11-01",
      
      // Teaching Specific Data
      staffCount: 28,
      averageRating: 4.4,
      excellentPerformers: 12,
      needsImprovement: 3,
      
      // Subject breakdown
      subjects: [
        { name: "Mathematics", teachers: 4, avgRating: 4.6, studentSatisfaction: 92.5 },
        { name: "English", teachers: 4, avgRating: 4.5, studentSatisfaction: 90.8 },
        { name: "Science", teachers: 6, avgRating: 4.3, studentSatisfaction: 88.7 },
        { name: "Social Studies", teachers: 3, avgRating: 4.2, studentSatisfaction: 87.3 },
        { name: "Languages", teachers: 3, avgRating: 4.4, studentSatisfaction: 89.1 },
        { name: "Arts & PE", teachers: 4, avgRating: 4.7, studentSatisfaction: 94.2 },
        { name: "ICT", teachers: 2, avgRating: 4.5, studentSatisfaction: 91.5 },
        { name: "Others", teachers: 2, avgRating: 4.1, studentSatisfaction: 85.9 }
      ],
      
      // Teaching metrics
      performanceMetrics: {
        lessonDelivery: 88.7,
        studentEngagement: 91.2,
        curriculum: 85.9,
        assessment: 87.4,
        classManagement: 89.6,
        innovation: 82.3
      },
      
      insights: [
        {
          type: "strength",
          title: "Strong Student Engagement",
          description: "Teachers maintaining high student engagement with 91.2% average satisfaction"
        },
        {
          type: "concern",
          title: "Innovation in Teaching Methods",
          description: "Innovation scores are lowest at 82.3%, suggesting need for modern teaching approaches"
        },
        {
          type: "recommendation",
          title: "Technology Integration Training",
          description: "Provide professional development in digital teaching tools and methodologies"
        }
      ]
    },
    "2": {
      id: 2,
      title: "Teaching Assessment Report - November 2025",
      type: "Teaching Assessment",
      description: "Detailed assessment of teaching effectiveness and student feedback analysis",
      generatedDate: "2025-11-01",
      generatedBy: "Academic Director",
      status: "completed",
      fileSize: "1.9 MB",
      downloadCount: 22,
      lastDownloaded: "2025-11-03",
      
      staffCount: 28,
      averageRating: 4.4,
      excellentPerformers: 15,
      needsImprovement: 0,
      
      departments: [
        { name: "Mathematics", staff: 6, avgRating: 4.6, excellent: 4, needsWork: 0 },
        { name: "Science", staff: 7, avgRating: 4.5, excellent: 4, needsWork: 0 },
        { name: "Languages", staff: 8, avgRating: 4.3, excellent: 4, needsWork: 0 },
        { name: "Social Studies", staff: 4, avgRating: 4.2, excellent: 2, needsWork: 0 },
        { name: "Arts & PE", staff: 3, avgRating: 4.1, excellent: 1, needsWork: 0 }
      ],
      
      performanceMetrics: {
        punctuality: 97.2,
        productivity: 91.5,
        teamwork: 93.8,
        professionalism: 95.1,
        communication: 92.4,
        initiative: 89.6
      },
      
      topPerformers: [
        { id: "STF101", name: "Dr. Kwame Asante", department: "Mathematics", role: "Senior Teacher", rating: 4.9, strengths: ["Mathematical Excellence", "Student Results"] },
        { id: "STF102", name: "Mrs. Akosua Mensah", department: "Science", role: "Chemistry Teacher", rating: 4.8, strengths: ["Laboratory Skills", "Innovation"] },
        { id: "STF103", name: "Mr. Joseph Osei", department: "English", role: "English Teacher", rating: 4.7, strengths: ["Communication", "Curriculum"] }
      ],
      
      improvementNeeded: [],
      
      teachingMetrics: {
        lessonPlanning: 92.5,
        curriculum: 89.2,
        assessment: 91.3,
        classManagement: 93.7,
        innovation: 87.8
      },
      
      insights: [
        {
          type: "positive",
          title: "Exceptional Teaching Quality",
          description: "4.4 average rating shows high teaching effectiveness with all departments performing excellently"
        },
        {
          type: "positive",
          title: "Zero Improvement Cases",
          description: "No staff requiring improvement indicates strong teaching standards across the board"
        },
        {
          type: "recommendation",
          title: "Innovation Enhancement",
          description: "Continue building on the 87.8% innovation score to modernize teaching approaches"
        }
      ]
    },
    "3": {
      id: 3,
      title: "Staff Attendance Analysis - Q3 2025",
      type: "Attendance Report",
      description: "Comprehensive analysis of staff attendance patterns and leave management",
      generatedDate: "2025-10-20",
      generatedBy: "HR Assistant",
      status: "completed",
      fileSize: "1.6 MB",
      downloadCount: 15,
      lastDownloaded: "2025-10-28",
      
      staffCount: 48,
      averageRating: 94.8,
      excellentPerformers: 42,
      needsImprovement: 1,
      
      departments: [
        { name: "Teaching Staff", staff: 28, avgRating: 95.2, excellent: 26, needsWork: 0 },
        { name: "Administrative", staff: 12, avgRating: 94.8, excellent: 11, needsWork: 1 },
        { name: "Support Staff", staff: 8, avgRating: 93.5, excellent: 5, needsWork: 0 }
      ],
      
      performanceMetrics: {
        punctuality: 96.5,
        productivity: 94.8,
        teamwork: 95.1,
        professionalism: 96.2,
        communication: 93.7,
        initiative: 92.4
      },
      
      topPerformers: [
        { id: "STF201", name: "Perfect Attendance Group", department: "Various", role: "Multiple", rating: 100.0, strengths: ["Consistency", "Reliability"] },
        { id: "STF202", name: "Teaching Excellence Team", department: "Academic", role: "Teachers", rating: 98.5, strengths: ["Dedication", "Punctuality"] },
        { id: "STF203", name: "Administrative Leaders", department: "Admin", role: "Staff", rating: 97.2, strengths: ["Commitment", "Leadership"] }
      ],
      
      improvementNeeded: [
        { id: "STF256", name: "John Mensah", department: "Support Staff", role: "Maintenance", rating: 3.2, areas: ["Punctuality", "Attendance Consistency"] }
      ],
      
      attendanceMetrics: {
        overallAttendance: 94.8,
        punctualityRate: 96.5,
        sickLeaveUsage: 3.2,
        casualLeaveUsage: 5.8,
        lateArrivals: 3.5
      },
      
      insights: [
        {
          type: "positive",
          title: "Outstanding Attendance Culture",
          description: "94.8% attendance rate with most staff achieving excellent attendance records"
        },
        {
          type: "positive",
          title: "Minimal Issues",
          description: "Only 1 staff member needs improvement showing strong commitment across the board"
        },
        {
          type: "recommendation",
          title: "Wellness Support",
          description: "Continue supporting staff wellness to maintain the excellent attendance rates"
        }
      ]
    },
    "4": {
      id: 4,
      title: "Training Progress Report - Q3 2025",
      type: "Training Report",
      description: "Assessment of staff training programs and professional development progress",
      generatedDate: "2025-10-12",
      generatedBy: "Training Coordinator",
      status: "completed",
      fileSize: "2.2 MB",
      downloadCount: 19,
      lastDownloaded: "2025-10-30",
      
      staffCount: 48,
      averageRating: 4.1,
      excellentPerformers: 35,
      needsImprovement: 4,
      
      departments: [
        { name: "Teaching Staff", staff: 28, avgRating: 4.3, excellent: 22, needsWork: 1 },
        { name: "Administrative", staff: 12, avgRating: 4.0, excellent: 8, needsWork: 2 },
        { name: "Support Staff", staff: 8, avgRating: 3.8, excellent: 5, needsWork: 1 }
      ],
      
      performanceMetrics: {
        punctuality: 91.5,
        productivity: 87.8,
        teamwork: 89.2,
        professionalism: 92.1,
        communication: 88.6,
        initiative: 85.3
      },
      
      topPerformers: [
        { id: "STF301", name: "Training Champions", department: "Various", role: "Multiple", rating: 4.8, strengths: ["Learning Agility", "Knowledge Transfer"] },
        { id: "STF302", name: "Digital Leaders", department: "Academic", role: "Teachers", rating: 4.6, strengths: ["Technology Skills", "Innovation"] },
        { id: "STF303", name: "Mentorship Group", department: "Admin", role: "Senior Staff", rating: 4.5, strengths: ["Leadership", "Guidance"] }
      ],
      
      improvementNeeded: [
        { id: "STF356", name: "Technology Learners", department: "Various", role: "Multiple", rating: 3.4, areas: ["Digital Skills", "Adaptation"] },
        { id: "STF367", name: "Professional Development", department: "Support", role: "Staff", rating: 3.6, areas: ["Skill Enhancement", "Certification"] }
      ],
      
      trainingMetrics: {
        completionRate: 78.5,
        satisfactionScore: 87.2,
        knowledgeRetention: 82.8,
        skillApplication: 79.4,
        certificationRate: 71.6
      },
      
      insights: [
        {
          type: "positive",
          title: "Strong Training Engagement",
          description: "78.5% completion rate shows good staff engagement in professional development"
        },
        {
          type: "concern",
          title: "Skill Application Gap",
          description: "79.4% skill application rate indicates need for better practical implementation"
        },
        {
          type: "recommendation",
          title: "Practical Training Focus",
          description: "Enhance hands-on training components to improve skill application"
        }
      ]
    },
    "5": {
      id: 5,
      title: "Productivity Analysis Report - Q3 2025",
      type: "Productivity Report",
      description: "Comprehensive analysis of staff productivity and efficiency metrics",
      generatedDate: "2025-10-08",
      generatedBy: "Operations Manager",
      status: "completed",
      fileSize: "2.7 MB",
      downloadCount: 16,
      lastDownloaded: "2025-10-25",
      
      staffCount: 48,
      averageRating: 4.0,
      excellentPerformers: 28,
      needsImprovement: 8,
      
      departments: [
        { name: "Teaching Staff", staff: 28, avgRating: 4.2, excellent: 18, needsWork: 3 },
        { name: "Administrative", staff: 12, avgRating: 3.9, excellent: 6, needsWork: 3 },
        { name: "Support Staff", staff: 8, avgRating: 3.7, excellent: 4, needsWork: 2 }
      ],
      
      performanceMetrics: {
        punctuality: 89.2,
        productivity: 85.4,
        teamwork: 87.8,
        professionalism: 90.5,
        communication: 86.1,
        initiative: 82.7
      },
      
      topPerformers: [
        { id: "STF401", name: "High Achievers", department: "Academic", role: "Teachers", rating: 4.7, strengths: ["Efficiency", "Results"] },
        { id: "STF402", name: "Admin Excellence", department: "Administration", role: "Managers", rating: 4.5, strengths: ["Organization", "Delivery"] },
        { id: "STF403", name: "Support Heroes", department: "Support", role: "Staff", rating: 4.3, strengths: ["Reliability", "Quality"] }
      ],
      
      improvementNeeded: [
        { id: "STF456", name: "Efficiency Group", department: "Various", role: "Multiple", rating: 3.2, areas: ["Time Management", "Output Quality"] },
        { id: "STF467", name: "Process Improvement", department: "Admin", role: "Staff", rating: 3.4, areas: ["Workflow", "Standards"] }
      ],
      
      productivityMetrics: {
        taskCompletion: 85.4,
        qualityScore: 82.7,
        timeManagement: 79.3,
        resourceUtilization: 88.1,
        goalAchievement: 81.5
      },
      
      insights: [
        {
          type: "positive",
          title: "Good Overall Productivity",
          description: "85.4% task completion rate shows strong overall productivity across departments"
        },
        {
          type: "concern",
          title: "Time Management Issues",
          description: "79.3% time management score indicates opportunities for efficiency improvement"
        },
        {
          type: "recommendation",
          title: "Efficiency Training",
          description: "Implement time management and efficiency training programs"
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      const report = reportDatabase[params.id as keyof typeof reportDatabase];
      setReportDetail(report || null);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [params.id]);

  const handleDeleteReport = () => {
    // Handle delete logic here
    console.log("Deleting report:", reportDetail);
    setShowDeleteModal(false);
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4"></div>;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-purple-600" />
          <span className="ml-2 text-gray-600">Loading report details...</span>
        </div>
      </div>
    );
  }

  if (!reportDetail) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h2>
          <p className="text-gray-600 mb-4">The requested staff report could not be found.</p>
          <Link
            href="/headmaster/reports/staff"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/reports/staff" 
              className="text-white hover:text-purple-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{reportDetail.title}</h1>
              <p className="text-purple-100">{reportDetail.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Report Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Generated Date</p>
              <p className="text-lg font-bold text-gray-900">{reportDetail.generatedDate}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Generated By</p>
              <p className="text-lg font-bold text-gray-900">{reportDetail.generatedBy}</p>
            </div>
            <User className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Staff Count</p>
              <p className="text-lg font-bold text-gray-900">{reportDetail.staffCount}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Rating</p>
              <p className="text-lg font-bold text-gray-900">{reportDetail.averageRating}/5</p>
            </div>
            <Award className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Overview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-blue-600">{reportDetail.staffCount}</p>
                <p className="text-gray-600">Total Staff</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-green-600">{reportDetail.averageRating}</p>
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-purple-600">{reportDetail.excellentPerformers}</p>
                <p className="text-gray-600">Excellent</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <Target className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-orange-600">{reportDetail.needsImprovement}</p>
                <p className="text-gray-600">Needs Work</p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
            <div className="space-y-4">
              {Object.entries(reportDetail.performanceMetrics).map(([metric, value], index) => (
                <div key={metric} className="flex items-center gap-4">
                  <div className="w-32">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {metric.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-right">
                    <span className="text-sm font-bold text-gray-900">{value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department/Subject Breakdown */}
          {reportDetail.type === "Performance Review" && reportDetail.departments && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Department Breakdown</h2>
              <div className="space-y-4">
                {reportDetail.departments.map((dept: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{dept.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        dept.avgRating >= 4.0 ? 'bg-green-100 text-green-800' :
                        dept.avgRating >= 3.5 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {dept.avgRating}/5 Rating
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Staff Count</p>
                        <p className="font-bold text-lg">{dept.staff}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Excellent</p>
                        <p className="font-bold text-lg text-green-600">{dept.excellent}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Needs Work</p>
                        <p className="font-bold text-lg text-orange-600">{dept.needsWork}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {reportDetail.type === "Teaching Assessment" && reportDetail.subjects && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Subject Area Analysis</h2>
              <div className="space-y-4">
                {reportDetail.subjects.map((subject: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{subject.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subject.avgRating >= 4.0 ? 'bg-green-100 text-green-800' :
                        subject.avgRating >= 3.5 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {subject.avgRating}/5 Rating
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Teachers</p>
                        <p className="font-bold text-lg">{subject.teachers}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg Rating</p>
                        <p className="font-bold text-lg text-blue-600">{subject.avgRating}/5</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Student Satisfaction</p>
                        <p className="font-bold text-lg text-green-600">{subject.studentSatisfaction}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance Trends */}
          {reportDetail.trends && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Trends</h2>
              <div className="space-y-4">
                {reportDetail.trends.map((trend: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTrendIcon(trend.change)}
                      <div>
                        <h3 className="font-medium text-gray-900">{trend.metric}</h3>
                        <p className="text-sm text-gray-600">Current: {trend.current}% | Previous: {trend.previous}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getTrendColor(trend.change)}`}>
                        {trend.change > 0 ? '+' : ''}{trend.change}%
                      </p>
                      <p className="text-sm text-gray-600">
                        {trend.change > 0 ? 'Improvement' : trend.change < 0 ? 'Decline' : 'No Change'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insights and Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Insights & Recommendations</h2>
            <div className="space-y-4">
              {reportDetail.insights.map((insight: any, index: number) => (
                <div key={index} className={`border-l-4 p-4 rounded-r-lg ${
                  insight.type === 'strength' ? 'border-green-500 bg-green-50' :
                  insight.type === 'concern' ? 'border-red-500 bg-red-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex items-start gap-3">
                    {insight.type === 'strength' && <TrendingUp className="w-5 h-5 text-green-600 mt-1" />}
                    {insight.type === 'concern' && <TrendingDown className="w-5 h-5 text-red-600 mt-1" />}
                    {insight.type === 'recommendation' && <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />}
                    <div>
                      <h3 className="font-medium text-gray-900">{insight.title}</h3>
                      <p className="text-gray-700 mt-1">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" />
                Print Report
              </button>
              <Link
                href={`/headmaster/reports/staff/edit/${reportDetail.id}`}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit Report
              </Link>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Report
              </button>
            </div>
          </div>

          {/* Top Performers */}
          {reportDetail.topPerformers && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
              <div className="space-y-3">
                {reportDetail.topPerformers.map((staff: any, index: number) => (
                  <div key={staff.id} className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{staff.name}</p>
                          <p className="text-sm text-gray-600">{staff.role}</p>
                        </div>
                      </div>
                      <span className="font-bold text-green-600">{staff.rating}/5</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {staff.strengths.map((strength: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Staff Needing Improvement */}
          {reportDetail.improvementNeeded && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Needs Attention</h3>
              <div className="space-y-3">
                {reportDetail.improvementNeeded.map((staff: any) => (
                  <div key={staff.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{staff.name}</p>
                        <p className="text-sm text-gray-600">{staff.role}</p>
                      </div>
                      <span className="text-red-600 font-bold">{staff.rating}/5</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {staff.areas.map((area: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-green-600">Completed</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Last Downloaded</p>
                <p className="font-medium">{reportDetail.lastDownloaded || 'Never'}</p>
              </div>
              <div>
                <p className="text-gray-600">Report Type</p>
                <p className="font-medium">{reportDetail.type}</p>
              </div>
              <div>
                <p className="text-gray-600">File Size</p>
                <p className="font-medium">{reportDetail.fileSize}</p>
              </div>
              <div>
                <p className="text-gray-600">Downloads</p>
                <p className="font-medium">{reportDetail.downloadCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Report</h3>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{reportDetail.title}"</span>?
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">This will permanently remove:</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Staff performance data for {reportDetail.staffCount} employees</li>
                  <li>• Report file ({reportDetail.fileSize})</li>
                  <li>• Download history ({reportDetail.downloadCount} downloads)</li>
                  <li>• Performance analytics and trends</li>
                  <li>• Generated insights and recommendations</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleDeleteReport}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
              >
                Delete Report
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
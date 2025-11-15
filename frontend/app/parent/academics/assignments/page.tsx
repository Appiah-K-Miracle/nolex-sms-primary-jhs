"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  Download,
  Search,
  Eye,
  Upload,
  User,
  BookOpen,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  AlertTriangle,
  Target,
  Award,
  GraduationCap,
  Calculator,
  Beaker,
  Globe,
  Palette,
  Music,
  Heart,
  Zap,
  Timer,
  Flag,
  Send,
  MessageSquare
} from "lucide-react";

export default function AssignmentsPage() {
  const [selectedChild, setSelectedChild] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // list, cards, calendar

  // Sample children data
  const children = [
    {
      id: "1",
      name: "Kwame Mensah",
      class: "Primary 6A",
      photo: "/avatars/student1.jpg"
    },
    {
      id: "2", 
      name: "Ama Mensah",
      class: "Primary 4B",
      photo: "/avatars/student2.jpg"
    }
  ];

  // Sample assignments data
  const assignments = [
    {
      id: 1,
      child: "Kwame Mensah",
      childId: "1",
      subject: "Mathematics",
      title: "Algebraic Expressions Worksheet",
      description: "Complete exercises 1-15 on algebraic expressions and simplification",
      type: "Homework",
      priority: "high",
      dueDate: "2025-11-20",
      assignedDate: "2025-11-13",
      status: "pending",
      teacher: "Mr. Osei",
      maxScore: 100,
      submittedScore: null,
      feedback: null,
      attachments: [
        { name: "algebra_worksheet.pdf", type: "pdf", size: "2.3MB" }
      ],
      estimatedTime: 45,
      requirements: "Show all working steps, use proper mathematical notation",
      submission: null,
      submissionMethod: "physical", // physical, online, both
      classAverage: null,
      difficultyLevel: "medium",
      learningObjectives: [
        "Simplify algebraic expressions",
        "Apply distributive property",
        "Combine like terms"
      ]
    },
    {
      id: 2,
      child: "Ama Mensah",
      childId: "2",
      subject: "English",
      title: "Creative Writing: My Future Dreams",
      description: "Write a 250-word essay about your future aspirations and career goals",
      type: "Essay",
      priority: "medium",
      dueDate: "2025-11-18",
      assignedDate: "2025-11-11",
      status: "submitted",
      teacher: "Mrs. Asante",
      maxScore: 50,
      submittedScore: 42,
      feedback: "Excellent creativity and vocabulary. Work on paragraph structure.",
      attachments: [
        { name: "essay_guidelines.pdf", type: "pdf", size: "1.1MB" }
      ],
      estimatedTime: 60,
      requirements: "Minimum 250 words, proper grammar and spelling",
      submission: {
        date: "2025-11-17",
        files: [
          { name: "my_future_dreams.docx", type: "docx", size: "156KB" }
        ],
        submittedOnTime: true
      },
      submissionMethod: "online",
      classAverage: 38,
      difficultyLevel: "easy",
      learningObjectives: [
        "Express personal thoughts clearly",
        "Use descriptive language",
        "Practice essay structure"
      ]
    },
    {
      id: 3,
      child: "Kwame Mensah", 
      childId: "1",
      subject: "Science",
      title: "Plant Life Cycle Project",
      description: "Create a detailed presentation on the life cycle of flowering plants",
      type: "Project",
      priority: "high",
      dueDate: "2025-11-25",
      assignedDate: "2025-11-05",
      status: "in_progress",
      teacher: "Dr. Mensah",
      maxScore: 80,
      submittedScore: null,
      feedback: null,
      attachments: [
        { name: "project_rubric.pdf", type: "pdf", size: "890KB" },
        { name: "plant_samples.jpg", type: "image", size: "3.2MB" }
      ],
      estimatedTime: 180,
      requirements: "Include diagrams, real examples, presentation slides",
      submission: null,
      submissionMethod: "both",
      classAverage: null,
      difficultyLevel: "hard",
      learningObjectives: [
        "Understand plant reproduction",
        "Create scientific presentations",
        "Use scientific terminology"
      ]
    },
    {
      id: 4,
      child: "Ama Mensah",
      childId: "2",
      subject: "Mathematics",
      title: "Geometry Practice Questions",
      description: "Solve problems related to areas and perimeters of different shapes",
      type: "Practice",
      priority: "low",
      dueDate: "2025-11-16",
      assignedDate: "2025-11-12",
      status: "overdue",
      teacher: "Mrs. Appiah",
      maxScore: 40,
      submittedScore: null,
      feedback: null,
      attachments: [
        { name: "geometry_problems.pdf", type: "pdf", size: "1.8MB" }
      ],
      estimatedTime: 30,
      requirements: "Show calculations, draw accurate diagrams",
      submission: null,
      submissionMethod: "physical",
      classAverage: 32,
      difficultyLevel: "medium",
      learningObjectives: [
        "Calculate areas and perimeters",
        "Apply geometric formulas",
        "Solve real-world problems"
      ]
    },
    {
      id: 5,
      child: "Kwame Mensah",
      childId: "1", 
      subject: "Social Studies",
      title: "Ghana's Independence Research",
      description: "Research and write about key figures in Ghana's independence movement",
      type: "Research",
      priority: "medium",
      dueDate: "2025-11-22",
      assignedDate: "2025-11-08",
      status: "pending",
      teacher: "Mr. Boateng",
      maxScore: 60,
      submittedScore: null,
      feedback: null,
      attachments: [
        { name: "research_template.docx", type: "docx", size: "45KB" },
        { name: "sources_list.pdf", type: "pdf", size: "320KB" }
      ],
      estimatedTime: 120,
      requirements: "Minimum 3 sources, proper citations, 400 words",
      submission: null,
      submissionMethod: "online",
      classAverage: null,
      difficultyLevel: "medium",
      learningObjectives: [
        "Research historical events",
        "Analyze primary sources",
        "Write structured reports"
      ]
    },
    {
      id: 6,
      child: "Ama Mensah",
      childId: "2",
      subject: "Creative Arts",
      title: "Traditional Kente Pattern Design",
      description: "Design and create your own Kente pattern using traditional motifs",
      type: "Practical",
      priority: "medium",
      dueDate: "2025-11-21",
      assignedDate: "2025-11-07",
      status: "completed",
      teacher: "Ms. Nkrumah",
      maxScore: 30,
      submittedScore: 28,
      feedback: "Beautiful design with excellent use of colors and traditional symbols.",
      attachments: [
        { name: "kente_guide.pdf", type: "pdf", size: "4.1MB" },
        { name: "color_chart.png", type: "image", size: "2.7MB" }
      ],
      estimatedTime: 90,
      requirements: "Use traditional colors, include symbolic meanings",
      submission: {
        date: "2025-11-20",
        files: [
          { name: "kente_design.jpg", type: "image", size: "2.1MB" },
          { name: "symbol_meanings.pdf", type: "pdf", size: "78KB" }
        ],
        submittedOnTime: true
      },
      submissionMethod: "both",
      classAverage: 25,
      difficultyLevel: "easy",
      learningObjectives: [
        "Appreciate traditional art",
        "Use artistic elements",
        "Research cultural symbols"
      ]
    }
  ];

  const subjects = [
    { id: "math", name: "Mathematics", icon: Calculator, color: "blue" },
    { id: "english", name: "English", icon: BookOpen, color: "green" },
    { id: "science", name: "Science", icon: Beaker, color: "purple" },
    { id: "social", name: "Social Studies", icon: Globe, color: "orange" },
    { id: "arts", name: "Creative Arts", icon: Palette, color: "pink" },
    { id: "music", name: "Music", icon: Music, color: "indigo" },
    { id: "pe", name: "Physical Education", icon: Heart, color: "red" },
    { id: "french", name: "French", icon: Globe, color: "yellow" }
  ];

  // Filter assignments
  const filteredAssignments = assignments.filter(assignment => {
    const childMatch = selectedChild === "all" || assignment.childId === selectedChild;
    const subjectMatch = selectedSubject === "all" || assignment.subject.toLowerCase().includes(selectedSubject);
    const statusMatch = selectedStatus === "all" || assignment.status === selectedStatus;
    const priorityMatch = selectedPriority === "all" || assignment.priority === selectedPriority;
    const searchMatch = searchTerm === "" || 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return childMatch && subjectMatch && statusMatch && priorityMatch && searchMatch;
  });

  // Assignment statistics
  const assignmentStats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === "pending").length,
    submitted: assignments.filter(a => a.status === "submitted").length,
    inProgress: assignments.filter(a => a.status === "in_progress").length,
    completed: assignments.filter(a => a.status === "completed").length,
    overdue: assignments.filter(a => a.status === "overdue").length,
    highPriority: assignments.filter(a => a.priority === "high").length,
    dueThisWeek: assignments.filter(a => {
      const dueDate = new Date(a.dueDate);
      const today = new Date();
      const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return dueDate >= today && dueDate <= weekLater;
    }).length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50 border-green-200";
      case "submitted": return "text-blue-600 bg-blue-50 border-blue-200";
      case "in_progress": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "pending": return "text-gray-600 bg-gray-50 border-gray-200";
      case "overdue": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "submitted": return <Upload className="w-4 h-4" />;
      case "in_progress": return <Timer className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "overdue": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "hard": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "easy": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "homework": return <FileText className="w-4 h-4" />;
      case "project": return <Target className="w-4 h-4" />;
      case "essay": return <BookOpen className="w-4 h-4" />;
      case "research": return <Search className="w-4 h-4" />;
      case "practical": return <Zap className="w-4 h-4" />;
      case "practice": return <Calculator className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getSubjectIcon = (subjectName: string) => {
    const subject = subjects.find(s => s.name.toLowerCase().includes(subjectName.toLowerCase()));
    return subject ? subject.icon : BookOpen;
  };

  const getSubjectColor = (subjectName: string) => {
    const subject = subjects.find(s => s.name.toLowerCase().includes(subjectName.toLowerCase()));
    return subject ? subject.color : "gray";
  };

  const formatTimeRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `${diffDays} days remaining`;
  };

  const getTimeRemainingColor = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "text-red-600";
    if (diffDays <= 1) return "text-orange-600";
    if (diffDays <= 3) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">Assignments & Homework</h1>
            <p className="text-blue-100 text-sm lg:text-base xl:text-lg">
              Track and manage all assignments, homework, and project submissions
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
              Export List
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{assignmentStats.total}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-xl lg:text-2xl font-bold text-orange-600">{assignmentStats.pending}</p>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-xl lg:text-2xl font-bold text-yellow-600">{assignmentStats.inProgress}</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Timer className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Submitted</p>
              <p className="text-xl lg:text-2xl font-bold text-blue-600">{assignmentStats.submitted}</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-xl lg:text-2xl font-bold text-green-600">{assignmentStats.completed}</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-xl lg:text-2xl font-bold text-red-600">{assignmentStats.overdue}</p>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-xl lg:text-2xl font-bold text-purple-600">{assignmentStats.highPriority}</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Flag className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Due This Week</p>
              <p className="text-xl lg:text-2xl font-bold text-indigo-600">{assignmentStats.dueThisWeek}</p>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Children</option>
                {children.map(child => (
                  <option key={child.id} value={child.id}>{child.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.name.toLowerCase()}>{subject.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="submitted">Submitted</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
              <div className="flex rounded-lg border border-gray-300">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-l-lg ${
                    viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-r-lg ${
                    viewMode === "cards" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Cards
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Assignments</label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title, description, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Assignments List/Cards */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
        <div className="p-6 lg:p-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Assignments Overview</h2>
              <p className="text-gray-600">
                Showing {filteredAssignments.length} of {assignments.length} assignments
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 font-medium">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
              <Link
                href="/parent/academics/assignments/calendar"
                className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2 font-medium"
              >
                <Calendar className="w-4 h-4" />
                Calendar View
              </Link>
            </div>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="flex items-center gap-2 mb-1">
                          {React.createElement(getTypeIcon(assignment.type), { className: "w-4 h-4 text-gray-600" })}
                          <div className="font-medium text-gray-900 truncate">{assignment.title}</div>
                        </div>
                        <div className="text-sm text-gray-600 truncate">{assignment.description}</div>
                        <div className="text-xs text-gray-500 mt-1">{assignment.teacher}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">
                            {assignment.child.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{assignment.child}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {React.createElement(getSubjectIcon(assignment.subject), { 
                          className: `w-4 h-4 text-${getSubjectColor(assignment.subject)}-600` 
                        })}
                        <span className="text-sm text-gray-900">{assignment.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {assignment.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(assignment.priority)}`}>
                        {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(assignment.dueDate).toLocaleDateString()}</div>
                      <div className={`text-xs ${getTimeRemainingColor(assignment.dueDate)}`}>
                        {formatTimeRemaining(assignment.dueDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border gap-1 ${getStatusColor(assignment.status)}`}>
                        {getStatusIcon(assignment.status)}
                        {assignment.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {assignment.submittedScore !== null ? (
                        <div>
                          <div className="font-medium">{assignment.submittedScore}/{assignment.maxScore}</div>
                          <div className="text-xs text-gray-500">
                            ({Math.round((assignment.submittedScore / assignment.maxScore) * 100)}%)
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/parent/academics/assignments/${assignment.id}`}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
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
        ) : (
          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {filteredAssignments.map((assignment) => (
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {React.createElement(getTypeIcon(assignment.type), { className: "w-5 h-5 text-gray-600" })}
                      <div>
                        <h3 className="font-semibold text-gray-900 truncate">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">{assignment.subject}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(assignment.priority)}`}>
                      {assignment.priority}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{assignment.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Child:</span>
                      <span className="font-medium text-gray-900">{assignment.child}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Teacher:</span>
                      <span className="font-medium text-gray-900">{assignment.teacher}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="font-medium text-gray-900">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Time Remaining:</span>
                      <span className={`font-medium ${getTimeRemainingColor(assignment.dueDate)}`}>
                        {formatTimeRemaining(assignment.dueDate)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border gap-1 ${getStatusColor(assignment.status)}`}>
                      {getStatusIcon(assignment.status)}
                      {assignment.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <Link
                      href={`/parent/academics/assignments/${assignment.id}`}
                      className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                  </div>

                  {assignment.submittedScore !== null && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Score:</span>
                        <span className="text-lg font-bold text-gray-900">
                          {assignment.submittedScore}/{assignment.maxScore}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${(assignment.submittedScore / assignment.maxScore) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredAssignments.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more assignments.</p>
          </div>
        )}

        {filteredAssignments.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredAssignments.length} assignments
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
        )}
      </div>
    </div>
  );
}
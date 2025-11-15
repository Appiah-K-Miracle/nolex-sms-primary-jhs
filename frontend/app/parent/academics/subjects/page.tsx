"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen,
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Calendar,
  Clock,
  User,
  Users,
  Target,
  TrendingUp,
  Award,
  Star,
  AlertCircle,
  CheckCircle,
  Activity,
  BarChart3,
  PieChart,
  Calculator,
  Beaker,
  Globe,
  Palette,
  Music,
  Heart,
  Zap,
  FileText,
  MessageSquare,
  Video,
  Headphones,
  Image,
  MapPin,
  GraduationCap,
  Book,
  Lightbulb,
  ChevronRight,
  Settings,
  Bell,
  Share2,
  Bookmark
} from "lucide-react";

export default function SubjectsPage() {
  const [viewMode, setViewMode] = useState("grid"); // grid, list, card
  const [selectedChild, setSelectedChild] = useState("1");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Sample children data
  const children = [
    { id: "1", name: "Kwame Mensah", class: "Primary 6A", grade: "Grade 6" },
    { id: "2", name: "Ama Mensah", class: "Primary 4B", grade: "Grade 4" }
  ];

  // Sample subjects data with comprehensive information
  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      icon: Calculator,
      color: "blue",
      category: "core",
      difficulty: "intermediate",
      description: "Study of numbers, shapes, and patterns through problem-solving and logical reasoning",
      childId: "1",
      childName: "Kwame Mensah",
      teacher: "Mr. Osei",
      teacherEmail: "osei@nolexsms.edu.gh",
      schedule: "Mon, Wed, Fri - 8:00 AM",
      totalLessons: 45,
      completedLessons: 32,
      upcomingAssignments: 3,
      currentGrade: "A-",
      averageScore: 85,
      progress: 71,
      strengths: ["Problem Solving", "Algebra", "Geometry"],
      improvements: ["Word Problems", "Statistics"],
      resources: {
        textbooks: 3,
        videos: 12,
        worksheets: 28,
        interactive: 8
      },
      recentActivities: [
        { type: "assignment", title: "Algebraic Expressions", date: "2025-11-12", score: 88 },
        { type: "test", title: "Geometry Quiz", date: "2025-11-10", score: 92 },
        { type: "lesson", title: "Quadratic Equations", date: "2025-11-08", status: "completed" }
      ],
      nextClass: "2025-11-18 08:00",
      studyTime: "4.5 hrs/week",
      attendance: 96,
      homework: "3 pending, 2 overdue"
    },
    {
      id: 2,
      name: "English Language",
      icon: BookOpen,
      color: "green",
      category: "core",
      difficulty: "intermediate",
      description: "Development of reading, writing, speaking, and listening skills through literature and communication",
      childId: "1",
      childName: "Kwame Mensah",
      teacher: "Mrs. Addo",
      teacherEmail: "addo@nolexsms.edu.gh",
      schedule: "Tue, Thu - 9:00 AM, Fri - 11:00 AM",
      totalLessons: 38,
      completedLessons: 29,
      upcomingAssignments: 2,
      currentGrade: "B+",
      averageScore: 82,
      progress: 76,
      strengths: ["Reading Comprehension", "Creative Writing", "Vocabulary"],
      improvements: ["Grammar", "Essay Structure"],
      resources: {
        textbooks: 4,
        videos: 15,
        worksheets: 22,
        interactive: 10
      },
      recentActivities: [
        { type: "essay", title: "Character Analysis", date: "2025-11-11", score: 85 },
        { type: "reading", title: "Chapter 8 Summary", date: "2025-11-09", status: "completed" },
        { type: "presentation", title: "Poetry Recital", date: "2025-11-07", score: 90 }
      ],
      nextClass: "2025-11-18 09:00",
      studyTime: "3.8 hrs/week",
      attendance: 94,
      homework: "1 pending, 0 overdue"
    },
    {
      id: 3,
      name: "Science",
      icon: Beaker,
      color: "purple",
      category: "core",
      difficulty: "advanced",
      description: "Exploration of natural phenomena through observation, experimentation, and scientific method",
      childId: "1",
      childName: "Kwame Mensah",
      teacher: "Dr. Mensah",
      teacherEmail: "mensah@nolexsms.edu.gh",
      schedule: "Mon - 10:00 AM, Wed - 2:00 PM",
      totalLessons: 32,
      completedLessons: 24,
      upcomingAssignments: 4,
      currentGrade: "A",
      averageScore: 91,
      progress: 75,
      strengths: ["Laboratory Skills", "Scientific Method", "Biology"],
      improvements: ["Physics Concepts", "Chemistry Calculations"],
      resources: {
        textbooks: 2,
        videos: 20,
        worksheets: 18,
        interactive: 15
      },
      recentActivities: [
        { type: "experiment", title: "Plant Growth Study", date: "2025-11-13", score: 95 },
        { type: "test", title: "Life Cycles", date: "2025-11-08", score: 88 },
        { type: "project", title: "Weather Patterns", date: "2025-11-05", score: 92 }
      ],
      nextClass: "2025-11-18 10:00",
      studyTime: "5.2 hrs/week",
      attendance: 98,
      homework: "2 pending, 1 overdue"
    },
    {
      id: 4,
      name: "Social Studies",
      icon: Globe,
      color: "orange",
      category: "core",
      difficulty: "beginner",
      description: "Understanding of human society, culture, history, and geography for global citizenship",
      childId: "1",
      childName: "Kwame Mensah",
      teacher: "Mr. Asante",
      teacherEmail: "asante@nolexsms.edu.gh",
      schedule: "Tue, Thu - 2:00 PM",
      totalLessons: 28,
      completedLessons: 22,
      upcomingAssignments: 1,
      currentGrade: "B",
      averageScore: 78,
      progress: 79,
      strengths: ["History", "Geography", "Cultural Studies"],
      improvements: ["Government Systems", "Economics"],
      resources: {
        textbooks: 3,
        videos: 18,
        worksheets: 25,
        interactive: 12
      },
      recentActivities: [
        { type: "project", title: "Ghana Independence", date: "2025-11-10", score: 82 },
        { type: "map", title: "African Countries", date: "2025-11-07", score: 75 },
        { type: "essay", title: "Cultural Heritage", date: "2025-11-03", score: 80 }
      ],
      nextClass: "2025-11-19 14:00",
      studyTime: "2.5 hrs/week",
      attendance: 92,
      homework: "0 pending, 0 overdue"
    },
    {
      id: 5,
      name: "Creative Arts",
      icon: Palette,
      color: "pink",
      category: "elective",
      difficulty: "beginner",
      description: "Expression through visual arts, crafts, and creative projects to develop artistic skills",
      childId: "1",
      childName: "Kwame Mensah",
      teacher: "Ms. Boateng",
      teacherEmail: "boateng@nolexsms.edu.gh",
      schedule: "Wed - 3:00 PM, Fri - 1:00 PM",
      totalLessons: 25,
      completedLessons: 20,
      upcomingAssignments: 2,
      currentGrade: "A-",
      averageScore: 87,
      progress: 80,
      strengths: ["Drawing", "Color Theory", "Creativity"],
      improvements: ["Sculpture", "Digital Art"],
      resources: {
        textbooks: 1,
        videos: 25,
        worksheets: 15,
        interactive: 8
      },
      recentActivities: [
        { type: "project", title: "Self Portrait", date: "2025-11-12", score: 90 },
        { type: "craft", title: "Clay Pottery", date: "2025-11-08", score: 85 },
        { type: "exhibition", title: "Art Gallery", date: "2025-11-01", status: "participated" }
      ],
      nextClass: "2025-11-20 13:00",
      studyTime: "2.0 hrs/week",
      attendance: 100,
      homework: "1 pending, 0 overdue"
    },
    {
      id: 6,
      name: "Physical Education",
      icon: Heart,
      color: "red",
      category: "elective",
      difficulty: "beginner",
      description: "Physical fitness, sports skills, and healthy lifestyle habits through active participation",
      childId: "1",
      childName: "Kwame Mensah",
      teacher: "Coach Amankwah",
      teacherEmail: "amankwah@nolexsms.edu.gh",
      schedule: "Mon, Wed - 4:00 PM",
      totalLessons: 30,
      completedLessons: 26,
      upcomingAssignments: 1,
      currentGrade: "A",
      averageScore: 93,
      progress: 87,
      strengths: ["Team Sports", "Athletics", "Coordination"],
      improvements: ["Swimming", "Gymnastics"],
      resources: {
        textbooks: 1,
        videos: 8,
        worksheets: 5,
        interactive: 3
      },
      recentActivities: [
        { type: "assessment", title: "Fitness Test", date: "2025-11-11", score: 95 },
        { type: "game", title: "Football Match", date: "2025-11-06", status: "won" },
        { type: "training", title: "Sprint Technique", date: "2025-11-04", status: "completed" }
      ],
      nextClass: "2025-11-18 16:00",
      studyTime: "1.5 hrs/week",
      attendance: 95,
      homework: "0 pending, 0 overdue"
    },
    // Ama's subjects (Grade 4)
    {
      id: 7,
      name: "Mathematics",
      icon: Calculator,
      color: "blue",
      category: "core",
      difficulty: "beginner",
      description: "Foundation in numbers, basic operations, and simple problem-solving skills",
      childId: "2",
      childName: "Ama Mensah",
      teacher: "Mrs. Appiah",
      teacherEmail: "appiah@nolexsms.edu.gh",
      schedule: "Mon, Wed, Fri - 8:30 AM",
      totalLessons: 40,
      completedLessons: 28,
      upcomingAssignments: 2,
      currentGrade: "B+",
      averageScore: 83,
      progress: 70,
      strengths: ["Addition", "Subtraction", "Shapes"],
      improvements: ["Multiplication", "Division"],
      resources: {
        textbooks: 2,
        videos: 8,
        worksheets: 35,
        interactive: 12
      },
      recentActivities: [
        { type: "test", title: "Times Tables", date: "2025-11-12", score: 80 },
        { type: "worksheet", title: "Fractions", date: "2025-11-09", score: 85 },
        { type: "game", title: "Math Puzzles", date: "2025-11-07", status: "completed" }
      ],
      nextClass: "2025-11-18 08:30",
      studyTime: "3.0 hrs/week",
      attendance: 97,
      homework: "2 pending, 0 overdue"
    },
    {
      id: 8,
      name: "English Language",
      icon: BookOpen,
      color: "green",
      category: "core",
      difficulty: "beginner",
      description: "Building foundation in reading, writing, and basic communication skills",
      childId: "2",
      childName: "Ama Mensah",
      teacher: "Miss Owusu",
      teacherEmail: "owusu@nolexsms.edu.gh",
      schedule: "Tue, Thu - 9:30 AM, Fri - 10:30 AM",
      totalLessons: 35,
      completedLessons: 27,
      upcomingAssignments: 1,
      currentGrade: "A-",
      averageScore: 86,
      progress: 77,
      strengths: ["Reading", "Spelling", "Story Writing"],
      improvements: ["Handwriting", "Grammar"],
      resources: {
        textbooks: 3,
        videos: 10,
        worksheets: 28,
        interactive: 15
      },
      recentActivities: [
        { type: "story", title: "My Family", date: "2025-11-10", score: 88 },
        { type: "reading", title: "Animal Stories", date: "2025-11-08", status: "completed" },
        { type: "spelling", title: "Weekly Test", date: "2025-11-05", score: 90 }
      ],
      nextClass: "2025-11-19 09:30",
      studyTime: "2.5 hrs/week",
      attendance: 98,
      homework: "1 pending, 0 overdue"
    }
  ];

  const categories = [
    { id: "all", name: "All Subjects", count: subjects.length },
    { id: "core", name: "Core Subjects", count: subjects.filter(s => s.category === "core").length },
    { id: "elective", name: "Electives", count: subjects.filter(s => s.category === "elective").length }
  ];

  const difficulties = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" }
  ];

  // Filter subjects
  const filteredSubjects = subjects.filter(subject => {
    const childMatch = selectedChild === "all" || subject.childId === selectedChild;
    const searchMatch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       subject.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === "all" || subject.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === "all" || subject.difficulty === selectedDifficulty;
    
    return childMatch && searchMatch && categoryMatch && difficultyMatch;
  });

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 text-blue-700 border-blue-200",
      green: "bg-green-50 text-green-700 border-green-200",
      purple: "bg-purple-50 text-purple-700 border-purple-200",
      orange: "bg-orange-50 text-orange-700 border-orange-200",
      pink: "bg-pink-50 text-pink-700 border-pink-200",
      red: "bg-red-50 text-red-700 border-red-200",
      yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
      indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
      cyan: "bg-cyan-50 text-cyan-700 border-cyan-200"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconBgColor = (color: string) => {
    const colors = {
      blue: "bg-blue-100",
      green: "bg-green-100",
      purple: "bg-purple-100",
      orange: "bg-orange-100",
      pink: "bg-pink-100",
      red: "bg-red-100",
      yellow: "bg-yellow-100",
      indigo: "bg-indigo-100",
      cyan: "bg-cyan-100"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: "text-blue-600",
      green: "text-green-600",
      purple: "text-purple-600",
      orange: "text-orange-600",
      pink: "text-pink-600",
      red: "text-red-600",
      yellow: "text-yellow-600",
      indigo: "text-indigo-600",
      cyan: "text-cyan-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "core": return <Star className="w-4 h-4" />;
      case "elective": return <Lightbulb className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return "text-green-600 bg-green-50";
    if (grade.startsWith('B')) return "text-blue-600 bg-blue-50";
    if (grade.startsWith('C')) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/parent/academics"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Subjects</h1>
            <p className="text-blue-100 text-sm lg:text-base">
              Comprehensive overview of all academic subjects and performance
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{filteredSubjects.length}</div>
            <div className="text-sm text-blue-100">Total Subjects</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">
              {Math.round(filteredSubjects.reduce((acc, s) => acc + s.averageScore, 0) / filteredSubjects.length || 0)}%
            </div>
            <div className="text-sm text-blue-100">Average Score</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">
              {filteredSubjects.reduce((acc, s) => acc + s.upcomingAssignments, 0)}
            </div>
            <div className="text-sm text-blue-100">Pending Tasks</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">
              {Math.round(filteredSubjects.reduce((acc, s) => acc + s.attendance, 0) / filteredSubjects.length || 0)}%
            </div>
            <div className="text-sm text-blue-100">Attendance</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search subjects, teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
              />
            </div>

            {/* Child Selector */}
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Children</option>
              {children.map(child => (
                <option key={child.id} value={child.id}>{child.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`px-3 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                  viewMode === 'card' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cards
              </button>
            </div>

            {/* Filters */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t pt-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} {category.id !== 'all' && `(${category.count})`}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.id} value={difficulty.id}>{difficulty.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Actions</label>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                    Export Data
                  </button>
                  <button className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {getCategoryIcon(category.id)}
                <span>{category.name}</span>
                {category.id !== 'all' && (
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {category.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredSubjects.length}</span> subjects
          {selectedChild !== "all" && (
            <span> for {children.find(c => c.id === selectedChild)?.name}</span>
          )}
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Subjects Content */}
      {filteredSubjects.length === 0 ? (
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-12 text-center border">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No subjects found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'No subjects match your search criteria.' : 'No subjects available for the selected filters.'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
            : viewMode === 'list'
            ? 'space-y-4'
            : 'grid grid-cols-1 lg:grid-cols-2 gap-6'
        }`}>
          {filteredSubjects.map((subject) => (
            <div key={subject.id}>
              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconBgColor(subject.color)}`}>
                        <subject.icon className={`w-6 h-6 ${getIconColor(subject.color)}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{subject.name}</h3>
                        <p className="text-sm text-gray-600">{subject.teacher}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subject.difficulty)}`}>
                            {subject.difficulty}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            subject.category === 'core' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {getCategoryIcon(subject.category)}
                            <span className="ml-1">{subject.category}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{subject.description}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(subject.progress)}`}
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className={`text-lg font-bold px-2 py-1 rounded ${getGradeColor(subject.currentGrade)}`}>
                          {subject.currentGrade}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Current Grade</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{subject.averageScore}%</div>
                        <div className="text-xs text-gray-500 mt-1">Average Score</div>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Assignments:</span>
                        <span className="font-medium">{subject.upcomingAssignments} pending</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Attendance:</span>
                        <span className="font-medium">{subject.attendance}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Study Time:</span>
                        <span className="font-medium">{subject.studyTime}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                      <Link
                        href={`/parent/academics/subjects/${subject.id}`}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                      >
                        View Details
                      </Link>
                      <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${getIconBgColor(subject.color)}`}>
                      <subject.icon className={`w-8 h-8 ${getIconColor(subject.color)}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{subject.name}</h3>
                          <p className="text-gray-600">{subject.teacher} • {subject.childName}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-bold px-3 py-1 rounded ${getGradeColor(subject.currentGrade)}`}>
                            {subject.currentGrade}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{subject.averageScore}% avg</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-1">{subject.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{subject.progress}%</div>
                          <div className="text-xs text-gray-500">Progress</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{subject.upcomingAssignments}</div>
                          <div className="text-xs text-gray-500">Pending</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{subject.attendance}%</div>
                          <div className="text-xs text-gray-500">Attendance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{subject.studyTime}</div>
                          <div className="text-xs text-gray-500">Study Time</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subject.difficulty)}`}>
                            {subject.difficulty}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            subject.category === 'core' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {getCategoryIcon(subject.category)}
                            <span className="ml-1">{subject.category}</span>
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Link
                            href={`/parent/academics/subjects/${subject.id}`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            View Details
                          </Link>
                          <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card View */}
              {viewMode === 'card' && (
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`h-2 ${getColorClasses(subject.color).replace('text-', 'bg-').replace('-50', '-500').replace(' border-', ' ')}`} />
                  
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getIconBgColor(subject.color)}`}>
                        <subject.icon className={`w-7 h-7 ${getIconColor(subject.color)}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{subject.name}</h3>
                        <p className="text-gray-600 mb-2">{subject.teacher}</p>
                        <p className="text-sm text-gray-500">{subject.childName} • {subject.schedule}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold px-3 py-1 rounded-lg ${getGradeColor(subject.currentGrade)}`}>
                          {subject.currentGrade}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{subject.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Course Progress</span>
                        <span className="font-semibold">{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(subject.progress)}`}
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-gray-900">{subject.averageScore}%</div>
                        <div className="text-xs text-gray-500">Average</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-gray-900">{subject.upcomingAssignments}</div>
                        <div className="text-xs text-gray-500">Pending</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-gray-900">{subject.attendance}%</div>
                        <div className="text-xs text-gray-500">Attend.</div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Activity</h4>
                      <div className="space-y-1">
                        {subject.recentActivities.slice(0, 2).map((activity, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 truncate">{activity.title}</span>
                            <span className="text-gray-500">
                              {activity.score ? `${activity.score}%` : activity.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subject.difficulty)}`}>
                        {subject.difficulty}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        subject.category === 'core' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {getCategoryIcon(subject.category)}
                        <span className="ml-1">{subject.category}</span>
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/parent/academics/subjects/${subject.id}`}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                      >
                        View Details
                      </Link>
                      <button className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Performance Summary */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Overall Performance */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Overall Performance</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Average Grade:</span>
                <span className="font-semibold text-blue-600">A-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Score:</span>
                <span className="font-semibold text-blue-600">
                  {Math.round(filteredSubjects.reduce((acc, s) => acc + s.averageScore, 0) / filteredSubjects.length || 0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Progress:</span>
                <span className="font-semibold text-blue-600">
                  {Math.round(filteredSubjects.reduce((acc, s) => acc + s.progress, 0) / filteredSubjects.length || 0)}%
                </span>
              </div>
            </div>
          </div>

          {/* Top Performing Subjects */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Top Performers</h4>
            <div className="space-y-3">
              {filteredSubjects
                .sort((a, b) => b.averageScore - a.averageScore)
                .slice(0, 3)
                .map((subject, idx) => (
                  <div key={subject.id} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{subject.name}</div>
                      <div className="text-sm text-gray-600">{subject.averageScore}%</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-100 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Needs Attention</h4>
            <div className="space-y-3">
              {filteredSubjects
                .sort((a, b) => a.averageScore - b.averageScore)
                .slice(0, 3)
                .map((subject, idx) => (
                  <div key={subject.id} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      !
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{subject.name}</div>
                      <div className="text-sm text-gray-600">{subject.averageScore}%</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
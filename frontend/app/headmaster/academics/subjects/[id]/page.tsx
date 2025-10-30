"use client"

import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  BookOpen, 
  User, 
  Clock, 
  Target, 
  Users,
  Award,
  Calendar,
  MapPin,
  Edit,
  Plus,
  GraduationCap,
  TrendingUp,
  Star,
  Brain,
  Settings,
  CheckCircle,
  BarChart3,
  FileText,
  Activity
} from "lucide-react";
import Link from "next/link";

const subjects = [
  { 
    id: 1, 
    name: "Mathematics", 
    code: "MATH101", 
    teacher: "Mr. John Doe",
    category: "Core",
    difficulty: "Medium",
    hours: 5,
    classes: 6,
    students: 156,
    description: "Comprehensive mathematics covering algebra, geometry, and basic statistics for primary level students.",
    objectives: [
      "Master fundamental arithmetic operations",
      "Understand basic geometric concepts",
      "Develop problem-solving skills",
      "Apply mathematical reasoning in real-life situations"
    ],
    schedule: "Monday, Wednesday, Friday - 9:00 AM",
    room: "Math Lab A-201",
    performance: 87,
    assessmentType: "Continuous Assessment",
    prerequisites: "Basic Arithmetic",
    materials: ["Mathematics Textbook", "Calculator", "Geometry Set", "Exercise Books"],
    topicsCovered: 24,
    totalTopics: 30,
    averageGrade: "B+",
    passRate: 92
  },
  { 
    id: 2, 
    name: "English Language", 
    code: "ENG101", 
    teacher: "Ms. Jane Smith",
    category: "Core",
    difficulty: "Medium",
    hours: 5,
    classes: 6,
    students: 156,
    description: "English language development focusing on reading, writing, speaking, and listening skills.",
    objectives: [
      "Improve reading comprehension",
      "Develop writing skills",
      "Enhance oral communication",
      "Build vocabulary and grammar knowledge"
    ],
    schedule: "Tuesday, Thursday - 10:00 AM",
    room: "English Lab B-102",
    performance: 89,
    assessmentType: "Mixed Assessment",
    prerequisites: "Basic Literacy",
    materials: ["English Textbook", "Dictionary", "Reading Books", "Writing Materials"],
    topicsCovered: 18,
    totalTopics: 22,
    averageGrade: "A-",
    passRate: 94
  }
];

export default function ViewSubjectPage() {
  const params = useParams();
  const { id } = params;

  const subjectId = typeof id === 'string' ? parseInt(id, 10) : NaN;
  const subjectData = subjects.find((s) => s.id === subjectId);

  if (!subjectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Subject Not Found</h1>
          <p className="text-gray-600 mb-6">The requested subject could not be found in our records.</p>
          <Link href="/headmaster/academics/classes" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
            Back to Subjects
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    return category === "Core" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800";
  };

  const progressPercentage = (subjectData.topicsCovered / subjectData.totalTopics) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link href="/headmaster/academics/classes" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Subjects</span>
              </Link>
            </div>

            {/* Subject Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-4xl lg:text-5xl font-bold">{subjectData.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(subjectData.category).replace('text-blue-800', 'text-blue-100').replace('bg-blue-100', 'bg-white/20')}`}>
                    {subjectData.category}
                  </span>
                </div>
                <p className="text-xl text-blue-100 mb-4">{subjectData.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-blue-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{subjectData.students} Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    <span>{subjectData.classes} Classes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{subjectData.hours}h/week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subjectData.difficulty).replace('text-yellow-800', 'text-yellow-100').replace('bg-yellow-100', 'bg-white/20')}`}>
                      {subjectData.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  Edit Subject
                </button>
                <button className="bg-white hover:bg-gray-100 text-blue-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg">
                  <Plus className="w-5 h-5" />
                  Add Content
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8 -mt-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Subject Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Teacher Information Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Subject Teacher</h2>
                <p className="text-blue-100">Primary instructor and subject coordinator</p>
              </div>
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center">
                    <User className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{subjectData.teacher}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span>{subjectData.schedule}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span>{subjectData.room}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-blue-600" />
                        <span>{subjectData.assessmentType}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-blue-600" />
                        <span>Subject Code: {subjectData.code}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Learning Objectives</h2>
                <p className="text-green-100">Key goals and outcomes for this subject</p>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjectData.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span className="text-gray-700">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Materials & Resources */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Course Materials</h2>
                <p className="text-purple-100">Required textbooks and resources</p>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {subjectData.materials.map((material, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700 font-medium">{material}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">
                    <strong>Prerequisites:</strong> {subjectData.prerequisites}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Progress */}
          <div className="space-y-8">
            
            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Performance Metrics</h2>
                <p className="text-orange-100">Subject performance overview</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Overall Performance</span>
                    <span className="text-2xl font-bold text-orange-600">{subjectData.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${subjectData.performance}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Topics Covered</span>
                    <span className="text-lg font-bold text-blue-600">{subjectData.topicsCovered}/{subjectData.totalTopics}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{subjectData.averageGrade}</div>
                    <div className="text-sm text-gray-600">Avg Grade</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{subjectData.passRate}%</div>
                    <div className="text-sm text-gray-600">Pass Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Quick Statistics</h2>
                <p className="text-cyan-100">Key subject metrics</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-cyan-600" />
                    <span className="font-medium text-gray-700">Total Students</span>
                  </div>
                  <span className="text-2xl font-bold text-cyan-600">{subjectData.students}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-cyan-600" />
                    <span className="font-medium text-gray-700">Active Classes</span>
                  </div>
                  <span className="text-2xl font-bold text-cyan-600">{subjectData.classes}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-cyan-600" />
                    <span className="font-medium text-gray-700">Weekly Hours</span>
                  </div>
                  <span className="text-2xl font-bold text-cyan-600">{subjectData.hours}h</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Quick Actions</h2>
                <p className="text-indigo-100">Common subject management tasks</p>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3">
                  <BarChart3 className="w-5 h-5" />
                  View Analytics
                </button>
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  Manage Schedule
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3">
                  <Activity className="w-5 h-5" />
                  Student Progress
                </button>
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  Subject Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
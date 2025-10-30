"use client"

import { useState } from "react";
import { 
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Award,
  Target,
  ArrowLeft,
  Download,
  Filter,
  Search,
  Calendar,
  FileText,
  Star,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit3,
  Printer,
  Share2,
  RefreshCw,
  Activity,
  Clock,
  MapPin
} from "lucide-react";
import Link from "next/link";

const examResults = [
  {
    id: 1,
    name: "First Term Mid-Term Examination",
    type: "Mid-Term Examination",
    date: "2024-10-15",
    totalStudents: 180,
    completedStudents: 180,
    averageScore: 76.5,
    highestScore: 98,
    lowestScore: 32,
    passRate: 85.5,
    status: "Completed"
  },
  {
    id: 2,
    name: "Grade 4-6 Mathematics Quiz",
    type: "Quiz",
    date: "2024-10-20",
    totalStudents: 85,
    completedStudents: 82,
    averageScore: 81.2,
    highestScore: 100,
    lowestScore: 45,
    passRate: 92.7,
    status: "Completed"
  },
  {
    id: 3,
    name: "English Language Test",
    type: "Class Test",
    date: "2024-10-25",
    totalStudents: 120,
    completedStudents: 115,
    averageScore: 72.8,
    highestScore: 95,
    lowestScore: 28,
    passRate: 79.1,
    status: "Completed"
  }
];

const subjectPerformance = [
  { subject: "Mathematics", average: 78.5, passRate: 88.2, improvement: 5.2, color: "#10b981" },
  { subject: "English Language", average: 72.8, passRate: 79.1, improvement: -2.1, color: "#3b82f6" },
  { subject: "Science", average: 81.3, passRate: 91.5, improvement: 7.8, color: "#8b5cf6" },
  { subject: "Social Studies", average: 69.4, passRate: 75.3, improvement: 1.5, color: "#f59e0b" },
  { subject: "Computing", average: 85.7, passRate: 95.2, improvement: 12.3, color: "#ef4444" },
  { subject: "RME", average: 77.9, passRate: 86.7, improvement: 3.4, color: "#06b6d4" },
];

const gradeDistribution = [
  { grade: "A", count: 45, percentage: 35, color: "#10b981" },
  { grade: "B", count: 32, percentage: 25, color: "#3b82f6" },
  { grade: "C", count: 26, percentage: 20, color: "#f59e0b" },
  { grade: "D", count: 19, percentage: 15, color: "#ef4444" },
  { grade: "F", count: 6, percentage: 5, color: "#6b7280" },
];

const classPerformance = [
  { class: "Grade 1", average: 82.1, passRate: 94.4, totalStudents: 45 },
  { class: "Grade 2", average: 79.8, passRate: 90.5, totalStudents: 42 },
  { class: "Grade 3", average: 76.3, passRate: 86.8, totalStudents: 38 },
  { class: "Grade 4", average: 73.7, passRate: 82.9, totalStudents: 35 },
  { class: "Grade 5", average: 77.5, passRate: 87.5, totalStudents: 40 },
  { class: "Grade 6", average: 74.9, passRate: 84.8, totalStudents: 33 },
];

const topPerformers = [
  { id: 1, name: "Sarah Johnson", class: "Grade 6", score: 98, subject: "Mathematics" },
  { id: 2, name: "Michael Chen", class: "Grade 5", score: 96, subject: "Science" },
  { id: 3, name: "Emily Davis", class: "Grade 4", score: 95, subject: "English" },
  { id: 4, name: "David Wilson", class: "Grade 6", score: 94, subject: "Computing" },
  { id: 5, name: "Lisa Thompson", class: "Grade 3", score: 93, subject: "Mathematics" },
];

export default function ViewResultsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-term");
  const [selectedView, setSelectedView] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = examResults.filter(result => 
    result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const overallStats = {
    totalExams: examResults.length,
    totalStudents: examResults.reduce((acc, exam) => acc + exam.totalStudents, 0),
    averageScore: (examResults.reduce((acc, exam) => acc + exam.averageScore, 0) / examResults.length).toFixed(1),
    overallPassRate: (examResults.reduce((acc, exam) => acc + exam.passRate, 0) / examResults.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/headmaster/academics/exams"
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <BarChart3 className="w-10 h-10" />
                  Examination Results & Analytics
                </h1>
                <p className="text-green-100 text-lg">Comprehensive performance analysis and insights</p>
                <div className="flex items-center gap-6 mt-4 text-green-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">{overallStats.totalExams} Completed Exams</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{overallStats.totalStudents} Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">{overallStats.averageScore}% Average</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">{overallStats.overallPassRate}% Pass Rate</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-white hover:bg-green-50 text-green-700 border-2 border-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Download className="w-5 h-5 mr-2" />
                Export Report
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Printer className="w-5 h-5 mr-2" />
                Print Results
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Average Score</p>
              <p className="text-3xl font-bold text-green-600">{overallStats.averageScore}%</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>5.2% increase</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pass Rate</p>
              <p className="text-3xl font-bold text-blue-600">{overallStats.overallPassRate}%</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-blue-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>3.1% increase</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Highest Score</p>
              <p className="text-3xl font-bold text-purple-600">98%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-purple-600 text-sm">
            <Award className="w-4 h-4 mr-1" />
            <span>Excellence achieved</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold text-orange-600">{overallStats.totalStudents}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-orange-600 text-sm">
            <Activity className="w-4 h-4 mr-1" />
            <span>100% participation</span>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search examinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="current-term">Current Term</option>
              <option value="last-term">Last Term</option>
              <option value="current-year">Current Year</option>
              <option value="all-time">All Time</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedView("overview")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedView === "overview" 
                  ? "bg-green-500 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedView("detailed")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedView === "detailed" 
                  ? "bg-green-500 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Detailed
            </button>
          </div>
        </div>
      </div>

      {selectedView === "overview" ? (
        <div className="space-y-8">
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Subject Performance Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Subject Performance Overview</h3>
              <div className="space-y-4">
                {subjectPerformance.map((subject, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: subject.color }}
                        ></div>
                        <h4 className="font-semibold text-gray-900">{subject.subject}</h4>
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${
                        subject.improvement > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {subject.improvement > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(subject.improvement)}%
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Average:</span>
                        <span className="ml-2 font-medium">{subject.average}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Pass Rate:</span>
                        <span className="ml-2 font-medium">{subject.passRate}%</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${subject.passRate}%`, 
                            backgroundColor: subject.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Grade Distribution</h3>
              <div className="space-y-4">
                {gradeDistribution.map((grade, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 text-center font-bold text-gray-700 text-lg">{grade.grade}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div 
                        className="h-4 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${grade.percentage}%`, 
                          backgroundColor: grade.color 
                        }}
                      ></div>
                    </div>
                    <div className="w-16 text-right">
                      <div className="font-bold text-gray-900">{grade.count}</div>
                      <div className="text-sm text-gray-500">{grade.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">128</div>
                  <div className="text-sm text-gray-600">Total Students Graded</div>
                </div>
              </div>
            </div>
          </div>

          {/* Class Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Class Performance Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classPerformance.map((classData, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl hover:border-green-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-900">{classData.class}</h4>
                    <span className="text-sm text-gray-500">{classData.totalStudents} students</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Average Score:</span>
                      <span className="font-bold text-green-600">{classData.average}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pass Rate:</span>
                      <span className="font-bold text-blue-600">{classData.passRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${classData.passRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performers</h3>
            <div className="space-y-4">
              {topPerformers.map((student, index) => (
                <div key={student.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-600">{student.class} • {student.subject}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">{student.score}%</div>
                    <div className="text-sm text-gray-500">Score</div>
                  </div>
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Star className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Detailed View
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-50 to-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Examination</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Students</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Average</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Highest</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Lowest</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Pass Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{result.name}</div>
                        <div className="text-sm text-gray-500">{result.type}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{result.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{result.completedStudents}</div>
                        <div className="text-xs text-gray-500">of {result.totalStudents}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-green-600">{result.averageScore}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-blue-600">{result.highestScore}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-red-600">{result.lowestScore}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${result.passRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{result.passRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-2 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
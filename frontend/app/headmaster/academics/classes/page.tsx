"use client"

import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Users, 
  Book, 
  User, 
  GraduationCap,
  BookOpen,
  Edit3,
  MoreVertical,
  Download,
  Upload,
  Grid3X3,
  List,
  Calendar,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  ChevronDown,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const classes = [
  { id: 1, name: "Grade 1", teacher: "Mr. John Doe", subjects: 5, students: 28, room: "A101", schedule: "8:00 AM - 2:00 PM", performance: 92 },
  { id: 2, name: "Grade 2", teacher: "Ms. Jane Smith", subjects: 5, students: 30, room: "A102", schedule: "8:00 AM - 2:00 PM", performance: 88 },
  { id: 3, name: "Grade 3", teacher: "Mr. David Johnson", subjects: 6, students: 25, room: "B101", schedule: "8:00 AM - 2:30 PM", performance: 90 },
  { id: 4, name: "Grade 4", teacher: "Ms. Emily Williams", subjects: 6, students: 27, room: "B102", schedule: "8:00 AM - 2:30 PM", performance: 85 },
  { id: 5, name: "Grade 5", teacher: "Mr. Michael Brown", subjects: 7, students: 24, room: "C101", schedule: "8:00 AM - 3:00 PM", performance: 94 },
  { id: 6, name: "Grade 6", teacher: "Ms. Sarah Davis", subjects: 8, students: 26, room: "C102", schedule: "8:00 AM - 3:00 PM", performance: 91 },
];

const subjects = [
  { id: 1, name: "Mathematics", code: "MATH101", classes: 6, teachers: 3, category: "Core", difficulty: "Medium", hours: 5 },
  { id: 2, name: "English Language", code: "ENG101", classes: 6, teachers: 2, category: "Core", difficulty: "Medium", hours: 5 },
  { id: 3, name: "Integrated Science", code: "SCI101", classes: 5, teachers: 2, category: "Core", difficulty: "Hard", hours: 4 },
  { id: 4, name: "Social Studies", code: "SST101", classes: 6, teachers: 2, category: "Core", difficulty: "Easy", hours: 3 },
  { id: 5, name: "Computing", code: "ICT101", classes: 4, teachers: 1, category: "Elective", difficulty: "Medium", hours: 2 },
  { id: 6, name: "Religious and Moral Education", code: "RME101", classes: 6, teachers: 1, category: "Core", difficulty: "Easy", hours: 2 },
  { id: 7, name: "French", code: "FRE101", classes: 3, teachers: 1, category: "Elective", difficulty: "Hard", hours: 3 },
  { id: 8, name: "Physical Education", code: "PE101", classes: 6, teachers: 2, category: "Core", difficulty: "Easy", hours: 2 },
];

export default function ClassesAndSubjectsPage() {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("classes");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table"); // table or grid
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    console.log("Deleting:", selectedItem);
    setShowDeletePopup(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    return category === "Core" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800";
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return "text-green-600";
    if (performance >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <GraduationCap className="w-10 h-10" />
                Classes & Subjects Management
              </h1>
              <p className="text-green-100 text-lg">Organize and manage your academic structure efficiently</p>
              <div className="flex items-center gap-6 mt-4 text-green-100">
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  <span className="text-sm">{classes.length} Classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">{subjects.length} Subjects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{classes.reduce((acc, c) => acc + c.students, 0)} Students</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/headmaster/academics/classes/new-class" className="bg-white hover:bg-green-50 text-green-700 border-2 border-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Plus className="w-5 h-5 mr-2" />
                Add New Class
              </Link>
              <Link href="/headmaster/academics/classes/new-subject" className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Plus className="w-5 h-5 mr-2" />
                Add New Subject
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-green-400/20 rounded-full translate-y-16"></div>
      </div>

      {/* Enhanced Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search classes, subjects, or teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="name">Sort by Name</option>
                <option value="teacher">Sort by Teacher</option>
                <option value="students">Sort by Students</option>
                <option value="performance">Sort by Performance</option>
              </select>
              <select 
                value={filterBy} 
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All {activeTab}</option>
                <option value="high">High Performance</option>
                <option value="medium">Medium Performance</option>
                <option value="low">Low Performance</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("table")}
              className={`p-3 rounded-lg transition-colors ${viewMode === "table" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-lg transition-colors ${viewMode === "grid" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Modern Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 relative ${
              activeTab === "classes" 
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white" 
                : "text-gray-500 hover:text-green-600 hover:bg-green-50"
            }`}
            onClick={() => setActiveTab("classes")}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              <span>Classes ({classes.length})</span>
            </div>
          </button>
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 relative ${
              activeTab === "subjects" 
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" 
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("subjects")}
          >
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>Subjects ({subjects.length})</span>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "classes" && (
        <div className="space-y-6">
          {viewMode === "table" ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-50 to-green-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Class Information</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Class Teacher</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Students</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Schedule</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Performance</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-green-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {classes.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-lg">
                              <GraduationCap className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{c.name}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                Room {c.room}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 p-1 rounded-full">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-900">{c.teacher}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{c.students}</span>
                            <span className="text-sm text-gray-500">students</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {c.schedule}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className={`w-4 h-4 ${getPerformanceColor(c.performance)}`} />
                            <span className={`font-semibold ${getPerformanceColor(c.performance)}`}>
                              {c.performance}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link 
                              href={`/headmaster/academics/classes/${c.id}`} 
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link 
                              href={`/headmaster/academics/classes/edit/${c.id}`}
                              className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors"
                              title="Edit Class"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>
                            <button 
                              onClick={() => handleDeleteClick(c)} 
                              className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
                              title="Delete Class"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((c) => (
                <div key={c.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{c.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">{c.performance}%</span>
                      </div>
                    </div>
                    <p className="text-green-100 text-sm">Room {c.room}</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Teacher:</span>
                        <span className="font-medium">{c.teacher}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Students:</span>
                        <span className="font-medium">{c.students}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Book className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Subjects:</span>
                        <span className="font-medium">{c.subjects}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{c.schedule}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                      <Link 
                        href={`/headmaster/academics/classes/${c.id}`} 
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors text-center"
                      >
                        View Details
                      </Link>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "subjects" && (
        <div className="space-y-6">
          {viewMode === "table" ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Subject Information</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Classes</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Teachers</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Difficulty</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {subjects.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{s.name}</div>
                              <div className="text-sm text-gray-500">{s.code}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(s.category)}`}>
                            {s.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium">{s.classes}</span>
                          <span className="text-sm text-gray-500 ml-1">classes</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{s.teachers}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(s.difficulty)}`}>
                            {s.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link 
                              href={`/headmaster/academics/subjects/${s.id}`}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link 
                              href={`/headmaster/academics/subjects/edit/${s.id}`}
                              className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors"
                              title="Edit Subject"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>
                            <button 
                              onClick={() => handleDeleteClick(s)} 
                              className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
                              title="Delete Subject"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((s) => (
                <div key={s.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">{s.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(s.category).replace('text-blue-800', 'text-blue-100').replace('bg-blue-100', 'bg-white/20')}`}>
                        {s.category}
                      </span>
                    </div>
                    <p className="text-blue-100 text-sm">{s.code}</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Classes:</span>
                        <span className="font-medium">{s.classes}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Teachers:</span>
                        <span className="font-medium">{s.teachers}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Weekly Hours:</span>
                        <span className="font-medium">{s.hours}h</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Difficulty:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(s.difficulty)}`}>
                          {s.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                      <Link 
                        href={`/headmaster/academics/subjects/${s.id}`}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors text-center"
                      >
                        View Details
                      </Link>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Enhanced Delete Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full transform animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-full">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Delete {activeTab === "classes" ? "Class" : "Subject"}
                  </h2>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">"{selectedItem?.name}"</span>?
                </p>
                
                {activeTab === "classes" ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">This will permanently remove:</h4>
                    <ul className="text-sm text-red-700 space-y-1 ml-4">
                      <li>• All class information and settings</li>
                      <li>• Student enrollments ({selectedItem?.students} students affected)</li>
                      <li>• Subject assignments and schedules</li>
                      <li>• Academic records and progress data</li>
                      <li>• Teacher assignments and class materials</li>
                    </ul>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">This will permanently remove:</h4>
                    <ul className="text-sm text-red-700 space-y-1 ml-4">
                      <li>• Subject from all {selectedItem?.classes} active classes</li>
                      <li>• All lesson plans and curriculum content</li>
                      <li>• Student grades and assessment records</li>
                      <li>• Teacher assignments and schedules</li>
                      <li>• Subject materials and resources</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setShowDeletePopup(false)} 
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete} 
                  className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete {activeTab === "classes" ? "Class" : "Subject"}
                </button>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    Consider archiving instead of deleting to preserve historical data.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
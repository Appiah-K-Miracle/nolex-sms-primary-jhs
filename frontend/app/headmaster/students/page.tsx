"use client"

import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  Download,
  Upload,
  Plus,
  GraduationCap,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  TrendingUp,
  Activity,
  Grid3X3,
  List,
  MoreVertical,
  UserCheck,
  UserX,
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
  Star,
  School,
  Home,
  Heart,
  Printer,
  Send,
  FileText,
  Target,
  BarChart3
} from "lucide-react";
import Link from "next/link";

const studentStatuses = [
  { id: 1, name: "Active", color: "#10b981", bgColor: "#d1fae5", textColor: "#065f46" },
  { id: 2, name: "Inactive", color: "#f59e0b", bgColor: "#fef3c7", textColor: "#92400e" },
  { id: 3, name: "Graduated", color: "#8b5cf6", bgColor: "#ede9fe", textColor: "#5b21b6" },
  { id: 4, name: "Suspended", color: "#ef4444", bgColor: "#fee2e2", textColor: "#991b1b" },
  { id: 5, name: "Transferred", color: "#6b7280", bgColor: "#f3f4f6", textColor: "#374151" },
];

const students = [
  {
    id: 1,
    studentId: "NLX2024001",
    firstName: "Sarah",
    middleName: "Grace",
    lastName: "Johnson",
    dateOfBirth: "2015-03-15",
    age: 10,
    gender: "Female",
    grade: "Grade 4",
    class: "4A",
    status: "Active",
    enrollmentDate: "2024-09-01",
    parentName: "Michael Johnson",
    parentPhone: "+233 244 567 890",
    parentEmail: "michael.johnson@email.com",
    address: "123 Oak Street, East Legon, Accra",
    bloodGroup: "O+",
    medicalConditions: "None",
    allergies: "Peanuts",
    emergencyContact: "+233 244 567 891",
    previousSchool: "Little Angels Kindergarten",
    averageGrade: 85.5,
    attendance: 95.2,
    disciplinaryRecord: "Clean",
    extracurriculars: ["Music", "Sports"],
    photoUrl: null
  },
  {
    id: 2,
    studentId: "NLX2024002",
    firstName: "David",
    middleName: "Kwame",
    lastName: "Chen",
    dateOfBirth: "2016-08-22",
    age: 9,
    gender: "Male",
    grade: "Grade 3",
    class: "3B",
    status: "Active",
    enrollmentDate: "2024-09-01",
    parentName: "Lisa Chen",
    parentPhone: "+233 244 123 456",
    parentEmail: "lisa.chen@email.com",
    address: "456 Maple Avenue, Kumasi",
    bloodGroup: "A+",
    medicalConditions: "Mild Asthma",
    allergies: "None",
    emergencyContact: "+233 244 123 457",
    previousSchool: "Rainbow Nursery",
    averageGrade: 78.3,
    attendance: 92.8,
    disciplinaryRecord: "Clean",
    extracurriculars: ["Art", "Science Club"],
    photoUrl: null
  },
  {
    id: 3,
    studentId: "NLX2024003",
    firstName: "Emily",
    middleName: "Akosua",
    lastName: "Davis",
    dateOfBirth: "2014-12-10",
    age: 10,
    gender: "Female",
    grade: "Grade 5",
    class: "5A",
    status: "Active",
    enrollmentDate: "2024-09-01",
    parentName: "Robert Davis",
    parentPhone: "+233 244 789 012",
    parentEmail: "robert.davis@email.com",
    address: "789 Pine Road, Tamale",
    bloodGroup: "B+",
    medicalConditions: "None",
    allergies: "None",
    emergencyContact: "+233 244 789 013",
    previousSchool: "Bright Stars Academy",
    averageGrade: 91.2,
    attendance: 97.5,
    disciplinaryRecord: "Clean",
    extracurriculars: ["Drama", "Chess"],
    photoUrl: null
  },
  {
    id: 4,
    studentId: "NLX2024004",
    firstName: "James",
    middleName: "Kofi",
    lastName: "Wilson",
    dateOfBirth: "2017-05-18",
    age: 8,
    gender: "Male",
    grade: "Grade 1",
    class: "1C",
    status: "Active",
    enrollmentDate: "2024-09-01",
    parentName: "Mary Wilson",
    parentPhone: "+233 244 345 678",
    parentEmail: "mary.wilson@email.com",
    address: "321 Cedar Lane, Ho",
    bloodGroup: "AB+",
    medicalConditions: "Food Allergies",
    allergies: "Nuts, Seafood",
    emergencyContact: "+233 244 345 679",
    previousSchool: "First Steps Kindergarten",
    averageGrade: 82.7,
    attendance: 89.4,
    disciplinaryRecord: "Clean",
    extracurriculars: ["Sports"],
    photoUrl: null
  },
  {
    id: 5,
    studentId: "NLX2024005",
    firstName: "Grace",
    middleName: "Ama",
    lastName: "Thompson",
    dateOfBirth: "2015-09-30",
    age: 10,
    gender: "Female",
    grade: "Grade 4",
    class: "4B",
    status: "Inactive",
    enrollmentDate: "2024-09-01",
    parentName: "John Thompson",
    parentPhone: "+233 244 901 234",
    parentEmail: "john.thompson@email.com",
    address: "654 Birch Street, Cape Coast",
    bloodGroup: "O-",
    medicalConditions: "None",
    allergies: "None",
    emergencyContact: "+233 244 901 235",
    previousSchool: "Golden Gate Primary",
    averageGrade: 76.8,
    attendance: 85.6,
    disciplinaryRecord: "1 Minor Warning",
    extracurriculars: ["Music"],
    photoUrl: null
  },
  {
    id: 6,
    studentId: "NLX2024006",
    firstName: "Michael",
    middleName: "Kwaku",
    lastName: "Brown",
    dateOfBirth: "2013-11-12",
    age: 11,
    gender: "Male",
    grade: "Grade 6",
    class: "6A",
    status: "Graduated",
    enrollmentDate: "2019-09-01",
    parentName: "Patricia Brown",
    parentPhone: "+233 244 567 123",
    parentEmail: "patricia.brown@email.com",
    address: "987 Elm Avenue, Accra",
    bloodGroup: "A-",
    medicalConditions: "None",
    allergies: "None",
    emergencyContact: "+233 244 567 124",
    previousSchool: "Smart Kids Academy",
    averageGrade: 88.9,
    attendance: 96.7,
    disciplinaryRecord: "Clean",
    extracurriculars: ["Drama", "Science Club", "Sports"],
    photoUrl: null
  }
];

const gradeClasses = [
  { grade: "Nursery 1", classes: ["N1A", "N1B"], students: 45, capacity: 50 },
  { grade: "Nursery 2", classes: ["N2A", "N2B"], students: 43, capacity: 50 },
  { grade: "Kindergarten 1", classes: ["K1A", "K1B", "K1C"], students: 68, capacity: 75 },
  { grade: "Kindergarten 2", classes: ["K2A", "K2B"], students: 42, capacity: 50 },
  { grade: "Grade 1", classes: ["1A", "1B", "1C"], students: 72, capacity: 75 },
  { grade: "Grade 2", classes: ["2A", "2B"], students: 48, capacity: 50 },
  { grade: "Grade 3", classes: ["3A", "3B"], students: 46, capacity: 50 },
  { grade: "Grade 4", classes: ["4A", "4B"], students: 44, capacity: 50 },
  { grade: "Grade 5", classes: ["5A", "5B"], students: 41, capacity: 50 },
  { grade: "Grade 6", classes: ["6A"], students: 35, capacity: 40 },
];

const recentActivities = [
  { id: 1, action: "New Student Enrolled", student: "Sarah Johnson", time: "2 hours ago", type: "enrollment" },
  { id: 2, action: "Grade Updated", student: "David Chen", time: "4 hours ago", type: "academic" },
  { id: 3, action: "Status Changed", student: "Emily Davis", time: "6 hours ago", type: "status" },
  { id: 4, action: "Contact Updated", student: "James Wilson", time: "1 day ago", type: "contact" },
];

export default function StudentListPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterGrade, setFilterGrade] = useState("all");
  const [filterClass, setFilterClass] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const getStatusInfo = (status) => {
    const statusInfo = studentStatuses.find(s => s.name === status);
    return statusInfo || studentStatuses[0];
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    const matchesGrade = filterGrade === "all" || student.grade === filterGrade;
    const matchesClass = filterClass === "all" || student.class === filterClass;
    return matchesSearch && matchesStatus && matchesGrade && matchesClass;
  });

  const statsData = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.status === "Active").length,
    inactiveStudents: students.filter(s => s.status === "Inactive").length,
    totalClasses: gradeClasses.reduce((acc, grade) => acc + grade.classes.length, 0),
    totalCapacity: gradeClasses.reduce((acc, grade) => acc + grade.capacity, 0),
    averageAttendance: (students.reduce((acc, s) => acc + s.attendance, 0) / students.length).toFixed(1),
    averageGrade: (students.reduce((acc, s) => acc + s.averageGrade, 0) / students.length).toFixed(1)
  };

  const openDeleteModal = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting student:", studentToDelete);
    setShowDeleteModal(false);
    setStudentToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Users className="w-10 h-10" />
                Student Management
              </h1>
              <p className="text-purple-100 text-lg">Manage enrolled students and their academic records</p>
              <div className="flex items-center gap-6 mt-4 text-purple-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{statsData.totalStudents} Total Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <School className="w-4 h-4" />
                  <span className="text-sm">{statsData.totalClasses} Classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">{statsData.averageAttendance}% Avg Attendance</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="/headmaster/students/create"
                className="bg-white hover:bg-purple-50 text-purple-700 border-2 border-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Student
              </Link>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Upload className="w-5 h-5 mr-2" />
                Import Students
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-purple-400/20 rounded-full translate-y-16"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold text-purple-600">{statsData.totalStudents}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-purple-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>12% increase this term</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Students</p>
              <p className="text-3xl font-bold text-green-600">{statsData.activeStudents}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-600 text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>Currently enrolled</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Average Grade</p>
              <p className="text-3xl font-bold text-blue-600">{statsData.averageGrade}%</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-blue-600 text-sm">
            <Award className="w-4 h-4 mr-1" />
            <span>Across all grades</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Attendance Rate</p>
              <p className="text-3xl font-bold text-orange-600">{statsData.averageAttendance}%</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-orange-600 text-sm">
            <Activity className="w-4 h-4 mr-1" />
            <span>This academic year</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 relative ${
              activeTab === "overview" 
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white" 
                : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <div className="flex items-center justify-center gap-2">
              <Eye className="w-5 h-5" />
              <span>Overview</span>
            </div>
          </button>
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 relative ${
              activeTab === "students" 
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" 
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("students")}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              <span>All Students ({students.length})</span>
            </div>
          </button>
          <button
            className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 relative ${
              activeTab === "classes" 
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white" 
                : "text-gray-500 hover:text-green-600 hover:bg-green-50"
            }`}
            onClick={() => setActiveTab("classes")}
          >
            <div className="flex items-center justify-center gap-2">
              <School className="w-5 h-5" />
              <span>Class Overview</span>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link 
                href="/headmaster/students/create"
                className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Student</span>
              </Link>
              <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Upload className="w-5 h-5" />
                <span>Bulk Import</span>
              </button>
              <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Download className="w-5 h-5" />
                <span>Export Data</span>
              </button>
              <button className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <BarChart3 className="w-5 h-5" />
                <span>Generate Reports</span>
              </button>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Student Status Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {studentStatuses.map((status) => {
                const count = students.filter(student => student.status === status.name).length;
                const percentage = ((count / students.length) * 100).toFixed(1);
                return (
                  <div key={status.id} className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: status.color }}
                      ></div>
                      <h4 className="font-semibold text-gray-900">{status.name}</h4>
                    </div>
                    <div className="text-2xl font-bold mb-1" style={{ color: status.color }}>{count}</div>
                    <div className="text-sm text-gray-500">{percentage}% of total</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${percentage}%`, 
                          backgroundColor: status.color 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grade Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Grade Performance Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gradeClasses.map((gradeInfo) => {
                const gradeStudents = students.filter(s => s.grade === gradeInfo.grade);
                const avgGrade = gradeStudents.length > 0 ? 
                  (gradeStudents.reduce((acc, s) => acc + s.averageGrade, 0) / gradeStudents.length).toFixed(1) : 0;
                const avgAttendance = gradeStudents.length > 0 ? 
                  (gradeStudents.reduce((acc, s) => acc + s.attendance, 0) / gradeStudents.length).toFixed(1) : 0;
                
                return (
                  <div key={gradeInfo.grade} className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-900">{gradeInfo.grade}</h4>
                      <span className="text-sm text-gray-500">{gradeInfo.students}/{gradeInfo.capacity} students</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Classes:</span>
                        <span className="font-medium text-gray-900">{gradeInfo.classes.join(", ")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg Grade:</span>
                        <span className="font-medium text-blue-600">{avgGrade}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Attendance:</span>
                        <span className="font-medium text-green-600">{avgAttendance}%</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Capacity</span>
                        <span>{gradeInfo.capacity}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(gradeInfo.students / gradeInfo.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "enrollment" ? "bg-green-100 text-green-600" :
                    activity.type === "academic" ? "bg-blue-100 text-blue-600" :
                    activity.type === "status" ? "bg-purple-100 text-purple-600" :
                    "bg-orange-100 text-orange-600"
                  }`}>
                    {activity.type === "enrollment" && <UserCheck className="w-5 h-5" />}
                    {activity.type === "academic" && <BookOpen className="w-5 h-5" />}
                    {activity.type === "status" && <Activity className="w-5 h-5" />}
                    {activity.type === "contact" && <Phone className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.student} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "students" && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Status</option>
                  {studentStatuses.map((status) => (
                    <option key={status.id} value={status.name}>{status.name}</option>
                  ))}
                </select>
                <select 
                  value={filterGrade} 
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Grades</option>
                  {gradeClasses.map((grade) => (
                    <option key={grade.grade} value={grade.grade}>{grade.grade}</option>
                  ))}
                </select>
                <select 
                  value={filterClass} 
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Classes</option>
                  {gradeClasses.flatMap(grade => grade.classes).map((className) => (
                    <option key={className} value={className}>{className}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-colors ${viewMode === "list" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-colors ${viewMode === "grid" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Students List/Grid */}
          {viewMode === "list" ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Student</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Student ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Grade/Class</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Parent Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Performance</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-purple-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredStudents.map((student) => {
                      const statusInfo = getStatusInfo(student.status);
                      return (
                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                {student.firstName[0]}{student.lastName[0]}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{student.firstName} {student.lastName}</div>
                                <div className="text-sm text-gray-500">Age: {student.age}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-900">{student.studentId}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <span className="font-medium text-gray-900">{student.grade}</span>
                              <div className="text-sm text-gray-500">Class {student.class}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span 
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{ 
                                backgroundColor: statusInfo.bgColor, 
                                color: statusInfo.textColor 
                              }}
                            >
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{student.parentName}</div>
                              <div className="text-sm text-gray-500">{student.parentPhone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className="text-blue-600 font-medium">Grade: {student.averageGrade}%</div>
                              <div className="text-green-600">Attendance: {student.attendance}%</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Link 
                                href={`/headmaster/students/${student.id}`}
                                className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <Link 
                                href={`/headmaster/students/edit/${student.id}`}
                                className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </Link>
                              <button 
                                onClick={() => openDeleteModal(student)}
                                className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => {
                const statusInfo = getStatusInfo(student.status);
                return (
                  <div key={student.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                    <div 
                      className="h-2"
                      style={{ backgroundColor: statusInfo.color }}
                    ></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {student.firstName[0]}{student.lastName[0]}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{student.firstName} {student.lastName}</h3>
                            <p className="text-sm text-gray-600">{student.studentId}</p>
                          </div>
                        </div>
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: statusInfo.bgColor, 
                            color: statusInfo.textColor 
                          }}
                        >
                          {student.status}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Grade/Class:</span>
                          <span className="font-medium">{student.grade} - {student.class}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Age:</span>
                          <span className="font-medium">{student.age} years</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Parent:</span>
                          <span className="font-medium">{student.parentName}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Performance:</span>
                          <span className="font-medium text-blue-600">{student.averageGrade}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Attendance:</span>
                          <span className="font-medium text-green-600">{student.attendance}%</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/headmaster/students/${student.id}`}
                          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                        >
                          View Details
                        </Link>
                        <button 
                          onClick={() => openDeleteModal(student)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === "classes" && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Class Management Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradeClasses.map((gradeInfo) => {
              const occupancyRate = ((gradeInfo.students / gradeInfo.capacity) * 100).toFixed(1);
              return (
                <div key={gradeInfo.grade} className="p-6 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">{gradeInfo.grade}</h4>
                    <span className="text-sm text-gray-500">Capacity: {gradeInfo.capacity}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Classes:</span>
                      <span className="font-medium text-purple-600">{gradeInfo.classes.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium text-blue-600">{gradeInfo.students}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-medium text-green-600">{gradeInfo.capacity - gradeInfo.students}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Occupancy:</span>
                      <span className="font-medium text-orange-600">{occupancyRate}%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>0</span>
                      <span>{gradeInfo.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${occupancyRate}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      <span>Classes: {gradeInfo.classes.join(", ")}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && studentToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Delete Student Record</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete the student record for "<strong>{studentToDelete.firstName} {studentToDelete.lastName}</strong>"? This action cannot be undone.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-red-800 mb-2">This will permanently remove:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Student personal and academic records</li>
                  <li>• Attendance and grade history</li>
                  <li>• Parent/guardian contact information</li>
                  <li>• Medical and emergency records</li>
                  <li>• All associated documents and notes</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
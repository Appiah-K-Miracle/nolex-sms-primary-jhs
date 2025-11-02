"use client"

import { useState } from "react";
import { 
  User, 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Edit3, 
  Clock, 
  Book, 
  Heart, 
  Users, 
  FileText, 
  Activity, 
  GraduationCap,
  School,
  Award,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Target,
  TrendingUp,
  Download,
  Print,
  MoreVertical,
  Star,
  Eye,
  UserCheck,
  Shield,
  Camera,
  ChevronRight,
  Info,
  BadgeCheck,
  BookOpen,
  Home
} from "lucide-react";
import Link from "next/link";

// Mock student data
const studentData = {
  id: "NLX2024GRADE51234",
  firstName: "Kwame",
  middleName: "Nkrumah",
  lastName: "Asante",
  dateOfBirth: "2013-08-15",
  age: 11,
  gender: "Male",
  nationality: "Ghanaian",
  religion: "Christian",
  grade: "Grade 5",
  class: "5A",
  studentId: "NLX2024GRADE51234",
  enrollmentDate: "2024-09-01",
  status: "Active",
  address: "P.O. Box 123, Kumasi",
  bloodGroup: "B+",
  previousSchool: "Golden Hills Primary School",
  medicalConditions: "None",
  allergies: "Peanuts",
  specialNeeds: "None",
  photo: null,
  
  // Academic Information
  academicYear: "2024/2025",
  currentGPA: 3.8,
  totalCredits: 45,
  attendanceRate: 95.5,
  disciplinaryRecord: "Clean",
  
  // Parent Information
  parents: {
    primary: {
      title: "Mr.",
      firstName: "Kofi",
      lastName: "Asante",
      relationship: "Father",
      phone: "+233 24 123 4567",
      email: "kofi.asante@email.com",
      occupation: "Engineer",
      workplace: "Ghana Water Company",
      address: "P.O. Box 123, Kumasi",
      emergencyContact: "+233 20 987 6543"
    },
    secondary: {
      title: "Mrs.",
      firstName: "Akosua",
      lastName: "Asante",
      relationship: "Mother",
      phone: "+233 24 765 4321",
      email: "akosua.asante@email.com",
      occupation: "Teacher",
      workplace: "St. Mary's School",
      address: "P.O. Box 123, Kumasi",
      emergencyContact: "+233 20 555 1234"
    }
  },
  
  // Medical Information
  medicalInfo: {
    doctorName: "Dr. Kwame Mensah",
    doctorPhone: "+233 24 888 9999",
    hospitalName: "Komfo Anokye Teaching Hospital",
    insuranceProvider: "NHIS",
    insuranceNumber: "1234567890",
    lastCheckup: "2024-08-15",
    vaccinations: [
      { name: "COVID-19", date: "2024-01-15", status: "Complete" },
      { name: "Hepatitis B", date: "2023-12-10", status: "Complete" },
      { name: "MMR", date: "2014-02-15", status: "Complete" }
    ],
    emergencyMedication: "EpiPen (for allergic reactions)"
  },
  
  // Academic Performance
  performance: {
    subjects: [
      { name: "Mathematics", grade: "A", score: 92, teacher: "Mrs. Osei" },
      { name: "English Language", grade: "B+", score: 88, teacher: "Mr. Adjei" },
      { name: "Science", grade: "A-", score: 90, teacher: "Dr. Boateng" },
      { name: "Social Studies", grade: "B", score: 85, teacher: "Mrs. Appiah" },
      { name: "Creative Arts", grade: "A", score: 95, teacher: "Mr. Kusi" },
      { name: "Religious & Moral Education", grade: "A-", score: 89, teacher: "Rev. Osei" }
    ],
    termReports: [
      { term: "Term 1", year: "2024", gpa: 3.9, rank: 2, totalStudents: 35 },
      { term: "Term 3", year: "2023", gpa: 3.7, rank: 5, totalStudents: 34 },
      { term: "Term 2", year: "2023", gpa: 3.8, rank: 3, totalStudents: 34 }
    ]
  },
  
  // Attendance Record
  attendance: {
    totalDays: 180,
    daysPresent: 172,
    daysAbsent: 8,
    tardyCount: 3,
    excusedAbsences: 6,
    unexcusedAbsences: 2,
    recentAttendance: [
      { date: "2024-03-15", status: "Present" },
      { date: "2024-03-14", status: "Present" },
      { date: "2024-03-13", status: "Absent", reason: "Sick" },
      { date: "2024-03-12", status: "Present" },
      { date: "2024-03-11", status: "Present" }
    ]
  },
  
  // Extracurricular Activities
  activities: [
    { name: "Science Club", role: "Member", startDate: "2024-09-01", status: "Active" },
    { name: "School Choir", role: "Lead Singer", startDate: "2024-09-01", status: "Active" },
    { name: "Football Team", role: "Player", startDate: "2024-09-01", status: "Active" }
  ],
  
  // Behavioral Records
  behavior: {
    merit: 15,
    demerit: 2,
    awards: [
      { name: "Student of the Month", date: "2024-02-01", description: "Outstanding academic performance" },
      { name: "Best in Science", date: "2024-01-15", description: "Science fair winner" }
    ],
    incidents: [
      { date: "2024-01-20", type: "Minor", description: "Late to class", action: "Verbal warning" }
    ]
  },
  
  // Additional Information
  additionalInfo: {
    transportationNeeded: true,
    lunchRequired: true,
    afterSchoolProgram: false,
    extracurricularInterests: ["Science", "Music", "Sports"],
    languagesSpoken: "English, Twi",
    hobbies: "Reading, Football, Music",
    specialRequests: "Needs extra time for reading due to mild dyslexia"
  }
};

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "academic", label: "Academic", icon: GraduationCap },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "medical", label: "Medical", icon: Heart },
    { id: "parents", label: "Parents", icon: Users },
    { id: "activities", label: "Activities", icon: Award }
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A": return "bg-green-100 text-green-800";
      case "A-": return "bg-green-100 text-green-700";
      case "B+": return "bg-blue-100 text-blue-800";
      case "B": return "bg-blue-100 text-blue-700";
      case "B-": return "bg-yellow-100 text-yellow-700";
      case "C+": return "bg-orange-100 text-orange-700";
      case "C": return "bg-orange-100 text-orange-800";
      default: return "bg-red-100 text-red-800";
    }
  };

  const getAttendanceColor = (status) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800";
      case "Absent": return "bg-red-100 text-red-800";
      case "Late": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/headmaster/students"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                  {studentData.firstName[0]}{studentData.lastName[0]}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    {studentData.firstName} {studentData.middleName} {studentData.lastName}
                  </h1>
                  <p className="text-purple-100 flex items-center gap-4 mt-1">
                    <span>{studentData.grade} - {studentData.class}</span>
                    <span>•</span>
                    <span>ID: {studentData.studentId}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {studentData.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/headmaster/students/edit/${params.id}`}
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Edit3 className="w-5 h-5" />
                Edit Student
              </Link>
              <button className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Current GPA</p>
              <p className="text-2xl font-bold text-gray-900">{studentData.currentGPA}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{studentData.attendanceRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Class Rank</p>
              <p className="text-2xl font-bold text-gray-900">
                {studentData.performance.termReports[0]?.rank || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Merit Points</p>
              <p className="text-2xl font-bold text-gray-900">{studentData.behavior.merit}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-blue-600" />
                    Personal Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Full Name</p>
                        <p className="text-gray-900">{studentData.firstName} {studentData.middleName} {studentData.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Date of Birth</p>
                        <p className="text-gray-900">{studentData.dateOfBirth} (Age {studentData.age})</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Gender</p>
                        <p className="text-gray-900">{studentData.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Blood Group</p>
                        <p className="text-gray-900">{studentData.bloodGroup}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Nationality</p>
                        <p className="text-gray-900">{studentData.nationality}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Religion</p>
                        <p className="text-gray-900">{studentData.religion}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Home Address</p>
                      <p className="text-gray-900">{studentData.address}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <School className="w-6 h-6 text-green-600" />
                    Academic Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Student ID</p>
                        <p className="text-gray-900 font-mono">{studentData.studentId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Enrollment Date</p>
                        <p className="text-gray-900">{studentData.enrollmentDate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Current Grade</p>
                        <p className="text-gray-900">{studentData.grade}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Class</p>
                        <p className="text-gray-900">{studentData.class}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Academic Year</p>
                        <p className="text-gray-900">{studentData.academicYear}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Previous School</p>
                        <p className="text-gray-900">{studentData.previousSchool || "N/A"}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        {studentData.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Performance */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  Recent Performance Overview
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Current GPA</span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{studentData.currentGPA}</div>
                    <p className="text-sm text-green-600">+0.1 from last term</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Class Rank</span>
                      <Target className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {studentData.performance.termReports[0]?.rank} / {studentData.performance.termReports[0]?.totalStudents}
                    </div>
                    <p className="text-sm text-blue-600">Top 10%</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Attendance</span>
                      <Calendar className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{studentData.attendanceRate}%</div>
                    <p className="text-sm text-purple-600">Excellent</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "academic" && (
            <div className="space-y-8">
              {/* Current Subjects */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  Current Subjects
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studentData.performance.subjects.map((subject, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getGradeColor(subject.grade)}`}>
                          {subject.grade}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Teacher: {subject.teacher}</span>
                        <span>Score: {subject.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Term Reports */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-green-600" />
                  Term Reports
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Term</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">GPA</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Class Rank</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Students</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.performance.termReports.map((report, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{report.term}</td>
                          <td className="py-3 px-4">{report.year}</td>
                          <td className="py-3 px-4 font-semibold">{report.gpa}</td>
                          <td className="py-3 px-4">{report.rank}</td>
                          <td className="py-3 px-4">{report.totalStudents}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-800">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-8">
              {/* Attendance Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Days Present</p>
                      <p className="text-2xl font-bold text-green-900">{studentData.attendance.daysPresent}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-100 to-red-200 rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Days Absent</p>
                      <p className="text-2xl font-bold text-red-900">{studentData.attendance.daysAbsent}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Times Late</p>
                      <p className="text-2xl font-bold text-yellow-900">{studentData.attendance.tardyCount}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Attendance Rate</p>
                      <p className="text-2xl font-bold text-blue-900">{studentData.attendanceRate}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Attendance */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  Recent Attendance
                </h3>
                
                <div className="space-y-3">
                  {studentData.attendance.recentAttendance.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{record.date}</span>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor(record.status)}`}>
                          {record.status}
                        </span>
                        {record.reason && (
                          <span className="text-sm text-gray-600">({record.reason})</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "medical" && (
            <div className="space-y-8">
              {/* Medical Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-600" />
                    Medical Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Medical Conditions</p>
                      <p className="text-gray-900">{studentData.medicalConditions || "None reported"}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Allergies</p>
                      <p className="text-gray-900">{studentData.allergies || "None reported"}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Emergency Medication</p>
                      <p className="text-gray-900">{studentData.medicalInfo.emergencyMedication || "None"}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Blood Group</p>
                      <p className="text-gray-900">{studentData.bloodGroup}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Last Medical Checkup</p>
                      <p className="text-gray-900">{studentData.medicalInfo.lastCheckup}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-600" />
                    Healthcare Provider
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Primary Doctor</p>
                      <p className="text-gray-900">{studentData.medicalInfo.doctorName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Doctor's Phone</p>
                      <p className="text-gray-900">{studentData.medicalInfo.doctorPhone}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Hospital</p>
                      <p className="text-gray-900">{studentData.medicalInfo.hospitalName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Insurance Provider</p>
                      <p className="text-gray-900">{studentData.medicalInfo.insuranceProvider}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Insurance Number</p>
                      <p className="text-gray-900 font-mono">{studentData.medicalInfo.insuranceNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vaccination Records */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-green-600" />
                  Vaccination Records
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {studentData.medicalInfo.vaccinations.map((vaccination, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{vaccination.name}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {vaccination.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Date: {vaccination.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "parents" && (
            <div className="space-y-8">
              {/* Primary Parent */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  Primary Parent/Guardian
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Full Name</p>
                      <p className="text-gray-900">{studentData.parents.primary.title} {studentData.parents.primary.firstName} {studentData.parents.primary.lastName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Relationship</p>
                      <p className="text-gray-900">{studentData.parents.primary.relationship}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Phone Number</p>
                      <p className="text-gray-900">{studentData.parents.primary.phone}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Email Address</p>
                      <p className="text-gray-900">{studentData.parents.primary.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Occupation</p>
                      <p className="text-gray-900">{studentData.parents.primary.occupation}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Workplace</p>
                      <p className="text-gray-900">{studentData.parents.primary.workplace}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Emergency Contact</p>
                      <p className="text-gray-900">{studentData.parents.primary.emergencyContact}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Address</p>
                      <p className="text-gray-900">{studentData.parents.primary.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Parent */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-600" />
                  Secondary Parent/Guardian
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Full Name</p>
                      <p className="text-gray-900">{studentData.parents.secondary.title} {studentData.parents.secondary.firstName} {studentData.parents.secondary.lastName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Relationship</p>
                      <p className="text-gray-900">{studentData.parents.secondary.relationship}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Phone Number</p>
                      <p className="text-gray-900">{studentData.parents.secondary.phone}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Email Address</p>
                      <p className="text-gray-900">{studentData.parents.secondary.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Occupation</p>
                      <p className="text-gray-900">{studentData.parents.secondary.occupation}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Workplace</p>
                      <p className="text-gray-900">{studentData.parents.secondary.workplace}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Emergency Contact</p>
                      <p className="text-gray-900">{studentData.parents.secondary.emergencyContact}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">Address</p>
                      <p className="text-gray-900">{studentData.parents.secondary.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "activities" && (
            <div className="space-y-8">
              {/* Extracurricular Activities */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-orange-600" />
                  Extracurricular Activities
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {studentData.activities.map((activity, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{activity.name}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {activity.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Role: {activity.role}</p>
                      <p className="text-sm text-gray-600">Since: {activity.startDate}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards and Recognition */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-green-600" />
                  Awards and Recognition
                </h3>
                
                <div className="space-y-4">
                  {studentData.behavior.awards.map((award, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{award.name}</h4>
                        <span className="text-sm text-gray-600">{award.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{award.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Behavioral Record */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                    Merit & Demerit Points
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
                      <span className="font-medium text-green-800">Merit Points</span>
                      <span className="text-2xl font-bold text-green-900">{studentData.behavior.merit}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                      <span className="font-medium text-red-800">Demerit Points</span>
                      <span className="text-2xl font-bold text-red-900">{studentData.behavior.demerit}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-purple-600" />
                    Recent Incidents
                  </h3>
                  
                  <div className="space-y-3">
                    {studentData.behavior.incidents.length > 0 ? (
                      studentData.behavior.incidents.map((incident, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{incident.date}</span>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              {incident.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{incident.description}</p>
                          <p className="text-xs text-gray-500">Action: {incident.action}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                        <p className="text-gray-600">No disciplinary incidents recorded</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
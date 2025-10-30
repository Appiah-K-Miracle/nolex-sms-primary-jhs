"use client"

import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  User, 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  Award,
  TrendingUp,
  Edit,
  Plus,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Star
} from "lucide-react";
import Link from "next/link";

const classes = [
  { 
    id: 1, 
    name: "Grade 1", 
    teacher: "Mr. John Doe", 
    subjects: 5,
    students: 25,
    room: "Room A-101",
    schedule: "8:00 AM - 2:00 PM",
    email: "john.doe@school.edu",
    phone: "+233 24 123 4567",
    performance: 85,
    attendance: 92,
    description: "Foundation level class focusing on basic literacy and numeracy skills."
  },
  { 
    id: 2, 
    name: "Grade 2", 
    teacher: "Ms. Jane Smith", 
    subjects: 5,
    students: 28,
    room: "Room A-102",
    schedule: "8:00 AM - 2:00 PM",
    email: "jane.smith@school.edu",
    phone: "+233 24 234 5678",
    performance: 88,
    attendance: 94,
    description: "Building on foundation skills with increased focus on reading comprehension."
  },
  { 
    id: 3, 
    name: "Grade 3", 
    teacher: "Mr. David Johnson", 
    subjects: 6,
    students: 30,
    room: "Room B-201",
    schedule: "8:00 AM - 2:30 PM",
    email: "david.johnson@school.edu",
    phone: "+233 24 345 6789",
    performance: 87,
    attendance: 89,
    description: "Intermediate level with introduction to more complex mathematical concepts."
  },
  { 
    id: 4, 
    name: "Grade 4", 
    teacher: "Ms. Emily Williams", 
    subjects: 6,
    students: 26,
    room: "Room B-202",
    schedule: "8:00 AM - 2:30 PM",
    email: "emily.williams@school.edu",
    phone: "+233 24 456 7890",
    performance: 90,
    attendance: 96,
    description: "Advanced primary level with focus on critical thinking and problem solving."
  },
  { 
    id: 5, 
    name: "Grade 5", 
    teacher: "Mr. Michael Brown", 
    subjects: 7,
    students: 24,
    room: "Room C-301",
    schedule: "8:00 AM - 3:00 PM",
    email: "michael.brown@school.edu",
    phone: "+233 24 567 8901",
    performance: 91,
    attendance: 93,
    description: "Preparation for junior high school with comprehensive subject coverage."
  },
];

const subjects = [
  { name: "Mathematics", code: "MATH101", teacher: "Mr. John Doe", difficulty: "Medium" },
  { name: "English Language", code: "ENG101", teacher: "Ms. Sarah Wilson", difficulty: "Easy" },
  { name: "Science", code: "SCI101", teacher: "Dr. Peter Adams", difficulty: "Medium" },
  { name: "Social Studies", code: "SOC101", teacher: "Mrs. Mary Johnson", difficulty: "Easy" },
  { name: "Religious & Moral Education", code: "RME101", teacher: "Rev. James Smith", difficulty: "Easy" },
];

export default function ViewClassPage() {
  const params = useParams();
  const { id } = params;

  const classId = typeof id === 'string' ? parseInt(id, 10) : NaN;
  const classData = classes.find((c) => c.id === classId);

  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Class Not Found</h1>
          <p className="text-gray-600 mb-6">The requested class could not be found in our records.</p>
          <Link href="/headmaster/academics/classes" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
            Back to Classes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link href="/headmaster/academics/classes" className="flex items-center gap-2 text-green-100 hover:text-white transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Classes</span>
              </Link>
            </div>

            {/* Class Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">{classData.name}</h1>
                <p className="text-xl text-green-100 mb-2">{classData.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-green-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{classData.students} Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{classData.subjects} Subjects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{classData.room}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  Edit Class
                </button>
                <button className="bg-white hover:bg-gray-100 text-green-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg">
                  <Plus className="w-5 h-5" />
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8 -mt-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Class Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Teacher Information Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Class Teacher</h2>
                <p className="text-green-100">Primary instructor and class coordinator</p>
              </div>
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{classData.teacher}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-green-600" />
                        <span>{classData.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-green-600" />
                        <span>{classData.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-green-600" />
                        <span>{classData.schedule}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <span>{classData.room}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Class Subjects</h2>
                    <p className="text-blue-100">Curriculum and subject assignments</p>
                  </div>
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg border border-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Subject
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                          <p className="text-sm text-gray-600">{subject.code} • {subject.teacher}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          subject.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          subject.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {subject.difficulty}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Quick Actions */}
          <div className="space-y-8">
            
            {/* Performance Stats */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Class Performance</h2>
                <p className="text-purple-100">Academic metrics overview</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Academic Performance</span>
                    <span className="text-2xl font-bold text-green-600">{classData.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${classData.performance}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Attendance Rate</span>
                    <span className="text-2xl font-bold text-blue-600">{classData.attendance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${classData.attendance}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">A+</div>
                    <div className="text-sm text-gray-600">Grade</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-xl">
                    <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">3rd</div>
                    <div className="text-sm text-gray-600">Rank</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Quick Actions</h2>
                <p className="text-cyan-100">Common class management tasks</p>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  View Students
                </button>
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  Class Schedule
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5" />
                  View Reports
                </button>
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3">
                  <Award className="w-5 h-5" />
                  Assessments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

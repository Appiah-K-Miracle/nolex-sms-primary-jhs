"use client"

import { useState } from "react";
import { 
  ArrowLeft, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Save, 
  User, 
  Phone, 
  Mail, 
  AlertTriangle,
  CheckSquare,
  Square,
  RotateCcw,
  FileText,
  Calendar,
  Search,
  Filter,
  Download,
  Bell,
  MessageSquare,
  UserCheck,
  UserX,
  Timer,
  BookOpen,
  Home
} from "lucide-react";
import Link from "next/link";

// Mock student data for a class
const classStudents = [
  {
    id: 1,
    studentId: "NLX2024GRADE51234",
    firstName: "Kwame",
    lastName: "Asante",
    photo: null,
    status: "Present",
    arrivalTime: "07:45",
    notes: "",
    parent: {
      name: "Kofi Asante",
      phone: "+233 24 123 4567",
      relationship: "Father"
    },
    previousAttendance: ["Present", "Present", "Present", "Late", "Present"]
  },
  {
    id: 2,
    studentId: "NLX2024GRADE52345",
    firstName: "Akosua",
    lastName: "Mensah",
    photo: null,
    status: "Present",
    arrivalTime: "07:50",
    notes: "",
    parent: {
      name: "Yaw Mensah",
      phone: "+233 24 567 8901",
      relationship: "Father"
    },
    previousAttendance: ["Present", "Present", "Absent", "Present", "Present"]
  },
  {
    id: 3,
    studentId: "NLX2024GRADE53456",
    firstName: "Kofi",
    lastName: "Osei",
    photo: null,
    status: "Absent",
    arrivalTime: "",
    notes: "Sick - called by parent",
    parent: {
      name: "Ama Osei",
      phone: "+233 24 345 6789",
      relationship: "Mother"
    },
    previousAttendance: ["Present", "Present", "Present", "Present", "Present"]
  },
  {
    id: 4,
    studentId: "NLX2024GRADE54567",
    firstName: "Ama",
    lastName: "Appiah",
    photo: null,
    status: "Late",
    arrivalTime: "08:15",
    notes: "Transportation delay",
    parent: {
      name: "Kwaku Appiah",
      phone: "+233 24 456 7890",
      relationship: "Father"
    },
    previousAttendance: ["Present", "Late", "Present", "Present", "Present"]
  },
  {
    id: 5,
    studentId: "NLX2024GRADE55678",
    firstName: "Yaw",
    lastName: "Bonsu",
    photo: null,
    status: "Present",
    arrivalTime: "07:42",
    notes: "",
    parent: {
      name: "Akua Bonsu",
      phone: "+233 24 678 9012",
      relationship: "Mother"
    },
    previousAttendance: ["Present", "Present", "Present", "Present", "Present"]
  },
  {
    id: 6,
    studentId: "NLX2024GRADE56789",
    firstName: "Efua",
    lastName: "Darko",
    photo: null,
    status: "Present",
    arrivalTime: "07:48",
    notes: "",
    parent: {
      name: "Kwame Darko",
      phone: "+233 24 789 0123",
      relationship: "Father"
    },
    previousAttendance: ["Present", "Present", "Present", "Present", "Late"]
  },
  {
    id: 7,
    studentId: "NLX2024GRADE57890",
    firstName: "Kojo",
    lastName: "Frimpong",
    photo: null,
    status: "Present",
    arrivalTime: "07:55",
    notes: "",
    parent: {
      name: "Adjoa Frimpong",
      phone: "+233 24 890 1234",
      relationship: "Mother"
    },
    previousAttendance: ["Present", "Present", "Present", "Present", "Present"]
  },
  {
    id: 8,
    studentId: "NLX2024GRADE58901",
    firstName: "Adwoa",
    lastName: "Gyamfi",
    photo: null,
    status: "Present",
    arrivalTime: "07:39",
    notes: "",
    parent: {
      name: "Nana Gyamfi",
      phone: "+233 24 901 2345",
      relationship: "Father"
    },
    previousAttendance: ["Present", "Present", "Present", "Present", "Present"]
  },
  {
    id: 9,
    studentId: "NLX2024GRADE59012",
    firstName: "Kwaku",
    lastName: "Henaku",
    photo: null,
    status: "Present",
    arrivalTime: "07:52",
    notes: "",
    parent: {
      name: "Akosua Henaku",
      phone: "+233 24 012 3456",
      relationship: "Mother"
    },
    previousAttendance: ["Present", "Present", "Present", "Present", "Present"]
  },
  {
    id: 10,
    studentId: "NLX2024GRADE50123",
    firstName: "Abena",
    lastName: "Inkoom",
    photo: null,
    status: "Present",
    arrivalTime: "07:46",
    notes: "",
    parent: {
      name: "Kofi Inkoom",
      phone: "+233 24 123 4560",
      relationship: "Father"
    },
    previousAttendance: ["Present", "Present", "Present", "Present", "Present"]
  }
];

export default function MarkAttendancePage({ params }: { params: { id: string } }) {
  const [students, setStudents] = useState(classStudents);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [bulkAction, setBulkAction] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock class info
  const classInfo = {
    id: params.id,
    name: "5A",
    grade: "Grade 5",
    teacher: "Mrs. Osei",
    totalStudents: students.length
  };

  const getStatusCounts = () => {
    const present = students.filter(s => s.status === "Present").length;
    const absent = students.filter(s => s.status === "Absent").length;
    const late = students.filter(s => s.status === "Late").length;
    return { present, absent, late };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800 border-green-200";
      case "Absent": return "bg-red-100 text-red-800 border-red-200";
      case "Late": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "Absent": return <XCircle className="w-5 h-5 text-red-600" />;
      case "Late": return <Clock className="w-5 h-5 text-yellow-600" />;
      default: return <User className="w-5 h-5 text-gray-600" />;
    }
  };

  const updateStudentStatus = (studentId: number, newStatus: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { 
            ...student, 
            status: newStatus,
            arrivalTime: newStatus === "Present" ? new Date().toLocaleTimeString().slice(0, 5) : 
                         newStatus === "Late" ? new Date().toLocaleTimeString().slice(0, 5) : ""
          }
        : student
    ));
  };

  const updateStudentNotes = (studentId: number, notes: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, notes } : student
    ));
  };

  const handleBulkAction = () => {
    if (bulkAction && selectedStudents.length > 0) {
      setStudents(prev => prev.map(student => 
        selectedStudents.includes(student.id) 
          ? { 
              ...student, 
              status: bulkAction,
              arrivalTime: bulkAction === "Present" || bulkAction === "Late" 
                ? new Date().toLocaleTimeString().slice(0, 5) : ""
            }
          : student
      ));
      setSelectedStudents([]);
      setBulkAction("");
    }
  };

  const toggleStudentSelection = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const selectAllStudents = () => {
    const filteredStudentIds = filteredStudents.map(s => s.id);
    if (selectedStudents.length === filteredStudentIds.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudentIds);
    }
  };

  const handleSaveAttendance = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const attendanceData = {
      classId: classInfo.id,
      className: classInfo.name,
      date: selectedDate,
      students: students.map(student => ({
        studentId: student.studentId,
        status: student.status,
        arrivalTime: student.arrivalTime,
        notes: student.notes
      })),
      markedBy: "current_teacher_id",
      timestamp: new Date().toISOString()
    };
    
    console.log("Saving attendance:", attendanceData);
    setIsSaving(false);
    alert("Attendance saved successfully!");
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = `${student.firstName} ${student.lastName}`.toLowerCase()
      .includes(searchTerm.toLowerCase()) || 
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || student.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const { present, absent, late } = getStatusCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/headmaster/students/attendance"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <UserCheck className="w-8 h-8" />
                  Mark Attendance - {classInfo.name}
                </h1>
                <p className="text-indigo-100 mt-1">
                  {classInfo.grade} • Teacher: {classInfo.teacher} • {classInfo.totalStudents} Students
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium">Date</p>
                <p className="text-lg font-bold">{new Date(selectedDate).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => setShowNotificationModal(true)}
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Bell className="w-5 h-5" />
                Notify Parents
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{classInfo.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-2xl font-bold text-gray-900">{present}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-gray-900">{absent}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Late</p>
              <p className="text-2xl font-bold text-gray-900">{late}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Students</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Students</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bulk Actions</label>
            <div className="flex gap-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={selectedStudents.length === 0}
              >
                <option value="">Select action...</option>
                <option value="Present">Mark Present</option>
                <option value="Absent">Mark Absent</option>
                <option value="Late">Mark Late</option>
              </select>
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction || selectedStudents.length === 0}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={selectAllStudents}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800"
            >
              {selectedStudents.length === filteredStudents.length ? (
                <CheckSquare className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              Select All ({filteredStudents.length})
            </button>
            {selectedStudents.length > 0 && (
              <span className="text-sm text-gray-600">
                {selectedStudents.length} student(s) selected
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleSaveAttendance}
              disabled={isSaving}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
            >
              {isSaving ? (
                <RotateCcw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600" />
          Students ({filteredStudents.length})
        </h3>
        
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                {/* Selection Checkbox */}
                <button
                  onClick={() => toggleStudentSelection(student.id)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  {selectedStudents.includes(student.id) ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </button>

                {/* Student Photo */}
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>

                {/* Student Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {student.firstName} {student.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">ID: {student.studentId}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-1 mb-1">
                        <Phone className="w-4 h-4" />
                        {student.parent.phone}
                      </div>
                      <div className="text-xs">
                        {student.parent.name} ({student.parent.relationship})
                      </div>
                    </div>
                  </div>

                  {/* Previous Attendance */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs text-gray-600 mr-2">Last 5 days:</span>
                    {student.previousAttendance.map((status, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${getStatusColor(status)}`}
                        title={status}
                      >
                        {status === "Present" ? "P" : status === "Absent" ? "A" : "L"}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Controls */}
                <div className="flex items-center gap-4">
                  {/* Current Status */}
                  <div className="text-center">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(student.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(student.status)}
                        {student.status}
                      </div>
                    </div>
                    {student.arrivalTime && (
                      <p className="text-xs text-gray-600 mt-1">
                        <Timer className="w-3 h-3 inline mr-1" />
                        {student.arrivalTime}
                      </p>
                    )}
                  </div>

                  {/* Status Change Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStudentStatus(student.id, "Present")}
                      className={`p-2 rounded-lg transition-colors ${
                        student.status === "Present" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600"
                      }`}
                      title="Mark Present"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => updateStudentStatus(student.id, "Absent")}
                      className={`p-2 rounded-lg transition-colors ${
                        student.status === "Absent" 
                          ? "bg-red-100 text-red-700" 
                          : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                      }`}
                      title="Mark Absent"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => updateStudentStatus(student.id, "Late")}
                      className={`p-2 rounded-lg transition-colors ${
                        student.status === "Late" 
                          ? "bg-yellow-100 text-yellow-700" 
                          : "bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600"
                      }`}
                      title="Mark Late"
                    >
                      <Clock className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700 min-w-0">Notes:</label>
                  <input
                    type="text"
                    value={student.notes}
                    onChange={(e) => updateStudentNotes(student.id, e.target.value)}
                    placeholder="Add notes (reason for absence, etc.)"
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No students found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Parent Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Bell className="w-6 h-6" />
                  Send Parent Notifications
                </h2>
                <button
                  onClick={() => setShowNotificationModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Students to Notify</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {students.filter(s => s.status === "Absent" || s.status === "Late").map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{student.firstName} {student.lastName}</p>
                          <p className="text-sm text-gray-600">{student.parent.name} - {student.parent.phone}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notification Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Phone className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-medium">SMS</p>
                    </button>
                    <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <MessageSquare className="w-6 h-6 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium">WhatsApp</p>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message Template</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue="Dear Parent, your child was marked as [STATUS] today at [SCHOOL_NAME]. Please contact the school if you have any questions. Thank you."
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNotificationModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert("Notifications sent successfully!");
                      setShowNotificationModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Send Notifications
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
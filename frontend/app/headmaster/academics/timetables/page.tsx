"use client"

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  Download,
  Upload,
  Calendar,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  User,
  Settings,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Star,
  MapPin,
  Target,
  MoreVertical
} from "lucide-react";
import Link from "next/link";

const classes = [
  { id: 1, name: "Grade 1", teacher: "Mr. John Doe", students: 28, room: "A101" },
  { id: 2, name: "Grade 2", teacher: "Ms. Jane Smith", students: 30, room: "A102" },
  { id: 3, name: "Grade 3", teacher: "Mr. David Johnson", students: 25, room: "B101" },
  { id: 4, name: "Grade 4", teacher: "Ms. Emily Williams", students: 27, room: "B102" },
  { id: 5, name: "Grade 5", teacher: "Mr. Michael Brown", students: 24, room: "C101" },
  { id: 6, name: "Grade 6", teacher: "Ms. Sarah Davis", students: 26, room: "C102" },
];

const subjects = [
  { id: 1, name: "Mathematics", code: "MATH", color: "#10b981" },
  { id: 2, name: "English Language", code: "ENG", color: "#3b82f6" },
  { id: 3, name: "Science", code: "SCI", color: "#8b5cf6" },
  { id: 4, name: "Social Studies", code: "SST", color: "#f59e0b" },
  { id: 5, name: "Computing", code: "ICT", color: "#ef4444" },
  { id: 6, name: "RME", code: "RME", color: "#06b6d4" },
  { id: 7, name: "French", code: "FRE", color: "#84cc16" },
  { id: 8, name: "Physical Education", code: "PE", color: "#f97316" },
];

const timeSlots = [
  "8:00 - 8:45",
  "8:45 - 9:30",
  "9:30 - 10:15",
  "10:15 - 10:30", // Break
  "10:30 - 11:15",
  "11:15 - 12:00",
  "12:00 - 12:45",
  "12:45 - 1:30", // Lunch
  "1:30 - 2:15",
  "2:15 - 3:00",
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Sample timetable data
const sampleTimetable = {
  "Grade 1": {
    Monday: [
      { subject: "Mathematics", teacher: "Mr. John Doe", room: "A101", time: "8:00 - 8:45" },
      { subject: "English Language", teacher: "Ms. Jane Smith", room: "A101", time: "8:45 - 9:30" },
      { subject: "Science", teacher: "Dr. Peter Adams", room: "A101", time: "9:30 - 10:15" },
      { subject: "Break", isBreak: true, time: "10:15 - 10:30" },
      { subject: "Social Studies", teacher: "Mrs. Mary Johnson", room: "A101", time: "10:30 - 11:15" },
      { subject: "Computing", teacher: "Mr. Tech Smith", room: "Computer Lab", time: "11:15 - 12:00" },
      { subject: "RME", teacher: "Rev. James Smith", room: "A101", time: "12:00 - 12:45" },
      { subject: "Lunch Break", isBreak: true, time: "12:45 - 1:30" },
      { subject: "Physical Education", teacher: "Coach Wilson", room: "Sports Field", time: "1:30 - 2:15" },
      { subject: "Art", teacher: "Ms. Creative", room: "Art Room", time: "2:15 - 3:00" },
    ],
    Tuesday: [
      { subject: "English Language", teacher: "Ms. Jane Smith", room: "A101", time: "8:00 - 8:45" },
      { subject: "Mathematics", teacher: "Mr. John Doe", room: "A101", time: "8:45 - 9:30" },
      { subject: "French", teacher: "Mme. Française", room: "A101", time: "9:30 - 10:15" },
      { subject: "Break", isBreak: true, time: "10:15 - 10:30" },
      { subject: "Science", teacher: "Dr. Peter Adams", room: "Science Lab", time: "10:30 - 11:15" },
      { subject: "Social Studies", teacher: "Mrs. Mary Johnson", room: "A101", time: "11:15 - 12:00" },
      { subject: "Mathematics", teacher: "Mr. John Doe", room: "A101", time: "12:00 - 12:45" },
      { subject: "Lunch Break", isBreak: true, time: "12:45 - 1:30" },
      { subject: "RME", teacher: "Rev. James Smith", room: "A101", time: "1:30 - 2:15" },
      { subject: "Reading", teacher: "Ms. Jane Smith", room: "Library", time: "2:15 - 3:00" },
    ],
    // Add more days...
  }
};

export default function TimetablesPage() {
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [viewMode, setViewMode] = useState("weekly"); // weekly or daily
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");

  const getSubjectColor = (subjectName: string) => {
    const subject = subjects.find(s => s.name === subjectName);
    return subject?.color || "#6b7280";
  };

  const getSubjectCode = (subjectName: string) => {
    const subject = subjects.find(s => s.name === subjectName);
    return subject?.code || subjectName.substring(0, 3).toUpperCase();
  };

  const getCurrentTimetable = () => {
    return sampleTimetable[selectedClass.name] || {};
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Calendar className="w-10 h-10" />
                Timetable Management
              </h1>
              <p className="text-blue-100 text-lg">Create and manage class schedules efficiently</p>
              <div className="flex items-center gap-6 mt-4 text-blue-100">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm">{classes.length} Classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">{subjects.length} Subjects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{timeSlots.length} Time Slots</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-white hover:bg-blue-50 text-blue-700 border-2 border-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Timetable
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Upload className="w-5 h-5 mr-2" />
                Import Schedule
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/20 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-blue-400/20 rounded-full translate-y-16"></div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Class Selection */}
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <select 
                value={selectedClass.id} 
                onChange={(e) => setSelectedClass(classes.find(c => c.id === parseInt(e.target.value)) || classes[0])}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search subjects, teachers, or rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("weekly")}
              className={`p-3 rounded-lg transition-colors ${viewMode === "weekly" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("daily")}
              className={`p-3 rounded-lg transition-colors ${viewMode === "daily" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              <Clock className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Class Info Banner */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="bg-blue-100 p-4 rounded-2xl">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedClass.name}</h2>
              <div className="flex items-center gap-4 text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{selectedClass.teacher}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{selectedClass.students} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Room {selectedClass.room}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Edit Schedule
            </button>
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Timetable Display */}
      {viewMode === "weekly" ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Week Navigation */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Weekly Schedule</h3>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-semibold text-gray-700">Week 1 - Term 1</span>
                <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 min-w-[120px]">Time</th>
                  {days.map((day) => (
                    <th key={day} className="px-4 py-4 text-center text-sm font-bold text-gray-700 min-w-[200px]">
                      <div className="flex flex-col items-center">
                        <span>{day}</span>
                        <span className="text-xs text-gray-500 font-normal">
                          {new Date().toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot, index) => {
                  const isBreakTime = timeSlot.includes("10:15") || timeSlot.includes("12:45");
                  return (
                    <tr key={index} className={`border-b border-gray-100 ${isBreakTime ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-4 font-semibold text-gray-700 border-r border-gray-100">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {timeSlot}
                        </div>
                      </td>
                      {days.map((day) => {
                        const timetableData = getCurrentTimetable();
                        const daySchedule = timetableData[day] || [];
                        const currentSlot = daySchedule[index];
                        
                        if (!currentSlot) {
                          return (
                            <td key={day} className="px-4 py-4 text-center border-r border-gray-100">
                              <div className="h-16 flex items-center justify-center text-gray-400 text-sm">
                                Free Period
                              </div>
                            </td>
                          );
                        }

                        if (currentSlot.isBreak) {
                          return (
                            <td key={day} className="px-4 py-4 text-center border-r border-gray-100">
                              <div className="h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                  <div className="font-semibold text-yellow-800">{currentSlot.subject}</div>
                                  <div className="text-xs text-yellow-600">Break Time</div>
                                </div>
                              </div>
                            </td>
                          );
                        }

                        return (
                          <td key={day} className="px-4 py-4 border-r border-gray-100">
                            <div 
                              className="h-16 rounded-lg p-3 text-white text-sm cursor-pointer hover:scale-105 transition-transform shadow-sm"
                              style={{ backgroundColor: getSubjectColor(currentSlot.subject) }}
                            >
                              <div className="font-semibold truncate">{getSubjectCode(currentSlot.subject)}</div>
                              <div className="text-xs opacity-90 truncate">{currentSlot.teacher}</div>
                              <div className="text-xs opacity-75 truncate">{currentSlot.room}</div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Daily View
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Day Selection */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Daily Schedule</h3>
              <select 
                value={selectedDay} 
                onChange={(e) => setSelectedDay(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              >
                {days.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Daily Schedule */}
          <div className="p-6">
            <div className="space-y-4">
              {(() => {
                const timetableData = getCurrentTimetable();
                const daySchedule = timetableData[selectedDay] || [];
                
                return daySchedule.map((slot, index) => (
                  <div key={index} className={`p-4 rounded-xl border-2 ${
                    slot.isBreak 
                      ? 'bg-yellow-50 border-yellow-200' 
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  } transition-all duration-300`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-16 rounded-full ${
                          slot.isBreak ? 'bg-yellow-400' : ''
                        }`} style={{ 
                          backgroundColor: slot.isBreak ? undefined : getSubjectColor(slot.subject) 
                        }}></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-gray-900">{slot.subject}</h4>
                            {!slot.isBreak && (
                              <span 
                                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                                style={{ backgroundColor: getSubjectColor(slot.subject) }}
                              >
                                {getSubjectCode(slot.subject)}
                              </span>
                            )}
                          </div>
                          {!slot.isBreak && (
                            <div className="flex items-center gap-6 text-gray-600">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{slot.teacher}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{slot.room}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-700">{slot.time}</div>
                        {!slot.isBreak && (
                          <div className="flex gap-2 mt-2">
                            <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Subject Legend */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Subject Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {subjects.map((subject) => (
            <div key={subject.id} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: subject.color }}
              ></div>
              <span className="text-sm font-medium text-gray-700">{subject.code}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Create Timetable Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full transform animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Create New Timetable</h2>
                </div>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Class</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Academic Year</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>2024-2025</option>
                      <option>2025-2026</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Term</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Term 1</option>
                      <option>Term 2</option>
                      <option>Term 3</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Template</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Create from Scratch</option>
                    <option>Copy from Previous Term</option>
                    <option>Use Standard Template</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors">
                  Create Timetable
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
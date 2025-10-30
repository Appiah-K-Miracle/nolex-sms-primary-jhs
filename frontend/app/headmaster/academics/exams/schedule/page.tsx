"use client"

import { useState } from "react";
import { 
  Calendar,
  Clock,
  Users,
  BookOpen,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  FileText,
  Plus,
  Edit3,
  Trash2,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Target,
  MapPin,
  Timer,
  Award,
  Settings,
  Copy,
  Grid3X3,
  List
} from "lucide-react";
import Link from "next/link";

const examinations = [
  {
    id: 1,
    name: "First Term Mid-Term Examination",
    type: "Mid-Term Examination",
    status: "Draft",
    classes: ["Grade 1", "Grade 2", "Grade 3"],
    subjects: ["Mathematics", "English", "Science"],
    totalStudents: 180,
    duration: 120,
    venue: "Main Hall",
    scheduledDate: null,
    scheduledTime: null
  },
  {
    id: 2,
    name: "Grade 4-6 Class Test Series",
    type: "Class Test",
    status: "Draft",
    classes: ["Grade 4", "Grade 5", "Grade 6"],
    subjects: ["Mathematics", "English", "Science", "Social Studies"],
    totalStudents: 85,
    duration: 90,
    venue: "Classroom Block A",
    scheduledDate: null,
    scheduledTime: null
  },
  {
    id: 3,
    name: "End of First Term Examination",
    type: "End of Term Examination",
    status: "Scheduled",
    classes: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"],
    subjects: ["Mathematics", "English", "Science", "Social Studies", "ICT"],
    totalStudents: 265,
    duration: 150,
    venue: "Sports Hall",
    scheduledDate: "2024-12-10",
    scheduledTime: "08:00"
  }
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
];

const venues = [
  { id: 1, name: "Main Hall", capacity: 200, type: "Hall" },
  { id: 2, name: "Sports Hall", capacity: 300, type: "Hall" },
  { id: 3, name: "Classroom Block A", capacity: 150, type: "Classroom Block" },
  { id: 4, name: "Classroom Block B", capacity: 150, type: "Classroom Block" },
  { id: 5, name: "Computer Lab", capacity: 40, type: "Laboratory" },
  { id: 6, name: "Science Lab", capacity: 50, type: "Laboratory" },
];

export default function ScheduleExamsPage() {
  const [currentView, setCurrentView] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [scheduleData, setScheduleData] = useState({
    date: "",
    time: "",
    venue: "",
    duration: "",
    instructions: ""
  });
  const [showBulkSchedule, setShowBulkSchedule] = useState(false);

  // Calendar helpers
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const generateCalendarDays = () => {
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(currentMonth + direction);
    setSelectedDate(newDate);
  };

  const getExamsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return examinations.filter(exam => exam.scheduledDate === dateStr);
  };

  const openScheduleModal = (exam) => {
    setSelectedExam(exam);
    setScheduleData({
      date: exam.scheduledDate || "",
      time: exam.scheduledTime || "",
      venue: exam.venue || "",
      duration: exam.duration?.toString() || "",
      instructions: ""
    });
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = () => {
    // Here you would handle the scheduling logic
    setShowScheduleModal(false);
    setSelectedExam(null);
  };

  const getVenueColor = (venueName) => {
    const colors = {
      "Main Hall": "#3b82f6",
      "Sports Hall": "#10b981",
      "Classroom Block A": "#f59e0b",
      "Classroom Block B": "#ef4444",
      "Computer Lab": "#8b5cf6",
      "Science Lab": "#06b6d4"
    };
    return colors[venueName] || "#6b7280";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
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
                  <Calendar className="w-10 h-10" />
                  Schedule Examinations
                </h1>
                <p className="text-blue-100 text-lg">Organize and plan examination timetables</p>
                <div className="flex items-center gap-6 mt-4 text-blue-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">{examinations.length} Examinations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{examinations.filter(e => e.status === "Scheduled").length} Scheduled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{venues.length} Venues</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowBulkSchedule(true)}
                className="bg-white hover:bg-blue-50 text-blue-700 border-2 border-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5 mr-2" />
                Bulk Schedule
              </button>
              <Link 
                href="/headmaster/academics/exams/create"
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Exam
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView("calendar")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                currentView === "calendar" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              Calendar View
            </button>
            <button
              onClick={() => setCurrentView("list")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                currentView === "list" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <List className="w-5 h-5 inline mr-2" />
              List View
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Total: {examinations.length} exams • 
            Scheduled: {examinations.filter(e => e.status === "Scheduled").length} • 
            Pending: {examinations.filter(e => e.status === "Draft").length}
          </div>
        </div>
      </div>

      {currentView === "calendar" ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {monthNames[currentMonth]} {currentYear}
                    </h2>
                    <p className="text-gray-600">Click on dates to view scheduled exams</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigateMonth(-1)}
                      className="p-2 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => navigateMonth(1)}
                      className="p-2 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-3 text-center font-semibold text-gray-600 bg-gray-50 rounded-lg">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    const isCurrentMonth = day.getMonth() === currentMonth;
                    const isToday = day.toDateString() === new Date().toDateString();
                    const examsForDay = getExamsForDate(day);
                    
                    return (
                      <div 
                        key={index}
                        className={`min-h-[100px] p-2 border border-gray-100 rounded-lg ${
                          isCurrentMonth ? "bg-white" : "bg-gray-50"
                        } ${isToday ? "border-blue-500 bg-blue-50" : ""} hover:bg-gray-50 transition-colors`}
                      >
                        <div className={`text-sm font-medium mb-2 ${
                          isCurrentMonth ? "text-gray-900" : "text-gray-400"
                        } ${isToday ? "text-blue-700" : ""}`}>
                          {day.getDate()}
                        </div>
                        
                        {/* Exams for this day */}
                        <div className="space-y-1">
                          {examsForDay.slice(0, 2).map((exam) => (
                            <div 
                              key={exam.id}
                              className="text-xs p-1 rounded text-white truncate cursor-pointer hover:opacity-80"
                              style={{ backgroundColor: getVenueColor(exam.venue) }}
                              onClick={() => openScheduleModal(exam)}
                            >
                              {exam.scheduledTime} - {exam.name.substring(0, 20)}...
                            </div>
                          ))}
                          {examsForDay.length > 2 && (
                            <div className="text-xs text-gray-500 font-medium">
                              +{examsForDay.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowBulkSchedule(true)}
                  className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 flex items-center gap-3"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Bulk Schedule</span>
                </button>
                <Link 
                  href="/headmaster/academics/exams/create"
                  className="w-full p-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 flex items-center gap-3"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Exam</span>
                </Link>
                <button className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 flex items-center gap-3">
                  <Copy className="w-5 h-5" />
                  <span>Copy Schedule</span>
                </button>
              </div>
            </div>

            {/* Venues */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Available Venues</h3>
              <div className="space-y-3">
                {venues.map((venue) => (
                  <div key={venue.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getVenueColor(venue.name) }}
                    ></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{venue.name}</div>
                      <div className="text-xs text-gray-500">{venue.type} • {venue.capacity} capacity</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Status Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Scheduled</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // List View
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Examination</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Scheduled Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Venue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Students</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {examinations.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{exam.name}</div>
                        <div className="text-sm text-gray-500">{exam.classes.length} classes • {exam.subjects.length} subjects</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{exam.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exam.status === "Scheduled" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {exam.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {exam.scheduledDate || "Not scheduled"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {exam.scheduledTime || "Not set"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getVenueColor(exam.venue) }}
                        ></div>
                        <span className="text-sm text-gray-900">{exam.venue}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{exam.totalStudents}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openScheduleModal(exam)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                        <button className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors">
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
      )}

      {/* Schedule Modal */}
      {showScheduleModal && selectedExam && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Schedule Examination</h2>
                </div>
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Exam Info */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-blue-900 mb-2">{selectedExam.name}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700 font-semibold">Type:</span>
                    <span className="ml-2 text-gray-900">{selectedExam.type}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-semibold">Duration:</span>
                    <span className="ml-2 text-gray-900">{selectedExam.duration} minutes</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-semibold">Students:</span>
                    <span className="ml-2 text-gray-900">{selectedExam.totalStudents}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-semibold">Classes:</span>
                    <span className="ml-2 text-gray-900">{selectedExam.classes.join(", ")}</span>
                  </div>
                </div>
              </div>

              {/* Schedule Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input 
                    type="date" 
                    value={scheduleData.date}
                    onChange={(e) => setScheduleData(prev => ({...prev, date: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                  <select 
                    value={scheduleData.time}
                    onChange={(e) => setScheduleData(prev => ({...prev, time: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select time...</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Venue</label>
                  <select 
                    value={scheduleData.venue}
                    onChange={(e) => setScheduleData(prev => ({...prev, venue: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select venue...</option>
                    {venues.map((venue) => (
                      <option key={venue.id} value={venue.name}>{venue.name} ({venue.capacity} capacity)</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (minutes)</label>
                  <input 
                    type="number" 
                    value={scheduleData.duration}
                    onChange={(e) => setScheduleData(prev => ({...prev, duration: e.target.value}))}
                    placeholder={selectedExam.duration.toString()}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Special Instructions</label>
                <textarea 
                  value={scheduleData.instructions}
                  onChange={(e) => setScheduleData(prev => ({...prev, instructions: e.target.value}))}
                  rows={3}
                  placeholder="Any special instructions for this examination session..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleScheduleSubmit}
                  className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Schedule Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Filter,
  Eye,
  Clock,
  User,
  BookOpen,
  FileText,
  Target,
  Flag,
  AlertCircle,
  CheckCircle,
  XCircle,
  Timer,
  Upload,
  Plus,
  Search,
  Download,
  Settings,
  MoreHorizontal,
  CalendarDays,
  List,
  Grid3X3
} from "lucide-react";

export default function AssignmentsCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // month, week, day
  const [selectedChild, setSelectedChild] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample children and assignments data
  const children = [
    { id: "1", name: "Kwame Mensah", class: "Primary 6A" },
    { id: "2", name: "Ama Mensah", class: "Primary 4B" }
  ];

  const assignments = [
    {
      id: 1,
      child: "Kwame Mensah",
      childId: "1",
      subject: "Mathematics",
      title: "Algebraic Expressions Worksheet",
      type: "Homework",
      priority: "high",
      dueDate: "2025-11-20",
      status: "pending",
      teacher: "Mr. Osei",
      estimatedTime: 45
    },
    {
      id: 2,
      child: "Ama Mensah",
      childId: "2",
      subject: "English",
      title: "Creative Writing Essay",
      type: "Essay",
      priority: "medium",
      dueDate: "2025-11-18",
      status: "submitted",
      teacher: "Mrs. Asante",
      estimatedTime: 60
    },
    {
      id: 3,
      child: "Kwame Mensah",
      childId: "1",
      subject: "Science",
      title: "Plant Life Cycle Project",
      type: "Project",
      priority: "high",
      dueDate: "2025-11-25",
      status: "in_progress",
      teacher: "Dr. Mensah",
      estimatedTime: 180
    },
    {
      id: 4,
      child: "Ama Mensah",
      childId: "2",
      subject: "Mathematics",
      title: "Geometry Practice",
      type: "Practice",
      priority: "low",
      dueDate: "2025-11-16",
      status: "overdue",
      teacher: "Mrs. Appiah",
      estimatedTime: 30
    },
    {
      id: 5,
      child: "Kwame Mensah",
      childId: "1",
      subject: "Social Studies",
      title: "Ghana Independence Research",
      type: "Research",
      priority: "medium",
      dueDate: "2025-11-22",
      status: "pending",
      teacher: "Mr. Boateng",
      estimatedTime: 120
    },
    {
      id: 6,
      child: "Ama Mensah",
      childId: "2",
      subject: "Creative Arts",
      title: "Kente Pattern Design",
      type: "Practical",
      priority: "medium",
      dueDate: "2025-11-21",
      status: "completed",
      teacher: "Ms. Nkrumah",
      estimatedTime: 90
    },
    {
      id: 7,
      child: "Kwame Mensah",
      childId: "1",
      subject: "English",
      title: "Reading Comprehension",
      type: "Assignment",
      priority: "medium",
      dueDate: "2025-11-19",
      status: "pending",
      teacher: "Mrs. Addo",
      estimatedTime: 40
    },
    {
      id: 8,
      child: "Ama Mensah",
      childId: "2",
      subject: "Science",
      title: "Weather Observation Log",
      type: "Project",
      priority: "low",
      dueDate: "2025-11-26",
      status: "pending",
      teacher: "Dr. Asante",
      estimatedTime: 30
    }
  ];

  const subjects = ["Mathematics", "English", "Science", "Social Studies", "Creative Arts", "French", "Physical Education"];

  // Filter assignments
  const filteredAssignments = assignments.filter(assignment => {
    const childMatch = selectedChild === "all" || assignment.childId === selectedChild;
    const subjectMatch = selectedSubject === "all" || assignment.subject === selectedSubject;
    const statusMatch = selectedStatus === "all" || assignment.status === selectedStatus;
    return childMatch && subjectMatch && statusMatch;
  });

  // Get assignments for a specific date
  const getAssignmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredAssignments.filter(assignment => assignment.dueDate === dateStr);
  };

  // Calendar navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setDate(currentDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 1);
    } else {
      newDate.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate calendar days for month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDay = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  };

  // Generate week days for week view
  const generateWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "submitted": return "bg-blue-500";
      case "in_progress": return "bg-yellow-500";
      case "pending": return "bg-gray-500";
      case "overdue": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-3 h-3" />;
      case "submitted": return <Upload className="w-3 h-3" />;
      case "in_progress": return <Timer className="w-3 h-3" />;
      case "pending": return <Clock className="w-3 h-3" />;
      case "overdue": return <XCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-400";
      case "medium": return "border-yellow-400";
      case "low": return "border-green-400";
      default: return "border-gray-400";
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const formatWeek = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/parent/academics/assignments"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Assignment Calendar</h1>
            <p className="text-blue-100 text-sm lg:text-base">
              Visual timeline of all assignments and due dates
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Calendar Navigation */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white/10 rounded-lg">
              <button
                onClick={() => {
                  if (viewMode === 'month') navigateMonth('prev');
                  else if (viewMode === 'week') navigateWeek('prev');
                  else navigateDay('prev');
                }}
                className="p-2 hover:bg-white/20 rounded-l-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-4 py-2 text-center min-w-48 font-medium">
                {viewMode === 'month' && formatMonth(currentDate)}
                {viewMode === 'week' && formatWeek(generateWeekDays()[0])}
                {viewMode === 'day' && formatDate(currentDate)}
              </div>
              <button
                onClick={() => {
                  if (viewMode === 'month') navigateMonth('next');
                  else if (viewMode === 'week') navigateWeek('next');
                  else navigateDay('next');
                }}
                className="p-2 hover:bg-white/20 rounded-r-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium"
            >
              Today
            </button>
          </div>

          {/* View Mode and Actions */}
          <div className="flex items-center gap-3">
            <div className="flex bg-white/10 rounded-lg">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                  viewMode === 'month' ? 'bg-white/20' : 'hover:bg-white/20'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'week' ? 'bg-white/20' : 'hover:bg-white/20'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                  viewMode === 'day' ? 'bg-white/20' : 'hover:bg-white/20'
                }`}
              >
                Day
              </button>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Children</option>
                {children.map(child => (
                  <option key={child.id} value={child.id}>{child.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="submitted">Submitted</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
              <div className="flex gap-2">
                <Link
                  href="/parent/academics/assignments"
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-center text-sm font-medium"
                >
                  List View
                </Link>
                <button className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Content */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
        {/* Month View */}
        {viewMode === 'month' && (
          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {generateCalendarDays().map((date, index) => {
                const dayAssignments = getAssignmentsForDate(date);
                const isCurrentMonthDay = isCurrentMonth(date);
                const isTodayDate = isToday(date);
                
                return (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border rounded-lg cursor-pointer transition-colors ${
                      isTodayDate 
                        ? 'bg-blue-50 border-blue-200' 
                        : isCurrentMonthDay 
                        ? 'hover:bg-gray-50 border-gray-200' 
                        : 'bg-gray-50 border-gray-100 text-gray-400'
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isTodayDate ? 'text-blue-600' : isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {dayAssignments.slice(0, 2).map((assignment, idx) => (
                        <div
                          key={idx}
                          className={`text-xs p-1 rounded border-l-2 ${getPriorityColor(assignment.priority)} bg-gray-50 hover:bg-gray-100 transition-colors`}
                          title={`${assignment.title} - ${assignment.child}`}
                        >
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(assignment.status)}`} />
                            <span className="truncate font-medium">{assignment.title}</span>
                          </div>
                          <div className="text-gray-600 truncate">{assignment.child}</div>
                        </div>
                      ))}
                      
                      {dayAssignments.length > 2 && (
                        <div className="text-xs text-gray-500 font-medium">
                          +{dayAssignments.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Week View */}
        {viewMode === 'week' && (
          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-7 gap-4">
              {generateWeekDays().map((date, index) => {
                const dayAssignments = getAssignmentsForDate(date);
                const isTodayDate = isToday(date);
                
                return (
                  <div key={index} className="space-y-3">
                    <div className={`text-center p-2 rounded-lg ${
                      isTodayDate ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                    }`}>
                      <div className="text-sm font-medium">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-bold">{date.getDate()}</div>
                    </div>
                    
                    <div className="space-y-2">
                      {dayAssignments.map((assignment, idx) => (
                        <Link
                          key={idx}
                          href={`/parent/academics/assignments/${assignment.id}`}
                          className={`block p-3 rounded-lg border-l-4 ${getPriorityColor(assignment.priority)} bg-gray-50 hover:bg-gray-100 transition-colors`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(assignment.status)}`} />
                            <span className="text-sm font-medium text-gray-900 truncate">
                              {assignment.title}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">{assignment.child}</div>
                          <div className="text-xs text-gray-500">{assignment.subject}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Day View */}
        {viewMode === 'day' && (
          <div className="p-6 lg:p-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {formatDate(currentDate)}
              </h3>
              <p className="text-gray-600">
                {getAssignmentsForDate(currentDate).length} assignments due
              </p>
            </div>
            
            <div className="space-y-4">
              {getAssignmentsForDate(currentDate).length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No assignments due</h4>
                  <p className="text-gray-600">No assignments are due on this date.</p>
                </div>
              ) : (
                getAssignmentsForDate(currentDate).map((assignment) => (
                  <div
                    key={assignment.id}
                    className={`border-l-4 ${getPriorityColor(assignment.priority)} bg-gray-50 rounded-lg p-6`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${getStatusColor(assignment.status)}`} />
                        <div>
                          <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                          <p className="text-sm text-gray-600">{assignment.subject} • {assignment.teacher}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                          {assignment.type}
                        </span>
                        <Link
                          href={`/parent/academics/assignments/${assignment.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Child:</span>
                        <span className="ml-2 font-medium">{assignment.child}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Priority:</span>
                        <span className={`ml-2 font-medium capitalize ${
                          assignment.priority === 'high' ? 'text-red-600' :
                          assignment.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {assignment.priority}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Est. Time:</span>
                        <span className="ml-2 font-medium">{assignment.estimatedTime} min</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected Date Modal */}
      {selectedDate && viewMode === 'month' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {formatDate(selectedDate)}
                </h3>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {getAssignmentsForDate(selectedDate).length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No assignments due</h4>
                  <p className="text-gray-600">No assignments are due on this date.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    {getAssignmentsForDate(selectedDate).length} Assignment{getAssignmentsForDate(selectedDate).length !== 1 ? 's' : ''} Due
                  </h4>
                  {getAssignmentsForDate(selectedDate).map((assignment) => (
                    <div
                      key={assignment.id}
                      className={`border-l-4 ${getPriorityColor(assignment.priority)} bg-gray-50 rounded-lg p-4`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${getStatusColor(assignment.status)}`} />
                          <div>
                            <h5 className="font-medium text-gray-900">{assignment.title}</h5>
                            <p className="text-sm text-gray-600">{assignment.subject} • {assignment.child}</p>
                          </div>
                        </div>
                        <Link
                          href={`/parent/academics/assignments/${assignment.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Status</h4>
            <div className="space-y-2">
              {[
                { status: 'pending', label: 'Pending' },
                { status: 'in_progress', label: 'In Progress' },
                { status: 'submitted', label: 'Submitted' },
                { status: 'completed', label: 'Completed' },
                { status: 'overdue', label: 'Overdue' }
              ].map(({ status, label }) => (
                <div key={status} className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Priority</h4>
            <div className="space-y-2">
              {[
                { priority: 'high', label: 'High Priority', color: 'border-red-400' },
                { priority: 'medium', label: 'Medium Priority', color: 'border-yellow-400' },
                { priority: 'low', label: 'Low Priority', color: 'border-green-400' }
              ].map(({ priority, label, color }) => (
                <div key={priority} className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 border-2 ${color} rounded`} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Children</h4>
            <div className="space-y-2">
              {children.map((child) => (
                <div key={child.id} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full" />
                  <span>{child.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Quick Stats</h4>
            <div className="space-y-2 text-sm">
              <div>Total: {filteredAssignments.length} assignments</div>
              <div>Due this week: {filteredAssignments.filter(a => {
                const due = new Date(a.dueDate);
                const now = new Date();
                const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                return due >= now && due <= weekLater;
              }).length}</div>
              <div>Overdue: {filteredAssignments.filter(a => a.status === 'overdue').length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
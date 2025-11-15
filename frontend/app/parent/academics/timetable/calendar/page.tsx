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
  MapPin,
  Bell,
  Settings,
  Download,
  Search,
  Plus,
  Target,
  GraduationCap,
  Calculator,
  Beaker,
  Globe,
  Palette,
  Music,
  Heart,
  Zap,
  AlertCircle,
  CheckCircle,
  Star,
  Timer,
  PlayCircle,
  PauseCircle,
  X
} from "lucide-react";

export default function TimetableCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // month, week, day
  const [selectedChild, setSelectedChild] = useState("1");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<any>(null);

  // Sample children data
  const children = [
    { id: "1", name: "Kwame Mensah", class: "Primary 6A" },
    { id: "2", name: "Ama Mensah", class: "Primary 4B" }
  ];

  // Sample timetable events data
  const timetableEvents = [
    {
      id: 1,
      child: "Kwame Mensah",
      childId: "1",
      date: "2025-11-15",
      time: "08:00 - 08:40",
      subject: "Mathematics",
      teacher: "Mr. Osei",
      room: "Class 6A",
      type: "core",
      description: "Algebraic Expressions",
      status: "current",
      recurring: "weekly"
    },
    {
      id: 2,
      child: "Kwame Mensah",
      childId: "1",
      date: "2025-11-15",
      time: "08:40 - 09:20",
      subject: "English Language",
      teacher: "Mrs. Addo",
      room: "Class 6A",
      type: "core",
      description: "Reading Comprehension",
      status: "upcoming",
      recurring: "weekly"
    },
    {
      id: 3,
      child: "Kwame Mensah",
      childId: "1",
      date: "2025-11-15",
      time: "09:20 - 09:40",
      subject: "Break",
      teacher: "",
      room: "Playground",
      type: "break",
      description: "Morning Break",
      status: "upcoming",
      recurring: "daily"
    },
    {
      id: 4,
      child: "Kwame Mensah",
      childId: "1",
      date: "2025-11-18",
      time: "08:00 - 09:20",
      subject: "Mathematics Test",
      teacher: "Mr. Osei",
      room: "Class 6A",
      type: "test",
      description: "Unit test on algebraic expressions",
      status: "upcoming",
      recurring: "none"
    },
    {
      id: 5,
      child: "Ama Mensah",
      childId: "2",
      date: "2025-11-15",
      time: "08:00 - 08:40",
      subject: "Mathematics",
      teacher: "Mrs. Appiah",
      room: "Class 4B",
      type: "core",
      description: "Multiplication & Division",
      status: "upcoming",
      recurring: "weekly"
    },
    {
      id: 6,
      child: "Kwame Mensah",
      childId: "1",
      date: "2025-11-19",
      time: "09:40 - 11:00",
      subject: "Science Lab",
      teacher: "Dr. Mensah",
      room: "Science Lab",
      type: "practical",
      description: "Plant observation experiment",
      status: "upcoming",
      recurring: "none"
    },
    {
      id: 7,
      child: "Kwame Mensah",
      childId: "1",
      date: "2025-11-20",
      time: "11:40 - 12:20",
      subject: "French Test",
      teacher: "Mme. Kone",
      room: "Language Lab",
      type: "test",
      description: "Weekly vocabulary assessment",
      status: "upcoming",
      recurring: "none"
    }
  ];

  const subjects = [
    { id: "math", name: "Mathematics", icon: Calculator, color: "blue" },
    { id: "english", name: "English Language", icon: BookOpen, color: "green" },
    { id: "science", name: "Science", icon: Beaker, color: "purple" },
    { id: "social", name: "Social Studies", icon: Globe, color: "orange" },
    { id: "arts", name: "Creative Arts", icon: Palette, color: "pink" },
    { id: "music", name: "Music", icon: Music, color: "indigo" },
    { id: "pe", name: "Physical Education", icon: Heart, color: "red" },
    { id: "french", name: "French", icon: Globe, color: "yellow" },
    { id: "ict", name: "ICT", icon: Zap, color: "cyan" }
  ];

  // Filter events
  const filteredEvents = timetableEvents.filter(event => {
    const childMatch = selectedChild === "all" || event.childId === selectedChild;
    const subjectMatch = selectedSubject === "all" || event.subject.toLowerCase().includes(selectedSubject);
    return childMatch && subjectMatch;
  });

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => event.date === dateStr);
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "core": return "bg-blue-500";
      case "elective": return "bg-green-500";
      case "practical": return "bg-purple-500";
      case "test": return "bg-red-500";
      case "exam": return "bg-orange-500";
      case "break": return "bg-gray-400";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "test": return <Target className="w-3 h-3" />;
      case "exam": return <GraduationCap className="w-3 h-3" />;
      case "practical": return <Beaker className="w-3 h-3" />;
      case "break": return <Clock className="w-3 h-3" />;
      default: return <BookOpen className="w-3 h-3" />;
    }
  };

  const getSubjectIcon = (subjectName: string) => {
    const subject = subjects.find(s => s.name.toLowerCase().includes(subjectName.toLowerCase()));
    return subject ? subject.icon : BookOpen;
  };

  const getSubjectColor = (subjectName: string) => {
    const subject = subjects.find(s => s.name.toLowerCase().includes(subjectName.toLowerCase()));
    return subject ? subject.color : "gray";
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

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isCurrentPeriod = (timeSlot: string) => {
    const now = getCurrentTime();
    const [startTime, endTime] = timeSlot.split(' - ');
    return now >= startTime && now <= endTime;
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/parent/academics/timetable"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Timetable Calendar</h1>
            <p className="text-blue-100 text-sm lg:text-base">
              Visual calendar view of class schedules and events
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

      {/* Current Time Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div>
            <span className="font-medium text-blue-900">Current Time: {getCurrentTime()}</span>
            <span className="text-blue-700 ml-4">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
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
                  <option key={subject.id} value={subject.name.toLowerCase()}>{subject.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="all">All Types</option>
                <option value="core">Core Classes</option>
                <option value="elective">Electives</option>
                <option value="practical">Practicals</option>
                <option value="test">Tests</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
              <div className="flex gap-2">
                <Link
                  href="/parent/academics/timetable"
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
                const dayEvents = getEventsForDate(date);
                const isCurrentMonthDay = isCurrentMonth(date);
                const isTodayDate = isToday(date);
                
                return (
                  <div
                    key={index}
                    className={`min-h-28 p-2 border rounded-lg cursor-pointer transition-colors ${
                      isTodayDate 
                        ? 'bg-blue-50 border-blue-200' 
                        : isCurrentMonthDay 
                        ? 'hover:bg-gray-50 border-gray-200' 
                        : 'bg-gray-50 border-gray-100 text-gray-400'
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className={`text-sm font-medium mb-2 ${
                      isTodayDate ? 'text-blue-600' : isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event, idx) => (
                        <div
                          key={idx}
                          className={`text-xs p-1 rounded flex items-center gap-1 ${
                            event.type === 'break' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-800'
                          } hover:opacity-80 transition-opacity`}
                          title={`${event.subject} - ${event.time}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPeriod(event);
                          }}
                        >
                          <div className={`w-2 h-2 rounded-full ${getTypeColor(event.type)}`} />
                          <span className="truncate font-medium">{event.subject}</span>
                        </div>
                      ))}
                      
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-500 font-medium text-center">
                          +{dayEvents.length - 3} more
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
                const dayEvents = getEventsForDate(date);
                const isTodayDate = isToday(date);
                
                return (
                  <div key={index} className="space-y-3">
                    <div className={`text-center p-3 rounded-lg ${
                      isTodayDate ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                    }`}>
                      <div className="text-sm font-medium">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-bold">{date.getDate()}</div>
                    </div>
                    
                    <div className="space-y-2 min-h-96">
                      {dayEvents.map((event, idx) => {
                        const isCurrent = isCurrentPeriod(event.time) && isTodayDate;
                        
                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                              event.type === 'break' 
                                ? 'bg-gray-50 border-gray-200' 
                                : 'bg-blue-50 border-blue-200'
                            } ${isCurrent ? 'ring-2 ring-blue-400 bg-blue-100' : ''}`}
                            onClick={() => setSelectedPeriod(event)}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-3 h-3 rounded-full ${getTypeColor(event.type)}`} />
                              {event.type !== 'break' && React.createElement(getSubjectIcon(event.subject), { 
                                className: `w-4 h-4 text-${getSubjectColor(event.subject)}-600` 
                              })}
                              <span className="text-sm font-semibold text-gray-900 truncate">
                                {event.subject}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 mb-1">{event.time}</div>
                            {event.type !== 'break' && (
                              <>
                                <div className="text-xs text-gray-500">{event.teacher}</div>
                                <div className="text-xs text-gray-500">{event.room}</div>
                              </>
                            )}
                            {isCurrent && (
                              <div className="mt-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                                  Now
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
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
                {getEventsForDate(currentDate).length} periods scheduled
              </p>
            </div>
            
            <div className="space-y-4">
              {getEventsForDate(currentDate).length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No classes scheduled</h4>
                  <p className="text-gray-600">No periods are scheduled for this date.</p>
                </div>
              ) : (
                getEventsForDate(currentDate).map((event) => {
                  const isCurrent = isCurrentPeriod(event.time) && isToday(currentDate);
                  
                  return (
                    <div
                      key={event.id}
                      className={`border rounded-lg p-6 transition-all hover:shadow-md cursor-pointer ${
                        isCurrent ? 'border-blue-300 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPeriod(event)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            event.type === 'break' ? 'bg-gray-100' : `bg-${getSubjectColor(event.subject)}-100`
                          }`}>
                            {event.type !== 'break' ? React.createElement(getSubjectIcon(event.subject), { 
                              className: `w-6 h-6 text-${getSubjectColor(event.subject)}-600` 
                            }) : <Clock className="w-6 h-6 text-gray-600" />}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{event.subject}</h4>
                              <p className="text-gray-600">{event.description}</p>
                              {event.type !== 'break' && (
                                <div className="mt-3 space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <User className="w-4 h-4" />
                                    <span>{event.teacher}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{event.room}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <User className="w-4 h-4" />
                                    <span>{event.child}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">{event.time}</div>
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  event.type === 'core' ? 'bg-blue-100 text-blue-800' :
                                  event.type === 'elective' ? 'bg-green-100 text-green-800' :
                                  event.type === 'practical' ? 'bg-purple-100 text-purple-800' :
                                  event.type === 'test' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {getTypeIcon(event.type)}
                                  <span className="ml-1">{event.type}</span>
                                </span>
                              </div>
                              {isCurrent && (
                                <div className="mt-2">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                                    Current Period
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
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
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {getEventsForDate(selectedDate).length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No classes scheduled</h4>
                  <p className="text-gray-600">No periods are scheduled for this date.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    {getEventsForDate(selectedDate).length} Period{getEventsForDate(selectedDate).length !== 1 ? 's' : ''} Scheduled
                  </h4>
                  {getEventsForDate(selectedDate).map((event) => (
                    <div
                      key={event.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedDate(null);
                        setSelectedPeriod(event);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-4 h-4 rounded-full mt-1 ${getTypeColor(event.type)}`} />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{event.subject}</h5>
                          <p className="text-sm text-gray-600">{event.time} • {event.child}</p>
                          {event.type !== 'break' && (
                            <p className="text-sm text-gray-500">{event.teacher} • {event.room}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Period Details Modal */}
      {selectedPeriod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Period Details</h3>
              <button
                onClick={() => setSelectedPeriod(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedPeriod.type === 'break' ? 'bg-gray-100' : `bg-${getSubjectColor(selectedPeriod.subject)}-100`
                }`}>
                  {selectedPeriod.type !== 'break' ? React.createElement(getSubjectIcon(selectedPeriod.subject), { 
                    className: `w-5 h-5 text-${getSubjectColor(selectedPeriod.subject)}-600` 
                  }) : <Clock className="w-5 h-5 text-gray-600" />}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedPeriod.subject}</h4>
                  <p className="text-sm text-gray-600">{selectedPeriod.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Time:</span>
                  <div className="font-medium">{selectedPeriod.time}</div>
                </div>
                <div>
                  <span className="text-gray-600">Date:</span>
                  <div className="font-medium">{new Date(selectedPeriod.date).toLocaleDateString()}</div>
                </div>
                {selectedPeriod.type !== 'break' && (
                  <>
                    <div>
                      <span className="text-gray-600">Teacher:</span>
                      <div className="font-medium">{selectedPeriod.teacher}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Room:</span>
                      <div className="font-medium">{selectedPeriod.room}</div>
                    </div>
                  </>
                )}
                <div>
                  <span className="text-gray-600">Child:</span>
                  <div className="font-medium">{selectedPeriod.child}</div>
                </div>
                <div>
                  <span className="text-gray-600">Type:</span>
                  <div className="font-medium capitalize">{selectedPeriod.type}</div>
                </div>
              </div>

              {selectedPeriod.recurring !== 'none' && (
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Timer className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Recurring {selectedPeriod.recurring}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedPeriod(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedPeriod.type !== 'break' && (
                <Link
                  href={`/parent/communication/teachers?teacher=${encodeURIComponent(selectedPeriod.teacher)}`}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Contact Teacher
                </Link>
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
            <h4 className="font-medium text-gray-900 mb-2">Period Types</h4>
            <div className="space-y-2">
              {[
                { type: 'core', label: 'Core Subject', color: 'bg-blue-500' },
                { type: 'elective', label: 'Elective', color: 'bg-green-500' },
                { type: 'practical', label: 'Practical', color: 'bg-purple-500' },
                { type: 'test', label: 'Test/Exam', color: 'bg-red-500' },
                { type: 'break', label: 'Break', color: 'bg-gray-400' }
              ].map(({ type, label, color }) => (
                <div key={type} className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
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
            <h4 className="font-medium text-gray-900 mb-2">Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span>Current Period</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span>Today's Schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                <span>Future Periods</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Quick Stats</h4>
            <div className="space-y-2 text-sm">
              <div>Total Events: {filteredEvents.length}</div>
              <div>This Week: {filteredEvents.filter(e => {
                const eventDate = new Date(e.date);
                const weekStart = new Date();
                weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                return eventDate >= weekStart && eventDate <= weekEnd;
              }).length}</div>
              <div>Today: {getEventsForDate(new Date()).length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
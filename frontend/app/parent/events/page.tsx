"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  CalendarDays, 
  Clock, 
  MapPin, 
  Users, 
  Bell, 
  CheckCircle, 
  XCircle, 
  Filter, 
  Search, 
  Plus, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  UserCheck,
  UserX,
  AlertTriangle,
  Info,
  Star,
  Award,
  BookOpen,
  GraduationCap,
  Activity,
  Heart,
  Music,
  Palette,
  Trophy,
  Target,
  Zap,
  Coffee
} from "lucide-react";

interface SchoolEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  organizer: string;
  category: 'academic' | 'sports' | 'cultural' | 'meeting' | 'exam' | 'holiday' | 'general';
  type: 'mandatory' | 'optional' | 'invitation-only';
  targetAudience: string[];
  rsvpRequired: boolean;
  rsvpDeadline?: string;
  rsvpStatus?: 'attending' | 'not-attending' | 'maybe' | 'pending';
  capacity?: number;
  attendeeCount?: number;
  contactPerson: {
    name: string;
    phone: string;
    email: string;
  };
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  reminders: Array<{
    time: string;
    sent: boolean;
  }>;
  tags: string[];
  importance: 'high' | 'medium' | 'low';
}

export default function EventsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [showRSVPModal, setShowRSVPModal] = useState<number | null>(null);

  // Sample events data
  const events: SchoolEvent[] = [
    {
      id: 1,
      title: "Parent-Teacher Conference",
      description: "Individual meetings between parents and teachers to discuss student progress, address concerns, and plan for the future. Each session will be 15 minutes long.",
      date: "2025-11-25",
      startTime: "09:00",
      endTime: "17:00",
      venue: "School Main Hall & Classrooms",
      organizer: "Administration Office",
      category: "meeting",
      type: "mandatory",
      targetAudience: ["All Parents", "Teachers"],
      rsvpRequired: true,
      rsvpDeadline: "2025-11-20",
      rsvpStatus: "pending",
      capacity: 200,
      attendeeCount: 156,
      contactPerson: {
        name: "Mrs. Tetteh",
        phone: "0244123456",
        email: "admin@nolex.edu.gh"
      },
      attachments: [
        { name: "Conference_Schedule.pdf", url: "#", type: "pdf" },
        { name: "Booking_Instructions.pdf", url: "#", type: "pdf" }
      ],
      reminders: [
        { time: "1 week before", sent: false },
        { time: "3 days before", sent: false },
        { time: "1 day before", sent: false }
      ],
      tags: ["Important", "Academic", "Scheduled Meeting"],
      importance: "high"
    },
    {
      id: 2,
      title: "Science Fair 2025",
      description: "Annual science fair where students showcase their scientific projects and innovations. Open to all JHS students with various categories including Environmental Science, Technology, and Health & Medicine.",
      date: "2025-12-10",
      startTime: "09:00",
      endTime: "16:00",
      venue: "School Science Laboratory & Assembly Hall",
      organizer: "Science Department",
      category: "academic",
      type: "optional",
      targetAudience: ["JHS Students", "Parents", "Teachers"],
      rsvpRequired: false,
      capacity: 300,
      attendeeCount: 89,
      contactPerson: {
        name: "Dr. Asante",
        phone: "0244567890",
        email: "science@nolex.edu.gh"
      },
      attachments: [
        { name: "Project_Guidelines.pdf", url: "#", type: "pdf" },
        { name: "Registration_Form.pdf", url: "#", type: "pdf" }
      ],
      reminders: [
        { time: "2 weeks before", sent: false },
        { time: "1 week before", sent: false }
      ],
      tags: ["Science", "Competition", "Innovation", "Projects"],
      importance: "medium"
    },
    {
      id: 3,
      title: "Inter-School Sports Competition",
      description: "Regional inter-school sports competition featuring football, athletics, volleyball, and basketball. Our school will be representing in all categories.",
      date: "2025-11-18",
      startTime: "07:00",
      endTime: "18:00",
      venue: "Regional Sports Complex, Accra",
      organizer: "Physical Education Department",
      category: "sports",
      type: "optional",
      targetAudience: ["Student Athletes", "Sports Parents", "Coaches"],
      rsvpRequired: true,
      rsvpDeadline: "2025-11-15",
      rsvpStatus: "attending",
      capacity: 50,
      attendeeCount: 42,
      contactPerson: {
        name: "Coach Mensah",
        phone: "0244789012",
        email: "sports@nolex.edu.gh"
      },
      reminders: [
        { time: "1 week before", sent: true },
        { time: "3 days before", sent: false }
      ],
      tags: ["Sports", "Competition", "Regional", "Transportation"],
      importance: "medium"
    },
    {
      id: 4,
      title: "Cultural Day Celebration",
      description: "Annual celebration of Ghanaian culture featuring traditional dances, local cuisine, cultural exhibitions, and student performances. All families are welcome.",
      date: "2025-12-05",
      startTime: "10:00",
      endTime: "15:00",
      venue: "School Compound & Assembly Hall",
      organizer: "Cultural Committee",
      category: "cultural",
      type: "optional",
      targetAudience: ["All Students", "All Parents", "Community"],
      rsvpRequired: false,
      contactPerson: {
        name: "Ms. Nkrumah",
        phone: "0244345678",
        email: "culture@nolex.edu.gh"
      },
      reminders: [
        { time: "2 weeks before", sent: false }
      ],
      tags: ["Culture", "Performance", "Community", "Family"],
      importance: "low"
    },
    {
      id: 5,
      title: "Mid-Term Examinations",
      description: "Mid-term examinations for all classes. Examination timetables have been distributed. Students should arrive 30 minutes before each exam.",
      date: "2025-11-15",
      startTime: "08:00",
      endTime: "15:00",
      venue: "Various Classrooms",
      organizer: "Academic Office",
      category: "exam",
      type: "mandatory",
      targetAudience: ["All Students"],
      rsvpRequired: false,
      contactPerson: {
        name: "Mr. Adjei",
        phone: "0244456789",
        email: "academics@nolex.edu.gh"
      },
      attachments: [
        { name: "Exam_Timetable.pdf", url: "#", type: "pdf" },
        { name: "Exam_Rules.pdf", url: "#", type: "pdf" }
      ],
      reminders: [
        { time: "1 week before", sent: true },
        { time: "3 days before", sent: false },
        { time: "1 day before", sent: false }
      ],
      tags: ["Exam", "Academic", "Assessment"],
      importance: "high"
    },
    {
      id: 6,
      title: "Health Screening Program",
      description: "Free health screening for all students in collaboration with Ghana Health Service. Includes vision, dental, and general health checks.",
      date: "2025-11-12",
      startTime: "08:00",
      endTime: "15:00",
      venue: "School Health Center",
      organizer: "Health Services",
      category: "general",
      type: "mandatory",
      targetAudience: ["All Students"],
      rsvpRequired: false,
      contactPerson: {
        name: "Nurse Abena",
        phone: "0244234567",
        email: "health@nolex.edu.gh"
      },
      attachments: [
        { name: "Consent_Form.pdf", url: "#", type: "pdf" }
      ],
      reminders: [
        { time: "1 week before", sent: true },
        { time: "2 days before", sent: false }
      ],
      tags: ["Health", "Screening", "Mandatory"],
      importance: "high"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="w-4 h-4" />;
      case 'sports': return <Trophy className="w-4 h-4" />;
      case 'cultural': return <Palette className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'exam': return <GraduationCap className="w-4 h-4" />;
      case 'holiday': return <Coffee className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sports': return 'bg-green-100 text-green-800 border-green-200';
      case 'cultural': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'meeting': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'exam': return 'bg-red-100 text-red-800 border-red-200';
      case 'holiday': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const getRSVPStatusColor = (status: string) => {
    switch (status) {
      case 'attending': return 'bg-green-100 text-green-800';
      case 'not-attending': return 'bg-red-100 text-red-800';
      case 'maybe': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const upcomingEvents = filteredEvents
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = filteredEvents
    .filter(event => new Date(event.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const selectedEventData = selectedEvent ? events.find(e => e.id === selectedEvent) : null;

  const handleRSVP = (eventId: number, status: 'attending' | 'not-attending' | 'maybe') => {
    // In a real app, this would update the backend
    console.log(`RSVP for event ${eventId}: ${status}`);
    setShowRSVPModal(null);
  };

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDateObj = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dateString = currentDateObj.toISOString().split('T')[0];
      const isCurrentMonth = currentDateObj.getMonth() === month;
      const dayEvents = events.filter(event => event.date === dateString);
      
      days.push({
        date: new Date(currentDateObj),
        dateString,
        isCurrentMonth,
        events: dayEvents,
        isToday: dateString === new Date().toISOString().split('T')[0]
      });
      
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 flex items-center gap-3">
              <Calendar className="w-8 h-8 lg:w-10 lg:h-10" />
              School Events & Calendar
            </h1>
            <p className="text-indigo-100 text-sm lg:text-base xl:text-lg">
              Stay updated with school events, important dates, and RSVP to activities
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <button className="bg-white text-indigo-600 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Download className="w-4 h-4 lg:w-5 lg:h-5" />
              Export Calendar
            </button>
            <button className="bg-indigo-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-indigo-400 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
              Set Reminders
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="academic">Academic</option>
                <option value="sports">Sports</option>
                <option value="cultural">Cultural</option>
                <option value="meeting">Meetings</option>
                <option value="exam">Exams</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'calendar' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Upcoming Events</h3>
            <CalendarDays className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">
            {upcomingEvents.length}
          </div>
          <p className="text-xs lg:text-sm text-gray-600">Next 30 days</p>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">RSVP Pending</h3>
            <UserCheck className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-1">
            {events.filter(e => e.rsvpRequired && e.rsvpStatus === 'pending').length}
          </div>
          <p className="text-xs lg:text-sm text-gray-600">Awaiting response</p>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">This Week</h3>
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-1">
            {events.filter(e => {
              const eventDate = new Date(e.date);
              const today = new Date();
              const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
              return eventDate >= today && eventDate <= weekFromNow;
            }).length}
          </div>
          <p className="text-xs lg:text-sm text-gray-600">Events</p>
        </div>

        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">High Priority</h3>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-red-600 mb-1">
            {events.filter(e => e.importance === 'high' && new Date(e.date) >= new Date()).length}
          </div>
          <p className="text-xs lg:text-sm text-gray-600">Important events</p>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm">
          {/* Calendar Header */}
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  Today
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-6">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border rounded-lg ${
                    !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                  } ${
                    day.isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm ${day.isToday ? 'font-bold text-blue-600' : ''}`}>
                      {day.date.getDate()}
                    </span>
                    {day.events.length > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {day.events.length}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    {day.events.slice(0, 2).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        onClick={() => setSelectedEvent(event.id)}
                        className={`text-xs p-1 rounded cursor-pointer truncate ${getCategoryColor(event.category)}`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {day.events.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{day.events.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="space-y-6">
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`border-l-4 border rounded-lg p-4 lg:p-6 hover:shadow-md transition-shadow cursor-pointer ${getImportanceColor(event.importance)}`}
                    onClick={() => setSelectedEvent(event.id)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex items-center space-x-3 mb-2 lg:mb-0">
                        <div className={`p-2 rounded-lg border ${getCategoryColor(event.category)}`}>
                          {getCategoryIcon(event.category)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600">{event.organizer}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {event.rsvpRequired && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRSVPStatusColor(event.rsvpStatus || 'pending')}`}>
                            RSVP: {(event.rsvpStatus || 'pending').replace('-', ' ')}
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString('en-GB', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>

                    {event.rsvpRequired && (
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          RSVP Deadline: {event.rsvpDeadline && new Date(event.rsvpDeadline).toLocaleDateString()}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowRSVPModal(event.id);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                        >
                          Update RSVP
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Past Events</h2>
              <div className="space-y-4">
                {pastEvents.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="border border-gray-200 rounded-lg p-4 opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => setSelectedEvent(event.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg border ${getCategoryColor(event.category)}`}>
                          {getCategoryIcon(event.category)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(event.date).toLocaleDateString()} • {event.venue}
                          </p>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEventData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{selectedEventData.title}</h3>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Event Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Event Details</h4>
                <p className="text-gray-700 leading-relaxed">{selectedEventData.description}</p>
              </div>

              {/* Event Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">When & Where</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span>
                        {new Date(selectedEventData.date).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span>{selectedEventData.startTime} - {selectedEventData.endTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span>{selectedEventData.venue}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span>{selectedEventData.contactPerson.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 text-gray-600">📞</span>
                      <span>{selectedEventData.contactPerson.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 text-gray-600">✉️</span>
                      <span>{selectedEventData.contactPerson.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RSVP Section */}
              {selectedEventData.rsvpRequired && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">RSVP Required</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-800 text-sm">
                        Deadline: {selectedEventData.rsvpDeadline && new Date(selectedEventData.rsvpDeadline).toLocaleDateString()}
                      </p>
                      <p className="text-blue-700 text-sm">
                        Current Status: <span className="font-medium capitalize">{selectedEventData.rsvpStatus || 'pending'}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setShowRSVPModal(selectedEventData.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Update RSVP
                    </button>
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedEventData.attachments && selectedEventData.attachments.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Attachments</h4>
                  <div className="space-y-2">
                    {selectedEventData.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">{attachment.name}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {selectedEventData.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEventData.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RSVP Modal */}
      {showRSVPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Update RSVP</h3>
              <button 
                onClick={() => setShowRSVPModal(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Please confirm your attendance for this event:
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleRSVP(showRSVPModal, 'attending')}
                  className="w-full p-3 text-left border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Yes, I'll attend</p>
                      <p className="text-sm text-green-700">I will be attending this event</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleRSVP(showRSVPModal, 'maybe')}
                  className="w-full p-3 text-left border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-900">Maybe</p>
                      <p className="text-sm text-yellow-700">I'm not sure about my availability</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleRSVP(showRSVPModal, 'not-attending')}
                  className="w-full p-3 text-left border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-red-900">No, I can't attend</p>
                      <p className="text-sm text-red-700">I will not be attending this event</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
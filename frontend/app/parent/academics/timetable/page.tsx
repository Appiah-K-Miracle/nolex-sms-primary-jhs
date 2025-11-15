"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Clock,
  Calendar,
  User,
  BookOpen,
  MapPin,
  Bell,
  Filter,
  Download,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  Settings,
  Share2,
  Bookmark,
  AlertCircle,
  CheckCircle,
  Star,
  Target,
  Users,
  Building,
  GraduationCap,
  Calculator,
  Beaker,
  Globe,
  Palette,
  Music,
  Heart,
  Zap,
  Phone,
  Mail,
  MessageSquare,
  Info,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  ChevronsUp,
  ChevronsDown,
  ArrowUpRight,
  Timer,
  PlayCircle,
  PauseCircle
} from "lucide-react";

export default function TimetablePage() {
  const [selectedChild, setSelectedChild] = useState("1");
  const [selectedTerm, setSelectedTerm] = useState("current");
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [viewMode, setViewMode] = useState("weekly"); // weekly, daily, subject
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(true);

  // Sample children data
  const children = [
    {
      id: "1",
      name: "Kwame Mensah",
      class: "Primary 6A",
      photo: "/avatars/student1.jpg"
    },
    {
      id: "2", 
      name: "Ama Mensah",
      class: "Primary 4B",
      photo: "/avatars/student2.jpg"
    }
  ];

  // Sample timetable data
  const timetableData = {
    "1": { // Kwame Mensah
      class: "Primary 6A",
      classTeacher: "Mrs. Adjei",
      currentWeek: "Week 8 - Term 2",
      schedule: {
        monday: [
          {
            id: 1,
            time: "08:00 - 08:40",
            subject: "Mathematics",
            teacher: "Mr. Osei",
            room: "Class 6A",
            type: "core",
            description: "Algebraic Expressions",
            nextAssignment: "Worksheet due tomorrow",
            status: "active"
          },
          {
            id: 2,
            time: "08:40 - 09:20",
            subject: "English Language",
            teacher: "Mrs. Addo",
            room: "Class 6A",
            type: "core",
            description: "Reading Comprehension",
            nextAssignment: "Essay due Friday",
            status: "upcoming"
          },
          {
            id: 3,
            time: "09:20 - 09:40",
            subject: "Break",
            teacher: "",
            room: "Playground",
            type: "break",
            description: "Morning Break",
            nextAssignment: "",
            status: "break"
          },
          {
            id: 4,
            time: "09:40 - 10:20",
            subject: "Science",
            teacher: "Dr. Mensah",
            room: "Science Lab",
            type: "core",
            description: "Plant Life Cycles",
            nextAssignment: "Lab report next week",
            status: "upcoming"
          },
          {
            id: 5,
            time: "10:20 - 11:00",
            subject: "Social Studies",
            teacher: "Mr. Boateng",
            room: "Class 6A",
            type: "core",
            description: "Ghana's Independence",
            nextAssignment: "Research project ongoing",
            status: "upcoming"
          },
          {
            id: 6,
            time: "11:00 - 11:40",
            subject: "ICT",
            teacher: "Ms. Owusu",
            room: "Computer Lab",
            type: "elective",
            description: "Scratch Programming",
            nextAssignment: "Game project due Monday",
            status: "upcoming"
          },
          {
            id: 7,
            time: "11:40 - 12:20",
            subject: "French",
            teacher: "Mme. Kone",
            room: "Language Lab",
            type: "elective",
            description: "Vocabulary & Grammar",
            nextAssignment: "Vocabulary test Wednesday",
            status: "upcoming"
          },
          {
            id: 8,
            time: "12:20 - 13:00",
            subject: "Lunch",
            teacher: "",
            room: "Dining Hall",
            type: "break",
            description: "Lunch Break",
            nextAssignment: "",
            status: "break"
          },
          {
            id: 9,
            time: "13:00 - 13:40",
            subject: "Physical Education",
            teacher: "Mr. Akoto",
            room: "Sports Field",
            type: "practical",
            description: "Football Training",
            nextAssignment: "Fitness test next week",
            status: "upcoming"
          },
          {
            id: 10,
            time: "13:40 - 14:20",
            subject: "Creative Arts",
            teacher: "Ms. Nkrumah",
            room: "Art Studio",
            type: "practical",
            description: "Painting Techniques",
            nextAssignment: "Portrait project ongoing",
            status: "upcoming"
          }
        ],
        tuesday: [
          {
            id: 11,
            time: "08:00 - 08:40",
            subject: "English Language",
            teacher: "Mrs. Addo",
            room: "Class 6A",
            type: "core",
            description: "Grammar & Writing",
            nextAssignment: "Essay due Friday",
            status: "upcoming"
          },
          {
            id: 12,
            time: "08:40 - 09:20",
            subject: "Mathematics",
            teacher: "Mr. Osei",
            room: "Class 6A",
            type: "core",
            description: "Problem Solving",
            nextAssignment: "Worksheet due tomorrow",
            status: "upcoming"
          },
          // More periods...
        ],
        wednesday: [
          {
            id: 21,
            time: "08:00 - 08:40",
            subject: "Science",
            teacher: "Dr. Mensah",
            room: "Science Lab",
            type: "core",
            description: "Chemistry Experiments",
            nextAssignment: "Lab report next week",
            status: "upcoming"
          },
          // More periods...
        ],
        thursday: [
          {
            id: 31,
            time: "08:00 - 08:40",
            subject: "Mathematics",
            teacher: "Mr. Osei",
            room: "Class 6A",
            type: "core",
            description: "Geometry",
            nextAssignment: "Practice exercises",
            status: "upcoming"
          },
          // More periods...
        ],
        friday: [
          {
            id: 41,
            time: "08:00 - 08:40",
            subject: "English Language",
            teacher: "Mrs. Addo",
            room: "Class 6A",
            type: "core",
            description: "Literature Study",
            nextAssignment: "Essay due today",
            status: "upcoming"
          },
          // More periods...
        ]
      },
      teachers: [
        {
          name: "Mr. Osei",
          subject: "Mathematics",
          email: "mr.osei@school.edu.gh",
          phone: "+233 24 567 8901",
          office: "Room A12",
          officeHours: "Mon-Fri 2:00-3:00 PM"
        },
        {
          name: "Mrs. Addo",
          subject: "English Language",
          email: "mrs.addo@school.edu.gh",
          phone: "+233 24 567 8902",
          office: "Room A15",
          officeHours: "Mon-Fri 2:30-3:30 PM"
        },
        {
          name: "Dr. Mensah",
          subject: "Science",
          email: "dr.mensah@school.edu.gh",
          phone: "+233 24 567 8903",
          office: "Science Dept",
          officeHours: "Tue-Thu 3:00-4:00 PM"
        }
      ],
      upcomingEvents: [
        {
          id: 1,
          title: "Mathematics Test",
          subject: "Mathematics",
          date: "2025-11-18",
          time: "08:00 - 09:20",
          teacher: "Mr. Osei",
          type: "test",
          description: "Unit test on algebraic expressions"
        },
        {
          id: 2,
          title: "Science Lab Session",
          subject: "Science",
          date: "2025-11-19",
          time: "09:40 - 11:00",
          teacher: "Dr. Mensah",
          type: "practical",
          description: "Plant observation experiment"
        },
        {
          id: 3,
          title: "French Vocabulary Test",
          subject: "French",
          date: "2025-11-20",
          time: "11:40 - 12:20",
          teacher: "Mme. Kone",
          type: "test",
          description: "Weekly vocabulary assessment"
        }
      ]
    },
    "2": { // Ama Mensah
      class: "Primary 4B",
      classTeacher: "Mr. Asante",
      currentWeek: "Week 8 - Term 2",
      schedule: {
        monday: [
          {
            id: 51,
            time: "08:00 - 08:40",
            subject: "Mathematics",
            teacher: "Mrs. Appiah",
            room: "Class 4B",
            type: "core",
            description: "Multiplication & Division",
            nextAssignment: "Practice worksheet",
            status: "upcoming"
          },
          {
            id: 52,
            time: "08:40 - 09:20",
            subject: "English Language",
            teacher: "Mr. Adjei",
            room: "Class 4B",
            type: "core",
            description: "Spelling & Vocabulary",
            nextAssignment: "Spelling test Friday",
            status: "upcoming"
          },
          // More periods...
        ],
        // Other days...
      },
      teachers: [
        {
          name: "Mrs. Appiah",
          subject: "Mathematics",
          email: "mrs.appiah@school.edu.gh",
          phone: "+233 24 567 8904",
          office: "Room B08",
          officeHours: "Mon-Fri 2:00-3:00 PM"
        }
      ],
      upcomingEvents: [
        {
          id: 4,
          title: "Spelling Test",
          subject: "English Language",
          date: "2025-11-22",
          time: "08:40 - 09:20",
          teacher: "Mr. Adjei",
          type: "test",
          description: "Weekly spelling assessment"
        }
      ]
    }
  };

  const getCurrentChild = () => {
    return timetableData[selectedChild as keyof typeof timetableData];
  };

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

  const getSubjectIcon = (subjectName: string) => {
    const subject = subjects.find(s => s.name.toLowerCase().includes(subjectName.toLowerCase()));
    return subject ? subject.icon : BookOpen;
  };

  const getSubjectColor = (subjectName: string) => {
    const subject = subjects.find(s => s.name.toLowerCase().includes(subjectName.toLowerCase()));
    return subject ? subject.color : "gray";
  };

  const getPeriodTypeColor = (type: string) => {
    switch (type) {
      case "core": return "bg-blue-50 border-blue-200 text-blue-800";
      case "elective": return "bg-green-50 border-green-200 text-green-800";
      case "practical": return "bg-purple-50 border-purple-200 text-purple-800";
      case "break": return "bg-gray-50 border-gray-200 text-gray-600";
      default: return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "test": return <Target className="w-4 h-4 text-red-600" />;
      case "practical": return <Beaker className="w-4 h-4 text-purple-600" />;
      case "assignment": return <BookOpen className="w-4 h-4 text-blue-600" />;
      case "exam": return <GraduationCap className="w-4 h-4 text-orange-600" />;
      default: return <Calendar className="w-4 h-4 text-gray-600" />;
    }
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

  const getNextPeriod = (day: string) => {
    const currentChild = getCurrentChild();
    const todaySchedule = currentChild.schedule[day as keyof typeof currentChild.schedule];
    if (!todaySchedule) return null;

    const now = getCurrentTime();
    return todaySchedule.find(period => {
      const [, endTime] = period.time.split(' - ');
      return now < endTime;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };

  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">Class Timetable</h1>
            <p className="text-blue-100 text-sm lg:text-base xl:text-lg">
              View schedules, periods, and upcoming events for your children
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium">
              <Download className="w-4 h-4" />
              Export
            </button>
            <Link
              href="/parent/academics/timetable/calendar"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              <Calendar className="w-4 h-4" />
              Calendar View
            </Link>
          </div>
        </div>
      </div>

      {/* Current Period Alert */}
      {showNotifications && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-blue-900">Current Status</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-blue-400 hover:text-blue-600"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                It's currently {getCurrentTime()} on {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </p>
              {getNextPeriod(getCurrentDay()) && (
                <div className="mt-2 p-2 bg-blue-100 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <PlayCircle className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">
                      Next: {getNextPeriod(getCurrentDay())?.subject} at {getNextPeriod(getCurrentDay())?.time.split(' - ')[0]}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
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
                {children.map(child => (
                  <option key={child.id} value={child.id}>{child.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="current">Current Term</option>
                <option value="term_1">Term 1</option>
                <option value="term_2">Term 2</option>
                <option value="term_3">Term 3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Week</label>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="current">Current Week</option>
                <option value="week_7">Week 7</option>
                <option value="week_8">Week 8</option>
                <option value="week_9">Week 9</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
              <div className="flex rounded-lg border border-gray-300">
                <button
                  onClick={() => setViewMode("weekly")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-l-lg ${
                    viewMode === "weekly" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setViewMode("daily")}
                  className={`flex-1 px-3 py-2 text-sm font-medium ${
                    viewMode === "daily" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setViewMode("subject")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-r-lg ${
                    viewMode === "subject" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  By Subject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Main Timetable */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
            <div className="p-6 lg:p-8 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {getCurrentChild()?.class} Timetable
                  </h2>
                  <p className="text-gray-600">
                    {getCurrentChild()?.currentWeek} • Class Teacher: {getCurrentChild()?.classTeacher}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 font-medium">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                  <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2 font-medium">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Weekly View */}
            {viewMode === "weekly" && (
              <div className="p-6 lg:p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600 min-w-24">Time</th>
                        {weekDays.map(day => (
                          <th key={day} className={`text-center py-3 px-4 font-medium min-w-40 ${
                            day === getCurrentDay() ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                          }`}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {getCurrentChild()?.schedule.monday.map((period, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-sm font-medium text-gray-600 bg-gray-50">
                            {period.time}
                          </td>
                          {weekDays.map(day => {
                            const daySchedule = getCurrentChild()?.schedule[day as keyof typeof getCurrentChild().schedule];
                            const dayPeriod = daySchedule?.[index];
                            const isCurrentSlot = isCurrentPeriod(period.time) && day === getCurrentDay();
                            
                            return (
                              <td key={day} className={`py-2 px-2 text-center ${
                                isCurrentSlot ? 'bg-blue-100 border-2 border-blue-300' : ''
                              }`}>
                                {dayPeriod ? (
                                  <div 
                                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                                      getPeriodTypeColor(dayPeriod.type)
                                    } ${isCurrentSlot ? 'ring-2 ring-blue-400' : ''}`}
                                    onClick={() => setSelectedPeriod(dayPeriod.id.toString())}
                                  >
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                      {dayPeriod.type !== 'break' && React.createElement(getSubjectIcon(dayPeriod.subject), { 
                                        className: `w-4 h-4 text-${getSubjectColor(dayPeriod.subject)}-600` 
                                      })}
                                      <span className="text-xs font-semibold truncate">
                                        {dayPeriod.subject}
                                      </span>
                                    </div>
                                    {dayPeriod.type !== 'break' && (
                                      <>
                                        <div className="text-xs text-gray-600 truncate">
                                          {dayPeriod.teacher}
                                        </div>
                                        <div className="text-xs text-gray-500 truncate">
                                          {dayPeriod.room}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                ) : (
                                  <div className="p-3 text-gray-400 text-xs">-</div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Daily View */}
            {viewMode === "daily" && (
              <div className="p-6 lg:p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getCurrentDay().charAt(0).toUpperCase() + getCurrentDay().slice(1)} Schedule
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          // Navigate to previous day
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          // Navigate to next day
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {getCurrentChild()?.schedule[getCurrentDay() as keyof typeof getCurrentChild().schedule]?.map((period) => {
                    const isCurrentSlot = isCurrentPeriod(period.time);
                    
                    return (
                      <div
                        key={period.id}
                        className={`border rounded-lg p-6 transition-all hover:shadow-md ${
                          isCurrentSlot ? 'border-blue-300 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              period.type === 'break' ? 'bg-gray-100' : `bg-${getSubjectColor(period.subject)}-100`
                            }`}>
                              {period.type !== 'break' ? React.createElement(getSubjectIcon(period.subject), { 
                                className: `w-6 h-6 text-${getSubjectColor(period.subject)}-600` 
                              }) : <Clock className="w-6 h-6 text-gray-600" />}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900">{period.subject}</h4>
                                <p className="text-gray-600">{period.description}</p>
                                {period.type !== 'break' && (
                                  <div className="mt-2 space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <User className="w-4 h-4" />
                                      <span>{period.teacher}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <MapPin className="w-4 h-4" />
                                      <span>{period.room}</span>
                                    </div>
                                    {period.nextAssignment && (
                                      <div className="flex items-center gap-2 text-sm text-orange-600">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{period.nextAssignment}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              
                              <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">{period.time}</div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  getPeriodTypeColor(period.type)
                                }`}>
                                  {period.type}
                                </span>
                                {isCurrentSlot && (
                                  <div className="mt-2">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                                      Current
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Subject View */}
            {viewMode === "subject" && (
              <div className="p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((subject) => {
                    // Get all periods for this subject across the week
                    const subjectPeriods: any[] = [];
                    weekDays.forEach(day => {
                      const daySchedule = getCurrentChild()?.schedule[day as keyof typeof getCurrentChild().schedule];
                      daySchedule?.forEach(period => {
                        if (period.subject.toLowerCase().includes(subject.name.toLowerCase())) {
                          subjectPeriods.push({ ...period, day });
                        }
                      });
                    });

                    if (subjectPeriods.length === 0) return null;

                    return (
                      <div key={subject.id} className={`border-2 border-${subject.color}-200 rounded-lg p-4 bg-${subject.color}-50`}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 bg-${subject.color}-100 rounded-lg`}>
                            <subject.icon className={`w-5 h-5 text-${subject.color}-600`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                            <p className="text-sm text-gray-600">{subjectPeriods.length} periods/week</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {subjectPeriods.map((period, index) => (
                            <div key={index} className="text-sm bg-white rounded p-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium capitalize">{period.day}</span>
                                <span className="text-gray-600">{period.time}</span>
                              </div>
                              <div className="text-gray-600">{period.teacher} • {period.room}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Periods</span>
                <span className="font-semibold text-gray-900">40/week</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Core Subjects</span>
                <span className="font-semibold text-blue-600">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Electives</span>
                <span className="font-semibold text-green-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Breaks</span>
                <span className="font-semibold text-gray-600">10</span>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
              <Link
                href="/parent/academics/timetable/events"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {getCurrentChild()?.upcomingEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    {getEventTypeIcon(event.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.subject}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(event.date)}</span>
                        <Clock className="w-3 h-3 ml-2" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teachers Contact */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Teachers</h3>
              <Link
                href="/parent/academics/timetable/teachers"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {getCurrentChild()?.teachers.slice(0, 3).map((teacher, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {teacher.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{teacher.name}</h4>
                    <p className="text-sm text-gray-600 truncate">{teacher.subject}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Tips */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">Study Tip</h3>
            </div>
            <p className="text-sm text-purple-800">
              Use the 10-minute rule: Start studying a subject 10 minutes before the scheduled class time to prepare your mind.
            </p>
          </div>
        </div>
      </div>

      {/* Period Details Modal */}
      {selectedPeriod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            {/* Modal content would go here */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Period Details</h3>
              <button
                onClick={() => setSelectedPeriod(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600">Period details would be shown here...</p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedPeriod(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  Phone,
  Mail,
  MessageSquare,
  Bell,
  Settings,
  Download,
  Share2,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit3,
  AlertCircle,
  Info,
  CheckCircle,
  Star,
  Users,
  Building,
  Briefcase,
  GraduationCap,
  Activity,
  FileText,
  RefreshCw,
  Plus,
  Minus,
  MoreVertical,
  ExternalLink,
  Copy,
  Archive
} from "lucide-react";

export default function ScheduleDetailPage() {
  const params = useParams();
  const scheduleId = params.id as string;
  
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = current week
  const [viewMode, setViewMode] = useState("week"); // week, day
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0); // 0 = Monday

  // Sample schedule data
  const scheduleData = {
    id: parseInt(scheduleId),
    student: {
      name: "Kwame Mensah",
      class: "JHS 2A",
      studentId: "STU001",
      academicYear: "2024-2025",
      term: "Term 1"
    },
    weekInfo: {
      currentWeek: "Week 8",
      weekDates: "November 18-22, 2025",
      termWeeks: 12,
      weekNumber: 8
    },
    schedule: {
      monday: [
        {
          id: 1,
          time: "07:30 - 08:15",
          subject: "Mathematics",
          teacher: "Mr. Asante",
          room: "Room 2A",
          type: "Core Subject",
          topic: "Algebraic Expressions",
          homework: true,
          materials: ["Mathematics Textbook", "Calculator", "Exercise Book"],
          notes: "Quiz scheduled for Friday"
        },
        {
          id: 2,
          time: "08:15 - 09:00",
          subject: "English Language",
          teacher: "Mrs. Osei",
          room: "Room 2A",
          type: "Core Subject", 
          topic: "Creative Writing",
          homework: true,
          materials: ["English Textbook", "Writing Pad", "Dictionary"],
          notes: "Essay due next Monday"
        },
        {
          id: 3,
          time: "09:00 - 09:15",
          subject: "Break",
          teacher: null,
          room: "School Compound",
          type: "Break",
          topic: null,
          homework: false,
          materials: [],
          notes: null
        },
        {
          id: 4,
          time: "09:15 - 10:00",
          subject: "Integrated Science",
          teacher: "Mr. Boateng",
          room: "Science Lab",
          type: "Core Subject",
          topic: "Chemical Reactions",
          homework: false,
          materials: ["Science Textbook", "Lab Manual", "Safety Goggles"],
          notes: "Laboratory session"
        },
        {
          id: 5,
          time: "10:00 - 10:45",
          subject: "Social Studies",
          teacher: "Mrs. Adjei",
          room: "Room 2A",
          type: "Core Subject",
          topic: "Independence Struggle",
          homework: true,
          materials: ["Social Studies Textbook", "Atlas", "Exercise Book"],
          notes: "Test preparation"
        },
        {
          id: 6,
          time: "10:45 - 11:30",
          subject: "French",
          teacher: "Mme. Koffi",
          room: "Language Lab",
          type: "Elective",
          topic: "Les Verbes",
          homework: true,
          materials: ["French Textbook", "Audio Device", "Exercise Book"],
          notes: "Oral test next week"
        },
        {
          id: 7,
          time: "11:30 - 12:15",
          subject: "ICT",
          teacher: "Mr. Darko",
          room: "Computer Lab",
          type: "Elective",
          topic: "Programming Basics",
          homework: false,
          materials: ["None - Lab computers"],
          notes: "Project assignment given"
        },
        {
          id: 8,
          time: "12:15 - 13:00",
          subject: "Lunch Break",
          teacher: null,
          room: "Dining Hall",
          type: "Break",
          topic: null,
          homework: false,
          materials: [],
          notes: null
        },
        {
          id: 9,
          time: "13:00 - 13:45",
          subject: "RME",
          teacher: "Rev. Mensah",
          room: "Room 2A",
          type: "Core Subject",
          topic: "Moral Values",
          homework: false,
          materials: ["RME Textbook", "Exercise Book"],
          notes: "Group discussion"
        },
        {
          id: 10,
          time: "13:45 - 14:30",
          subject: "Physical Education",
          teacher: "Mr. Owusu",
          room: "School Field",
          type: "Activity",
          topic: "Football Skills",
          homework: false,
          materials: ["Sports Uniform", "Water Bottle"],
          notes: "Inter-house competition prep"
        }
      ],
      tuesday: [
        {
          id: 11,
          time: "07:30 - 08:15",
          subject: "English Language",
          teacher: "Mrs. Osei",
          room: "Room 2A",
          type: "Core Subject",
          topic: "Grammar - Tenses",
          homework: true,
          materials: ["English Textbook", "Grammar Guide", "Exercise Book"],
          notes: "Review homework from Monday"
        },
        {
          id: 12,
          time: "08:15 - 09:00",
          subject: "Mathematics",
          teacher: "Mr. Asante",
          room: "Room 2A",
          type: "Core Subject",
          topic: "Word Problems",
          homework: true,
          materials: ["Mathematics Textbook", "Calculator", "Exercise Book"],
          notes: "Problem-solving focus"
        },
        {
          id: 13,
          time: "09:00 - 09:15",
          subject: "Break",
          teacher: null,
          room: "School Compound",
          type: "Break",
          topic: null,
          homework: false,
          materials: [],
          notes: null
        },
        {
          id: 14,
          time: "09:15 - 10:00",
          subject: "Social Studies",
          teacher: "Mrs. Adjei",
          room: "Room 2A",
          type: "Core Subject",
          topic: "Government Structure",
          homework: false,
          materials: ["Social Studies Textbook", "Constitution Booklet"],
          notes: "Class presentation"
        },
        {
          id: 15,
          time: "10:00 - 10:45",
          subject: "Integrated Science",
          teacher: "Mr. Boateng",
          room: "Room 2A",
          type: "Core Subject",
          topic: "States of Matter",
          homework: true,
          materials: ["Science Textbook", "Exercise Book"],
          notes: "Theory lesson"
        },
        {
          id: 16,
          time: "10:45 - 11:30",
          subject: "Technical Skills",
          teacher: "Mr. Appiah",
          room: "Workshop",
          type: "Elective",
          topic: "Basic Electronics",
          homework: false,
          materials: ["Safety Equipment", "Components"],
          notes: "Hands-on session"
        },
        {
          id: 17,
          time: "11:30 - 12:15",
          subject: "Creative Arts",
          teacher: "Ms. Akoto",
          room: "Art Room",
          type: "Elective",
          topic: "Painting Techniques",
          homework: false,
          materials: ["Art Materials", "Apron"],
          notes: "Portfolio work"
        },
        {
          id: 18,
          time: "12:15 - 13:00",
          subject: "Lunch Break",
          teacher: null,
          room: "Dining Hall",
          type: "Break",
          topic: null,
          homework: false,
          materials: [],
          notes: null
        },
        {
          id: 19,
          time: "13:00 - 13:45",
          subject: "Music",
          teacher: "Mr. Ampah",
          room: "Music Room",
          type: "Activity",
          topic: "Traditional Songs",
          homework: false,
          materials: ["Music Sheets", "Instruments"],
          notes: "Concert preparation"
        },
        {
          id: 20,
          time: "13:45 - 14:30",
          subject: "Study Period",
          teacher: "Class Teacher",
          room: "Room 2A",
          type: "Study",
          topic: "Supervised Study",
          homework: false,
          materials: ["All Subject Books"],
          notes: "Complete pending assignments"
        }
      ],
      // Additional days would follow similar structure...
      wednesday: [
        // Similar structure for Wednesday
      ],
      thursday: [
        // Similar structure for Thursday  
      ],
      friday: [
        // Similar structure for Friday
      ]
    },
    teacherContacts: [
      {
        name: "Mr. Asante",
        subject: "Mathematics", 
        email: "asante@nolexsms.edu.gh",
        phone: "+233 24 123 4567",
        officeHours: "Mon-Fri: 2:30-4:00 PM",
        room: "Staff Room 1"
      },
      {
        name: "Mrs. Osei",
        subject: "English Language",
        email: "osei@nolexsms.edu.gh", 
        phone: "+233 24 234 5678",
        officeHours: "Mon-Fri: 2:30-4:00 PM",
        room: "Staff Room 1"
      },
      {
        name: "Mr. Boateng",
        subject: "Integrated Science",
        email: "boateng@nolexsms.edu.gh",
        phone: "+233 24 345 6789",
        officeHours: "Mon-Fri: 2:30-4:00 PM",
        room: "Science Department"
      }
    ],
    upcomingEvents: [
      {
        date: "2025-11-22",
        time: "09:00 AM",
        event: "Mathematics Quiz",
        subject: "Mathematics",
        type: "Assessment",
        preparation: "Review Algebraic Expressions"
      },
      {
        date: "2025-11-25",
        time: "08:00 AM",
        event: "English Essay Submission",
        subject: "English Language", 
        type: "Assignment",
        preparation: "Complete creative writing essay"
      },
      {
        date: "2025-11-28",
        time: "10:00 AM",
        event: "Science Lab Test",
        subject: "Integrated Science",
        type: "Assessment",
        preparation: "Study chemical reactions and safety procedures"
      }
    ],
    weeklyStats: {
      totalClasses: 45,
      coreSubjects: 30,
      electives: 10,
      activities: 5,
      homeworkAssignments: 12,
      upcomingTests: 3
    }
  };

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const currentDaySchedule = scheduleData.schedule.monday; // This would be dynamic based on selectedDay

  const getSubjectTypeColor = (type: string) => {
    switch (type) {
      case 'Core Subject': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Elective': return 'bg-green-100 text-green-800 border-green-200';
      case 'Activity': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Study': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Break': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCurrentTimeSlot = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    return currentDaySchedule.findIndex(slot => {
      if (!slot.time.includes('-')) return false;
      const [start] = slot.time.split(' - ');
      const [hours, minutes] = start.split(':').map(Number);
      const slotTime = hours * 60 + minutes;
      return currentTime >= slotTime && currentTime < slotTime + 45; // 45-minute periods
    });
  };

  const currentTimeSlot = getCurrentTimeSlot();

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/parent/academics/schedule"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Class Schedule</h1>
              <p className="text-gray-600">
                {scheduleData.student.name} • {scheduleData.student.class} • {scheduleData.weekInfo.weekDates}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/parent/academics/schedule/${scheduleId}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            <span className="hidden sm:inline">Preferences</span>
          </Link>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Week Navigation & Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Week Navigation */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedWeek(prev => prev - 1)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900">{scheduleData.weekInfo.currentWeek}</h2>
                  <p className="text-gray-600">{scheduleData.weekInfo.weekDates}</p>
                </div>
                <button
                  onClick={() => setSelectedWeek(prev => prev + 1)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'week' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Week View
                </button>
                <button
                  onClick={() => setViewMode('day')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'day' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Day View
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Term Progress</span>
                <span className="text-sm text-gray-600">
                  Week {scheduleData.weekInfo.weekNumber} of {scheduleData.weekInfo.termWeeks}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(scheduleData.weekInfo.weekNumber / scheduleData.weekInfo.termWeeks) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Day Selection for Day View */}
            {viewMode === 'day' && (
              <div className="flex gap-2 mb-6">
                {weekdays.map((day, index) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDay === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            )}

            {/* Schedule Display */}
            {viewMode === 'week' ? (
              // Week View - Show all days in grid
              <div className="space-y-4">
                {weekdays.map((day, dayIndex) => (
                  <div key={day} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {day}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                      {currentDaySchedule.slice(0, 6).map((period, periodIndex) => (
                        <div key={period.id} className="bg-white rounded border p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{period.subject}</div>
                              <div className="text-sm text-gray-600">{period.teacher}</div>
                            </div>
                            {period.homework && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{period.time}</span>
                            <span>{period.room}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Day View - Show detailed schedule for selected day
              <div className="space-y-3">
                {currentDaySchedule.map((period, index) => (
                  <div 
                    key={period.id} 
                    className={`bg-white border rounded-lg p-4 transition-all duration-200 ${
                      index === currentTimeSlot ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-center">
                        <div className="text-sm font-medium text-gray-900">{period.time}</div>
                        {index === currentTimeSlot && (
                          <div className="text-xs text-blue-600 font-medium mt-1">Current</div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{period.subject}</h4>
                            {period.teacher && (
                              <p className="text-sm text-gray-600">{period.teacher}</p>
                            )}
                            {period.topic && (
                              <p className="text-sm text-blue-600 mt-1">{period.topic}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {period.homework && (
                              <div className="flex items-center gap-1">
                                <FileText className="w-4 h-4 text-orange-600" />
                                <span className="text-xs text-orange-600">Homework</span>
                              </div>
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSubjectTypeColor(period.type)}`}>
                              {period.type}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                          {period.room && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{period.room}</span>
                            </div>
                          )}
                          
                          {period.materials.length > 0 && (
                            <div className="flex items-start gap-2 text-gray-600">
                              <Briefcase className="w-4 h-4 mt-0.5" />
                              <div>
                                <div className="font-medium">Materials:</div>
                                <div className="text-xs">{period.materials.join(", ")}</div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {period.notes && (
                          <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
                              <div>
                                <div className="text-sm font-medium text-yellow-800">Note:</div>
                                <div className="text-sm text-yellow-700">{period.notes}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Weekly Stats Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Classes</span>
                <span className="font-semibold text-gray-900">{scheduleData.weeklyStats.totalClasses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Core Subjects</span>
                <span className="font-semibold text-blue-600">{scheduleData.weeklyStats.coreSubjects}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Electives</span>
                <span className="font-semibold text-green-600">{scheduleData.weeklyStats.electives}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Activities</span>
                <span className="font-semibold text-purple-600">{scheduleData.weeklyStats.activities}</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Homework Due</span>
                  <span className="font-semibold text-orange-600">{scheduleData.weeklyStats.homeworkAssignments}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Upcoming Tests</span>
                  <span className="font-semibold text-red-600">{scheduleData.weeklyStats.upcomingTests}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-blue-50 rounded-lg lg:rounded-xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {scheduleData.upcomingEvents.map((event, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-blue-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-gray-900">{event.event}</div>
                      <div className="text-sm text-blue-600">{event.subject}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'Assessment' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                  <div className="text-xs text-gray-700 bg-gray-50 rounded p-2">
                    <strong>Preparation:</strong> {event.preparation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Message Teachers</div>
                    <div className="text-sm text-gray-600">Contact subject teachers</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">Set Reminders</div>
                    <div className="text-sm text-gray-600">Schedule notifications</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-gray-900">Add to Calendar</div>
                    <div className="text-sm text-gray-600">Sync with personal calendar</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Contacts */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Teacher Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduleData.teacherContacts.map((teacher, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                  <p className="text-sm text-blue-600 mb-3">{teacher.subject}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{teacher.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{teacher.officeHours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{teacher.room}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                      Message
                    </button>
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-xs hover:bg-gray-50 transition-colors">
                      Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
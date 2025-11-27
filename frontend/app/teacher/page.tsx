"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  MessageSquare, 
  GraduationCap,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Target,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  AlertCircle,
  Star,
  UserCheck,
  FileText,
  BookMarked,
  Zap
} from "lucide-react";
import Link from "next/link";

// Mock data - in real app this would come from API
const dashboardStats = {
  totalStudents: 156,
  totalClasses: 5,
  pendingGrades: 12,
  unreadMessages: 3,
  attendanceToday: 94.2,
  assignmentsDue: 8,
  upcomingClasses: 4,
  completedLessons: 23
};

const recentActivities = [
  {
    id: 1,
    type: "grade",
    title: "Graded Math Quiz #3",
    description: "Class 6A - 28 students",
    time: "2 hours ago",
    icon: GraduationCap,
    color: "bg-blue-500"
  },
  {
    id: 2,
    type: "attendance",
    title: "Took Class Attendance",
    description: "Class 6B - 30 students present",
    time: "4 hours ago",
    icon: UserCheck,
    color: "bg-green-500"
  },
  {
    id: 3,
    type: "assignment",
    title: "Created New Assignment",
    description: "Algebra Practice - Due Friday",
    time: "1 day ago",
    icon: FileText,
    color: "bg-purple-500"
  },
  {
    id: 4,
    type: "message",
    title: "Replied to Parent Message",
    description: "Mrs. Johnson - About homework",
    time: "2 days ago",
    icon: MessageSquare,
    color: "bg-orange-500"
  }
];

const upcomingSchedule = [
  {
    id: 1,
    subject: "Mathematics",
    class: "Class 6A",
    time: "9:00 AM - 10:00 AM",
    room: "Room 101",
    topic: "Algebraic Expressions",
    students: 28
  },
  {
    id: 2,
    subject: "Mathematics",
    class: "Class 6B",
    time: "10:30 AM - 11:30 AM",
    room: "Room 101",
    topic: "Geometry Basics",
    students: 30
  },
  {
    id: 3,
    subject: "Mathematics",
    class: "Class 5A",
    time: "2:00 PM - 3:00 PM",
    room: "Room 102",
    topic: "Fractions Review",
    students: 25
  }
];

const quickActions = [
  {
    title: "Take Attendance",
    description: "Mark today's attendance",
    href: "/teacher/attendance/quick",
    icon: UserCheck,
    color: "bg-green-500 hover:bg-green-600",
    urgent: true
  },
  {
    title: "Grade Papers",
    description: "12 pending submissions",
    href: "/teacher/grades/pending",
    icon: GraduationCap,
    color: "bg-blue-500 hover:bg-blue-600",
    badge: "12"
  },
  {
    title: "New Assignment",
    description: "Create assignment",
    href: "/teacher/assignments/create",
    icon: FileText,
    color: "bg-purple-500 hover:bg-purple-600"
  },
  {
    title: "Send Message",
    description: "Message parents/students",
    href: "/teacher/communication/compose",
    icon: MessageSquare,
    color: "bg-orange-500 hover:bg-orange-600"
  }
];

export default function TeacherDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Good Morning, Mr. Emmanuel! 👋
            </h1>
            <p className="text-orange-100 mb-4 lg:mb-0">
              Ready to inspire minds today? You have {upcomingSchedule.length} classes scheduled.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-lg font-mono font-bold">{formatTime(currentTime)}</div>
            <div className="text-sm text-orange-100">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalStudents}</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-4 w-4" />
                +5 this month
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* My Classes */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">My Classes</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalClasses}</p>
              <p className="text-sm text-gray-500 mt-1">
                Active this term
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Pending Grades */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Grades</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.pendingGrades}</p>
              <p className="text-sm text-orange-600 flex items-center gap-1 mt-1">
                <AlertCircle className="h-4 w-4" />
                Need attention
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-xl">
              <GraduationCap className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Messages</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.unreadMessages}</p>
              <p className="text-sm text-purple-600 flex items-center gap-1 mt-1">
                <Bell className="h-4 w-4" />
                From parents
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`${action.color} text-white p-4 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 relative overflow-hidden group`}
            >
              {action.urgent && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              )}
              {action.badge && (
                <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {action.badge}
                </div>
              )}
              <div className="flex items-center gap-3 mb-2">
                <action.icon className="h-6 w-6" />
                <h3 className="font-semibold text-lg">{action.title}</h3>
              </div>
              <p className="text-white/90 text-sm">{action.description}</p>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-orange-500" />
              Today's Schedule
            </h2>
            <Link
              href="/teacher/timetable"
              className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1"
            >
              View Full Timetable
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingSchedule.map((schedule) => (
              <div
                key={schedule.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <BookOpen className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{schedule.subject}</h3>
                      <p className="text-sm text-gray-600">{schedule.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{schedule.time}</p>
                    <p className="text-xs text-gray-500">{schedule.room}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{schedule.students} students</span>
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium text-gray-700">{schedule.topic}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities & Performance */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                Recent Activities
              </h2>
              <Link
                href="/teacher/activities"
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className={`${activity.color} p-2 rounded-lg`}>
                    <activity.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {activity.description}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Performance
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Class Attendance</span>
                  <span className="text-sm font-bold text-green-600">{dashboardStats.attendanceToday}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${dashboardStats.attendanceToday}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Lessons Completed</span>
                  <span className="text-sm font-bold text-blue-600">{dashboardStats.completedLessons}/30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(dashboardStats.completedLessons / 30) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Assignments Graded</span>
                  <span className="text-sm font-bold text-purple-600">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: '88%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Today's Attendance</p>
              <p className="text-2xl font-bold">{dashboardStats.attendanceToday}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Assignments Due</p>
              <p className="text-2xl font-bold">{dashboardStats.assignmentsDue}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Upcoming Classes</p>
              <p className="text-2xl font-bold">{dashboardStats.upcomingClasses}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Teacher Rating</p>
              <p className="text-2xl font-bold flex items-center gap-1">
                4.8 <Star className="h-5 w-5 text-yellow-300 fill-current" />
              </p>
            </div>
            <Award className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
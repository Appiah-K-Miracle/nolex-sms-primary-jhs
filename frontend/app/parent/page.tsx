"use client";

import React from "react";
import Link from "next/link";
import { 
  Users, 
  BookOpen, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Bell,
  GraduationCap,
  Target,
  Activity,
  FileText,
  PieChart,
  BarChart3,
  ChevronRight,
  Plus,
  Filter,
  RefreshCw
} from "lucide-react";

export default function ParentDashboard() {
  // Sample data for children
  const children = [
    {
      id: 1,
      name: "Kwame Mensah",
      class: "JHS 2",
      photo: null,
      currentGrade: "B+",
      attendance: 95,
      behavior: "Excellent",
      nextExam: "Mathematics - Nov 15",
      recentGrades: [
        { subject: "Mathematics", grade: "A", percentage: 85 },
        { subject: "English", grade: "B+", percentage: 78 },
        { subject: "Science", grade: "A-", percentage: 82 }
      ]
    },
    {
      id: 2,
      name: "Ama Mensah",
      class: "Primary 5",
      photo: null,
      currentGrade: "A-",
      attendance: 98,
      behavior: "Very Good",
      nextExam: "English - Nov 12",
      recentGrades: [
        { subject: "Mathematics", grade: "A", percentage: 88 },
        { subject: "English", grade: "A-", percentage: 85 },
        { subject: "Science", grade: "B+", percentage: 80 }
      ]
    }
  ];

  // Quick stats
  const quickStats = [
    {
      title: "Children Enrolled",
      value: children.length.toString(),
      change: "+0",
      changeType: "neutral",
      icon: Users,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Average Attendance",
      value: `${Math.round(children.reduce((acc, child) => acc + child.attendance, 0) / children.length)}%`,
      change: "+2%",
      changeType: "positive",
      icon: Clock,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Outstanding Fees",
      value: "GH₵ 2,450",
      change: "-GH₵ 500",
      changeType: "positive",
      icon: DollarSign,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600"
    },
    {
      title: "Unread Messages",
      value: "7",
      change: "+3",
      changeType: "negative",
      icon: MessageSquare,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600"
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      type: "grade",
      title: "Mathematics Test Result",
      description: "Kwame scored 85% in Mathematics test",
      time: "2 hours ago",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      type: "attendance",
      title: "Attendance Alert",
      description: "Ama was present today",
      time: "5 hours ago",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      type: "fee",
      title: "Fee Payment Due",
      description: "Term fee payment due in 3 days",
      time: "1 day ago",
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      type: "message",
      title: "Teacher Message",
      description: "New message from Mrs. Osei",
      time: "2 days ago",
      icon: MessageSquare,
      color: "text-purple-600"
    }
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      title: "Parent-Teacher Meeting",
      date: "Nov 15, 2025",
      time: "10:00 AM",
      type: "meeting",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Mathematics Exam",
      date: "Nov 18, 2025",
      time: "8:00 AM",
      type: "exam",
      color: "bg-red-100 text-red-800"
    },
    {
      title: "Science Fair",
      date: "Nov 22, 2025",
      time: "2:00 PM",
      type: "event",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Term Break Begins",
      date: "Dec 15, 2025",
      time: "All Day",
      type: "holiday",
      color: "bg-purple-100 text-purple-800"
    }
  ];

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">
              Welcome back, Mrs. Mensah! 👋
            </h1>
            <p className="text-blue-100 text-sm lg:text-base xl:text-lg">
              Here's what's happening with your children's education today
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <Link
              href="/parent/children"
              className="bg-white text-blue-600 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base"
            >
              <Users className="w-4 h-4 lg:w-5 lg:h-5" />
              View Children
            </Link>
            <Link
              href="/parent/communication/messages"
              className="bg-blue-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base"
            >
              <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5" />
              Messages
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg lg:rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm lg:text-base text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs lg:text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                  {stat.changeType === 'positive' && <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4 text-green-600 ml-1" />}
                  {stat.changeType === 'negative' && <ArrowDownRight className="w-3 h-3 lg:w-4 lg:h-4 text-red-600 ml-1" />}
                </div>
              </div>
              <div className={`p-3 lg:p-4 ${stat.lightColor} rounded-lg`}>
                <stat.icon className={`w-6 h-6 lg:w-8 lg:h-8 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Children Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {children.map((child) => (
          <div key={child.id} className="bg-white rounded-lg lg:rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6 lg:p-8">
              {/* Child Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-lg lg:text-xl font-semibold text-white">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900">{child.name}</h3>
                    <p className="text-sm lg:text-base text-gray-600">{child.class}</p>
                  </div>
                </div>
                <Link
                  href={`/parent/children/${child.id}`}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
                </Link>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 lg:p-4 bg-blue-50 rounded-lg">
                  <p className="text-xl lg:text-2xl font-bold text-blue-600">{child.currentGrade}</p>
                  <p className="text-xs lg:text-sm text-gray-600">Current Grade</p>
                </div>
                <div className="text-center p-3 lg:p-4 bg-green-50 rounded-lg">
                  <p className="text-xl lg:text-2xl font-bold text-green-600">{child.attendance}%</p>
                  <p className="text-xs lg:text-sm text-gray-600">Attendance</p>
                </div>
                <div className="text-center p-3 lg:p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm lg:text-base font-semibold text-purple-600">{child.behavior}</p>
                  <p className="text-xs lg:text-sm text-gray-600">Behavior</p>
                </div>
              </div>

              {/* Recent Grades */}
              <div className="mb-6">
                <h4 className="text-sm lg:text-base font-semibold text-gray-900 mb-3">Recent Grades</h4>
                <div className="space-y-2">
                  {child.recentGrades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-2 lg:p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm lg:text-base text-gray-700">{grade.subject}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm lg:text-base font-semibold text-gray-900">{grade.grade}</span>
                        <span className="text-xs lg:text-sm text-gray-500">({grade.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Exam */}
              <div className="p-3 lg:p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
                  <span className="text-sm lg:text-base font-semibold text-orange-800">Next Exam</span>
                </div>
                <p className="text-sm lg:text-base text-orange-700">{child.nextExam}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activities and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm">
          <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Recent Activities</h2>
              <Link
                href="/parent/activities"
                className="text-sm lg:text-base text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 lg:p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <activity.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm lg:text-base font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm">
          <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Upcoming Events</h2>
              <Link
                href="/parent/events"
                className="text-sm lg:text-base text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View Calendar
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 lg:p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm lg:text-base font-medium text-gray-900 truncate">
                      {event.title}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1">
                      {event.date} • {event.time}
                    </p>
                  </div>
                  <span className={`text-xs lg:text-sm font-medium px-2 py-1 rounded-full ${event.color} whitespace-nowrap ml-3`}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "View Grades", href: "/parent/academics/grades", icon: BookOpen, color: "bg-blue-500" },
            { name: "Attendance", href: "/parent/attendance", icon: Clock, color: "bg-green-500" },
            { name: "Pay Fees", href: "/parent/finance/payments", icon: DollarSign, color: "bg-orange-500" },
            { name: "Messages", href: "/parent/communication/messages", icon: MessageSquare, color: "bg-purple-500" },
            { name: "Reports", href: "/parent/reports", icon: FileText, color: "bg-indigo-500" },
            { name: "Events", href: "/parent/events", icon: Calendar, color: "bg-pink-500" }
          ].map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="flex flex-col items-center p-4 lg:p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group"
            >
              <div className={`p-3 lg:p-4 ${action.color} rounded-lg mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-sm lg:text-base font-medium text-gray-900 text-center">
                {action.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
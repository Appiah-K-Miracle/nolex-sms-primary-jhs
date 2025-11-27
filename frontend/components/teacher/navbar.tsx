"use client";

import { useState } from "react";
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  Settings,
  MessageSquare,
  Calendar,
  Clock,
  ChevronDown,
  LogOut,
  UserCircle,
  Bookmark,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

interface TeacherNavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function TeacherNavbar({ sidebarOpen, setSidebarOpen }: TeacherNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Assignment Submitted",
      description: "Sarah Johnson submitted Math Assignment #5",
      time: "2 min ago",
      type: "assignment",
      unread: true
    },
    {
      id: 2,
      title: "Parent Message",
      description: "Mrs. Mensah sent you a message about her son",
      time: "15 min ago",
      type: "message",
      unread: true
    },
    {
      id: 3,
      title: "Class Schedule Update",
      description: "Tomorrow's Math class moved to Room 102",
      time: "1 hour ago",
      type: "schedule",
      unread: false
    }
  ];

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative z-30">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Date and Time */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4 text-orange-500" />
              <span className="font-medium">{currentDate}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="font-mono">{currentTime}</span>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students, classes, assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm transition-colors"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Quick Message Button */}
          <Link
            href="/teacher/communication/compose"
            className="hidden sm:flex items-center gap-2 px-3 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Message</span>
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6" />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {notifications.filter(n => n.unread).length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                        notification.unread
                          ? "border-orange-500 bg-orange-50/50"
                          : "border-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded-full ${
                          notification.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                          notification.type === 'message' ? 'bg-green-100 text-green-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {notification.type === 'assignment' && <Bookmark className="h-3 w-3" />}
                          {notification.type === 'message' && <MessageSquare className="h-3 w-3" />}
                          {notification.type === 'schedule' && <Calendar className="h-3 w-3" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {notification.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-200">
                  <Link
                    href="/teacher/notifications"
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-1.5 rounded-full">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">Mr. Emmanuel</p>
                <p className="text-xs text-gray-600">Mathematics</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-2 rounded-full">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Mr. Emmanuel Asante</p>
                      <p className="text-xs text-gray-600">Mathematics Teacher</p>
                      <p className="text-xs text-green-600 font-medium">● Online</p>
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/teacher/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <UserCircle className="h-4 w-4 text-gray-400" />
                    My Profile
                  </Link>
                  <Link
                    href="/teacher/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4 text-gray-400" />
                    Settings
                  </Link>
                  <Link
                    href="/teacher/help"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                    Help & Support
                  </Link>
                </div>

                <div className="border-t border-gray-200 py-1">
                  <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left">
                    <LogOut className="h-4 w-4 text-red-500" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside handlers */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </header>
  );
}
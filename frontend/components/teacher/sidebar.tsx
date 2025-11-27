"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  Users, 
  ClipboardCheck, 
  GraduationCap, 
  MessageSquare, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Home,
  UserCheck,
  PenTool,
  Bell,
  Clock,
  Award,
  Target,
  BookMarked,
  X
} from "lucide-react";

interface TeacherSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/teacher",
    icon: Home,
    description: "Overview and quick actions"
  },
  {
    name: "My Classes",
    href: "/teacher/classes",
    icon: BookOpen,
    description: "Manage your assigned classes",
    badge: "5"
  },
  {
    name: "Students",
    href: "/teacher/students",
    icon: Users,
    description: "View and manage student information"
  },
  {
    name: "Attendance",
    href: "/teacher/attendance",
    icon: UserCheck,
    description: "Track daily attendance"
  },
  {
    name: "Grades & Assessment",
    href: "/teacher/grades",
    icon: GraduationCap,
    description: "Grade assignments and assessments",
    badge: "12"
  },
  {
    name: "Assignments",
    href: "/teacher/assignments",
    icon: PenTool,
    description: "Create and manage assignments"
  },
  {
    name: "Lesson Plans",
    href: "/teacher/lessons",
    icon: BookMarked,
    description: "Plan and organize lessons"
  },
  {
    name: "Timetable",
    href: "/teacher/timetable",
    icon: Calendar,
    description: "View your teaching schedule"
  },
  {
    name: "Communication",
    href: "/teacher/communication",
    icon: MessageSquare,
    description: "Messages and announcements",
    badge: "3"
  },
  {
    name: "Reports",
    href: "/teacher/reports",
    icon: BarChart3,
    description: "Generate class and student reports"
  },
  {
    name: "Performance",
    href: "/teacher/performance",
    icon: Target,
    description: "Track teaching metrics"
  }
];

const quickActions = [
  {
    name: "Take Attendance",
    href: "/teacher/attendance/quick",
    icon: Clock,
    color: "bg-green-500"
  },
  {
    name: "Grade Papers",
    href: "/teacher/grades/pending",
    icon: Award,
    color: "bg-blue-500"
  },
  {
    name: "New Assignment",
    href: "/teacher/assignments/create",
    icon: PenTool,
    color: "bg-purple-500"
  }
];

export default function TeacherSidebar({ sidebarOpen, setSidebarOpen }: TeacherSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-orange-600 via-yellow-600 to-amber-600 shadow-xl">
          {/* Sidebar Header */}
          <div className="flex items-center h-20 flex-shrink-0 px-6 bg-gradient-to-r from-orange-700 to-yellow-700 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">Teacher Portal</h1>
                <p className="text-orange-100 text-sm">Nolex SMS</p>
              </div>
            </div>
          </div>

          {/* Teacher Profile Card */}
          <div className="px-6 py-4 bg-white/10 backdrop-blur-sm border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">
                  Mr. Emmanuel Asante
                </p>
                <p className="text-orange-200 text-xs truncate">
                  Mathematics Teacher
                </p>
              </div>
              <div className="bg-green-400 w-3 h-3 rounded-full border-2 border-white shadow-sm"></div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 backdrop-blur-sm text-white shadow-lg border border-white/30"
                      : "text-orange-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? "text-white" : "text-orange-200 group-hover:text-white"
                    }`}
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full border border-white/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="px-4 py-4 bg-white/5 backdrop-blur-sm border-t border-white/20">
            <h3 className="text-orange-200 text-xs font-semibold uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium text-orange-100 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <div className={`${action.color} p-1.5 rounded-lg mr-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <span>{action.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="flex-shrink-0 px-4 py-4 bg-gradient-to-r from-orange-700 to-yellow-700 border-t border-white/20">
            <div className="flex items-center justify-between">
              <Link
                href="/teacher/settings"
                className="group flex items-center gap-2 text-orange-100 hover:text-white transition-colors duration-200"
              >
                <Settings className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
              <button className="group flex items-center gap-2 text-orange-100 hover:text-white transition-colors duration-200">
                <LogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gradient-to-b from-orange-600 via-yellow-600 to-amber-600 shadow-xl">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-orange-700 to-yellow-700 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Teacher Portal</h1>
                <p className="text-orange-100 text-xs">Nolex SMS</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Mobile Teacher Profile */}
          <div className="px-6 py-4 bg-white/10 backdrop-blur-sm border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">
                  Mr. Emmanuel Asante
                </p>
                <p className="text-orange-200 text-xs truncate">
                  Mathematics Teacher
                </p>
              </div>
              <div className="bg-green-400 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm"></div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 backdrop-blur-sm text-white shadow-lg border border-white/30"
                      : "text-orange-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? "text-white" : "text-orange-200 group-hover:text-white"
                    }`}
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full border border-white/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Quick Actions */}
          <div className="px-4 py-4 bg-white/5 backdrop-blur-sm border-t border-white/20">
            <h3 className="text-orange-200 text-xs font-semibold uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  onClick={() => setSidebarOpen(false)}
                  className="group flex items-center px-3 py-2 text-sm font-medium text-orange-100 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <div className={`${action.color} p-1.5 rounded-lg mr-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <span>{action.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="flex-shrink-0 px-4 py-4 bg-gradient-to-r from-orange-700 to-yellow-700 border-t border-white/20">
            <div className="flex items-center justify-between">
              <Link
                href="/teacher/settings"
                onClick={() => setSidebarOpen(false)}
                className="group flex items-center gap-2 text-orange-100 hover:text-white transition-colors duration-200"
              >
                <Settings className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
              <button className="group flex items-center gap-2 text-orange-100 hover:text-white transition-colors duration-200">
                <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
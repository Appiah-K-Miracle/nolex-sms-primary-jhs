"use client"
import InfoCard from "@/components/headmaster/info-card";
import { 
  Users, 
  User, 
  Book, 
  UserPlus, 
  TrendingUp, 
  Calendar, 
  Bell,
  ChevronRight,
  BarChart3,
  PieChart,
  Target,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";
import Link from "next/link";

export default function HeadmasterPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, Headmaster!</h1>
              <p className="text-green-100 text-lg">Here's what's happening at your school today</p>
              <div className="flex items-center gap-4 mt-3 text-green-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{currentDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{currentTime}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">98.5%</div>
                <div className="text-sm text-green-100">Overall Performance</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-green-500/20 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-green-400/20 rounded-full translate-y-16"></div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-green-500 relative overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">1,250</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+12% from last month</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500 relative overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Teachers</p>
                <p className="text-3xl font-bold text-gray-900">75</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600 font-medium">+3 new hires</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400"></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-yellow-500 relative overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Classes</p>
                <p className="text-3xl font-bold text-gray-900">30</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-yellow-600 font-medium">All running smoothly</span>
                </div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Book className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-400"></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-red-500 relative overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Actions</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <div className="flex items-center mt-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600 font-medium">Requires attention</span>
                </div>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <UserPlus className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400"></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Activities - Enhanced */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-6 h-6 text-green-600" />
                Recent Activities
              </h2>
              <Link href="/headmaster/activities" className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                <div className="bg-green-500 p-2 rounded-full shadow-md">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">New student enrollment: John Doe</p>
                  <p className="text-sm text-gray-600">Grade 3 • Class Teacher: Ms. Emily Williams</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">New</div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                <div className="bg-blue-500 p-2 rounded-full shadow-md">
                  <Book className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Timetable updated for Grade 5</p>
                  <p className="text-sm text-gray-600">Mathematics period moved to 10:00 AM</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Updated</div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors">
                <div className="bg-yellow-500 p-2 rounded-full shadow-md">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Parent-teacher meeting scheduled</p>
                  <p className="text-sm text-gray-600">November 15, 2025 • 2:00 PM - 5:00 PM</p>
                  <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                </div>
                <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Event</div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                <div className="bg-purple-500 p-2 rounded-full shadow-md">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Exam results published</p>
                  <p className="text-sm text-gray-600">Grade 6 Mathematics • Average: 85%</p>
                  <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                </div>
                <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">Results</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Enhanced */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-6 h-6 text-green-600" />
              Quick Actions
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <Bell className="w-5 h-5" />
              Create Announcement
            </button>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <BarChart3 className="w-5 h-5" />
              Generate Report
            </button>
            <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <Calendar className="w-5 h-5" />
              Manage Events
            </button>
            <Link href="/headmaster/students/admissions" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <UserPlus className="w-5 h-5" />
              Review Applications
            </Link>
          </div>
        </div>
      </div>

      {/* School Performance - Enhanced */}
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              School Performance Analytics
            </h2>
            <Link href="/headmaster/reports" className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
              Detailed Reports <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                <PieChart className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Student Attendance</h3>
                <div className="text-3xl font-bold mb-1">94.2%</div>
                <div className="text-green-100 text-sm">↑ 2.1% from last month</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <BarChart3 className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Average Grades</h3>
                <div className="text-3xl font-bold mb-1">87.5%</div>
                <div className="text-blue-100 text-sm">↑ 3.2% improvement</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                <Users className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Teacher Efficiency</h3>
                <div className="text-3xl font-bold mb-1">96.8%</div>
                <div className="text-purple-100 text-sm">Excellent performance</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                <Target className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Goal Achievement</h3>
                <div className="text-3xl font-bold mb-1">92.0%</div>
                <div className="text-orange-100 text-sm">On track for targets</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-green-600" />
              Upcoming Events
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Parent-Teacher Conference</p>
                  <p className="text-sm text-gray-600">November 15, 2025 • 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Science Fair</p>
                  <p className="text-sm text-gray-600">November 22, 2025 • 9:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Staff Meeting</p>
                  <p className="text-sm text-gray-600">November 25, 2025 • 3:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Bell className="w-6 h-6 text-green-600" />
              Priority Notifications
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg bg-red-50 border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-red-900">Budget Review Required</p>
                  <p className="text-sm text-red-700">Q4 budget needs approval by Nov 10</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <Clock className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-yellow-900">Teacher Evaluation Due</p>
                  <p className="text-sm text-yellow-700">5 evaluations pending completion</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-green-900">Inspection Passed</p>
                  <p className="text-sm text-green-700">Annual safety inspection completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

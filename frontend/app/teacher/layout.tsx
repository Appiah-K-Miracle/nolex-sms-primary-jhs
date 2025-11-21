"use client";

import { useState } from "react";
import TeacherSidebar from "@/components/teacher/sidebar";
import { Menu, Search, Bell } from "lucide-react";
import { useAuth } from "../../context/auth";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useAuth();
  let teacherName = "Mr. K. Ofori";
  let teacherSub = "Mathematics • JHS 2";
  let initials = "KO";

  if (auth?.user) {
    teacherName = auth.user.name || teacherName;
    teacherSub = auth.user.subject && auth.user.className ? `${auth.user.subject} • ${auth.user.className}` : (auth.user.email || teacherSub);
    initials = (auth.user.name || "")
      .split(" ")
      .map((p: any) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 lg:shadow-md">
          <div className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-6">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Teacher Dashboard</h1>
                <p className="text-sm text-gray-500 hidden lg:block">Classroom overview & analytics</p>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" placeholder="Search classes, students, notes..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <button className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"><Search className="w-5 h-5" /></button>
              <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"><Bell className="w-5 h-5 lg:w-6 lg:h-6" /><span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span></button>
              <div className="flex items-center space-x-3">
                  <div className="hidden lg:block text-right">
                    <p className="text-sm font-medium text-gray-900">{teacherName}</p>
                    <p className="text-xs text-gray-500">{teacherSub}</p>
                  </div>
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">{initials}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}

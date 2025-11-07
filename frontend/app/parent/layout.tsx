"use client";

import { useState } from "react";
import ParentSidebar from "@/components/parent/sidebar";
import { Menu, Bell, Search, User } from "lucide-react";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <ParentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:shadow-md">
          <div className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-6">
            {/* Left section */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Page title - Hidden on mobile, shown on larger screens */}
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
                  Parent Dashboard
                </h1>
                <p className="text-sm text-gray-500 hidden lg:block">
                  Monitor your children's academic progress
                </p>
              </div>
            </div>

            {/* Center section - Search (hidden on mobile) */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Search students, grades, messages..."
                />
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search button for mobile */}
              <button className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              
              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              
              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="hidden lg:block text-right">
                  <p className="text-sm font-medium text-gray-900">Mrs. Akosua Mensah</p>
                  <p className="text-xs text-gray-500">Parent Account</p>
                </div>
                <button className="flex items-center p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-sm lg:text-base font-semibold text-white">MK</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
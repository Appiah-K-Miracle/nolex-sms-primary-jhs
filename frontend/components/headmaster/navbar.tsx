
"use client";

import { Search, Bell, User, ChevronDown, Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search - hidden on small screens */}
          <div className="relative hidden sm:block">
            <Search className="absolute w-4 h-4 md:w-5 md:h-5 text-gray-400 top-2.5 left-3" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 md:pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 w-40 md:w-auto"
            />
          </div>
          
          {/* Search icon for mobile */}
          <button className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
          
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-500 hover:text-green-600 transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 rounded-full bg-green-200 text-green-700 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden md:block">
              <p className="font-semibold text-sm">Headmaster</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}

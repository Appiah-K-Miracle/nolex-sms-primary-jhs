
"use client";

import { Search, Bell, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute w-5 h-5 text-gray-400 top-2.5 left-3" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <Bell className="w-6 h-6 text-gray-500 cursor-pointer hover:text-green-600" />
        <div className="flex items-center space-x-2 cursor-pointer">
          <User className="w-8 h-8 rounded-full bg-green-200 text-green-700 p-1" />
          <div className="hidden md:block">
            <p className="font-semibold">Headmaster</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </header>
  );
}

"use client"
import InfoCard from "@/components/headmaster/info-card";
import { Users, User, Book, UserPlus } from "lucide-react";

export default function HeadmasterPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Headmaster!</h1>
        <p className="text-gray-500">Here is a summary of your school's activities.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard 
          title="Total Students" 
          value="1,250" 
          icon={Users} 
          color="#22c55e" // green-500
        />
        <InfoCard 
          title="Total Teachers" 
          value="75" 
          icon={User} 
          color="#3b82f6" // blue-500
        />
        <InfoCard 
          title="Total Classes" 
          value="30" 
          icon={Book} 
          color="#eab308" // yellow-500
        />
        <InfoCard 
          title="Pending Enrollments" 
          value="12" 
          icon={UserPlus} 
          color="#ef4444" // red-500
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">New student enrollment: John Doe</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">New timetable created for Grade 5</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full mr-4">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="font-semibold">Parent-teacher meeting scheduled</p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">Create Announcement</button>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">Generate Report</button>
            <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">Manage Events</button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">School Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700">Student Attendance</h3>
            <div className="mt-2 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Line Chart Placeholder]</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Exam Results</h3>
            <div className="mt-2 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Bar Chart Placeholder]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useMemo } from "react";
import {
  Users,
  Clock,
  BookOpen,
  FileText,
  Bell,
  Plus,
  CheckCircle,
  Calendar,
  PieChart,
  BarChart3,
  LineChart,
  MessageSquare
} from "lucide-react";

function SummaryCard({ title, value, children }: { title: string; value: string; children?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-blue-600">{children}</div>
      </div>
    </div>
  );
}

const sampleClasses = [
  { id: 1, time: "08:00 - 09:00", subject: "Mathematics", room: "Rm 12" },
  { id: 2, time: "09:10 - 10:10", subject: "Science", room: "Lab 1" },
  { id: 3, time: "11:00 - 12:00", subject: "English", room: "Rm 14" }
];

export default function TeacherDashboard() {
  const attendance = useMemo(() => ({ present: 22, absent: 3, late: 1 }), []);
  const pendingAssignments = 5;
  const upcomingExams = 2;

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-sm text-indigo-100 mt-1">Overview of your classes, attendance and tasks</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2"> <Plus className="w-4 h-4"/> New Note</button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <SummaryCard title="Today's Classes" value={`${sampleClasses.length}`}>
          <Clock className="w-6 h-6" />
        </SummaryCard>
        <SummaryCard title="Attendance (P/A/L)" value={`${attendance.present}/${attendance.absent}/${attendance.late}`}>
          <Users className="w-6 h-6" />
        </SummaryCard>
        <SummaryCard title="Pending Assignments" value={`${pendingAssignments}`}>
          <FileText className="w-6 h-6" />
        </SummaryCard>
        <SummaryCard title="Upcoming Exams" value={`${upcomingExams}`}>
          <Calendar className="w-6 h-6" />
        </SummaryCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Classes */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
              <button className="text-sm text-blue-600 hover:underline flex items-center gap-2"><MessageSquare className="w-4 h-4"/>Notify Class</button>
            </div>
            <div className="space-y-3">
              {sampleClasses.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{c.subject}</p>
                    <p className="text-sm text-gray-500">{c.time} • {c.room}</p>
                  </div>
                  <div className="text-sm text-gray-600">Mark as: <button className="ml-2 px-2 py-1 bg-green-50 text-green-700 rounded">Taken</button></div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Summary */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Summary</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-2xl font-bold text-green-700 mt-2">{attendance.present}</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600">Absent</p>
                <p className="text-2xl font-bold text-red-700 mt-2">{attendance.absent}</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Late</p>
                <p className="text-2xl font-bold text-yellow-700 mt-2">{attendance.late}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { name: 'Take Attendance', icon: CheckCircle },
                { name: 'Upload Assignment', icon: FileText },
                { name: 'Enter Exam Scores', icon: BarChart3 },
                { name: 'Add Behaviour Note', icon: Users },
                { name: 'Write Lesson Note', icon: BookOpen }
              ].map((a) => (
                <button key={a.name} className="flex items-center gap-2 p-3 rounded-lg border border-gray-100 hover:shadow-sm">
                  <a.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{a.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - messages, lesson notes status, charts */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Messages / Notifications</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">Assignment Submission Reminder</p>
                  <p className="text-xs">2 students have not submitted the assignment.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-yellow-600 mt-1" />
                <div>
                  <p className="font-medium">Exam Timetable Updated</p>
                  <p className="text-xs">Math exam moved to Nov 25.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Lesson Notes Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Pending Approval</p>
                <p className="text-sm text-gray-500">3</p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
          </div>

          {/* Charts - simple placeholders */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Attendance Trend (7 days)</h3>
            <div className="w-full h-40 bg-gradient-to-b from-white to-gray-50 rounded-lg flex items-end px-2">
              {/* Simple bars representing a trend */}
              {[50, 60, 55, 70, 65, 80, 75].map((v, i) => (
                <div key={i} className="mx-1 bg-blue-600 rounded-t" style={{ width: '12%', height: `${v}%` }} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Assignment Submission Rate</h3>
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">85%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  User,
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Download,
  Print,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  BarChart,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  AlertCircle,
  Info,
  BookOpen,
  Users,
  Timer,
  Activity
} from "lucide-react";

export default function AttendanceDetailPage() {
  const params = useParams();
  const attendanceId = params.id as string;
  
  const [selectedView, setSelectedView] = useState<'details' | 'history' | 'patterns'>('details');

  // Sample attendance record data
  const attendanceRecord = {
    id: parseInt(attendanceId),
    date: "2025-11-15",
    child: {
      name: "Kwame Mensah",
      class: "JHS 2A",
      studentId: "STU001",
      photo: "/students/kwame.jpg"
    },
    overallStatus: "present",
    totalPeriods: 8,
    presentPeriods: 6,
    absentPeriods: 1,
    latePeriods: 1,
    periods: [
      {
        id: 1,
        subject: "Mathematics",
        teacher: "Mr. Asante",
        time: "08:00 - 08:40",
        status: "present",
        arrivalTime: "07:58",
        classroom: "Math Lab 1",
        notes: ""
      },
      {
        id: 2,
        subject: "English Language",
        teacher: "Mrs. Boateng",
        time: "08:40 - 09:20",
        status: "present",
        arrivalTime: "08:40",
        classroom: "Room 2A",
        notes: ""
      },
      {
        id: 3,
        subject: "Science",
        teacher: "Dr. Mensah",
        time: "09:20 - 10:00",
        status: "late",
        arrivalTime: "09:35",
        classroom: "Science Lab",
        notes: "Arrived 15 minutes late due to transport delay"
      },
      {
        id: 4,
        subject: "Social Studies",
        teacher: "Ms. Nkrumah",
        time: "10:20 - 11:00",
        status: "present",
        arrivalTime: "10:20",
        classroom: "Room 2B",
        notes: ""
      },
      {
        id: 5,
        subject: "French",
        teacher: "Mme. Adjei",
        time: "11:00 - 11:40",
        status: "absent",
        arrivalTime: "",
        classroom: "Language Lab",
        notes: "Sick bay visit - reported headache"
      },
      {
        id: 6,
        subject: "Physical Education",
        teacher: "Coach Amankwah",
        time: "11:40 - 12:20",
        status: "present",
        arrivalTime: "11:40",
        classroom: "Sports Ground",
        notes: "Participated actively"
      },
      {
        id: 7,
        subject: "ICT",
        teacher: "Mr. Owusu",
        time: "13:20 - 14:00",
        status: "present",
        arrivalTime: "13:18",
        classroom: "Computer Lab",
        notes: ""
      },
      {
        id: 8,
        subject: "Creative Arts",
        teacher: "Ms. Osei",
        time: "14:00 - 14:40",
        status: "present",
        arrivalTime: "14:00",
        classroom: "Art Studio",
        notes: ""
      }
    ],
    summary: {
      attendanceRate: 87.5,
      punctualityRate: 85.7,
      behaviorRating: "Good",
      teacherComments: [
        {
          teacher: "Mr. Asante",
          subject: "Mathematics",
          comment: "Punctual and engaged in class activities"
        },
        {
          teacher: "Dr. Mensah", 
          subject: "Science",
          comment: "Late arrival but caught up quickly with the lesson"
        },
        {
          teacher: "Coach Amankwah",
          subject: "Physical Education", 
          comment: "Great participation and team spirit"
        }
      ],
      healthNotes: "Visited sick bay during French class due to headache. Nurse recommended rest and hydration.",
      parentNotifications: [
        {
          type: "absence",
          time: "11:15",
          message: "Kwame was absent from French class due to feeling unwell"
        },
        {
          type: "late",
          time: "09:35",
          message: "Kwame arrived 15 minutes late to Science class"
        }
      ]
    },
    weeklyContext: {
      totalDaysThisWeek: 5,
      presentDays: 5,
      lateDays: 2,
      absentDays: 0,
      weeklyAttendanceRate: 100,
      weeklyPunctualityRate: 60
    },
    monthlyTrend: {
      thisMonth: 94.2,
      lastMonth: 96.8,
      trend: "declining",
      improvement: -2.6
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200';
      case 'absent': return 'bg-red-100 text-red-800 border-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'excused': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      case 'late': return <Clock className="w-4 h-4" />;
      case 'excused': return <Info className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const formatTime = (time: string) => {
    if (!time) return "N/A";
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/parent/academics/attendance"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Attendance Details</h1>
          <p className="text-gray-600">
            {new Date(attendanceRecord.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Student Info Card */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{attendanceRecord.child.name}</h2>
              <p className="text-gray-600">{attendanceRecord.child.class} • ID: {attendanceRecord.child.studentId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/parent/academics/attendance/${attendanceId}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Request Edit
            </Link>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Daily Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{attendanceRecord.presentPeriods}</div>
            <div className="text-sm text-green-700">Present</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{attendanceRecord.absentPeriods}</div>
            <div className="text-sm text-red-700">Absent</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{attendanceRecord.latePeriods}</div>
            <div className="text-sm text-yellow-700">Late</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{attendanceRecord.summary.attendanceRate}%</div>
            <div className="text-sm text-blue-700">Daily Rate</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'details', name: 'Period Details', icon: Clock },
              { id: 'history', name: 'Weekly Context', icon: Calendar },
              { id: 'patterns', name: 'Trends & Analysis', icon: BarChart }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedView(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedView === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {selectedView === 'details' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Period-by-Period Breakdown</h3>
              
              <div className="space-y-4">
                {attendanceRecord.periods.map((period) => (
                  <div key={period.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{period.subject}</h4>
                          <p className="text-sm text-gray-600">
                            {period.teacher} • {period.time}
                          </p>
                          <p className="text-xs text-gray-500">{period.classroom}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(period.status)}`}>
                          {getStatusIcon(period.status)}
                          <span className="capitalize">{period.status}</span>
                        </span>
                        {period.arrivalTime && (
                          <p className="text-sm text-gray-600 mt-1">
                            Arrived: {formatTime(period.arrivalTime)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {period.notes && (
                      <div className="bg-gray-50 rounded-lg p-3 mt-3">
                        <div className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700">{period.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Teacher Comments */}
              {attendanceRecord.summary.teacherComments.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-4">Teacher Comments</h4>
                  <div className="space-y-3">
                    {attendanceRecord.summary.teacherComments.map((comment, index) => (
                      <div key={index} className="bg-white rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-900">{comment.teacher}</span>
                          <span className="text-sm text-blue-700">({comment.subject})</span>
                        </div>
                        <p className="text-blue-800 text-sm">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Health Notes */}
              {attendanceRecord.summary.healthNotes && (
                <div className="bg-red-50 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900 mb-2">Health Notes</h4>
                      <p className="text-red-800 text-sm">{attendanceRecord.summary.healthNotes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedView === 'history' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Context</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{attendanceRecord.weeklyContext.presentDays}</div>
                  <div className="text-sm text-blue-700">Days Present</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{attendanceRecord.weeklyContext.lateDays}</div>
                  <div className="text-sm text-yellow-700">Days Late</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{attendanceRecord.weeklyContext.absentDays}</div>
                  <div className="text-sm text-red-700">Days Absent</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{attendanceRecord.weeklyContext.weeklyAttendanceRate}%</div>
                  <div className="text-sm text-green-700">Weekly Rate</div>
                </div>
              </div>

              {/* Parent Notifications */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Parent Notifications Sent</h4>
                <div className="space-y-3">
                  {attendanceRecord.summary.parentNotifications.map((notification, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            notification.type === 'absence' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {notification.type}
                          </span>
                          <span className="text-sm text-gray-600">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{notification.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'patterns' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Trends & Analysis</h3>
              
              {/* Monthly Comparison */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Monthly Comparison</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{attendanceRecord.monthlyTrend.thisMonth}%</div>
                    <div className="text-sm text-gray-600">This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{attendanceRecord.monthlyTrend.lastMonth}%</div>
                    <div className="text-sm text-gray-600">Last Month</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                      attendanceRecord.monthlyTrend.improvement >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {attendanceRecord.monthlyTrend.improvement >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                      {Math.abs(attendanceRecord.monthlyTrend.improvement)}%
                    </div>
                    <div className="text-sm text-gray-600">Change</div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-4">Recommendations</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Punctuality Focus</p>
                      <p className="text-green-800 text-sm">
                        Consider leaving home 10-15 minutes earlier to improve punctuality rate
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Health Monitoring</p>
                      <p className="text-green-800 text-sm">
                        Monitor morning wellness routine to prevent health-related absences
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Positive Recognition</p>
                      <p className="text-green-800 text-sm">
                        Kwame shows excellent engagement when present - continue encouraging participation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Teachers */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Need to Discuss?</h4>
                <p className="text-gray-600 mb-4">
                  Contact your child's teachers to discuss attendance patterns or concerns.
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Message Teachers
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Request Call
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
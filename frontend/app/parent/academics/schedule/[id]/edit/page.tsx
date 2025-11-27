"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Save,
  Bell,
  Calendar,
  Clock,
  Settings,
  User,
  MessageSquare,
  Phone,
  Mail,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Plus,
  Minus,
  Edit3,
  Target,
  BookOpen,
  Activity,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  Eye,
  EyeOff,
  Filter,
  Zap,
  Shield,
  Globe
} from "lucide-react";

export default function EditSchedulePage() {
  const params = useParams();
  const router = useRouter();
  const scheduleId = params.id as string;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state for notification preferences
  const [notifications, setNotifications] = useState({
    classReminders: true,
    homeworkDue: true,
    testAlerts: true,
    scheduleChanges: true,
    teacherMessages: true,
    earlyDismissal: true,
    lateArrival: false,
    clubActivities: true,
    parentMeetings: true,
    gradingUpdates: false
  });

  // Form state for reminder timing
  const [reminderTiming, setReminderTiming] = useState({
    classStart: 15, // minutes before
    homeworkDue: 1440, // minutes before (24 hours)
    testDate: 2880, // minutes before (48 hours)
    assignmentDue: 1440,
    meetingTime: 60
  });

  // Form state for communication preferences
  const [communicationPrefs, setCommunicationPrefs] = useState({
    primaryMethod: "app", // app, email, sms, call
    emergencyMethod: "call",
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "06:00"
    },
    weekendNotifications: false,
    languagePreference: "english",
    timeFormat: "12hour" // 12hour, 24hour
  });

  // Form state for calendar sync
  const [calendarSync, setCalendarSync] = useState({
    enabled: false,
    provider: "google", // google, outlook, apple
    syncClasses: true,
    syncHomework: true,
    syncTests: true,
    syncMeetings: true,
    syncEvents: false
  });

  // Form state for display preferences
  const [displayPrefs, setDisplayPrefs] = useState({
    defaultView: "week", // week, day, month
    showTeacherPhotos: true,
    showRoomNumbers: true,
    showMaterials: true,
    showHomeworkIndicators: true,
    compactMode: false,
    colorCoding: true,
    weekStartsOn: "monday" // monday, sunday
  });

  // Form state for priority subjects
  const [prioritySubjects, setPrioritySubjects] = useState([
    { subject: "Mathematics", priority: "high", notifications: true },
    { subject: "English Language", priority: "high", notifications: true },
    { subject: "Integrated Science", priority: "medium", notifications: true },
    { subject: "Social Studies", priority: "medium", notifications: false },
    { subject: "ICT", priority: "low", notifications: false }
  ]);

  // Sample student data
  const student = {
    name: "Kwame Mensah",
    class: "JHS 2A",
    studentId: "STU001"
  };

  const communicationMethods = [
    { value: "app", label: "Mobile App", icon: Smartphone },
    { value: "email", label: "Email", icon: Mail },
    { value: "sms", label: "SMS/Text", icon: MessageSquare },
    { value: "call", label: "Phone Call", icon: Phone }
  ];

  const calendarProviders = [
    { value: "google", label: "Google Calendar", icon: Globe },
    { value: "outlook", label: "Microsoft Outlook", icon: Monitor },
    { value: "apple", label: "Apple Calendar", icon: Smartphone }
  ];

  const priorityLevels = [
    { value: "high", label: "High Priority", color: "text-red-700 bg-red-100 border-red-200" },
    { value: "medium", label: "Medium Priority", color: "text-orange-700 bg-orange-100 border-orange-200" },
    { value: "low", label: "Low Priority", color: "text-green-700 bg-green-100 border-green-200" }
  ];

  const updateNotification = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const updateReminderTiming = (key: string, value: number) => {
    setReminderTiming(prev => ({ ...prev, [key]: value }));
  };

  const updatePrioritySubject = (index: number, field: string, value: any) => {
    setPrioritySubjects(prev => prev.map((subject, i) => 
      i === index ? { ...subject, [field]: value } : subject
    ));
  };

  const formatReminderTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours`;
    return `${Math.floor(minutes / 1440)} days`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would submit to an API
    console.log("Schedule preferences updated:", {
      notifications,
      reminderTiming,
      communicationPrefs,
      calendarSync,
      displayPrefs,
      prioritySubjects
    });
    
    setIsSubmitting(false);
    router.push(`/parent/academics/schedule/${scheduleId}?message=preferences-updated`);
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/parent/academics/schedule/${scheduleId}`}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Schedule Preferences</h1>
          <p className="text-gray-600">
            Customize notifications, reminders, and display settings for {student.name}'s schedule
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Notification Settings */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
              <p className="text-gray-600">Choose what notifications you want to receive</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {key === 'classReminders' && 'Get notified before classes start'}
                    {key === 'homeworkDue' && 'Reminders for upcoming homework deadlines'}
                    {key === 'testAlerts' && 'Notifications about upcoming tests and exams'}
                    {key === 'scheduleChanges' && 'Alerts for any schedule modifications'}
                    {key === 'teacherMessages' && 'Direct messages from teachers'}
                    {key === 'earlyDismissal' && 'Notifications about early dismissal'}
                    {key === 'lateArrival' && 'Alerts about late arrival to school'}
                    {key === 'clubActivities' && 'Updates about extracurricular activities'}
                    {key === 'parentMeetings' && 'Reminders for parent-teacher meetings'}
                    {key === 'gradingUpdates' && 'Notifications when grades are updated'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => updateNotification(key, !enabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    enabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Reminder Timing */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Reminder Timing</h2>
              <p className="text-gray-600">Set how far in advance you want to be reminded</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(reminderTiming).map(([key, minutes]) => (
              <div key={key} className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <select
                  value={minutes}
                  onChange={(e) => updateReminderTiming(key, parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={5}>5 minutes before</option>
                  <option value={15}>15 minutes before</option>
                  <option value={30}>30 minutes before</option>
                  <option value={60}>1 hour before</option>
                  <option value={180}>3 hours before</option>
                  <option value={720}>12 hours before</option>
                  <option value={1440}>1 day before</option>
                  <option value={2880}>2 days before</option>
                  <option value={4320}>3 days before</option>
                  <option value={10080}>1 week before</option>
                </select>
                <p className="text-xs text-gray-500">
                  Currently set to: {formatReminderTime(minutes)} before
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Communication Preferences</h2>
              <p className="text-gray-600">How would you like to receive notifications</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Primary Communication Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Primary Communication Method</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {communicationMethods.map((method) => (
                  <label key={method.value} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="primaryMethod"
                      value={method.value}
                      checked={communicationPrefs.primaryMethod === method.value}
                      onChange={(e) => setCommunicationPrefs(prev => ({ ...prev, primaryMethod: e.target.value }))}
                      className="text-blue-600 mr-3"
                    />
                    <method.icon className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Emergency Communication Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Emergency Communication Method</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {communicationMethods.map((method) => (
                  <label key={method.value} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="emergencyMethod"
                      value={method.value}
                      checked={communicationPrefs.emergencyMethod === method.value}
                      onChange={(e) => setCommunicationPrefs(prev => ({ ...prev, emergencyMethod: e.target.value }))}
                      className="text-red-600 mr-3"
                    />
                    <method.icon className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quiet Hours */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">Quiet Hours</h3>
                  <p className="text-sm text-gray-600">No notifications during these hours</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCommunicationPrefs(prev => ({ 
                    ...prev, 
                    quietHours: { ...prev.quietHours, enabled: !prev.quietHours.enabled }
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    communicationPrefs.quietHours.enabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      communicationPrefs.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {communicationPrefs.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={communicationPrefs.quietHours.start}
                      onChange={(e) => setCommunicationPrefs(prev => ({
                        ...prev,
                        quietHours: { ...prev.quietHours, start: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <input
                      type="time"
                      value={communicationPrefs.quietHours.end}
                      onChange={(e) => setCommunicationPrefs(prev => ({
                        ...prev,
                        quietHours: { ...prev.quietHours, end: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Other Communication Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Weekend Notifications</div>
                  <div className="text-sm text-gray-600">Receive notifications on weekends</div>
                </div>
                <button
                  type="button"
                  onClick={() => setCommunicationPrefs(prev => ({ ...prev, weekendNotifications: !prev.weekendNotifications }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    communicationPrefs.weekendNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      communicationPrefs.weekendNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                <select
                  value={communicationPrefs.timeFormat}
                  onChange={(e) => setCommunicationPrefs(prev => ({ ...prev, timeFormat: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="12hour">12-hour (AM/PM)</option>
                  <option value="24hour">24-hour</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Sync */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-orange-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Calendar Synchronization</h2>
              <p className="text-gray-600">Sync schedule with your personal calendar</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Enable Calendar Sync */}
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Enable Calendar Sync</div>
                <div className="text-sm text-gray-600">Automatically add schedule events to your calendar</div>
              </div>
              <button
                type="button"
                onClick={() => setCalendarSync(prev => ({ ...prev, enabled: !prev.enabled }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  calendarSync.enabled ? 'bg-orange-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    calendarSync.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {calendarSync.enabled && (
              <>
                {/* Calendar Provider */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Calendar Provider</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {calendarProviders.map((provider) => (
                      <label key={provider.value} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="calendarProvider"
                          value={provider.value}
                          checked={calendarSync.provider === provider.value}
                          onChange={(e) => setCalendarSync(prev => ({ ...prev, provider: e.target.value }))}
                          className="text-orange-600 mr-3"
                        />
                        <provider.icon className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{provider.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sync Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">What to Sync</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries({
                      syncClasses: "Class Schedule",
                      syncHomework: "Homework Deadlines",
                      syncTests: "Tests & Exams",
                      syncMeetings: "Parent Meetings",
                      syncEvents: "School Events"
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <input
                          type="checkbox"
                          checked={calendarSync[key as keyof typeof calendarSync] as boolean}
                          onChange={(e) => setCalendarSync(prev => ({ ...prev, [key]: e.target.checked }))}
                          className="text-orange-600 mr-3"
                        />
                        <span className="text-sm font-medium text-gray-900">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Display Preferences */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-indigo-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Display Preferences</h2>
              <p className="text-gray-600">Customize how the schedule appears</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Default View */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Default View</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { value: "day", label: "Day View" },
                  { value: "week", label: "Week View" },
                  { value: "month", label: "Month View" }
                ].map((view) => (
                  <label key={view.value} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="defaultView"
                      value={view.value}
                      checked={displayPrefs.defaultView === view.value}
                      onChange={(e) => setDisplayPrefs(prev => ({ ...prev, defaultView: e.target.value }))}
                      className="text-indigo-600 mr-3"
                    />
                    <span className="text-sm font-medium text-gray-900">{view.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Display Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries({
                showTeacherPhotos: "Show Teacher Photos",
                showRoomNumbers: "Show Room Numbers",
                showMaterials: "Show Required Materials",
                showHomeworkIndicators: "Show Homework Indicators",
                compactMode: "Compact Mode",
                colorCoding: "Color Coding by Subject Type"
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{label}</span>
                  <button
                    type="button"
                    onClick={() => setDisplayPrefs(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      displayPrefs[key as keyof typeof displayPrefs] ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        displayPrefs[key as keyof typeof displayPrefs] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Week Start Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Week Starts On</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: "monday", label: "Monday" },
                  { value: "sunday", label: "Sunday" }
                ].map((day) => (
                  <label key={day.value} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="weekStartsOn"
                      value={day.value}
                      checked={displayPrefs.weekStartsOn === day.value}
                      onChange={(e) => setDisplayPrefs(prev => ({ ...prev, weekStartsOn: e.target.value }))}
                      className="text-indigo-600 mr-3"
                    />
                    <span className="text-sm font-medium text-gray-900">{day.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Priority Subjects */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-yellow-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Priority Subjects</h2>
              <p className="text-gray-600">Set priority levels for different subjects</p>
            </div>
          </div>

          <div className="space-y-4">
            {prioritySubjects.map((subject, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <div className="font-medium text-gray-900">{subject.subject}</div>
                  </div>
                  
                  <div>
                    <select
                      value={subject.priority}
                      onChange={(e) => updatePrioritySubject(index, 'priority', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {priorityLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => updatePrioritySubject(index, 'notifications', !subject.notifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        subject.notifications ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          subject.notifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      priorityLevels.find(p => p.value === subject.priority)?.color
                    }`}>
                      {priorityLevels.find(p => p.value === subject.priority)?.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              <span>Your preferences will be saved and applied immediately</span>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/parent/academics/schedule/${scheduleId}`}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Bell, 
  Mail, 
  MessageSquare, 
  Settings, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
  Eye,
  Edit,
  Trash2,
  Plus,
  Clock,
  Users,
  Phone,
  Globe,
  Server,
  Key,
  TestTube,
  Send,
  Zap,
  Volume2,
  VolumeX,
  Calendar,
  BookOpen,
  DollarSign,
  UserCheck,
  AlertCircle
} from "lucide-react";

export default function NotificationsPage() {
  const [saving, setSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const [testingEmail, setTestingEmail] = useState(false);
  const [testingSMS, setTestingSMS] = useState(false);

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@nolexprimaryschool.edu.gh",
    smtpPassword: "",
    fromName: "Nolex Primary & JHS",
    fromEmail: "noreply@nolexprimaryschool.edu.gh",
    replyToEmail: "info@nolexprimaryschool.edu.gh",
    enableSSL: true,
    enableTLS: true,
    enableEmailNotifications: true
  });

  const [smsSettings, setSmsSettings] = useState({
    provider: "twilio",
    apiKey: "",
    apiSecret: "",
    senderName: "NOLEX_SMS",
    enableSMSNotifications: true,
    enableInternational: false,
    creditsRemaining: 2500
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    // Academic Notifications
    newStudentAdmission: { email: true, sms: false, system: true },
    examResults: { email: true, sms: true, system: true },
    attendanceAlerts: { email: true, sms: true, system: true },
    feeReminders: { email: true, sms: true, system: true },
    
    // Administrative Notifications  
    staffAttendance: { email: true, sms: false, system: true },
    systemMaintenance: { email: true, sms: false, system: true },
    backupStatus: { email: true, sms: false, system: true },
    securityAlerts: { email: true, sms: true, system: true },
    
    // Communication
    announcements: { email: true, sms: false, system: true },
    events: { email: true, sms: false, system: true },
    emergencyAlerts: { email: true, sms: true, system: true },
    parentMeetings: { email: true, sms: true, system: true }
  });

  const [notificationSchedules, setNotificationSchedules] = useState({
    dailyReports: { enabled: true, time: "08:00", recipients: ["headmaster", "administrators"] },
    weeklyReports: { enabled: true, day: "monday", time: "09:00", recipients: ["headmaster"] },
    monthlyReports: { enabled: true, date: "1", time: "10:00", recipients: ["headmaster", "finance"] },
    feeReminders: { enabled: true, daysBefore: "7", recipients: ["parents"] },
    examReminders: { enabled: true, daysBefore: "3", recipients: ["students", "parents"] }
  });

  const handleEmailSettingChange = (field: string, value: any) => {
    setEmailSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSMSSettingChange = (field: string, value: any) => {
    setSmsSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (category: string, channel: string, value: boolean) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [channel]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Saving notification settings:", {
      emailSettings,
      smsSettings,
      notificationPreferences,
      notificationSchedules
    });
    
    setSaving(false);
    setShowSuccessMessage(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const testEmailConfiguration = async () => {
    setTestingEmail(true);
    
    // Simulate test email
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setTestingEmail(false);
    alert("Test email sent successfully!");
  };

  const testSMSConfiguration = async () => {
    setTestingSMS(true);
    
    // Simulate test SMS
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setTestingSMS(false);
    alert("Test SMS sent successfully!");
  };

  const tabs = [
    { id: "email", label: "Email Settings", icon: Mail },
    { id: "sms", label: "SMS Settings", icon: MessageSquare },
    { id: "preferences", label: "Preferences", icon: Bell },
    { id: "schedules", label: "Schedules", icon: Clock },
    { id: "templates", label: "Templates", icon: Edit }
  ];

  const notificationCategories = [
    {
      title: "Academic Notifications",
      icon: BookOpen,
      items: [
        { key: "newStudentAdmission", label: "New Student Admission", description: "Notify when students are newly admitted" },
        { key: "examResults", label: "Exam Results", description: "Notify when exam results are published" },
        { key: "attendanceAlerts", label: "Attendance Alerts", description: "Notify about low attendance" },
        { key: "feeReminders", label: "Fee Reminders", description: "Remind about pending fee payments" }
      ]
    },
    {
      title: "Administrative Notifications",
      icon: Settings,
      items: [
        { key: "staffAttendance", label: "Staff Attendance", description: "Daily staff attendance reports" },
        { key: "systemMaintenance", label: "System Maintenance", description: "System maintenance and updates" },
        { key: "backupStatus", label: "Backup Status", description: "Database backup completion status" },
        { key: "securityAlerts", label: "Security Alerts", description: "Security-related notifications" }
      ]
    },
    {
      title: "Communication",
      icon: Users,
      items: [
        { key: "announcements", label: "Announcements", description: "General school announcements" },
        { key: "events", label: "Events", description: "School events and activities" },
        { key: "emergencyAlerts", label: "Emergency Alerts", description: "Urgent emergency communications" },
        { key: "parentMeetings", label: "Parent Meetings", description: "Parent-teacher meeting notifications" }
      ]
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/settings"
              className="text-white hover:text-orange-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Notification Settings</h1>
              <p className="text-orange-100">Configure email, SMS, and alert preferences</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-white text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">Notification settings saved successfully!</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Email Settings Tab */}
        {activeTab === "email" && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Server className="w-5 h-5 text-orange-600" />
                  SMTP Configuration
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Host
                    </label>
                    <input
                      type="text"
                      value={emailSettings.smtpHost}
                      onChange={(e) => handleEmailSettingChange('smtpHost', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Port
                    </label>
                    <input
                      type="text"
                      value={emailSettings.smtpPort}
                      onChange={(e) => handleEmailSettingChange('smtpPort', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Username
                  </label>
                  <input
                    type="email"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => handleEmailSettingChange('smtpUsername', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => handleEmailSettingChange('smtpPassword', e.target.value)}
                    placeholder="Enter SMTP password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={emailSettings.enableSSL}
                      onChange={(e) => handleEmailSettingChange('enableSSL', e.target.checked)}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Enable SSL</span>
                  </label>
                  
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={emailSettings.enableTLS}
                      onChange={(e) => handleEmailSettingChange('enableTLS', e.target.checked)}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Enable TLS</span>
                  </label>
                  
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={emailSettings.enableEmailNotifications}
                      onChange={(e) => handleEmailSettingChange('enableEmailNotifications', e.target.checked)}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Enable Email Notifications</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-orange-600" />
                  Email Identity
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Name
                  </label>
                  <input
                    type="text"
                    value={emailSettings.fromName}
                    onChange={(e) => handleEmailSettingChange('fromName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Email
                  </label>
                  <input
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => handleEmailSettingChange('fromEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reply-To Email
                  </label>
                  <input
                    type="email"
                    value={emailSettings.replyToEmail}
                    onChange={(e) => handleEmailSettingChange('replyToEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={testEmailConfiguration}
                    disabled={testingEmail}
                    className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {testingEmail ? <RefreshCw className="w-4 h-4 animate-spin" /> : <TestTube className="w-4 h-4" />}
                    {testingEmail ? 'Testing...' : 'Test Email Configuration'}
                  </button>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900 mb-1">Email Configuration Tips</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Use an app-specific password for Gmail</li>
                        <li>• Ensure your hosting provider allows SMTP</li>
                        <li>• Test configuration before going live</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SMS Settings Tab */}
        {activeTab === "sms" && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                  SMS Gateway Configuration
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMS Provider
                  </label>
                  <select
                    value={smsSettings.provider}
                    onChange={(e) => handleSMSSettingChange('provider', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="twilio">Twilio</option>
                    <option value="nexmo">Vonage (Nexmo)</option>
                    <option value="africas_talking">Africa's Talking</option>
                    <option value="hubtel">Hubtel</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <input
                    type="text"
                    value={smsSettings.apiKey}
                    onChange={(e) => handleSMSSettingChange('apiKey', e.target.value)}
                    placeholder="Enter API Key"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Secret
                  </label>
                  <input
                    type="password"
                    value={smsSettings.apiSecret}
                    onChange={(e) => handleSMSSettingChange('apiSecret', e.target.value)}
                    placeholder="Enter API Secret"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    value={smsSettings.senderName}
                    onChange={(e) => handleSMSSettingChange('senderName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum 11 characters, alphanumeric only</p>
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={smsSettings.enableSMSNotifications}
                      onChange={(e) => handleSMSSettingChange('enableSMSNotifications', e.target.checked)}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Enable SMS Notifications</span>
                  </label>
                  
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={smsSettings.enableInternational}
                      onChange={(e) => handleSMSSettingChange('enableInternational', e.target.checked)}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Enable International SMS</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">SMS Status</h3>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Credits Remaining</span>
                    <span className="text-2xl font-bold text-green-600">{smsSettings.creditsRemaining}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(smsSettings.creditsRemaining / 5000) * 100}%` }}></div>
                  </div>
                  
                  <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Purchase More Credits
                  </button>
                </div>
                
                <button
                  onClick={testSMSConfiguration}
                  disabled={testingSMS}
                  className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {testingSMS ? <RefreshCw className="w-4 h-4 animate-spin" /> : <TestTube className="w-4 h-4" />}
                  {testingSMS ? 'Testing...' : 'Test SMS Configuration'}
                </button>

                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900 mb-1">SMS Guidelines</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Keep messages under 160 characters</li>
                        <li>• Verify phone numbers before sending</li>
                        <li>• Monitor credit usage regularly</li>
                        <li>• Follow local SMS regulations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="p-6">
            <div className="space-y-8">
              {notificationCategories.map((category) => (
                <div key={category.title} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-orange-600" />
                    {category.title}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div key={item.key} className="bg-white rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.label}</h4>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          </div>
                          
                          <div className="flex items-center gap-6 ml-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={notificationPreferences[item.key as keyof typeof notificationPreferences]?.email}
                                onChange={(e) => handleNotificationChange(item.key, 'email', e.target.checked)}
                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                              />
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">Email</span>
                            </label>
                            
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={notificationPreferences[item.key as keyof typeof notificationPreferences]?.sms}
                                onChange={(e) => handleNotificationChange(item.key, 'sms', e.target.checked)}
                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                              />
                              <MessageSquare className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">SMS</span>
                            </label>
                            
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={notificationPreferences[item.key as keyof typeof notificationPreferences]?.system}
                                onChange={(e) => handleNotificationChange(item.key, 'system', e.target.checked)}
                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                              />
                              <Bell className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">System</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedules Tab */}
        {activeTab === "schedules" && (
          <div className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Notification Schedules
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Daily Reports</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSchedules.dailyReports.enabled}
                          onChange={(e) => setNotificationSchedules(prev => ({
                            ...prev,
                            dailyReports: { ...prev.dailyReports, enabled: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Time</label>
                        <input
                          type="time"
                          value={notificationSchedules.dailyReports.time}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Weekly Reports</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSchedules.weeklyReports.enabled}
                          onChange={(e) => setNotificationSchedules(prev => ({
                            ...prev,
                            weeklyReports: { ...prev.weeklyReports, enabled: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Day</label>
                        <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500">
                          <option value="monday">Monday</option>
                          <option value="tuesday">Tuesday</option>
                          <option value="wednesday">Wednesday</option>
                          <option value="thursday">Thursday</option>
                          <option value="friday">Friday</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Time</label>
                        <input
                          type="time"
                          value={notificationSchedules.weeklyReports.time}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Monthly Reports</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSchedules.monthlyReports.enabled}
                          onChange={(e) => setNotificationSchedules(prev => ({
                            ...prev,
                            monthlyReports: { ...prev.monthlyReports, enabled: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Date</label>
                        <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500">
                          <option value="1">1st</option>
                          <option value="15">15th</option>
                          <option value="28">28th</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Time</label>
                        <input
                          type="time"
                          value={notificationSchedules.monthlyReports.time}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Fee Reminders</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSchedules.feeReminders.enabled}
                          onChange={(e) => setNotificationSchedules(prev => ({
                            ...prev,
                            feeReminders: { ...prev.feeReminders, enabled: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Days Before Due Date</label>
                      <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500">
                        <option value="3">3 days</option>
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="30">30 days</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Exam Reminders</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSchedules.examReminders.enabled}
                          onChange={(e) => setNotificationSchedules(prev => ({
                            ...prev,
                            examReminders: { ...prev.examReminders, enabled: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Days Before Exam</label>
                      <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500">
                        <option value="1">1 day</option>
                        <option value="3">3 days</option>
                        <option value="7">7 days</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-orange-900 mb-1">Schedule Tips</h4>
                        <p className="text-sm text-orange-700">
                          Set schedules based on your school's timezone. All times are in 24-hour format.
                          Automated notifications will be sent according to these schedules.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Notification Templates</h3>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Template
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  { name: "Fee Reminder", type: "Email & SMS", category: "Finance", lastModified: "2 days ago" },
                  { name: "Exam Notification", type: "Email", category: "Academic", lastModified: "1 week ago" },
                  { name: "Attendance Alert", type: "SMS", category: "Academic", lastModified: "3 days ago" },
                  { name: "Emergency Alert", type: "Email & SMS", category: "Emergency", lastModified: "1 month ago" },
                  { name: "Welcome Message", type: "Email", category: "General", lastModified: "2 weeks ago" },
                  { name: "Event Reminder", type: "Email & SMS", category: "Events", lastModified: "5 days ago" }
                ].map((template, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        template.category === 'Finance' ? 'bg-green-100 text-green-800' :
                        template.category === 'Academic' ? 'bg-blue-100 text-blue-800' :
                        template.category === 'Emergency' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {template.category}
                      </span>
                      <span className="text-gray-500">Modified {template.lastModified}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Email Status</p>
              <p className="text-lg font-bold text-green-600">
                {emailSettings.enableEmailNotifications ? 'Active' : 'Disabled'}
              </p>
            </div>
            <Mail className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">SMS Status</p>
              <p className="text-lg font-bold text-blue-600">
                {smsSettings.enableSMSNotifications ? 'Active' : 'Disabled'}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">SMS Credits</p>
              <p className="text-lg font-bold text-purple-600">{smsSettings.creditsRemaining}</p>
            </div>
            <Zap className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Schedules</p>
              <p className="text-lg font-bold text-orange-600">
                {Object.values(notificationSchedules).filter(schedule => schedule.enabled).length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
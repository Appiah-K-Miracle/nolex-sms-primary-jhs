"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MessageSquare,
  Bell,
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Mail,
  Phone,
  Video,
  Calendar,
  Clock,
  User,
  Star,
  Flag,
  Archive,
  Trash2,
  Reply,
  Forward,
  Download,
  Settings,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Send,
  Paperclip,
  Smile,
  MoreHorizontal,
  Bookmark,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Share2,
  Edit,
  RefreshCw,
  ExternalLink,
  UserPlus,
  UserMinus,
  Shield,
  Lock,
  Unlock,
  Globe,
  Hash,
  AtSign,
  MessageCircle,
  Megaphone,
  Newspaper,
  Info,
  HelpCircle,
  Target,
  TrendingUp,
  Activity,
  PieChart,
  BarChart3
} from "lucide-react";

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showNewMessage, setShowNewMessage] = useState(false);

  // Sample communication data
  const communicationStats = {
    totalMessages: 24,
    unreadMessages: 6,
    newAnnouncements: 3,
    activeConversations: 8,
    responseRate: 92,
    averageResponseTime: "2.5 hours"
  };

  const recentMessages = [
    {
      id: 1,
      type: "message",
      from: "Mr. Osei",
      fromRole: "Mathematics Teacher",
      subject: "Kwame's Progress Update",
      preview: "I wanted to update you on Kwame's excellent progress in algebra...",
      timestamp: "2025-11-15 09:30 AM",
      read: false,
      priority: "normal",
      hasAttachment: false,
      childName: "Kwame Mensah",
      replies: 2
    },
    {
      id: 2,
      type: "announcement",
      from: "School Administration",
      fromRole: "Administration",
      subject: "Parent-Teacher Conference Schedule",
      preview: "The upcoming parent-teacher conferences are scheduled for next week...",
      timestamp: "2025-11-14 02:15 PM",
      read: true,
      priority: "high",
      hasAttachment: true,
      childName: "All Children",
      replies: 0
    },
    {
      id: 3,
      type: "message",
      from: "Mrs. Addo",
      fromRole: "English Teacher",
      subject: "Reading Assignment Feedback",
      preview: "Kwame's essay on character analysis was very insightful...",
      timestamp: "2025-11-13 11:45 AM",
      read: true,
      priority: "normal",
      hasAttachment: false,
      childName: "Kwame Mensah",
      replies: 1
    },
    {
      id: 4,
      type: "system",
      from: "School System",
      fromRole: "System",
      subject: "Grade Report Available",
      preview: "Ama's Grade 4 term report is now available for download...",
      timestamp: "2025-11-12 04:20 PM",
      read: false,
      priority: "normal",
      hasAttachment: true,
      childName: "Ama Mensah",
      replies: 0
    },
    {
      id: 5,
      type: "message",
      from: "Dr. Mensah",
      fromRole: "Science Teacher",
      subject: "Science Project Reminder",
      preview: "Just a friendly reminder about the upcoming science project deadline...",
      timestamp: "2025-11-11 10:15 AM",
      read: true,
      priority: "normal",
      hasAttachment: false,
      childName: "Kwame Mensah",
      replies: 3
    },
    {
      id: 6,
      type: "announcement",
      from: "PTA Committee",
      fromRole: "PTA",
      subject: "Holiday Fundraising Event",
      preview: "We're excited to announce our annual holiday fundraising event...",
      timestamp: "2025-11-10 03:30 PM",
      read: false,
      priority: "low",
      hasAttachment: true,
      childName: "All Children",
      replies: 0
    }
  ];

  const quickContacts = [
    {
      id: 1,
      name: "Mr. Osei",
      role: "Mathematics Teacher",
      status: "online",
      lastSeen: "now",
      avatar: "/images/teachers/osei.jpg",
      subjects: ["Mathematics"],
      phone: "+233 24 123 4567",
      email: "osei@nolexsms.edu.gh"
    },
    {
      id: 2,
      name: "Mrs. Addo",
      role: "English Teacher", 
      status: "away",
      lastSeen: "30 mins ago",
      avatar: "/images/teachers/addo.jpg",
      subjects: ["English Language"],
      phone: "+233 24 234 5678",
      email: "addo@nolexsms.edu.gh"
    },
    {
      id: 3,
      name: "Dr. Mensah",
      role: "Science Teacher",
      status: "offline",
      lastSeen: "2 hours ago",
      avatar: "/images/teachers/mensah.jpg",
      subjects: ["Science"],
      phone: "+233 24 345 6789",
      email: "mensah@nolexsms.edu.gh"
    },
    {
      id: 4,
      name: "Mrs. Appiah",
      role: "Class Teacher",
      status: "online",
      lastSeen: "now",
      avatar: "/images/teachers/appiah.jpg",
      subjects: ["General Studies"],
      phone: "+233 24 456 7890",
      email: "appiah@nolexsms.edu.gh"
    }
  ];

  const announcements = [
    {
      id: 1,
      title: "Parent-Teacher Conference Schedule",
      content: "The upcoming parent-teacher conferences are scheduled for November 20-22, 2025. Please check your email for your assigned time slots.",
      author: "School Administration",
      date: "2025-11-14",
      priority: "high",
      category: "Academic",
      read: false,
      attachments: ["conference_schedule.pdf"]
    },
    {
      id: 2,
      title: "Holiday Break Schedule",
      content: "School will be closed from December 20, 2025 to January 6, 2026 for the holiday break. Classes resume on January 7, 2026.",
      author: "School Administration",
      date: "2025-11-12",
      priority: "normal",
      category: "Schedule",
      read: true,
      attachments: []
    },
    {
      id: 3,
      title: "Sports Day Registration",
      content: "Registration for the annual sports day is now open. Please register your children by November 25, 2025.",
      author: "Sports Department",
      date: "2025-11-10",
      priority: "normal",
      category: "Events",
      read: true,
      attachments: ["sports_day_form.pdf"]
    }
  ];

  // Filter messages
  const filteredMessages = recentMessages.filter(message => {
    const searchMatch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       message.preview.toLowerCase().includes(searchTerm.toLowerCase());
    
    const typeMatch = filterType === "all" || message.type === filterType;
    
    return searchMatch && typeMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "busy": return "bg-red-500";
      default: return "bg-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50";
      case "normal": return "text-blue-600 bg-blue-50";
      case "low": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "message": return <MessageCircle className="w-5 h-5" />;
      case "announcement": return <Megaphone className="w-5 h-5" />;
      case "system": return <Settings className="w-5 h-5" />;
      default: return <Mail className="w-5 h-5" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Communication</h1>
            <p className="text-blue-100 text-sm lg:text-base">
              Stay connected with teachers and school administration
            </p>
          </div>
        </div>

        {/* Communication Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{communicationStats.totalMessages}</div>
            <div className="text-sm text-blue-100">Total Messages</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-300">{communicationStats.unreadMessages}</div>
            <div className="text-sm text-blue-100">Unread</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-300">{communicationStats.newAnnouncements}</div>
            <div className="text-sm text-blue-100">Announcements</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{communicationStats.activeConversations}</div>
            <div className="text-sm text-blue-100">Active Chats</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{communicationStats.responseRate}%</div>
            <div className="text-sm text-blue-100">Response Rate</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{communicationStats.averageResponseTime}</div>
            <div className="text-sm text-blue-100">Avg Response</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex flex-wrap border-b border-gray-200">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "messages", label: "Messages", icon: MessageSquare },
            { id: "announcements", label: "Announcements", icon: Megaphone },
            { id: "contacts", label: "Contacts", icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.id === "messages" && communicationStats.unreadMessages > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                  {communicationStats.unreadMessages}
                </span>
              )}
              {tab.id === "announcements" && communicationStats.newAnnouncements > 0 && (
                <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                  {communicationStats.newAnnouncements}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 lg:p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Quick Actions */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link
                    href="/parent/communication/messages/new"
                    className="p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-center"
                  >
                    <Plus className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-blue-900 mb-1">New Message</h4>
                    <p className="text-sm text-blue-700">Send a message to teachers</p>
                  </Link>
                  
                  <Link
                    href="/parent/communication/announcements"
                    className="p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-center"
                  >
                    <Bell className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-green-900 mb-1">View Announcements</h4>
                    <p className="text-sm text-green-700">Check school updates</p>
                  </Link>
                  
                  <Link
                    href="/parent/communication/contacts"
                    className="p-6 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-center"
                  >
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-purple-900 mb-1">Contact Directory</h4>
                    <p className="text-sm text-purple-700">Find teacher contacts</p>
                  </Link>
                  
                  <Link
                    href="/parent/communication/settings"
                    className="p-6 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-center"
                  >
                    <Settings className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-orange-900 mb-1">Settings</h4>
                    <p className="text-sm text-orange-700">Manage preferences</p>
                  </Link>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                  <Link
                    href="/parent/communication/messages"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {recentMessages.slice(0, 3).map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                        !message.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          {getMessageIcon(message.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className={`font-semibold ${!message.read ? 'text-blue-900' : 'text-gray-900'}`}>
                              {message.subject}
                            </h4>
                            <span className="text-sm text-gray-500">{formatTimestamp(message.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{message.from} • {message.fromRole}</p>
                          <p className="text-sm text-gray-700 line-clamp-2">{message.preview}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                            <span>{message.childName}</span>
                            {message.hasAttachment && (
                              <span className="flex items-center gap-1">
                                <Paperclip className="w-3 h-3" />
                                Attachment
                              </span>
                            )}
                            {message.replies > 0 && (
                              <span className="flex items-center gap-1">
                                <Reply className="w-3 h-3" />
                                {message.replies} replies
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communication Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Communication Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Messages this week:</span>
                      <span className="font-semibold text-blue-600">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response rate:</span>
                      <span className="font-semibold text-green-600">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active conversations:</span>
                      <span className="font-semibold text-purple-600">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Teachers contacted:</span>
                      <span className="font-semibold text-orange-600">6</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Engagement Insights
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Most contacted:</span>
                      <span className="font-semibold text-green-600">Mr. Osei</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Peak time:</span>
                      <span className="font-semibold text-green-600">2-4 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg response time:</span>
                      <span className="font-semibold text-green-600">2.5 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Satisfaction:</span>
                      <span className="font-semibold text-green-600">Excellent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
                    />
                  </div>
                  
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Messages</option>
                    <option value="message">Direct Messages</option>
                    <option value="announcement">Announcements</option>
                    <option value="system">System Messages</option>
                  </select>
                </div>
                
                <Link
                  href="/parent/communication/messages/new"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-fit"
                >
                  <Plus className="w-4 h-4" />
                  New Message
                </Link>
              </div>

              {/* Messages List */}
              <div className="space-y-4">
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages found</h3>
                    <p className="text-gray-600">
                      {searchTerm ? 'No messages match your search criteria.' : 'Your inbox is empty.'}
                    </p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-6 border rounded-lg hover:shadow-md transition-all cursor-pointer ${
                        !message.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          message.type === 'message' ? 'bg-blue-100' :
                          message.type === 'announcement' ? 'bg-green-100' :
                          'bg-gray-100'
                        }`}>
                          {getMessageIcon(message.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className={`font-semibold mb-1 ${!message.read ? 'text-blue-900' : 'text-gray-900'}`}>
                                {message.subject}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>{message.from}</span>
                                <span>•</span>
                                <span>{message.fromRole}</span>
                                <span>•</span>
                                <span>{message.childName}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500 mb-1">{formatTimestamp(message.timestamp)}</div>
                              <div className="flex items-center gap-2">
                                {!message.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                                  {message.priority}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-3 line-clamp-2">{message.preview}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              {message.hasAttachment && (
                                <span className="flex items-center gap-1">
                                  <Paperclip className="w-3 h-3" />
                                  Attachment
                                </span>
                              )}
                              {message.replies > 0 && (
                                <span className="flex items-center gap-1">
                                  <Reply className="w-3 h-3" />
                                  {message.replies} replies
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                <Reply className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                <Forward className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-yellow-600 transition-colors">
                                <Star className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Announcements Tab */}
          {activeTab === "announcements" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">School Announcements</h3>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Categories</option>
                    <option value="academic">Academic</option>
                    <option value="events">Events</option>
                    <option value="schedule">Schedule</option>
                    <option value="important">Important</option>
                  </select>
                  <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`border rounded-lg p-6 ${
                      !announcement.read ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Megaphone className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className={`text-lg font-semibold mb-1 ${!announcement.read ? 'text-green-900' : 'text-gray-900'}`}>
                              {announcement.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{announcement.author}</span>
                              <span>•</span>
                              <span>{announcement.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!announcement.read && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              announcement.priority === 'high' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {announcement.priority}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              {announcement.category}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">{announcement.content}</p>
                        
                        {announcement.attachments.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-900 mb-2">Attachments:</h5>
                            <div className="space-y-1">
                              {announcement.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <Paperclip className="w-4 h-4 text-gray-400" />
                                  <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
                                    {attachment}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            Mark as Read
                          </button>
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                            Share
                          </button>
                          <button className="p-2 text-gray-400 hover:text-yellow-600 transition-colors">
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === "contacts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Teacher Contacts</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                    />
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Teachers</option>
                    <option value="online">Online Now</option>
                    <option value="subject">By Subject</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickContacts.map((contact) => (
                  <div key={contact.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="text-center mb-4">
                      <div className="relative inline-block">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <User className="w-8 h-8 text-gray-600" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}></div>
                      </div>
                      <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                      <p className="text-sm text-gray-600">{contact.role}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {contact.status === 'online' ? 'Online now' : `Last seen ${contact.lastSeen}`}
                      </p>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Subjects:</p>
                        <div className="flex flex-wrap justify-center gap-1 mt-1">
                          {contact.subjects.map((subject, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <Link
                        href={`mailto:${contact.email}`}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-center"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4 mx-auto" />
                      </Link>
                      <Link
                        href={`tel:${contact.phone}`}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors text-center"
                        title="Call"
                      >
                        <Phone className="w-4 h-4 mx-auto" />
                      </Link>
                      <button
                        className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                        title="Schedule Meeting"
                      >
                        <Calendar className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
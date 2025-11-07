"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Bell, 
  MessageSquare, 
  Megaphone, 
  Mail, 
  Users, 
  Calendar, 
  Send, 
  Eye, 
  Edit3, 
  Trash2, 
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  FileText,
  BarChart3,
  Target,
  TrendingUp,
  Zap
} from "lucide-react";

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState("announcements");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Sample data for different communication types
  const announcements = [
    {
      id: 1,
      title: "End of Term Examination Schedule",
      content: "Dear students and parents, please note the upcoming end of term examination schedule...",
      type: "Academic",
      status: "published",
      audience: "Students & Parents",
      createdBy: "Headmaster",
      createdDate: "2025-11-01",
      publishDate: "2025-11-02",
      views: 234,
      priority: "high"
    },
    {
      id: 2,
      title: "PTA Meeting Announcement",
      content: "The monthly PTA meeting has been scheduled for November 15th, 2025...",
      type: "General",
      status: "scheduled",
      audience: "Parents",
      createdBy: "Admin",
      createdDate: "2025-11-01",
      publishDate: "2025-11-10",
      views: 0,
      priority: "medium"
    },
    {
      id: 3,
      title: "New Uniform Policy",
      content: "We are implementing new uniform policies effective from next term...",
      type: "Policy",
      status: "draft",
      audience: "Students & Parents",
      createdBy: "Headmaster",
      createdDate: "2025-10-30",
      publishDate: null,
      views: 0,
      priority: "low"
    },
    {
      id: 4,
      title: "Sports Day Competition",
      content: "Annual sports day will be held on December 15th, 2025. All students are required to participate...",
      type: "Events",
      status: "published",
      audience: "Students & Parents",
      createdBy: "Sports Coordinator",
      createdDate: "2025-10-28",
      publishDate: "2025-10-29",
      views: 189,
      priority: "medium"
    }
  ];

  const messages = [
    {
      id: 1,
      subject: "Grade Report Inquiry",
      sender: "Mrs. Jane Doe",
      recipient: "Math Teacher",
      type: "Parent to Teacher",
      status: "replied",
      createdDate: "2025-11-03",
      lastReply: "2025-11-03",
      priority: "normal"
    },
    {
      id: 2,
      subject: "Student Behavior Report",
      sender: "Class Teacher",
      recipient: "Mr. John Smith",
      type: "Teacher to Parent",
      status: "sent",
      createdDate: "2025-11-02",
      lastReply: null,
      priority: "high"
    },
    {
      id: 3,
      subject: "Curriculum Update Meeting",
      sender: "Academic Coordinator",
      recipient: "All Teachers",
      type: "Internal",
      status: "read",
      createdDate: "2025-11-01",
      lastReply: "2025-11-01",
      priority: "medium"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Fee Payment Reminder",
      message: "Tuition fees for November are due in 3 days",
      type: "Payment",
      status: "active",
      audience: "Parents",
      scheduledTime: "2025-11-06 09:00",
      deliveryMethod: "SMS & Email",
      priority: "high"
    },
    {
      id: 2,
      title: "Exam Results Available",
      message: "Mid-term examination results are now available on the portal",
      type: "Academic",
      status: "sent",
      audience: "Students & Parents",
      scheduledTime: "2025-11-03 14:00",
      deliveryMethod: "Email & App",
      priority: "medium"
    },
    {
      id: 3,
      title: "Weather Alert",
      message: "School will close early today due to heavy rain",
      type: "Emergency",
      status: "sent",
      audience: "All",
      scheduledTime: "2025-11-03 11:30",
      deliveryMethod: "SMS & App",
      priority: "urgent"
    }
  ];

  const campaigns = [
    {
      id: 1,
      name: "Welcome New Students 2025",
      description: "Welcome campaign for newly admitted students and their parents",
      type: "Welcome",
      status: "completed",
      audience: "New Students & Parents",
      sentDate: "2025-09-01",
      recipients: 45,
      openRate: "78%",
      clickRate: "34%"
    },
    {
      id: 2,
      name: "Christmas Holiday Notice",
      description: "Information about Christmas break schedule and activities",
      type: "Holiday",
      status: "scheduled",
      audience: "All",
      sentDate: "2025-12-10",
      recipients: 580,
      openRate: "-",
      clickRate: "-"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
      case "sent":
      case "completed":
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "replied":
        return "bg-purple-100 text-purple-800";
      case "read":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "medium":
        return <Bell className="w-4 h-4 text-yellow-500" />;
      case "low":
      case "normal":
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting:", selectedItem);
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const filteredData = () => {
    let data = [];
    switch (activeTab) {
      case "announcements":
        data = announcements;
        break;
      case "messages":
        data = messages;
        break;
      case "notifications":
        data = notifications;
        break;
      case "campaigns":
        data = campaigns;
        break;
      default:
        data = announcements;
    }

    return data.filter(item => {
      const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || item.status === filterStatus;
      const matchesType = filterType === "all" || item.type === filterType;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  };

  const getCreateLink = () => {
    switch (activeTab) {
      case "announcements":
        return "/headmaster/communication/announcements/new";
      case "messages":
        return "/headmaster/communication/messages/new";
      case "notifications":
        return "/headmaster/communication/notifications/new";
      case "campaigns":
        return "/headmaster/communication/campaigns/new";
      default:
        return "/headmaster/communication/announcements/new";
    }
  };

  const getDetailLink = (id: number) => {
    switch (activeTab) {
      case "announcements":
        return `/headmaster/communication/announcements/${id}`;
      case "messages":
        return `/headmaster/communication/messages/${id}`;
      case "notifications":
        return `/headmaster/communication/notifications/${id}`;
      case "campaigns":
        return `/headmaster/communication/campaigns/${id}`;
      default:
        return `/headmaster/communication/announcements/${id}`;
    }
  };

  const getEditLink = (id: number) => {
    return `${getDetailLink(id)}/edit`;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Communication Center</h1>
            <p className="text-blue-100 mt-2">Manage all school communications, announcements, and messaging</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <MessageSquare className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white text-sm">Messages</p>
              <p className="text-white font-bold text-xl">{messages.length}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <Megaphone className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white text-sm">Announcements</p>
              <p className="text-white font-bold text-xl">{announcements.length}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <Bell className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white text-sm">Notifications</p>
              <p className="text-white font-bold text-xl">{notifications.filter(n => n.status === 'active').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Sent Today</p>
              <p className="text-2xl font-bold text-gray-900">142</p>
            </div>
            <Send className="w-10 h-10 text-blue-600" />
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 text-sm">+12% from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">78.5%</p>
            </div>
            <Eye className="w-10 h-10 text-green-600" />
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 text-sm">+3.2% this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <Target className="w-10 h-10 text-purple-600" />
          </div>
          <div className="mt-4 flex items-center">
            <Clock className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-blue-600 text-sm">2 scheduled</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Urgent Items</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <Zap className="w-10 h-10 text-red-600" />
          </div>
          <div className="mt-4 flex items-center">
            <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-600 text-sm">Needs attention</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {[
              { key: "announcements", label: "Announcements", icon: Megaphone },
              { key: "messages", label: "Messages", icon: MessageSquare },
              { key: "notifications", label: "Notifications", icon: Bell },
              { key: "campaigns", label: "Campaigns", icon: Mail }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters and Actions */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="sent">Sent</option>
                <option value="active">Active</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="Academic">Academic</option>
                <option value="General">General</option>
                <option value="Policy">Policy</option>
                <option value="Events">Events</option>
                <option value="Emergency">Emergency</option>
                <option value="Payment">Payment</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <Link
                href={getCreateLink()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create {activeTab.slice(0, -1)}
              </Link>
            </div>
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {activeTab === "announcements" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </>
                )}
                {activeTab === "messages" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </>
                )}
                {activeTab === "notifications" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </>
                )}
                {activeTab === "campaigns" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData().map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {activeTab === "announcements" && (
                    <>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getPriorityIcon(item.priority)}
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{item.content}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.audience}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.views}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.createdDate}</td>
                    </>
                  )}
                  
                  {activeTab === "messages" && (
                    <>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getPriorityIcon(item.priority)}
                          <div className="ml-3 text-sm font-medium text-gray-900">{item.subject}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.recipient}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.createdDate}</td>
                    </>
                  )}
                  
                  {activeTab === "notifications" && (
                    <>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getPriorityIcon(item.priority)}
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{item.message}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.audience}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.scheduledTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.deliveryMethod}</td>
                    </>
                  )}
                  
                  {activeTab === "campaigns" && (
                    <>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.recipients}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.openRate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sentDate}</td>
                    </>
                  )}

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Link
                        href={getDetailLink(item.id)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={getEditLink(item.id)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete {activeTab.slice(0, -1)}</h3>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{selectedItem.title || selectedItem.subject || selectedItem.name}"</span>?
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">This will permanently remove:</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  {activeTab === "announcements" && (
                    <>
                      <li>• Announcement content and attachments</li>
                      <li>• View statistics ({selectedItem.views} views)</li>
                      <li>• Scheduled publishing settings</li>
                      <li>• Associated comments and feedback</li>
                    </>
                  )}
                  {activeTab === "messages" && (
                    <>
                      <li>• Message thread and replies</li>
                      <li>• Conversation history</li>
                      <li>• File attachments</li>
                      <li>• Read receipts and notifications</li>
                    </>
                  )}
                  {activeTab === "notifications" && (
                    <>
                      <li>• Notification content and settings</li>
                      <li>• Delivery schedule and preferences</li>
                      <li>• Recipient lists and targeting</li>
                      <li>• Delivery statistics and reports</li>
                    </>
                  )}
                  {activeTab === "campaigns" && (
                    <>
                      <li>• Campaign content and templates</li>
                      <li>• Recipient list ({selectedItem.recipients} contacts)</li>
                      <li>• Analytics data (Open rate: {selectedItem.openRate})</li>
                      <li>• Scheduled sends and automation</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
              >
                Delete {activeTab.slice(0, -1)}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
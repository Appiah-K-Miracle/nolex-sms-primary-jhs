"use client";

import React, { useState } from "react";
import { 
  Megaphone, 
  Bell, 
  Calendar, 
  Users, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock, 
  Pin, 
  Filter, 
  Search, 
  BookOpen, 
  GraduationCap, 
  Heart, 
  Star,
  Eye,
  EyeOff,
  Archive,
  MoreVertical,
  Share,
  Download,
  Bookmark,
  Tag,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  User,
  Building,
  Zap,
  Award,
  Activity,
  FileText,
  X
} from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
    department?: string;
  };
  publishDate: string;
  expiryDate?: string;
  category: 'general' | 'academic' | 'event' | 'urgent' | 'sports' | 'health';
  priority: 'high' | 'medium' | 'low';
  isPinned: boolean;
  isRead: boolean;
  isBookmarked: boolean;
  attachments?: Array<{
    name: string;
    type: string;
    size: string;
    url: string;
  }>;
  targetAudience: string[];
  readCount: number;
  totalAudience: number;
  tags: string[];
  eventDetails?: {
    date: string;
    time: string;
    venue: string;
    contact?: string;
  };
  actionRequired?: boolean;
  deadline?: string;
}

export default function AnnouncementsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Sample announcements data
  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Parent-Teacher Conference - November 2025",
      content: "Dear Parents, We are pleased to invite you to our upcoming Parent-Teacher Conference scheduled for November 25-26, 2025. This is an important opportunity to discuss your child's academic progress, behavior, and overall development with their teachers. Please book your appointment slots through the school portal or contact the administration office. Conference sessions will be held from 9:00 AM to 5:00 PM both days. We look forward to your participation in your child's educational journey.",
      author: {
        name: "Mrs. Tetteh",
        role: "Headmaster",
        department: "Administration"
      },
      publishDate: "2025-11-05T10:00:00",
      expiryDate: "2025-11-26T17:00:00",
      category: "event",
      priority: "high",
      isPinned: true,
      isRead: false,
      isBookmarked: true,
      targetAudience: ["All Parents", "JHS Students", "Primary Students"],
      readCount: 245,
      totalAudience: 380,
      tags: ["Conference", "Academic", "Mandatory"],
      eventDetails: {
        date: "November 25-26, 2025",
        time: "9:00 AM - 5:00 PM",
        venue: "School Main Hall & Classrooms",
        contact: "0244123456"
      },
      actionRequired: true,
      deadline: "2025-11-20T17:00:00",
      attachments: [
        { name: "Conference_Schedule.pdf", type: "pdf", size: "320 KB", url: "#" },
        { name: "Booking_Instructions.pdf", type: "pdf", size: "180 KB", url: "#" }
      ]
    },
    {
      id: 2,
      title: "School Fee Payment Reminder - Next Term",
      content: "This serves as a friendly reminder that school fees for the next academic term are due by December 15, 2025. Please ensure timely payment to avoid any inconvenience. Payments can be made through mobile money, bank transfer, or at the school's accounts office. For parents experiencing financial difficulties, please contact the administration to discuss payment plans.",
      author: {
        name: "Mr. Boateng",
        role: "Accounts Manager",
        department: "Finance"
      },
      publishDate: "2025-11-04T14:30:00",
      expiryDate: "2025-12-15T17:00:00",
      category: "general",
      priority: "medium",
      isPinned: true,
      isRead: true,
      isBookmarked: false,
      targetAudience: ["All Parents"],
      readCount: 320,
      totalAudience: 380,
      tags: ["Fees", "Payment", "Deadline"],
      actionRequired: true,
      deadline: "2025-12-15T17:00:00"
    },
    {
      id: 3,
      title: "Science Fair 2025 - Call for Participation",
      content: "We are excited to announce our annual Science Fair scheduled for December 10, 2025. This event provides students with an opportunity to showcase their scientific projects and innovations. All JHS students are encouraged to participate. Registration deadline is November 20, 2025. Project themes include Environmental Science, Technology Innovation, Health & Medicine, and Space Science.",
      author: {
        name: "Dr. Asante",
        role: "Science Teacher",
        department: "Sciences"
      },
      publishDate: "2025-11-03T11:15:00",
      expiryDate: "2025-12-10T17:00:00",
      category: "academic",
      priority: "medium",
      isPinned: false,
      isRead: true,
      isBookmarked: true,
      targetAudience: ["JHS Parents", "JHS Students"],
      readCount: 156,
      totalAudience: 180,
      tags: ["Science", "Competition", "Innovation"],
      eventDetails: {
        date: "December 10, 2025",
        time: "9:00 AM - 4:00 PM",
        venue: "School Science Laboratory & Assembly Hall",
        contact: "science@nolex.edu.gh"
      },
      actionRequired: true,
      deadline: "2025-11-20T17:00:00"
    },
    {
      id: 4,
      title: "Health Screening Program - November 2025",
      content: "The Ghana Health Service, in collaboration with our school, will conduct free health screenings for all students from November 12-14, 2025. The screening will cover vision, dental, height, weight, and general health checks. Parents are required to provide consent forms which were sent home last week. Please ensure your child participates in this important health initiative.",
      author: {
        name: "Nurse Abena",
        role: "School Nurse",
        department: "Health Services"
      },
      publishDate: "2025-11-02T09:00:00",
      expiryDate: "2025-11-14T17:00:00",
      category: "health",
      priority: "high",
      isPinned: false,
      isRead: false,
      isBookmarked: false,
      targetAudience: ["All Parents", "All Students"],
      readCount: 298,
      totalAudience: 380,
      tags: ["Health", "Screening", "Mandatory"],
      eventDetails: {
        date: "November 12-14, 2025",
        time: "8:00 AM - 3:00 PM",
        venue: "School Health Center",
        contact: "health@nolex.edu.gh"
      },
      actionRequired: true,
      deadline: "2025-11-11T17:00:00",
      attachments: [
        { name: "Consent_Form.pdf", type: "pdf", size: "150 KB", url: "#" },
        { name: "Health_Screening_Info.pdf", type: "pdf", size: "220 KB", url: "#" }
      ]
    },
    {
      id: 5,
      title: "Inter-School Sports Competition",
      content: "Our school has been selected to participate in the Regional Inter-School Sports Competition taking place November 18-19, 2025. We need parent volunteers to help with transportation and supervision. Students representing our school should report for final training sessions this week.",
      author: {
        name: "Coach Mensah",
        role: "Sports Coordinator",
        department: "Physical Education"
      },
      publishDate: "2025-11-01T16:00:00",
      category: "sports",
      priority: "medium",
      isPinned: false,
      isRead: true,
      isBookmarked: false,
      targetAudience: ["Sports Parents", "Selected Students"],
      readCount: 89,
      totalAudience: 95,
      tags: ["Sports", "Competition", "Volunteers"],
      eventDetails: {
        date: "November 18-19, 2025",
        time: "7:00 AM - 6:00 PM",
        venue: "Regional Sports Complex, Accra",
        contact: "sports@nolex.edu.gh"
      }
    },
    {
      id: 6,
      title: "New COVID-19 Safety Protocols",
      content: "Following the latest guidelines from the Ghana Health Service, we are implementing updated COVID-19 safety protocols. All students and staff are required to wear masks in enclosed spaces. Temperature checks will continue at school entrances. Parents should ensure children stay home if showing any symptoms of illness.",
      author: {
        name: "Mrs. Tetteh",
        role: "Headmaster",
        department: "Administration"
      },
      publishDate: "2025-10-30T12:00:00",
      category: "urgent",
      priority: "high",
      isPinned: false,
      isRead: true,
      isBookmarked: false,
      targetAudience: ["All Parents", "All Students", "All Staff"],
      readCount: 350,
      totalAudience: 380,
      tags: ["Health", "Safety", "COVID-19", "Protocols"]
    }
  ];

  // Filter announcements based on category and search
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesCategory = selectedCategory === "all" || announcement.category === selectedCategory;
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort announcements (pinned first, then by date)
  const sortedAnnouncements = filteredAnnouncements.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'urgent': return <AlertTriangle className="w-4 h-4" />;
      case 'sports': return <Activity className="w-4 h-4" />;
      case 'health': return <Heart className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'sports': return 'bg-green-100 text-green-800';
      case 'health': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const toggleBookmark = (id: number) => {
    // In a real app, this would update the backend
    console.log('Toggle bookmark for announcement:', id);
  };

  const markAsRead = (id: number) => {
    // In a real app, this would update the backend
    console.log('Mark as read:', id);
  };

  const selectedAnnouncementData = selectedAnnouncement 
    ? announcements.find(a => a.id === selectedAnnouncement)
    : null;

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 flex items-center gap-3">
              <Megaphone className="w-8 h-8 lg:w-10 lg:h-10" />
              School Announcements
            </h1>
            <p className="text-purple-100 text-sm lg:text-base xl:text-lg">
              Stay updated with important school news, events, and notifications
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <Bell className="w-4 h-4" />
              <span className="text-sm font-medium">
                {announcements.filter(a => !a.isRead).length} unread
              </span>
            </div>
            <button className="bg-white text-purple-600 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
              <Download className="w-4 h-4 lg:w-5 lg:h-5" />
              Download All
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="academic">Academic</option>
                <option value="event">Events</option>
                <option value="urgent">Urgent</option>
                <option value="sports">Sports</option>
                <option value="health">Health</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' 
          : 'space-y-4 lg:space-y-6'
      }`}>
        {sortedAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className={`bg-white rounded-lg lg:rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 ${getPriorityColor(announcement.priority)} ${
              viewMode === 'list' ? 'cursor-pointer' : ''
            }`}
            onClick={() => viewMode === 'list' && setSelectedAnnouncement(announcement.id)}
          >
            <div className="p-4 lg:p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3 flex-1">
                  {announcement.isPinned && (
                    <Pin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(announcement.category)}`}>
                        {getCategoryIcon(announcement.category)}
                        <span className="ml-1 capitalize">{announcement.category}</span>
                      </span>
                      {announcement.actionRequired && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Action Required
                        </span>
                      )}
                      {!announcement.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${!announcement.isRead ? 'font-bold' : ''}`}>
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {announcement.content}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(announcement.id);
                    }}
                    className={`p-1 rounded hover:bg-gray-100 ${
                      announcement.isBookmarked ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${announcement.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-1 text-gray-400 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Author and Date */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">
                      {announcement.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{announcement.author.name}</p>
                    <p className="text-xs text-gray-600">{announcement.author.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{formatDate(announcement.publishDate)}</p>
                  <p className="text-xs text-gray-600">{formatTime(announcement.publishDate)}</p>
                </div>
              </div>

              {/* Event Details (if applicable) */}
              {announcement.eventDetails && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Event Details
                  </h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p><span className="font-medium">Date:</span> {announcement.eventDetails.date}</p>
                    <p><span className="font-medium">Time:</span> {announcement.eventDetails.time}</p>
                    <p><span className="font-medium">Venue:</span> {announcement.eventDetails.venue}</p>
                    {announcement.eventDetails.contact && (
                      <p><span className="font-medium">Contact:</span> {announcement.eventDetails.contact}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Deadline (if applicable) */}
              {announcement.deadline && (
                <div className="bg-orange-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <div>
                      <p className="text-sm font-semibold text-orange-900">Deadline</p>
                      <p className="text-sm text-orange-800">{formatDate(announcement.deadline)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Attachments */}
              {announcement.attachments && announcement.attachments.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Attachments</h4>
                  <div className="space-y-2">
                    {announcement.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                          <p className="text-xs text-gray-600">{attachment.size}</p>
                        </div>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {announcement.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {announcement.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{announcement.readCount}/{announcement.totalAudience}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{announcement.targetAudience.join(', ')}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {!announcement.isRead && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(announcement.id);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
          <p className="text-gray-600">
            {searchQuery || selectedCategory !== "all" 
              ? "Try adjusting your search or filter criteria." 
              : "There are no announcements at the moment."}
          </p>
        </div>
      )}

      {/* Detailed View Modal */}
      {selectedAnnouncementData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{selectedAnnouncementData.title}</h3>
                <button 
                  onClick={() => setSelectedAnnouncement(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Full content would be displayed here */}
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{selectedAnnouncementData.content}</p>
              </div>
              
              {/* Additional details like event info, attachments, etc. */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
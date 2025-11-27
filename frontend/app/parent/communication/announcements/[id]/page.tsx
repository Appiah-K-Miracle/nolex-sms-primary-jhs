"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  Megaphone,
  Calendar,
  Clock,
  User,
  Users,
  MapPin,
  Phone,
  Mail,
  Share2,
  Bookmark,
  BookmarkCheck,
  Download,
  Print,
  Eye,
  EyeOff,
  Bell,
  BellOff,
  Star,
  Flag,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Info,
  FileText,
  Image,
  ExternalLink,
  Copy,
  RefreshCw,
  Filter,
  Search,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  Activity,
  Target,
  Award,
  GraduationCap
} from "lucide-react";

export default function AnnouncementDetailPage() {
  const params = useParams();
  const announcementId = params.id as string;
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Sample announcement data
  const announcement = {
    id: parseInt(announcementId),
    title: "Mid-Term Examination Schedule and Important Guidelines",
    content: `Dear Parents and Students,

We are pleased to announce the Mid-Term Examination schedule for all JHS classes. Please note the following important information:

**EXAMINATION DATES:**
- JHS 1: November 25-29, 2025
- JHS 2: November 25-29, 2025  
- JHS 3: November 25-29, 2025

**EXAMINATION TIMES:**
- Morning Session: 8:00 AM - 10:30 AM
- Afternoon Session: 1:00 PM - 3:30 PM

**IMPORTANT GUIDELINES:**

1. **Arrival Time**: Students must arrive at school at least 30 minutes before each examination.

2. **Required Materials**: 
   - Valid Student ID Card
   - Blue or black pens only
   - Mathematical instruments (for Mathematics and Science)
   - Calculator (scientific calculator allowed)

3. **Prohibited Items**:
   - Mobile phones and electronic devices
   - Notes, textbooks, or any reference materials
   - Food and drinks (except water in clear bottles)

4. **Dress Code**: Students must wear complete school uniform daily.

5. **Health Protocol**: Students showing signs of illness should stay home and contact the school administration.

**SUBJECT SCHEDULE:**

**Monday, November 25:**
- Morning: English Language (JHS 1, 2, 3)
- Afternoon: Integrated Science (JHS 1, 2, 3)

**Tuesday, November 26:**
- Morning: Mathematics (JHS 1, 2, 3)
- Afternoon: Social Studies (JHS 1, 2, 3)

**Wednesday, November 27:**
- Morning: RME (JHS 1, 2, 3)
- Afternoon: French/Local Language (JHS 1, 2, 3)

**Thursday, November 28:**
- Morning: ICT/Technical Skills (JHS 2, 3)
- Afternoon: Creative Arts (JHS 1, 2, 3)

**Friday, November 29:**
- Morning: Physical Education (Practical)
- Afternoon: Make-up examinations (if needed)

**PARENT INFORMATION:**

- Results will be available within 2 weeks after examinations
- Parent-teacher conferences will be scheduled for December 10-12, 2025
- Students who miss examinations due to illness must provide medical certificates

For any questions or concerns, please contact the academic office at academics@nolexsms.edu.gh or call +233 24 567 8901.

We wish all our students the best of luck in their examinations.

Best regards,
The Academic Administration
Nolex SMS Primary & JHS`,
    author: {
      name: "Academic Administration",
      role: "School Administration",
      department: "Academic Office",
      email: "academics@nolexsms.edu.gh",
      phone: "+233 24 567 8901"
    },
    publishedAt: "2025-11-15T08:00:00Z",
    updatedAt: "2025-11-15T10:30:00Z",
    expiresAt: "2025-12-31T23:59:59Z",
    priority: "high",
    category: "Academic",
    targetAudience: ["All Parents", "JHS Students", "JHS Teachers"],
    tags: ["Examinations", "Mid-Term", "Schedule", "Guidelines", "Academic"],
    attachments: [
      {
        id: 1,
        name: "Examination_Timetable_JHS.pdf",
        type: "pdf",
        size: "456 KB",
        url: "/attachments/exam_timetable.pdf",
        description: "Detailed examination timetable for all JHS classes"
      },
      {
        id: 2,
        name: "Examination_Guidelines.pdf", 
        type: "pdf",
        size: "234 KB",
        url: "/attachments/exam_guidelines.pdf",
        description: "Complete examination rules and regulations"
      },
      {
        id: 3,
        name: "Seating_Arrangement.xlsx",
        type: "excel",
        size: "89 KB", 
        url: "/attachments/seating.xlsx",
        description: "Student seating arrangements by class"
      }
    ],
    relatedAnnouncements: [
      {
        id: 15,
        title: "Examination Preparation Tips for Parents",
        publishedAt: "2025-11-10T10:00:00Z",
        category: "Academic"
      },
      {
        id: 16,
        title: "School Calendar Update - December 2025",
        publishedAt: "2025-11-12T14:00:00Z", 
        category: "Administrative"
      }
    ],
    readBy: 287,
    totalParents: 320,
    bookmarkedBy: 45,
    isRead: true,
    readAt: "2025-11-15T09:15:00Z",
    reminderSet: false,
    importance: "critical",
    actionRequired: true,
    deadline: "2025-11-25T08:00:00Z",
    followUpActions: [
      "Prepare required examination materials",
      "Review examination guidelines with your child",
      "Mark examination dates on your calendar",
      "Ensure child gets adequate rest before exams"
    ]
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleShare = (method: string) => {
    console.log(`Sharing via ${method}`);
    setShowShareOptions(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-700 bg-red-100 border-red-200';
      case 'medium': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'low': return 'text-green-700 bg-green-100 border-green-200';
      case 'critical': return 'text-purple-700 bg-purple-100 border-purple-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'academic': return <GraduationCap className="w-4 h-4 text-blue-600" />;
      case 'administrative': return <FileText className="w-4 h-4 text-purple-600" />;
      case 'events': return <Calendar className="w-4 h-4 text-green-600" />;
      case 'emergency': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Megaphone className="w-4 h-4 text-gray-600" />;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-600" />;
      case 'excel': return <FileText className="w-5 h-5 text-green-600" />;
      case 'image': return <Image className="w-5 h-5 text-blue-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getDaysUntilDeadline = () => {
    const deadline = new Date(announcement.deadline);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const readPercentage = Math.round((announcement.readBy / announcement.totalParents) * 100);
  const daysUntilDeadline = getDaysUntilDeadline();

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/parent/communication/announcements"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {getCategoryIcon(announcement.category)}
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{announcement.title}</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Published: {formatTimestamp(announcement.publishedAt)}</span>
            <span>•</span>
            <span>By: {announcement.author.name}</span>
            <span>•</span>
            <span>Read by {announcement.readBy} of {announcement.totalParents} parents ({readPercentage}%)</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleBookmark}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              isBookmarked 
                ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' 
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            {showShareOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                <button 
                  onClick={() => handleShare('email')}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button 
                  onClick={() => handleShare('copy')}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                >
                  <Copy className="w-4 h-4" />
                  Copy Link
                </button>
                <button 
                  onClick={() => handleShare('print')}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                >
                  <Print className="w-4 h-4" />
                  Print
                </button>
              </div>
            )}
          </div>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="xl:col-span-3">
          {/* Announcement Priority & Deadline Alert */}
          {announcement.actionRequired && daysUntilDeadline <= 7 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900">Action Required</h3>
                  <p className="text-red-800 mt-1">
                    This announcement requires action by {formatTimestamp(announcement.deadline)}
                    {daysUntilDeadline > 0 ? ` (${daysUntilDeadline} days remaining)` : ' (Deadline passed)'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Announcement Content */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
            {/* Content Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full border border-blue-200">
                      {announcement.category}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Published by {announcement.author.name} • {announcement.author.department}
                  </div>
                  {announcement.updatedAt !== announcement.publishedAt && (
                    <div className="text-xs text-gray-500 mt-1">
                      Last updated: {formatTimestamp(announcement.updatedAt)}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {announcement.isRead && (
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <Eye className="w-4 h-4" />
                    Read
                  </div>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6">
              <div className="prose max-w-none">
                <div className="text-gray-900 whitespace-pre-line leading-relaxed text-base">
                  {announcement.content}
                </div>
              </div>

              {/* Follow-up Actions */}
              {announcement.followUpActions.length > 0 && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Recommended Actions
                  </h4>
                  <ul className="space-y-2">
                    {announcement.followUpActions.map((action, index) => (
                      <li key={index} className="flex items-start gap-2 text-blue-800">
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Attachments */}
              {announcement.attachments.length > 0 && (
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Attachments ({announcement.attachments.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {announcement.attachments.map((attachment) => (
                      <div key={attachment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          {getFileIcon(attachment.type)}
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-gray-900 truncate">{attachment.name}</h5>
                            <p className="text-sm text-gray-600 mt-1">{attachment.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{attachment.size}</p>
                          </div>
                          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Announcements */}
          {announcement.relatedAnnouncements.length > 0 && (
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Announcements</h3>
              <div className="space-y-3">
                {announcement.relatedAnnouncements.map((related) => (
                  <Link
                    key={related.id}
                    href={`/parent/communication/announcements/${related.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{related.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                          <span>{formatTimestamp(related.publishedAt)}</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {related.category}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Information</h3>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">Category:</span>
                <span className="block font-medium text-gray-900">{announcement.category}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Priority:</span>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ml-2 ${getPriorityColor(announcement.priority)}`}>
                  {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Target Audience:</span>
                <div className="mt-1">
                  {announcement.targetAudience.map((audience, index) => (
                    <span key={index} className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mr-1 mb-1">
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
              {announcement.expiresAt && (
                <div>
                  <span className="text-sm text-gray-600">Expires:</span>
                  <span className="block font-medium text-gray-900">
                    {formatTimestamp(announcement.expiresAt)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Author Contact */}
          <div className="bg-gray-50 rounded-lg lg:rounded-xl border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{announcement.author.name}</div>
                  <div className="text-sm text-blue-600">{announcement.author.role}</div>
                  <div className="text-xs text-gray-600">{announcement.author.department}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${announcement.author.email}`} className="text-blue-600 hover:text-blue-800">
                    {announcement.author.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${announcement.author.phone}`} className="text-blue-600 hover:text-blue-800">
                    {announcement.author.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Send Message
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Call
                </button>
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Read by Parents</span>
                  <span className="text-sm font-medium text-gray-900">{readPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${readPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {announcement.readBy} of {announcement.totalParents} parents
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Bookmarked</span>
                <span className="font-medium text-gray-900">{announcement.bookmarkedBy}</span>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-blue-50 rounded-lg lg:rounded-xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-blue-900">Related Updates</div>
                  <div className="text-sm text-blue-700">Get notified of follow-up announcements</div>
                </div>
                <button
                  onClick={handleNotificationToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {announcement.deadline && (
                <div className="p-3 bg-white rounded border border-blue-200">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <Clock className="w-4 h-4" />
                    <span>Deadline reminder: {daysUntilDeadline} days remaining</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {announcement.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
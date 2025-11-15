"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Download,
  Share2,
  Bell,
  BellOff,
  Star,
  StarOff,
  Check,
  X,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  BookOpen,
  Trophy,
  Palette,
  GraduationCap,
  Coffee,
  FileText,
  Image,
  Video,
  Calendar as CalendarIcon,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  ExternalLink,
  Copy,
  QrCode,
  Settings,
  MoreHorizontal
} from "lucide-react";

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'not-attending' | 'maybe' | 'pending'>('pending');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'attendees' | 'comments' | 'photos'>('details');

  // Sample event data - in a real app, this would be fetched based on eventId
  const event = {
    id: parseInt(eventId),
    title: "Annual Sports Day",
    description: "Join us for an exciting day of athletic competitions, team sports, and family fun. All students will participate in various sporting events including track and field, football, volleyball, basketball, and traditional games. Parents are encouraged to participate in special parent-child races and activities. This is a wonderful opportunity for our school community to come together and celebrate our students' athletic achievements and sportsmanship.",
    fullDescription: `
      Our Annual Sports Day is one of the most anticipated events of the school year. This year's theme is "Unity in Sport" and we have planned an exciting day filled with activities for students of all ages.

      **Event Schedule:**
      - 8:00 AM - Registration and warm-up exercises
      - 9:00 AM - Opening ceremony with the school band
      - 9:30 AM - Track and field events begin
      - 11:00 AM - Team sports competitions
      - 12:30 PM - Lunch break (refreshments available)
      - 1:30 PM - Parent-child activities
      - 3:00 PM - Award ceremony
      - 4:00 PM - Closing ceremony

      **What to Bring:**
      - Sunscreen and hat
      - Water bottle
      - Comfortable seating (chairs/blankets)
      - Camera for memories
      - Cheering voice for your children!

      **Parking:**
      Parking will be available in the school compound and the adjacent field. Please follow the directions of our volunteers.

      **Weather Policy:**
      In case of rain, the event will be moved to the school auditorium with modified activities.
    `,
    date: "2025-11-25",
    startTime: "08:00",
    endTime: "16:00",
    venue: "Main Sports Ground",
    organizer: "Sports Department",
    category: "sports",
    type: "optional",
    priority: "high",
    status: "upcoming",
    capacity: 500,
    registered: 324,
    attendeeCount: 287,
    isRegistered: true,
    requiresRegistration: true,
    rsvpDeadline: "2025-11-22",
    contactPerson: {
      name: "Coach Amankwah",
      phone: "+233 24 567 8901",
      email: "amankwah@nolexsms.edu.gh",
      position: "Head of Sports Department"
    },
    childrenEligible: ["Kwame Mensah", "Ama Mensah"],
    registeredChildren: ["Kwame Mensah"],
    attachments: [
      { 
        name: "Sports Day Schedule 2025.pdf", 
        url: "#", 
        type: "pdf",
        size: "2.3 MB",
        uploadDate: "2025-11-10"
      },
      { 
        name: "Participation Form.pdf", 
        url: "#", 
        type: "pdf",
        size: "1.1 MB",
        uploadDate: "2025-11-08"
      },
      { 
        name: "Sports Day Map.jpg", 
        url: "#", 
        type: "image",
        size: "856 KB",
        uploadDate: "2025-11-12"
      }
    ],
    images: [
      "/events/sports-day-2024-1.jpg",
      "/events/sports-day-2024-2.jpg",
      "/events/sports-day-2024-3.jpg"
    ],
    tags: ["sports", "competition", "family", "outdoor", "athletics", "community"],
    activities: [
      "100m Sprint",
      "200m Sprint", 
      "Relay Race",
      "Long Jump",
      "High Jump",
      "Shot Put",
      "Football Match",
      "Volleyball",
      "Basketball",
      "Tug of War",
      "Parent-Child Race",
      "Three-Legged Race",
      "Sack Race",
      "Traditional Games"
    ],
    requirements: [
      "Sports attire required",
      "Closed-toe shoes mandatory",
      "Water bottle recommended",
      "Sunscreen advised"
    ],
    reminders: [
      { type: "1_week", time: "1 week before", enabled: true, sent: true },
      { type: "3_days", time: "3 days before", enabled: true, sent: false },
      { type: "1_day", time: "1 day before", enabled: true, sent: false },
      { type: "2_hours", time: "2 hours before", enabled: false, sent: false }
    ],
    weather: {
      forecast: "Sunny, 28°C",
      backup: "School Auditorium (Modified Program)"
    },
    sponsors: [
      "ABC Sports Equipment",
      "Local Health Center",
      "Parent-Teacher Association"
    ],
    volunteers: 45,
    volunteersNeeded: 60,
    awards: [
      "Best Sportsmanship",
      "Outstanding Performance",
      "Team Spirit Award",
      "Most Improved Athlete"
    ]
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="w-5 h-5" />;
      case 'sports': return <Trophy className="w-5 h-5" />;
      case 'cultural': return <Palette className="w-5 h-5" />;
      case 'meeting': return <Users className="w-5 h-5" />;
      case 'exam': return <GraduationCap className="w-5 h-5" />;
      case 'holiday': return <Coffee className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sports': return 'bg-green-100 text-green-800 border-green-200';
      case 'cultural': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'meeting': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'exam': return 'bg-red-100 text-red-800 border-red-200';
      case 'holiday': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Past event";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks`;
    return `${Math.floor(diffDays / 30)} months`;
  };

  const handleRSVP = (status: 'attending' | 'not-attending' | 'maybe') => {
    setRsvpStatus(status);
    setShowRSVPModal(false);
    // In a real app, this would make an API call
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would make an API call
  };

  const toggleReminders = () => {
    setRemindersEnabled(!remindersEnabled);
    // In a real app, this would make an API call
  };

  const handleShare = (method: string) => {
    // In a real app, this would implement actual sharing
    console.log(`Sharing via ${method}`);
    setShowShareModal(false);
  };

  const getRSVPStatusColor = (status: string) => {
    switch (status) {
      case 'attending': return 'bg-green-100 text-green-800 border-green-200';
      case 'not-attending': return 'bg-red-100 text-red-800 border-red-200';
      case 'maybe': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-600" />;
      case 'image': return <Image className="w-5 h-5 text-blue-600" />;
      case 'video': return <Video className="w-5 h-5 text-purple-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/parent/events"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Event Details</h1>
          <p className="text-gray-600">Complete information about this event</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Event Header */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6 lg:p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl border ${getCategoryColor(event.category)}`}>
                  {getCategoryIcon(event.category)}
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <span className={`px-3 py-1 rounded-full font-medium border ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full font-medium border ${getPriorityColor(event.priority)}`}>
                      {event.priority} priority
                    </span>
                    <span className="px-3 py-1 rounded-full font-medium bg-blue-100 text-blue-800 border-blue-200">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-blue-600">{getTimeUntilEvent(event.date)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleBookmark}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' 
                      : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                  }`}
                >
                  {isBookmarked ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{formatDate(event.date)}</p>
                    <p className="text-sm text-gray-600">{event.startTime} - {event.endTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{event.venue}</p>
                    <p className="text-sm text-gray-600">See map in attachments</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{event.attendeeCount} attending</p>
                    <p className="text-sm text-gray-600">
                      {event.capacity - event.attendeeCount} spots remaining
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{event.organizer}</p>
                    <p className="text-sm text-gray-600">Event organizer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RSVP Status */}
            {event.requiresRegistration && (
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">RSVP Status</h3>
                    <p className="text-sm text-gray-600">
                      Deadline: {formatDate(event.rsvpDeadline)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-lg font-medium border ${getRSVPStatusColor(rsvpStatus)}`}>
                      {rsvpStatus === 'pending' ? 'Response Pending' : 
                       rsvpStatus === 'attending' ? 'Attending' : 
                       rsvpStatus === 'not-attending' ? 'Not Attending' : 'Maybe'}
                    </span>
                    <button
                      onClick={() => setShowRSVPModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Update RSVP
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'details', name: 'Details', icon: Info },
                  { id: 'attendees', name: 'Attendees', icon: Users },
                  { id: 'comments', name: 'Comments', icon: MessageSquare },
                  { id: 'photos', name: 'Photos', icon: Image }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
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
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Full Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Description</h3>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      {event.fullDescription.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-3 whitespace-pre-line">{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Activities & Events</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {event.activities.map((activity, index) => (
                        <div key={index} className="px-3 py-2 bg-blue-50 text-blue-800 rounded-lg text-sm">
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements & Guidelines</h3>
                    <ul className="space-y-2">
                      {event.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weather Information */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Weather & Backup Plan</h3>
                    <div className="space-y-2 text-blue-800">
                      <p><strong>Weather Forecast:</strong> {event.weather.forecast}</p>
                      <p><strong>Backup Plan:</strong> {event.weather.backup}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'attendees' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Event Attendees</h3>
                    <div className="text-sm text-gray-600">
                      {event.attendeeCount} confirmed • {event.capacity - event.attendeeCount} spots remaining
                    </div>
                  </div>

                  {/* Attendance Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{event.attendeeCount}</div>
                      <div className="text-sm text-green-700">Attending</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">23</div>
                      <div className="text-sm text-yellow-700">Maybe</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">15</div>
                      <div className="text-sm text-red-700">Can't Attend</div>
                    </div>
                  </div>

                  {/* Sample Attendees List */}
                  <div className="space-y-3">
                    {[
                      { name: "The Mensah Family", children: ["Kwame Mensah"], status: "attending" },
                      { name: "The Asante Family", children: ["Kofi Asante", "Ama Asante"], status: "attending" },
                      { name: "The Boateng Family", children: ["Akwasi Boateng"], status: "maybe" },
                      { name: "The Adjei Family", children: ["Efua Adjei"], status: "attending" }
                    ].map((attendee, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{attendee.name}</p>
                          <p className="text-sm text-gray-600">
                            Children: {attendee.children.join(", ")}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRSVPStatusColor(attendee.status)}`}>
                          {attendee.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Comments & Questions</h3>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Add Comment
                    </button>
                  </div>

                  {/* Sample Comments */}
                  <div className="space-y-4">
                    {[
                      {
                        author: "Sarah Mensah",
                        time: "2 hours ago",
                        content: "What time should we arrive for the opening ceremony? Also, will there be parking available?",
                        replies: 1
                      },
                      {
                        author: "Coach Amankwah",
                        time: "1 hour ago",
                        content: "Please arrive by 8:00 AM for registration. Parking will be available in the school compound and adjacent field. Volunteers will guide you!",
                        replies: 0,
                        isOrganizer: true
                      },
                      {
                        author: "John Asante",
                        time: "30 minutes ago",
                        content: "Can parents participate in any of the activities? My children are very excited!",
                        replies: 0
                      }
                    ].map((comment, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">
                                {comment.author.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 flex items-center gap-2">
                                {comment.author}
                                {comment.isOrganizer && (
                                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    Organizer
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-gray-600">{comment.time}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{comment.content}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                            <ThumbsUp className="w-4 h-4" />
                            Like
                          </button>
                          <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                            <MessageSquare className="w-4 h-4" />
                            Reply
                          </button>
                          {comment.replies > 0 && (
                            <span className="text-gray-500">{comment.replies} reply</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Event Photos</h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-4 h-4" />
                      Upload Photos
                    </button>
                  </div>

                  {/* Photo Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.images.map((image, index) => (
                      <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <Image className="w-12 h-12 text-gray-400" />
                        </div>
                      </div>
                    ))}
                    {/* Placeholder for more photos */}
                    <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 transition-colors cursor-pointer">
                      <div className="text-center">
                        <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Add Photo</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowRSVPModal(true)}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Update RSVP
              </button>
              <button
                onClick={toggleReminders}
                className={`w-full px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  remindersEnabled
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {remindersEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                {remindersEnabled ? 'Reminders On' : 'Enable Reminders'}
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Add to Calendar
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Organizer</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">{event.contactPerson.name}</p>
                  <p className="text-sm text-gray-600">{event.contactPerson.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <a
                  href={`tel:${event.contactPerson.phone}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {event.contactPerson.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <a
                  href={`mailto:${event.contactPerson.email}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {event.contactPerson.email}
                </a>
              </div>
            </div>
          </div>

          {/* Attachments */}
          {event.attachments && event.attachments.length > 0 && (
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments & Documents</h3>
              <div className="space-y-3">
                {event.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getFileIcon(attachment.type)}
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{attachment.name}</p>
                        <p className="text-xs text-gray-600">{attachment.size}</p>
                      </div>
                    </div>
                    <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Statistics */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Registration Rate</span>
                <span className="font-medium">{Math.round((event.registered / event.capacity) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Capacity</p>
                  <p className="font-medium">{event.capacity}</p>
                </div>
                <div>
                  <p className="text-gray-600">Registered</p>
                  <p className="font-medium">{event.registered}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Volunteers Needed */}
          <div className="bg-yellow-50 rounded-lg lg:rounded-xl border border-yellow-200 p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Volunteers Needed</h3>
            <p className="text-yellow-800 text-sm mb-4">
              We still need {event.volunteersNeeded - event.volunteers} more volunteers to help make this event successful!
            </p>
            <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              Volunteer to Help
            </button>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {showRSVPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Update RSVP</h3>
              <button 
                onClick={() => setShowRSVPModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Please confirm your attendance for <strong>{event.title}</strong>:
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleRSVP('attending')}
                  className="w-full p-3 text-left border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Yes, I'll attend</p>
                      <p className="text-sm text-green-700">I will be attending this event</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleRSVP('maybe')}
                  className="w-full p-3 text-left border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-900">Maybe</p>
                      <p className="text-sm text-yellow-700">I'm not sure about my availability</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleRSVP('not-attending')}
                  className="w-full p-3 text-left border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-red-900">No, I can't attend</p>
                      <p className="text-sm text-red-700">I will not be attending this event</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Share Event</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleShare('copy')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  <Copy className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Copy Link</span>
                </button>
                <button
                  onClick={() => handleShare('qr')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  <QrCode className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">QR Code</span>
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  <Mail className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Email</span>
                </button>
                <button
                  onClick={() => handleShare('calendar')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  <CalendarIcon className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Calendar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
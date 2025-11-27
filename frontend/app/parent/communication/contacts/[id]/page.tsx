"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  User,
  Users,
  MessageSquare,
  Video,
  Star,
  StarOff,
  BookOpen,
  GraduationCap,
  Award,
  Coffee,
  FileText,
  Send,
  Plus,
  Edit3,
  Settings,
  Bell,
  BellOff,
  Heart,
  Share2,
  Download,
  Upload,
  Search,
  Filter,
  MoreVertical,
  Briefcase,
  Building,
  Globe,
  AlertCircle,
  CheckCircle,
  Info,
  History,
  Calendar as CalendarIcon,
  Clock3,
  PhoneCall,
  MessageCircle,
  VideoOff,
  UserCheck,
  UserX,
  Shield,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Copy,
  Flag,
  Archive,
  Trash2
} from "lucide-react";

export default function ContactDetailPage() {
  const params = useParams();
  const contactId = params.id as string;
  
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'schedule' | 'notes'>('overview');
  const [isStarred, setIsStarred] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  // Sample contact data - in a real app, this would be fetched based on contactId
  const contact = {
    id: parseInt(contactId),
    name: "Mrs. Akosua Mensah",
    title: "Mathematics Teacher",
    department: "Mathematics Department",
    role: "Subject Teacher",
    email: "akosua.mensah@nolexsms.edu.gh",
    phone: "+233 24 567 8901",
    officePhone: "+233 30 123 4567",
    whatsapp: "+233 24 567 8901",
    office: "Block A, Room 204",
    avatar: "/avatars/teacher-female-1.jpg",
    status: "available", // available, busy, offline, in_class
    lastSeen: "2025-01-15T10:30:00Z",
    
    // Professional Information
    qualifications: [
      "BSc Mathematics - University of Ghana",
      "MEd Curriculum Studies - University of Cape Coast",
      "Diploma in Educational Psychology"
    ],
    experience: "8 years teaching experience",
    specializations: ["Pure Mathematics", "Applied Mathematics", "Statistics", "Mathematical Modeling"],
    subjects: ["Mathematics", "Additional Mathematics", "Statistics"],
    classes: ["JHS 1A", "JHS 2B", "JHS 3A", "JHS 3C"],
    
    // Contact Preferences
    preferences: {
      bestTimeToContact: "9:00 AM - 11:00 AM, 2:00 PM - 4:00 PM",
      preferredMethod: "email", // email, phone, whatsapp, in_person
      responseTime: "Usually responds within 24 hours",
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      officeHours: {
        monday: "10:00 AM - 12:00 PM",
        tuesday: "2:00 PM - 4:00 PM", 
        wednesday: "10:00 AM - 12:00 PM",
        thursday: "2:00 PM - 4:00 PM",
        friday: "10:00 AM - 11:00 AM"
      }
    },
    
    // Relationship to your children
    relationships: [
      {
        childName: "Kwame Mensah",
        class: "JHS 2B",
        subject: "Mathematics",
        relationship: "Subject Teacher",
        since: "2024-09-01",
        performance: "excellent" // excellent, good, average, needs_improvement
      }
    ],
    
    // Communication history
    communications: [
      {
        id: 1,
        type: "email",
        subject: "Kwame's Mathematics Progress",
        date: "2025-01-10T14:30:00Z",
        status: "read",
        preview: "I wanted to update you on Kwame's excellent progress in mathematics this term...",
        priority: "normal"
      },
      {
        id: 2,
        type: "phone",
        subject: "Parent-Teacher Conference Request",
        date: "2025-01-05T16:15:00Z",
        status: "completed",
        duration: "15 minutes",
        notes: "Discussed Kwame's preparation for upcoming exams and additional practice materials."
      },
      {
        id: 3,
        type: "meeting",
        subject: "Academic Performance Review",
        date: "2024-12-15T11:00:00Z",
        status: "completed",
        location: "Teacher's Office",
        duration: "30 minutes",
        attendees: ["Mrs. Mensah", "Mr. John Mensah", "Mrs. Sarah Mensah"]
      }
    ],
    
    // Upcoming events/meetings
    upcomingEvents: [
      {
        id: 1,
        type: "meeting",
        title: "Parent-Teacher Conference",
        date: "2025-01-20T15:00:00Z",
        duration: "30 minutes",
        location: "Block A, Room 204",
        status: "scheduled"
      },
      {
        id: 2,
        type: "class",
        title: "Open Class Observation",
        date: "2025-01-25T10:00:00Z",
        subject: "Mathematics",
        class: "JHS 2B",
        status: "invited"
      }
    ],
    
    // Notes from parent
    notes: [
      {
        id: 1,
        content: "Very supportive teacher. Always responds promptly to questions about homework.",
        date: "2025-01-12T09:00:00Z",
        type: "general"
      },
      {
        id: 2,
        content: "Discussed extra tutoring options during our last meeting. Kwame is improving steadily.",
        date: "2024-12-15T11:30:00Z",
        type: "academic"
      }
    ],
    
    // Statistics
    stats: {
      totalCommunications: 15,
      emailsSent: 8,
      phoneCallsMade: 4,
      meetingsHeld: 3,
      averageResponseTime: "18 hours",
      lastContactDate: "2025-01-10"
    },
    
    // Additional info
    achievements: [
      "Best Mathematics Teacher Award 2024",
      "Outstanding Dedication to Student Success 2023"
    ],
    languages: ["English", "Twi", "Ga"],
    hobbies: ["Reading", "Chess", "Gardening"],
    socialMedia: {
      linkedin: "https://linkedin.com/in/akosua-mensah",
      twitter: "@MrsMensahMath"
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100 border-green-200';
      case 'busy': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'in_class': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'offline': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'busy': return <AlertCircle className="w-4 h-4" />;
      case 'in_class': return <BookOpen className="w-4 h-4" />;
      case 'offline': return <UserX className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  const handleStarToggle = () => {
    setIsStarred(!isStarred);
    // In a real app, this would update the backend
  };

  const initiateContact = (method: string) => {
    switch (method) {
      case 'email':
        window.open(`mailto:${contact.email}?subject=Regarding ${contact.relationships[0]?.childName}`);
        break;
      case 'phone':
        window.open(`tel:${contact.phone}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${contact.whatsapp.replace(/\s+/g, '').replace('+', '')}`);
        break;
      case 'office':
        window.open(`tel:${contact.officePhone}`);
        break;
    }
    setShowContactOptions(false);
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/parent/communication"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Contact Details</h1>
          <p className="text-gray-600">Teacher and staff contact information</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleStarToggle}
            className={`p-2 rounded-lg transition-colors ${
              isStarred 
                ? 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200' 
                : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
            }`}
          >
            {isStarred ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
          </button>
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Contact Header */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6 lg:p-8">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${getStatusColor(contact.status)}`}>
                  {getStatusIcon(contact.status)}
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{contact.name}</h2>
                    <p className="text-lg text-blue-600 font-medium">{contact.title}</p>
                    <p className="text-gray-600">{contact.department}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(contact.status)}`}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1).replace('_', ' ')}
                  </span>
                </div>

                {/* Contact Methods */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Mobile</p>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Office</p>
                      <p className="text-gray-600 text-sm">{contact.office}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Last Seen</p>
                      <p className="text-gray-600 text-sm">{formatRelativeTime(contact.lastSeen)}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <button
                      onClick={() => setShowContactOptions(!showContactOptions)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Contact Now
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {showContactOptions && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => initiateContact('email')}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100"
                        >
                          <Mail className="w-4 h-4 text-gray-500" />
                          Send Email
                        </button>
                        <button
                          onClick={() => initiateContact('phone')}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100"
                        >
                          <Phone className="w-4 h-4 text-gray-500" />
                          Call Mobile
                        </button>
                        <button
                          onClick={() => initiateContact('office')}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100"
                        >
                          <Building className="w-4 h-4 text-gray-500" />
                          Call Office
                        </button>
                        <button
                          onClick={() => initiateContact('whatsapp')}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                        >
                          <MessageSquare className="w-4 h-4 text-gray-500" />
                          WhatsApp
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setShowScheduleForm(true)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Meeting
                  </button>
                  
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Video Call
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', name: 'Overview', icon: Info },
                  { id: 'history', name: 'Communication History', icon: History },
                  { id: 'schedule', name: 'Schedule & Availability', icon: Calendar },
                  { id: 'notes', name: 'My Notes', icon: FileText }
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
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Relationship with Children */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Relationship with Your Children</h3>
                    <div className="space-y-3">
                      {contact.relationships.map((rel, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{rel.childName}</p>
                              <p className="text-sm text-gray-600">{rel.class} • {rel.subject}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-blue-600">{rel.relationship}</p>
                            <p className="text-sm text-gray-600">Since {new Date(rel.since).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Qualifications</h4>
                        <ul className="space-y-1">
                          {contact.qualifications.map((qual, index) => (
                            <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {qual}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Subjects & Classes</h4>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Subjects:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {contact.subjects.map((subject, index) => (
                                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Classes:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {contact.classes.map((cls, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  {cls}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {contact.specializations.map((spec, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Preferences</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-yellow-900">Best Time to Contact</p>
                          <p className="text-yellow-800 text-sm">{contact.preferences.bestTimeToContact}</p>
                        </div>
                        <div>
                          <p className="font-medium text-yellow-900">Preferred Method</p>
                          <p className="text-yellow-800 text-sm capitalize">{contact.preferences.preferredMethod}</p>
                        </div>
                        <div>
                          <p className="font-medium text-yellow-900">Response Time</p>
                          <p className="text-yellow-800 text-sm">{contact.preferences.responseTime}</p>
                        </div>
                        <div>
                          <p className="font-medium text-yellow-900">Available Days</p>
                          <p className="text-yellow-800 text-sm">{contact.preferences.availableDays.join(", ")}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  {contact.achievements.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements & Recognition</h3>
                      <div className="space-y-2">
                        {contact.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <Award className="w-5 h-5 text-orange-600" />
                            <span className="text-orange-900">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {contact.languages.map((lang, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Experience</h4>
                        <p className="text-gray-700 text-sm">{contact.experience}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Communication History</h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-4 h-4" />
                      New Communication
                    </button>
                  </div>

                  {/* Communication Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{contact.stats.totalCommunications}</div>
                      <div className="text-sm text-blue-700">Total Contacts</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{contact.stats.emailsSent}</div>
                      <div className="text-sm text-green-700">Emails</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{contact.stats.phoneCallsMade}</div>
                      <div className="text-sm text-purple-700">Phone Calls</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{contact.stats.meetingsHeld}</div>
                      <div className="text-sm text-orange-700">Meetings</div>
                    </div>
                  </div>

                  {/* Communication Timeline */}
                  <div className="space-y-4">
                    {contact.communications.map((comm) => (
                      <div key={comm.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            {getCommunicationIcon(comm.type)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{comm.subject}</h4>
                            <span className="text-sm text-gray-500">{formatDate(comm.date)}</span>
                          </div>
                          {comm.preview && (
                            <p className="text-gray-700 text-sm mb-2">{comm.preview}</p>
                          )}
                          {comm.notes && (
                            <p className="text-gray-700 text-sm mb-2">{comm.notes}</p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="capitalize">{comm.type}</span>
                            {comm.duration && <span>Duration: {comm.duration}</span>}
                            {comm.location && <span>Location: {comm.location}</span>}
                            {comm.status && (
                              <span className={`px-2 py-1 rounded-full ${
                                comm.status === 'completed' ? 'bg-green-100 text-green-800' :
                                comm.status === 'read' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {comm.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Schedule & Availability</h3>
                    <button
                      onClick={() => setShowScheduleForm(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Schedule Meeting
                    </button>
                  </div>

                  {/* Office Hours */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Office Hours</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(contact.preferences.officeHours).map(([day, hours]) => (
                        <div key={day} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="font-medium text-green-900 capitalize">{day}</div>
                          <div className="text-green-800 text-sm">{hours}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Events */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Upcoming Events & Meetings</h4>
                    {contact.upcomingEvents.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No upcoming events scheduled</p>
                    ) : (
                      <div className="space-y-3">
                        {contact.upcomingEvents.map((event) => (
                          <div key={event.id} className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              {event.type === 'meeting' ? <Users className="w-5 h-5 text-blue-600" /> : <BookOpen className="w-5 h-5 text-blue-600" />}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-blue-900">{event.title}</h5>
                              <div className="flex items-center gap-4 text-sm text-blue-700">
                                <span>{formatDate(event.date)}</span>
                                {event.duration && <span>Duration: {event.duration}</span>}
                                {event.location && <span>Location: {event.location}</span>}
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              event.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                              event.status === 'invited' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {event.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">My Notes about {contact.name}</h3>
                    <button
                      onClick={() => setShowNoteForm(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Note
                    </button>
                  </div>

                  {/* Notes List */}
                  {contact.notes.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No notes yet. Add your first note to keep track of important information.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {contact.notes.map((note) => (
                        <div key={note.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              note.type === 'academic' ? 'bg-blue-100 text-blue-800' :
                              note.type === 'behavioral' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {note.type}
                            </span>
                            <span className="text-xs text-gray-500">{formatDate(note.date)}</span>
                          </div>
                          <p className="text-gray-900">{note.content}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Response Time</span>
                <span className="font-medium">{contact.stats.averageResponseTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Contact</span>
                <span className="font-medium">{contact.stats.lastContactDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Messages</span>
                <span className="font-medium">{contact.stats.totalCommunications}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Send Email
              </button>
              <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </button>
              <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                <Video className="w-4 h-4" />
                Video Call
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Meeting
              </button>
            </div>
          </div>

          {/* Contact Preferences Summary */}
          <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">Contact Tips</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span className="text-yellow-800">Best contacted via {contact.preferences.preferredMethod}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span className="text-yellow-800">{contact.preferences.responseTime}</span>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span className="text-yellow-800">Available: {contact.preferences.availableDays.join(", ")}</span>
              </div>
            </div>
          </div>

          {/* Children Taught */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Your Children</h3>
            <div className="space-y-3">
              {contact.relationships.map((rel, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">{rel.childName}</p>
                    <p className="text-sm text-blue-700">{rel.class} • {rel.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
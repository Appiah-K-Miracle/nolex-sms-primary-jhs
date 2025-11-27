"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  MessageSquare,
  User,
  Phone,
  Mail,
  Clock,
  Send,
  Paperclip,
  Image,
  FileText,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  MoreVertical,
  Download,
  Eye,
  EyeOff,
  Flag,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar,
  MapPin,
  Search,
  Filter,
  RefreshCw,
  X,
  ChevronDown,
  ChevronUp,
  BookOpen,
  GraduationCap,
  Activity,
  Target
} from "lucide-react";

export default function MessageDetailPage() {
  const params = useParams();
  const messageId = params.id as string;
  
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [messageStatus, setMessageStatus] = useState("unread");

  // Sample message thread data
  const messageThread = {
    id: parseInt(messageId),
    subject: "Mathematics Performance and Study Recommendations",
    participants: [
      {
        id: 1,
        name: "Mr. Asante",
        role: "Mathematics Teacher",
        email: "asante@nolexsms.edu.gh",
        phone: "+233 24 123 4567",
        photo: "/images/teachers/teacher1.jpg",
        department: "Mathematics Department"
      },
      {
        id: 2,
        name: "Parent - Kwame Mensah",
        role: "Parent",
        email: "parent@example.com",
        phone: "+233 24 987 6543",
        photo: "/images/parents/parent1.jpg",
        department: null
      }
    ],
    student: {
      name: "Kwame Mensah",
      class: "JHS 2A",
      studentId: "STU001"
    },
    messages: [
      {
        id: 1,
        senderId: 1,
        senderName: "Mr. Asante",
        senderRole: "Mathematics Teacher",
        timestamp: "2025-11-10T14:30:00Z",
        content: "Dear Parent,\n\nI hope this message finds you well. I wanted to discuss Kwame's recent performance in Mathematics and share some observations and recommendations.\n\nKwame has shown excellent understanding of algebraic concepts and consistently participates well in class discussions. However, I've noticed he struggles with word problems and time management during tests.\n\nHere are my recommendations:\n1. Practice more word problems at home\n2. Work on reading comprehension skills\n3. Time management techniques during exams\n\nI would like to schedule a meeting to discuss his progress in more detail. Please let me know your availability.\n\nBest regards,\nMr. Asante\nMathematics Teacher",
        attachments: [
          {
            id: 1,
            name: "Kwame_Mathematics_Report.pdf",
            type: "pdf",
            size: "245 KB",
            url: "/attachments/report1.pdf"
          },
          {
            id: 2,
            name: "Practice_Problems.pdf",
            type: "pdf",
            size: "180 KB",
            url: "/attachments/practice1.pdf"
          }
        ],
        readAt: "2025-11-10T16:45:00Z",
        replied: true,
        priority: "normal",
        category: "academic"
      },
      {
        id: 2,
        senderId: 2,
        senderName: "Parent - Kwame Mensah",
        senderRole: "Parent",
        timestamp: "2025-11-11T09:15:00Z",
        content: "Dear Mr. Asante,\n\nThank you for your detailed message and the helpful recommendations. I really appreciate your attention to Kwame's progress.\n\nI've noticed the same struggles with word problems at home. He often gets confused when the math is embedded in lengthy text. I've been helping him with homework, but clearly we need a more structured approach.\n\nI'm available for a meeting next week. Would Tuesday afternoon (November 19th) around 3:00 PM work for you? I can come to school or we can have a phone call, whichever is more convenient.\n\nAlso, could you recommend any specific resources or textbooks for word problem practice?\n\nThank you again for your dedication to helping Kwame improve.\n\nBest regards,\nKwame's Parent",
        attachments: [],
        readAt: "2025-11-11T10:30:00Z",
        replied: true,
        priority: "normal",
        category: "academic"
      },
      {
        id: 3,
        senderId: 1,
        senderName: "Mr. Asante",
        senderRole: "Mathematics Teacher",
        timestamp: "2025-11-12T11:20:00Z",
        content: "Dear Parent,\n\nPerfect! Tuesday, November 19th at 3:00 PM works well for me. Let's meet in my office (Room 12, Mathematics Department). If you prefer a phone call, please let me know.\n\nFor word problem resources, I recommend:\n1. \"Mathematics in Real Life\" - JHS Edition\n2. The practice worksheets I attached in my previous message\n3. Online platform: MathPractice.com.gh (I can provide login details)\n\nI'll also prepare a detailed progress report and some additional practice materials for our meeting.\n\nOne more thing - Kwame mentioned he enjoys using the computer for learning. We have an educational math software that might help him visualize problems better. I'll demonstrate this during our meeting.\n\nLooking forward to our discussion.\n\nBest regards,\nMr. Asante",
        attachments: [
          {
            id: 3,
            name: "Additional_Practice_Worksheets.pdf",
            type: "pdf",
            size: "320 KB",
            url: "/attachments/worksheets1.pdf"
          }
        ],
        readAt: null,
        replied: false,
        priority: "normal",
        category: "academic"
      }
    ],
    threadStats: {
      totalMessages: 3,
      unreadCount: 1,
      lastActivity: "2025-11-12T11:20:00Z",
      createdAt: "2025-11-10T14:30:00Z"
    },
    tags: ["Mathematics", "Academic Performance", "Parent Meeting", "Study Resources"],
    relatedSubjects: ["Mathematics"],
    urgencyLevel: "medium",
    followUpRequired: true,
    scheduledMeeting: {
      date: "2025-11-19",
      time: "15:00",
      location: "Room 12, Mathematics Department",
      status: "scheduled"
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    
    setIsReplying(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, this would send to an API
    console.log("Reply sent:", replyText);
    
    setReplyText("");
    setShowReplyForm(false);
    setIsReplying(false);
  };

  const handleMarkAsRead = () => {
    setMessageStatus("read");
  };

  const getMessageTypeIcon = (category: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'behavioral': return <User className="w-4 h-4 text-orange-600" />;
      case 'administrative': return <FileText className="w-4 h-4 text-purple-600" />;
      case 'emergency': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-700 bg-red-100 border-red-200';
      case 'medium': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'low': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-600" />;
      case 'image': return <Image className="w-5 h-5 text-green-600" />;
      default: return <Paperclip className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/parent/communication/messages"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {getMessageTypeIcon(messageThread.messages[0].category)}
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{messageThread.subject}</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Student: {messageThread.student.name}</span>
            <span>•</span>
            <span>Class: {messageThread.student.class}</span>
            <span>•</span>
            <span>{messageThread.threadStats.totalMessages} messages</span>
            {messageThread.threadStats.unreadCount > 0 && (
              <>
                <span>•</span>
                <span className="text-blue-600 font-medium">{messageThread.threadStats.unreadCount} unread</span>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleMarkAsRead}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Mark Read</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Archive className="w-4 h-4" />
            <span className="hidden sm:inline">Archive</span>
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
        {/* Main Message Thread */}
        <div className="xl:col-span-3">
          <div className="space-y-4">
            {messageThread.messages.map((message, index) => (
              <div key={message.id} className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
                {/* Message Header */}
                <div className="flex items-start justify-between p-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{message.senderName}</h3>
                        <span className="text-sm text-blue-600">{message.senderRole}</span>
                        {!message.readAt && message.senderId !== 2 && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{formatTimestamp(message.timestamp)}</span>
                        {message.readAt && (
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            Read {formatTimestamp(message.readAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(message.priority)}`}>
                      {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Message Content */}
                <div className="p-6">
                  <div className="prose max-w-none">
                    <div className="text-gray-900 whitespace-pre-line leading-relaxed">
                      {message.content}
                    </div>
                  </div>

                  {/* Attachments */}
                  {message.attachments.length > 0 && (
                    <div className="mt-6 border-t border-gray-100 pt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Attachments ({message.attachments.length})</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            {getFileIcon(attachment.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                              <p className="text-xs text-gray-600">{attachment.size}</p>
                            </div>
                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Actions */}
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setShowReplyForm(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Reply className="w-4 h-4" />
                      Reply
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Forward className="w-4 h-4" />
                      Forward
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Star className="w-4 h-4" />
                      Star
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Reply to {messageThread.messages[messageThread.messages.length - 1].senderName}</h3>
                <button
                  onClick={() => setShowReplyForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Image className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowReplyForm(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReply}
                      disabled={!replyText.trim() || isReplying}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isReplying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Reply
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Thread Information */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thread Information</h3>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">Created:</span>
                <span className="block font-medium text-gray-900">
                  {formatTimestamp(messageThread.threadStats.createdAt)}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Last Activity:</span>
                <span className="block font-medium text-gray-900">
                  {formatTimestamp(messageThread.threadStats.lastActivity)}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Urgency Level:</span>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ml-2 ${getPriorityColor(messageThread.urgencyLevel)}`}>
                  {messageThread.urgencyLevel.charAt(0).toUpperCase() + messageThread.urgencyLevel.slice(1)}
                </span>
              </div>
              {messageThread.followUpRequired && (
                <div className="flex items-center gap-2 text-sm text-orange-600">
                  <Flag className="w-4 h-4" />
                  <span>Follow-up required</span>
                </div>
              )}
            </div>
          </div>

          {/* Participants */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Participants</h3>
            <div className="space-y-4">
              {messageThread.participants.map((participant) => (
                <div key={participant.id} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{participant.name}</div>
                    <div className="text-sm text-blue-600">{participant.role}</div>
                    {participant.department && (
                      <div className="text-xs text-gray-600">{participant.department}</div>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        Email
                      </button>
                      <button className="text-xs text-green-600 hover:text-green-800 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        Call
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Meeting */}
          {messageThread.scheduledMeeting && (
            <div className="bg-green-50 rounded-lg lg:rounded-xl border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Scheduled Meeting
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-800">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(messageThread.scheduledMeeting.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-green-800">
                  <Clock className="w-4 h-4" />
                  <span>{messageThread.scheduledMeeting.time}</span>
                </div>
                <div className="flex items-center gap-2 text-green-800">
                  <MapPin className="w-4 h-4" />
                  <span>{messageThread.scheduledMeeting.location}</span>
                </div>
                <div className="mt-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
                    {messageThread.scheduledMeeting.status.charAt(0).toUpperCase() + messageThread.scheduledMeeting.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Related Subjects */}
          <div className="bg-blue-50 rounded-lg lg:rounded-xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Related Subjects</h3>
            <div className="flex flex-wrap gap-2">
              {messageThread.relatedSubjects.map((subject, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full border border-blue-200">
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {messageThread.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Schedule Meeting</div>
                    <div className="text-sm text-gray-600">Book a discussion time</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">Request Call</div>
                    <div className="text-sm text-gray-600">Ask for a phone conversation</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-gray-900">View Reports</div>
                    <div className="text-sm text-gray-600">Access related academic reports</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
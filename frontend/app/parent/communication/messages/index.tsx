"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft,
  MessageSquare,
  Send,
  Paperclip,
  Smile,
  Bold,
  Italic,
  Underline,
  List,
  Link2,
  Image,
  FileText,
  X,
  Plus,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Flag,
  Archive,
  Trash2,
  Reply,
  Forward,
  MoreHorizontal,
  Edit,
  Copy,
  Download,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Search,
  Filter,
  Calendar,
  Phone,
  Mail,
  UserPlus,
  Settings,
  RefreshCw,
  Mic,
  Camera,
  Video,
  MapPin,
  Hash,
  AtSign
} from "lucide-react";

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showComposer, setShowComposer] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  // Sample messages data with full conversation threads
  const messages = [
    {
      id: 1,
      subject: "Kwame's Progress Update",
      participants: [
        { id: 1, name: "Mr. Osei", role: "Mathematics Teacher", email: "osei@nolexsms.edu.gh" },
        { id: 2, name: "Parent", role: "Parent", email: "parent@example.com" }
      ],
      lastMessage: "Thank you for the update. I'll work with Kwame on word problems at home.",
      timestamp: "2025-11-15 09:30 AM",
      unread: true,
      priority: "normal",
      childName: "Kwame Mensah",
      hasAttachment: false,
      conversation: [
        {
          id: 1,
          senderId: 1,
          senderName: "Mr. Osei",
          message: "Good morning! I wanted to update you on Kwame's excellent progress in algebra. He has shown remarkable improvement in solving equations and is now working on more complex problems. However, I've noticed he sometimes struggles with word problems. I'd recommend some additional practice at home.",
          timestamp: "2025-11-14 02:15 PM",
          attachments: [],
          reactions: []
        },
        {
          id: 2,
          senderId: 2,
          senderName: "Parent",
          message: "Thank you for the update, Mr. Osei. I'm pleased to hear about his progress in algebra. Could you recommend some specific resources for word problems? Also, would it be possible to schedule a brief meeting to discuss his overall performance?",
          timestamp: "2025-11-14 04:30 PM",
          attachments: [],
          reactions: []
        },
        {
          id: 3,
          senderId: 1,
          senderName: "Mr. Osei",
          message: "Absolutely! I'll send you some worksheet links that focus on word problems. For the meeting, I'm available next Tuesday after 3 PM or Wednesday morning. Let me know what works best for you.",
          timestamp: "2025-11-15 08:45 AM",
          attachments: [
            { name: "word_problems_practice.pdf", size: "1.2 MB", type: "pdf" }
          ],
          reactions: []
        }
      ]
    },
    {
      id: 2,
      subject: "Parent-Teacher Conference Schedule",
      participants: [
        { id: 3, name: "School Administration", role: "Administration", email: "admin@nolexsms.edu.gh" },
        { id: 2, name: "Parent", role: "Parent", email: "parent@example.com" }
      ],
      lastMessage: "Your conference is scheduled for November 21st at 2:00 PM.",
      timestamp: "2025-11-14 02:15 PM",
      unread: false,
      priority: "high",
      childName: "All Children",
      hasAttachment: true,
      conversation: [
        {
          id: 1,
          senderId: 3,
          senderName: "School Administration",
          message: "Dear Parents, we're scheduling parent-teacher conferences for next week. Please find the attached schedule and confirm your availability. Conferences will be held in person in the main building.",
          timestamp: "2025-11-14 02:15 PM",
          attachments: [
            { name: "conference_schedule.pdf", size: "856 KB", type: "pdf" }
          ],
          reactions: []
        },
        {
          id: 2,
          senderId: 2,
          senderName: "Parent",
          message: "Thank you for the schedule. I can confirm availability for the time slots assigned. Looking forward to discussing my children's progress.",
          timestamp: "2025-11-14 03:45 PM",
          attachments: [],
          reactions: []
        }
      ]
    },
    {
      id: 3,
      subject: "Science Project Collaboration",
      participants: [
        { id: 4, name: "Dr. Mensah", role: "Science Teacher", email: "mensah@nolexsms.edu.gh" },
        { id: 2, name: "Parent", role: "Parent", email: "parent@example.com" }
      ],
      lastMessage: "I'll help him gather the materials this weekend.",
      timestamp: "2025-11-13 11:45 AM",
      unread: false,
      priority: "normal",
      childName: "Kwame Mensah",
      hasAttachment: false,
      conversation: [
        {
          id: 1,
          senderId: 4,
          senderName: "Dr. Mensah",
          message: "Hello! Kwame has chosen an interesting topic for his science project - 'Plant Growth Under Different Light Conditions'. I think this is perfect for his level and interests. He'll need some basic materials like seedlings, different colored lights, and measurement tools. The project deadline is December 1st.",
          timestamp: "2025-11-12 10:30 AM",
          attachments: [],
          reactions: []
        },
        {
          id: 2,
          senderId: 2,
          senderName: "Parent",
          message: "That sounds like a great project! I'll help him gather the materials this weekend. Could you send me a detailed list of what he needs? Also, are there any safety considerations I should be aware of?",
          timestamp: "2025-11-12 02:20 PM",
          attachments: [],
          reactions: []
        },
        {
          id: 3,
          senderId: 4,
          senderName: "Dr. Mensah",
          message: "Perfect! I'll prepare a detailed materials list. The project is quite safe - just basic observation and measurement. I'll also include some guidance on how to set up the experiment properly.",
          timestamp: "2025-11-13 11:45 AM",
          attachments: [
            { name: "project_materials_list.pdf", size: "445 KB", type: "pdf" },
            { name: "setup_guide.pdf", size: "1.1 MB", type: "pdf" }
          ],
          reactions: []
        }
      ]
    }
  ];

  // Teacher contacts for new message
  const teacherContacts = [
    { id: 1, name: "Mr. Osei", role: "Mathematics Teacher", email: "osei@nolexsms.edu.gh", subjects: ["Mathematics"] },
    { id: 2, name: "Mrs. Addo", role: "English Teacher", email: "addo@nolexsms.edu.gh", subjects: ["English Language"] },
    { id: 3, name: "Dr. Mensah", role: "Science Teacher", email: "mensah@nolexsms.edu.gh", subjects: ["Science"] },
    { id: 4, name: "Mrs. Appiah", role: "Class Teacher", email: "appiah@nolexsms.edu.gh", subjects: ["General Studies"] },
    { id: 5, name: "School Administration", role: "Administration", email: "admin@nolexsms.edu.gh", subjects: ["Administration"] }
  ];

  // Filter messages
  const filteredMessages = messages.filter(message => {
    const searchMatch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       message.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const typeMatch = filterType === "all" || 
                     (filterType === "unread" && message.unread) ||
                     (filterType === "high" && message.priority === "high") ||
                     (filterType === "attachments" && message.hasAttachment);
    
    return searchMatch && typeMatch;
  });

  const handleSendReply = () => {
    if (replyText.trim() && selectedMessage) {
      // Add reply to conversation
      const newReply = {
        id: selectedMessage.conversation.length + 1,
        senderId: 2,
        senderName: "Parent",
        message: replyText,
        timestamp: new Date().toLocaleString(),
        attachments: attachments.map(file => ({
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          type: file.type.split('/')[1]
        })),
        reactions: []
      };
      
      selectedMessage.conversation.push(newReply);
      setReplyText("");
      setAttachments([]);
    }
  };

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />;
      case 'doc':
      case 'docx': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png': return <Image className="w-4 h-4 text-green-500" />;
      default: return <Paperclip className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "normal": return "text-blue-600 bg-blue-50 border-blue-200";
      case "low": return "text-gray-600 bg-gray-50 border-gray-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/parent/communication"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Messages</h1>
            <p className="text-blue-100 text-sm lg:text-base">
              Communicate with teachers and school administration
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowComposer(true)}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            New Message
          </button>
          <div className="text-sm text-blue-100">
            {filteredMessages.filter(m => m.unread).length} unread messages
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Search and Filter */}
            <div className="p-4 border-b border-gray-200">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Messages</option>
                  <option value="unread">Unread</option>
                  <option value="high">High Priority</option>
                  <option value="attachments">With Attachments</option>
                </select>
              </div>
            </div>

            {/* Messages List */}
            <div className="max-h-96 lg:max-h-[600px] overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No messages found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedMessage?.id === message.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      } ${message.unread ? 'bg-blue-25' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className={`font-medium truncate ${message.unread ? 'text-blue-900' : 'text-gray-900'}`}>
                              {message.subject}
                            </h4>
                            {message.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {message.participants.find(p => p.role !== 'Parent')?.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate mb-2">{message.lastMessage}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">{formatTimestamp(message.timestamp)}</span>
                            <div className="flex items-center gap-1">
                              {message.hasAttachment && (
                                <Paperclip className="w-3 h-3 text-gray-400" />
                              )}
                              <span className={`px-2 py-0.5 rounded-full font-medium ${getPriorityColor(message.priority)}`}>
                                {message.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-8 xl:col-span-9">
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Message Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>With: {selectedMessage.participants.find(p => p.role !== 'Parent')?.name}</span>
                      <span>•</span>
                      <span>Child: {selectedMessage.childName}</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded-full font-medium ${getPriorityColor(selectedMessage.priority)}`}>
                        {selectedMessage.priority} priority
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Star className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Flag className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Archive className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Conversation */}
              <div className="p-6 max-h-96 lg:max-h-[400px] overflow-y-auto">
                <div className="space-y-6">
                  {selectedMessage.conversation.map((msg: any) => (
                    <div
                      key={msg.id}
                      className={`flex gap-4 ${
                        msg.senderId === 2 ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className={`flex-1 max-w-lg ${msg.senderId === 2 ? 'text-right' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{msg.senderName}</span>
                          <span className="text-xs text-gray-500">{formatTimestamp(msg.timestamp)}</span>
                        </div>
                        <div className={`p-4 rounded-lg ${
                          msg.senderId === 2 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="leading-relaxed">{msg.message}</p>
                          
                          {msg.attachments.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-blue-500/20">
                              <div className="space-y-2">
                                {msg.attachments.map((attachment: any, index: number) => (
                                  <div key={index} className="flex items-center gap-2 text-sm">
                                    {getFileIcon(attachment.type)}
                                    <span>{attachment.name}</span>
                                    <span className="text-xs opacity-75">({attachment.size})</span>
                                    <button className="ml-auto opacity-75 hover:opacity-100">
                                      <Download className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Section */}
              <div className="p-6 border-t border-gray-200">
                <div className="space-y-4">
                  {/* Attachments Preview */}
                  {attachments.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Attachments</span>
                      </div>
                      <div className="space-y-1">
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white rounded p-2">
                            <div className="flex items-center gap-2">
                              {getFileIcon(file.type.split('/')[1])}
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(1)} MB)
                              </span>
                            </div>
                            <button
                              onClick={() => removeAttachment(index)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reply Input */}
                  <div className="border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={4}
                      className="w-full p-4 border-0 rounded-t-lg focus:outline-none resize-none"
                    />
                    
                    {/* Reply Toolbar */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-b-lg border-t border-gray-300">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          id="attachment"
                          multiple
                          onChange={handleFileAttachment}
                          className="hidden"
                        />
                        <label
                          htmlFor="attachment"
                          className="p-2 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                        >
                          <Paperclip className="w-4 h-4" />
                        </label>
                        <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                          <Smile className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a message</h3>
              <p className="text-gray-600">Choose a message from the list to view the conversation</p>
            </div>
          )}
        </div>
      </div>

      {/* New Message Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">New Message</h3>
                <button
                  onClick={() => setShowComposer(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To:</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select recipient...</option>
                  {teacherContacts.map(contact => (
                    <option key={contact.id} value={contact.email}>
                      {contact.name} - {contact.role}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject:</label>
                <input
                  type="text"
                  placeholder="Enter message subject..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Child:</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select child...</option>
                  <option value="kwame">Kwame Mensah</option>
                  <option value="ama">Ama Mensah</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message:</label>
                <textarea
                  rows={6}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Paperclip className="w-4 h-4" />
                  Attach Files
                </button>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowComposer(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
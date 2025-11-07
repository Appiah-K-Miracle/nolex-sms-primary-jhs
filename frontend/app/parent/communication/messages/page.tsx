"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  Video, 
  PaperclipIcon as Paperclip, 
  Star, 
  Archive, 
  Trash2, 
  MoreVertical,
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
  User,
  BookOpen,
  Calendar,
  ArrowLeft,
  Image,
  FileText,
  Smile,
  X,
  ChevronDown,
  Settings
} from "lucide-react";

interface Message {
  id: number;
  sender: {
    name: string;
    role: string;
    avatar?: string;
    subject?: string;
    class?: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  attachments?: Array<{
    name: string;
    type: string;
    size: string;
  }>;
  isOwn: boolean;
  priority?: 'high' | 'medium' | 'low';
  category?: 'academic' | 'behavior' | 'general' | 'event';
}

interface Conversation {
  id: number;
  participant: {
    name: string;
    role: string;
    avatar?: string;
    subject?: string;
    class?: string;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  starred: boolean;
  priority?: 'high' | 'medium' | 'low';
  category?: 'academic' | 'behavior' | 'general' | 'event';
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);

  // Sample conversations data
  const conversations: Conversation[] = [
    {
      id: 1,
      participant: {
        name: "Mr. Osei",
        role: "Mathematics Teacher",
        subject: "Mathematics",
        class: "JHS 2"
      },
      lastMessage: "Kwame showed excellent progress in today's algebra test. We should discuss his potential for advanced mathematics.",
      timestamp: "2025-11-05T14:30:00",
      unreadCount: 2,
      starred: true,
      priority: "high",
      category: "academic"
    },
    {
      id: 2,
      participant: {
        name: "Mrs. Addo",
        role: "English Teacher",
        subject: "English Language",
        class: "JHS 2"
      },
      lastMessage: "Thank you for your support with Kwame's reading assignments. The improvement is noticeable.",
      timestamp: "2025-11-04T16:45:00",
      unreadCount: 0,
      starred: false,
      priority: "medium",
      category: "academic"
    },
    {
      id: 3,
      participant: {
        name: "Dr. Asante",
        role: "Science Teacher",
        subject: "Science",
        class: "JHS 2"
      },
      lastMessage: "Science Fair project submission deadline is next Friday. Please ensure Kwame completes his research.",
      timestamp: "2025-11-03T11:20:00",
      unreadCount: 1,
      starred: false,
      priority: "medium",
      category: "event"
    },
    {
      id: 4,
      participant: {
        name: "Mr. Akoto",
        role: "Class Teacher",
        subject: "General",
        class: "JHS 2"
      },
      lastMessage: "Parent-Teacher meeting scheduled for November 25th. Please confirm your attendance.",
      timestamp: "2025-11-02T09:15:00",
      unreadCount: 0,
      starred: false,
      priority: "high",
      category: "event"
    },
    {
      id: 5,
      participant: {
        name: "Mrs. Tetteh",
        role: "Headmaster",
        subject: "Administration",
        class: "School"
      },
      lastMessage: "School fee reminder for next term. Payment deadline is December 15th.",
      timestamp: "2025-11-01T08:00:00",
      unreadCount: 0,
      starred: false,
      priority: "medium",
      category: "general"
    }
  ];

  // Sample messages for selected conversation
  const getMessages = (conversationId: number): Message[] => {
    const baseMessages: Record<number, Message[]> = {
      1: [
        {
          id: 1,
          sender: {
            name: "Mr. Osei",
            role: "Mathematics Teacher",
            subject: "Mathematics",
            class: "JHS 2"
          },
          content: "Good afternoon! I wanted to discuss Kwame's recent performance in mathematics.",
          timestamp: "2025-11-05T14:00:00",
          read: true,
          starred: false,
          isOwn: false,
          priority: "medium",
          category: "academic"
        },
        {
          id: 2,
          sender: {
            name: "You",
            role: "Parent",
            class: "JHS 2"
          },
          content: "Good afternoon, Mr. Osei. Thank you for reaching out. How is he doing?",
          timestamp: "2025-11-05T14:05:00",
          read: true,
          starred: false,
          isOwn: true,
          category: "academic"
        },
        {
          id: 3,
          sender: {
            name: "Mr. Osei",
            role: "Mathematics Teacher",
            subject: "Mathematics",
            class: "JHS 2"
          },
          content: "Kwame showed excellent progress in today's algebra test. He scored 85% which is a significant improvement from his previous 72%. His problem-solving approach has become more systematic.",
          timestamp: "2025-11-05T14:30:00",
          read: false,
          starred: false,
          isOwn: false,
          priority: "high",
          category: "academic"
        },
        {
          id: 4,
          sender: {
            name: "Mr. Osei",
            role: "Mathematics Teacher",
            subject: "Mathematics",
            class: "JHS 2"
          },
          content: "I believe he has potential for advanced mathematics. Would you like to discuss enrolling him in our accelerated math program?",
          timestamp: "2025-11-05T14:32:00",
          read: false,
          starred: false,
          isOwn: false,
          attachments: [
            { name: "Kwame_Test_Results.pdf", type: "pdf", size: "245 KB" },
            { name: "Advanced_Math_Program.pdf", type: "pdf", size: "180 KB" }
          ],
          priority: "high",
          category: "academic"
        }
      ]
    };
    return baseMessages[conversationId] || [];
  };

  const selectedConversationData = selectedConversation 
    ? conversations.find(c => c.id === selectedConversation)
    : null;

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === "all" || conv.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="w-4 h-4" />;
      case 'behavior': return <User className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowNewMessage(true)}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Conversations List */}
      <div className={`${selectedConversation ? 'hidden lg:flex' : 'flex'} flex-col w-full lg:w-96 bg-white border-r border-gray-200`}>
        {/* Desktop Header */}
        <div className="hidden lg:block p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Messages</h1>
            <button 
              onClick={() => setShowNewMessage(true)}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { id: "all", label: "All" },
              { id: "academic", label: "Academic" },
              { id: "event", label: "Events" },
              { id: "general", label: "General" }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterCategory(filter.id)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  filterCategory === filter.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm lg:text-base font-semibold text-white">
                    {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate text-sm lg:text-base">
                      {conversation.participant.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {conversation.priority && (
                        <div className={`w-2 h-2 rounded-full ${
                          conversation.priority === 'high' ? 'bg-red-500' :
                          conversation.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(conversation.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs lg:text-sm text-gray-600 mb-1">
                    {conversation.participant.role} • {conversation.participant.subject}
                  </p>
                  
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                    {conversation.lastMessage}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(conversation.priority)}`}>
                        {getCategoryIcon(conversation.category)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {conversation.starred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      {conversation.unreadCount > 0 && (
                        <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${selectedConversation ? 'flex' : 'hidden lg:flex'} flex-1 flex flex-col bg-white`}>
        {selectedConversationData ? (
          <>
            {/* Chat Header */}
            <div className="p-4 lg:p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setSelectedConversation(null)}
                    className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm lg:text-base font-semibold text-white">
                      {selectedConversationData.participant.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div>
                    <h2 className="font-semibold text-gray-900 text-sm lg:text-base">
                      {selectedConversationData.participant.name}
                    </h2>
                    <p className="text-xs lg:text-sm text-gray-600">
                      {selectedConversationData.participant.role} • {selectedConversationData.participant.subject}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
              {getMessages(selectedConversation).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.isOwn ? 'order-2' : 'order-1'}`}>
                    <div className={`p-3 lg:p-4 rounded-lg ${
                      message.isOwn 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {!message.isOwn && (
                        <p className="text-xs text-gray-500 mb-1">
                          {message.sender.name} • {message.sender.role}
                        </p>
                      )}
                      
                      <p className="text-sm lg:text-base">{message.content}</p>
                      
                      {message.attachments && (
                        <div className="mt-3 space-y-2">
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className={`flex items-center space-x-2 p-2 rounded-lg ${
                              message.isOwn ? 'bg-blue-500' : 'bg-white'
                            }`}>
                              <FileText className="w-4 h-4" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">{attachment.name}</p>
                                <p className="text-xs opacity-75">{attachment.size}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex items-center mt-1 space-x-1 ${
                      message.isOwn ? 'justify-end' : 'justify-start'
                    }`}>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(message.timestamp)}
                      </span>
                      {message.isOwn && (
                        <div className="text-gray-400">
                          {message.read ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 lg:p-6 border-t border-gray-200 bg-white">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <div className="relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={1}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <Smile className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600 max-w-sm">
                Choose a conversation from the sidebar to start messaging with teachers and school staff.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">New Message</h3>
              <button 
                onClick={() => setShowNewMessage(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To:</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select a teacher...</option>
                  <option value="1">Mr. Osei - Mathematics Teacher</option>
                  <option value="2">Mrs. Addo - English Teacher</option>
                  <option value="3">Dr. Asante - Science Teacher</option>
                  <option value="4">Mr. Akoto - Class Teacher</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject:</label>
                <input 
                  type="text" 
                  placeholder="Message subject..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message:</label>
                <textarea 
                  placeholder="Type your message..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button 
                onClick={() => setShowNewMessage(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
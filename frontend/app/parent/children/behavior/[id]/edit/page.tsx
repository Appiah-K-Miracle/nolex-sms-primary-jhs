"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Save,
  X,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Clock,
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Send,
  Eye,
  Users,
  BookOpen
} from "lucide-react";

export default function ContactTeacherPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.id as string;
  
  // Sample data - In real app, this would be fetched based on childId
  const childData = childId === "1" ? {
    name: "Kwame Mensah",
    class: "Primary 6A",
    rollNumber: "P6A-001"
  } : {
    name: "Ama Mensah",
    class: "Primary 4B", 
    rollNumber: "P4B-015"
  };

  const [formData, setFormData] = useState({
    messageType: "general_inquiry",
    recipient: "class_teacher",
    selectedTeacher: "",
    subject: "",
    message: "",
    priority: "normal",
    requestMeeting: false,
    preferredMeetingDates: [] as string[],
    preferredContactMethod: "email",
    urgent: false,
    specificBehaviorReport: "",
    attachments: [] as File[]
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Sample teachers data
  const teachers = [
    { id: "1", name: "Mr. Osei", subject: "Mathematics", email: "osei@nolex.edu", phone: "+233 20 123 4567", role: "Subject Teacher" },
    { id: "2", name: "Mrs. Asante", subject: "English", email: "asante@nolex.edu", phone: "+233 20 234 5678", role: "Class Teacher" },
    { id: "3", name: "Dr. Mensah", subject: "Science", email: "mensah@nolex.edu", phone: "+233 20 345 6789", role: "Subject Teacher" },
    { id: "4", name: "Ms. Oppong", subject: "Social Studies", email: "oppong@nolex.edu", phone: "+233 20 456 7890", role: "Subject Teacher" },
    { id: "5", name: "Mr. Adjei", subject: "Physical Education", email: "adjei@nolex.edu", phone: "+233 20 567 8901", role: "Subject Teacher" }
  ];

  const messageTypes = [
    { value: "general_inquiry", label: "General Inquiry", description: "General questions about child's progress or behavior" },
    { value: "behavior_concern", label: "Behavior Concern", description: "Discuss specific behavior issues or patterns" },
    { value: "academic_support", label: "Academic Support", description: "Request support for academic challenges" },
    { value: "meeting_request", label: "Meeting Request", description: "Schedule a face-to-face or virtual meeting" },
    { value: "report_clarification", label: "Report Clarification", description: "Seek clarification on a behavior report" },
    { value: "positive_feedback", label: "Positive Feedback", description: "Share positive observations or appreciation" },
    { value: "home_update", label: "Home Situation Update", description: "Inform about changes at home affecting behavior" }
  ];

  const recentBehaviorReports = [
    { id: "1", date: "2025-11-14", title: "Excellent Mathematics Performance", teacher: "Mr. Osei", type: "positive" },
    { id: "2", date: "2025-11-12", title: "Late Assignment Submission", teacher: "Ms. Oppong", type: "concern" },
    { id: "3", date: "2025-11-10", title: "Peer Mediation Success", teacher: "Mr. Adjei", type: "positive" }
  ];

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    if (validFiles.length !== files.length) {
      setErrors(prev => ({
        ...prev,
        attachments: "Some files were rejected. Only JPG, PNG, PDF, and TXT files under 5MB are allowed."
      }));
    }

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles]
    }));
  };

  // Remove file
  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  // Add meeting date
  const addMeetingDate = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const dateString = nextWeek.toISOString().split('T')[0];
    
    if (!formData.preferredMeetingDates.includes(dateString)) {
      setFormData(prev => ({
        ...prev,
        preferredMeetingDates: [...prev.preferredMeetingDates, dateString]
      }));
    }
  };

  // Remove meeting date
  const removeMeetingDate = (date: string) => {
    setFormData(prev => ({
      ...prev,
      preferredMeetingDates: prev.preferredMeetingDates.filter(d => d !== date)
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.messageType) {
      newErrors.messageType = "Please select a message type";
    }

    if (!formData.recipient) {
      newErrors.recipient = "Please select a recipient";
    }

    if (formData.recipient === "specific_teacher" && !formData.selectedTeacher) {
      newErrors.selectedTeacher = "Please select a specific teacher";
    }

    if (!formData.subject || formData.subject.length < 5) {
      newErrors.subject = "Subject must be at least 5 characters long";
    }

    if (!formData.message || formData.message.length < 20) {
      newErrors.message = "Message must be at least 20 characters long";
    }

    if (formData.message.length > 1000) {
      newErrors.message = "Message must be 1000 characters or less";
    }

    if (formData.requestMeeting && formData.preferredMeetingDates.length === 0) {
      newErrors.preferredMeetingDates = "Please provide at least one preferred meeting date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      setShowSuccessMessage(true);
      
      // Auto-hide success message and redirect after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        router.push(`/parent/children/behavior/${childId}`);
      }, 3000);
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: "Failed to send message. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview Modal
  const PreviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Preview Message</h3>
            <button
              onClick={() => setShowPreview(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">From:</span>
                <div className="font-medium">Mrs. Akosua Mensah (Parent)</div>
              </div>
              <div>
                <span className="text-gray-500">To:</span>
                <div className="font-medium">
                  {formData.recipient === "class_teacher" ? "Class Teacher" :
                   formData.recipient === "all_teachers" ? "All Teachers" :
                   teachers.find(t => t.id === formData.selectedTeacher)?.name || "Selected Teacher"}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Student:</span>
                <div className="font-medium">{childData.name} ({childData.rollNumber})</div>
              </div>
              <div>
                <span className="text-gray-500">Priority:</span>
                <div className={`font-medium capitalize ${
                  formData.priority === "high" ? "text-red-600" :
                  formData.priority === "medium" ? "text-yellow-600" : "text-green-600"
                }`}>
                  {formData.priority}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Subject</h4>
            <p className="text-gray-700 bg-gray-50 rounded p-3">{formData.subject}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Message</h4>
            <div className="text-gray-700 bg-gray-50 rounded p-3 whitespace-pre-wrap">{formData.message}</div>
          </div>
          
          {formData.requestMeeting && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Meeting Request</h4>
              <div className="bg-blue-50 rounded p-3">
                <p className="text-blue-800 text-sm mb-2">Preferred meeting dates:</p>
                <ul className="list-disc list-inside text-blue-700 text-sm">
                  {formData.preferredMeetingDates.map((date, index) => (
                    <li key={index}>{new Date(date).toLocaleDateString()}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {formData.attachments.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
              <ul className="text-sm text-gray-600 bg-gray-50 rounded p-3">
                {formData.attachments.map((file, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Edit
          </button>
          <button
            onClick={() => {
              setShowPreview(false);
              handleSubmit(new Event('submit') as any);
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              href={`/parent/children/behavior/${childId}`}
              className="mr-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold">Contact Teacher</h1>
              <p className="text-purple-100 text-sm lg:text-base xl:text-lg">
                {childData.name} • {childData.class} • {childData.rollNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-green-800 font-medium">Message sent successfully!</p>
            <p className="text-green-700 text-sm">The teacher will receive your message and respond within 24-48 hours. Redirecting...</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Message Type & Recipient */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Message Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What is this message about? *
                  </label>
                  <div className="space-y-3">
                    {messageTypes.map((type) => (
                      <label key={type.value} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="messageType"
                          value={type.value}
                          checked={formData.messageType === type.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, messageType: e.target.value }))}
                          className="mt-1 w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{type.label}</div>
                          <div className="text-sm text-gray-600">{type.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.messageType && (
                    <p className="text-red-600 text-sm mt-1">{errors.messageType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Who would you like to contact? *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="recipient"
                        value="class_teacher"
                        checked={formData.recipient === "class_teacher"}
                        onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Class Teacher</div>
                        <div className="text-sm text-gray-600">Send to the main class teacher</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="recipient"
                        value="specific_teacher"
                        checked={formData.recipient === "specific_teacher"}
                        onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <BookOpen className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Specific Subject Teacher</div>
                        <div className="text-sm text-gray-600">Send to a particular subject teacher</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="recipient"
                        value="all_teachers"
                        checked={formData.recipient === "all_teachers"}
                        onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">All Teachers</div>
                        <div className="text-sm text-gray-600">Send to all teachers teaching this child</div>
                      </div>
                    </label>
                  </div>
                  {errors.recipient && (
                    <p className="text-red-600 text-sm mt-1">{errors.recipient}</p>
                  )}
                </div>

                {formData.recipient === "specific_teacher" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Teacher *
                    </label>
                    <select
                      value={formData.selectedTeacher}
                      onChange={(e) => setFormData(prev => ({ ...prev, selectedTeacher: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                        errors.selectedTeacher ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a teacher</option>
                      {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} - {teacher.subject} ({teacher.role})
                        </option>
                      ))}
                    </select>
                    {errors.selectedTeacher && (
                      <p className="text-red-600 text-sm mt-1">{errors.selectedTeacher}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Message Content */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Message Content</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter a clear, descriptive subject line"
                  />
                  {errors.subject && (
                    <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={8}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Please provide detailed information about your inquiry, concern, or request. Be specific about any incidents, behaviors, or observations you'd like to discuss."
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message && (
                      <p className="text-red-600 text-sm">{errors.message}</p>
                    )}
                    <p className="text-xs text-gray-500 ml-auto">
                      {formData.message.length}/1000 characters
                    </p>
                  </div>
                </div>

                {formData.messageType === "report_clarification" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Related Behavior Report
                    </label>
                    <select
                      value={formData.specificBehaviorReport}
                      onChange={(e) => setFormData(prev => ({ ...prev, specificBehaviorReport: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select a behavior report (optional)</option>
                      {recentBehaviorReports.map(report => (
                        <option key={report.id} value={report.id}>
                          {report.date} - {report.title} ({report.teacher})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Meeting Request */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Meeting Request (Optional)</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="requestMeeting"
                    checked={formData.requestMeeting}
                    onChange={(e) => setFormData(prev => ({ ...prev, requestMeeting: e.target.checked }))}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="requestMeeting" className="text-sm font-medium text-gray-700">
                    I would like to schedule a meeting to discuss this matter
                  </label>
                </div>

                {formData.requestMeeting && (
                  <div className="space-y-4 pl-7">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Meeting Dates *
                      </label>
                      <div className="space-y-2">
                        {formData.preferredMeetingDates.map((date, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="date"
                              value={date}
                              onChange={(e) => {
                                const newDates = [...formData.preferredMeetingDates];
                                newDates[index] = e.target.value;
                                setFormData(prev => ({ ...prev, preferredMeetingDates: newDates }));
                              }}
                              min={new Date().toISOString().split('T')[0]}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                            <button
                              type="button"
                              onClick={() => removeMeetingDate(date)}
                              className="p-2 text-red-600 hover:text-red-800 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addMeetingDate}
                          className="px-3 py-2 text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors text-sm"
                        >
                          + Add Another Date
                        </button>
                      </div>
                      {errors.preferredMeetingDates && (
                        <p className="text-red-600 text-sm mt-1">{errors.preferredMeetingDates}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Options */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-semibold text-gray-900">Message Options</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="low">Low - General inquiry, no rush</option>
                    <option value="normal">Normal - Standard response time</option>
                    <option value="high">High - Important matter, quick response needed</option>
                    <option value="urgent">Urgent - Immediate attention required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    value={formData.preferredContactMethod}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredContactMethod: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="email">Email Response</option>
                    <option value="phone">Phone Call</option>
                    <option value="meeting">In-Person Meeting</option>
                    <option value="portal">Parent Portal Message</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="urgent"
                    checked={formData.urgent}
                    onChange={(e) => setFormData(prev => ({ ...prev, urgent: e.target.checked }))}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="urgent" className="text-sm font-medium text-gray-700">
                    Mark as urgent (requires immediate attention within 24 hours)
                  </label>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Attachments (Optional)</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload files or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG, PDF, TXT up to 5MB each
                      </p>
                    </label>
                  </div>
                  {errors.attachments && (
                    <p className="text-red-600 text-sm mt-1">{errors.attachments}</p>
                  )}
                </div>

                {formData.attachments.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attached Files:</h4>
                    <div className="space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <span className="text-xs text-gray-500">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-800">{errors.submit}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Link
                href={`/parent/children/behavior/${childId}`}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview Message
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-purple-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Teacher Contacts */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Contacts</h3>
            <div className="space-y-3">
              {teachers.slice(0, 3).map((teacher) => (
                <div key={teacher.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{teacher.name}</div>
                    <div className="text-xs text-gray-600">{teacher.subject}</div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${teacher.email}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${teacher.phone}`}
                      className="p-2 text-green-600 hover:bg-green-50 rounded"
                      title="Call Teacher"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
            <div className="space-y-3">
              {recentBehaviorReports.map((report) => (
                <div key={report.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 text-sm truncate">{report.title}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {new Date(report.date).toLocaleDateString()} • {report.teacher}
                  </div>
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                    report.type === "positive" 
                      ? "text-green-700 bg-green-100" 
                      : "text-red-700 bg-red-100"
                  }`}>
                    {report.type === "positive" ? "Positive" : "Concern"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Communication Tips</h3>
            <ul className="text-sm text-purple-800 space-y-2">
              <li>• Be specific about dates, times, and incidents</li>
              <li>• Provide context for behaviors observed at home</li>
              <li>• Ask specific questions to get helpful responses</li>
              <li>• Share what strategies work well at home</li>
              <li>• Be open to teacher suggestions and feedback</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && <PreviewModal />}
    </div>
  );
}
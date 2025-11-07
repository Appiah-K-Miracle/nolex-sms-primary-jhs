"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  FileText, 
  Calendar, 
  Users, 
  Megaphone, 
  Upload, 
  X,
  Eye, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Edit3,
  Paperclip,
  Image as ImageIcon,
  File
} from "lucide-react";

export default function AnnouncementEditPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [announcementData, setAnnouncementData] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "",
    status: "draft",
    audience: [],
    priority: "medium",
    publishDate: "",
    publishTime: "",
    expiryDate: "",
    allowComments: true,
    sendNotification: true,
    requireAcknowledgment: false,
    attachments: [] as any[]
  });

  // Sample announcement data
  const sampleAnnouncementData = {
    "1": {
      id: 1,
      title: "End of Term Examination Schedule",
      content: `Dear Students and Parents,

We are pleased to announce the upcoming End of Term Examination schedule for the current academic term. Please take note of the following important details:

**Examination Period:**
- Start Date: November 20, 2025
- End Date: December 5, 2025
- Duration: 2 weeks

**Examination Guidelines:**
1. All students must arrive at school 30 minutes before their scheduled examination time
2. Students should bring their own writing materials (pens, pencils, erasers, rulers)
3. Electronic devices are strictly prohibited in the examination hall
4. Late arrival will not be accommodated - punctuality is essential

**Subject Schedule:**
- Mathematics: November 20, 2025 (9:00 AM - 11:00 AM)
- English Language: November 21, 2025 (9:00 AM - 11:00 AM)
- Science: November 22, 2025 (9:00 AM - 11:00 AM)
- Social Studies: November 25, 2025 (9:00 AM - 11:00 AM)
- Additional subjects will be announced separately

**Result Publication:**
Examination results will be available on the school portal by December 15, 2025. Parents will receive SMS notifications when results are ready for viewing.

For any questions or concerns regarding the examination schedule, please contact the academic office or your child's class teacher.

Best regards,
The Academic Team
Nolex Primary & JHS`,
      type: "Academic",
      status: "published",
      audience: ["Students", "Parents"],
      priority: "high",
      publishDate: "2025-11-02",
      publishTime: "08:00",
      expiryDate: "2025-12-05",
      allowComments: true,
      sendNotification: true,
      requireAcknowledgment: false,
      createdBy: "Headmaster",
      createdDate: "2025-11-01",
      attachments: [
        {
          id: 1,
          name: "Examination_Timetable_2025.pdf",
          size: "245 KB",
          type: "PDF"
        },
        {
          id: 2,
          name: "Exam_Guidelines.docx",
          size: "128 KB",
          type: "Word Document"
        }
      ]
    },
    
    "2": {
      id: 2,
      title: "PTA Meeting Announcement",
      content: `Dear Parents and Guardians,

The monthly Parent-Teacher Association (PTA) meeting has been scheduled for November 15th, 2025. Your participation is crucial for the continued development and improvement of our school.

**Meeting Details:**
- Date: November 15, 2025
- Time: 6:00 PM - 8:00 PM
- Venue: School Assembly Hall
- Refreshments will be provided

**Agenda:**
1. Welcome and Opening Remarks
2. Principal's Report
3. Academic Performance Review
4. Infrastructure Development Updates
5. Student Welfare Initiatives
6. Financial Report
7. Questions and Open Discussion
8. Closing Remarks

**Important Topics:**
- Review of students' academic progress this term
- Discussion on upcoming school events and activities
- Proposal for new computer laboratory equipment
- Parent feedback on school meals program
- Planning for the annual sports day

We encourage all parents to attend this important meeting. Your input and suggestions are valuable in helping us provide the best education for your children.

Please confirm your attendance by calling the school office or sending a message through the school portal.

Thank you for your continued support.

Best regards,
PTA Executive Committee
Nolex Primary & JHS`,
      type: "General",
      status: "scheduled",
      audience: ["Parents"],
      priority: "medium",
      publishDate: "2025-11-10",
      publishTime: "16:00",
      expiryDate: "2025-11-15",
      allowComments: true,
      sendNotification: true,
      requireAcknowledgment: false,
      createdBy: "Admin",
      createdDate: "2025-11-01",
      attachments: [
        {
          id: 3,
          name: "PTA_Meeting_Agenda.pdf",
          size: "156 KB",
          type: "PDF"
        }
      ]
    }
  };

  // Available options
  const announcementTypes = [
    "Academic",
    "General",
    "Policy",
    "Events",
    "Emergency",
    "Administrative",
    "Sports",
    "Examination",
    "Holiday",
    "Health & Safety"
  ];

  const audienceOptions = [
    "Students",
    "Parents",
    "Teachers",
    "Staff",
    "All"
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-blue-100 text-blue-800" },
    { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" }
  ];

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      const announcement = sampleAnnouncementData[params.id as keyof typeof sampleAnnouncementData];
      if (announcement) {
        setAnnouncementData(announcement);
        setFormData({
          title: announcement.title,
          content: announcement.content,
          type: announcement.type,
          status: announcement.status,
          audience: announcement.audience,
          priority: announcement.priority,
          publishDate: announcement.publishDate,
          publishTime: announcement.publishTime,
          expiryDate: announcement.expiryDate,
          allowComments: announcement.allowComments,
          sendNotification: announcement.sendNotification,
          requireAcknowledgment: announcement.requireAcknowledgment,
          attachments: announcement.attachments || []
        });
      }
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [params.id]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAudienceChange = (audienceItem: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      audience: checked 
        ? [...prev.audience, audienceItem]
        : prev.audience.filter(item => item !== audienceItem)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newAttachments = Array.from(files).map((file, index) => ({
        id: formData.attachments.length + index + 1,
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        type: file.type.includes('pdf') ? 'PDF' : file.type.includes('doc') ? 'Word Document' : 'File',
        file: file
      }));
      
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newAttachments]
      }));
    }
  };

  const removeAttachment = (attachmentId: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== attachmentId)
    }));
  };

  const handleSave = async (action: 'draft' | 'publish' | 'schedule') => {
    setSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
    
    // Redirect back to announcement detail
    window.location.href = `/headmaster/communication/announcements/${params.id}`;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading announcement data...</span>
        </div>
      </div>
    );
  }

  if (!announcementData) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Announcement Not Found</h2>
          <p className="text-gray-600 mb-4">The requested announcement could not be found.</p>
          <Link
            href="/headmaster/communication"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Communications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href={`/headmaster/communication/announcements/${params.id}`}
              className="text-white hover:text-blue-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Announcement</h1>
              <p className="text-blue-100">Modify announcement content and settings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/headmaster/communication/announcements/${params.id}`}
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Announcement Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter announcement title"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    {announcementTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Edit3 className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Content</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Announcement Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={12}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter the announcement content..."
              />
              <p className="text-sm text-gray-500 mt-2">
                You can use basic formatting like **bold** and *italic* text.
              </p>
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Paperclip className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Attachments</h2>
              </div>
              <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Add Files
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </label>
            </div>
            
            {formData.attachments.length > 0 && (
              <div className="space-y-3">
                {formData.attachments.map((attachment: any) => (
                  <div key={attachment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded">
                        {attachment.type === 'PDF' ? <File className="w-5 h-5 text-red-600" /> :
                         attachment.type.includes('Image') ? <ImageIcon className="w-5 h-5 text-green-600" /> :
                         <File className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{attachment.name}</h3>
                        <p className="text-sm text-gray-600">{attachment.type} • {attachment.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeAttachment(attachment.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {formData.attachments.length === 0 && (
              <div className="text-center py-8">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">No attachments added yet</p>
                <p className="text-sm text-gray-400">Click "Add Files" to upload documents, images, or other files</p>
              </div>
            )}
          </div>

          {/* Audience Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Target Audience</h2>
              <span className="text-sm text-gray-500">({formData.audience.length} selected)</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {audienceOptions.map(option => (
                <label key={option} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.audience.includes(option)}
                    onChange={(e) => handleAudienceChange(option, e.target.checked)}
                    className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Publishing Schedule */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Publishing Schedule</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => handleInputChange('publishDate', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publish Time</label>
                <input
                  type="time"
                  value={formData.publishTime}
                  onChange={(e) => handleInputChange('publishTime', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional)</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Settings</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.allowComments}
                  onChange={(e) => handleInputChange('allowComments', e.target.checked)}
                  className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">Allow Comments</span>
                  <p className="text-sm text-gray-600">Let recipients comment on this announcement</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.sendNotification}
                  onChange={(e) => handleInputChange('sendNotification', e.target.checked)}
                  className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">Send Notification</span>
                  <p className="text-sm text-gray-600">Send push notifications and emails to recipients</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.requireAcknowledgment}
                  onChange={(e) => handleInputChange('requireAcknowledgment', e.target.checked)}
                  className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">Require Acknowledgment</span>
                  <p className="text-sm text-gray-600">Recipients must acknowledge they have read this announcement</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Save Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Options</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleSave('publish')}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
              >
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Publish Now'}
              </button>
              
              <button
                onClick={() => handleSave('schedule')}
                disabled={saving}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                Schedule for Later
              </button>
              
              <button
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save as Draft
              </button>
              
              <Link
                href={`/headmaster/communication/announcements/${params.id}`}
                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Cancel
              </Link>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Original Title</p>
                <p className="font-medium text-gray-900">{announcementData.title}</p>
              </div>
              <div>
                <p className="text-gray-600">Created By</p>
                <p className="font-medium text-gray-900">{announcementData.createdBy}</p>
              </div>
              <div>
                <p className="text-gray-600">Created Date</p>
                <p className="font-medium text-gray-900">{announcementData.createdDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Current Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-green-600 capitalize">{announcementData.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{formData.type || 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Priority:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  priorities.find(p => p.value === formData.priority)?.color
                }`}>
                  {priorities.find(p => p.value === formData.priority)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Audience:</span>
                <span className="font-medium">{formData.audience.length} groups</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Attachments:</span>
                <span className="font-medium">{formData.attachments.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Scheduled:</span>
                <span className="font-medium">
                  {formData.publishDate ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Notifications:</span>
                <span className="font-medium">{formData.sendNotification ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Save,
  X,
  AlertTriangle,
  FileText,
  Upload,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle
} from "lucide-react";

export default function EditAttendancePage() {
  const params = useParams();
  const router = useRouter();
  const attendanceId = params.id as string;
  
  const [formData, setFormData] = useState({
    requestType: "correction",
    reason: "",
    description: "",
    evidenceFiles: [] as File[],
    contactPreference: "email",
    urgency: "normal"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample attendance record data
  const attendanceRecord = {
    id: parseInt(attendanceId),
    date: "2025-11-15",
    child: {
      name: "Kwame Mensah",
      class: "JHS 2A",
      studentId: "STU001"
    },
    overallStatus: "present",
    periods: [
      {
        id: 1,
        subject: "Mathematics",
        teacher: "Mr. Asante",
        time: "08:00 - 08:40",
        status: "present"
      },
      {
        id: 3,
        subject: "Science", 
        teacher: "Dr. Mensah",
        time: "09:20 - 10:00",
        status: "late"
      },
      {
        id: 5,
        subject: "French",
        teacher: "Mme. Adjei", 
        time: "11:00 - 11:40",
        status: "absent"
      }
    ]
  };

  const requestTypes = [
    { 
      value: "correction", 
      label: "Attendance Correction", 
      description: "Request correction of incorrect attendance marking"
    },
    { 
      value: "excuse", 
      label: "Excuse Absence", 
      description: "Provide justification for absence or lateness"
    },
    { 
      value: "medical", 
      label: "Medical Documentation", 
      description: "Submit medical certificate or health-related excuse"
    },
    { 
      value: "emergency", 
      label: "Emergency Situation", 
      description: "Report emergency or unexpected circumstances"
    }
  ];

  const reasonOptions = {
    correction: [
      "Student was present but marked absent",
      "Student arrived on time but marked late", 
      "Student was in authorized school activity",
      "System error or technical issue",
      "Other correction needed"
    ],
    excuse: [
      "Medical appointment",
      "Family emergency",
      "Transportation issues",
      "Religious observance",
      "Other valid reason"
    ],
    medical: [
      "Illness",
      "Medical procedure",
      "Recovery from injury",
      "Chronic condition management",
      "Mental health support"
    ],
    emergency: [
      "Family emergency",
      "Natural disaster",
      "Accident or injury",
      "Urgent family matter",
      "Other emergency"
    ]
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      evidenceFiles: [...prev.evidenceFiles, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would submit to an API
    console.log("Attendance edit request submitted:", formData);
    
    setIsSubmitting(false);
    router.push(`/parent/academics/attendance/${attendanceId}?message=request-submitted`);
  };

  const canSubmit = formData.requestType && formData.reason && formData.description.trim().length > 0;

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/parent/academics/attendance/${attendanceId}`}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Request Attendance Edit</h1>
          <p className="text-gray-600">
            Submit a request to review or correct attendance records
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Form */}
        <div className="xl:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Record Summary */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Record</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Student:</span>
                    <span className="font-medium text-gray-900 ml-2">{attendanceRecord.child.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Class:</span>
                    <span className="font-medium text-gray-900 ml-2">{attendanceRecord.child.class}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-900 ml-2">
                      {new Date(attendanceRecord.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Overall Status:</span>
                    <span className="font-medium text-gray-900 ml-2 capitalize">{attendanceRecord.overallStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Type */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Type</h3>
              <div className="space-y-3">
                {requestTypes.map((type) => (
                  <label key={type.value} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="requestType"
                      value={type.value}
                      checked={formData.requestType === type.value}
                      onChange={(e) => handleInputChange('requestType', e.target.value)}
                      className="mt-1 text-blue-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{type.label}</div>
                      <div className="text-sm text-gray-600">{type.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Reason Selection */}
            {formData.requestType && (
              <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specific Reason</h3>
                <select
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a reason...</option>
                  {reasonOptions[formData.requestType as keyof typeof reasonOptions]?.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Detailed Description */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Description</h3>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Please provide detailed information about your request..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                required
              />
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600">
                  Be specific about dates, times, and circumstances
                </p>
                <p className="text-sm text-gray-500">
                  {formData.description.length}/500
                </p>
              </div>
            </div>

            {/* Supporting Evidence */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Supporting Evidence</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">Upload supporting documents</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Medical certificates, official letters, photos, etc. (Max 5MB each)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="evidence-upload"
                  />
                  <label
                    htmlFor="evidence-upload"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Choose Files
                  </label>
                </div>

                {/* Uploaded Files */}
                {formData.evidenceFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
                    {formData.evidenceFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-600">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Urgency & Contact Preference */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Priority & Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low - Response within 5 days</option>
                    <option value="normal">Normal - Response within 2 days</option>
                    <option value="high">High - Response within 24 hours</option>
                    <option value="urgent">Urgent - Response within 4 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
                  <select
                    value={formData.contactPreference}
                    onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="sms">SMS</option>
                    <option value="app">App Notification</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Info className="w-4 h-4" />
                  <span>Your request will be reviewed by the administration team</span>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/parent/academics/attendance/${attendanceId}`}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Guidelines */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Guidelines</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Be Specific</p>
                  <p className="text-sm text-gray-600">Provide exact dates, times, and circumstances</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Include Evidence</p>
                  <p className="text-sm text-gray-600">Upload supporting documents when available</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Submit Promptly</p>
                  <p className="text-sm text-gray-600">Submit requests within 7 days of the attendance date</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-lg lg:rounded-xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Need Help?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-800">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+233 24 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-blue-800">
                <Mail className="w-4 h-4" />
                <span className="text-sm">attendance@nolexsms.edu.gh</span>
              </div>
              <div className="flex items-start gap-3 text-blue-800">
                <HelpCircle className="w-4 h-4 mt-0.5" />
                <span className="text-sm">Office hours: Mon-Fri, 8:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Processing Timeline */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Submission</p>
                  <p className="text-sm text-gray-600">Request received and logged</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Review</p>
                  <p className="text-sm text-gray-600">Administration team reviews evidence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Decision</p>
                  <p className="text-sm text-gray-600">Response sent via your preferred method</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
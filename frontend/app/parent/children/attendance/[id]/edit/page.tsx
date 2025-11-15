"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Save,
  X,
  Plus,
  Trash2,
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
  Upload,
  Eye
} from "lucide-react";

export default function AttendanceCorrectionPage() {
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
    requestType: "incorrect_status",
    date: "",
    currentStatus: "",
    requestedStatus: "",
    currentTimeIn: "",
    requestedTimeIn: "",
    currentTimeOut: "",
    requestedTimeOut: "",
    reason: "",
    description: "",
    supportingDocuments: [] as File[],
    contactPreference: "email",
    urgency: "normal"
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Sample recent attendance records for context
  const recentRecords = [
    { date: "2025-11-18", status: "present", timeIn: "07:45", timeOut: "14:30" },
    { date: "2025-11-17", status: "present", timeIn: "07:50", timeOut: "14:30" },
    { date: "2025-11-16", status: "late", timeIn: "08:15", timeOut: "14:30" },
    { date: "2025-11-15", status: "absent", timeIn: "-", timeOut: "-" },
    { date: "2025-11-14", status: "present", timeIn: "07:42", timeOut: "14:30" }
  ];

  const requestTypes = [
    { value: "incorrect_status", label: "Incorrect Attendance Status", description: "The marked status (present/absent/late) is wrong" },
    { value: "incorrect_time", label: "Incorrect Time Records", description: "Arrival or departure time is incorrect" },
    { value: "missing_record", label: "Missing Attendance Record", description: "No attendance record found for the date" },
    { value: "medical_absence", label: "Medical Absence Not Recorded", description: "Absence due to medical reasons not properly marked" },
    { value: "authorized_absence", label: "Authorized Absence", description: "Pre-approved absence not reflected in records" },
    { value: "technical_error", label: "Technical Error", description: "System error or data corruption" }
  ];

  const statusOptions = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "late", label: "Late" },
    { value: "excused", label: "Excused Absence" },
    { value: "medical", label: "Medical Absence" }
  ];

  const urgencyLevels = [
    { value: "low", label: "Low Priority", description: "Non-urgent correction, can be processed within a week" },
    { value: "normal", label: "Normal Priority", description: "Standard processing, typically within 2-3 business days" },
    { value: "high", label: "High Priority", description: "Urgent correction needed, affects academic records" },
    { value: "critical", label: "Critical", description: "Immediate attention required, affects current assessments" }
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
        documents: "Some files were rejected. Only JPG, PNG, PDF, and TXT files under 5MB are allowed."
      }));
    }

    setFormData(prev => ({
      ...prev,
      supportingDocuments: [...prev.supportingDocuments, ...validFiles]
    }));
  };

  // Remove file
  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      supportingDocuments: prev.supportingDocuments.filter((_, i) => i !== index)
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.requestType) {
      newErrors.requestType = "Please select a request type";
    }

    if (!formData.date) {
      newErrors.date = "Please select the date for correction";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(today.getMonth() - 1);
      
      if (selectedDate > today) {
        newErrors.date = "Cannot request correction for future dates";
      } else if (selectedDate < oneMonthAgo) {
        newErrors.date = "Cannot request correction for dates older than one month";
      }
    }

    if (formData.requestType === "incorrect_status") {
      if (!formData.currentStatus) {
        newErrors.currentStatus = "Please specify the current status";
      }
      if (!formData.requestedStatus) {
        newErrors.requestedStatus = "Please specify the requested status";
      }
      if (formData.currentStatus === formData.requestedStatus) {
        newErrors.requestedStatus = "Requested status must be different from current status";
      }
    }

    if (formData.requestType === "incorrect_time") {
      if (!formData.currentTimeIn && !formData.currentTimeOut) {
        newErrors.currentTimeIn = "Please specify current time records";
      }
      if (!formData.requestedTimeIn && !formData.requestedTimeOut) {
        newErrors.requestedTimeIn = "Please specify the correct time";
      }
    }

    if (!formData.reason) {
      newErrors.reason = "Please provide a reason for this correction";
    }

    if (!formData.description || formData.description.length < 10) {
      newErrors.description = "Please provide a detailed description (minimum 10 characters)";
    }

    if (formData.description.length > 500) {
      newErrors.description = "Description must be 500 characters or less";
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
        router.push(`/parent/children/attendance/${childId}`);
      }, 3000);
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: "Failed to submit correction request. Please try again."
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
            <h3 className="text-lg font-semibold text-gray-900">Preview Correction Request</h3>
            <button
              onClick={() => setShowPreview(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">Student Information</h4>
            <p className="text-sm text-gray-600">{childData.name} • {childData.class} • {childData.rollNumber}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900">Request Type</h4>
            <p className="text-sm text-gray-600">
              {requestTypes.find(t => t.value === formData.requestType)?.label}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900">Date</h4>
            <p className="text-sm text-gray-600">{new Date(formData.date).toLocaleDateString()}</p>
          </div>
          
          {formData.currentStatus && (
            <div>
              <h4 className="font-medium text-gray-900">Status Change</h4>
              <p className="text-sm text-gray-600">
                From: {statusOptions.find(s => s.value === formData.currentStatus)?.label} → 
                To: {statusOptions.find(s => s.value === formData.requestedStatus)?.label}
              </p>
            </div>
          )}
          
          <div>
            <h4 className="font-medium text-gray-900">Reason</h4>
            <p className="text-sm text-gray-600">{formData.reason}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900">Description</h4>
            <p className="text-sm text-gray-600">{formData.description}</p>
          </div>
          
          {formData.supportingDocuments.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900">Supporting Documents</h4>
              <ul className="text-sm text-gray-600">
                {formData.supportingDocuments.map((file, index) => (
                  <li key={index}>• {file.name}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div>
            <h4 className="font-medium text-gray-900">Priority</h4>
            <p className="text-sm text-gray-600">
              {urgencyLevels.find(u => u.value === formData.urgency)?.label}
            </p>
          </div>
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              href={`/parent/children/attendance/${childId}`}
              className="mr-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold">Request Attendance Correction</h1>
              <p className="text-orange-100 text-sm lg:text-base xl:text-lg">
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
            <p className="text-green-800 font-medium">Correction request submitted successfully!</p>
            <p className="text-green-700 text-sm">You will receive updates via your preferred contact method. Redirecting...</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Request Type */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Request Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What type of correction do you need? *
                  </label>
                  <div className="space-y-3">
                    {requestTypes.map((type) => (
                      <label key={type.value} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="requestType"
                          value={type.value}
                          checked={formData.requestType === type.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, requestType: e.target.value }))}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{type.label}</div>
                          <div className="text-sm text-gray-600">{type.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.requestType && (
                    <p className="text-red-600 text-sm mt-1">{errors.requestType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Attendance Record *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    max={new Date().toISOString().split('T')[0]}
                    min={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.date && (
                    <p className="text-red-600 text-sm mt-1">{errors.date}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Corrections can only be requested for dates within the last 30 days
                  </p>
                </div>
              </div>
            </div>

            {/* Specific Correction Details */}
            {formData.requestType && (
              <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Correction Specifications</h2>
                </div>

                <div className="space-y-6">
                  {(formData.requestType === "incorrect_status") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Status (as recorded) *
                        </label>
                        <select
                          value={formData.currentStatus}
                          onChange={(e) => setFormData(prev => ({ ...prev, currentStatus: e.target.value }))}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.currentStatus ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select current status</option>
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        {errors.currentStatus && (
                          <p className="text-red-600 text-sm mt-1">{errors.currentStatus}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Requested Status (what it should be) *
                        </label>
                        <select
                          value={formData.requestedStatus}
                          onChange={(e) => setFormData(prev => ({ ...prev, requestedStatus: e.target.value }))}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.requestedStatus ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select requested status</option>
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        {errors.requestedStatus && (
                          <p className="text-red-600 text-sm mt-1">{errors.requestedStatus}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {(formData.requestType === "incorrect_time") && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Time In
                          </label>
                          <input
                            type="time"
                            value={formData.currentTimeIn}
                            onChange={(e) => setFormData(prev => ({ ...prev, currentTimeIn: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correct Time In *
                          </label>
                          <input
                            type="time"
                            value={formData.requestedTimeIn}
                            onChange={(e) => setFormData(prev => ({ ...prev, requestedTimeIn: e.target.value }))}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.requestedTimeIn ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.requestedTimeIn && (
                            <p className="text-red-600 text-sm mt-1">{errors.requestedTimeIn}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Time Out
                          </label>
                          <input
                            type="time"
                            value={formData.currentTimeOut}
                            onChange={(e) => setFormData(prev => ({ ...prev, currentTimeOut: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correct Time Out
                          </label>
                          <input
                            type="time"
                            value={formData.requestedTimeOut}
                            onChange={(e) => setFormData(prev => ({ ...prev, requestedTimeOut: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Reason for Correction *
                    </label>
                    <select
                      value={formData.reason}
                      onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.reason ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a reason</option>
                      <option value="data_entry_error">Data Entry Error</option>
                      <option value="system_malfunction">System Malfunction</option>
                      <option value="late_arrival_mismarked">Late Arrival Mismarked as Absent</option>
                      <option value="early_dismissal">Early Dismissal Not Recorded</option>
                      <option value="medical_appointment">Medical Appointment</option>
                      <option value="family_emergency">Family Emergency</option>
                      <option value="school_activity">School Activity/Field Trip</option>
                      <option value="weather_conditions">Weather-Related Delay</option>
                      <option value="transportation_issue">Transportation Issue</option>
                      <option value="other">Other (Please explain in description)</option>
                    </select>
                    {errors.reason && (
                      <p className="text-red-600 text-sm mt-1">{errors.reason}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Please provide detailed information about the correction needed, including any relevant circumstances or evidence..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.description && (
                        <p className="text-red-600 text-sm">{errors.description}</p>
                      )}
                      <p className="text-xs text-gray-500 ml-auto">
                        {formData.description.length}/500 characters
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Supporting Documents */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
              <div className="flex items-center gap-3 mb-6">
                <Upload className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Supporting Documents</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Supporting Evidence (Optional)
                  </label>
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
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload files or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG, PDF, TXT up to 5MB each
                      </p>
                    </label>
                  </div>
                  {errors.documents && (
                    <p className="text-red-600 text-sm mt-1">{errors.documents}</p>
                  )}
                </div>

                {formData.supportingDocuments.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                    <div className="space-y-2">
                      {formData.supportingDocuments.map((file, index) => (
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

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Helpful Evidence to Include:</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Medical certificates or doctor's notes</li>
                    <li>• Screenshots of transportation delays</li>
                    <li>• Photos of weather conditions</li>
                    <li>• School event notices or permissions</li>
                    <li>• Communication records with school staff</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Request Preferences */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Request Preferences</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "email", label: "Email", icon: Mail },
                      { value: "phone", label: "Phone Call", icon: Phone },
                      { value: "sms", label: "SMS/Text", icon: MessageSquare },
                      { value: "portal", label: "Parent Portal Only", icon: User }
                    ].map((method) => (
                      <label key={method.value} className="flex items-center gap-3 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="contactPreference"
                          value={method.value}
                          checked={formData.contactPreference === method.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, contactPreference: e.target.value }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <method.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Priority
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {urgencyLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {urgencyLevels.find(u => u.value === formData.urgency)?.description}
                  </p>
                </div>
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
                href={`/parent/children/attendance/${childId}`}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview Request
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
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
          </form>
        </div>

        {/* Sidebar - Recent Records */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Attendance</h3>
            <div className="space-y-3">
              {recentRecords.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {new Date(record.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-600">
                      {record.status === "present" ? `${record.timeIn} - ${record.timeOut}` :
                       record.status === "late" ? `Late: ${record.timeIn}` :
                       "Absent"}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    record.status === "present" ? "text-green-700 bg-green-100" :
                    record.status === "late" ? "text-yellow-700 bg-yellow-100" :
                    "text-red-700 bg-red-100"
                  }`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Notes</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Correction requests are processed within 2-3 business days</li>
              <li>• You will receive updates via your preferred contact method</li>
              <li>• Supporting documents help speed up the review process</li>
              <li>• Urgent requests may require phone verification</li>
              <li>• Contact the school office for immediate concerns</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && <PreviewModal />}
    </div>
  );
}
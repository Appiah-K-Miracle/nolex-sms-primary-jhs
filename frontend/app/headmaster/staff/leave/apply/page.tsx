"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Upload,
  Calendar,
  Clock,
  User,
  FileText,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Plus,
  X,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

// Staff data for pre-filling
const staffData = [
  {
    staffId: "NLX2024STF001",
    name: "Dr. Kwame Asante",
    position: "Headmaster",
    department: "Administration",
    email: "kwame.asante@nolex.edu.gh",
    phone: "+233 24 123 4567"
  },
  {
    staffId: "NLX2024STF002",
    name: "Mrs. Akosua Mensah",
    position: "Assistant Headmaster",
    department: "Administration",
    email: "akosua.mensah@nolex.edu.gh",
    phone: "+233 24 567 8901"
  },
  {
    staffId: "NLX2024STF003",
    name: "Mr. Kofi Boateng",
    position: "Mathematics Teacher",
    department: "Teaching Staff",
    email: "kofi.boateng@nolex.edu.gh",
    phone: "+233 24 345 6789"
  },
  {
    staffId: "NLX2024STF004",
    name: "Miss Ama Darko",
    position: "English Teacher",
    department: "Teaching Staff",
    email: "ama.darko@nolex.edu.gh",
    phone: "+233 24 789 0123"
  },
  {
    staffId: "NLX2024STF005",
    name: "Mr. Yaw Osei",
    position: "Science Teacher",
    department: "Teaching Staff",
    email: "yaw.osei@nolex.edu.gh",
    phone: "+233 24 456 7890"
  },
  {
    staffId: "NLX2024STF006",
    name: "Mrs. Efua Gyamfi",
    position: "Social Studies Teacher",
    department: "Teaching Staff",
    email: "efua.gyamfi@nolex.edu.gh",
    phone: "+233 24 234 5678"
  },
  {
    staffId: "NLX2024STF007",
    name: "Mr. Samuel Nkrumah",
    position: "Accountant",
    department: "Administrative",
    email: "samuel.nkrumah@nolex.edu.gh",
    phone: "+233 24 890 1234"
  },
  {
    staffId: "NLX2024STF008",
    name: "Kwame Amoah",
    position: "Security Supervisor",
    department: "Security",
    email: "kwame.amoah@nolex.edu.gh",
    phone: "+233 24 567 2345"
  }
];

// Leave types with their configurations
const leaveTypes = [
  { 
    id: "annual", 
    name: "Annual Leave", 
    description: "Regular vacation time",
    maxDays: 21,
    requiresDocument: false,
    advanceNotice: 14
  },
  { 
    id: "sick", 
    name: "Sick Leave", 
    description: "Medical leave for illness",
    maxDays: 10,
    requiresDocument: true,
    advanceNotice: 0
  },
  { 
    id: "emergency", 
    name: "Emergency Leave", 
    description: "Urgent family or personal emergency",
    maxDays: 5,
    requiresDocument: false,
    advanceNotice: 0
  },
  { 
    id: "maternity", 
    name: "Maternity/Paternity Leave", 
    description: "Leave for new parents",
    maxDays: 90,
    requiresDocument: true,
    advanceNotice: 30
  },
  { 
    id: "study", 
    name: "Study Leave", 
    description: "Educational and professional development",
    maxDays: 5,
    requiresDocument: true,
    advanceNotice: 21
  },
  { 
    id: "compassionate", 
    name: "Compassionate Leave", 
    description: "Bereavement and family support",
    maxDays: 7,
    requiresDocument: false,
    advanceNotice: 0
  }
];

export default function LeaveApplicationPage() {
  const searchParams = useSearchParams();
  const selectedStaffId = searchParams.get('staffId');
  
  // Find selected staff member
  const selectedStaff = staffData.find(staff => staff.staffId === selectedStaffId);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information - pre-filled if staff is selected
    staffId: selectedStaff?.staffId || "",
    staffName: selectedStaff?.name || "",
    position: selectedStaff?.position || "",
    department: selectedStaff?.department || "",
    email: selectedStaff?.email || "",
    phone: selectedStaff?.phone || "",
    
    // Leave Details
    leaveType: "",
    startDate: "",
    endDate: "",
    duration: 0,
    reason: "",
    priority: "Normal",
    
    // Emergency Contact
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    
    // Documents
    documents: [],
    
    // Additional Information
    workHandover: "",
    coverageArrangement: "",
    returnDate: "",
    medicalCertificate: null,
    additionalNotes: ""
  });

  const [errors, setErrors] = useState<any>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const steps = [
    { id: 1, title: "Leave Details", description: "Select leave type and dates" },
    { id: 2, title: "Contact & Emergency", description: "Emergency contact information" },
    { id: 3, title: "Documents & Notes", description: "Upload documents and additional info" },
    { id: 4, title: "Review & Submit", description: "Review and submit application" }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end dates
    
    return diffDays;
  };

  const handleDateChange = (field: string, value: string) => {
    handleInputChange(field, value);
    
    if (field === "startDate" || field === "endDate") {
      const startDate = field === "startDate" ? value : formData.startDate;
      const endDate = field === "endDate" ? value : formData.endDate;
      
      if (startDate && endDate) {
        const duration = calculateDuration(startDate, endDate);
        handleInputChange("duration", duration);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = (step: number) => {
    const newErrors: any = {};
    
    if (step === 1) {
      if (!formData.leaveType) newErrors.leaveType = "Please select a leave type";
      if (!formData.startDate) newErrors.startDate = "Please select start date";
      if (!formData.endDate) newErrors.endDate = "Please select end date";
      if (!formData.reason) newErrors.reason = "Please provide a reason for leave";
      
      // Check if start date is before end date
      if (formData.startDate && formData.endDate) {
        if (new Date(formData.startDate) > new Date(formData.endDate)) {
          newErrors.endDate = "End date must be after start date";
        }
      }
      
      // Check advance notice requirement
      const selectedLeaveType = leaveTypes.find(type => type.id === formData.leaveType);
      if (selectedLeaveType && formData.startDate) {
        const startDate = new Date(formData.startDate);
        const today = new Date();
        const daysDifference = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDifference < selectedLeaveType.advanceNotice) {
          newErrors.startDate = `This leave type requires ${selectedLeaveType.advanceNotice} days advance notice`;
        }
      }
      
      // Check maximum days
      if (selectedLeaveType && formData.duration > selectedLeaveType.maxDays) {
        newErrors.duration = `Maximum ${selectedLeaveType.maxDays} days allowed for this leave type`;
      }
    }
    
    if (step === 2) {
      if (!formData.emergencyContactName) newErrors.emergencyContactName = "Emergency contact name is required";
      if (!formData.emergencyContactPhone) newErrors.emergencyContactPhone = "Emergency contact phone is required";
      if (!formData.emergencyContactRelation) newErrors.emergencyContactRelation = "Relationship is required";
    }
    
    if (step === 3) {
      const selectedLeaveType = leaveTypes.find(type => type.id === formData.leaveType);
      if (selectedLeaveType?.requiresDocument && uploadedFiles.length === 0) {
        newErrors.documents = "This leave type requires supporting documents";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  const selectedLeaveType = leaveTypes.find(type => type.id === formData.leaveType);

  if (submitSuccess) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your leave application has been submitted successfully. You will receive a confirmation email shortly.
            </p>
            <div className="space-y-3">
              <Link
                href="/headmaster/staff/leave"
                className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View All Applications
              </Link>
              <Link
                href="/headmaster/staff/leave/apply"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Submit Another Application
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to staff selection if no staff is selected
  if (!selectedStaff) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Staff Selected</h2>
          <p className="text-gray-600 mb-4">Please select a staff member to apply leave for.</p>
          <Link
            href="/headmaster/staff/leave/select-staff"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Select Staff Member
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FileText className="w-8 h-8" />
                Apply Leave for {selectedStaff.name}
              </h1>
              <p className="text-emerald-100 mt-1">{selectedStaff.position} • {selectedStaff.department}</p>
            </div>
            <Link
              href="/headmaster/staff/leave"
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Leave Management
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center ${index !== steps.length - 1 ? "flex-1" : ""}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  currentStep >= step.id 
                    ? "bg-emerald-600 text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {step.id}
                </div>
                <div className="ml-3">
                  <h4 className={`font-medium ${
                    currentStep >= step.id ? "text-emerald-600" : "text-gray-600"
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
              {index !== steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? "bg-emerald-600" : "bg-gray-200"
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {currentStep === 1 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Leave Details</h3>
              
              {/* Personal Info Display */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Applicant Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Staff Name</label>
                    <p className="text-gray-900 font-medium">{formData.staffName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Staff ID</label>
                    <p className="text-gray-900 font-medium">{formData.staffId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <p className="text-gray-900 font-medium">{formData.position}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <p className="text-gray-900 font-medium">{formData.department}</p>
                  </div>
                </div>
              </div>
              
              {/* Leave Type Selection */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {leaveTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.leaveType === type.id
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleInputChange("leaveType", type.id)}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="leaveType"
                            value={type.id}
                            checked={formData.leaveType === type.id}
                            onChange={() => handleInputChange("leaveType", type.id)}
                            className="text-emerald-600"
                          />
                          <h5 className="font-medium text-gray-900">{type.name}</h5>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        <div className="flex gap-4 text-xs text-gray-500 mt-2">
                          <span>Max: {type.maxDays} days</span>
                          <span>Notice: {type.advanceNotice} days</span>
                          {type.requiresDocument && <span>Document required</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.leaveType && <p className="text-red-500 text-sm mt-1">{errors.leaveType}</p>}
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleDateChange("startDate", e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleDateChange("endDate", e.target.value)}
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900">{formData.duration} days</span>
                    </div>
                    {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                  </div>
                </div>

                {/* Priority and Reason */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => handleInputChange("priority", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Leave <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.reason}
                      onChange={(e) => handleInputChange("reason", e.target.value)}
                      placeholder="Please provide a detailed reason for your leave application..."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
                  </div>
                </div>

                {/* Leave Type Information */}
                {selectedLeaveType && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-2">Leave Type Information</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
                      <div>
                        <span className="font-medium">Maximum Days:</span> {selectedLeaveType.maxDays}
                      </div>
                      <div>
                        <span className="font-medium">Advance Notice:</span> {selectedLeaveType.advanceNotice} days
                      </div>
                      <div>
                        <span className="font-medium">Documents:</span> {selectedLeaveType.requiresDocument ? "Required" : "Optional"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact & Emergency Information</h3>
              
              {/* Contact Information */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Your Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900 font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      {formData.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900 font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {formData.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Emergency Contact Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                      placeholder="Full name of emergency contact"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                      placeholder="+233 XX XXX XXXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.emergencyContactPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.emergencyContactRelation}
                      onChange={(e) => handleInputChange("emergencyContactRelation", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select relationship</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Child">Child</option>
                      <option value="Friend">Friend</option>
                      <option value="Colleague">Colleague</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.emergencyContactRelation && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactRelation}</p>}
                  </div>
                </div>

                {/* Work Coverage */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Work Coverage & Handover</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Handover Details
                    </label>
                    <textarea
                      value={formData.workHandover}
                      onChange={(e) => handleInputChange("workHandover", e.target.value)}
                      placeholder="Describe how your responsibilities will be handled during your absence..."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coverage Arrangement
                    </label>
                    <textarea
                      value={formData.coverageArrangement}
                      onChange={(e) => handleInputChange("coverageArrangement", e.target.value)}
                      placeholder="Who will cover your duties and how will they be contacted..."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Documents & Additional Information</h3>
              
              {/* Document Upload */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Documents
                    {selectedLeaveType?.requiresDocument && <span className="text-red-500">*</span>}
                  </label>
                  
                  {selectedLeaveType?.requiresDocument && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <p className="text-yellow-800 text-sm">
                          This leave type requires supporting documents (e.g., medical certificate, workshop registration, etc.)
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h4>
                      <p className="text-gray-600 mb-4">
                        Drag and drop files here, or click to select files
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        Select Files
                      </label>
                      <p className="text-sm text-gray-500 mt-2">
                        Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB each)
                      </p>
                    </div>
                  </div>
                  
                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900">Uploaded Files:</h5>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-500" />
                            <span className="text-sm font-medium text-gray-900">{file.name}</span>
                            <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {errors.documents && <p className="text-red-500 text-sm mt-1">{errors.documents}</p>}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                    placeholder="Any additional information you would like to include with your application..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Review & Submit Application</h3>
              
              {/* Application Summary */}
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Applicant Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.staffName}</span></div>
                    <div><span className="text-gray-600">Staff ID:</span> <span className="font-medium">{formData.staffId}</span></div>
                    <div><span className="text-gray-600">Position:</span> <span className="font-medium">{formData.position}</span></div>
                    <div><span className="text-gray-600">Department:</span> <span className="font-medium">{formData.department}</span></div>
                  </div>
                </div>

                {/* Leave Details */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Leave Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-600">Leave Type:</span> <span className="font-medium">{selectedLeaveType?.name}</span></div>
                    <div><span className="text-gray-600">Priority:</span> <span className="font-medium">{formData.priority}</span></div>
                    <div><span className="text-gray-600">Start Date:</span> <span className="font-medium">{formData.startDate}</span></div>
                    <div><span className="text-gray-600">End Date:</span> <span className="font-medium">{formData.endDate}</span></div>
                    <div><span className="text-gray-600">Duration:</span> <span className="font-medium">{formData.duration} days</span></div>
                  </div>
                  <div className="mt-4">
                    <span className="text-gray-600">Reason:</span>
                    <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded">{formData.reason}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Emergency Contact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.emergencyContactName}</span></div>
                    <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{formData.emergencyContactPhone}</span></div>
                    <div><span className="text-gray-600">Relationship:</span> <span className="font-medium">{formData.emergencyContactRelation}</span></div>
                  </div>
                </div>

                {/* Documents */}
                {uploadedFiles.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Uploaded Documents</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-4">Terms and Conditions</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p>• I understand that this application is subject to approval by the appropriate authority.</p>
                    <p>• I confirm that all information provided is accurate and complete.</p>
                    <p>• I understand that false information may result in disciplinary action.</p>
                    <p>• I will ensure proper handover of my responsibilities before proceeding on leave.</p>
                    <p>• I will be available for contact during my leave if required for urgent matters.</p>
                  </div>
                  <div className="mt-4">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="text-emerald-600" required />
                      <span className="text-sm text-blue-900">I agree to the terms and conditions stated above</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Previous
          </button>
          
          <div className="flex gap-3">
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Next
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
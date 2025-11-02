"use client"

import { useState, useEffect } from "react";
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
  CheckCircle,
  Edit3
} from "lucide-react";
import Link from "next/link";

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

// Function to get leave application data by ID
const getLeaveApplicationById = (id: string) => {
  const leaveApplications = [
    {
      id: 1,
      leaveId: "LV2024001",
      staffId: "NLX2024STF001",
      staffName: "Mr. Kwame Boateng",
      position: "Mathematics Teacher",
      department: "Teaching Staff",
      email: "kwame.boateng@nolex.edu.gh",
      phone: "+233 24 123 4567",
      leaveType: "Annual Leave",
      startDate: "2024-11-15",
      endDate: "2024-11-19",
      duration: 5,
      reason: "Family vacation and personal time",
      status: "Pending",
      appliedDate: "2024-10-28",
      approver: "Mrs. Grace Adjei",
      priority: "Normal",
      documents: [
        { name: "Leave Application Form", type: "PDF", size: "125 KB" },
        { name: "Travel Itinerary", type: "PDF", size: "89 KB" }
      ],
      emergencyContact: {
        name: "Mrs. Boateng",
        phone: "+233 24 123 4568",
        relationship: "Spouse"
      },
      workHandover: "All grade 6 mathematics classes will be covered by Mr. Joseph Asante. All lesson plans and materials have been prepared and handed over.",
      coverageArrangement: "Mr. Joseph Asante will handle my classes during my absence. He can be reached at +233 24 567 8901.",
      returnDate: "2024-11-20",
      medicalCertificate: null,
      additionalNotes: "All assignments and lesson plans have been prepared in advance. Emergency contact information is provided."
    },
    {
      id: 2,
      leaveId: "LV2024002",
      staffId: "NLX2024STF015",
      staffName: "Ms. Akosua Mensah",
      position: "English Teacher",
      department: "Teaching Staff",
      email: "akosua.mensah@nolex.edu.gh",
      phone: "+233 24 567 8901",
      leaveType: "Sick Leave",
      startDate: "2024-11-05",
      endDate: "2024-11-07",
      duration: 3,
      reason: "Flu and fever - doctor recommended rest",
      status: "Approved",
      appliedDate: "2024-11-02",
      approver: "Mrs. Grace Adjei",
      priority: "High",
      documents: [
        { name: "Medical Certificate", type: "PDF", size: "156 KB" }
      ],
      emergencyContact: {
        name: "Mr. Mensah",
        phone: "+233 24 567 8902",
        relationship: "Spouse"
      },
      workHandover: "English lessons for Classes 1A, 1B and 1C have been prepared. Reading materials and assignments are ready for substitute teacher.",
      coverageArrangement: "Mrs. Elizabeth Nyong will handle all English classes. Lesson plans and materials have been provided.",
      returnDate: "2024-11-08",
      medicalCertificate: "medical_cert_mensah_nov2024.pdf",
      additionalNotes: "Doctor has advised complete rest for 3 days. Will resume work on November 8, 2024."
    },
    {
      id: 4,
      leaveId: "LV2024004",
      staffId: "NLX2024STF008",
      staffName: "Mrs. Ama Osei",
      position: "Science Teacher",
      department: "Teaching Staff",
      email: "ama.osei@nolex.edu.gh",
      phone: "+233 24 789 0123",
      leaveType: "Study Leave",
      startDate: "2024-11-20",
      endDate: "2024-11-22",
      duration: 3,
      reason: "Attending professional development workshop",
      status: "Pending",
      appliedDate: "2024-10-25",
      approver: "Mrs. Grace Adjei",
      priority: "Normal",
      documents: [
        { name: "Workshop Registration", type: "PDF", size: "98 KB" }
      ],
      emergencyContact: {
        name: "Mr. Osei",
        phone: "+233 24 789 0124",
        relationship: "Spouse"
      },
      workHandover: "Science experiments and practical sessions for Classes 3A and 3B are prepared. Laboratory materials are organized and ready.",
      coverageArrangement: "Mr. Francis Appiah will handle all science classes. Workshop materials will be shared upon return.",
      returnDate: "2024-11-23",
      medicalCertificate: null,
      additionalNotes: "This professional development workshop will enhance teaching methods in science education. Certificate will be provided upon completion."
    }
  ];

  return leaveApplications.find(app => app.id === parseInt(id));
};

export default function EditLeaveApplicationPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const originalApplication = getLeaveApplicationById(id);

  const [formData, setFormData] = useState({
    staffId: "",
    staffName: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    duration: 0,
    reason: "",
    priority: "Normal",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    workHandover: "",
    coverageArrangement: "",
    returnDate: "",
    additionalNotes: ""
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initialize form data with original application data
  useEffect(() => {
    if (originalApplication) {
      setFormData({
        staffId: originalApplication.staffId,
        staffName: originalApplication.staffName,
        position: originalApplication.position,
        department: originalApplication.department,
        email: originalApplication.email,
        phone: originalApplication.phone,
        leaveType: originalApplication.leaveType,
        startDate: originalApplication.startDate,
        endDate: originalApplication.endDate,
        duration: originalApplication.duration,
        reason: originalApplication.reason,
        priority: originalApplication.priority,
        emergencyContactName: originalApplication.emergencyContact.name,
        emergencyContactPhone: originalApplication.emergencyContact.phone,
        emergencyContactRelation: originalApplication.emergencyContact.relationship,
        workHandover: originalApplication.workHandover,
        coverageArrangement: originalApplication.coverageArrangement,
        returnDate: originalApplication.returnDate,
        additionalNotes: originalApplication.additionalNotes || ""
      });
    }
  }, [originalApplication]);

  if (!originalApplication) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Leave Application Not Found</h2>
          <p className="text-gray-600 mb-4">The leave application you're trying to edit doesn't exist.</p>
          <Link
            href="/headmaster/staff/leave"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Leave Management
          </Link>
        </div>
      </div>
    );
  }

  // Only allow editing if status is Pending
  if (originalApplication.status !== "Pending") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cannot Edit Application</h2>
          <p className="text-gray-600 mb-4">
            This leave application has already been {originalApplication.status.toLowerCase()} and cannot be edited.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href={`/headmaster/staff/leave/${id}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              View Application
            </Link>
            <Link
              href="/headmaster/staff/leave"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Back to Leave Management
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
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

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.leaveType) newErrors.leaveType = "Leave type is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = "Emergency contact name is required";
    if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = "Emergency contact phone is required";
    if (!formData.workHandover.trim()) newErrors.workHandover = "Work handover details are required";
    if (!formData.coverageArrangement.trim()) newErrors.coverageArrangement = "Coverage arrangement is required";

    // Date validation
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      
      if (end < start) {
        newErrors.endDate = "End date cannot be before start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      setTimeout(() => {
        // Redirect to leave management or application details
        window.location.href = `/headmaster/staff/leave/${id}`;
      }, 2000);
      
    } catch (error) {
      console.error("Error updating leave application:", error);
      setErrors({ submit: "Failed to update leave application. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Application Updated Successfully!</h2>
          <p className="text-gray-600 mb-4">The leave application has been updated and is pending approval.</p>
          <div className="flex gap-3 justify-center">
            <Link
              href={`/headmaster/staff/leave/${id}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              View Application
            </Link>
            <Link
              href="/headmaster/staff/leave"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Back to Leave Management
            </Link>
          </div>
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
            <div className="flex items-center gap-4">
              <Link
                href={`/headmaster/staff/leave/${id}`}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Edit3 className="w-8 h-8" />
                  Edit Leave Application
                </h1>
                <p className="text-emerald-100 mt-1">
                  Application ID: {originalApplication.leaveId} • {formData.staffName}
                </p>
              </div>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-sm font-medium">Status</p>
              <p className="text-lg font-bold">{originalApplication.status}</p>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-teal-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-8">
          {/* Staff Information (Read-only) */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-emerald-600" />
              Staff Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-6">
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
          </div>

          {/* Leave Details */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-emerald-600" />
              Leave Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leave Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.leaveType}
                  onChange={(e) => handleInputChange("leaveType", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select leave type</option>
                  {leaveTypes.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.leaveType && <p className="text-red-500 text-sm mt-1">{errors.leaveType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleDateChange("startDate", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={formData.duration}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                  <span className="text-gray-600 font-medium">days</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Return Date</label>
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => handleInputChange("returnDate", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Leave <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Please provide a detailed reason for your leave..."
              />
              {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6 text-emerald-600" />
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Full name"
                />
                {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="+233 XX XXX XXXX"
                />
                {errors.emergencyContactPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                <select
                  value={formData.emergencyContactRelation}
                  onChange={(e) => handleInputChange("emergencyContactRelation", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Work Coverage */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-emerald-600" />
              Work Coverage
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Handover Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.workHandover}
                  onChange={(e) => handleInputChange("workHandover", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Describe what work needs to be handed over and to whom..."
                />
                {errors.workHandover && <p className="text-red-500 text-sm mt-1">{errors.workHandover}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coverage Arrangement <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.coverageArrangement}
                  onChange={(e) => handleInputChange("coverageArrangement", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Describe who will cover your responsibilities and how..."
                />
                {errors.coverageArrangement && <p className="text-red-500 text-sm mt-1">{errors.coverageArrangement}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Any additional information or special instructions..."
                />
              </div>
            </div>
          </div>

          {/* Error Display */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{errors.submit}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <Link
              href={`/headmaster/staff/leave/${id}`}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Cancel
            </Link>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-8 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Application
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
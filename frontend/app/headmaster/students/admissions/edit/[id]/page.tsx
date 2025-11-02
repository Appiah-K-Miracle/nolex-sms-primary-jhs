"use client"

import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  User, 
  Users, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Info,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Upload,
  Trash2,
  Plus,
  Edit3,
  X,
  Clock,
  Activity
} from "lucide-react";
import Link from "next/link";

// Mock data for editing
const initialApplicationData = {
  id: 1,
  applicationNumber: "ADM2024001",
  status: "Under Review",
  priority: "High",
  submissionDate: "2024-10-15",
  lastUpdated: "2024-10-25",
  student: {
    firstName: "Sarah",
    middleName: "Grace",
    lastName: "Johnson",
    dateOfBirth: "2015-03-15",
    gender: "Female",
    nationality: "Ghanaian",
    religion: "Christian",
    gradeApplying: "Grade 4",
    previousSchool: "Little Angels Kindergarten",
    address: "123 Oak Street, East Legon, Accra",
    medicalConditions: "None",
    allergies: "Peanuts",
    bloodGroup: "O+",
    specialNeeds: "None"
  },
  parents: {
    primary: {
      title: "Mr.",
      firstName: "Michael",
      lastName: "Johnson",
      relationship: "Father",
      occupation: "Software Engineer",
      workplace: "Tech Solutions Ltd",
      phone: "+233 244 567 890",
      email: "michael.johnson@email.com",
      address: "123 Oak Street, East Legon, Accra",
      emergencyContact: "+233 244 567 891"
    },
    secondary: {
      title: "Mrs.",
      firstName: "Grace",
      lastName: "Johnson",
      relationship: "Mother",
      occupation: "Teacher",
      workplace: "Accra International School",
      phone: "+233 244 567 892",
      email: "grace.johnson@email.com",
      address: "123 Oak Street, East Legon, Accra",
      emergencyContact: "+233 244 567 893"
    }
  },
  additional: {
    transportationNeeded: true,
    lunchRequired: true,
    afterSchoolProgram: false,
    extracurricularInterests: ["Sports", "Music", "Art"],
    languagesSpoken: "English, Twi",
    hobbies: "Reading, Drawing, Playing Soccer",
    reasonForApplying: "We believe Nolex Primary provides excellent academic foundation and character development opportunities for our daughter.",
    hearAboutSchool: "Friend/Family",
    expectedStartDate: "2025-01-15",
    specialRequests: "Please ensure she sits with other children who speak English as we're working on her confidence."
  }
};

const gradeOptions = [
  "Nursery 1", "Nursery 2", "Kindergarten 1", "Kindergarten 2",
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"
];

const relationshipOptions = [
  "Father", "Mother", "Guardian", "Grandfather", "Grandmother", "Uncle", "Aunt", "Other"
];

export default function EditApplicationPage({ params }) {
  const [activeTab, setActiveTab] = useState("student");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState(initialApplicationData);
  const [originalData, setOriginalData] = useState(initialApplicationData);

  // Track changes
  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);
    setHasUnsavedChanges(hasChanges);
  }, [formData, originalData]);

  const handleStudentDataChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      student: { ...prev.student, [field]: value }
    }));
  };

  const handleParentDataChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      parents: {
        ...prev.parents,
        [parent]: { ...prev.parents[parent], [field]: value }
      }
    }));
  };

  const handleAdditionalInfoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      additional: { ...prev.additional, [field]: value }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setShowSaveModal(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Saving application:", formData);
      setOriginalData(formData);
      setHasUnsavedChanges(false);
      
      // Success feedback
      setTimeout(() => {
        setShowSaveModal(false);
        setIsSaving(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error saving application:", error);
      setIsSaving(false);
      setShowSaveModal(false);
    }
  };

  const handleDiscard = () => {
    setFormData(originalData);
    setHasUnsavedChanges(false);
    setShowDiscardModal(false);
  };

  const getChangedFields = () => {
    const changes = [];
    
    // Check student changes
    Object.keys(formData.student).forEach(key => {
      if (formData.student[key] !== originalData.student[key]) {
        changes.push(`Student ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
      }
    });

    // Check parent changes
    ['primary', 'secondary'].forEach(parent => {
      Object.keys(formData.parents[parent]).forEach(key => {
        if (formData.parents[parent][key] !== originalData.parents[parent][key]) {
          changes.push(`${parent.charAt(0).toUpperCase() + parent.slice(1)} parent ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        }
      });
    });

    // Check additional info changes
    Object.keys(formData.additional).forEach(key => {
      if (JSON.stringify(formData.additional[key]) !== JSON.stringify(originalData.additional[key])) {
        changes.push(`Additional ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
      }
    });

    return changes;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href={`/headmaster/students/admissions/${formData.id}`}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Edit3 className="w-8 h-8" />
                  Edit Application
                </h1>
                <p className="text-orange-100 mt-1">
                  {formData.student.firstName} {formData.student.lastName} - {formData.applicationNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {hasUnsavedChanges && (
                <div className="bg-yellow-500/20 text-yellow-100 px-4 py-2 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Unsaved Changes</span>
                </div>
              )}
              <button
                onClick={() => setShowDiscardModal(true)}
                disabled={!hasUnsavedChanges}
                className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                  hasUnsavedChanges 
                    ? "bg-white/20 hover:bg-white/30" 
                    : "bg-white/10 text-white/50 cursor-not-allowed"
                }`}
              >
                <X className="w-5 h-5" />
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={!hasUnsavedChanges || isSaving}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  hasUnsavedChanges && !isSaving
                    ? "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-white/10 text-white/50 cursor-not-allowed"
                }`}
              >
                <Save className="w-5 h-5" />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Changes Summary */}
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Unsaved Changes Detected</h3>
              <p className="text-sm text-yellow-700 mb-3">You have modified the following fields:</p>
              <div className="flex flex-wrap gap-2">
                {getChangedFields().slice(0, 10).map((field, index) => (
                  <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                    {field}
                  </span>
                ))}
                {getChangedFields().length > 10 && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                    +{getChangedFields().length - 10} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="flex border-b border-gray-100">
          {[
            { id: "student", label: "Student Information", icon: User },
            { id: "parents", label: "Parent Details", icon: Users },
            { id: "additional", label: "Additional Info", icon: FileText },
            { id: "review", label: "Review Changes", icon: Eye }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex-1 px-6 py-4 font-semibold focus:outline-none transition-all duration-300 relative ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white" 
                    : "text-gray-500 hover:text-orange-600 hover:bg-orange-50"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {activeTab === "student" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Information</h2>
              <p className="text-gray-600">Edit the student's personal and academic details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.student.firstName}
                  onChange={(e) => handleStudentDataChange("firstName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={formData.student.middleName}
                  onChange={(e) => handleStudentDataChange("middleName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter middle name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.student.lastName}
                  onChange={(e) => handleStudentDataChange("lastName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.student.dateOfBirth}
                  onChange={(e) => handleStudentDataChange("dateOfBirth", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.student.gender}
                  onChange={(e) => handleStudentDataChange("gender", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Grade Applying For <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.student.gradeApplying}
                  onChange={(e) => handleStudentDataChange("gradeApplying", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select grade</option>
                  {gradeOptions.map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nationality
                </label>
                <input
                  type="text"
                  value={formData.student.nationality}
                  onChange={(e) => handleStudentDataChange("nationality", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter nationality"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Religion
                </label>
                <input
                  type="text"
                  value={formData.student.religion}
                  onChange={(e) => handleStudentDataChange("religion", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter religion"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  value={formData.student.bloodGroup}
                  onChange={(e) => handleStudentDataChange("bloodGroup", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Previous School
                </label>
                <input
                  type="text"
                  value={formData.student.previousSchool}
                  onChange={(e) => handleStudentDataChange("previousSchool", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter previous school name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Home Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.student.address}
                  onChange={(e) => handleStudentDataChange("address", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter home address"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Medical Conditions
                </label>
                <textarea
                  value={formData.student.medicalConditions}
                  onChange={(e) => handleStudentDataChange("medicalConditions", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="3"
                  placeholder="List any medical conditions or write 'None'"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Allergies
                </label>
                <textarea
                  value={formData.student.allergies}
                  onChange={(e) => handleStudentDataChange("allergies", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="2"
                  placeholder="List any allergies or write 'None'"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Needs or Accommodations
                </label>
                <textarea
                  value={formData.student.specialNeeds}
                  onChange={(e) => handleStudentDataChange("specialNeeds", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="3"
                  placeholder="Describe any special needs or accommodations required"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "parents" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Parent/Guardian Information</h2>
              <p className="text-gray-600">Edit parent or guardian contact and professional details</p>
            </div>

            {/* Primary Parent/Guardian */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-green-600" />
                Primary Parent/Guardian
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <select
                    value={formData.parents.primary.title}
                    onChange={(e) => handleParentDataChange("primary", "title", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select title</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.parents.primary.firstName}
                    onChange={(e) => handleParentDataChange("primary", "firstName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.parents.primary.lastName}
                    onChange={(e) => handleParentDataChange("primary", "lastName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Relationship <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.parents.primary.relationship}
                    onChange={(e) => handleParentDataChange("primary", "relationship", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select relationship</option>
                    {relationshipOptions.map((rel) => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.parents.primary.phone}
                    onChange={(e) => handleParentDataChange("primary", "phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.parents.primary.email}
                    onChange={(e) => handleParentDataChange("primary", "email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.parents.primary.occupation}
                    onChange={(e) => handleParentDataChange("primary", "occupation", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter occupation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Workplace
                  </label>
                  <input
                    type="text"
                    value={formData.parents.primary.workplace}
                    onChange={(e) => handleParentDataChange("primary", "workplace", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter workplace"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    value={formData.parents.primary.emergencyContact}
                    onChange={(e) => handleParentDataChange("primary", "emergencyContact", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Alternative contact number"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  value={formData.parents.primary.address}
                  onChange={(e) => handleParentDataChange("primary", "address", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="2"
                  placeholder="Enter full address"
                />
              </div>
            </div>

            {/* Secondary Parent/Guardian */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Secondary Parent/Guardian (Optional)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <select
                    value={formData.parents.secondary.title}
                    onChange={(e) => handleParentDataChange("secondary", "title", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select title</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.parents.secondary.firstName}
                    onChange={(e) => handleParentDataChange("secondary", "firstName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.parents.secondary.lastName}
                    onChange={(e) => handleParentDataChange("secondary", "lastName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Relationship
                  </label>
                  <select
                    value={formData.parents.secondary.relationship}
                    onChange={(e) => handleParentDataChange("secondary", "relationship", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select relationship</option>
                    {relationshipOptions.map((rel) => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.parents.secondary.phone}
                    onChange={(e) => handleParentDataChange("secondary", "phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.parents.secondary.email}
                    onChange={(e) => handleParentDataChange("secondary", "email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.parents.secondary.occupation}
                    onChange={(e) => handleParentDataChange("secondary", "occupation", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter occupation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Workplace
                  </label>
                  <input
                    type="text"
                    value={formData.parents.secondary.workplace}
                    onChange={(e) => handleParentDataChange("secondary", "workplace", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter workplace"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    value={formData.parents.secondary.emergencyContact}
                    onChange={(e) => handleParentDataChange("secondary", "emergencyContact", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Alternative contact number"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  value={formData.parents.secondary.address}
                  onChange={(e) => handleParentDataChange("secondary", "address", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  placeholder="Enter full address"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "additional" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Information</h2>
              <p className="text-gray-600">Edit additional details and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* School Services */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  School Services
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="transportation"
                      checked={formData.additional.transportationNeeded}
                      onChange={(e) => handleAdditionalInfoChange("transportationNeeded", e.target.checked)}
                      className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="transportation" className="text-sm font-medium text-gray-700">
                      Transportation Service Required
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="lunch"
                      checked={formData.additional.lunchRequired}
                      onChange={(e) => handleAdditionalInfoChange("lunchRequired", e.target.checked)}
                      className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="lunch" className="text-sm font-medium text-gray-700">
                      School Lunch Program
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="afterschool"
                      checked={formData.additional.afterSchoolProgram}
                      onChange={(e) => handleAdditionalInfoChange("afterSchoolProgram", e.target.checked)}
                      className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="afterschool" className="text-sm font-medium text-gray-700">
                      After School Program
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.additional.expectedStartDate}
                    onChange={(e) => handleAdditionalInfoChange("expectedStartDate", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Student Interests */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-orange-600" />
                  Student Interests
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Languages Spoken at Home
                    </label>
                    <input
                      type="text"
                      value={formData.additional.languagesSpoken}
                      onChange={(e) => handleAdditionalInfoChange("languagesSpoken", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., English, Twi, French"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hobbies & Interests
                    </label>
                    <textarea
                      value={formData.additional.hobbies}
                      onChange={(e) => handleAdditionalInfoChange("hobbies", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows="3"
                      placeholder="List the student's hobbies and interests"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Extracurricular Interests
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Sports", "Music", "Art", "Drama", "Science Club", "Chess"].map((activity) => (
                        <div key={activity} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={activity}
                            checked={formData.additional.extracurricularInterests.includes(activity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleAdditionalInfoChange("extracurricularInterests", [...formData.additional.extracurricularInterests, activity]);
                              } else {
                                handleAdditionalInfoChange("extracurricularInterests", formData.additional.extracurricularInterests.filter(a => a !== activity));
                              }
                            }}
                            className="w-4 h-4 text-orange-600 border-2 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <label htmlFor={activity} className="text-sm text-gray-700">{activity}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason for Applying to Our School
                </label>
                <textarea
                  value={formData.additional.reasonForApplying}
                  onChange={(e) => handleAdditionalInfoChange("reasonForApplying", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="4"
                  placeholder="Please tell us why you want your child to join our school"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  How did you hear about our school?
                </label>
                <select
                  value={formData.additional.hearAboutSchool}
                  onChange={(e) => handleAdditionalInfoChange("hearAboutSchool", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select an option</option>
                  <option value="Website">School Website</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Friend/Family">Friend or Family Recommendation</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="School Visit">School Visit</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Requests or Comments
                </label>
                <textarea
                  value={formData.additional.specialRequests}
                  onChange={(e) => handleAdditionalInfoChange("specialRequests", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="3"
                  placeholder="Any special requests or additional information you'd like to share"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "review" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Changes</h2>
              <p className="text-gray-600">Review all changes before saving the application</p>
            </div>

            {hasUnsavedChanges ? (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Pending Changes ({getChangedFields().length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getChangedFields().map((field, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-yellow-300">
                        <p className="font-medium text-gray-900 capitalize">{field}</p>
                        <p className="text-sm text-gray-600">Modified</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Application Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Student Information</h4>
                      <div className="space-y-2">
                        <p><span className="text-gray-600">Name:</span> {formData.student.firstName} {formData.student.middleName} {formData.student.lastName}</p>
                        <p><span className="text-gray-600">Date of Birth:</span> {formData.student.dateOfBirth}</p>
                        <p><span className="text-gray-600">Gender:</span> {formData.student.gender}</p>
                        <p><span className="text-gray-600">Grade Applying:</span> {formData.student.gradeApplying}</p>
                        <p><span className="text-gray-600">Previous School:</span> {formData.student.previousSchool || "Not specified"}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Primary Contact</h4>
                      <div className="space-y-2">
                        <p><span className="text-gray-600">Name:</span> {formData.parents.primary.title} {formData.parents.primary.firstName} {formData.parents.primary.lastName}</p>
                        <p><span className="text-gray-600">Relationship:</span> {formData.parents.primary.relationship}</p>
                        <p><span className="text-gray-600">Phone:</span> {formData.parents.primary.phone}</p>
                        <p><span className="text-gray-600">Email:</span> {formData.parents.primary.email}</p>
                        <p><span className="text-gray-600">Occupation:</span> {formData.parents.primary.occupation || "Not specified"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Additional Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.additional.transportationNeeded && (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Transportation</span>
                      )}
                      {formData.additional.lunchRequired && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Lunch Program</span>
                      )}
                      {formData.additional.afterSchoolProgram && (
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">After School Program</span>
                      )}
                      {formData.additional.extracurricularInterests.map((interest) => (
                        <span key={interest} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">{interest}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Changes Detected</h3>
                <p className="text-gray-600">All application data is up to date. Make changes in the other tabs to see them here.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Discard Changes Modal */}
      {showDiscardModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-full">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Discard Changes</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to discard all unsaved changes? This action cannot be undone.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-orange-800 mb-2">You will lose changes to:</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  {getChangedFields().slice(0, 5).map((field, index) => (
                    <li key={index}>• {field}</li>
                  ))}
                  {getChangedFields().length > 5 && (
                    <li>• And {getChangedFields().length - 5} more fields</li>
                  )}
                </ul>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDiscardModal(false)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
                >
                  Keep Changes
                </button>
                <button 
                  onClick={handleDiscard}
                  className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 text-center">
              {isSaving ? (
                <div>
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Saving Changes</h2>
                  <p className="text-gray-600">Please wait while we update the application...</p>
                </div>
              ) : (
                <div>
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Changes Saved</h2>
                  <p className="text-gray-600">The application has been updated successfully.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
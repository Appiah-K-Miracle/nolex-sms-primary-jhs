"use client"

import { useState } from "react";
import { 
  User, 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Upload, 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Check,
  AlertCircle,
  FileText,
  Users,
  School,
  Home,
  Heart,
  Shield,
  BookOpen,
  UserCheck,
  Clock,
  Star,
  Info,
  Camera
} from "lucide-react";
import Link from "next/link";

const gradeOptions = [
  "Nursery 1",
  "Nursery 2", 
  "Kindergarten 1",
  "Kindergarten 2",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6"
];

const documentTypes = [
  { id: "birth_certificate", name: "Birth Certificate", required: true },
  { id: "medical_report", name: "Medical Report", required: true },
  { id: "vaccination_records", name: "Vaccination Records", required: true },
  { id: "academic_transcript", name: "Previous Academic Records", required: false },
  { id: "passport_photo", name: "Passport Photos", required: true },
  { id: "parent_id", name: "Parent/Guardian ID", required: true },
  { id: "proof_of_residence", name: "Proof of Residence", required: false },
];

const relationshipOptions = [
  "Father",
  "Mother", 
  "Guardian",
  "Grandfather",
  "Grandmother",
  "Uncle",
  "Aunt",
  "Other"
];

export default function CreateAdmissionPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    religion: "",
    gradeApplying: "",
    previousSchool: "",
    address: "",
    medicalConditions: "",
    allergies: "",
    emergencyMedication: "",
    bloodGroup: "",
    specialNeeds: ""
  });

  const [parentData, setParentData] = useState({
    primary: {
      title: "",
      firstName: "",
      lastName: "",
      relationship: "",
      occupation: "",
      workplace: "",
      phone: "",
      email: "",
      address: "",
      emergencyContact: ""
    },
    secondary: {
      title: "",
      firstName: "",
      lastName: "",
      relationship: "",
      occupation: "",
      workplace: "",
      phone: "",
      email: "",
      address: "",
      emergencyContact: ""
    }
  });

  const [additionalInfo, setAdditionalInfo] = useState({
    transportationNeeded: false,
    lunchRequired: false,
    afterSchoolProgram: false,
    extracurricularInterests: [],
    languagesSpoken: "",
    hobbies: "",
    reasonForApplying: "",
    hearAboutSchool: "",
    expectedStartDate: "",
    specialRequests: ""
  });

  const [documents, setDocuments] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const totalSteps = 4;

  const handleStudentDataChange = (field, value) => {
    setStudentData(prev => ({ ...prev, [field]: value }));
  };

  const handleParentDataChange = (parent, field, value) => {
    setParentData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleAdditionalInfoChange = (field, value) => {
    setAdditionalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (documentType, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const applicationData = {
      student: studentData,
      parents: parentData,
      additional: additionalInfo,
      documents: uploadedFiles,
      applicationDate: new Date().toISOString().split('T')[0],
      status: "Pending Review"
    };
    
    console.log("Application submitted:", applicationData);
    // Here you would typically send the data to your backend
    alert("Application submitted successfully!");
  };

  const getStepTitle = (step) => {
    switch (step) {
      case 1: return "Student Information";
      case 2: return "Parent/Guardian Details";
      case 3: return "Additional Information";
      case 4: return "Documents & Review";
      default: return "";
    }
  };

  const getStepIcon = (step) => {
    switch (step) {
      case 1: return User;
      case 2: return Users;
      case 3: return BookOpen;
      case 4: return FileText;
      default: return User;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/headmaster/students/admissions"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Plus className="w-8 h-8" />
                  New Student Application
                </h1>
                <p className="text-green-100 mt-1">Step {currentStep} of {totalSteps}: {getStepTitle(currentStep)}</p>
              </div>
            </div>
            <button
              onClick={() => setShowPreview(true)}
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => {
            const StepIcon = getStepIcon(step);
            return (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  currentStep >= step 
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg" 
                    : "bg-gray-200 text-gray-500"
                }`}>
                  {currentStep > step ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <StepIcon className="w-6 h-6" />
                  )}
                </div>
                {step < 4 && (
                  <div className={`w-20 h-1 mx-4 transition-all duration-300 ${
                    currentStep > step ? "bg-gradient-to-r from-green-500 to-blue-500" : "bg-gray-200"
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="text-center">
              <p className={`text-sm font-medium ${currentStep >= step ? "text-green-600" : "text-gray-500"}`}>
                {getStepTitle(step)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Information</h2>
              <p className="text-gray-600">Please provide the student's personal details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={studentData.firstName}
                  onChange={(e) => handleStudentDataChange("firstName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={studentData.middleName}
                  onChange={(e) => handleStudentDataChange("middleName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter middle name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={studentData.lastName}
                  onChange={(e) => handleStudentDataChange("lastName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={studentData.dateOfBirth}
                  onChange={(e) => handleStudentDataChange("dateOfBirth", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={studentData.gender}
                  onChange={(e) => handleStudentDataChange("gender", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  value={studentData.gradeApplying}
                  onChange={(e) => handleStudentDataChange("gradeApplying", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  value={studentData.nationality}
                  onChange={(e) => handleStudentDataChange("nationality", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter nationality"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Religion
                </label>
                <input
                  type="text"
                  value={studentData.religion}
                  onChange={(e) => handleStudentDataChange("religion", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter religion"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  value={studentData.bloodGroup}
                  onChange={(e) => handleStudentDataChange("bloodGroup", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  value={studentData.previousSchool}
                  onChange={(e) => handleStudentDataChange("previousSchool", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter previous school name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Home Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={studentData.address}
                  onChange={(e) => handleStudentDataChange("address", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  value={studentData.medicalConditions}
                  onChange={(e) => handleStudentDataChange("medicalConditions", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  placeholder="List any medical conditions or write 'None'"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Allergies
                </label>
                <textarea
                  value={studentData.allergies}
                  onChange={(e) => handleStudentDataChange("allergies", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="2"
                  placeholder="List any allergies or write 'None'"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Needs or Accommodations
                </label>
                <textarea
                  value={studentData.specialNeeds}
                  onChange={(e) => handleStudentDataChange("specialNeeds", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  placeholder="Describe any special needs or accommodations required"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Parent/Guardian Information</h2>
              <p className="text-gray-600">Please provide details for the student's parents or guardians</p>
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
                    value={parentData.primary.title}
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
                    value={parentData.primary.firstName}
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
                    value={parentData.primary.lastName}
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
                    value={parentData.primary.relationship}
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
                    value={parentData.primary.phone}
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
                    value={parentData.primary.email}
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
                    value={parentData.primary.occupation}
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
                    value={parentData.primary.workplace}
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
                    value={parentData.primary.emergencyContact}
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
                  value={parentData.primary.address}
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
                    value={parentData.secondary.title}
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
                    value={parentData.secondary.firstName}
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
                    value={parentData.secondary.lastName}
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
                    value={parentData.secondary.relationship}
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
                    value={parentData.secondary.phone}
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
                    value={parentData.secondary.email}
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
                    value={parentData.secondary.occupation}
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
                    value={parentData.secondary.workplace}
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
                    value={parentData.secondary.emergencyContact}
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
                  value={parentData.secondary.address}
                  onChange={(e) => handleParentDataChange("secondary", "address", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  placeholder="Enter full address"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Information</h2>
              <p className="text-gray-600">Please provide additional details about the student and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* School Services */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <School className="w-6 h-6 text-purple-600" />
                  School Services
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="transportation"
                      checked={additionalInfo.transportationNeeded}
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
                      checked={additionalInfo.lunchRequired}
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
                      checked={additionalInfo.afterSchoolProgram}
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
                    value={additionalInfo.expectedStartDate}
                    onChange={(e) => handleAdditionalInfoChange("expectedStartDate", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Student Interests */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-orange-600" />
                  Student Interests
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Languages Spoken at Home
                    </label>
                    <input
                      type="text"
                      value={additionalInfo.languagesSpoken}
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
                      value={additionalInfo.hobbies}
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
                            checked={additionalInfo.extracurricularInterests.includes(activity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleAdditionalInfoChange("extracurricularInterests", [...additionalInfo.extracurricularInterests, activity]);
                              } else {
                                handleAdditionalInfoChange("extracurricularInterests", additionalInfo.extracurricularInterests.filter(a => a !== activity));
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
                  value={additionalInfo.reasonForApplying}
                  onChange={(e) => handleAdditionalInfoChange("reasonForApplying", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="4"
                  placeholder="Please tell us why you want your child to join our school"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  How did you hear about our school?
                </label>
                <select
                  value={additionalInfo.hearAboutSchool}
                  onChange={(e) => handleAdditionalInfoChange("hearAboutSchool", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  value={additionalInfo.specialRequests}
                  onChange={(e) => handleAdditionalInfoChange("specialRequests", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  placeholder="Any special requests or additional information you'd like to share"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Documents & Review</h2>
              <p className="text-gray-600">Upload required documents and review your application</p>
            </div>

            {/* Document Upload */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Upload className="w-6 h-6 text-blue-600" />
                Required Documents
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documentTypes.map((docType) => (
                  <div key={docType.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-900">{docType.name}</span>
                      {docType.required && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Required</span>
                      )}
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id={docType.id}
                        className="hidden"
                        onChange={(e) => handleFileUpload(docType.id, e.target.files[0])}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <label htmlFor={docType.id} className="cursor-pointer">
                        {uploadedFiles[docType.id] ? (
                          <div className="text-green-600">
                            <Check className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm font-medium">File uploaded</p>
                            <p className="text-xs text-gray-500">{uploadedFiles[docType.id].name}</p>
                          </div>
                        ) : (
                          <div className="text-gray-500">
                            <Upload className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm">Click to upload</p>
                            <p className="text-xs">PDF, JPG, PNG (Max 5MB)</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Summary */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-green-600" />
                Application Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Student Information</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Name:</span> {studentData.firstName} {studentData.middleName} {studentData.lastName}</p>
                    <p><span className="text-gray-600">Date of Birth:</span> {studentData.dateOfBirth}</p>
                    <p><span className="text-gray-600">Gender:</span> {studentData.gender}</p>
                    <p><span className="text-gray-600">Grade Applying:</span> {studentData.gradeApplying}</p>
                    <p><span className="text-gray-600">Previous School:</span> {studentData.previousSchool || "Not specified"}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Primary Contact</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Name:</span> {parentData.primary.title} {parentData.primary.firstName} {parentData.primary.lastName}</p>
                    <p><span className="text-gray-600">Relationship:</span> {parentData.primary.relationship}</p>
                    <p><span className="text-gray-600">Phone:</span> {parentData.primary.phone}</p>
                    <p><span className="text-gray-600">Email:</span> {parentData.primary.email}</p>
                    <p><span className="text-gray-600">Occupation:</span> {parentData.primary.occupation || "Not specified"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Additional Services</h4>
                <div className="flex flex-wrap gap-2">
                  {additionalInfo.transportationNeeded && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Transportation</span>
                  )}
                  {additionalInfo.lunchRequired && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Lunch Program</span>
                  )}
                  {additionalInfo.afterSchoolProgram && (
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">After School Program</span>
                  )}
                  {additionalInfo.extracurricularInterests.map((interest) => (
                    <span key={interest} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">{interest}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Declaration */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Declaration</h3>
              <div className="text-sm text-gray-700 space-y-2 mb-4">
                <p>I hereby declare that:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>All information provided in this application is true and accurate</li>
                  <li>I understand that any false information may result in rejection of the application</li>
                  <li>I agree to the school's terms and conditions</li>
                  <li>I understand that submission of this application does not guarantee admission</li>
                </ul>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="declaration"
                  className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500"
                  required
                />
                <label htmlFor="declaration" className="text-sm font-medium text-gray-700">
                  I agree to the above declaration <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-500 hover:bg-gray-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              Next
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Submit Application
            </button>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Application Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Student Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><span className="font-medium">Name:</span> {studentData.firstName} {studentData.middleName} {studentData.lastName}</p>
                    <p><span className="font-medium">Date of Birth:</span> {studentData.dateOfBirth}</p>
                    <p><span className="font-medium">Gender:</span> {studentData.gender}</p>
                    <p><span className="font-medium">Grade:</span> {studentData.gradeApplying}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Parent Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><span className="font-medium">Primary Contact:</span> {parentData.primary.firstName} {parentData.primary.lastName}</p>
                    <p><span className="font-medium">Phone:</span> {parentData.primary.phone}</p>
                    <p><span className="font-medium">Email:</span> {parentData.primary.email}</p>
                    <p><span className="font-medium">Relationship:</span> {parentData.primary.relationship}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
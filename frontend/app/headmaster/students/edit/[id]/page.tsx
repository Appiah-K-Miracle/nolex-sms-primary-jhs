"use client"

import { useState, useEffect } from "react";
import { 
  User, 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Upload, 
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
  Camera,
  Activity,
  Award,
  Edit3,
  History,
  RefreshCw
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

const classOptions = {
  "Nursery 1": ["N1A", "N1B"],
  "Nursery 2": ["N2A", "N2B"],
  "Kindergarten 1": ["K1A", "K1B", "K1C"],
  "Kindergarten 2": ["K2A", "K2B"],
  "Grade 1": ["1A", "1B", "1C"],
  "Grade 2": ["2A", "2B"],
  "Grade 3": ["3A", "3B"],
  "Grade 4": ["4A", "4B"],
  "Grade 5": ["5A", "5B"],
  "Grade 6": ["6A"]
};

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

const statusOptions = [
  "Active",
  "Inactive", 
  "Transferred",
  "Graduated",
  "Suspended",
  "Expelled"
];

// Mock existing student data
const existingStudentData = {
  id: "NLX2024GRADE51234",
  firstName: "Kwame",
  middleName: "Nkrumah",
  lastName: "Asante",
  dateOfBirth: "2013-08-15",
  gender: "Male",
  nationality: "Ghanaian",
  religion: "Christian",
  grade: "Grade 5",
  class: "5A",
  studentId: "NLX2024GRADE51234",
  enrollmentDate: "2024-09-01",
  status: "Active",
  address: "P.O. Box 123, Kumasi",
  bloodGroup: "B+",
  previousSchool: "Golden Hills Primary School",
  medicalConditions: "None",
  allergies: "Peanuts",
  specialNeeds: "None",
  emergencyMedication: "EpiPen (for allergic reactions)",
  
  parents: {
    primary: {
      title: "Mr.",
      firstName: "Kofi",
      lastName: "Asante",
      relationship: "Father",
      phone: "+233 24 123 4567",
      email: "kofi.asante@email.com",
      occupation: "Engineer",
      workplace: "Ghana Water Company",
      address: "P.O. Box 123, Kumasi",
      emergencyContact: "+233 20 987 6543"
    },
    secondary: {
      title: "Mrs.",
      firstName: "Akosua",
      lastName: "Asante",
      relationship: "Mother",
      phone: "+233 24 765 4321",
      email: "akosua.asante@email.com",
      occupation: "Teacher",
      workplace: "St. Mary's School",
      address: "P.O. Box 123, Kumasi",
      emergencyContact: "+233 20 555 1234"
    }
  },
  
  medicalInfo: {
    doctorName: "Dr. Kwame Mensah",
    doctorPhone: "+233 24 888 9999",
    hospitalName: "Komfo Anokye Teaching Hospital",
    insuranceProvider: "NHIS",
    insuranceNumber: "1234567890",
    lastCheckup: "2024-08-15"
  },
  
  additionalInfo: {
    transportationNeeded: true,
    lunchRequired: true,
    afterSchoolProgram: false,
    extracurricularInterests: ["Science", "Music", "Sports"],
    languagesSpoken: "English, Twi",
    hobbies: "Reading, Football, Music",
    specialRequests: "Needs extra time for reading due to mild dyslexia"
  }
};

export default function EditStudentPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showChangeLog, setShowChangeLog] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [changes, setChanges] = useState([]);
  
  const [studentData, setStudentData] = useState(existingStudentData);
  const [parentData, setParentData] = useState(existingStudentData.parents);
  const [medicalData, setMedicalData] = useState(existingStudentData.medicalInfo);
  const [additionalInfo, setAdditionalInfo] = useState(existingStudentData.additionalInfo);

  const totalSteps = 4;

  // Track changes
  const trackChange = (field, oldValue, newValue, section = "Student") => {
    if (oldValue !== newValue) {
      const change = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        section,
        field,
        oldValue,
        newValue
      };
      setChanges(prev => [...prev, change]);
      setHasChanges(true);
    }
  };

  const handleStudentDataChange = (field, value) => {
    const oldValue = studentData[field];
    setStudentData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Reset class when grade changes
      if (field === "grade") {
        newData.class = "";
        trackChange("class", prev.class, "", "Student");
      }
      
      return newData;
    });
    trackChange(field, oldValue, value, "Student");
  };

  const handleParentDataChange = (parent, field, value) => {
    const oldValue = parentData[parent][field];
    setParentData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
    trackChange(`${parent}.${field}`, oldValue, value, `${parent === 'primary' ? 'Primary' : 'Secondary'} Parent`);
  };

  const handleMedicalDataChange = (field, value) => {
    const oldValue = medicalData[field];
    setMedicalData(prev => ({ ...prev, [field]: value }));
    trackChange(field, oldValue, value, "Medical");
  };

  const handleAdditionalInfoChange = (field, value) => {
    const oldValue = additionalInfo[field];
    setAdditionalInfo(prev => ({ ...prev, [field]: value }));
    trackChange(field, oldValue, value, "Additional Info");
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

  const handleSave = () => {
    const updatedData = {
      student: studentData,
      parents: parentData,
      medical: medicalData,
      additional: additionalInfo,
      lastModified: new Date().toISOString(),
      changes: changes
    };
    
    console.log("Updated student data:", updatedData);
    alert("Student record updated successfully!");
    setHasChanges(false);
    setChanges([]);
  };

  const getStepTitle = (step) => {
    switch (step) {
      case 1: return "Student Information";
      case 2: return "Parent/Guardian Details";
      case 3: return "Medical Information";
      case 4: return "Review & Save";
      default: return "";
    }
  };

  const getStepIcon = (step) => {
    switch (step) {
      case 1: return User;
      case 2: return Users;
      case 3: return Heart;
      case 4: return Save;
      default: return User;
    }
  };

  const availableClasses = studentData.grade ? classOptions[studentData.grade] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href={`/headmaster/students/${params.id}`}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Edit3 className="w-8 h-8" />
                  Edit Student Record
                </h1>
                <p className="text-purple-100 mt-1">
                  {studentData.firstName} {studentData.lastName} - Step {currentStep} of {totalSteps}: {getStepTitle(currentStep)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {hasChanges && (
                <button
                  onClick={() => setShowChangeLog(true)}
                  className="bg-yellow-500/20 hover:bg-yellow-500/30 px-6 py-3 rounded-lg transition-colors flex items-center gap-2 border border-yellow-300/30"
                >
                  <History className="w-5 h-5" />
                  Changes ({changes.length})
                </button>
              )}
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <span className="text-sm">ID: {studentData.studentId}</span>
              </div>
            </div>
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
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg" 
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
                    currentStep > step ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-gray-200"
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="text-center">
              <p className={`text-sm font-medium ${currentStep >= step ? "text-purple-600" : "text-gray-500"}`}>
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
              <p className="text-gray-600">Update the student's personal and academic details</p>
            </div>

            {/* Student Photo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {studentData.firstName[0]}{studentData.lastName[0]}
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border-2 border-purple-500 hover:bg-purple-50 transition-colors">
                  <Camera className="w-4 h-4 text-purple-600" />
                </button>
              </div>
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={studentData.gender}
                  onChange={(e) => handleStudentDataChange("gender", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={studentData.status}
                  onChange={(e) => handleStudentDataChange("status", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Grade <span className="text-red-500">*</span>
                </label>
                <select
                  value={studentData.grade}
                  onChange={(e) => handleStudentDataChange("grade", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {gradeOptions.map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  value={studentData.class}
                  onChange={(e) => handleStudentDataChange("class", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select class</option>
                  {availableClasses.map((className) => (
                    <option key={className} value={className}>{className}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  value={studentData.studentId}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nationality
                </label>
                <input
                  type="text"
                  value={studentData.nationality}
                  onChange={(e) => handleStudentDataChange("nationality", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  value={studentData.bloodGroup}
                  onChange={(e) => handleStudentDataChange("bloodGroup", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Allergies
                </label>
                <textarea
                  value={studentData.allergies}
                  onChange={(e) => handleStudentDataChange("allergies", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Needs or Accommodations
                </label>
                <textarea
                  value={studentData.specialNeeds}
                  onChange={(e) => handleStudentDataChange("specialNeeds", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="3"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Parent/Guardian Information</h2>
              <p className="text-gray-600">Update parent or guardian contact details</p>
            </div>

            {/* Primary Parent/Guardian */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-green-600" />
                Primary Parent/Guardian
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
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
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
                  <input
                    type="text"
                    value={parentData.primary.occupation}
                    onChange={(e) => handleParentDataChange("primary", "occupation", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Workplace</label>
                  <input
                    type="text"
                    value={parentData.primary.workplace}
                    onChange={(e) => handleParentDataChange("primary", "workplace", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact</label>
                  <input
                    type="tel"
                    value={parentData.primary.emergencyContact}
                    onChange={(e) => handleParentDataChange("primary", "emergencyContact", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <textarea
                  value={parentData.primary.address}
                  onChange={(e) => handleParentDataChange("primary", "address", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="2"
                />
              </div>
            </div>

            {/* Secondary Parent/Guardian */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Secondary Parent/Guardian
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={parentData.secondary.firstName}
                    onChange={(e) => handleParentDataChange("secondary", "firstName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={parentData.secondary.lastName}
                    onChange={(e) => handleParentDataChange("secondary", "lastName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={parentData.secondary.phone}
                    onChange={(e) => handleParentDataChange("secondary", "phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={parentData.secondary.email}
                    onChange={(e) => handleParentDataChange("secondary", "email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
                  <input
                    type="text"
                    value={parentData.secondary.occupation}
                    onChange={(e) => handleParentDataChange("secondary", "occupation", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Workplace</label>
                  <input
                    type="text"
                    value={parentData.secondary.workplace}
                    onChange={(e) => handleParentDataChange("secondary", "workplace", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact</label>
                  <input
                    type="tel"
                    value={parentData.secondary.emergencyContact}
                    onChange={(e) => handleParentDataChange("secondary", "emergencyContact", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <textarea
                  value={parentData.secondary.address}
                  onChange={(e) => handleParentDataChange("secondary", "address", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Information</h2>
              <p className="text-gray-600">Update medical records and healthcare provider details</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Healthcare Provider */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-red-600" />
                  Healthcare Provider
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor's Name</label>
                    <input
                      type="text"
                      value={medicalData.doctorName}
                      onChange={(e) => handleMedicalDataChange("doctorName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor's Phone</label>
                    <input
                      type="tel"
                      value={medicalData.doctorPhone}
                      onChange={(e) => handleMedicalDataChange("doctorPhone", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hospital/Clinic</label>
                    <input
                      type="text"
                      value={medicalData.hospitalName}
                      onChange={(e) => handleMedicalDataChange("hospitalName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Insurance Provider</label>
                    <input
                      type="text"
                      value={medicalData.insuranceProvider}
                      onChange={(e) => handleMedicalDataChange("insuranceProvider", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Insurance Number</label>
                    <input
                      type="text"
                      value={medicalData.insuranceNumber}
                      onChange={(e) => handleMedicalDataChange("insuranceNumber", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Medical Checkup</label>
                    <input
                      type="date"
                      value={medicalData.lastCheckup}
                      onChange={(e) => handleMedicalDataChange("lastCheckup", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Info className="w-6 h-6 text-blue-600" />
                  Additional Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Medication</label>
                    <textarea
                      value={studentData.emergencyMedication}
                      onChange={(e) => handleStudentDataChange("emergencyMedication", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="List any emergency medications"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Languages Spoken</label>
                    <input
                      type="text"
                      value={additionalInfo.languagesSpoken}
                      onChange={(e) => handleAdditionalInfoChange("languagesSpoken", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hobbies & Interests</label>
                    <textarea
                      value={additionalInfo.hobbies}
                      onChange={(e) => handleAdditionalInfoChange("hobbies", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
                    <textarea
                      value={additionalInfo.specialRequests}
                      onChange={(e) => handleAdditionalInfoChange("specialRequests", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* School Services */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <School className="w-6 h-6 text-purple-600" />
                School Services
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="transportation"
                    checked={additionalInfo.transportationNeeded}
                    onChange={(e) => handleAdditionalInfoChange("transportationNeeded", e.target.checked)}
                    className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="transportation" className="text-sm font-medium text-gray-700">
                    Transportation Service
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
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Changes</h2>
              <p className="text-gray-600">Review all changes before saving the updated student record</p>
            </div>

            {/* Changes Summary */}
            {changes.length > 0 ? (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <History className="w-6 h-6 text-yellow-600" />
                  Changes Made ({changes.length})
                </h3>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {changes.map((change) => (
                    <div key={change.id} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{change.section} - {change.field}</span>
                        <span className="text-xs text-gray-500">{change.timestamp}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">From:</p>
                          <p className="bg-red-50 text-red-800 p-2 rounded">{change.oldValue || "Empty"}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">To:</p>
                          <p className="bg-green-50 text-green-800 p-2 rounded">{change.newValue || "Empty"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
                <Info className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Changes Made</h3>
                <p className="text-gray-600">You haven't made any changes to the student record yet.</p>
              </div>
            )}

            {/* Student Summary */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-green-600" />
                Updated Student Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Name:</span> {studentData.firstName} {studentData.middleName} {studentData.lastName}</p>
                    <p><span className="text-gray-600">Date of Birth:</span> {studentData.dateOfBirth}</p>
                    <p><span className="text-gray-600">Gender:</span> {studentData.gender}</p>
                    <p><span className="text-gray-600">Grade/Class:</span> {studentData.grade} - {studentData.class}</p>
                    <p><span className="text-gray-600">Status:</span> {studentData.status}</p>
                    <p><span className="text-gray-600">Blood Group:</span> {studentData.bloodGroup}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Primary Contact:</span> {parentData.primary.title} {parentData.primary.firstName} {parentData.primary.lastName}</p>
                    <p><span className="text-gray-600">Relationship:</span> {parentData.primary.relationship}</p>
                    <p><span className="text-gray-600">Phone:</span> {parentData.primary.phone}</p>
                    <p><span className="text-gray-600">Email:</span> {parentData.primary.email}</p>
                    <p><span className="text-gray-600">Address:</span> {studentData.address}</p>
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
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              Next
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 ${
                hasChanges
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Change Log Modal */}
      {showChangeLog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <History className="w-6 h-6" />
                  Change Log ({changes.length} changes)
                </h2>
                <button
                  onClick={() => setShowChangeLog(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {changes.length > 0 ? (
                <div className="space-y-4">
                  {changes.map((change) => (
                    <div key={change.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{change.section} - {change.field}</span>
                        <span className="text-sm text-gray-500">{change.timestamp}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Previous Value:</p>
                          <p className="bg-red-50 text-red-800 p-2 rounded">{change.oldValue || "Empty"}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">New Value:</p>
                          <p className="bg-green-50 text-green-800 p-2 rounded">{change.newValue || "Empty"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No changes recorded yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client"

import { useState } from "react";
import { 
  Plus, 
  Calendar,
  Clock,
  Users,
  BookOpen,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  FileText,
  Settings,
  Target,
  Award,
  Timer,
  MapPin
} from "lucide-react";
import Link from "next/link";

const examTypes = [
  { id: 1, name: "Mid-Term Examination", code: "MID", color: "#3b82f6", duration: "2 weeks", description: "Comprehensive mid-semester assessment" },
  { id: 2, name: "End of Term Examination", code: "EOT", color: "#10b981", duration: "3 weeks", description: "Final term evaluation covering all topics" },
  { id: 3, name: "Class Test", code: "CT", color: "#f59e0b", duration: "1 week", description: "Regular assessment of specific topics" },
  { id: 4, name: "Quiz", code: "QZ", color: "#8b5cf6", duration: "1 day", description: "Quick evaluation of recent learning" },
  { id: 5, name: "Assignment", code: "ASG", color: "#ef4444", duration: "1 week", description: "Take-home project or research work" },
];

const subjects = [
  { id: 1, name: "Mathematics", code: "MATH", color: "#10b981" },
  { id: 2, name: "English Language", code: "ENG", color: "#3b82f6" },
  { id: 3, name: "Science", code: "SCI", color: "#8b5cf6" },
  { id: 4, name: "Social Studies", code: "SST", color: "#f59e0b" },
  { id: 5, name: "Computing", code: "ICT", color: "#ef4444" },
  { id: 6, name: "RME", code: "RME", color: "#06b6d4" },
  { id: 7, name: "French", code: "FRE", color: "#84cc16" },
  { id: 8, name: "Physical Education", code: "PE", color: "#f97316" },
];

const classes = [
  { id: 1, name: "Grade 1", students: 45, subjects: 6 },
  { id: 2, name: "Grade 2", students: 42, subjects: 6 },
  { id: 3, name: "Grade 3", students: 38, subjects: 7 },
  { id: 4, name: "Grade 4", students: 35, subjects: 8 },
  { id: 5, name: "Grade 5", students: 40, subjects: 8 },
  { id: 6, name: "Grade 6", students: 33, subjects: 8 },
];

export default function CreateExaminationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    selectedClasses: [],
    selectedSubjects: [],
    duration: "",
    totalMarks: "",
    passMarks: "",
    instructions: "",
    venue: "",
    materials: []
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const steps = [
    { id: 1, title: "Basic Information", icon: FileText },
    { id: 2, title: "Schedule & Duration", icon: Calendar },
    { id: 3, title: "Classes & Subjects", icon: BookOpen },
    { id: 4, title: "Settings & Review", icon: Settings }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      // Redirect to examinations page
      window.location.href = "/headmaster/academics/exams";
    }, 2000);
  };

  const selectedExamType = examTypes.find(type => type.id === parseInt(formData.type));
  const totalStudents = formData.selectedClasses.reduce((acc, classId) => {
    const classData = classes.find(c => c.id === parseInt(classId));
    return acc + (classData?.students || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/headmaster/academics/exams"
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <Plus className="w-10 h-10" />
                  Create New Examination
                </h1>
                <p className="text-purple-100 text-lg">Set up a comprehensive academic assessment</p>
              </div>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">Step {currentStep}</div>
                <div className="text-sm text-purple-100">of {steps.length}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 flex items-center">
              <div className={`flex items-center gap-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= step.id 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                } transition-colors`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className={`font-semibold ${currentStep >= step.id ? 'text-purple-700' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                  <div className="text-sm text-gray-500">Step {step.id}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-4 rounded ${
                  currentStep > step.id ? 'bg-purple-500' : 'bg-gray-200'
                } transition-colors`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Examination Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., First Term Mid-Term Examination"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Examination Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {examTypes.map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => handleInputChange('type', type.id.toString())}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.type === type.id.toString()
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: type.color }}
                          ></div>
                          <h3 className="font-semibold text-gray-900">{type.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{type.description}</p>
                        <div className="flex items-center justify-between mt-3 text-sm">
                          <span className="text-gray-500">Code: {type.code}</span>
                          <span className="text-purple-600 font-medium">Duration: {type.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    placeholder="Provide a detailed description of the examination, including its purpose and scope..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 2: Schedule & Duration */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule & Duration</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Start Date</label>
                    <input 
                      type="date" 
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">End Date</label>
                    <input 
                      type="date" 
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Start Time</label>
                    <input 
                      type="time" 
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">End Time</label>
                    <input 
                      type="time" 
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Duration (minutes)</label>
                    <input 
                      type="number" 
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      placeholder="e.g., 120"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Venue</label>
                    <input 
                      type="text" 
                      value={formData.venue}
                      onChange={(e) => handleInputChange('venue', e.target.value)}
                      placeholder="e.g., Main Hall, Classroom A"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Classes & Subjects */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Classes & Subjects</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Classes</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {classes.map((classItem) => (
                      <label key={classItem.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.selectedClasses.includes(classItem.id.toString())}
                          onChange={(e) => handleArrayChange('selectedClasses', classItem.id.toString(), e.target.checked)}
                          className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500" 
                        />
                        <div className="ml-3 flex-1">
                          <div className="font-semibold text-gray-900">{classItem.name}</div>
                          <div className="text-sm text-gray-500">{classItem.students} students • {classItem.subjects} subjects</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Subjects</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subjects.map((subject) => (
                      <label key={subject.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.selectedSubjects.includes(subject.id.toString())}
                          onChange={(e) => handleArrayChange('selectedSubjects', subject.id.toString(), e.target.checked)}
                          className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500" 
                        />
                        <div className="ml-3 flex-1 flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: subject.color }}
                          ></div>
                          <div>
                            <div className="font-semibold text-gray-900">{subject.name}</div>
                            <div className="text-sm text-gray-500">Code: {subject.code}</div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Settings & Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings & Review</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Total Marks</label>
                    <input 
                      type="number" 
                      value={formData.totalMarks}
                      onChange={(e) => handleInputChange('totalMarks', e.target.value)}
                      placeholder="e.g., 100"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Pass Marks</label>
                    <input 
                      type="number" 
                      value={formData.passMarks}
                      onChange={(e) => handleInputChange('passMarks', e.target.value)}
                      placeholder="e.g., 50"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Instructions</label>
                  <textarea 
                    value={formData.instructions}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    rows={4}
                    placeholder="Special instructions for students and invigilators..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  ></textarea>
                </div>

                {/* Review Summary */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-purple-900 mb-4">Examination Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-purple-700">Name:</span>
                      <span className="ml-2 text-gray-900">{formData.name || "Not specified"}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Type:</span>
                      <span className="ml-2 text-gray-900">{selectedExamType?.name || "Not selected"}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Schedule:</span>
                      <span className="ml-2 text-gray-900">
                        {formData.startDate && formData.endDate 
                          ? `${formData.startDate} to ${formData.endDate}` 
                          : "Not set"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Duration:</span>
                      <span className="ml-2 text-gray-900">{formData.duration ? `${formData.duration} minutes` : "Not set"}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Classes:</span>
                      <span className="ml-2 text-gray-900">{formData.selectedClasses.length} selected</span>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Subjects:</span>
                      <span className="ml-2 text-gray-900">{formData.selectedSubjects.length} selected</span>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Total Students:</span>
                      <span className="ml-2 text-gray-900">{totalStudents}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-700">Marks:</span>
                      <span className="ml-2 text-gray-900">
                        {formData.totalMarks && formData.passMarks 
                          ? `${formData.passMarks}/${formData.totalMarks}` 
                          : "Not set"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <button 
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 4 ? (
                <button 
                  onClick={nextStep}
                  className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Create Examination
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Selected Classes:</span>
                <span className="font-semibold">{formData.selectedClasses.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Selected Subjects:</span>
                <span className="font-semibold">{formData.selectedSubjects.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Students:</span>
                <span className="font-semibold text-purple-600">{totalStudents}</span>
              </div>
              {selectedExamType && (
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: selectedExamType.color }}
                    ></div>
                    <span className="font-semibold text-purple-700">{selectedExamType.name}</span>
                  </div>
                  <p className="text-sm text-purple-600">{selectedExamType.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Help Tips */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tips</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Choose an appropriate examination type for your assessment needs</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Set realistic duration based on the number of questions</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Include clear instructions for both students and teachers</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Review all details before creating the examination</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Examination Created Successfully!</h2>
              <p className="text-gray-600 mb-6">Your examination has been created and is ready for scheduling.</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">
                  <div className="font-semibold text-gray-900">{formData.name}</div>
                  <div>Total Students: {totalStudents}</div>
                  <div>Subjects: {formData.selectedSubjects.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
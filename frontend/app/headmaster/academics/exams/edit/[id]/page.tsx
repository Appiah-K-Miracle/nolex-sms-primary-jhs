"use client"

import { useState } from "react";
import { 
  Edit3,
  Save,
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  BookOpen,
  MapPin,
  Target,
  AlertCircle,
  CheckCircle,
  FileText,
  Settings,
  Timer,
  Award,
  RefreshCw,
  X
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

const venues = [
  { id: 1, name: "Main Hall", capacity: 200 },
  { id: 2, name: "Sports Hall", capacity: 300 },
  { id: 3, name: "Classroom Block A", capacity: 150 },
  { id: 4, name: "Classroom Block B", capacity: 150 },
  { id: 5, name: "Computer Lab", capacity: 40 },
  { id: 6, name: "Science Lab", capacity: 50 },
];

// Sample existing data - in real app this would come from props/API
const existingExamData = {
  id: 1,
  name: "First Term Mid-Term Examination",
  type: "1",
  description: "Comprehensive mid-semester assessment covering all subjects taught in the first half of the term. This examination aims to evaluate student understanding and progress in key learning areas.",
  startDate: "2024-11-15",
  endDate: "2024-11-29",
  startTime: "08:00",
  endTime: "12:00",
  duration: "120",
  venue: "Main Hall",
  totalMarks: "100",
  passMarks: "50",
  selectedClasses: ["1", "2", "3"],
  selectedSubjects: ["1", "2", "3", "4"],
  instructions: "Students must arrive 30 minutes before the examination starts. Bring writing materials and a calculator for Mathematics. Mobile phones are strictly prohibited.",
  status: "Active"
};

export default function EditExaminationPage({ params }) {
  const [formData, setFormData] = useState(existingExamData);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setShowSaveModal(true);
    setTimeout(() => {
      setShowSaveModal(false);
      setHasChanges(false);
      // In real app: redirect or update UI
    }, 2000);
  };

  const selectedExamType = examTypes.find(type => type.id === parseInt(formData.type));
  const totalStudents = formData.selectedClasses.reduce((acc, classId) => {
    const classData = classes.find(c => c.id === parseInt(classId));
    return acc + (classData?.students || 0);
  }, 0);

  const tabs = [
    { id: "basic", title: "Basic Info", icon: FileText },
    { id: "schedule", title: "Schedule", icon: Calendar },
    { id: "participants", title: "Participants", icon: Users },
    { id: "settings", title: "Settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl shadow-lg mb-8 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href={`/headmaster/academics/exams/${params?.id || '1'}`}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <Edit3 className="w-10 h-10" />
                  Edit Examination
                </h1>
                <p className="text-orange-100 text-lg">Modify examination details and settings</p>
                <div className="flex items-center gap-6 mt-4 text-orange-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">{formData.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{totalStudents} Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formData.startDate} to {formData.endDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleSave}
                disabled={!hasChanges}
                className={`py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  hasChanges 
                    ? "bg-white hover:bg-orange-50 text-orange-700 border-2 border-white" 
                    : "bg-white/50 text-orange-300 border-2 border-white/50 cursor-not-allowed"
                }`}
              >
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </button>
              <Link 
                href={`/headmaster/academics/exams/${params?.id || '1'}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Changes Indicator */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <div>
              <div className="font-semibold text-yellow-800">Unsaved Changes</div>
              <div className="text-sm text-yellow-700">You have unsaved changes. Don't forget to save your modifications.</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 px-8 py-4 font-semibold focus:outline-none transition-all duration-300 ${
                activeTab === tab.id 
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" 
                  : "text-gray-500 hover:text-orange-600 hover:bg-orange-50"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex items-center justify-center gap-2">
                <tab.icon className="w-5 h-5" />
                <span>{tab.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Basic Information Tab */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Examination Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
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
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
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
                          <span className="text-orange-600 font-medium">Duration: {type.duration}</span>
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Instructions</label>
                  <textarea 
                    value={formData.instructions}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === "schedule" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule & Timing</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Start Date</label>
                    <input 
                      type="date" 
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">End Date</label>
                    <input 
                      type="date" 
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">End Time</label>
                    <input 
                      type="time" 
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Venue</label>
                    <select 
                      value={formData.venue}
                      onChange={(e) => handleInputChange('venue', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {venues.map((venue) => (
                        <option key={venue.id} value={venue.name}>{venue.name} ({venue.capacity} capacity)</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Participants Tab */}
            {activeTab === "participants" && (
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
                          className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500" 
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
                          className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500" 
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

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Examination Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Total Marks</label>
                    <input 
                      type="number" 
                      value={formData.totalMarks}
                      onChange={(e) => handleInputChange('totalMarks', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Pass Marks</label>
                    <input 
                      type="number" 
                      value={formData.passMarks}
                      onChange={(e) => handleInputChange('passMarks', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Summary */}
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-orange-900 mb-4">Summary of Changes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-orange-700">Name:</span>
                      <span className="ml-2 text-gray-900">{formData.name}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-orange-700">Type:</span>
                      <span className="ml-2 text-gray-900">{selectedExamType?.name || "Not selected"}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-orange-700">Schedule:</span>
                      <span className="ml-2 text-gray-900">{formData.startDate} to {formData.endDate}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-orange-700">Duration:</span>
                      <span className="ml-2 text-gray-900">{formData.duration} minutes</span>
                    </div>
                    <div>
                      <span className="font-semibold text-orange-700">Classes:</span>
                      <span className="ml-2 text-gray-900">{formData.selectedClasses.length} selected</span>
                    </div>
                    <div>
                      <span className="font-semibold text-orange-700">Subjects:</span>
                      <span className="ml-2 text-gray-900">{formData.selectedSubjects.length} selected</span>
                    </div>
                    <div>
                      <span className="font-semibold text-orange-700">Total Students:</span>
                      <span className="ml-2 text-gray-900">{totalStudents}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-orange-700">Status:</span>
                      <span className="ml-2 text-gray-900">{formData.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Current Stats</h3>
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
                <span className="font-semibold text-orange-600">{totalStudents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold">{formData.status}</span>
              </div>
              {selectedExamType && (
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: selectedExamType.color }}
                    ></div>
                    <span className="font-semibold text-orange-700">{selectedExamType.name}</span>
                  </div>
                  <p className="text-sm text-orange-600">{selectedExamType.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-300 flex items-center gap-3">
                <RefreshCw className="w-5 h-5" />
                <span>Reset Form</span>
              </button>
              <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 flex items-center gap-3">
                <FileText className="w-5 h-5" />
                <span>Preview</span>
              </button>
              <Link 
                href="/headmaster/academics/exams"
                className="w-full p-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-300 flex items-center gap-3"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to List</span>
              </Link>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Editing Tips</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Changes will be saved automatically when you click Save</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Modifying active exams may affect ongoing assessments</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">All changes are tracked and can be reviewed later</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Success Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Changes Saved Successfully!</h2>
              <p className="text-gray-600 mb-6">Your examination has been updated with the latest changes.</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">
                  <div className="font-semibold text-gray-900">{formData.name}</div>
                  <div>Status: {formData.status}</div>
                  <div>Students: {totalStudents}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
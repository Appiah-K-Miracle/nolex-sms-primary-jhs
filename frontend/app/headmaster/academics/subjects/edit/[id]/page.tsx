"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  BookOpen, 
  User,
  Hash,
  Clock,
  Target,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Award,
  Brain,
  Settings,
  Palette,
  Trash2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

const subjects = [
  { 
    id: 1, 
    name: "Mathematics", 
    code: "MATH101", 
    teacher: "Mr. John Doe - Mathematics",
    credits: "5",
    difficulty: "Medium",
    category: "Core Subject",
    description: "Comprehensive mathematics covering algebra, geometry, and basic statistics for primary level students.",
    prerequisites: "Basic Arithmetic",
    duration: "60",
    assessmentType: "Continuous Assessment",
    color: "#10b981",
    classes: 6,
    teachers: 3,
    hours: 5
  },
  { 
    id: 2, 
    name: "English Language", 
    code: "ENG101", 
    teacher: "Ms. Jane Smith - English",
    credits: "5",
    difficulty: "Medium",
    category: "Core Subject",
    description: "English language development focusing on reading, writing, speaking, and listening skills.",
    prerequisites: "Basic Literacy",
    duration: "45",
    assessmentType: "Mixed Assessment",
    color: "#3b82f6",
    classes: 6,
    teachers: 2,
    hours: 5
  }
];

export default function EditSubjectPage() {
  const params = useParams();
  const { id } = params;

  const subjectId = typeof id === 'string' ? parseInt(id, 10) : NaN;
  const subjectData = subjects.find((s) => s.id === subjectId);

  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    teacher: "",
    credits: "",
    difficulty: "",
    category: "",
    description: "",
    prerequisites: "",
    duration: "",
    assessmentType: "",
    color: "#10b981"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (subjectData) {
      setFormData({
        subjectName: subjectData.name,
        subjectCode: subjectData.code,
        teacher: subjectData.teacher,
        credits: subjectData.credits,
        difficulty: subjectData.difficulty,
        category: subjectData.category,
        description: subjectData.description,
        prerequisites: subjectData.prerequisites,
        duration: subjectData.duration,
        assessmentType: subjectData.assessmentType,
        color: subjectData.color
      });
    }
  }, [subjectData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Updated Subject:", formData);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 2000);
  };

  const handleDelete = () => {
    console.log("Deleting subject:", subjectId);
    setShowDeleteConfirm(false);
    // Add delete logic here
  };

  if (!subjectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Subject Not Found</h1>
          <p className="text-gray-600 mb-6">The requested subject could not be found in our records.</p>
          <Link href="/headmaster/academics/classes" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
            Back to Subjects
          </Link>
        </div>
      </div>
    );
  }

  const teachers = [
    "Mr. John Doe - Mathematics",
    "Ms. Jane Smith - English", 
    "Mr. David Johnson - Science",
    "Ms. Emily Williams - Social Studies",
    "Mr. Michael Brown - Physical Education",
    "Dr. Sarah Wilson - Computer Science",
    "Ms. Mary Johnson - Art",
    "Rev. James Smith - Religious Studies"
  ];

  const difficulties = [
    { value: "Easy", color: "green", description: "Beginner level" },
    { value: "Medium", color: "yellow", description: "Intermediate level" },
    { value: "Hard", color: "red", description: "Advanced level" }
  ];

  const categories = [
    "Core Subject",
    "Elective",
    "Extracurricular", 
    "STEM",
    "Arts & Humanities",
    "Physical Education",
    "Language"
  ];

  const assessmentTypes = [
    "Continuous Assessment",
    "Exam Based",
    "Project Based",
    "Mixed Assessment"
  ];

  const subjectColors = [
    "#10b981", // Green
    "#3b82f6", // Blue
    "#8b5cf6", // Purple
    "#f59e0b", // Yellow
    "#ef4444", // Red
    "#06b6d4", // Cyan
    "#84cc16", // Lime
    "#f97316"  // Orange
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link href="/headmaster/academics/classes" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Subjects</span>
              </Link>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Settings className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Edit Subject: {subjectData.name}</h1>
                  <p className="text-xl text-blue-100">Modify subject information and settings</p>
                </div>
              </div>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-500/80 hover:bg-red-600/80 backdrop-blur-sm text-white py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <Trash2 className="w-5 h-5" />
                Delete Subject
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white p-6 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in">
          <CheckCircle className="w-6 h-6" />
          <div>
            <div className="font-semibold">Subject Updated Successfully!</div>
            <div className="text-sm text-green-100">The subject information has been updated.</div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-full">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Delete Subject</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{subjectData.name}"</span>? 
                This will permanently remove:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-6 ml-4">
                <li>• Subject from all {subjectData.classes} classes</li>
                <li>• All lesson plans and curriculum content</li>
                <li>• Student grades and assessment records</li>
                <li>• Teacher assignments and schedules</li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">This action cannot be undone!</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDeleteConfirm(false)} 
                  className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete} 
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-8 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Form Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Subject Information</h2>
                <p className="text-gray-600">Update the subject details and settings</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="space-y-6">
                
                {/* Subject Name */}
                <div>
                  <label htmlFor="subjectName" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Subject Name *
                  </label>
                  <input
                    type="text"
                    id="subjectName"
                    name="subjectName"
                    value={formData.subjectName}
                    onChange={handleInputChange}
                    placeholder="e.g., Mathematics, English Language, Science..."
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* Subject Code */}
                <div>
                  <label htmlFor="subjectCode" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Hash className="w-5 h-5 text-blue-600" />
                    Subject Code *
                  </label>
                  <input
                    type="text"
                    id="subjectCode"
                    name="subjectCode"
                    value={formData.subjectCode}
                    onChange={handleInputChange}
                    placeholder="e.g., MATH101, ENG101, SCI101..."
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* Subject Teacher */}
                <div>
                  <label htmlFor="teacher" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <User className="w-5 h-5 text-blue-600" />
                    Subject Teacher *
                  </label>
                  <select
                    id="teacher"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    required
                  >
                    <option value="">Select a teacher...</option>
                    {teachers.map((teacher, index) => (
                      <option key={index} value={teacher}>{teacher}</option>
                    ))}
                  </select>
                </div>

                {/* Credits */}
                <div>
                  <label htmlFor="credits" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Award className="w-5 h-5 text-blue-600" />
                    Credit Hours
                  </label>
                  <input
                    type="number"
                    id="credits"
                    name="credits"
                    value={formData.credits}
                    onChange={handleInputChange}
                    placeholder="Number of credit hours"
                    min="1"
                    max="10"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Difficulty Level */}
                <div>
                  <label htmlFor="difficulty" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Target className="w-5 h-5 text-blue-600" />
                    Difficulty Level *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {difficulties.map((level) => (
                      <label key={level.value} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="difficulty"
                          value={level.value}
                          checked={formData.difficulty === level.value}
                          onChange={handleInputChange}
                          className="sr-only"
                          required
                        />
                        <div className={`p-4 border-2 rounded-xl text-center transition-all duration-300 ${
                          formData.difficulty === level.value
                            ? `border-${level.color}-500 bg-${level.color}-50 text-${level.color}-700`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="font-semibold">{level.value}</div>
                          <div className="text-sm text-gray-500">{level.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                
                {/* Category */}
                <div>
                  <label htmlFor="category" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Settings className="w-5 h-5 text-blue-600" />
                    Subject Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    required
                  >
                    <option value="">Select category...</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label htmlFor="duration" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Class Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 45, 60, 90..."
                    min="30"
                    max="120"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Assessment Type */}
                <div>
                  <label htmlFor="assessmentType" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Assessment Type
                  </label>
                  <select
                    id="assessmentType"
                    name="assessmentType"
                    value={formData.assessmentType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                  >
                    <option value="">Select assessment type...</option>
                    {assessmentTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Subject Color */}
                <div>
                  <label htmlFor="color" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Palette className="w-5 h-5 text-blue-600" />
                    Subject Color
                  </label>
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    {subjectColors.map((color) => (
                      <label key={color} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="color"
                          value={color}
                          checked={formData.color === color}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div 
                          className={`w-12 h-12 rounded-xl border-4 transition-all duration-300 ${
                            formData.color === color ? 'border-gray-400 scale-110' : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: color }}
                        ></div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div>
                  <label htmlFor="prerequisites" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                    Prerequisites
                  </label>
                  <input
                    type="text"
                    id="prerequisites"
                    name="prerequisites"
                    value={formData.prerequisites}
                    onChange={handleInputChange}
                    placeholder="Required previous subjects (optional)"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Subject Description */}
            <div className="mt-8">
              <label htmlFor="description" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Subject Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the subject objectives, content coverage, and learning outcomes..."
                rows={4}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 resize-none"
              />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-12 pt-8 border-t border-gray-200">
              <Link 
                href="/headmaster/academics/classes"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-center"
              >
                Cancel
              </Link>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Subject
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Current Stats Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Active Classes</h3>
            <p className="text-2xl font-bold text-blue-600">{subjectData.classes}</p>
            <p className="text-sm text-gray-600">classes using this subject</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Assigned Teachers</h3>
            <p className="text-2xl font-bold text-green-600">{subjectData.teachers}</p>
            <p className="text-sm text-gray-600">qualified instructors</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Weekly Hours</h3>
            <p className="text-2xl font-bold text-orange-600">{subjectData.hours}h</p>
            <p className="text-sm text-gray-600">per week instruction</p>
          </div>
        </div>
      </div>
    </div>
  );
}
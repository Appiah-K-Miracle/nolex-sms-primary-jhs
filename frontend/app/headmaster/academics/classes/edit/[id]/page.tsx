"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Users, 
  User,
  MapPin,
  Clock,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Calendar,
  GraduationCap,
  Target,
  Settings,
  Trash2
} from "lucide-react";
import Link from "next/link";

const classes = [
  { 
    id: 1, 
    name: "Grade 1", 
    teacher: "Mr. John Doe", 
    subjects: 5,
    students: 28,
    room: "A101",
    schedule: "8:00 AM - 2:00 PM",
    performance: 92,
    capacity: 30,
    academicYear: "2024-2025",
    term: "1",
    description: "Foundation level class focusing on basic literacy and numeracy skills."
  },
  { 
    id: 2, 
    name: "Grade 2", 
    teacher: "Ms. Jane Smith", 
    subjects: 5,
    students: 30,
    room: "A102",
    schedule: "8:00 AM - 2:00 PM",
    performance: 88,
    capacity: 32,
    academicYear: "2024-2025",
    term: "1",
    description: "Building on foundation skills with increased focus on reading comprehension."
  }
];

export default function EditClassPage() {
  const params = useParams();
  const { id } = params;

  const classId = typeof id === 'string' ? parseInt(id, 10) : NaN;
  const classData = classes.find((c) => c.id === classId);

  const [formData, setFormData] = useState({
    className: "",
    classTeacher: "",
    capacity: "",
    room: "",
    schedule: "",
    description: "",
    academicYear: "2024-2025",
    term: "1"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (classData) {
      setFormData({
        className: classData.name,
        classTeacher: classData.teacher,
        capacity: classData.capacity.toString(),
        room: classData.room,
        schedule: classData.schedule,
        description: classData.description,
        academicYear: classData.academicYear,
        term: classData.term
      });
    }
  }, [classData]);

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
      console.log("Updated Class:", formData);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 2000);
  };

  const handleDelete = () => {
    console.log("Deleting class:", classId);
    setShowDeleteConfirm(false);
    // Add delete logic here
  };

  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Class Not Found</h1>
          <p className="text-gray-600 mb-6">The requested class could not be found in our records.</p>
          <Link href="/headmaster/academics/classes" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
            Back to Classes
          </Link>
        </div>
      </div>
    );
  }

  const teachers = [
    "Mr. John Doe",
    "Ms. Jane Smith", 
    "Mr. David Johnson",
    "Ms. Emily Williams",
    "Mr. Michael Brown",
    "Dr. Sarah Wilson",
    "Ms. Mary Johnson",
    "Rev. James Smith"
  ];

  const rooms = [
    "A101", "A102", "B101", "B102", "C101", "C102", "D101", "D102"
  ];

  const schedules = [
    "8:00 AM - 2:00 PM",
    "8:00 AM - 2:30 PM",
    "8:00 AM - 3:00 PM",
    "8:30 AM - 2:30 PM",
    "8:30 AM - 3:00 PM"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link href="/headmaster/academics/classes" className="flex items-center gap-2 text-green-100 hover:text-white transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Classes</span>
              </Link>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Settings className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Edit Class: {classData.name}</h1>
                  <p className="text-xl text-green-100">Modify class information and settings</p>
                </div>
              </div>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-500/80 hover:bg-red-600/80 backdrop-blur-sm text-white py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <Trash2 className="w-5 h-5" />
                Delete Class
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
            <div className="font-semibold">Class Updated Successfully!</div>
            <div className="text-sm text-green-100">The class information has been updated.</div>
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
                <h2 className="text-xl font-bold text-gray-900">Delete Class</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{classData.name}"</span>? 
                This will permanently remove:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-6 ml-4">
                <li>• All class information and settings</li>
                <li>• Student enrollments ({classData.students} students)</li>
                <li>• Subject assignments and schedules</li>
                <li>• Academic records and progress data</li>
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
      <div className="max-w-4xl mx-auto p-8 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Form Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Class Information</h2>
                <p className="text-gray-600">Update the class details and settings</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column */}
              <div className="space-y-6">
                
                {/* Class Name */}
                <div>
                  <label htmlFor="className" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    Class Name *
                  </label>
                  <input
                    type="text"
                    id="className"
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    placeholder="e.g., Grade 1, Form 2A, Primary 3..."
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* Class Teacher */}
                <div>
                  <label htmlFor="classTeacher" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <User className="w-5 h-5 text-green-600" />
                    Class Teacher *
                  </label>
                  <select
                    id="classTeacher"
                    name="classTeacher"
                    value={formData.classTeacher}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    required
                  >
                    <option value="">Select a teacher...</option>
                    {teachers.map((teacher, index) => (
                      <option key={index} value={teacher}>{teacher}</option>
                    ))}
                  </select>
                </div>

                {/* Room Assignment */}
                <div>
                  <label htmlFor="room" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Classroom *
                  </label>
                  <select
                    id="room"
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    required
                  >
                    <option value="">Select a room...</option>
                    {rooms.map((room, index) => (
                      <option key={index} value={room}>Room {room}</option>
                    ))}
                  </select>
                </div>

                {/* Class Capacity */}
                <div>
                  <label htmlFor="capacity" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Users className="w-5 h-5 text-green-600" />
                    Student Capacity *
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="Maximum number of students"
                    min="1"
                    max="50"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                
                {/* Schedule */}
                <div>
                  <label htmlFor="schedule" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Clock className="w-5 h-5 text-green-600" />
                    Class Schedule *
                  </label>
                  <select
                    id="schedule"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    required
                  >
                    <option value="">Select schedule...</option>
                    {schedules.map((schedule, index) => (
                      <option key={index} value={schedule}>{schedule}</option>
                    ))}
                  </select>
                </div>

                {/* Academic Year */}
                <div>
                  <label htmlFor="academicYear" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Calendar className="w-5 h-5 text-green-600" />
                    Academic Year *
                  </label>
                  <select
                    id="academicYear"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    required
                  >
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                  </select>
                </div>

                {/* Term */}
                <div>
                  <label htmlFor="term" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Target className="w-5 h-5 text-green-600" />
                    Term *
                  </label>
                  <select
                    id="term"
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    required
                  >
                    <option value="1">Term 1</option>
                    <option value="2">Term 2</option>
                    <option value="3">Term 3</option>
                  </select>
                </div>

                {/* Class Description */}
                <div>
                  <label htmlFor="description" className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Settings className="w-5 h-5 text-green-600" />
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the class focus and objectives..."
                    rows={4}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 resize-none"
                  />
                </div>
              </div>
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
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Class
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
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Current Enrollment</h3>
            <p className="text-2xl font-bold text-blue-600">{classData.students}</p>
            <p className="text-sm text-gray-600">of {classData.capacity} capacity</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Subjects Assigned</h3>
            <p className="text-2xl font-bold text-green-600">{classData.subjects}</p>
            <p className="text-sm text-gray-600">active subjects</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Performance</h3>
            <p className="text-2xl font-bold text-orange-600">{classData.performance}%</p>
            <p className="text-sm text-gray-600">average score</p>
          </div>
        </div>
      </div>
    </div>
  );
}
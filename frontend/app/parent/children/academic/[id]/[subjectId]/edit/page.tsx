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
  BookOpen,
  Calendar,
  FileText,
  Edit,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Target,
  Clock,
  User
} from "lucide-react";

export default function EditAcademicPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.id as string;
  const subjectId = params.subjectId as string;
  
  // Sample data - In real app, this would be fetched based on childId and subjectId
  const initialData = {
    childName: childId === "1" ? "Kwame Mensah" : "Ama Mensah",
    subjectName: childId === "1" ? "Mathematics" : "Mathematics",
    teacher: childId === "1" ? "Mr. Osei" : "Mrs. Asante",
    assignments: childId === "1" ? [
      { id: 1, title: "Algebra Test", score: 88, maxScore: 100, date: "2025-11-05", type: "test", weight: 20 },
      { id: 2, title: "Geometry Assignment", score: 92, maxScore: 100, date: "2025-11-01", type: "assignment", weight: 15 },
      { id: 3, title: "Mid-term Exam", score: 82, maxScore: 100, date: "2025-10-28", type: "exam", weight: 30 },
      { id: 4, title: "Problem Solving Quiz", score: 90, maxScore: 100, date: "2025-10-25", type: "quiz", weight: 10 },
      { id: 5, title: "Class Participation", score: 95, maxScore: 100, date: "2025-10-20", type: "participation", weight: 10 }
    ] : [
      { id: 6, title: "Arithmetic Test", score: 95, maxScore: 100, date: "2025-11-06", type: "test", weight: 25 },
      { id: 7, title: "Word Problems", score: 85, maxScore: 100, date: "2025-11-02", type: "assignment", weight: 20 },
      { id: 8, title: "Monthly Assessment", score: 90, maxScore: 100, date: "2025-10-30", type: "exam", weight: 30 },
      { id: 9, title: "Mental Math Quiz", score: 92, maxScore: 100, date: "2025-10-27", type: "quiz", weight: 15 }
    ]
  };

  const [formData, setFormData] = useState({
    assignments: [...initialData.assignments],
    goals: [
      { id: 1, description: "Improve test scores to 90%+", targetDate: "2025-12-15", priority: "high" },
      { id: 2, description: "Complete all assignments on time", targetDate: "2025-12-15", priority: "medium" }
    ],
    teacherNotes: "",
    parentNotes: "Kwame has been struggling with geometry concepts. Please provide additional practice materials."
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | null>(null);

  // Handle assignment field changes
  const handleAssignmentChange = (assignmentId: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      assignments: prev.assignments.map(assignment =>
        assignment.id === assignmentId
          ? { ...assignment, [field]: field === 'score' || field === 'maxScore' || field === 'weight' ? Number(value) : value }
          : assignment
      )
    }));
  };

  // Add new assignment
  const addAssignment = () => {
    const newAssignment = {
      id: Date.now(),
      title: "",
      score: 0,
      maxScore: 100,
      date: new Date().toISOString().split('T')[0],
      type: "assignment",
      weight: 10
    };
    
    setFormData(prev => ({
      ...prev,
      assignments: [...prev.assignments, newAssignment]
    }));
  };

  // Remove assignment
  const removeAssignment = (assignmentId: number) => {
    setFormData(prev => ({
      ...prev,
      assignments: prev.assignments.filter(assignment => assignment.id !== assignmentId)
    }));
    setShowDeleteModal(false);
    setSelectedAssignmentId(null);
  };

  // Handle goal changes
  const handleGoalChange = (goalId: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.map(goal =>
        goal.id === goalId ? { ...goal, [field]: value } : goal
      )
    }));
  };

  // Add new goal
  const addGoal = () => {
    const newGoal = {
      id: Date.now(),
      description: "",
      targetDate: "",
      priority: "medium"
    };
    
    setFormData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  // Remove goal
  const removeGoal = (goalId: number) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== goalId)
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Validate assignments
    formData.assignments.forEach((assignment, index) => {
      if (!assignment.title.trim()) {
        newErrors[`assignment_${assignment.id}_title`] = "Assignment title is required";
      }
      if (assignment.score < 0 || assignment.score > assignment.maxScore) {
        newErrors[`assignment_${assignment.id}_score`] = "Score must be between 0 and max score";
      }
      if (assignment.maxScore <= 0) {
        newErrors[`assignment_${assignment.id}_maxScore`] = "Max score must be greater than 0";
      }
      if (assignment.weight < 0 || assignment.weight > 100) {
        newErrors[`assignment_${assignment.id}_weight`] = "Weight must be between 0 and 100";
      }
      if (!assignment.date) {
        newErrors[`assignment_${assignment.id}_date`] = "Date is required";
      }
    });

    // Check if total weight equals 100%
    const totalWeight = formData.assignments.reduce((sum, assignment) => sum + assignment.weight, 0);
    if (totalWeight !== 100) {
      newErrors.totalWeight = `Total weight must equal 100% (currently ${totalWeight}%)`;
    }

    // Validate goals
    formData.goals.forEach((goal) => {
      if (!goal.description.trim()) {
        newErrors[`goal_${goal.id}_description`] = "Goal description is required";
      }
      if (!goal.targetDate) {
        newErrors[`goal_${goal.id}_targetDate`] = "Target date is required";
      }
    });

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
        router.push(`/parent/children/academic/${childId}`);
      }, 3000);
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: "Failed to update academic information. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete confirmation modal
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">Remove Assignment</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove this assignment? This will affect the grade calculation and cannot be undone.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => selectedAssignmentId && removeAssignment(selectedAssignmentId)}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              href={`/parent/children/academic/${childId}`}
              className="mr-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold">Edit Academic Record</h1>
              <p className="text-green-100 text-sm lg:text-base xl:text-lg">
                {initialData.childName} • {initialData.subjectName} • {initialData.teacher}
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
            <p className="text-green-800 font-medium">Academic record updated successfully!</p>
            <p className="text-green-700 text-sm">Redirecting back to academic details...</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Assignments Section */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Assignments & Assessments</h2>
            </div>
            <button
              type="button"
              onClick={addAssignment}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Assignment
            </button>
          </div>

          {/* Total Weight Warning */}
          {errors.totalWeight && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800">{errors.totalWeight}</p>
            </div>
          )}

          <div className="space-y-4">
            {formData.assignments.map((assignment, index) => (
              <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignment Title *
                    </label>
                    <input
                      type="text"
                      value={assignment.title}
                      onChange={(e) => handleAssignmentChange(assignment.id, 'title', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[`assignment_${assignment.id}_title`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter assignment title"
                    />
                    {errors[`assignment_${assignment.id}_title`] && (
                      <p className="text-red-600 text-xs mt-1">{errors[`assignment_${assignment.id}_title`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={assignment.type}
                      onChange={(e) => handleAssignmentChange(assignment.id, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="assignment">Assignment</option>
                      <option value="test">Test</option>
                      <option value="exam">Exam</option>
                      <option value="quiz">Quiz</option>
                      <option value="project">Project</option>
                      <option value="participation">Participation</option>
                      <option value="lab">Lab Work</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Score *</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max={assignment.maxScore}
                        value={assignment.score}
                        onChange={(e) => handleAssignmentChange(assignment.id, 'score', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[`assignment_${assignment.id}_score`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <span className="text-sm text-gray-500">/</span>
                      <input
                        type="number"
                        min="1"
                        value={assignment.maxScore}
                        onChange={(e) => handleAssignmentChange(assignment.id, 'maxScore', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[`assignment_${assignment.id}_maxScore`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {(errors[`assignment_${assignment.id}_score`] || errors[`assignment_${assignment.id}_maxScore`]) && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors[`assignment_${assignment.id}_score`] || errors[`assignment_${assignment.id}_maxScore`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight % *</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={assignment.weight}
                      onChange={(e) => handleAssignmentChange(assignment.id, 'weight', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[`assignment_${assignment.id}_weight`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`assignment_${assignment.id}_weight`] && (
                      <p className="text-red-600 text-xs mt-1">{errors[`assignment_${assignment.id}_weight`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={assignment.date}
                        onChange={(e) => handleAssignmentChange(assignment.id, 'date', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[`assignment_${assignment.id}_date`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAssignmentId(assignment.id);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove assignment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {errors[`assignment_${assignment.id}_date`] && (
                      <p className="text-red-600 text-xs mt-1">{errors[`assignment_${assignment.id}_date`]}</p>
                    )}
                  </div>
                </div>

                {/* Show percentage and weighted contribution */}
                <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 rounded p-2">
                    <span className="text-gray-600">Percentage: </span>
                    <span className="font-medium">
                      {assignment.maxScore > 0 ? Math.round((assignment.score / assignment.maxScore) * 100) : 0}%
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <span className="text-gray-600">Weighted Contribution: </span>
                    <span className="font-medium">
                      {assignment.maxScore > 0 ? ((assignment.score / assignment.maxScore) * assignment.weight).toFixed(1) : 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Grade Calculation */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Grade Calculation Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Total Weight: </span>
                <span className="font-bold">
                  {formData.assignments.reduce((sum, assignment) => sum + assignment.weight, 0)}%
                </span>
              </div>
              <div>
                <span className="text-blue-700">Weighted Average: </span>
                <span className="font-bold">
                  {(() => {
                    const totalWeight = formData.assignments.reduce((sum, assignment) => sum + assignment.weight, 0);
                    const weightedSum = formData.assignments.reduce((sum, assignment) =>
                      sum + (assignment.score / assignment.maxScore * 100) * assignment.weight, 0
                    );
                    return totalWeight > 0 ? (weightedSum / totalWeight).toFixed(1) : "0.0";
                  })()}%
                </span>
              </div>
              <div>
                <span className="text-blue-700">Letter Grade: </span>
                <span className="font-bold">
                  {(() => {
                    const totalWeight = formData.assignments.reduce((sum, assignment) => sum + assignment.weight, 0);
                    const weightedSum = formData.assignments.reduce((sum, assignment) =>
                      sum + (assignment.score / assignment.maxScore * 100) * assignment.weight, 0
                    );
                    const average = totalWeight > 0 ? weightedSum / totalWeight : 0;
                    
                    if (average >= 90) return "A";
                    if (average >= 80) return "B";
                    if (average >= 70) return "C";
                    if (average >= 60) return "D";
                    return "F";
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Goals Section */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Academic Goals</h2>
            </div>
            <button
              type="button"
              onClick={addGoal}
              className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Goal
            </button>
          </div>

          <div className="space-y-4">
            {formData.goals.map((goal) => (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Goal Description *
                    </label>
                    <input
                      type="text"
                      value={goal.description}
                      onChange={(e) => handleGoalChange(goal.id, 'description', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[`goal_${goal.id}_description`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter goal description"
                    />
                    {errors[`goal_${goal.id}_description`] && (
                      <p className="text-red-600 text-xs mt-1">{errors[`goal_${goal.id}_description`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Date *</label>
                    <input
                      type="date"
                      value={goal.targetDate}
                      onChange={(e) => handleGoalChange(goal.id, 'targetDate', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[`goal_${goal.id}_targetDate`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`goal_${goal.id}_targetDate`] && (
                      <p className="text-red-600 text-xs mt-1">{errors[`goal_${goal.id}_targetDate`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <div className="flex items-center gap-2">
                      <select
                        value={goal.priority}
                        onChange={(e) => handleGoalChange(goal.id, 'priority', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => removeGoal(goal.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove goal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Edit className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Notes & Comments</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teacher Notes</label>
              <textarea
                value={formData.teacherNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, teacherNotes: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add teacher comments about student performance..."
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">Teacher notes are read-only for parents</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parent Notes</label>
              <textarea
                value={formData.parentNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, parentNotes: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add your comments, concerns, or observations..."
              />
              <p className="text-xs text-gray-500 mt-1">Share your thoughts with the teacher</p>
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
            href={`/parent/children/academic/${childId}`}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
}
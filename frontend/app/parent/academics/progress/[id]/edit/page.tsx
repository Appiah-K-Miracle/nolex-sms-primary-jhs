"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Save,
  X,
  Plus,
  Target,
  Calendar,
  Clock,
  BookOpen,
  User,
  Users,
  Star,
  AlertTriangle,
  Info,
  Trash2,
  Edit3,
  CheckCircle,
  Circle,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Award,
  MessageSquare,
  Phone,
  Mail,
  Eye,
  BarChart3,
  Activity,
  FileText
} from "lucide-react";

export default function EditProgressPage() {
  const params = useParams();
  const router = useRouter();
  const progressId = params.id as string;
  
  const [activeTab, setActiveTab] = useState("goals");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state for goals
  const [goals, setGoals] = useState([
    {
      id: 1,
      category: "Academic",
      title: "Improve Mathematics Score",
      description: "Achieve 85% or above in Mathematics by end of term",
      target: 85,
      current: 78.5,
      deadline: "2025-12-15",
      strategies: [
        "Complete extra practice problems daily",
        "Attend after-school tutoring sessions",
        "Form study group with classmates"
      ],
      status: "on_track",
      priority: "high"
    },
    {
      id: 2,
      category: "Academic",
      title: "Maintain English Excellence",
      description: "Maintain A- grade or above in English Language",
      target: 85,
      current: 82.3,
      deadline: "2025-12-15",
      strategies: [
        "Read one novel per month",
        "Practice essay writing weekly",
        "Expand vocabulary with 10 new words daily"
      ],
      status: "achieved",
      priority: "medium"
    },
    {
      id: 3,
      category: "Behavioral",
      title: "Improve Science Lab Participation",
      description: "Actively participate in all science laboratory sessions",
      target: 100,
      current: 75,
      deadline: "2025-11-30",
      strategies: [
        "Prepare for lab sessions in advance",
        "Ask questions during experiments",
        "Practice safety procedures"
      ],
      status: "needs_attention",
      priority: "high"
    },
    {
      id: 4,
      category: "Personal",
      title: "Time Management",
      description: "Submit all assignments on time consistently",
      target: 100,
      current: 95,
      deadline: "2025-12-15",
      strategies: [
        "Use assignment planner daily",
        "Set reminders for due dates",
        "Complete assignments 1 day early"
      ],
      status: "on_track",
      priority: "medium"
    }
  ]);

  // Form state for new goal
  const [newGoal, setNewGoal] = useState({
    category: "Academic",
    title: "",
    description: "",
    target: "",
    current: "",
    deadline: "",
    strategies: [""],
    priority: "medium"
  });

  // Form state for parent targets
  const [parentTargets, setParentTargets] = useState({
    overallGPA: 3.5,
    attendanceRate: 95,
    homeworkCompletion: 100,
    extracurricularParticipation: 2,
    readingGoal: 12, // books per year
    studyHoursPerWeek: 15
  });

  // Form state for study plan
  const [studyPlan, setStudyPlan] = useState({
    mondayToFriday: {
      mathematics: 45,
      english: 30,
      science: 45,
      socialStudies: 30,
      other: 30
    },
    weekends: {
      review: 120,
      projects: 90,
      reading: 60,
      extracurricular: 60
    },
    examPreparation: {
      startWeeksBefore: 4,
      dailyHours: 3,
      focusAreas: ["Mathematics", "Science", "English"]
    }
  });

  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  // Sample student record
  const student = {
    name: "Kwame Mensah",
    class: "JHS 2A",
    studentId: "STU001"
  };

  const goalCategories = [
    "Academic",
    "Behavioral", 
    "Personal",
    "Social",
    "Extracurricular"
  ];

  const priorityLevels = [
    { value: "low", label: "Low Priority", color: "text-green-700 bg-green-100 border-green-200" },
    { value: "medium", label: "Medium Priority", color: "text-orange-700 bg-orange-100 border-orange-200" },
    { value: "high", label: "High Priority", color: "text-red-700 bg-red-100 border-red-200" }
  ];

  const statusOptions = [
    { value: "not_started", label: "Not Started", color: "text-gray-700 bg-gray-100 border-gray-200" },
    { value: "on_track", label: "On Track", color: "text-blue-700 bg-blue-100 border-blue-200" },
    { value: "needs_attention", label: "Needs Attention", color: "text-orange-700 bg-orange-100 border-orange-200" },
    { value: "at_risk", label: "At Risk", color: "text-red-700 bg-red-100 border-red-200" },
    { value: "achieved", label: "Achieved", color: "text-green-700 bg-green-100 border-green-200" }
  ];

  const addStrategy = (goalId: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, strategies: [...goal.strategies, ""] }
        : goal
    ));
  };

  const removeStrategy = (goalId: number, strategyIndex: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, strategies: goal.strategies.filter((_, index) => index !== strategyIndex) }
        : goal
    ));
  };

  const updateStrategy = (goalId: number, strategyIndex: number, value: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { 
            ...goal, 
            strategies: goal.strategies.map((strategy, index) => 
              index === strategyIndex ? value : strategy
            )
          }
        : goal
    ));
  };

  const updateGoal = (goalId: number, field: string, value: any) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, [field]: value } : goal
    ));
  };

  const addNewGoal = () => {
    if (newGoal.title && newGoal.description && newGoal.target && newGoal.deadline) {
      const goal = {
        ...newGoal,
        id: Math.max(...goals.map(g => g.id)) + 1,
        target: parseFloat(newGoal.target),
        current: parseFloat(newGoal.current) || 0,
        strategies: newGoal.strategies.filter(s => s.trim() !== ""),
        status: "not_started"
      };
      setGoals(prev => [...prev, goal]);
      setNewGoal({
        category: "Academic",
        title: "",
        description: "",
        target: "",
        current: "",
        deadline: "",
        strategies: [""],
        priority: "medium"
      });
      setShowNewGoalForm(false);
    }
  };

  const removeGoal = (goalId: number) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const addNewGoalStrategy = () => {
    setNewGoal(prev => ({
      ...prev,
      strategies: [...prev.strategies, ""]
    }));
  };

  const updateNewGoalStrategy = (index: number, value: string) => {
    setNewGoal(prev => ({
      ...prev,
      strategies: prev.strategies.map((strategy, i) => i === index ? value : strategy)
    }));
  };

  const removeNewGoalStrategy = (index: number) => {
    setNewGoal(prev => ({
      ...prev,
      strategies: prev.strategies.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would submit to an API
    console.log("Progress goals updated:", { goals, parentTargets, studyPlan });
    
    setIsSubmitting(false);
    router.push(`/parent/academics/progress/${progressId}?message=goals-updated`);
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption?.color || "text-gray-700 bg-gray-100 border-gray-200";
  };

  const getPriorityColor = (priority: string) => {
    const priorityOption = priorityLevels.find(p => p.value === priority);
    return priorityOption?.color || "text-gray-700 bg-gray-100 border-gray-200";
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/parent/academics/progress/${progressId}`}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Edit Progress Goals & Targets</h1>
          <p className="text-gray-600">
            Set and manage academic goals, study plans, and progress targets for {student.name}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'goals', name: 'Academic Goals', icon: Target },
                { id: 'targets', name: 'Parent Targets', icon: Star },
                { id: 'study', name: 'Study Plan', icon: BookOpen }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Academic Goals Tab */}
            {activeTab === 'goals' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Academic & Personal Goals</h2>
                    <p className="text-gray-600">Set specific, measurable goals for your child's development</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNewGoalForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Goal
                  </button>
                </div>

                {/* Existing Goals */}
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
                            <input
                              type="text"
                              value={goal.title}
                              onChange={(e) => updateGoal(goal.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                              value={goal.category}
                              onChange={(e) => updateGoal(goal.id, 'category', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              {goalCategories.map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeGoal(goal.id)}
                          className="ml-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <div className="lg:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={goal.description}
                            onChange={(e) => updateGoal(goal.id, 'description', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Target Value</label>
                          <input
                            type="number"
                            value={goal.target}
                            onChange={(e) => updateGoal(goal.id, 'target', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Value</label>
                          <input
                            type="number"
                            value={goal.current}
                            onChange={(e) => updateGoal(goal.id, 'current', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                          <input
                            type="date"
                            value={goal.deadline}
                            onChange={(e) => updateGoal(goal.id, 'deadline', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                          <select
                            value={goal.priority}
                            onChange={(e) => updateGoal(goal.id, 'priority', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {priorityLevels.map(priority => (
                              <option key={priority.value} value={priority.value}>{priority.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <select
                            value={goal.status}
                            onChange={(e) => updateGoal(goal.id, 'status', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {statusOptions.map(status => (
                              <option key={status.value} value={status.value}>{status.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm text-gray-600">
                            {getProgressPercentage(goal.current, goal.target).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getProgressPercentage(goal.current, goal.target)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Strategies */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm font-medium text-gray-700">Strategies</label>
                          <button
                            type="button"
                            onClick={() => addStrategy(goal.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            Add Strategy
                          </button>
                        </div>
                        <div className="space-y-2">
                          {goal.strategies.map((strategy, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={strategy}
                                onChange={(e) => updateStrategy(goal.id, index, e.target.value)}
                                placeholder="Enter strategy..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                              {goal.strategies.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeStrategy(goal.id, index)}
                                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status and Priority Indicators */}
                      <div className="flex items-center gap-2 mt-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(goal.status)}`}>
                          {statusOptions.find(s => s.value === goal.status)?.label}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(goal.priority)}`}>
                          {priorityLevels.find(p => p.value === goal.priority)?.label}
                        </span>
                        <span className="text-xs text-gray-500">
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Goal Form */}
                {showNewGoalForm && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-blue-900">Add New Goal</h3>
                      <button
                        type="button"
                        onClick={() => setShowNewGoalForm(false)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title *</label>
                        <input
                          type="text"
                          value={newGoal.title}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g., Improve Mathematics Performance"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                        <select
                          value={newGoal.category}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          {goalCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                        <textarea
                          value={newGoal.description}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe what you want to achieve..."
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Value *</label>
                        <input
                          type="number"
                          value={newGoal.target}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                          placeholder="e.g., 85"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Value</label>
                        <input
                          type="number"
                          value={newGoal.current}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, current: e.target.value }))}
                          placeholder="e.g., 75"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Deadline *</label>
                        <input
                          type="date"
                          value={newGoal.deadline}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                        <select
                          value={newGoal.priority}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {priorityLevels.map(priority => (
                            <option key={priority.value} value={priority.value}>{priority.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* New Goal Strategies */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-gray-700">Strategies</label>
                        <button
                          type="button"
                          onClick={addNewGoalStrategy}
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Add Strategy
                        </button>
                      </div>
                      <div className="space-y-2">
                        {newGoal.strategies.map((strategy, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={strategy}
                              onChange={(e) => updateNewGoalStrategy(index, e.target.value)}
                              placeholder="Enter strategy..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {newGoal.strategies.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeNewGoalStrategy(index)}
                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={addNewGoal}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Add Goal
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNewGoalForm(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Parent Targets Tab */}
            {activeTab === 'targets' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Parent Set Targets</h2>
                  <p className="text-gray-600">Set overall targets for your child's academic performance and development</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target Overall GPA</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="4"
                        value={parentTargets.overallGPA}
                        onChange={(e) => setParentTargets(prev => ({ ...prev, overallGPA: parseFloat(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Scale: 0.0 - 4.0</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Attendance Rate (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={parentTargets.attendanceRate}
                        onChange={(e) => setParentTargets(prev => ({ ...prev, attendanceRate: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum acceptable attendance percentage</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Homework Completion Rate (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={parentTargets.homeworkCompletion}
                        onChange={(e) => setParentTargets(prev => ({ ...prev, homeworkCompletion: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Target percentage for homework completion</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Extracurricular Activities</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={parentTargets.extracurricularParticipation}
                        onChange={(e) => setParentTargets(prev => ({ ...prev, extracurricularParticipation: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Number of activities to participate in per term</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reading Goal (Books per Year)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={parentTargets.readingGoal}
                        onChange={(e) => setParentTargets(prev => ({ ...prev, readingGoal: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Target number of books to read this academic year</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Study Hours per Week</label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={parentTargets.studyHoursPerWeek}
                        onChange={(e) => setParentTargets(prev => ({ ...prev, studyHoursPerWeek: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Total study hours outside of school per week</p>
                    </div>
                  </div>
                </div>

                {/* Target Visualization */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{parentTargets.overallGPA}</div>
                      <div className="text-sm text-gray-600">Target GPA</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{parentTargets.attendanceRate}%</div>
                      <div className="text-sm text-gray-600">Min. Attendance</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{parentTargets.readingGoal}</div>
                      <div className="text-sm text-gray-600">Books/Year</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Study Plan Tab */}
            {activeTab === 'study' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Weekly Study Plan</h2>
                  <p className="text-gray-600">Create a structured study schedule for optimal learning</p>
                </div>

                {/* Weekday Study Plan */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Monday to Friday (Minutes per Subject)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {Object.entries(studyPlan.mondayToFriday).map(([subject, minutes]) => (
                      <div key={subject}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {subject.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="180"
                          value={minutes}
                          onChange={(e) => setStudyPlan(prev => ({
                            ...prev,
                            mondayToFriday: {
                              ...prev.mondayToFriday,
                              [subject]: parseInt(e.target.value)
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">{Math.round(minutes/60*10)/10}h daily</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-white rounded border">
                    <p className="text-sm text-gray-600">
                      Total daily study time: <span className="font-semibold">
                        {Math.round(Object.values(studyPlan.mondayToFriday).reduce((a, b) => a + b, 0) / 60 * 10) / 10} hours
                      </span>
                    </p>
                  </div>
                </div>

                {/* Weekend Study Plan */}
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Weekend Activities (Minutes)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(studyPlan.weekends).map(([activity, minutes]) => (
                      <div key={activity}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {activity.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="480"
                          value={minutes}
                          onChange={(e) => setStudyPlan(prev => ({
                            ...prev,
                            weekends: {
                              ...prev.weekends,
                              [activity]: parseInt(e.target.value)
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">{Math.round(minutes/60*10)/10}h per day</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-white rounded border">
                    <p className="text-sm text-gray-600">
                      Total weekend study time: <span className="font-semibold">
                        {Math.round(Object.values(studyPlan.weekends).reduce((a, b) => a + b, 0) / 60 * 10) / 10} hours per day
                      </span>
                    </p>
                  </div>
                </div>

                {/* Exam Preparation Plan */}
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-orange-900 mb-4">Exam Preparation Strategy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Preparation (Weeks Before)</label>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={studyPlan.examPreparation.startWeeksBefore}
                        onChange={(e) => setStudyPlan(prev => ({
                          ...prev,
                          examPreparation: {
                            ...prev.examPreparation,
                            startWeeksBefore: parseInt(e.target.value)
                          }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Daily Study Hours During Exams</label>
                      <input
                        type="number"
                        min="1"
                        max="8"
                        value={studyPlan.examPreparation.dailyHours}
                        onChange={(e) => setStudyPlan(prev => ({
                          ...prev,
                          examPreparation: {
                            ...prev.examPreparation,
                            dailyHours: parseInt(e.target.value)
                          }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority Focus Areas</label>
                      <div className="space-y-2">
                        {studyPlan.examPreparation.focusAreas.map((area, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={area}
                              onChange={(e) => setStudyPlan(prev => ({
                                ...prev,
                                examPreparation: {
                                  ...prev.examPreparation,
                                  focusAreas: prev.examPreparation.focusAreas.map((fa, i) => 
                                    i === index ? e.target.value : fa
                                  )
                                }
                              }))}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              <span>Changes will be saved and shared with teachers for coordination</span>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/parent/academics/progress/${progressId}`}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
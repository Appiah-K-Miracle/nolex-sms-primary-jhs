"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  FileText,
  Calendar,
  Clock,
  User,
  BookOpen,
  Target,
  Flag,
  CheckCircle,
  AlertCircle,
  XCircle,
  Timer,
  Upload,
  Download,
  Eye,
  Edit,
  Send,
  MessageSquare,
  Star,
  Award,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  Calculator,
  Beaker,
  Globe,
  Palette,
  Music,
  Heart,
  Zap,
  Search,
  PaperclipIcon,
  FileIcon,
  ImageIcon,
  VideoIcon,
  ExternalLink,
  Copy,
  Share2,
  Bookmark,
  HelpCircle,
  Info,
  CheckSquare,
  Square,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Lightbulb,
  AlertTriangle
} from "lucide-react";

export default function AssignmentDetailsPage() {
  const params = useParams();
  const assignmentId = params.id;
  
  const [activeTab, setActiveTab] = useState("overview");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [workingNotes, setWorkingNotes] = useState("");
  const [completedObjectives, setCompletedObjectives] = useState<boolean[]>([]);

  // Sample assignment data (in real app, would fetch based on assignmentId)
  const assignment = {
    id: 1,
    child: "Kwame Mensah",
    childId: "1",
    subject: "Mathematics",
    title: "Algebraic Expressions Worksheet",
    description: "Complete exercises 1-15 on algebraic expressions and simplification. This assignment focuses on developing your understanding of algebraic manipulation and problem-solving skills.",
    detailedInstructions: `
      **Instructions:**
      1. Read through all problems before starting
      2. Show all working steps clearly
      3. Use proper mathematical notation
      4. Check your answers by substituting values
      5. Circle your final answers
      
      **What to submit:**
      - Completed worksheet with all working shown
      - Optional: Typed summary of key concepts learned
      
      **Assessment criteria:**
      - Correct application of algebraic rules (40%)
      - Clear working and presentation (30%)
      - Accuracy of final answers (30%)
    `,
    type: "Homework",
    priority: "high",
    dueDate: "2025-11-20",
    assignedDate: "2025-11-13",
    status: "pending",
    teacher: "Mr. Osei",
    teacherEmail: "mr.osei@school.edu.gh",
    teacherPhone: "+233 24 567 8901",
    maxScore: 100,
    submittedScore: null,
    feedback: null,
    attachments: [
      { 
        id: 1,
        name: "algebra_worksheet.pdf", 
        type: "pdf", 
        size: "2.3MB",
        url: "/files/algebra_worksheet.pdf",
        description: "Main worksheet with 15 algebraic problems"
      },
      { 
        id: 2,
        name: "formula_sheet.pdf", 
        type: "pdf", 
        size: "1.1MB",
        url: "/files/formula_sheet.pdf",
        description: "Reference sheet with algebraic formulas"
      },
      { 
        id: 3,
        name: "example_solutions.pdf", 
        type: "pdf", 
        size: "890KB",
        url: "/files/example_solutions.pdf",
        description: "Worked examples for similar problems"
      }
    ],
    estimatedTime: 45,
    requirements: "Show all working steps, use proper mathematical notation",
    submission: null,
    submissionMethod: "physical", // physical, online, both
    classAverage: null,
    difficultyLevel: "medium",
    learningObjectives: [
      "Simplify algebraic expressions using basic rules",
      "Apply the distributive property correctly",
      "Combine like terms in complex expressions",
      "Expand brackets and factorize simple expressions",
      "Solve problems involving algebraic manipulation"
    ],
    prerequisites: [
      "Understanding of basic arithmetic operations",
      "Knowledge of order of operations (BODMAS)",
      "Familiarity with variables and constants"
    ],
    helpResources: [
      {
        title: "Khan Academy - Algebraic Expressions",
        url: "https://khanacademy.org/algebra",
        type: "video",
        description: "Interactive lessons on algebraic expressions"
      },
      {
        title: "Math Textbook Chapter 5",
        url: "/textbook/chapter5",
        type: "text",
        description: "Reference material for algebraic concepts"
      },
      {
        title: "Practice Problems",
        url: "/practice/algebra",
        type: "practice",
        description: "Additional practice problems with solutions"
      }
    ],
    relatedAssignments: [
      {
        id: 7,
        title: "Linear Equations Practice",
        subject: "Mathematics",
        dueDate: "2025-11-25",
        status: "upcoming"
      },
      {
        id: 8,
        title: "Graphing Linear Functions",
        subject: "Mathematics", 
        dueDate: "2025-11-30",
        status: "upcoming"
      }
    ],
    classStats: {
      totalStudents: 35,
      completed: 12,
      inProgress: 8,
      notStarted: 15,
      averageScore: null,
      topScore: null
    },
    teacherFeedback: {
      generalComments: "This assignment builds on our previous work with variables. Take your time and check each step.",
      commonMistakes: [
        "Not distributing negative signs correctly",
        "Forgetting to combine like terms",
        "Incorrect use of brackets"
      ],
      tips: [
        "Always work from left to right",
        "Use different colors for different terms",
        "Check your work by substituting simple values"
      ]
    }
  };

  const messageHistory = [
    {
      id: 1,
      sender: "Mr. Osei",
      message: "Don't forget to show all your working steps clearly. This will help me understand your thought process.",
      timestamp: "2025-11-14 09:30",
      type: "teacher"
    },
    {
      id: 2,
      sender: "Parent",
      message: "Kwame is finding problem 7 challenging. Could you provide some additional guidance?",
      timestamp: "2025-11-14 15:45",
      type: "parent"
    },
    {
      id: 3,
      sender: "Mr. Osei",
      message: "I've uploaded an additional example that shows similar problem-solving steps. Check the example_solutions.pdf file.",
      timestamp: "2025-11-14 16:20",
      type: "teacher"
    }
  ];

  const progressSteps = [
    { step: "Assignment Received", completed: true, date: "2025-11-13" },
    { step: "Started Working", completed: true, date: "2025-11-14" },
    { step: "50% Complete", completed: false, date: null },
    { step: "Ready for Review", completed: false, date: null },
    { step: "Submitted", completed: false, date: null },
    { step: "Graded", completed: false, date: null }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50 border-green-200";
      case "submitted": return "text-blue-600 bg-blue-50 border-blue-200";
      case "in_progress": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "pending": return "text-gray-600 bg-gray-50 border-gray-200";
      case "overdue": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-5 h-5" />;
      case "submitted": return <Upload className="w-5 h-5" />;
      case "in_progress": return <Timer className="w-5 h-5" />;
      case "pending": return <Clock className="w-5 h-5" />;
      case "overdue": return <XCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "hard": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "easy": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf": return <FileIcon className="w-5 h-5 text-red-500" />;
      case "docx":
      case "doc": return <FileText className="w-5 h-5 text-blue-500" />;
      case "jpg":
      case "png":
      case "gif": return <ImageIcon className="w-5 h-5 text-green-500" />;
      case "mp4":
      case "avi": return <VideoIcon className="w-5 h-5 text-purple-500" />;
      default: return <FileIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTimeRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffTime < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) {
      if (diffHours < 0) return "Overdue";
      if (diffHours < 24) return `${diffHours} hours remaining`;
      return "Due today";
    }
    if (diffDays === 1) return "Due tomorrow";
    return `${diffDays} days remaining`;
  };

  const getTimeRemainingColor = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "text-red-600";
    if (diffDays <= 1) return "text-orange-600";
    if (diffDays <= 3) return "text-yellow-600";
    return "text-green-600";
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, would send message to teacher
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleObjectiveToggle = (index: number) => {
    const newCompleted = [...completedObjectives];
    newCompleted[index] = !newCompleted[index];
    setCompletedObjectives(newCompleted);
  };

  const completionPercentage = completedObjectives.length > 0 
    ? Math.round((completedObjectives.filter(Boolean).length / completedObjectives.length) * 100)
    : 0;

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/parent/academics/assignments"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{assignment.title}</h1>
            <p className="text-blue-100 text-sm lg:text-base">
              {assignment.subject} • {assignment.child} • {assignment.teacher}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Due Date</span>
            </div>
            <div className="text-lg font-bold">{new Date(assignment.dueDate).toLocaleDateString()}</div>
            <div className={`text-sm ${getTimeRemainingColor(assignment.dueDate)}`}>
              {formatTimeRemaining(assignment.dueDate)}
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="w-4 h-4" />
              <span className="text-sm font-medium">Estimated Time</span>
            </div>
            <div className="text-lg font-bold">{assignment.estimatedTime} minutes</div>
            <div className="text-sm text-blue-100">Expected duration</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">Max Score</span>
            </div>
            <div className="text-lg font-bold">{assignment.maxScore} points</div>
            <div className="text-sm text-blue-100">Total possible</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon(assignment.status)}
              <span className="text-sm font-medium">Status</span>
            </div>
            <div className="text-lg font-bold capitalize">{assignment.status.replace('_', ' ')}</div>
            <div className="text-sm text-blue-100">Current state</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setShowHelpModal(true)}
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 font-medium"
        >
          <HelpCircle className="w-4 h-4" />
          Get Help
        </button>
        <button
          onClick={() => setShowShareModal(true)}
          className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2 font-medium"
        >
          <Share2 className="w-4 h-4" />
          Share Progress
        </button>
        <Link
          href={`/parent/academics/assignments/${assignmentId}/submit`}
          className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2 font-medium"
        >
          <Upload className="w-4 h-4" />
          Submit Work
        </Link>
        <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors flex items-center gap-2 font-medium">
          <Bookmark className="w-4 h-4" />
          Save for Later
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: Info },
              { id: "details", label: "Instructions", icon: FileText },
              { id: "resources", label: "Resources", icon: BookOpen },
              { id: "progress", label: "Progress", icon: BarChart3 },
              { id: "communication", label: "Messages", icon: MessageSquare },
              { id: "class", label: "Class Stats", icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 lg:p-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Assignment Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Summary</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">{assignment.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Assignment Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">{assignment.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Priority:</span>
                          <span className={`font-medium ${getPriorityColor(assignment.priority)}`}>
                            {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Difficulty:</span>
                          <span className={`font-medium ${getDifficultyColor(assignment.difficultyLevel)}`}>
                            {assignment.difficultyLevel.charAt(0).toUpperCase() + assignment.difficultyLevel.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Submission:</span>
                          <span className="font-medium capitalize">{assignment.submissionMethod}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Dates</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Assigned:</span>
                          <span className="font-medium">{new Date(assignment.assignedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due:</span>
                          <span className="font-medium">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time Remaining:</span>
                          <span className={`font-medium ${getTimeRemainingColor(assignment.dueDate)}`}>
                            {formatTimeRemaining(assignment.dueDate)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Est. Time:</span>
                          <span className="font-medium">{assignment.estimatedTime} minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Objectives Checklist */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Objectives</h3>
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">Progress: {completionPercentage}%</span>
                    <span className="text-sm text-gray-600">{completedObjectives.filter(Boolean).length} / {assignment.learningObjectives.length} completed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <div className="space-y-3">
                    {assignment.learningObjectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <button
                          onClick={() => handleObjectiveToggle(index)}
                          className="mt-1 text-blue-600 hover:text-blue-800"
                        >
                          {completedObjectives[index] ? (
                            <CheckSquare className="w-5 h-5" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>
                        <span className={`text-sm ${completedObjectives[index] ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                          {objective}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Teacher's Tips */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Teacher's Tips</h3>
                <div className="bg-yellow-50 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-600 mt-1" />
                    <p className="text-gray-700">{assignment.teacherFeedback.generalComments}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        Common Mistakes to Avoid
                      </h4>
                      <ul className="space-y-2">
                        {assignment.teacherFeedback.commonMistakes.map((mistake, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-orange-600 text-xs mt-1">•</span>
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-green-600" />
                        Helpful Tips
                      </h4>
                      <ul className="space-y-2">
                        {assignment.teacherFeedback.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-green-600 text-xs mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Instructions</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-700">{assignment.detailedInstructions}</pre>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prerequisites</h3>
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-3">Make sure you understand these concepts before starting:</p>
                  <ul className="space-y-2">
                    {assignment.prerequisites.map((prereq, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Working Notes</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <textarea
                    value={workingNotes}
                    onChange={(e) => setWorkingNotes(e.target.value)}
                    placeholder="Add your working notes, questions, or thoughts here..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                  <div className="flex justify-end mt-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Save Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-6">
              {/* Assignment Files */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Files</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assignment.attachments.map((file) => (
                    <div key={file.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start gap-3 mb-3">
                        {getFileIcon(file.type)}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{file.name}</h4>
                          <p className="text-sm text-gray-600">{file.size}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{file.description}</p>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help Resources */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Help Resources</h3>
                <div className="space-y-4">
                  {assignment.helpResources.map((resource, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {resource.type === "video" && <PlayCircle className="w-5 h-5 text-blue-600" />}
                          {resource.type === "text" && <BookOpen className="w-5 h-5 text-blue-600" />}
                          {resource.type === "practice" && <Target className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{resource.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                            <ExternalLink className="w-4 h-4" />
                            Open Resource
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Assignments */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Assignments</h3>
                <div className="space-y-3">
                  {assignment.relatedAssignments.map((related) => (
                    <div key={related.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{related.title}</h4>
                        <p className="text-sm text-gray-600">{related.subject} • Due: {new Date(related.dueDate).toLocaleDateString()}</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {related.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "progress" && (
            <div className="space-y-6">
              {/* Progress Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Timeline</h3>
                <div className="space-y-4">
                  {progressSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${step.completed ? 'text-green-900' : 'text-gray-500'}`}>
                          {step.step}
                        </h4>
                        {step.date && (
                          <p className="text-sm text-gray-600">{new Date(step.date).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Tracking */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Estimated Time</h4>
                    <div className="text-2xl font-bold text-blue-700">{assignment.estimatedTime} min</div>
                    <p className="text-sm text-blue-600">Teacher's estimate</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">Time Spent</h4>
                    <div className="text-2xl font-bold text-yellow-700">25 min</div>
                    <p className="text-sm text-yellow-600">Current session</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Remaining</h4>
                    <div className="text-2xl font-bold text-green-700">20 min</div>
                    <p className="text-sm text-green-600">Estimated</p>
                  </div>
                </div>
              </div>

              {/* Study Session Timer */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Session</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">25:00</div>
                    <p className="text-gray-600">Focus Time</p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                      <PlayCircle className="w-4 h-4" />
                      Start
                    </button>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2">
                      <PauseCircle className="w-4 h-4" />
                      Pause
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "communication" && (
            <div className="space-y-6">
              {/* Message History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation with Teacher</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messageHistory.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'parent' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-sm lg:max-w-md xl:max-w-lg p-4 rounded-lg ${
                        message.type === 'parent' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="font-medium text-sm mb-1">{message.sender}</div>
                        <p className="text-sm mb-2">{message.message}</p>
                        <div className={`text-xs ${message.type === 'parent' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {new Date(message.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Send New Message */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Message</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message to the teacher..."
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <PaperclipIcon className="w-4 h-4" />
                      <span>Attach file (optional)</span>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>

              {/* Teacher Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Teacher Contact</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{assignment.teacher}</h4>
                      <p className="text-sm text-gray-600">Mathematics Teacher</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-2 font-medium">{assignment.teacherEmail}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <span className="ml-2 font-medium">{assignment.teacherPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "class" && (
            <div className="space-y-6">
              {/* Class Statistics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Progress Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Total Students</h4>
                    <div className="text-2xl font-bold text-gray-700">{assignment.classStats.totalStudents}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Completed</h4>
                    <div className="text-2xl font-bold text-green-700">{assignment.classStats.completed}</div>
                    <div className="text-sm text-green-600">
                      {Math.round((assignment.classStats.completed / assignment.classStats.totalStudents) * 100)}%
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">In Progress</h4>
                    <div className="text-2xl font-bold text-yellow-700">{assignment.classStats.inProgress}</div>
                    <div className="text-sm text-yellow-600">
                      {Math.round((assignment.classStats.inProgress / assignment.classStats.totalStudents) * 100)}%
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-medium text-red-900 mb-2">Not Started</h4>
                    <div className="text-2xl font-bold text-red-700">{assignment.classStats.notStarted}</div>
                    <div className="text-sm text-red-600">
                      {Math.round((assignment.classStats.notStarted / assignment.classStats.totalStudents) * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Progress Distribution</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Completed</span>
                      <span className="text-sm text-gray-600">{assignment.classStats.completed} students</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 bg-green-500 rounded-full"
                        style={{ width: `${(assignment.classStats.completed / assignment.classStats.totalStudents) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">In Progress</span>
                      <span className="text-sm text-gray-600">{assignment.classStats.inProgress} students</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 bg-yellow-500 rounded-full"
                        style={{ width: `${(assignment.classStats.inProgress / assignment.classStats.totalStudents) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Not Started</span>
                      <span className="text-sm text-gray-600">{assignment.classStats.notStarted} students</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 bg-red-500 rounded-full"
                        style={{ width: `${(assignment.classStats.notStarted / assignment.classStats.totalStudents) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Insights */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-3">Your Child's Position</h4>
                    <p className="text-sm text-blue-700 mb-2">
                      Kwame is among the {assignment.classStats.inProgress} students currently working on this assignment.
                    </p>
                    <p className="text-sm text-blue-600">
                      Great progress! Keep up the momentum to finish strong.
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-3">Class Engagement</h4>
                    <p className="text-sm text-purple-700 mb-2">
                      {Math.round(((assignment.classStats.completed + assignment.classStats.inProgress) / assignment.classStats.totalStudents) * 100)}% of the class has started working.
                    </p>
                    <p className="text-sm text-purple-600">
                      This shows good engagement with the assignment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
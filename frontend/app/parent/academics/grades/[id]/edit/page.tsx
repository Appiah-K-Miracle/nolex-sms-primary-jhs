"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Save,
  X,
  AlertTriangle,
  FileText,
  Upload,
  Calculator,
  BookOpen,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle,
  Info,
  HelpCircle,
  Star,
  Target,
  Eye,
  Clock,
  Calendar,
  User
} from "lucide-react";

export default function EditGradePage() {
  const params = useParams();
  const router = useRouter();
  const gradeId = params.id as string;
  
  const [formData, setFormData] = useState({
    requestType: "review",
    concernedAssessment: "",
    issue: "scoring_error",
    description: "",
    expectedScore: "",
    evidenceFiles: [] as File[],
    meetingPreference: "no_meeting",
    contactPreference: "email",
    urgency: "normal"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample grade record data
  const gradeRecord = {
    id: parseInt(gradeId),
    student: {
      name: "Kwame Mensah",
      class: "JHS 2A",
      studentId: "STU001"
    },
    subject: {
      name: "Mathematics",
      teacher: "Mr. Asante",
      code: "MATH201"
    },
    currentTerm: {
      term: "Term 1, 2025",
      overallGrade: "B+",
      percentage: 78.5
    },
    assessments: [
      {
        id: 1,
        type: "Quiz",
        title: "Algebra Fundamentals Quiz 1",
        date: "2025-10-15",
        score: 18,
        maxScore: 20,
        percentage: 90
      },
      {
        id: 2,
        type: "Assignment",
        title: "Problem Solving Assignment",
        date: "2025-10-22",
        score: 19,
        maxScore: 25,
        percentage: 76
      },
      {
        id: 3,
        type: "Test",
        title: "Mid-Term Mathematics Test",
        date: "2025-11-05",
        score: 75,
        maxScore: 100,
        percentage: 75
      },
      {
        id: 4,
        type: "Project",
        title: "Real-world Math Applications",
        date: "2025-11-12",
        score: 42,
        maxScore: 50,
        percentage: 84
      }
    ]
  };

  const requestTypes = [
    { 
      value: "review", 
      label: "Grade Review Request", 
      description: "Request a review of a specific grade or assessment"
    },
    { 
      value: "clarification", 
      label: "Grade Clarification", 
      description: "Seek clarification on grading criteria or feedback"
    },
    { 
      value: "recount", 
      label: "Score Recount", 
      description: "Request a recount or remarking of an assessment"
    },
    { 
      value: "appeal", 
      label: "Grade Appeal", 
      description: "Formal appeal of a grade decision"
    }
  ];

  const issueTypes = {
    review: [
      "Scoring error suspected",
      "Grade calculation discrepancy",
      "Missing assessment not reflected",
      "Attendance affecting grade unfairly",
      "Late submission penalty dispute"
    ],
    clarification: [
      "Grading criteria unclear",
      "Feedback interpretation needed",
      "Grade weight distribution questions",
      "Assessment instructions ambiguous",
      "Teacher comments unclear"
    ],
    recount: [
      "Mathematical error in scoring",
      "Answers marked incorrectly",
      "Partial credit not awarded",
      "Bonus points not included",
      "Technical issues during assessment"
    ],
    appeal: [
      "Unfair grading practice",
      "Bias in assessment",
      "Inappropriate grade reduction",
      "Inconsistent grading standards",
      "Procedural error in grading"
    ]
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      evidenceFiles: [...prev.evidenceFiles, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would submit to an API
    console.log("Grade review request submitted:", formData);
    
    setIsSubmitting(false);
    router.push(`/parent/academics/grades/${gradeId}?message=review-submitted`);
  };

  const canSubmit = formData.requestType && 
                   formData.concernedAssessment && 
                   formData.issue && 
                   formData.description.trim().length > 0;

  const getAssessmentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'quiz': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'test': return 'bg-red-100 text-red-800 border-red-200';
      case 'assignment': return 'bg-green-100 text-green-800 border-green-200';
      case 'project': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/parent/academics/grades/${gradeId}`}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Request Grade Review</h1>
          <p className="text-gray-600">
            Submit a request to review or clarify grade information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Form */}
        <div className="xl:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grade Summary */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Grade Information</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Student:</span>
                    <span className="font-medium text-gray-900 ml-2">{gradeRecord.student.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Class:</span>
                    <span className="font-medium text-gray-900 ml-2">{gradeRecord.student.class}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-medium text-gray-900 ml-2">{gradeRecord.subject.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Teacher:</span>
                    <span className="font-medium text-gray-900 ml-2">{gradeRecord.subject.teacher}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Term:</span>
                    <span className="font-medium text-gray-900 ml-2">{gradeRecord.currentTerm.term}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Current Grade:</span>
                    <span className="font-medium text-gray-900 ml-2">
                      {gradeRecord.currentTerm.overallGrade} ({gradeRecord.currentTerm.percentage}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Type */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Type</h3>
              <div className="space-y-3">
                {requestTypes.map((type) => (
                  <label key={type.value} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="requestType"
                      value={type.value}
                      checked={formData.requestType === type.value}
                      onChange={(e) => handleInputChange('requestType', e.target.value)}
                      className="mt-1 text-blue-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{type.label}</div>
                      <div className="text-sm text-gray-600">{type.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Assessment Selection */}
            {formData.requestType && (
              <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Assessment</h3>
                <div className="space-y-3">
                  {gradeRecord.assessments.map((assessment) => (
                    <label key={assessment.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="concernedAssessment"
                        value={assessment.id}
                        checked={formData.concernedAssessment === assessment.id.toString()}
                        onChange={(e) => handleInputChange('concernedAssessment', e.target.value)}
                        className="text-blue-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAssessmentTypeColor(assessment.type)}`}>
                            {assessment.type}
                          </span>
                          <span className="font-medium text-gray-900">{assessment.title}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(assessment.date).toLocaleDateString()} • 
                          Score: {assessment.score}/{assessment.maxScore} ({assessment.percentage}%)
                        </div>
                      </div>
                    </label>
                  ))}
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="concernedAssessment"
                      value="overall"
                      checked={formData.concernedAssessment === "overall"}
                      onChange={(e) => handleInputChange('concernedAssessment', e.target.value)}
                      className="text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Overall Grade</div>
                      <div className="text-sm text-gray-600">
                        Current overall grade for the term: {gradeRecord.currentTerm.overallGrade} ({gradeRecord.currentTerm.percentage}%)
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Issue Type */}
            {formData.requestType && formData.concernedAssessment && (
              <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specific Issue</h3>
                <select
                  value={formData.issue}
                  onChange={(e) => handleInputChange('issue', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select the specific issue...</option>
                  {issueTypes[formData.requestType as keyof typeof issueTypes]?.map((issue) => (
                    <option key={issue} value={issue}>{issue}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Expected Score (for certain issue types) */}
            {(formData.issue === "Scoring error suspected" || 
              formData.issue === "Mathematical error in scoring" ||
              formData.issue === "Answers marked incorrectly") && (
              <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Expected Score</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What score do you believe is correct?
                    </label>
                    <input
                      type="number"
                      value={formData.expectedScore}
                      onChange={(e) => handleInputChange('expectedScore', e.target.value)}
                      placeholder="Enter expected score"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Score (for reference)
                    </label>
                    <input
                      type="text"
                      value={formData.concernedAssessment !== "overall" 
                        ? gradeRecord.assessments.find(a => a.id.toString() === formData.concernedAssessment)?.score || ""
                        : gradeRecord.currentTerm.percentage + "%"
                      }
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Detailed Description */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Explanation</h3>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Please provide a detailed explanation of your concern..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                required
              />
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600">
                  Be specific about what you believe is incorrect and why
                </p>
                <p className="text-sm text-gray-500">
                  {formData.description.length}/1000
                </p>
              </div>
            </div>

            {/* Supporting Evidence */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Supporting Evidence</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">Upload supporting documents</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Photos of work, answer sheets, rubrics, etc. (Max 5MB each)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="evidence-upload"
                  />
                  <label
                    htmlFor="evidence-upload"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Choose Files
                  </label>
                </div>

                {/* Uploaded Files */}
                {formData.evidenceFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
                    {formData.evidenceFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-600">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Meeting Preference */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Meeting Preference</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="meetingPreference"
                    value="no_meeting"
                    checked={formData.meetingPreference === "no_meeting"}
                    onChange={(e) => handleInputChange('meetingPreference', e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-gray-900">No meeting required - email response is sufficient</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="meetingPreference"
                    value="phone_call"
                    checked={formData.meetingPreference === "phone_call"}
                    onChange={(e) => handleInputChange('meetingPreference', e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-gray-900">Phone call discussion</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="meetingPreference"
                    value="in_person"
                    checked={formData.meetingPreference === "in_person"}
                    onChange={(e) => handleInputChange('meetingPreference', e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-gray-900">In-person meeting</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="meetingPreference"
                    value="video_call"
                    checked={formData.meetingPreference === "video_call"}
                    onChange={(e) => handleInputChange('meetingPreference', e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-gray-900">Video call meeting</span>
                </label>
              </div>
            </div>

            {/* Priority & Contact */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Priority & Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low - Response within 7 days</option>
                    <option value="normal">Normal - Response within 3 days</option>
                    <option value="high">High - Response within 24 hours</option>
                    <option value="urgent">Urgent - Response within 4 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
                  <select
                    value={formData.contactPreference}
                    onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="sms">SMS</option>
                    <option value="app">App Notification</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Info className="w-4 h-4" />
                  <span>Your request will be reviewed by the teacher and administration</span>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/parent/academics/grades/${gradeId}`}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Guidelines */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Guidelines</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Be Specific</p>
                  <p className="text-sm text-gray-600">Clearly identify the exact issue and provide evidence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Include Documentation</p>
                  <p className="text-sm text-gray-600">Upload photos of work, answer sheets, or rubrics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Submit Promptly</p>
                  <p className="text-sm text-gray-600">Submit within 14 days of receiving the grade</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-lg lg:rounded-xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Need Help?</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-800">
                <User className="w-4 h-4" />
                <span className="text-sm">{gradeRecord.subject.teacher}</span>
              </div>
              <div className="flex items-center gap-3 text-blue-800">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+233 24 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-blue-800">
                <Mail className="w-4 h-4" />
                <span className="text-sm">academics@nolexsms.edu.gh</span>
              </div>
              <div className="flex items-start gap-3 text-blue-800">
                <Clock className="w-4 h-4 mt-0.5" />
                <span className="text-sm">Office hours: Mon-Fri, 8:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Review Process */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Process</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Submission</p>
                  <p className="text-sm text-gray-600">Request logged and acknowledged</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Teacher Review</p>
                  <p className="text-sm text-gray-600">Subject teacher examines the concern</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Response</p>
                  <p className="text-sm text-gray-600">Decision communicated to parent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Common Issues */}
          <div className="bg-yellow-50 rounded-lg lg:rounded-xl border border-yellow-200 p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">Common Issues</h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <p>• Mathematical errors in grade calculation</p>
              <p>• Missing assignments not reflected</p>
              <p>• Partial credit not awarded fairly</p>
              <p>• Late submission penalties unclear</p>
              <p>• Grading rubric misapplication</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
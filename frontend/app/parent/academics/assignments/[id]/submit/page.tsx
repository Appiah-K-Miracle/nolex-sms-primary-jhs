"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft,
  Upload,
  FileText,
  Image,
  Video,
  File,
  X,
  Plus,
  Send,
  Save,
  Eye,
  Check,
  AlertCircle,
  Clock,
  Calendar,
  Target,
  Flag,
  User,
  MessageSquare,
  Camera,
  Mic,
  Link as LinkIcon,
  Paperclip,
  Download,
  Trash2,
  Edit,
  RotateCcw,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  Shield,
  Zap
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  url?: string;
  uploadProgress?: number;
}

export default function SubmitAssignmentPage() {
  const params = useParams();
  const assignmentId = params.id;
  
  const [submissionMethod, setSubmissionMethod] = useState("online"); // online, physical, both
  const [submissionType, setSubmissionType] = useState("file"); // file, text, link, recording
  const [textSubmission, setTextSubmission] = useState("");
  const [linkSubmission, setLinkSubmission] = useState("");
  const [studentNotes, setStudentNotes] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [lateSubmissionReason, setLateSubmissionReason] = useState("");
  const [requestExtension, setRequestExtension] = useState(false);
  const [extensionReason, setExtensionReason] = useState("");
  const [requestedDueDate, setRequestedDueDate] = useState("");

  // Sample assignment data
  const assignment = {
    id: 1,
    title: "Algebraic Expressions Worksheet",
    subject: "Mathematics",
    child: "Kwame Mensah",
    teacher: "Mr. Osei",
    dueDate: "2025-11-20",
    maxScore: 100,
    submissionMethod: "physical", // physical, online, both
    allowedFileTypes: [".pdf", ".doc", ".docx", ".jpg", ".png"],
    maxFileSize: "10MB",
    maxFiles: 5,
    requirements: [
      "Show all working steps clearly",
      "Use proper mathematical notation", 
      "Circle final answers",
      "Submit handwritten work or typed document"
    ],
    isOverdue: false,
    daysUntilDue: 2,
    allowLateSubmission: true,
    latePenalty: "5% per day",
    allowExtensionRequest: true
  };

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach((file, index) => {
      const fileId = `${Date.now()}-${index}`;
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: formatFileSize(file.size),
        uploadProgress: 0
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileId 
              ? { ...f, uploadProgress: progress }
              : f
          )
        );

        if (progress >= 100) {
          clearInterval(interval);
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === fileId 
                ? { ...f, uploadProgress: undefined, url: URL.createObjectURL(file) }
                : f
            )
          );
        }
      }, 200);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5 text-green-500" />;
    if (type.startsWith('video/')) return <Video className="w-5 h-5 text-purple-500" />;
    if (type.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
  };

  const isFormValid = () => {
    if (!agreeToTerms) return false;
    if (submissionType === "file" && uploadedFiles.length === 0) return false;
    if (submissionType === "text" && textSubmission.trim().length === 0) return false;
    if (submissionType === "link" && linkSubmission.trim().length === 0) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    
    // Simulate submission process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    // In real app, would redirect to success page or assignment details
    alert("Assignment submitted successfully!");
  };

  const requestExtensionHandler = async () => {
    if (!extensionReason.trim() || !requestedDueDate) return;
    
    // In real app, would send extension request
    alert("Extension request submitted for review!");
    setRequestExtension(false);
  };

  const getDueDateStatus = () => {
    const due = new Date(assignment.dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: "overdue", text: `${Math.abs(diffDays)} days overdue`, color: "text-red-600" };
    if (diffDays === 0) return { status: "due_today", text: "Due today", color: "text-orange-600" };
    if (diffDays === 1) return { status: "due_tomorrow", text: "Due tomorrow", color: "text-yellow-600" };
    return { status: "upcoming", text: `${diffDays} days remaining`, color: "text-green-600" };
  };

  const dueDateStatus = getDueDateStatus();

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/parent/academics/assignments/${assignmentId}`}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Submit Assignment</h1>
            <p className="text-blue-100 text-sm lg:text-base">
              {assignment.title} • {assignment.subject} • {assignment.child}
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
            <div className={`text-sm ${dueDateStatus.color}`}>
              {dueDateStatus.text}
            </div>
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
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Submission</span>
            </div>
            <div className="text-lg font-bold capitalize">{assignment.submissionMethod}</div>
            <div className="text-sm text-blue-100">Method required</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Teacher</span>
            </div>
            <div className="text-lg font-bold">{assignment.teacher}</div>
            <div className="text-sm text-blue-100">Mathematics</div>
          </div>
        </div>
      </div>

      {/* Due Date Alert */}
      {(dueDateStatus.status === "overdue" || dueDateStatus.status === "due_today") && (
        <div className={`rounded-lg p-4 ${
          dueDateStatus.status === "overdue" ? "bg-red-50 border border-red-200" : "bg-orange-50 border border-orange-200"
        }`}>
          <div className="flex items-start gap-3">
            <AlertCircle className={`w-5 h-5 mt-0.5 ${
              dueDateStatus.status === "overdue" ? "text-red-600" : "text-orange-600"
            }`} />
            <div>
              <h3 className={`font-semibold ${
                dueDateStatus.status === "overdue" ? "text-red-900" : "text-orange-900"
              }`}>
                {dueDateStatus.status === "overdue" ? "Assignment Overdue" : "Due Today"}
              </h3>
              <p className={`text-sm ${
                dueDateStatus.status === "overdue" ? "text-red-700" : "text-orange-700"
              } mb-3`}>
                {dueDateStatus.status === "overdue" 
                  ? `This assignment is ${dueDateStatus.text}. Late submissions may incur a penalty of ${assignment.latePenalty}.`
                  : "This assignment is due today. Submit as soon as possible to avoid late penalties."
                }
              </p>
              {assignment.allowExtensionRequest && (
                <button
                  onClick={() => setRequestExtension(true)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Request Extension
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Extension Request Modal */}
      {requestExtension && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Request Extension</h3>
              <button
                onClick={() => setRequestExtension(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requested Due Date
                </label>
                <input
                  type="date"
                  value={requestedDueDate}
                  onChange={(e) => setRequestedDueDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Extension
                </label>
                <textarea
                  value={extensionReason}
                  onChange={(e) => setExtensionReason(e.target.value)}
                  placeholder="Explain why you need an extension..."
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setRequestExtension(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={requestExtensionHandler}
                disabled={!extensionReason.trim() || !requestedDueDate}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Request Extension
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Submission Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submission Method */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Submission Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setSubmissionMethod("online")}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  submissionMethod === "online"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Upload className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Online</div>
                <div className="text-sm text-gray-600">Upload files</div>
              </button>
              
              <button
                onClick={() => setSubmissionMethod("physical")}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  submissionMethod === "physical"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <FileText className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Physical</div>
                <div className="text-sm text-gray-600">Hand in class</div>
              </button>
              
              <button
                onClick={() => setSubmissionMethod("both")}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  submissionMethod === "both"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Zap className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Both</div>
                <div className="text-sm text-gray-600">Online + Physical</div>
              </button>
            </div>
          </div>

          {/* Online Submission Options */}
          {(submissionMethod === "online" || submissionMethod === "both") && (
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Online Submission</h2>
              
              {/* Submission Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Submission Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => setSubmissionType("file")}
                    className={`p-3 rounded-lg border transition-colors ${
                      submissionType === "file"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Upload className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">Files</div>
                  </button>
                  
                  <button
                    onClick={() => setSubmissionType("text")}
                    className={`p-3 rounded-lg border transition-colors ${
                      submissionType === "text"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <FileText className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">Text</div>
                  </button>
                  
                  <button
                    onClick={() => setSubmissionType("link")}
                    className={`p-3 rounded-lg border transition-colors ${
                      submissionType === "link"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <LinkIcon className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">Link</div>
                  </button>
                  
                  <button
                    onClick={() => setSubmissionType("recording")}
                    className={`p-3 rounded-lg border transition-colors ${
                      submissionType === "recording"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Mic className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">Record</div>
                  </button>
                </div>
              </div>

              {/* File Upload */}
              {submissionType === "file" && (
                <div className="space-y-4">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Drop files here or click to upload
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Supported formats: {assignment.allowedFileTypes.join(", ")} • Max size: {assignment.maxFileSize}
                    </p>
                    <input
                      type="file"
                      multiple
                      accept={assignment.allowedFileTypes.join(",")}
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Choose Files
                    </label>
                  </div>

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Uploaded Files ({uploadedFiles.length})</h4>
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          {getFileIcon(file.type)}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">{file.name}</div>
                            <div className="text-sm text-gray-600">{file.size}</div>
                            {file.uploadProgress !== undefined && (
                              <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                                <div
                                  className="h-1 bg-blue-500 rounded-full transition-all duration-300"
                                  style={{ width: `${file.uploadProgress}%` }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {file.url && (
                              <button
                                onClick={() => window.open(file.url, '_blank')}
                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => removeFile(file.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Text Submission */}
              {submissionType === "text" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Submission
                  </label>
                  <textarea
                    value={textSubmission}
                    onChange={(e) => setTextSubmission(e.target.value)}
                    placeholder="Type your submission here..."
                    className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{textSubmission.length} characters</span>
                    <span>{textSubmission.split(/\s+/).filter(word => word.length > 0).length} words</span>
                  </div>
                </div>
              )}

              {/* Link Submission */}
              {submissionType === "link" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link Submission
                  </label>
                  <input
                    type="url"
                    value={linkSubmission}
                    onChange={(e) => setLinkSubmission(e.target.value)}
                    placeholder="https://example.com/your-work"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Share a link to your work (Google Docs, Dropbox, etc.)
                  </p>
                </div>
              )}

              {/* Recording */}
              {submissionType === "recording" && (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-900 mb-2">Audio/Video Recording</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Record your presentation or explanation directly
                  </p>
                  <div className="flex justify-center gap-3">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      Start Recording
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Record Video
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Physical Submission Note */}
          {submissionMethod === "physical" && (
            <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Physical Submission</h2>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Submission Instructions</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Hand in your completed work during the next Mathematics class</li>
                      <li>• Make sure your name and class are clearly written on all pages</li>
                      <li>• Include this submission reference when handing in: #{assignment.id}</li>
                      <li>• Contact {assignment.teacher} if you need to arrange alternative submission</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Student Notes */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Notes</h2>
            <textarea
              value={studentNotes}
              onChange={(e) => setStudentNotes(e.target.value)}
              placeholder="Add any notes, questions, or comments for your teacher (optional)..."
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Terms and Submission */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8 border">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agree-terms" className="text-sm text-gray-700">
                  I confirm that this is my own work and I understand the school's academic integrity policy. 
                  I agree to submit this assignment according to the requirements.
                </label>
              </div>

              {dueDateStatus.status === "overdue" && assignment.allowLateSubmission && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Late Submission (Optional)
                  </label>
                  <textarea
                    value={lateSubmissionReason}
                    onChange={(e) => setLateSubmissionReason(e.target.value)}
                    placeholder="Explain why this submission is late..."
                    className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setShowPreview(true)}
                  disabled={!isFormValid()}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Preview Submission
                </button>
                <button className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 font-medium">
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isSubmitting}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Assignment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignment Requirements */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
            <ul className="space-y-2">
              {assignment.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submission Guidelines */}
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Submission Guidelines
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Max {assignment.maxFiles} files per submission</li>
              <li>• File size limit: {assignment.maxFileSize}</li>
              <li>• Accepted formats: {assignment.allowedFileTypes.join(", ")}</li>
              {assignment.allowLateSubmission && (
                <li>• Late penalty: {assignment.latePenalty}</li>
              )}
            </ul>
          </div>

          {/* Contact Teacher */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Need Help?
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              Contact {assignment.teacher} if you have questions about this assignment.
            </p>
            <Link
              href={`/parent/academics/assignments/${assignmentId}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              <MessageSquare className="w-4 h-4" />
              Send Message
            </Link>
          </div>

          {/* Security Notice */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy & Security
            </h4>
            <p className="text-sm text-gray-600">
              Your submission is encrypted and only visible to you and your teacher. 
              Files are automatically scanned for academic integrity.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Submission Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Assignment</h4>
                <p className="text-sm text-gray-600">{assignment.title}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Submission Method</h4>
                <p className="text-sm text-gray-600 capitalize">{submissionMethod}</p>
              </div>
              
              {submissionType === "file" && uploadedFiles.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Files ({uploadedFiles.length})</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {uploadedFiles.map((file) => (
                      <li key={file.id}>• {file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {submissionType === "text" && textSubmission && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Text Submission</h4>
                  <div className="text-sm text-gray-600 bg-gray-50 rounded p-3 max-h-32 overflow-y-auto">
                    {textSubmission}
                  </div>
                </div>
              )}
              
              {submissionType === "link" && linkSubmission && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Link</h4>
                  <p className="text-sm text-blue-600">{linkSubmission}</p>
                </div>
              )}
              
              {studentNotes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Additional Notes</h4>
                  <p className="text-sm text-gray-600">{studentNotes}</p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Edit Submission
              </button>
              <button
                onClick={() => {
                  setShowPreview(false);
                  handleSubmit();
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
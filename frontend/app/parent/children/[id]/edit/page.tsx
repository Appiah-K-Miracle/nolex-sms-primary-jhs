"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Heart,
  AlertTriangle,
  Upload,
  Camera,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function EditChildPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.id as string;
  
  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    name: childId === "1" ? "Kwame Mensah" : "Ama Mensah",
    dateOfBirth: childId === "1" ? "2010-03-15" : "2012-08-22",
    studentId: childId === "1" ? "NX2025001" : "NX2025002",
    class: childId === "1" ? "JHS 2" : "Primary 5",
    admissionDate: childId === "1" ? "2020-09-01" : "2019-09-01",
    
    // Contact Information
    homeAddress: "123 Independence Ave, Accra",
    emergencyContact: "+233 24 123 4567",
    parentEmail: "akosua.mensah@email.com",
    alternateContact: "+233 20 987 6543",
    
    // Health Information
    medicalConditions: childId === "1" ? "None" : "Mild Asthma",
    allergies: "None",
    bloodGroup: childId === "1" ? "O+" : "A+",
    lastMedicalCheckup: "2025-09-15",
    doctorName: "Dr. Kwame Asante",
    doctorContact: "+233 30 123 4567",
    
    // Emergency Contact
    emergencyContactName: "Uncle John Mensah",
    emergencyContactRelation: "Uncle",
    emergencyContactPhone: "+233 24 555 0123",
    
    // Transportation
    transportationMode: "School Bus",
    busRoute: "Route A",
    pickupLocation: "Independence Square",
    
    // Additional Information
    specialNeeds: "",
    dietaryRestrictions: "None",
    extracurricularInterests: childId === "1" ? "Science, Mathematics, Debate" : "Arts, Music, Drama"
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          photo: "Photo size must be less than 5MB"
        }));
        return;
      }
      
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.parentEmail.trim()) newErrors.parentEmail = "Parent email is required";
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact is required";
    if (!formData.homeAddress.trim()) newErrors.homeAddress = "Home address is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.parentEmail && !emailRegex.test(formData.parentEmail)) {
      newErrors.parentEmail = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^\+233\s?\d{2}\s?\d{3}\s?\d{4}$/;
    if (formData.emergencyContact && !phoneRegex.test(formData.emergencyContact)) {
      newErrors.emergencyContact = "Please enter a valid Ghana phone number (+233 XX XXX XXXX)";
    }

    // Date validation
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 4 || age > 20) {
      newErrors.dateOfBirth = "Age must be between 4 and 20 years";
    }

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
        router.push(`/parent/children/${childId}`);
      }, 3000);
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: "Failed to update child information. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 rounded-lg lg:rounded-xl shadow-lg p-6 lg:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              href={`/parent/children/${childId}`}
              className="mr-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold">Edit Child Profile</h1>
              <p className="text-purple-100 text-sm lg:text-base xl:text-lg">
                Update {formData.name}'s information
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
            <p className="text-green-800 font-medium">Profile updated successfully!</p>
            <p className="text-green-700 text-sm">Redirecting back to profile page...</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          </div>

          {/* Profile Photo */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">Profile Photo</label>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {formData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="photo"
                  className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Change Photo
                </label>
                <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Formats: JPG, PNG</p>
                {errors.photo && <p className="text-red-600 text-xs mt-1">{errors.photo}</p>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dateOfBirth && <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Student ID cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Class</label>
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Nursery 1">Nursery 1</option>
                <option value="Nursery 2">Nursery 2</option>
                <option value="Primary 1">Primary 1</option>
                <option value="Primary 2">Primary 2</option>
                <option value="Primary 3">Primary 3</option>
                <option value="Primary 4">Primary 4</option>
                <option value="Primary 5">Primary 5</option>
                <option value="Primary 6">Primary 6</option>
                <option value="JHS 1">JHS 1</option>
                <option value="JHS 2">JHS 2</option>
                <option value="JHS 3">JHS 3</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.homeAddress ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter home address"
              />
              {errors.homeAddress && <p className="text-red-600 text-sm mt-1">{errors.homeAddress}</p>}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Phone className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parent Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.parentEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="parent@email.com"
              />
              {errors.parentEmail && <p className="text-red-600 text-sm mt-1">{errors.parentEmail}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+233 XX XXX XXXX"
              />
              {errors.emergencyContact && <p className="text-red-600 text-sm mt-1">{errors.emergencyContact}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Contact</label>
              <input
                type="tel"
                name="alternateContact"
                value={formData.alternateContact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+233 XX XXX XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Emergency contact person"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
              <select
                name="emergencyContactRelation"
                value={formData.emergencyContactRelation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Uncle">Uncle</option>
                <option value="Aunt">Aunt</option>
                <option value="Grandparent">Grandparent</option>
                <option value="Guardian">Guardian</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone</label>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+233 XX XXX XXXX"
              />
            </div>
          </div>
        </div>

        {/* Health Information Section */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">Health Information</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Medical Checkup</label>
              <input
                type="date"
                name="lastMedicalCheckup"
                value={formData.lastMedicalCheckup}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Child's doctor name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Contact</label>
              <input
                type="tel"
                name="doctorContact"
                value={formData.doctorContact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+233 XX XXX XXXX"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="List any medical conditions or write 'None'"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="List any allergies or write 'None'"
              />
            </div>
          </div>
        </div>

        {/* Transportation Section */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900">Transportation</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transportation Mode</label>
              <select
                name="transportationMode"
                value={formData.transportationMode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="School Bus">School Bus</option>
                <option value="Parent Drop-off">Parent Drop-off</option>
                <option value="Walking">Walking</option>
                <option value="Private Transport">Private Transport</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bus Route</label>
              <input
                type="text"
                name="busRoute"
                value={formData.busRoute}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Route A"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Bus stop or pickup location"
              />
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-white rounded-lg lg:rounded-xl shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Needs or Accommodations</label>
              <textarea
                name="specialNeeds"
                value={formData.specialNeeds}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe any special needs, learning accommodations, or support required"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
              <textarea
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="List any dietary restrictions or write 'None'"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Extracurricular Interests</label>
              <textarea
                name="extracurricularInterests"
                value={formData.extracurricularInterests}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="List child's interests and hobbies"
              />
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
            href={`/parent/children/${childId}`}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
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
      </form>
    </div>
  );
}
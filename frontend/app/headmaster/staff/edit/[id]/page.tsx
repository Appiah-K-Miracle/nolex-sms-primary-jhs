"use client"

import { useState } from "react";
import { 
  ArrowLeft, 
  Save, 
  X, 
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

// Mock staff data (in real app, this would come from an API based on the ID)
const getStaffById = (id: string) => {
  const staffData = [
    {
      id: 1,
      employeeId: "NLX2024STAFF001",
      firstName: "Akosua",
      lastName: "Mensah",
      email: "akosua.mensah@nolex.edu.gh",
      phone: "+233 24 123 4567",
      position: "Mathematics Teacher",
      department: "Mathematics",
      employmentType: "Full-time",
      dateHired: "2022-08-15",
      salary: 3500,
      status: "Active",
      qualifications: ["B.Ed Mathematics", "M.Ed Curriculum"],
      address: "123 Kumasi Street, Kumasi, Ghana",
      emergencyContact: {
        name: "Kwame Mensah",
        phone: "+233 20 987 6543",
        relationship: "Spouse"
      },
      subjects: ["Mathematics", "Statistics"],
      classes: ["Grade 4A", "Grade 5B", "Grade 6A"],
      dateOfBirth: "1985-03-12",
      nationality: "Ghanaian",
      maritalStatus: "Married",
      bankDetails: {
        bankName: "Ghana Commercial Bank",
        accountNumber: "1234567890",
        accountType: "Savings"
      }
    },
    {
      id: 2,
      employeeId: "NLX2024STAFF002", 
      firstName: "Kwaku",
      lastName: "Asante",
      email: "kwaku.asante@nolex.edu.gh",
      phone: "+233 24 234 5678",
      position: "English Teacher",
      department: "English",
      employmentType: "Full-time",
      dateHired: "2021-09-01",
      salary: 3200,
      status: "Active",
      qualifications: ["B.A English", "PGDE"],
      address: "Accra, Ghana",
      emergencyContact: {
        name: "Ama Asante",
        phone: "+233 20 876 5432",
        relationship: "Mother"
      },
      subjects: ["English Language", "Literature"],
      classes: ["Grade 1A", "Grade 2B", "Grade 3A"],
      dateOfBirth: "1987-06-20",
      nationality: "Ghanaian",
      maritalStatus: "Single",
      bankDetails: {
        bankName: "Ecobank Ghana",
        accountNumber: "2345678901",
        accountType: "Current"
      }
    },
    {
      id: 3,
      employeeId: "NLX2024STAFF003",
      firstName: "Ama",
      lastName: "Osei",
      email: "ama.osei@nolex.edu.gh", 
      phone: "+233 24 345 6789",
      position: "Science Teacher",
      department: "Science",
      employmentType: "Full-time",
      dateHired: "2023-01-10",
      salary: 3300,
      status: "Active",
      qualifications: ["B.Sc Biology", "M.Sc Environmental Science"],
      address: "Tamale, Ghana",
      emergencyContact: {
        name: "Kofi Osei",
        phone: "+233 20 765 4321",
        relationship: "Father"
      },
      subjects: ["Integrated Science", "Environmental Studies"],
      classes: ["Grade 4B", "Grade 5A", "Grade 6B"],
      dateOfBirth: "1990-11-08",
      nationality: "Ghanaian",
      maritalStatus: "Married",
      bankDetails: {
        bankName: "Standard Chartered Bank",
        accountNumber: "3456789012",
        accountType: "Savings"
      }
    },
    {
      id: 4,
      employeeId: "NLX2024STAFF004",
      firstName: "Yaw",
      lastName: "Darko",
      email: "yaw.darko@nolex.edu.gh",
      phone: "+233 24 456 7890",
      position: "ICT Coordinator",
      department: "ICT",
      employmentType: "Full-time",
      dateHired: "2022-02-20",
      salary: 3800,
      status: "Active",
      qualifications: ["B.Sc Computer Science", "CCNA"],
      address: "Cape Coast, Ghana",
      emergencyContact: {
        name: "Abena Darko",
        phone: "+233 20 654 3210",
        relationship: "Sister"
      },
      subjects: ["Computer Studies", "ICT"],
      classes: ["All Grades"],
      dateOfBirth: "1988-04-15",
      nationality: "Ghanaian",
      maritalStatus: "Single",
      bankDetails: {
        bankName: "Fidelity Bank Ghana",
        accountNumber: "4567890123",
        accountType: "Current"
      }
    },
    {
      id: 5,
      employeeId: "NLX2024STAFF005",
      firstName: "Adwoa",
      lastName: "Frimpong",
      email: "adwoa.frimpong@nolex.edu.gh",
      phone: "+233 24 567 8901",
      position: "School Nurse",
      department: "Health Services",
      employmentType: "Full-time",
      dateHired: "2021-06-01",
      salary: 2800,
      status: "Active",
      qualifications: ["Diploma in Nursing", "Public Health Certificate"],
      address: "Koforidua, Ghana",
      emergencyContact: {
        name: "Nana Frimpong",
        phone: "+233 20 543 2109",
        relationship: "Husband"
      },
      subjects: ["Health Education"],
      classes: ["All Grades"],
      dateOfBirth: "1986-09-12",
      nationality: "Ghanaian",
      maritalStatus: "Married",
      bankDetails: {
        bankName: "CAL Bank",
        accountNumber: "5678901234",
        accountType: "Savings"
      }
    },
    {
      id: 6,
      employeeId: "NLX2024STAFF006",
      firstName: "Kofi",
      lastName: "Boateng",
      email: "kofi.boateng@nolex.edu.gh",
      phone: "+233 24 678 9012",
      position: "Vice Principal",
      department: "Administration",
      employmentType: "Full-time",
      dateHired: "2020-03-15",
      salary: 5500,
      status: "Active",
      qualifications: ["M.Ed Educational Administration", "B.Ed Primary Education"],
      address: "Sunyani, Ghana",
      emergencyContact: {
        name: "Akosua Boateng",
        phone: "+233 20 432 1098",
        relationship: "Wife"
      },
      subjects: ["Educational Leadership"],
      classes: ["Administrative"],
      dateOfBirth: "1982-01-25",
      nationality: "Ghanaian",
      maritalStatus: "Married",
      bankDetails: {
        bankName: "Ghana Commercial Bank",
        accountNumber: "6789012345",
        accountType: "Current"
      }
    },
    {
      id: 7,
      employeeId: "NLX2024STAFF007",
      firstName: "Abena",
      lastName: "Gyamfi",
      email: "abena.gyamfi@nolex.edu.gh",
      phone: "+233 24 789 0123",
      position: "Librarian",
      department: "Library Services",
      employmentType: "Part-time",
      dateHired: "2022-11-01",
      salary: 1800,
      status: "Active",
      qualifications: ["Diploma in Library Science", "B.A Literature"],
      address: "Ho, Ghana",
      emergencyContact: {
        name: "Kwame Gyamfi",
        phone: "+233 20 321 0987",
        relationship: "Brother"
      },
      subjects: ["Reading & Research"],
      classes: ["All Grades"],
      dateOfBirth: "1991-07-18",
      nationality: "Ghanaian",
      maritalStatus: "Single",
      bankDetails: {
        bankName: "UMB Bank",
        accountNumber: "7890123456",
        accountType: "Savings"
      }
    },
    {
      id: 8,
      employeeId: "NLX2024STAFF008",
      firstName: "Kwame",
      lastName: "Amoah",
      email: "kwame.amoah@nolex.edu.gh",
      phone: "+233 24 890 1234",
      position: "Security Supervisor",
      department: "Security",
      employmentType: "Full-time",
      dateHired: "2021-01-05",
      salary: 2200,
      status: "On Leave",
      qualifications: ["Security Management Certificate"],
      address: "Wa, Ghana",
      emergencyContact: {
        name: "Ama Amoah",
        phone: "+233 20 210 9876",
        relationship: "Wife"
      },
      subjects: ["Security & Safety"],
      classes: ["School Premises"],
      dateOfBirth: "1983-12-03",
      nationality: "Ghanaian",
      maritalStatus: "Married",
      bankDetails: {
        bankName: "ADB Bank",
        accountNumber: "8901234567",
        accountType: "Savings"
      }
    }
  ];
  
  return staffData.find(staff => staff.id === parseInt(id));
};

interface StaffEditPageProps {
  params: {
    id: string;
  };
}

export default function StaffEditPage({ params }: StaffEditPageProps) {
  const originalStaff = getStaffById(params.id);
  
  if (!originalStaff) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Staff Member Not Found</h3>
          <p className="text-gray-600 mb-4">The requested staff member could not be found.</p>
          <Link
            href="/headmaster/staff"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Staff List
          </Link>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    ...originalStaff,
    qualifications: [...originalStaff.qualifications],
    subjects: [...originalStaff.subjects],
    classes: [...originalStaff.classes]
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newQualification, setNewQualification] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newClass, setNewClass] = useState("");

  const departments = ["Mathematics", "English", "Science", "ICT", "Health Services", "Administration", "Library Services", "Security"];
  const positions = ["Teacher", "Vice Principal", "Head Teacher", "Librarian", "Nurse", "ICT Coordinator", "Security Supervisor"];
  const employmentTypes = ["Full-time", "Part-time", "Contract"];
  const statusOptions = ["Active", "On Leave", "Terminated"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const relationshipOptions = ["Spouse", "Parent", "Sibling", "Child", "Friend", "Colleague", "Other"];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const addQualification = () => {
    if (newQualification.trim()) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification.trim()]
      }));
      setNewQualification("");
    }
  };

  const removeQualification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const addSubject = () => {
    if (newSubject.trim()) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, newSubject.trim()]
      }));
      setNewSubject("");
    }
  };

  const removeSubject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index)
    }));
  };

  const addClass = () => {
    if (newClass.trim()) {
      setFormData(prev => ({
        ...prev,
        classes: [...prev.classes, newClass.trim()]
      }));
      setNewClass("");
    }
  };

  const removeClass = (index: number) => {
    setFormData(prev => ({
      ...prev,
      classes: prev.classes.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.employmentType) newErrors.employmentType = "Employment type is required";
    if (!formData.dateHired) newErrors.dateHired = "Date hired is required";
    if (!formData.salary || formData.salary <= 0) newErrors.salary = "Valid salary is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^\+233\s?\d{2}\s?\d{3}\s?\d{4}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid Ghana phone number (+233 XX XXX XXXX)";
    }

    // Emergency contact validation
    if (!formData.emergencyContact.name.trim()) {
      newErrors.emergencyContactName = "Emergency contact name is required";
    }
    if (!formData.emergencyContact.phone.trim()) {
      newErrors.emergencyContactPhone = "Emergency contact phone is required";
    }
    if (!formData.emergencyContact.relationship) {
      newErrors.emergencyContactRelationship = "Emergency contact relationship is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/headmaster/staff/${params.id}`}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Edit Staff Member</h1>
                <p className="text-blue-100">Update staff information and details</p>
              </div>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-sm font-medium">Staff ID</p>
              <p className="text-lg font-bold">{formData.employeeId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter nationality"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {maritalStatusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full address"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+233 XX XXX XXXX"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Employment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select position</option>
                  {positions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
                {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => handleInputChange("employmentType", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select employment type</option>
                  {employmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.employmentType && <p className="text-red-500 text-sm mt-1">{errors.employmentType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Hired <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateHired}
                  onChange={(e) => handleInputChange("dateHired", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.dateHired && <p className="text-red-500 text-sm mt-1">{errors.dateHired}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary (GH₵) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter salary amount"
                  min="0"
                />
                {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleNestedInputChange("emergencyContact", "name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter contact name"
                />
                {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleNestedInputChange("emergencyContact", "phone", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+233 XX XXX XXXX"
                />
                {errors.emergencyContactPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleNestedInputChange("emergencyContact", "relationship", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select relationship</option>
                  {relationshipOptions.map(relation => (
                    <option key={relation} value={relation}>{relation}</option>
                  ))}
                </select>
                {errors.emergencyContactRelationship && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactRelationship}</p>}
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Academic Information</h3>
            
            {/* Qualifications */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
              <div className="space-y-2 mb-3">
                {formData.qualifications.map((qual, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg border">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span className="flex-1">{qual}</span>
                    <button
                      type="button"
                      onClick={() => removeQualification(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newQualification}
                  onChange={(e) => setNewQualification(e.target.value)}
                  placeholder="Add new qualification"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addQualification())}
                />
                <button
                  type="button"
                  onClick={addQualification}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
              <div className="space-y-2 mb-3">
                {formData.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg border">
                    <Briefcase className="w-4 h-4 text-green-600" />
                    <span className="flex-1">{subject}</span>
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Add new subject"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
                />
                <button
                  type="button"
                  onClick={addSubject}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Classes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Classes</label>
              <div className="space-y-2 mb-3">
                {formData.classes.map((classItem, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg border">
                    <User className="w-4 h-4 text-purple-600" />
                    <span className="flex-1">{classItem}</span>
                    <button
                      type="button"
                      onClick={() => removeClass(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
                  placeholder="Add new class"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addClass())}
                />
                <button
                  type="button"
                  onClick={addClass}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Link
              href={`/headmaster/staff/${params.id}`}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Staff
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Staff Updated Successfully!</h3>
              <p className="text-gray-600 mb-6">
                {formData.firstName} {formData.lastName}'s information has been updated successfully.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/headmaster/staff"
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center"
                >
                  Back to List
                </Link>
                <Link
                  href={`/headmaster/staff/${params.id}`}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
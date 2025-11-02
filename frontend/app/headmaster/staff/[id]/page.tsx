"use client"

import { useState } from "react";
import { 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Star, 
  User, 
  Building, 
  Clock, 
  FileText, 
  Users, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  BookOpen,
  DollarSign,
  Contact,
  Shield,
  Download,
  Print,
  Send
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
      rating: 4.8,
      yearsExperience: 8,
      photo: null,
      dateOfBirth: "1985-03-12",
      nationality: "Ghanaian",
      maritalStatus: "Married",
      bankDetails: {
        bankName: "Ghana Commercial Bank",
        accountNumber: "****1234",
        accountType: "Savings"
      },
      attendance: {
        present: 95,
        absent: 3,
        late: 2,
        percentage: 95.0
      },
      performance: {
        studentRating: 4.7,
        parentFeedback: 4.8,
        peerReview: 4.6,
        headRating: 4.9
      },
      documents: [
        { name: "CV/Resume", status: "Verified", date: "2022-08-01" },
        { name: "Educational Certificates", status: "Verified", date: "2022-08-01" },
        { name: "Employment Contract", status: "Signed", date: "2022-08-15" },
        { name: "Medical Certificate", status: "Valid", date: "2024-01-15" }
      ],
      leaveBalance: {
        annual: 15,
        sick: 8,
        emergency: 3,
        total: 26
      },
      recentActivities: [
        { type: "Class Assignment", description: "Assigned to Grade 6A Mathematics", date: "2024-10-28" },
        { type: "Training", description: "Completed Digital Teaching Methods Workshop", date: "2024-10-25" },
        { type: "Performance Review", description: "Quarterly review completed - Excellent", date: "2024-10-20" },
        { type: "Leave Request", description: "Annual leave approved for 3 days", date: "2024-10-15" }
      ]
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
      rating: 4.6,
      yearsExperience: 6,
      photo: null,
      dateOfBirth: "1987-06-20",
      nationality: "Ghanaian",
      maritalStatus: "Single",
      bankDetails: {
        bankName: "Ecobank Ghana",
        accountNumber: "****5678",
        accountType: "Current"
      },
      attendance: {
        present: 92,
        absent: 5,
        late: 3,
        percentage: 92.0
      },
      performance: {
        studentRating: 4.5,
        parentFeedback: 4.6,
        peerReview: 4.4,
        headRating: 4.7
      },
      documents: [
        { name: "CV/Resume", status: "Verified", date: "2021-08-15" },
        { name: "Educational Certificates", status: "Verified", date: "2021-08-15" },
        { name: "Employment Contract", status: "Signed", date: "2021-09-01" },
        { name: "Medical Certificate", status: "Valid", date: "2024-01-15" }
      ],
      leaveBalance: {
        annual: 18,
        sick: 6,
        emergency: 2,
        total: 26
      },
      recentActivities: [
        { type: "Class Assignment", description: "Assigned to Grade 3A English", date: "2024-10-26" },
        { type: "Parent Meeting", description: "Met with Grade 2B parents", date: "2024-10-23" },
        { type: "Lesson Planning", description: "Prepared Q4 lesson plans", date: "2024-10-20" }
      ]
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
      rating: 4.9,
      yearsExperience: 4,
      photo: null,
      dateOfBirth: "1990-11-08",
      nationality: "Ghanaian",
      maritalStatus: "Married",
      bankDetails: {
        bankName: "Standard Chartered Bank",
        accountNumber: "****9012",
        accountType: "Savings"
      },
      attendance: {
        present: 98,
        absent: 1,
        late: 1,
        percentage: 98.0
      },
      performance: {
        studentRating: 4.8,
        parentFeedback: 4.9,
        peerReview: 4.7,
        headRating: 4.9
      },
      documents: [
        { name: "CV/Resume", status: "Verified", date: "2022-12-20" },
        { name: "Educational Certificates", status: "Verified", date: "2022-12-20" },
        { name: "Employment Contract", status: "Signed", date: "2023-01-10" },
        { name: "Medical Certificate", status: "Valid", date: "2024-01-15" }
      ],
      leaveBalance: {
        annual: 20,
        sick: 10,
        emergency: 3,
        total: 33
      },
      recentActivities: [
        { type: "Science Fair", description: "Organized Grade 6 Science Fair", date: "2024-10-27" },
        { type: "Lab Setup", description: "Set up new chemistry lab equipment", date: "2024-10-24" },
        { type: "Training", description: "Attended Environmental Education Workshop", date: "2024-10-21" }
      ]
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
      rating: 4.7,
      yearsExperience: 5,
      photo: null,
      dateOfBirth: "1988-04-15",
      nationality: "Ghanaian",
      maritalStatus: "Single",
      bankDetails: {
        bankName: "Fidelity Bank Ghana",
        accountNumber: "****3456",
        accountType: "Current"
      },
      attendance: {
        present: 94,
        absent: 4,
        late: 2,
        percentage: 94.0
      },
      performance: {
        studentRating: 4.6,
        parentFeedback: 4.7,
        peerReview: 4.5,
        headRating: 4.8
      },
      documents: [
        { name: "CV/Resume", status: "Verified", date: "2022-01-30" },
        { name: "Educational Certificates", status: "Verified", date: "2022-01-30" },
        { name: "Employment Contract", status: "Signed", date: "2022-02-20" },
        { name: "Medical Certificate", status: "Valid", date: "2024-01-15" }
      ],
      leaveBalance: {
        annual: 16,
        sick: 7,
        emergency: 2,
        total: 25
      },
      recentActivities: [
        { type: "System Update", description: "Updated school network infrastructure", date: "2024-10-28" },
        { type: "Training", description: "Conducted teacher ICT training session", date: "2024-10-25" },
        { type: "Maintenance", description: "Serviced computer lab equipment", date: "2024-10-22" }
      ]
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
      rating: 4.5,
      yearsExperience: 7,
      photo: null,
      dateOfBirth: "1986-09-12",
      nationality: "Ghanaian",
      maritalStatus: "Married",
      bankDetails: {
        bankName: "CAL Bank",
        accountNumber: "****7890",
        accountType: "Savings"
      },
      attendance: {
        present: 96,
        absent: 2,
        late: 2,
        percentage: 96.0
      },
      performance: {
        studentRating: 4.4,
        parentFeedback: 4.5,
        peerReview: 4.3,
        headRating: 4.6
      },
      documents: [
        { name: "CV/Resume", status: "Verified", date: "2021-05-15" },
        { name: "Educational Certificates", status: "Verified", date: "2021-05-15" },
        { name: "Employment Contract", status: "Signed", date: "2021-06-01" },
        { name: "Medical Certificate", status: "Valid", date: "2024-01-15" }
      ],
      leaveBalance: {
        annual: 14,
        sick: 5,
        emergency: 1,
        total: 20
      },
      recentActivities: [
        { type: "Health Check", description: "Conducted quarterly health screenings", date: "2024-10-26" },
        { type: "First Aid", description: "Provided first aid training to staff", date: "2024-10-23" },
        { type: "Health Talk", description: "Gave health talk to Grade 5 students", date: "2024-10-20" }
      ]
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
      rating: 4.9,
      yearsExperience: 12,
      photo: null,
      dateOfBirth: "1982-01-25",
      nationality: "Ghanaian",
      maritalStatus: "Married",
      bankDetails: {
        bankName: "Ghana Commercial Bank",
        accountNumber: "****2345",
        accountType: "Current"
      },
      attendance: {
        present: 99,
        absent: 1,
        late: 0,
        percentage: 99.0
      },
      performance: {
        studentRating: 4.8,
        parentFeedback: 4.9,
        peerReview: 4.9,
        headRating: 5.0
      },
      documents: [
        { name: "CV/Resume", status: "Verified", date: "2020-02-20" },
        { name: "Educational Certificates", status: "Verified", date: "2020-02-20" },
        { name: "Employment Contract", status: "Signed", date: "2020-03-15" },
        { name: "Medical Certificate", status: "Valid", date: "2024-01-15" }
      ],
      leaveBalance: {
        annual: 22,
        sick: 8,
        emergency: 3,
        total: 33
      },
      recentActivities: [
        { type: "Staff Meeting", description: "Chaired monthly staff meeting", date: "2024-10-28" },
        { type: "Policy Review", description: "Reviewed school attendance policy", date: "2024-10-25" },
        { type: "Parent Conference", description: "Met with PTA executive", date: "2024-10-22" }
      ]
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
      rating: 4.4,
      yearsExperience: 3,
      photo: null,
      dateOfBirth: "1991-07-18",
      nationality: "Ghanaian",
      maritalStatus: "Single",
      bankDetails: {
        bankName: "UMB Bank",
        accountNumber: "****6789",
        accountType: "Savings"
      },
      attendance: {
        present: 88,
        absent: 8,
        late: 4,
        percentage: 88.0
      },
      performance: {
        studentRating: 4.3,
        parentFeedback: 4.4,
        peerReview: 4.2,
        headRating: 4.5
      },
      documents: [
        { name: "CV/Resume", status: "Verified", date: "2022-10-15" },
        { name: "Educational Certificates", status: "Verified", date: "2022-10-15" },
        { name: "Employment Contract", status: "Signed", date: "2022-11-01" },
        { name: "Medical Certificate", status: "Valid", date: "2024-01-15" }
      ],
      leaveBalance: {
        annual: 12,
        sick: 4,
        emergency: 1,
        total: 17
      },
      recentActivities: [
        { type: "Book Catalogue", description: "Updated library book catalogue", date: "2024-10-27" },
        { type: "Reading Club", description: "Organized weekly reading club session", date: "2024-10-24" },
        { type: "Book Fair", description: "Set up school book fair", date: "2024-10-21" }
      ]
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
      rating: 4.2,
      yearsExperience: 10,
      photo: null,
      dateOfBirth: "1983-12-03",
      nationality: "Ghanaian",
      maritalStatus: "Married",
      bankDetails: {
        bankName: "ADB Bank",
        accountNumber: "****0123",
        accountType: "Savings"
      },
      attendance: {
        present: 85,
        absent: 12,
        late: 3,
        percentage: 85.0
      },
      performance: {
        studentRating: 4.1,
        parentFeedback: 4.2,
        peerReview: 4.0,
        headRating: 4.3
      },
      documents: [
        { name: "CV/Resume", status: "Verified", date: "2020-12-15" },
        { name: "Educational Certificates", status: "Verified", date: "2020-12-15" },
        { name: "Employment Contract", status: "Signed", date: "2021-01-05" },
        { name: "Medical Certificate", status: "Expired", date: "2023-01-15" }
      ],
      leaveBalance: {
        annual: 8,
        sick: 15,
        emergency: 2,
        total: 25
      },
      recentActivities: [
        { type: "Security Patrol", description: "Conducted campus security rounds", date: "2024-10-15" },
        { type: "Incident Report", description: "Filed monthly security report", date: "2024-10-10" },
        { type: "Leave Application", description: "Applied for medical leave", date: "2024-10-05" }
      ]
    }
  ];
  
  return staffData.find(staff => staff.id === parseInt(id));
};

// Helper functions
const getEmploymentTypeColor = (type: string) => {
  switch (type) {
    case "Full-time": return "bg-blue-100 text-blue-800";
    case "Part-time": return "bg-purple-100 text-purple-800"; 
    case "Contract": return "bg-orange-100 text-orange-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
    />
  ));
};

interface StaffDetailPageProps {
  params: {
    id: string;
  };
}

export default function StaffDetailPage({ params }: StaffDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const staff = getStaffById(params.id);

  if (!staff) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Leave": return "bg-yellow-100 text-yellow-800";
      case "Terminated": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case "Full-time": return "bg-blue-100 text-blue-800";
      case "Part-time": return "bg-purple-100 text-purple-800"; 
      case "Contract": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "performance", label: "Performance", icon: TrendingUp },
    { id: "attendance", label: "Attendance", icon: Clock },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "activities", label: "Activities", icon: BookOpen }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/headmaster/staff"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {staff.firstName} {staff.lastName}
                  </h1>
                  <p className="text-blue-100">{staff.position} • {staff.employeeId}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(staff.status)}`}>
                {staff.status}
              </span>
              <div className="flex gap-2">
                <Link
                  href={`/headmaster/staff/edit/${staff.id}`}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                  title="Edit Staff"
                >
                  <Edit3 className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-white/20 hover:bg-red-500/50 p-2 rounded-lg transition-colors"
                  title="Delete Staff"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Rating</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">{staff.rating}</span>
                <div className="flex">
                  {getRatingStars(staff.rating)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{staff.attendance.percentage}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Classes</p>
              <p className="text-2xl font-bold text-gray-900">{staff.classes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Experience</p>
              <p className="text-2xl font-bold text-gray-900">{staff.yearsExperience} years</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">First Name</label>
                        <p className="text-gray-900 font-medium">{staff.firstName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Last Name</label>
                        <p className="text-gray-900 font-medium">{staff.lastName}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                      <p className="text-gray-900 font-medium">{staff.dateOfBirth}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Nationality</label>
                      <p className="text-gray-900 font-medium">{staff.nationality}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Marital Status</label>
                      <p className="text-gray-900 font-medium">{staff.maritalStatus}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Email</p>
                        <p className="text-gray-900">{staff.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Phone</p>
                        <p className="text-gray-900">{staff.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Address</p>
                        <p className="text-gray-900">{staff.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Employment Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Employee ID</label>
                      <p className="text-gray-900 font-medium">{staff.employeeId}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Position</label>
                      <p className="text-gray-900 font-medium">{staff.position}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Department</label>
                      <p className="text-gray-900 font-medium">{staff.department}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Employment Type</label>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEmploymentTypeColor(staff.employmentType)}`}>
                        {staff.employmentType}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Date Hired</label>
                      <p className="text-gray-900 font-medium">{staff.dateHired}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Salary</label>
                      <p className="text-gray-900 font-medium">GH₵ {staff.salary.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Emergency Contact</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Contact Name</label>
                      <p className="text-gray-900 font-medium">{staff.emergencyContact.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Contact Phone</label>
                      <p className="text-gray-900 font-medium">{staff.emergencyContact.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Relationship</label>
                      <p className="text-gray-900 font-medium">{staff.emergencyContact.relationship}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Leave Balance</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-sm text-gray-600">Annual</p>
                        <p className="text-lg font-bold text-gray-900">{staff.leaveBalance.annual} days</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-sm text-gray-600">Sick</p>
                        <p className="text-lg font-bold text-gray-900">{staff.leaveBalance.sick} days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Qualifications</h4>
                    <div className="space-y-2">
                      {staff.qualifications.map((qual, index) => (
                        <div key={index} className="bg-white rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-900">{qual}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Subjects</h4>
                    <div className="space-y-2">
                      {staff.subjects.map((subject, index) => (
                        <div key={index} className="bg-white rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-gray-900">{subject}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Classes</h4>
                    <div className="space-y-2">
                      {staff.classes.map((classItem, index) => (
                        <div key={index} className="bg-white rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-gray-900">{classItem}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Student Rating</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{staff.performance.studentRating}</span>
                      <div className="flex">
                        {getRatingStars(staff.performance.studentRating)}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Parent Feedback</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{staff.performance.parentFeedback}</span>
                      <div className="flex">
                        {getRatingStars(staff.performance.parentFeedback)}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Peer Review</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{staff.performance.peerReview}</span>
                      <div className="flex">
                        {getRatingStars(staff.performance.peerReview)}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Head Rating</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{staff.performance.headRating}</span>
                      <div className="flex">
                        {getRatingStars(staff.performance.headRating)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Performance Analytics</h3>
                <p className="text-gray-600">Performance charts and detailed analytics coming soon.</p>
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Attendance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Present</h4>
                    <p className="text-2xl font-bold text-green-600">{staff.attendance.present}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Absent</h4>
                    <p className="text-2xl font-bold text-red-600">{staff.attendance.absent}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Late</h4>
                    <p className="text-2xl font-bold text-yellow-600">{staff.attendance.late}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Percentage</h4>
                    <p className="text-2xl font-bold text-blue-600">{staff.attendance.percentage}%</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Attendance Records</h3>
                <p className="text-gray-600">Monthly attendance charts and detailed records coming soon.</p>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Document Status</h3>
                <div className="space-y-4">
                  {staff.documents.map((doc, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <p className="text-sm text-gray-600">Updated: {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          doc.status === "Verified" || doc.status === "Valid" || doc.status === "Signed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {doc.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "activities" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
                <div className="space-y-4">
                  {staff.recentActivities.map((activity, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.type}</h4>
                          <p className="text-gray-600 mt-1">{activity.description}</p>
                          <p className="text-sm text-gray-500 mt-2">{activity.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-900">
                {staff.firstName} {staff.lastName}
              </span>? This action cannot be undone.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-red-800 mb-2">This will permanently remove:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Staff record and employment history</li>
                <li>• Class and subject assignments</li>
                <li>• Performance ratings and evaluations</li>
                <li>• Attendance and leave records</li>
              </ul>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle deletion logic here
                  setShowDeleteModal(false);
                  // Redirect to staff list after deletion
                  window.location.href = "/headmaster/staff";
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
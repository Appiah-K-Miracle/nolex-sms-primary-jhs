"use client"

import { useState } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Clock, 
  Check, 
  X, 
  AlertTriangle,
  UserCheck,
  UserX,
  ChevronDown,
  ChevronRight,
  FileText,
  Star,
  Building,
  IdCard
} from "lucide-react";
import Link from "next/link";

// Mock staff data
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
    address: "Kumasi, Ghana",
    emergencyContact: {
      name: "Kwame Mensah",
      phone: "+233 20 987 6543",
      relationship: "Spouse"
    },
    subjects: ["Mathematics", "Statistics"],
    classes: ["Grade 4A", "Grade 5B", "Grade 6A"],
    rating: 4.8,
    yearsExperience: 8,
    photo: null
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
    photo: null
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
    photo: null
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
    photo: null
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
    photo: null
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
    photo: null
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
    photo: null
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
      relationship: "Daughter"
    },
    subjects: ["Security Training"],
    classes: ["Staff Training"],
    rating: 4.2,
    yearsExperience: 10,
    photo: null
  }
];

const departments = ["All", "Mathematics", "English", "Science", "ICT", "Health Services", "Administration", "Library Services", "Security"];
const employmentTypes = ["All", "Full-time", "Part-time", "Contract"];
const statusOptions = ["All", "Active", "On Leave", "Terminated"];

export default function StaffListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Leave": return "bg-yellow-100 text-yellow-800";
      case "Inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "All" || staff.department === selectedDepartment;
    const matchesEmploymentType = selectedEmploymentType === "All" || staff.employmentType === selectedEmploymentType;
    const matchesStatus = selectedStatus === "All" || staff.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesEmploymentType && matchesStatus;
  });

  const sortedStaff = [...filteredStaff].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case "name":
        aValue = `${a.firstName} ${a.lastName}`;
        bValue = `${b.firstName} ${b.lastName}`;
        break;
      case "position":
        aValue = a.position;
        bValue = b.position;
        break;
      case "department":
        aValue = a.department;
        bValue = b.department;
        break;
      case "dateHired":
        aValue = new Date(a.dateHired);
        bValue = new Date(b.dateHired);
        break;
      case "salary":
        aValue = a.salary;
        bValue = b.salary;
        break;
      default:
        aValue = a.firstName;
        bValue = b.firstName;
    }
    
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleDeleteClick = (staff: any) => {
    setSelectedStaff(staff);
    setShowDeleteModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Users className="w-8 h-8" />
                Staff Management
              </h1>
              <p className="text-blue-100 mt-1">Manage school staff records and information</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium">Total Staff</p>
                <p className="text-2xl font-bold">{staffData.length}</p>
              </div>
              <Link
                href="/headmaster/staff/create"
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Staff
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Staff</p>
              <p className="text-2xl font-bold text-gray-900">
                {staffData.filter(s => s.status === "Active").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-gray-900">
                {staffData.filter(s => s.status === "On Leave").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">
                {departments.filter(d => d !== "All").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {(staffData.reduce((sum, s) => sum + s.rating, 0) / staffData.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Staff Directory</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Staff</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, ID, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {showFilters && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                <select
                  value={selectedEmploymentType}
                  onChange={(e) => setSelectedEmploymentType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {employmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  <button 
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-2 hover:text-blue-600"
                  >
                    Staff Member
                    {sortBy === "name" && (
                      <ChevronDown className={`w-4 h-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                    )}
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  <button 
                    onClick={() => handleSort("position")}
                    className="flex items-center gap-2 hover:text-blue-600"
                  >
                    Position
                    {sortBy === "position" && (
                      <ChevronDown className={`w-4 h-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                    )}
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  <button 
                    onClick={() => handleSort("department")}
                    className="flex items-center gap-2 hover:text-blue-600"
                  >
                    Department
                    {sortBy === "department" && (
                      <ChevronDown className={`w-4 h-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                    )}
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedStaff.map((staff, index) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {staff.firstName} {staff.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{staff.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{staff.position}</p>
                      <p className="text-sm text-gray-500">{staff.yearsExperience} years exp.</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {staff.department}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{staff.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{staff.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(staff.status)}`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/headmaster/staff/${staff.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/headmaster/staff/edit/${staff.id}`}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="Edit Staff"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(staff)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Staff"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedStaff.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No staff found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedStaff && (
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
                {selectedStaff.firstName} {selectedStaff.lastName}
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
                  setSelectedStaff(null);
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
"use client"

import { useState } from "react";
import { 
  ArrowLeft,
  Search,
  User,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  Plus,
  Filter,
  ChevronDown,
  MapPin,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

// Staff members data
const staffMembers = [
  {
    id: 1,
    staffId: "NLX2024STF001",
    name: "Dr. Kwame Asante",
    position: "Headmaster",
    department: "Administration",
    email: "kwame.asante@nolex.edu.gh",
    phone: "+233 24 123 4567",
    photo: null,
    employmentType: "Full-time",
    joinDate: "2020-01-15",
    status: "Active",
    leaveBalance: {
      annual: { used: 10, total: 21, remaining: 11 },
      sick: { used: 2, total: 10, remaining: 8 },
      emergency: { used: 0, total: 5, remaining: 5 }
    }
  },
  {
    id: 2,
    staffId: "NLX2024STF002",
    name: "Mrs. Akosua Mensah",
    position: "Assistant Headmaster",
    department: "Administration",
    email: "akosua.mensah@nolex.edu.gh",
    phone: "+233 24 567 8901",
    photo: null,
    employmentType: "Full-time",
    joinDate: "2020-03-01",
    status: "Active",
    leaveBalance: {
      annual: { used: 8, total: 21, remaining: 13 },
      sick: { used: 6, total: 10, remaining: 4 },
      emergency: { used: 1, total: 5, remaining: 4 }
    }
  },
  {
    id: 3,
    staffId: "NLX2024STF003",
    name: "Mr. Kofi Boateng",
    position: "Mathematics Teacher",
    department: "Teaching Staff",
    email: "kofi.boateng@nolex.edu.gh",
    phone: "+233 24 345 6789",
    photo: null,
    employmentType: "Full-time",
    joinDate: "2021-09-01",
    status: "Active",
    leaveBalance: {
      annual: { used: 12, total: 21, remaining: 9 },
      sick: { used: 1, total: 10, remaining: 9 },
      emergency: { used: 2, total: 5, remaining: 3 }
    }
  },
  {
    id: 4,
    staffId: "NLX2024STF004",
    name: "Miss Ama Darko",
    position: "English Teacher",
    department: "Teaching Staff",
    email: "ama.darko@nolex.edu.gh",
    phone: "+233 24 789 0123",
    photo: null,
    employmentType: "Full-time",
    joinDate: "2022-01-10",
    status: "Active",
    leaveBalance: {
      annual: { used: 5, total: 21, remaining: 16 },
      sick: { used: 3, total: 10, remaining: 7 },
      emergency: { used: 0, total: 5, remaining: 5 }
    }
  },
  {
    id: 5,
    staffId: "NLX2024STF005",
    name: "Mr. Yaw Osei",
    position: "Science Teacher",
    department: "Teaching Staff",
    email: "yaw.osei@nolex.edu.gh",
    phone: "+233 24 456 7890",
    photo: null,
    employmentType: "Full-time",
    joinDate: "2021-05-15",
    status: "Active",
    leaveBalance: {
      annual: { used: 14, total: 21, remaining: 7 },
      sick: { used: 0, total: 10, remaining: 10 },
      emergency: { used: 0, total: 5, remaining: 5 }
    }
  },
  {
    id: 6,
    staffId: "NLX2024STF006",
    name: "Mrs. Efua Gyamfi",
    position: "Social Studies Teacher",
    department: "Teaching Staff",
    email: "efua.gyamfi@nolex.edu.gh",
    phone: "+233 24 234 5678",
    photo: null,
    employmentType: "Full-time",
    joinDate: "2020-08-01",
    status: "Active",
    leaveBalance: {
      annual: { used: 18, total: 21, remaining: 3 },
      sick: { used: 4, total: 10, remaining: 6 },
      emergency: { used: 1, total: 5, remaining: 4 }
    }
  },
  {
    id: 7,
    staffId: "NLX2024STF007",
    name: "Mr. Samuel Nkrumah",
    position: "Accountant",
    department: "Administrative",
    email: "samuel.nkrumah@nolex.edu.gh",
    phone: "+233 24 890 1234",
    photo: null,
    employmentType: "Full-time",
    joinDate: "2021-02-01",
    status: "Active",
    leaveBalance: {
      annual: { used: 6, total: 21, remaining: 15 },
      sick: { used: 2, total: 10, remaining: 8 },
      emergency: { used: 3, total: 5, remaining: 2 }
    }
  },
  {
    id: 8,
    staffId: "NLX2024STF008",
    name: "Kwame Amoah",
    position: "Security Supervisor",
    department: "Security",
    email: "kwame.amoah@nolex.edu.gh",
    phone: "+233 24 567 2345",
    photo: null,
    employmentType: "Full-time",
    joinDate: "2022-03-01",
    status: "Active",
    leaveBalance: {
      annual: { used: 9, total: 21, remaining: 12 },
      sick: { used: 7, total: 10, remaining: 3 },
      emergency: { used: 2, total: 5, remaining: 3 }
    }
  }
];

export default function StaffSelectionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const departments = [
    "all",
    "Administration",
    "Teaching Staff", 
    "Administrative",
    "Security"
  ];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "all" || staff.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || staff.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const sortedStaff = [...filteredStaff].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "department":
        return a.department.localeCompare(b.department);
      case "position":
        return a.position.localeCompare(b.position);
      case "joinDate":
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      default:
        return 0;
    }
  });

  const getLeaveBalanceStatus = (balance: any) => {
    const totalUsed = balance.annual.used + balance.sick.used + balance.emergency.used;
    const totalAvailable = balance.annual.total + balance.sick.total + balance.emergency.total;
    const usagePercentage = (totalUsed / totalAvailable) * 100;
    
    if (usagePercentage >= 80) return { status: "high", color: "text-red-600", bg: "bg-red-100" };
    if (usagePercentage >= 60) return { status: "medium", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { status: "low", color: "text-green-600", bg: "bg-green-100" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/headmaster/staff/leave"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Calendar className="w-8 h-8" />
                  Select Staff for Leave Application
                </h1>
                <p className="text-emerald-100 mt-1">Choose a staff member to apply leave for</p>
              </div>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-sm font-medium">Total Staff</p>
              <p className="text-lg font-bold">{staffMembers.length}</p>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-teal-500/20 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Filter className="w-6 h-6 text-emerald-600" />
          Filter Staff Members
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Staff</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, ID, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="name">Name</option>
              <option value="department">Department</option>
              <option value="position">Position</option>
              <option value="joinDate">Join Date</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {sortedStaff.length} of {staffMembers.length} staff members
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 rounded"></div>
              <span>Low Usage</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-100 rounded"></div>
              <span>Medium Usage</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-100 rounded"></div>
              <span>High Usage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedStaff.map((staff) => {
          const balanceStatus = getLeaveBalanceStatus(staff.leaveBalance);
          
          return (
            <div
              key={staff.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
            >
              {/* Staff Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">{staff.name}</h4>
                  <p className="text-sm text-gray-600">{staff.position}</p>
                  <p className="text-xs text-gray-500">ID: {staff.staffId}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${balanceStatus.bg}`}></div>
              </div>

              {/* Staff Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{staff.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700 truncate">{staff.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{staff.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Joined: {staff.joinDate}</span>
                </div>
              </div>

              {/* Leave Balance Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Leave Balance
                </h5>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <p className="text-gray-600">Annual</p>
                    <p className="font-bold text-blue-600">{staff.leaveBalance.annual.remaining}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Sick</p>
                    <p className="font-bold text-red-600">{staff.leaveBalance.sick.remaining}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Emergency</p>
                    <p className="font-bold text-orange-600">{staff.leaveBalance.emergency.remaining}</p>
                  </div>
                </div>
              </div>

              {/* Leave Usage Indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Leave Usage</span>
                  <span className={`font-medium ${balanceStatus.color}`}>
                    {Math.round(((staff.leaveBalance.annual.used + staff.leaveBalance.sick.used + staff.leaveBalance.emergency.used) / 
                    (staff.leaveBalance.annual.total + staff.leaveBalance.sick.total + staff.leaveBalance.emergency.total)) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      balanceStatus.status === 'high' ? 'bg-red-500' :
                      balanceStatus.status === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ 
                      width: `${Math.round(((staff.leaveBalance.annual.used + staff.leaveBalance.sick.used + staff.leaveBalance.emergency.used) / 
                      (staff.leaveBalance.annual.total + staff.leaveBalance.sick.total + staff.leaveBalance.emergency.total)) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/headmaster/staff/leave/apply?staffId=${staff.staffId}`}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Apply Leave for {staff.name.split(' ')[0]}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {sortedStaff.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Staff Found</h3>
          <p className="text-gray-600 mb-4">No staff members match your current filters.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedDepartment("all");
              setSelectedStatus("all");
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
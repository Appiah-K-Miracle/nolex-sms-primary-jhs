"use client"

import { useState } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter,
  Save,
  RefreshCw,
  Eye,
  User,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
  UserCheck,
  UserX,
  Target
} from "lucide-react";
import Link from "next/link";

// Mock staff data for attendance marking
const staffData = [
  {
    id: 1,
    employeeId: "NLX2024STAFF001",
    firstName: "Akosua",
    lastName: "Mensah",
    position: "Mathematics Teacher",
    department: "Mathematics",
    email: "akosua.mensah@nolex.edu.gh",
    phone: "+233 24 123 4567",
    photo: null,
    currentStatus: "Present" // Present, Absent, Late
  },
  {
    id: 2,
    employeeId: "NLX2024STAFF002", 
    firstName: "Kwaku",
    lastName: "Asante",
    position: "English Teacher",
    department: "English",
    email: "kwaku.asante@nolex.edu.gh",
    phone: "+233 24 234 5678",
    photo: null,
    currentStatus: "Present"
  },
  {
    id: 3,
    employeeId: "NLX2024STAFF003",
    firstName: "Ama",
    lastName: "Osei",
    position: "Science Teacher",
    department: "Science",
    email: "ama.osei@nolex.edu.gh", 
    phone: "+233 24 345 6789",
    photo: null,
    currentStatus: "Absent"
  },
  {
    id: 4,
    employeeId: "NLX2024STAFF004",
    firstName: "Yaw",
    lastName: "Darko",
    position: "ICT Coordinator",
    department: "ICT",
    email: "yaw.darko@nolex.edu.gh",
    phone: "+233 24 456 7890",
    photo: null,
    currentStatus: "Late"
  },
  {
    id: 5,
    employeeId: "NLX2024STAFF005",
    firstName: "Adwoa",
    lastName: "Frimpong",
    position: "School Nurse",
    department: "Health Services",
    email: "adwoa.frimpong@nolex.edu.gh",
    phone: "+233 24 567 8901",
    photo: null,
    currentStatus: "Present"
  },
  {
    id: 6,
    employeeId: "NLX2024STAFF006",
    firstName: "Kofi",
    lastName: "Boateng",
    position: "Vice Principal",
    department: "Administration",
    email: "kofi.boateng@nolex.edu.gh",
    phone: "+233 24 678 9012",
    photo: null,
    currentStatus: "Present"
  },
  {
    id: 7,
    employeeId: "NLX2024STAFF007",
    firstName: "Abena",
    lastName: "Gyamfi",
    position: "Librarian",
    department: "Library Services",
    email: "abena.gyamfi@nolex.edu.gh",
    phone: "+233 24 789 0123",
    photo: null,
    currentStatus: "Present"
  },
  {
    id: 8,
    employeeId: "NLX2024STAFF008",
    firstName: "Kwame",
    lastName: "Amoah",
    position: "Security Supervisor",
    department: "Security",
    email: "kwame.amoah@nolex.edu.gh",
    phone: "+233 24 890 1234",
    photo: null,
    currentStatus: "Absent"
  }
];

const departments = ["All", "Mathematics", "English", "Science", "ICT", "Health Services", "Administration", "Library Services", "Security"];

export default function MarkAttendancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [attendanceData, setAttendanceData] = useState(
    staffData.reduce((acc, staff) => {
      acc[staff.id] = {
        status: staff.currentStatus,
        timeIn: staff.currentStatus === "Present" || staff.currentStatus === "Late" ? "08:00" : "",
        timeOut: "",
        notes: ""
      };
      return acc;
    }, {} as Record<number, { status: string; timeIn: string; timeOut: string; notes: string }>)
  );
  const [showSaveModal, setShowSaveModal] = useState(false);

  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "All" || staff.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const handleStatusChange = (staffId: number, status: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [staffId]: {
        ...prev[staffId],
        status,
        timeIn: status === "Absent" ? "" : prev[staffId].timeIn || "08:00",
        timeOut: status === "Absent" ? "" : prev[staffId].timeOut
      }
    }));
  };

  const handleFieldChange = (staffId: number, field: string, value: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [staffId]: {
        ...prev[staffId],
        [field]: value
      }
    }));
  };

  const handleSaveAttendance = () => {
    // In a real app, this would save to the backend
    setShowSaveModal(true);
    setTimeout(() => setShowSaveModal(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800";
      case "Absent": return "bg-red-100 text-red-800";
      case "Late": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present": return <CheckCircle className="w-4 h-4" />;
      case "Absent": return <XCircle className="w-4 h-4" />;
      case "Late": return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/headmaster/staff/attendance"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <UserCheck className="w-8 h-8" />
                  Mark Attendance
                </h1>
                <p className="text-green-100 mt-1">Record staff attendance for {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Today's Date</p>
              <p className="text-lg font-bold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">{staffData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-2xl font-bold text-gray-900">
                {Object.values(attendanceData).filter(a => a.status === "Present").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-gray-900">
                {Object.values(attendanceData).filter(a => a.status === "Absent").length}
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
              <p className="text-sm font-medium text-gray-600">Late</p>
              <p className="text-2xl font-bold text-gray-900">
                {Object.values(attendanceData).filter(a => a.status === "Late").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <button
              onClick={handleSaveAttendance}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Staff Member</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Department</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Time In</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Time Out</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Notes</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {staff.firstName} {staff.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{staff.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {staff.department}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={attendanceData[staff.id]?.status || "Present"}
                      onChange={(e) => handleStatusChange(staff.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border-0 ${getStatusColor(attendanceData[staff.id]?.status || "Present")}`}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <input
                      type="time"
                      value={attendanceData[staff.id]?.timeIn || ""}
                      onChange={(e) => handleFieldChange(staff.id, "timeIn", e.target.value)}
                      disabled={attendanceData[staff.id]?.status === "Absent"}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <input
                      type="time"
                      value={attendanceData[staff.id]?.timeOut || ""}
                      onChange={(e) => handleFieldChange(staff.id, "timeOut", e.target.value)}
                      disabled={attendanceData[staff.id]?.status === "Absent"}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <input
                      type="text"
                      value={attendanceData[staff.id]?.notes || ""}
                      onChange={(e) => handleFieldChange(staff.id, "notes", e.target.value)}
                      placeholder="Add notes..."
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <Link
                      href={`/headmaster/staff/attendance/${staff.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No staff found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Success!</h3>
            </div>
            <p className="text-gray-600 mb-4">Attendance has been saved successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}
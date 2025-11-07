"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Shield, 
  Eye,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  Calendar,
  Settings,
  Key,
  Lock,
  Unlock,
  UserCheck,
  AlertTriangle
} from "lucide-react";

export default function UsersRolesPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingRole, setEditingRole] = useState<any>(null);

  // Sample users data
  const users = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@nolexprimaryschool.edu.gh",
      phone: "+233 24 123 4567",
      role: "Headmaster",
      status: "active",
      lastLogin: "2025-11-05T09:30:00Z",
      createdAt: "2024-01-15T10:00:00Z",
      avatar: null
    },
    {
      id: 2, 
      name: "Michael Asante",
      email: "michael.asante@nolexprimaryschool.edu.gh",
      phone: "+233 24 234 5678",
      role: "Teacher",
      status: "active",
      lastLogin: "2025-11-05T08:15:00Z",
      createdAt: "2024-02-20T14:30:00Z",
      avatar: null
    },
    {
      id: 3,
      name: "Grace Owusu",
      email: "grace.owusu@nolexprimaryschool.edu.gh", 
      phone: "+233 24 345 6789",
      role: "Administrator",
      status: "active",
      lastLogin: "2025-11-04T16:45:00Z",
      createdAt: "2024-01-20T11:00:00Z",
      avatar: null
    },
    {
      id: 4,
      name: "John Mensah",
      email: "john.mensah@nolexprimaryschool.edu.gh",
      phone: "+233 24 456 7890",
      role: "Teacher",
      status: "inactive",
      lastLogin: "2025-10-28T12:00:00Z",
      createdAt: "2024-03-10T09:30:00Z",
      avatar: null
    },
    {
      id: 5,
      name: "Patricia Agyeman",
      email: "patricia.agyeman@nolexprimaryschool.edu.gh",
      phone: "+233 24 567 8901", 
      role: "Finance Officer",
      status: "active",
      lastLogin: "2025-11-05T07:20:00Z",
      createdAt: "2024-02-05T13:15:00Z",
      avatar: null
    }
  ];

  // Sample roles data
  const roles = [
    {
      id: 1,
      name: "Headmaster",
      description: "Full system access and administrative privileges",
      userCount: 1,
      permissions: [
        "user_management",
        "school_settings", 
        "financial_management",
        "academic_management",
        "reports_access",
        "system_admin"
      ],
      color: "bg-red-500"
    },
    {
      id: 2,
      name: "Administrator",
      description: "Administrative access with limited system settings",
      userCount: 2,
      permissions: [
        "user_management",
        "academic_management", 
        "student_management",
        "staff_management",
        "reports_access"
      ],
      color: "bg-blue-500"
    },
    {
      id: 3,
      name: "Teacher",
      description: "Access to academic and student management features",
      userCount: 45,
      permissions: [
        "academic_management",
        "student_management",
        "grade_management",
        "attendance_management",
        "basic_reports"
      ],
      color: "bg-green-500"
    },
    {
      id: 4,
      name: "Finance Officer", 
      description: "Access to financial management and reporting",
      userCount: 3,
      permissions: [
        "financial_management",
        "fee_management",
        "expense_management",
        "financial_reports",
        "payroll_management"
      ],
      color: "bg-purple-500"
    },
    {
      id: 5,
      name: "Student",
      description: "Limited access to personal academic information",
      userCount: 850,
      permissions: [
        "view_grades",
        "view_attendance",
        "view_timetable",
        "view_announcements"
      ],
      color: "bg-orange-500"
    },
    {
      id: 6,
      name: "Parent/Guardian",
      description: "Access to ward's academic information and communication",
      userCount: 650,
      permissions: [
        "view_ward_grades",
        "view_ward_attendance",
        "communication_access",
        "fee_payment",
        "view_announcements"
      ],
      color: "bg-teal-500"
    }
  ];

  const permissions = [
    { id: "user_management", name: "User Management", category: "Administration" },
    { id: "school_settings", name: "School Settings", category: "Administration" },
    { id: "system_admin", name: "System Administration", category: "Administration" },
    { id: "academic_management", name: "Academic Management", category: "Academics" },
    { id: "student_management", name: "Student Management", category: "Academics" },
    { id: "staff_management", name: "Staff Management", category: "Academics" },
    { id: "grade_management", name: "Grade Management", category: "Academics" },
    { id: "attendance_management", name: "Attendance Management", category: "Academics" },
    { id: "financial_management", name: "Financial Management", category: "Finance" },
    { id: "fee_management", name: "Fee Management", category: "Finance" },
    { id: "expense_management", name: "Expense Management", category: "Finance" },
    { id: "payroll_management", name: "Payroll Management", category: "Finance" },
    { id: "reports_access", name: "Advanced Reports", category: "Reports" },
    { id: "financial_reports", name: "Financial Reports", category: "Reports" },
    { id: "basic_reports", name: "Basic Reports", category: "Reports" },
    { id: "view_grades", name: "View Grades", category: "Student Access" },
    { id: "view_attendance", name: "View Attendance", category: "Student Access" },
    { id: "view_timetable", name: "View Timetable", category: "Student Access" },
    { id: "view_announcements", name: "View Announcements", category: "General" },
    { id: "communication_access", name: "Communication", category: "General" },
    { id: "fee_payment", name: "Fee Payment", category: "Finance" },
    { id: "view_ward_grades", name: "View Ward Grades", category: "Parent Access" },
    { id: "view_ward_attendance", name: "View Ward Attendance", category: "Parent Access" }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/settings"
              className="text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Users & Roles Management</h1>
              <p className="text-green-100">Manage user accounts, roles, and permissions</p>
            </div>
          </div>
          <button
            onClick={() => setShowUserModal(true)}
            className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "users"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users ({users.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab("roles")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "roles"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Roles ({roles.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab("permissions")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "permissions"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                Permissions ({permissions.length})
              </div>
            </button>
          </nav>
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="p-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role.id} value={role.name}>{role.name}</option>
                ))}
              </select>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Last Login</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="font-medium text-gray-600">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'Headmaster' ? 'bg-red-100 text-red-800' :
                          user.role === 'Administrator' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'Teacher' ? 'bg-green-100 text-green-800' :
                          user.role === 'Finance Officer' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {user.status === 'active' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            user.status === 'active' ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {formatLastLogin(user.lastLogin)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setEditingUser(user)}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === "roles" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">System Roles</h3>
              <button
                onClick={() => setShowRoleModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Create Role
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <div key={role.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 ${role.color} rounded-full`}></div>
                      <h4 className="text-lg font-semibold text-gray-900">{role.name}</h4>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{role.userCount} users</span>
                    <span>{role.permissions.length} permissions</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingRole(role)}
                      className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200 transition-colors"
                    >
                      Edit Role
                    </button>
                    <button className="px-3 py-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === "permissions" && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">System Permissions</h3>
            
            {Object.entries(
              permissions.reduce((acc, permission) => {
                if (!acc[permission.category]) acc[permission.category] = [];
                acc[permission.category].push(permission);
                return acc;
              }, {} as Record<string, typeof permissions>)
            ).map(([category, categoryPermissions]) => (
              <div key={category} className="mb-8">
                <h4 className="text-md font-medium text-gray-900 mb-4">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryPermissions.map((permission) => (
                    <div key={permission.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{permission.name}</h5>
                          <p className="text-sm text-gray-500">{permission.id}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {roles.filter(role => role.permissions.includes(permission.id)).map(role => (
                            <div
                              key={role.id}
                              className={`w-2 h-2 ${role.color} rounded-full`}
                              title={role.name}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Roles</p>
              <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Permissions</p>
              <p className="text-2xl font-bold text-gray-900">{permissions.length}</p>
            </div>
            <Key className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
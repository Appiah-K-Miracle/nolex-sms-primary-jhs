"use client";

import React from "react";
import Link from "next/link";
import { 
  Settings, 
  Users, 
  Building, 
  Bell, 
  ChevronRight,
  Shield,
  Globe,
  Palette,
  Mail,
  MessageSquare,
  Clock,
  Database,
  Lock,
  UserCheck,
  School,
  MapPin,
  Phone,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export default function SettingsPage() {
  const settingsCategories = [
    {
      id: "general",
      title: "General Settings",
      description: "Manage basic school information, academic year, terms, and system preferences",
      icon: Settings,
      href: "/headmaster/settings/general",
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      features: [
        "School basic information",
        "Academic year settings", 
        "Term configurations",
        "Time zones & regional settings",
        "System preferences"
      ]
    },
    {
      id: "users",
      title: "Users & Roles",
      description: "Manage user accounts, role assignments, permissions, and access control",
      icon: Users,
      href: "/headmaster/settings/users",
      color: "bg-green-500", 
      lightColor: "bg-green-50",
      textColor: "text-green-600",
      features: [
        "User account management",
        "Role assignments",
        "Permission controls",
        "Access levels",
        "Security settings"
      ]
    },
    {
      id: "profile",
      title: "School Profile",
      description: "Configure school branding, contact information, logo, and public details",
      icon: Building,
      href: "/headmaster/settings/profile",
      color: "bg-purple-500",
      lightColor: "bg-purple-50", 
      textColor: "text-purple-600",
      features: [
        "School branding & logo",
        "Contact information",
        "Address & location",
        "Public information",
        "Social media links"
      ]
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Set up email settings, SMS configuration, alerts, and communication templates",
      icon: Bell,
      href: "/headmaster/settings/notifications",
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600", 
      features: [
        "Email configurations",
        "SMS settings",
        "Alert preferences",
        "Communication templates",
        "Notification schedules"
      ]
    }
  ];

  const recentActivities = [
    {
      action: "System backup completed",
      time: "2 hours ago",
      type: "success",
      icon: CheckCircle
    },
    {
      action: "User permissions updated",
      time: "5 hours ago", 
      type: "info",
      icon: UserCheck
    },
    {
      action: "Email configuration changed",
      time: "1 day ago",
      type: "warning",
      icon: Mail
    },
    {
      action: "Security settings modified",
      time: "2 days ago",
      type: "info", 
      icon: Lock
    }
  ];

  const systemStats = [
    {
      label: "Total Users",
      value: "247",
      icon: Users,
      color: "text-blue-600"
    },
    {
      label: "Active Sessions",
      value: "42", 
      icon: Globe,
      color: "text-green-600"
    },
    {
      label: "Database Size",
      value: "2.4 GB",
      icon: Database,
      color: "text-purple-600"
    },
    {
      label: "Uptime", 
      value: "99.9%",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white bg-opacity-20 rounded-lg">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">System Settings</h1>
            <p className="text-gray-200">Configure and manage your school management system</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings Categories */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settingsCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 ${category.lightColor} rounded-lg`}>
                    <category.icon className={`w-6 h-6 ${category.textColor}`} />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                
                <div className="space-y-1">
                  {category.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 ${category.color} rounded-full`}></div>
                      <span className="text-xs text-gray-500">{feature}</span>
                    </div>
                  ))}
                  {category.features.length > 3 && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                      <span className="text-xs text-gray-400">
                        +{category.features.length - 3} more
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* System Statistics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-gray-600" />
              System Overview
            </h3>
            
            <div className="space-y-4">
              {systemStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{stat.value}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              Recent Activities
            </h3>
            
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-full ${
                    activity.type === 'success' ? 'bg-green-100' :
                    activity.type === 'warning' ? 'bg-orange-100' : 'bg-blue-100'
                  }`}>
                    <activity.icon className={`w-3 h-3 ${
                      activity.type === 'success' ? 'text-green-600' :
                      activity.type === 'warning' ? 'text-orange-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
              View all activities
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                <Database className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Backup System</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Security Audit</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-700">Test Email</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                <MessageSquare className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-gray-700">Test SMS</span>
              </button>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Healthy</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Service</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SMS Gateway</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Limited</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Backup System</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Running</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Settings, 
  School, 
  Calendar, 
  Clock, 
  Globe, 
  Database,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
  MapPin,
  Building
} from "lucide-react";

export default function GeneralSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [formData, setFormData] = useState({
    // School Basic Information
    schoolName: "Nolex Primary & JHS",
    schoolCode: "NPJHS001",
    establishedYear: "2010",
    schoolType: "Primary & Junior High School",
    ownership: "Private",
    
    // Academic Year Settings
    currentAcademicYear: "2024/2025",
    academicYearStart: "2024-09-01",
    academicYearEnd: "2025-07-31",
    
    // Term Configuration
    term1Start: "2024-09-01",
    term1End: "2024-12-15", 
    term2Start: "2025-01-08",
    term2End: "2025-04-18",
    term3Start: "2025-05-05",
    term3End: "2025-07-31",
    
    // Regional Settings
    timezone: "Africa/Accra",
    country: "Ghana",
    currency: "GHS",
    language: "English",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12-hour",
    
    // System Preferences
    systemName: "Nolex SMS",
    sessionTimeout: "30",
    autoBackup: true,
    backupFrequency: "daily",
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    
    // Contact Information
    primaryEmail: "info@nolexprimaryschool.edu.gh",
    secondaryEmail: "admin@nolexprimaryschool.edu.gh",
    primaryPhone: "+233 24 123 4567",
    secondaryPhone: "+233 50 987 6543",
    website: "www.nolexprimaryschool.edu.gh",
    
    // Address
    streetAddress: "123 Education Avenue",
    city: "Accra",
    region: "Greater Accra",
    postalCode: "GA-123-4567",
    
    // System Settings
    maxStudentsPerClass: "40",
    gradePassingMark: "50",
    attendanceGracePeriod: "15",
    defaultUserRole: "student"
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Saving general settings:", formData);
    setSaving(false);
    setShowSuccessMessage(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const timezones = [
    "Africa/Accra",
    "Africa/Lagos", 
    "Africa/Cairo",
    "Europe/London",
    "America/New_York",
    "America/Los_Angeles"
  ];

  const countries = [
    "Ghana",
    "Nigeria", 
    "Kenya",
    "South Africa",
    "Egypt",
    "United Kingdom",
    "United States"
  ];

  const currencies = [
    "GHS - Ghana Cedis",
    "NGN - Nigerian Naira", 
    "KES - Kenyan Shilling",
    "ZAR - South African Rand",
    "USD - US Dollar",
    "EUR - Euro"
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/headmaster/settings"
              className="text-white hover:text-blue-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">General Settings</h1>
              <p className="text-blue-100">Configure basic school information and system preferences</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">Settings saved successfully!</p>
          </div>
        </div>
      )}

      {/* System Status Cards - Moved to Top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">System Status</p>
              <p className="text-2xl font-bold text-green-600">Online</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>Last backup: 2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">487</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Database className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <span>↗ 23 new this week</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Database className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* School Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <School className="w-5 h-5 text-blue-600" />
              School Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Name
                </label>
                <input
                  type="text"
                  value={formData.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Code
                </label>
                <input
                  type="text"
                  value={formData.schoolCode}
                  onChange={(e) => handleInputChange('schoolCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Established Year
                </label>
                <input
                  type="text"
                  value={formData.establishedYear}
                  onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Type
                </label>
                <select
                  value={formData.schoolType}
                  onChange={(e) => handleInputChange('schoolType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Primary School">Primary School</option>
                  <option value="Junior High School">Junior High School</option>
                  <option value="Primary & Junior High School">Primary & Junior High School</option>
                  <option value="Senior High School">Senior High School</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ownership
                </label>
                <select
                  value={formData.ownership}
                  onChange={(e) => handleInputChange('ownership', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                  <option value="Mission">Mission</option>
                  <option value="International">International</option>
                </select>
              </div>
            </div>
          </div>

          {/* Academic Year Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Academic Year Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Academic Year
                </label>
                <input
                  type="text"
                  value={formData.currentAcademicYear}
                  onChange={(e) => handleInputChange('currentAcademicYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year Start
                </label>
                <input
                  type="date"
                  value={formData.academicYearStart}
                  onChange={(e) => handleInputChange('academicYearStart', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year End
                </label>
                <input
                  type="date"
                  value={formData.academicYearEnd}
                  onChange={(e) => handleInputChange('academicYearEnd', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-4">Term Dates</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term 1 Start
                  </label>
                  <input
                    type="date"
                    value={formData.term1Start}
                    onChange={(e) => handleInputChange('term1Start', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term 1 End
                  </label>
                  <input
                    type="date"
                    value={formData.term1End}
                    onChange={(e) => handleInputChange('term1End', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term 2 Start
                  </label>
                  <input
                    type="date"
                    value={formData.term2Start}
                    onChange={(e) => handleInputChange('term2Start', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term 2 End
                  </label>
                  <input
                    type="date"
                    value={formData.term2End}
                    onChange={(e) => handleInputChange('term2End', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term 3 Start
                  </label>
                  <input
                    type="date"
                    value={formData.term3Start}
                    onChange={(e) => handleInputChange('term3Start', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term 3 End
                  </label>
                  <input
                    type="date"
                    value={formData.term3End}
                    onChange={(e) => handleInputChange('term3End', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Regional Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Regional Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency.split(' - ')[0]}>{currency}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Portuguese">Portuguese</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <select
                  value={formData.dateFormat}
                  onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Format
                </label>
                <select
                  value={formData.timeFormat}
                  onChange={(e) => handleInputChange('timeFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="12-hour">12-hour (AM/PM)</option>
                  <option value="24-hour">24-hour</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" />
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    value={formData.primaryEmail}
                    onChange={(e) => handleInputChange('primaryEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Email
                  </label>
                  <input
                    type="email"
                    value={formData.secondaryEmail}
                    onChange={(e) => handleInputChange('secondaryEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.primaryPhone}
                    onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.secondaryPhone}
                    onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.streetAddress}
                    onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* System Preferences - Moved to main content */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              System Preferences
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={formData.sessionTimeout}
                  onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Students per Class
                </label>
                <input
                  type="number"
                  value={formData.maxStudentsPerClass}
                  onChange={(e) => handleInputChange('maxStudentsPerClass', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Passing Mark (%)
                </label>
                <input
                  type="number"
                  value={formData.gradePassingMark}
                  onChange={(e) => handleInputChange('gradePassingMark', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup Frequency
                </label>
                <select
                  value={formData.backupFrequency}
                  onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">System Controls</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.autoBackup}
                  onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium text-gray-900">Auto Backup</span>
                  <p className="text-sm text-gray-600">Automatically backup system data</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.allowRegistration}
                  onChange={(e) => handleInputChange('allowRegistration', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium text-gray-900">Allow Registration</span>
                  <p className="text-sm text-gray-600">Allow new user registrations</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.requireEmailVerification}
                  onChange={(e) => handleInputChange('requireEmailVerification', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium text-gray-900">Email Verification</span>
                  <p className="text-sm text-gray-600">Require email verification for new accounts</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.maintenanceMode}
                  onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <div>
                  <span className="font-medium text-gray-900">Maintenance Mode</span>
                  <p className="text-sm text-gray-600">Put system in maintenance mode</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Database className="w-4 h-4" />
                Backup System
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Restart Services
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                Reset to Default
              </button>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Version</p>
                <p className="font-medium text-gray-900">SMS v2.1.0</p>
              </div>
              <div>
                <p className="text-gray-600">Last Updated</p>
                <p className="font-medium text-gray-900">2025-11-01</p>
              </div>
              <div>
                <p className="text-gray-600">Uptime</p>
                <p className="font-medium text-gray-900">15 days, 6 hours</p>
              </div>
              <div>
                <p className="text-gray-600">Database Size</p>
                <p className="font-medium text-gray-900">2.3 GB</p>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">Settings Help</h3>
                <p className="text-sm text-blue-700">
                  These settings control the basic operation of your school management system. 
                  Changes will affect all users and should be made carefully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
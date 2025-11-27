"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Save,
  X,
  Plus,
  Minus,
  Calendar,
  Clock,
  Bell,
  BellOff,
  Users,
  User,
  Phone,
  Mail,
  MapPin,
  Car,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Info,
  Settings,
  Share2,
  Download,
  Upload,
  FileText,
  Image,
  Video,
  Heart,
  Star,
  Flag,
  MessageSquare,
  Camera,
  Edit3,
  Trash2,
  MoreVertical,
  ChevronDown,
  Search,
  Filter,
  CalendarDays,
  Clock3,
  Smartphone,
  Laptop,
  Globe,
  Shield,
  Eye
} from "lucide-react";

export default function EventEditPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  
  const [activeTab, setActiveTab] = useState<'rsvp' | 'notifications' | 'preferences' | 'accessibility'>('rsvp');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // RSVP Management State
  const [rsvpData, setRsvpData] = useState({
    status: 'attending', // attending, not_attending, maybe, tentative
    attendeeCount: 2,
    childrenAttending: ['Kwame Mensah'],
    additionalGuests: [],
    dietaryRestrictions: '',
    specialRequests: '',
    volunteerInterest: false,
    transportNeeds: false,
    accommodationNeeds: '',
    emergencyContact: {
      name: 'John Mensah',
      phone: '+233 24 123 4567',
      relationship: 'Father'
    },
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true,
        frequency: 'important_only' // all, important_only, minimal, none
      },
      communication: {
        receiveUpdates: true,
        allowPhotos: true,
        shareContact: false,
        joinGroupChat: true
      },
      accessibility: {
        wheelchairAccess: false,
        hearingAssistance: false,
        visualAssistance: false,
        languageSupport: 'english',
        otherNeeds: ''
      }
    },
    paymentPreferences: {
      method: 'mobile_money', // mobile_money, bank_card, cash, bank_transfer
      mobileNumber: '+233 24 123 4567',
      autoPayment: false,
      receiptMethod: 'email' // email, sms, pickup
    }
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    eventReminders: {
      oneWeekBefore: { enabled: true, method: ['email', 'push'] },
      threeDaysBefore: { enabled: true, method: ['email', 'sms', 'push'] },
      oneDayBefore: { enabled: true, method: ['sms', 'push'] },
      twoHoursBefore: { enabled: false, method: ['push'] },
      customTime: { enabled: false, hours: 24, method: ['email'] }
    },
    eventUpdates: {
      scheduleChanges: true,
      venueChanges: true,
      weatherAlerts: true,
      emergencyNotifications: true,
      generalAnnouncements: false
    },
    communicationPreferences: {
      preferredLanguage: 'english',
      timeZone: 'GMT',
      quietHours: {
        enabled: true,
        startTime: '22:00',
        endTime: '07:00'
      }
    }
  });

  // Event Preferences State
  const [eventPreferences, setEventPreferences] = useState({
    participation: {
      volunteerRoles: [],
      skillsOffered: [],
      availableHours: '',
      preferredTasks: []
    },
    socialPreferences: {
      allowPhotos: true,
      shareContactWithOtherParents: false,
      joinEventGroupChats: true,
      receiveEventNewsletter: true
    },
    childPreferences: {
      allowChildPhotos: true,
      childParticipationLevel: 'full', // full, limited, observer
      childSupervisionNeeds: 'independent', // independent, minimal, constant
      childAllergies: '',
      childMedicalInfo: ''
    },
    logisticsPreferences: {
      parkingPreference: 'closest_available',
      arrivalTimePreference: 'on_time',
      departureTimePreference: 'event_end',
      carpoolInterest: false,
      publicTransportInfo: false
    }
  });

  const handleRSVPChange = (field: string, value: any) => {
    setRsvpData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setRsvpData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleNotificationChange = (section: string, field: string, value: any) => {
    setNotificationSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handlePreferenceChange = (section: string, field: string, value: any) => {
    setEventPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const addGuest = () => {
    setRsvpData(prev => ({
      ...prev,
      additionalGuests: [...prev.additionalGuests, { name: '', relationship: '', age: '' }]
    }));
  };

  const removeGuest = (index: number) => {
    setRsvpData(prev => ({
      ...prev,
      additionalGuests: prev.additionalGuests.filter((_, i) => i !== index)
    }));
  };

  const updateGuest = (index: number, field: string, value: string) => {
    setRsvpData(prev => ({
      ...prev,
      additionalGuests: prev.additionalGuests.map((guest, i) => 
        i === index ? { ...guest, [field]: value } : guest
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Submitting RSVP data:', {
        rsvpData,
        notificationSettings,
        eventPreferences
      });

      // In a real app, make API call here
      router.push(`/parent/events/${eventId}?updated=true`);
    } catch (error) {
      console.error('Error updating RSVP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRSVPStatusOptions = () => [
    { value: 'attending', label: 'Yes, I will attend', color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    { value: 'maybe', label: 'Maybe / Tentative', color: 'text-yellow-700', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
    { value: 'not_attending', label: 'No, I cannot attend', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { value: 'tentative', label: 'Waiting for confirmation', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
  ];

  const getNotificationMethodIcon = (method: string) => {
    switch (method) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <Smartphone className="w-4 h-4" />;
      case 'push': return <Bell className="w-4 h-4" />;
      case 'app': return <Laptop className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/parent/events/${eventId}`}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Event RSVP & Preferences</h1>
          <p className="text-gray-600">Manage your attendance and notification preferences</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
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
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="xl:col-span-3">
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'rsvp', name: 'RSVP Details', icon: Users },
                  { id: 'notifications', name: 'Notifications', icon: Bell },
                  { id: 'preferences', name: 'Preferences', icon: Settings },
                  { id: 'accessibility', name: 'Accessibility', icon: Shield }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {tab.name}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6 lg:p-8">
              {activeTab === 'rsvp' && (
                <div className="space-y-8">
                  {/* RSVP Status */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getRSVPStatusOptions().map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleRSVPChange('status', option.value)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            rsvpData.status === option.value
                              ? `${option.borderColor} ${option.bgColor} border-2`
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              rsvpData.status === option.value 
                                ? 'bg-current border-current' 
                                : 'border-gray-300'
                            }`}></div>
                            <div>
                              <p className={`font-medium ${
                                rsvpData.status === option.value ? option.color : 'text-gray-900'
                              }`}>
                                {option.label}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {rsvpData.status === 'attending' && (
                    <>
                      {/* Attendee Details */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendee Details</h3>
                        <div className="space-y-6">
                          {/* Number of Attendees */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Total Number of Attendees
                            </label>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() => handleRSVPChange('attendeeCount', Math.max(1, rsvpData.attendeeCount - 1))}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 bg-gray-50 rounded-lg font-medium text-gray-900 min-w-[60px] text-center">
                                {rsvpData.attendeeCount}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRSVPChange('attendeeCount', Math.min(10, rsvpData.attendeeCount + 1))}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <span className="text-sm text-gray-600">Maximum 10 attendees</span>
                            </div>
                          </div>

                          {/* Children Attending */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Which of your children will attend?
                            </label>
                            <div className="space-y-2">
                              {['Kwame Mensah', 'Ama Mensah'].map((child) => (
                                <label key={child} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                  <input
                                    type="checkbox"
                                    checked={rsvpData.childrenAttending.includes(child)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        handleRSVPChange('childrenAttending', [...rsvpData.childrenAttending, child]);
                                      } else {
                                        handleRSVPChange('childrenAttending', rsvpData.childrenAttending.filter(c => c !== child));
                                      }
                                    }}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-gray-900">{child}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Additional Guests */}
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Additional Guests
                              </label>
                              <button
                                type="button"
                                onClick={addGuest}
                                className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                                Add Guest
                              </button>
                            </div>
                            
                            {rsvpData.additionalGuests.length === 0 ? (
                              <p className="text-gray-500 text-sm italic">No additional guests added</p>
                            ) : (
                              <div className="space-y-3">
                                {rsvpData.additionalGuests.map((guest, index) => (
                                  <div key={index} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                                      <input
                                        type="text"
                                        placeholder="Guest name"
                                        value={guest.name}
                                        onChange={(e) => updateGuest(index, 'name', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                      <input
                                        type="text"
                                        placeholder="Relationship"
                                        value={guest.relationship}
                                        onChange={(e) => updateGuest(index, 'relationship', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                      <input
                                        type="text"
                                        placeholder="Age (optional)"
                                        value={guest.age}
                                        onChange={(e) => updateGuest(index, 'age', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeGuest(index)}
                                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Special Requirements */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Requirements</h3>
                        <div className="space-y-6">
                          {/* Dietary Restrictions */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Dietary Restrictions or Allergies
                            </label>
                            <textarea
                              value={rsvpData.dietaryRestrictions}
                              onChange={(e) => handleRSVPChange('dietaryRestrictions', e.target.value)}
                              placeholder="Please specify any dietary restrictions, allergies, or special meal requirements..."
                              rows={3}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          {/* Special Requests */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Special Requests or Accommodations
                            </label>
                            <textarea
                              value={rsvpData.specialRequests}
                              onChange={(e) => handleRSVPChange('specialRequests', e.target.value)}
                              placeholder="Any special accommodations, seating preferences, or other requests..."
                              rows={3}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          {/* Additional Options */}
                          <div className="space-y-4">
                            <label className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={rsvpData.volunteerInterest}
                                onChange={(e) => handleRSVPChange('volunteerInterest', e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-gray-900">I'm interested in volunteering to help with this event</span>
                            </label>

                            <label className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={rsvpData.transportNeeds}
                                onChange={(e) => handleRSVPChange('transportNeeds', e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-gray-900">I need transportation assistance or carpool information</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Emergency Contact */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Contact Name
                            </label>
                            <input
                              type="text"
                              value={rsvpData.emergencyContact.name}
                              onChange={(e) => handleNestedChange('emergencyContact', 'name', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={rsvpData.emergencyContact.phone}
                              onChange={(e) => handleNestedChange('emergencyContact', 'phone', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Relationship
                            </label>
                            <select
                              value={rsvpData.emergencyContact.relationship}
                              onChange={(e) => handleNestedChange('emergencyContact', 'relationship', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="Father">Father</option>
                              <option value="Mother">Mother</option>
                              <option value="Guardian">Guardian</option>
                              <option value="Grandparent">Grandparent</option>
                              <option value="Sibling">Sibling</option>
                              <option value="Other">Other Relative</option>
                              <option value="Family Friend">Family Friend</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-8">
                  {/* Event Reminders */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Reminders</h3>
                    <div className="space-y-4">
                      {Object.entries(notificationSettings.eventReminders).map(([key, reminder]) => (
                        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">
                              {key === 'oneWeekBefore' && '1 Week Before Event'}
                              {key === 'threeDaysBefore' && '3 Days Before Event'}
                              {key === 'oneDayBefore' && '1 Day Before Event'}
                              {key === 'twoHoursBefore' && '2 Hours Before Event'}
                              {key === 'customTime' && `${reminder.hours} Hours Before Event`}
                            </div>
                            <div className="text-sm text-gray-600">
                              Notification methods: {reminder.method.join(', ')}
                            </div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange('eventReminders', key, {
                              ...reminder,
                              enabled: !reminder.enabled
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              reminder.enabled ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                reminder.enabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Update Types */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Update Notifications</h3>
                    <div className="space-y-3">
                      {Object.entries(notificationSettings.eventUpdates).map(([key, enabled]) => (
                        <label key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">
                              {key === 'scheduleChanges' && 'Schedule Changes'}
                              {key === 'venueChanges' && 'Venue Changes'}
                              {key === 'weatherAlerts' && 'Weather Alerts'}
                              {key === 'emergencyNotifications' && 'Emergency Notifications'}
                              {key === 'generalAnnouncements' && 'General Announcements'}
                            </div>
                            <div className="text-sm text-gray-600">
                              {key === 'scheduleChanges' && 'Get notified when event timing changes'}
                              {key === 'venueChanges' && 'Get notified when event location changes'}
                              {key === 'weatherAlerts' && 'Weather-related updates and backup plans'}
                              {key === 'emergencyNotifications' && 'Critical safety and emergency information'}
                              {key === 'generalAnnouncements' && 'General event news and updates'}
                            </div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange('eventUpdates', key, !enabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              enabled ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                enabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Communication Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Language
                        </label>
                        <select
                          value={notificationSettings.communicationPreferences.preferredLanguage}
                          onChange={(e) => handleNotificationChange('communicationPreferences', 'preferredLanguage', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="english">English</option>
                          <option value="twi">Twi</option>
                          <option value="ga">Ga</option>
                          <option value="ewe">Ewe</option>
                          <option value="dagbani">Dagbani</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time Zone
                        </label>
                        <select
                          value={notificationSettings.communicationPreferences.timeZone}
                          onChange={(e) => handleNotificationChange('communicationPreferences', 'timeZone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="GMT">GMT (Ghana)</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>
                    </div>

                    {/* Quiet Hours */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Quiet Hours</h4>
                          <p className="text-sm text-gray-600">No notifications during these hours</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('communicationPreferences', 'quietHours', {
                            ...notificationSettings.communicationPreferences.quietHours,
                            enabled: !notificationSettings.communicationPreferences.quietHours.enabled
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notificationSettings.communicationPreferences.quietHours.enabled ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notificationSettings.communicationPreferences.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {notificationSettings.communicationPreferences.quietHours.enabled && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Start Time
                            </label>
                            <input
                              type="time"
                              value={notificationSettings.communicationPreferences.quietHours.startTime}
                              onChange={(e) => handleNotificationChange('communicationPreferences', 'quietHours', {
                                ...notificationSettings.communicationPreferences.quietHours,
                                startTime: e.target.value
                              })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              End Time
                            </label>
                            <input
                              type="time"
                              value={notificationSettings.communicationPreferences.quietHours.endTime}
                              onChange={(e) => handleNotificationChange('communicationPreferences', 'quietHours', {
                                ...notificationSettings.communicationPreferences.quietHours,
                                endTime: e.target.value
                              })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-8">
                  {/* Social Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Social & Communication Preferences</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Allow Event Photos</div>
                          <div className="text-sm text-gray-600">Allow organizers to take and share photos during the event</div>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('socialPreferences', 'allowPhotos', !eventPreferences.socialPreferences.allowPhotos)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            eventPreferences.socialPreferences.allowPhotos ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              eventPreferences.socialPreferences.allowPhotos ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Share Contact with Other Parents</div>
                          <div className="text-sm text-gray-600">Allow other parents to see your contact information</div>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('socialPreferences', 'shareContactWithOtherParents', !eventPreferences.socialPreferences.shareContactWithOtherParents)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            eventPreferences.socialPreferences.shareContactWithOtherParents ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              eventPreferences.socialPreferences.shareContactWithOtherParents ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Join Event Group Chats</div>
                          <div className="text-sm text-gray-600">Participate in WhatsApp or Telegram groups for this event</div>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('socialPreferences', 'joinEventGroupChats', !eventPreferences.socialPreferences.joinEventGroupChats)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            eventPreferences.socialPreferences.joinEventGroupChats ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              eventPreferences.socialPreferences.joinEventGroupChats ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Receive Event Newsletter</div>
                          <div className="text-sm text-gray-600">Get periodic updates and news about school events</div>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('socialPreferences', 'receiveEventNewsletter', !eventPreferences.socialPreferences.receiveEventNewsletter)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            eventPreferences.socialPreferences.receiveEventNewsletter ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              eventPreferences.socialPreferences.receiveEventNewsletter ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    </div>
                  </div>

                  {/* Child-Related Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Child-Related Preferences</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Child Participation Level
                        </label>
                        <select
                          value={eventPreferences.childPreferences.childParticipationLevel}
                          onChange={(e) => handlePreferenceChange('childPreferences', 'childParticipationLevel', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="full">Full participation in all activities</option>
                          <option value="limited">Limited participation (specify restrictions)</option>
                          <option value="observer">Observer only (no active participation)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Supervision Requirements
                        </label>
                        <select
                          value={eventPreferences.childPreferences.childSupervisionNeeds}
                          onChange={(e) => handlePreferenceChange('childPreferences', 'childSupervisionNeeds', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="independent">Child can participate independently</option>
                          <option value="minimal">Minimal supervision required</option>
                          <option value="constant">Constant adult supervision required</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Allergies & Medical Information
                        </label>
                        <textarea
                          value={eventPreferences.childPreferences.childAllergies}
                          onChange={(e) => handlePreferenceChange('childPreferences', 'childAllergies', e.target.value)}
                          placeholder="List any allergies, medical conditions, or important health information..."
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Allow Child Photos</div>
                          <div className="text-sm text-gray-600">Allow photos of your child to be taken and shared</div>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('childPreferences', 'allowChildPhotos', !eventPreferences.childPreferences.allowChildPhotos)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            eventPreferences.childPreferences.allowChildPhotos ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              eventPreferences.childPreferences.allowChildPhotos ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    </div>
                  </div>

                  {/* Logistics Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Logistics & Transportation</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Parking Preference
                        </label>
                        <select
                          value={eventPreferences.logisticsPreferences.parkingPreference}
                          onChange={(e) => handlePreferenceChange('logisticsPreferences', 'parkingPreference', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="closest_available">Closest available parking</option>
                          <option value="accessibility_parking">Accessibility parking needed</option>
                          <option value="no_preference">No parking preference</option>
                          <option value="public_transport">Will use public transportation</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Arrival Time
                          </label>
                          <select
                            value={eventPreferences.logisticsPreferences.arrivalTimePreference}
                            onChange={(e) => handlePreferenceChange('logisticsPreferences', 'arrivalTimePreference', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="early">15-30 minutes early</option>
                            <option value="on_time">Right on time</option>
                            <option value="flexible">Flexible timing</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Departure Preference
                          </label>
                          <select
                            value={eventPreferences.logisticsPreferences.departureTimePreference}
                            onChange={(e) => handlePreferenceChange('logisticsPreferences', 'departureTimePreference', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="event_end">Stay until event ends</option>
                            <option value="early_departure">May need to leave early</option>
                            <option value="flexible">Flexible departure</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={eventPreferences.logisticsPreferences.carpoolInterest}
                            onChange={(e) => handlePreferenceChange('logisticsPreferences', 'carpoolInterest', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-900">Interested in carpooling with other families</span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={eventPreferences.logisticsPreferences.publicTransportInfo}
                            onChange={(e) => handlePreferenceChange('logisticsPreferences', 'publicTransportInfo', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-900">Send me public transportation information</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'accessibility' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Accessibility Requirements</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Wheelchair Access Required</div>
                          <div className="text-sm text-gray-600">Need wheelchair accessible seating and facilities</div>
                        </div>
                        <button
                          onClick={() => handleRSVPChange('preferences', {
                            ...rsvpData.preferences,
                            accessibility: {
                              ...rsvpData.preferences.accessibility,
                              wheelchairAccess: !rsvpData.preferences.accessibility.wheelchairAccess
                            }
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            rsvpData.preferences.accessibility.wheelchairAccess ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              rsvpData.preferences.accessibility.wheelchairAccess ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Hearing Assistance</div>
                          <div className="text-sm text-gray-600">Need sign language interpretation or hearing loop</div>
                        </div>
                        <button
                          onClick={() => handleRSVPChange('preferences', {
                            ...rsvpData.preferences,
                            accessibility: {
                              ...rsvpData.preferences.accessibility,
                              hearingAssistance: !rsvpData.preferences.accessibility.hearingAssistance
                            }
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            rsvpData.preferences.accessibility.hearingAssistance ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              rsvpData.preferences.accessibility.hearingAssistance ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Visual Assistance</div>
                          <div className="text-sm text-gray-600">Need large print materials or audio descriptions</div>
                        </div>
                        <button
                          onClick={() => handleRSVPChange('preferences', {
                            ...rsvpData.preferences,
                            accessibility: {
                              ...rsvpData.preferences.accessibility,
                              visualAssistance: !rsvpData.preferences.accessibility.visualAssistance
                            }
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            rsvpData.preferences.accessibility.visualAssistance ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              rsvpData.preferences.accessibility.visualAssistance ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language Support Needed
                        </label>
                        <select
                          value={rsvpData.preferences.accessibility.languageSupport}
                          onChange={(e) => handleRSVPChange('preferences', {
                            ...rsvpData.preferences,
                            accessibility: {
                              ...rsvpData.preferences.accessibility,
                              languageSupport: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="english">English</option>
                          <option value="twi">Twi Translation</option>
                          <option value="ga">Ga Translation</option>
                          <option value="ewe">Ewe Translation</option>
                          <option value="dagbani">Dagbani Translation</option>
                          <option value="other">Other (specify below)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Other Accessibility Needs
                        </label>
                        <textarea
                          value={rsvpData.preferences.accessibility.otherNeeds}
                          onChange={(e) => handleRSVPChange('preferences', {
                            ...rsvpData.preferences,
                            accessibility: {
                              ...rsvpData.preferences.accessibility,
                              otherNeeds: e.target.value
                            }
                          })}
                          placeholder="Please describe any other accessibility accommodations you need..."
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* RSVP Summary */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">RSVP Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rsvpData.status === 'attending' ? 'bg-green-100 text-green-800' :
                  rsvpData.status === 'maybe' ? 'bg-yellow-100 text-yellow-800' :
                  rsvpData.status === 'not_attending' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {rsvpData.status === 'attending' ? 'Attending' :
                   rsvpData.status === 'maybe' ? 'Maybe' :
                   rsvpData.status === 'not_attending' ? 'Not Attending' :
                   'Tentative'}
                </span>
              </div>
              
              {rsvpData.status === 'attending' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Attendees:</span>
                    <span className="font-medium">{rsvpData.attendeeCount}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Children:</span>
                    <span className="font-medium">{rsvpData.childrenAttending.length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium">{rsvpData.additionalGuests.length}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Need Help?</h3>
            <div className="space-y-3">
              <p className="text-blue-800 text-sm">
                If you have questions about this event or need assistance with your RSVP, please contact the event organizer.
              </p>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Contact Organizer
                </button>
                <button className="w-full px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                  View Event Details
                </button>
              </div>
            </div>
          </div>

          {/* Event Info */}
          <div className="bg-gray-50 rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>November 25, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>8:00 AM - 4:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Main Sports Ground</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>287 attending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
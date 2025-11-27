"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Save,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  DollarSign,
  Bell,
  BellOff,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  Eye,
  EyeOff,
  Settings,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Star,
  Flag,
  MoreVertical,
  Copy,
  ExternalLink,
  Download,
  Upload,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Receipt,
  FileText,
  Archive,
  Send,
  Lock,
  Unlock,
  QrCode,
  Fingerprint,
  Scan
} from "lucide-react";

export default function PaymentEditPage() {
  const params = useParams();
  const router = useRouter();
  const paymentId = params.id as string;
  
  const [activeTab, setActiveTab] = useState<'methods' | 'preferences' | 'notifications' | 'security'>('methods');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Payment methods management state
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'mobile_money',
      provider: 'MTN Mobile Money',
      accountNumber: '+233 24 123 4567',
      accountName: 'John Mensah',
      isDefault: true,
      isActive: true,
      lastUsed: '2025-01-15T14:30:00Z',
      addedDate: '2024-09-01T10:00:00Z'
    },
    {
      id: 2,
      type: 'bank_card',
      provider: 'GCB Bank',
      accountNumber: '**** **** **** 1234',
      accountName: 'John Mensah',
      isDefault: false,
      isActive: true,
      lastUsed: '2024-12-20T16:45:00Z',
      addedDate: '2024-10-15T14:00:00Z',
      expiryDate: '2027-08-31'
    },
    {
      id: 3,
      type: 'bank_transfer',
      provider: 'Absa Bank',
      accountNumber: '1234567890',
      accountName: 'John Mensah',
      isDefault: false,
      isActive: true,
      lastUsed: '2024-11-30T09:15:00Z',
      addedDate: '2024-11-01T11:30:00Z'
    }
  ]);

  // Payment preferences state
  const [preferences, setPreferences] = useState({
    defaultPaymentMethod: 1,
    autoPayment: {
      enabled: false,
      daysBefore: 3,
      methods: [1], // payment method IDs
      maxAmount: 2000.00
    },
    paymentReminders: {
      enabled: true,
      daysBefore: [7, 3, 1],
      methods: ['email', 'sms', 'push']
    },
    receiptPreferences: {
      autoDownload: true,
      emailReceipt: true,
      smsConfirmation: true,
      format: 'pdf' // pdf, email
    },
    budgetLimits: {
      enabled: false,
      monthlyLimit: 5000.00,
      transactionLimit: 2000.00,
      alertThreshold: 80 // percentage
    },
    currency: 'GHS',
    language: 'english'
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    paymentDue: {
      enabled: true,
      methods: ['email', 'sms', 'push'],
      timing: [7, 3, 1] // days before
    },
    paymentSuccess: {
      enabled: true,
      methods: ['email', 'sms'],
      includeReceipt: true
    },
    paymentFailed: {
      enabled: true,
      methods: ['email', 'sms', 'push'],
      immediateAlert: true
    },
    balanceUpdates: {
      enabled: true,
      methods: ['email'],
      frequency: 'weekly' // weekly, monthly, immediately
    },
    promotions: {
      enabled: false,
      methods: ['email'],
      types: ['discounts', 'new_features', 'events']
    },
    security: {
      enabled: true,
      methods: ['email', 'sms'],
      events: ['new_method_added', 'method_removed', 'large_transaction']
    }
  });

  // Security settings state
  const [security, setSecurity] = useState({
    twoFactorAuth: {
      enabled: false,
      method: 'sms', // sms, email, app
      backupCodes: []
    },
    biometric: {
      enabled: false,
      fingerprint: false,
      faceId: false
    },
    transactionPIN: {
      enabled: true,
      lastChanged: '2024-10-15T10:00:00Z'
    },
    sessionTimeout: 30, // minutes
    loginAlerts: true,
    deviceRestriction: false,
    trustedDevices: []
  });

  const [showAddMethodModal, setShowAddMethodModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<any>(null);

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'mobile_money': return <Smartphone className="w-5 h-5" />;
      case 'bank_card': return <CreditCard className="w-5 h-5" />;
      case 'bank_transfer': return <Building className="w-5 h-5" />;
      case 'cash': return <Wallet className="w-5 h-5" />;
      default: return <DollarSign className="w-5 h-5" />;
    }
  };

  const getPaymentMethodColor = (type: string) => {
    switch (type) {
      case 'mobile_money': return 'text-green-600 bg-green-100 border-green-200';
      case 'bank_card': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'bank_transfer': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'cash': return 'text-orange-600 bg-orange-100 border-orange-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const handleMethodToggle = (methodId: number, field: string) => {
    setPaymentMethods(prev => prev.map(method => 
      method.id === methodId 
        ? { ...method, [field]: !method[field as keyof typeof method] }
        : method
    ));
  };

  const handleSetDefault = (methodId: number) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === methodId
    })));
    setPreferences(prev => ({
      ...prev,
      defaultPaymentMethod: methodId
    }));
  };

  const handleDeleteMethod = (methodId: number) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
  };

  const handlePreferenceChange = (section: string, field: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleNotificationChange = (section: string, field: string, value: any) => {
    setNotifications(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSecurityChange = (section: string, field: string, value: any) => {
    setSecurity(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Submitting payment preferences:', {
        paymentMethods,
        preferences,
        notifications,
        security
      });

      // In a real app, make API call here
      router.push(`/parent/payments/${paymentId}?updated=true`);
    } catch (error) {
      console.error('Error updating payment preferences:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/parent/payments/${paymentId}`}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Payment Preferences</h1>
          <p className="text-gray-600">Manage your payment methods and preferences</p>
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
                  { id: 'methods', name: 'Payment Methods', icon: CreditCard },
                  { id: 'preferences', name: 'Preferences', icon: Settings },
                  { id: 'notifications', name: 'Notifications', icon: Bell },
                  { id: 'security', name: 'Security', icon: Shield }
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
              {activeTab === 'methods' && (
                <div className="space-y-6">
                  {/* Add New Method */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                    <button
                      onClick={() => setShowAddMethodModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Method
                    </button>
                  </div>

                  {/* Payment Methods List */}
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg border ${getPaymentMethodColor(method.type)}`}>
                              {getPaymentMethodIcon(method.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-gray-900">{method.provider}</h4>
                                {method.isDefault && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                    Default
                                  </span>
                                )}
                                {!method.isActive && (
                                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                    Inactive
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 mb-1">{method.accountNumber}</p>
                              <p className="text-gray-600 mb-2">{method.accountName}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>Added: {formatDate(method.addedDate)}</span>
                                <span>Last used: {formatDate(method.lastUsed)}</span>
                                {method.expiryDate && (
                                  <span>Expires: {formatDate(method.expiryDate)}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {!method.isDefault && (
                              <button
                                onClick={() => handleSetDefault(method.id)}
                                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                Set Default
                              </button>
                            )}
                            <button
                              onClick={() => setEditingMethod(method)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteMethod(method.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Method Controls */}
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={method.isActive}
                              onChange={() => handleMethodToggle(method.id, 'isActive')}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-gray-900">Active</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-8">
                  {/* Auto Payment Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Auto Payment</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-blue-900">Enable Auto Payment</h4>
                          <p className="text-blue-800 text-sm">Automatically pay school fees before due date</p>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('autoPayment', 'enabled', !preferences.autoPayment.enabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferences.autoPayment.enabled ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.autoPayment.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {preferences.autoPayment.enabled && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-blue-900 mb-2">
                                Days Before Due Date
                              </label>
                              <select
                                value={preferences.autoPayment.daysBefore}
                                onChange={(e) => handlePreferenceChange('autoPayment', 'daysBefore', parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value={1}>1 day before</option>
                                <option value={3}>3 days before</option>
                                <option value={7}>1 week before</option>
                                <option value={14}>2 weeks before</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-blue-900 mb-2">
                                Maximum Amount (GHS)
                              </label>
                              <input
                                type="number"
                                value={preferences.autoPayment.maxAmount}
                                onChange={(e) => handlePreferenceChange('autoPayment', 'maxAmount', parseFloat(e.target.value))}
                                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                min="0"
                                step="0.01"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-blue-900 mb-2">
                              Payment Methods for Auto Payment
                            </label>
                            <div className="space-y-2">
                              {paymentMethods.filter(m => m.isActive).map((method) => (
                                <label key={method.id} className="flex items-center space-x-3">
                                  <input
                                    type="checkbox"
                                    checked={preferences.autoPayment.methods.includes(method.id)}
                                    onChange={(e) => {
                                      const methods = e.target.checked
                                        ? [...preferences.autoPayment.methods, method.id]
                                        : preferences.autoPayment.methods.filter(id => id !== method.id);
                                      handlePreferenceChange('autoPayment', 'methods', methods);
                                    }}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-blue-900">{method.provider} - {method.accountNumber}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Receipt Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Receipt Preferences</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Auto Download Receipts</div>
                          <div className="text-sm text-gray-600">Automatically download receipts after payment</div>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('receiptPreferences', 'autoDownload', !preferences.receiptPreferences.autoDownload)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferences.receiptPreferences.autoDownload ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.receiptPreferences.autoDownload ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Email Receipt</div>
                          <div className="text-sm text-gray-600">Send receipt to your email address</div>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('receiptPreferences', 'emailReceipt', !preferences.receiptPreferences.emailReceipt)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferences.receiptPreferences.emailReceipt ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.receiptPreferences.emailReceipt ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">SMS Confirmation</div>
                          <div className="text-sm text-gray-600">Receive SMS confirmation after payment</div>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('receiptPreferences', 'smsConfirmation', !preferences.receiptPreferences.smsConfirmation)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferences.receiptPreferences.smsConfirmation ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.receiptPreferences.smsConfirmation ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    </div>
                  </div>

                  {/* Budget Limits */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Limits</h3>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-orange-900">Enable Budget Limits</h4>
                          <p className="text-orange-800 text-sm">Set spending limits and alerts</p>
                        </div>
                        <button
                          onClick={() => handlePreferenceChange('budgetLimits', 'enabled', !preferences.budgetLimits.enabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferences.budgetLimits.enabled ? 'bg-orange-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.budgetLimits.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {preferences.budgetLimits.enabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-orange-900 mb-2">
                              Monthly Limit (GHS)
                            </label>
                            <input
                              type="number"
                              value={preferences.budgetLimits.monthlyLimit}
                              onChange={(e) => handlePreferenceChange('budgetLimits', 'monthlyLimit', parseFloat(e.target.value))}
                              className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              min="0"
                              step="0.01"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-orange-900 mb-2">
                              Transaction Limit (GHS)
                            </label>
                            <input
                              type="number"
                              value={preferences.budgetLimits.transactionLimit}
                              onChange={(e) => handlePreferenceChange('budgetLimits', 'transactionLimit', parseFloat(e.target.value))}
                              className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              min="0"
                              step="0.01"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-orange-900 mb-2">
                              Alert Threshold ({preferences.budgetLimits.alertThreshold}%)
                            </label>
                            <input
                              type="range"
                              min="50"
                              max="95"
                              step="5"
                              value={preferences.budgetLimits.alertThreshold}
                              onChange={(e) => handlePreferenceChange('budgetLimits', 'alertThreshold', parseInt(e.target.value))}
                              className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-orange-700 mt-1">
                              <span>50%</span>
                              <span>95%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* General Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">General Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <select
                          value={preferences.currency}
                          onChange={(e) => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="GHS">Ghana Cedis (GHS)</option>
                          <option value="USD">US Dollars (USD)</option>
                          <option value="EUR">Euros (EUR)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={preferences.language}
                          onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="english">English</option>
                          <option value="twi">Twi</option>
                          <option value="ga">Ga</option>
                          <option value="ewe">Ewe</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-8">
                  {/* Payment Due Notifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Due Notifications</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-yellow-900">Payment Reminders</h4>
                          <p className="text-yellow-800 text-sm">Receive reminders before payment due dates</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('paymentDue', 'enabled', !notifications.paymentDue.enabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.paymentDue.enabled ? 'bg-yellow-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.paymentDue.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {notifications.paymentDue.enabled && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-yellow-900 mb-2">
                              Notification Methods
                            </label>
                            <div className="space-y-2">
                              {['email', 'sms', 'push'].map((method) => (
                                <label key={method} className="flex items-center space-x-3">
                                  <input
                                    type="checkbox"
                                    checked={notifications.paymentDue.methods.includes(method)}
                                    onChange={(e) => {
                                      const methods = e.target.checked
                                        ? [...notifications.paymentDue.methods, method]
                                        : notifications.paymentDue.methods.filter(m => m !== method);
                                      handleNotificationChange('paymentDue', 'methods', methods);
                                    }}
                                    className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                                  />
                                  <span className="text-yellow-900 capitalize">{method}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-yellow-900 mb-2">
                              Reminder Schedule
                            </label>
                            <div className="space-y-2">
                              {[1, 3, 7, 14].map((days) => (
                                <label key={days} className="flex items-center space-x-3">
                                  <input
                                    type="checkbox"
                                    checked={notifications.paymentDue.timing.includes(days)}
                                    onChange={(e) => {
                                      const timing = e.target.checked
                                        ? [...notifications.paymentDue.timing, days]
                                        : notifications.paymentDue.timing.filter(d => d !== days);
                                      handleNotificationChange('paymentDue', 'timing', timing);
                                    }}
                                    className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                                  />
                                  <span className="text-yellow-900">
                                    {days === 1 ? '1 day before' : `${days} days before`}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Success Notifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Success Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Payment Success Alerts</div>
                          <div className="text-sm text-gray-600">Get notified when payments are successful</div>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('paymentSuccess', 'enabled', !notifications.paymentSuccess.enabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.paymentSuccess.enabled ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.paymentSuccess.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Include Receipt in Notification</div>
                          <div className="text-sm text-gray-600">Attach receipt to success notifications</div>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('paymentSuccess', 'includeReceipt', !notifications.paymentSuccess.includeReceipt)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.paymentSuccess.includeReceipt ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.paymentSuccess.includeReceipt ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    </div>
                  </div>

                  {/* Failed Payment Notifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Failed Payment Notifications</h3>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-red-900">Payment Failure Alerts</h4>
                          <p className="text-red-800 text-sm">Get notified immediately when payments fail</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('paymentFailed', 'enabled', !notifications.paymentFailed.enabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.paymentFailed.enabled ? 'bg-red-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.paymentFailed.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {notifications.paymentFailed.enabled && (
                        <div>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={notifications.paymentFailed.immediateAlert}
                              onChange={(e) => handleNotificationChange('paymentFailed', 'immediateAlert', e.target.checked)}
                              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            <span className="text-red-900">Send immediate alert</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Balance Updates */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Balance Updates</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Balance Update Notifications</div>
                          <div className="text-sm text-gray-600">Receive updates about your account balance</div>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('balanceUpdates', 'enabled', !notifications.balanceUpdates.enabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.balanceUpdates.enabled ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.balanceUpdates.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      {notifications.balanceUpdates.enabled && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Update Frequency
                          </label>
                          <select
                            value={notifications.balanceUpdates.frequency}
                            onChange={(e) => handleNotificationChange('balanceUpdates', 'frequency', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="immediately">Immediately after each transaction</option>
                            <option value="weekly">Weekly summary</option>
                            <option value="monthly">Monthly summary</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-8">
                  {/* Two-Factor Authentication */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-blue-900">Enable 2FA</h4>
                          <p className="text-blue-800 text-sm">Add an extra layer of security to your payments</p>
                        </div>
                        <button
                          onClick={() => handleSecurityChange('twoFactorAuth', 'enabled', !security.twoFactorAuth.enabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            security.twoFactorAuth.enabled ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              security.twoFactorAuth.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {security.twoFactorAuth.enabled && (
                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-2">
                            2FA Method
                          </label>
                          <select
                            value={security.twoFactorAuth.method}
                            onChange={(e) => handleSecurityChange('twoFactorAuth', 'method', e.target.value)}
                            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="sms">SMS Code</option>
                            <option value="email">Email Code</option>
                            <option value="app">Authenticator App</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Biometric Authentication */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Biometric Authentication</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Enable Biometric Authentication</div>
                          <div className="text-sm text-gray-600">Use fingerprint or face recognition for payments</div>
                        </div>
                        <button
                          onClick={() => handleSecurityChange('biometric', 'enabled', !security.biometric.enabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            security.biometric.enabled ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              security.biometric.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      {security.biometric.enabled && (
                        <div className="ml-4 space-y-3">
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={security.biometric.fingerprint}
                              onChange={(e) => handleSecurityChange('biometric', 'fingerprint', e.target.checked)}
                              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-gray-900">Fingerprint</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={security.biometric.faceId}
                              onChange={(e) => handleSecurityChange('biometric', 'faceId', e.target.checked)}
                              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-gray-900">Face ID</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transaction PIN */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction PIN</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-green-900">Transaction PIN</h4>
                          <p className="text-green-800 text-sm">
                            Require PIN for all transactions • Last changed: {formatDate(security.transactionPIN.lastChanged)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSecurityChange('transactionPIN', 'enabled', !security.transactionPIN.enabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            security.transactionPIN.enabled ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              security.transactionPIN.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {security.transactionPIN.enabled && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Change PIN
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Session Security */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Security</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <select
                          value={security.sessionTimeout}
                          onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                          <option value={60}>1 hour</option>
                          <option value={120}>2 hours</option>
                        </select>
                      </div>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Login Alerts</div>
                          <div className="text-sm text-gray-600">Get notified when someone logs into your account</div>
                        </div>
                        <button
                          onClick={() => setSecurity(prev => ({ ...prev, loginAlerts: !prev.loginAlerts }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            security.loginAlerts ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Device Restriction</div>
                          <div className="text-sm text-gray-600">Only allow payments from trusted devices</div>
                        </div>
                        <button
                          onClick={() => setSecurity(prev => ({ ...prev, deviceRestriction: !prev.deviceRestriction }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            security.deviceRestriction ? 'bg-orange-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              security.deviceRestriction ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Settings Summary */}
          <div className="bg-white rounded-lg lg:rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Settings</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Default Method:</span>
                <span className="font-medium text-sm">
                  {paymentMethods.find(m => m.isDefault)?.provider || 'None'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Auto Payment:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  preferences.autoPayment.enabled 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {preferences.autoPayment.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">2FA:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  security.twoFactorAuth.enabled 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {security.twoFactorAuth.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Budget Limits:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  preferences.budgetLimits.enabled 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {preferences.budgetLimits.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* Help & Tips */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Security Tips</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">Enable 2FA for enhanced security</span>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">Use strong transaction PINs</span>
              </div>
              <div className="flex items-start gap-2">
                <Eye className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">Regularly review your payment methods</span>
              </div>
              <div className="flex items-start gap-2">
                <Bell className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">Enable payment notifications</span>
              </div>
            </div>
          </div>

          {/* Payment Methods Summary */}
          <div className="bg-gray-50 rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Methods:</span>
                <span className="font-medium">{paymentMethods.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Methods:</span>
                <span className="font-medium">{paymentMethods.filter(m => m.isActive).length}</span>
              </div>
              <div className="space-y-2">
                {paymentMethods.filter(m => m.isActive).map((method) => (
                  <div key={method.id} className="flex items-center gap-2 text-sm">
                    {getPaymentMethodIcon(method.type)}
                    <span className="text-gray-700">{method.provider}</span>
                    {method.isDefault && (
                      <span className="px-1 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                        Default
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
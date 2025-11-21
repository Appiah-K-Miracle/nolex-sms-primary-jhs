"use client";

import Link from "next/link";
import SummaryCards from "../../../components/teacher/summary-cards";

export default function SettingsLanding(){
  const cards = [
    { title: 'Profile Completion', value: '85%' },
    { title: 'Last Updated', value: '2025-11-10' },
    { title: 'Email Verified', value: 'Yes' },
    { title: 'Contact Sync', value: 'Off' }
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Link href="/teacher/settings/profile" className="p-4 bg-white rounded shadow hover:shadow-md">Profile</Link>
        <Link href="/teacher/settings/account" className="p-4 bg-white rounded shadow hover:shadow-md">Account</Link>
      </div>
    </div>
  );
}

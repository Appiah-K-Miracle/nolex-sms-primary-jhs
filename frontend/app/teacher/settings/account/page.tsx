"use client";

import React, { useState } from "react";
import SummaryCards from "../../../../components/teacher/summary-cards";

export default function AccountSettings(){
  const [passwords, setPasswords] = useState({ current: '', newp: '', confirm: '' });
  const [msg, setMsg] = useState<string | null>(null);
  const [toggles, setToggles] = useState({ messages: true, parentReplies: true, announcements: true, reminders: true, system: true, behavior: false });

  const cards = [
    { title: 'Password Last Updated', value: '2025-09-01' },
    { title: 'Two-Factor Authentication', value: 'Off' },
    { title: 'Notifications', value: 'Enabled' },
    { title: 'Last Login', value: '2025-11-19' }
  ];

  function onPassChange(e: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = e.target;
    setPasswords(p => ({ ...p, [name]: value }));
  }

  function changePassword(){
    if(!passwords.current || !passwords.newp) { setMsg('Please fill fields'); return; }
    if(passwords.newp !== passwords.confirm){ setMsg('New password and confirmation do not match'); return; }
    setMsg('Password changed successfully');
    setPasswords({ current: '', newp: '', confirm: '' });
    setTimeout(()=>setMsg(null),3000);
  }

  function toggleKey(k: keyof typeof toggles){
    setToggles(t => ({ ...t, [k]: !t[k] }));
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Account</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-3">Change Password</h3>
          <input name="current" type="password" value={passwords.current} onChange={onPassChange} placeholder="Current Password" className="w-full border rounded px-3 py-2 mb-2" />
          <input name="newp" type="password" value={passwords.newp} onChange={onPassChange} placeholder="New Password" className="w-full border rounded px-3 py-2 mb-2" />
          <input name="confirm" type="password" value={passwords.confirm} onChange={onPassChange} placeholder="Confirm Password" className="w-full border rounded px-3 py-2 mb-2" />
          <div className="flex gap-2"><button onClick={changePassword} className="px-3 py-2 bg-blue-600 text-white rounded">Change Password</button></div>
          {msg && <div className="mt-3 text-sm text-green-700">{msg}</div>}
        </div>

        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-3">Notification Preferences</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center justify-between"><span>New Messages</span><input type="checkbox" checked={toggles.messages} onChange={()=>toggleKey('messages')} /></label>
            <label className="flex items-center justify-between"><span>Parent Replies</span><input type="checkbox" checked={toggles.parentReplies} onChange={()=>toggleKey('parentReplies')} /></label>
            <label className="flex items-center justify-between"><span>Announcements</span><input type="checkbox" checked={toggles.announcements} onChange={()=>toggleKey('announcements')} /></label>
            <label className="flex items-center justify-between"><span>Homework/Assessment Reminders</span><input type="checkbox" checked={toggles.reminders} onChange={()=>toggleKey('reminders')} /></label>
            <label className="flex items-center justify-between"><span>System Alerts</span><input type="checkbox" checked={toggles.system} onChange={()=>toggleKey('system')} /></label>
            <label className="flex items-center justify-between"><span>Behavior Reports Alerts</span><input type="checkbox" checked={toggles.behavior} onChange={()=>toggleKey('behavior')} /></label>
          </div>
          <div className="mt-4 text-sm text-gray-500">Notification types: Email, In-dashboard (SMS optional)</div>
        </div>
      </div>
    </div>
  );
}

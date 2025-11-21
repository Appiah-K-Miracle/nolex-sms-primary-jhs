"use client";

import React, { useState } from "react";
import SummaryCards from "../../../../components/teacher/summary-cards";

export default function ProfileSettings(){
  const [form, setForm] = useState({ firstName: 'Grace', lastName: 'Teacher', phone: '', email: 'grace@example.com', address: '', emergency: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const cards = [
    { title: 'Profile Completion (%)', value: '85%' },
    { title: 'Last Updated', value: '2025-11-10' },
    { title: 'Email Verified', value: 'Yes' },
    { title: 'Contact Sync Status', value: 'Off' }
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    if(file){
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }

  async function save(){
    setSaving(true);
    // Mock save delay
    await new Promise(r => setTimeout(r, 700));
    setSaving(false);
    setSaved(true);
    setTimeout(()=>setSaved(false),3000);
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-3">Update Contact Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" className="border rounded px-3 py-2" />
            <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" className="border rounded px-3 py-2" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border rounded px-3 py-2" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded px-3 py-2" />
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border rounded px-3 py-2 md:col-span-2" />
            <input name="emergency" value={form.emergency} onChange={handleChange} placeholder="Emergency contact" className="border rounded px-3 py-2 md:col-span-2" />
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={save} className="px-3 py-2 bg-blue-600 text-white rounded">{saving ? 'Saving...' : 'Save Changes'}</button>
            <button onClick={()=>{ setForm({ firstName:'Grace', lastName:'Teacher', phone:'', email:'grace@example.com', address:'', emergency:'' }); setPreview(null); setImage(null); }} className="px-3 py-2 bg-gray-100 rounded">Reset</button>
          </div>

          {saved && <div className="mt-3 text-sm text-green-700">Profile updated successfully.</div>}
        </div>

        <aside className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-3">Profile Picture</h3>
          <div className="mb-3">
            {preview ? <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded"/> : <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">No photo</div>}
          </div>
          <input type="file" accept="image/*" onChange={handleImage} />
          <div className="mt-3 flex gap-2">
            <button onClick={()=>{ setPreview(null); setImage(null); }} className="px-3 py-2 bg-gray-100 rounded">Remove photo</button>
            <button className="px-3 py-2 bg-gray-100 rounded">Crop (placeholder)</button>
          </div>
        </aside>
      </div>

      <div className="mt-6 bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-3">Personal Details</h3>
        <div className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>Staff ID: <strong>#T-00123</strong></div>
          <div>Assigned classes: <strong>3A</strong></div>
          <div>Subjects taught: <strong>Math, Science</strong></div>
          <div>Date joined: <strong>2022-01-15</strong></div>
          <div>Role: <strong>Teacher</strong></div>
        </div>
      </div>
    </div>
  );
}

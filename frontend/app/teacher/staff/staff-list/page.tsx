"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SummaryCards from "../../../../components/teacher/summary-cards";

type Staff = { id: string; name: string; staffId: string; role: string; department: string; contact: string; status: 'Active' | 'On-Leave' };

const staffSeed: Staff[] = [
  { id: 'st1', name: 'Mrs. Akua Owusu', staffId: 'T-001', role: 'Teacher', department: 'Mathematics', contact: '024xxxxxxx', status: 'Active' },
  { id: 'st2', name: 'Mr. K. Boateng', staffId: 'NT-010', role: 'Bursar', department: 'Finance', contact: '020xxxxxxx', status: 'On-Leave' }
];

export default function StaffListPage() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const staff = useMemo(() => staffSeed, []);

  const filtered = useMemo(() => staff.filter(s => {
    if (roleFilter !== 'All' && s.role !== roleFilter) return false;
    if (deptFilter !== 'All' && s.department !== deptFilter) return false;
    if (statusFilter !== 'All' && s.status !== statusFilter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.staffId.toLowerCase().includes(q);
  }), [staff, query, roleFilter, deptFilter, statusFilter]);

  const total = staff.length;
  const teaching = staff.filter(s => s.role === 'Teacher').length;
  const nonTeaching = total - teaching;
  const onLeave = staff.filter(s => s.status === 'On-Leave').length;

  const cards = [
    { title: 'Total Staff', value: total },
    { title: 'Teaching Staff', value: `${teaching} Teachers` },
    { title: 'Non-Teaching Staff', value: `${nonTeaching} Staff Members` },
    { title: 'Staff on Leave Today', value: onLeave }
  ];

  const departments = Array.from(new Set(staff.map(s => s.department)));

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Staff List</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4 gap-3">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name or staff ID" className="border rounded px-3 py-2 w-full md:w-1/3" />
        <select value={roleFilter} onChange={e=>setRoleFilter(e.target.value)} className="border rounded px-3 py-2">
          <option>All</option>
          <option>Teacher</option>
          <option>Non-teaching</option>
        </select>
        <select value={deptFilter} onChange={e=>setDeptFilter(e.target.value)} className="border rounded px-3 py-2">
          <option>All</option>
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="border rounded px-3 py-2">
          <option>All</option>
          <option>Active</option>
          <option>On-Leave</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3">Staff ID</th>
              <th className="p-3">Role</th>
              <th className="p-3">Department</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-3"><div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm">{s.name.split(' ').map(p=>p[0]).join('')}</div></td>
                <td className="p-3">{s.name}</td>
                <td className="p-3 text-center">{s.staffId}</td>
                <td className="p-3 text-center">{s.role}</td>
                <td className="p-3 text-center">{s.department}</td>
                <td className="p-3 text-sm">{s.contact}</td>
                <td className="p-3 text-center">{s.status}</td>
                <td className="p-3 text-center"><Link href={`/teacher/staff/${s.id}`} className="text-blue-600">View Profile</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

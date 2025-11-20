"use client";

import { useState } from "react";
import SummaryCards from "../../../../components/teacher/summary-cards";

type LeaveRequest = { id: string; name: string; type: string; from: string; to: string; status: 'Pending'|'Approved'|'Rejected' };

const seed: LeaveRequest[] = [
  { id: 'l1', name: 'Mrs. Akua Owusu', type: 'Sick', from: '2025-10-05', to: '2025-10-10', status: 'Approved' },
  { id: 'l2', name: 'Mr. K. Boateng', type: 'Casual', from: '2025-11-15', to: '2025-11-17', status: 'Pending' }
];

export default function LeavePage() {
  const [requests, setRequests] = useState<LeaveRequest[]>(seed);

  const total = requests.length;
  const pending = requests.filter(r => r.status === 'Pending').length;
  const approved = requests.filter(r => r.status === 'Approved').length;
  const rejected = requests.filter(r => r.status === 'Rejected').length;

  const cards = [
    { title: 'Total Leave Requests (This Term)', value: total },
    { title: 'Pending Approval', value: pending },
    { title: 'Approved Leaves', value: approved },
    { title: 'Rejected / Cancelled', value: rejected }
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Leave Management</h1>
      </div>

      <SummaryCards cards={cards} />

      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3 text-left">Staff</th>
              <th className="p-3">Type</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{r.name}</td>
                <td className="p-3 text-center">{r.type}</td>
                <td className="p-3 text-center">{r.from}</td>
                <td className="p-3 text-center">{r.to}</td>
                <td className="p-3 text-center">{r.status}</td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {r.status === 'Pending' && (
                      <>
                        <button className="px-2 py-1 bg-green-600 text-white rounded text-xs">Approve</button>
                        <button className="px-2 py-1 bg-red-600 text-white rounded text-xs">Reject</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

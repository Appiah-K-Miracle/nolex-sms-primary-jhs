"use client";

import React from "react";
import Link from "next/link";
import LineChart from "../../../../../components/charts/line-chart";

type Incident = { id:number; student:string; type:string; date:string; severity:string; action:string };

const incidents: Incident[] = [
  { id:1, student:'John Doe', type:'Disruption', date: new Date().toISOString(), severity:'Low', action:'Warning' },
  { id:2, student:'Ali Khan', type:'Fight', date: new Date(Date.now()-1000*60*60*24*5).toISOString(), severity:'High', action:'Suspension' },
  { id:3, student:'Mary Adu', type:'Late', date: new Date(Date.now()-1000*60*60*24*10).toISOString(), severity:'Low', action:'Note' },
];

export default function BehaviorReport(){
  const monthly = [2,1,3,0,4,2];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Behavior Report</h1>
        <Link href="/teacher/reports/class" className="px-3 py-2 bg-gray-100 rounded">Back to Class</Link>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-3">Incidents Log</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500"><th>Student</th><th>Type</th><th>Date</th><th>Severity</th><th>Action</th></tr>
          </thead>
          <tbody>
            {incidents.map(i=> (
              <tr key={i.id} className="border-t"><td className="py-2">{i.student}</td><td>{i.type}</td><td>{new Date(i.date).toLocaleDateString()}</td><td>{i.severity}</td><td>{i.action}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h4 className="font-semibold mb-2">Monthly Incident Frequency</h4>
          <div className="h-40"><LineChart data={monthly} /></div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h4 className="font-semibold mb-2">Export</h4>
          <div className="flex gap-2"><button className="px-3 py-2 bg-gray-100 rounded">Export PDF</button></div>
        </div>
      </div>
    </div>
  );
}

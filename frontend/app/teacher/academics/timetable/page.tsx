"use client";

import React from 'react';
import SummaryCards from "../../../../components/teacher/summary-cards";

const daily = [
  { day: 'Monday', periods: [{ time: '08:00', subject: 'Math', class: 'JHS 2', room: 'Rm 12' }] },
  { day: 'Tuesday', periods: [{ time: '09:00', subject: 'Science', class: 'JHS 2', room: 'Lab' }] }
];

export default function TimetablePage() {
  const totalWeeklyPeriods = daily.reduce((s, d) => s + (d.periods?.length ?? 0), 0);
  const today = daily[0];
  const classesToday = today?.periods?.length ?? 0;
  const freePeriodsToday = Math.max(0, 6 - classesToday); // assume 6 periods per day
  const nextClass = today?.periods?.[0];

  const cards = [
    { title: 'Total Weekly Periods', value: totalWeeklyPeriods },
    { title: 'Classes Taught Today', value: classesToday },
    { title: 'Free Periods (Today)', value: freePeriodsToday },
    { title: 'Next Upcoming Class', value: nextClass ? `${nextClass.subject} • ${nextClass.time}` : '—' }
  ];

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold mb-4">Time-Table</h1>

      <SummaryCards cards={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <h2 className="font-semibold mb-3">Daily Timetable</h2>
          <div className="space-y-3">
            {daily.map(d => (
              <div key={d.day}>
                <h4 className="font-medium">{d.day}</h4>
                {d.periods.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border rounded mt-2">
                    <div>
                      <p className="font-medium">{p.subject}</p>
                      <p className="text-xs text-gray-500">{p.time} • {p.class} • {p.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <h3 className="font-semibold mt-6 mb-2">Weekly Timetable (Grid)</h3>
          <div className="w-full h-56 bg-gray-50 rounded flex items-center justify-center text-gray-400">Grid placeholder</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Export</h3>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded mb-2">Download PDF</button>
          <button className="w-full px-4 py-2 border rounded">Print</button>
        </div>
      </div>
    </div>
  );
}

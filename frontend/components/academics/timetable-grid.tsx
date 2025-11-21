"use client";

import React from "react";

type Entry = {
  day: string;
  time: string;
  subject?: string;
  className?: string;
  room?: string;
};

export default function TimetableGrid({
  days,
  times,
  entries,
}: {
  days: string[];
  times: string[];
  entries: Entry[];
}) {
  const map = new Map<string, Entry>();
  entries.forEach((e) => map.set(`${e.day}__${e.time}`, e));

  return (
    <div className="overflow-auto rounded">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-white border p-2 text-sm">Time</th>
            {days.map((d) => (
              <th key={d} className="border p-2 text-left text-sm">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="border p-2 bg-gray-50 text-sm font-medium sticky left-0">
                {time}
              </td>
              {days.map((day) => {
                const e = map.get(`${day}__${time}`);
                return (
                  <td key={day + time} className="border p-2 align-top w-40">
                    {e ? (
                      <div className="p-2 bg-blue-50 rounded">
                        <div className="font-semibold text-sm">{e.subject}</div>
                        <div className="text-xs text-gray-600">{e.className} • {e.room}</div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400">—</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

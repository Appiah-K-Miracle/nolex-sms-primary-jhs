"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import SummaryCards from "../../../../components/teacher/summary-cards";
import LineChart from "../../../../components/charts/line-chart";

type Notice = {
	id: number;
	title: string;
	body?: string;
	category: "staff" | "school" | "policy" | "reminder" | "exam" | "assignment" | "meeting" | "other";
	date: string; // ISO
	isRead?: boolean;
	level?: "info" | "warning" | "critical";
	link?: string;
};

const initialNotices: Notice[] = [
	{
		id: 1,
		title: "Staff meeting: Curriculum review",
		body: "All staff meeting in the library at 3:00 PM. Attendance required.",
		category: "staff",
		date: new Date().toISOString(),
		isRead: false,
		level: "info",
		link: "/teacher/staff"
	},
	{
		id: 2,
		title: "Exam reminder: Term 1 Maths",
		body: "Exam on Friday in period 2. Bring calculators.",
		category: "exam",
		date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
		isRead: false,
		level: "warning",
		link: "/teacher/assessment/exams"
	},
	{
		id: 3,
		title: "Assignment deadline: Science Project",
		body: "Deadline in 3 days. Submit via the portal.",
		category: "assignment",
		date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
		isRead: true,
		level: "info",
	},
	{
		id: 4,
		title: "Urgent: Network outage affecting submissions",
		body: "Critical outage expected to last 2 hours — plan accordingly.",
		category: "school",
		date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
		isRead: false,
		level: "critical",
	},
	{
		id: 5,
		title: "Parent-teacher meeting: Class 3A",
		body: "Meetings scheduled next week. See schedule.",
		category: "meeting",
		date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
		isRead: true,
		level: "info",
	}
];

function isSameDay(aIso: string, b: Date) {
	const a = new Date(aIso);
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function inLastDays(aIso: string, days: number) {
	const a = new Date(aIso).getTime();
	return Date.now() - a <= days * 24 * 60 * 60 * 1000;
}

export default function NoticesPage() {
	const [notices, setNotices] = useState<Notice[]>(initialNotices);

	const now = new Date();
	const unread = useMemo(() => notices.filter(n => !n.isRead).length, [notices]);
	const upcoming = useMemo(() => notices.filter(n => n.category === 'reminder' && isSameDay(n.date, now)).length, [notices]);
	const recent = useMemo(() => notices.filter(n => inLastDays(n.date, 7)).length, [notices]);
	const critical = useMemo(() => notices.filter(n => n.level === 'critical').length, [notices]);

	const cards = [
		{ title: 'Unread Alerts', value: unread },
		{ title: 'Upcoming Class Reminders', value: upcoming },
		{ title: 'Recent Alerts (7d)', value: recent },
		{ title: 'Critical Alerts', value: critical }
	];

	function markRead(id: number) {
		setNotices(n => n.map(x => x.id === id ? { ...x, isRead: true } : x));
	}

	function toggleRead(id: number) {
		setNotices(n => n.map(x => x.id === id ? { ...x, isRead: !x.isRead } : x));
	}

	function dismiss(id: number) {
		setNotices(n => n.filter(x => x.id !== id));
	}

	function markAllRead() {
		setNotices(n => n.map(x => ({ ...x, isRead: true })));
	}

	return (
		<div className="p-4 lg:p-6">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Notices & Alerts</h1>
				<div className="flex items-center gap-2">
					<button onClick={markAllRead} className="px-3 py-2 bg-gray-100 rounded">Mark all read</button>
					<button onClick={() => setNotices(initialNotices)} className="px-3 py-2 bg-gray-100 rounded">Reset</button>
				</div>
			</div>

			<SummaryCards cards={cards} />

			<div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
					<h3 className="font-semibold mb-3">Teacher Alerts</h3>

					{notices.length === 0 ? (
						<div className="text-gray-500">No notices</div>
					) : (
						<ul className="space-y-3">
							{notices.slice().sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime()).map(n => (
								<li key={n.id} className={`p-3 border rounded ${n.isRead ? 'bg-white' : 'bg-gray-50'}`}>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<div className="text-sm font-medium">
													{n.link ? (
														<Link href={n.link} onClick={() => markRead(n.id)} className="hover:underline">{n.title}</Link>
													) : (
														<span>{n.title}</span>
													)}
												</div>
												<div className="text-xs text-gray-400">• {new Date(n.date).toLocaleString()}</div>
												{n.level === 'critical' && <div className="ml-2 text-xs text-red-600 font-semibold">URGENT</div>}
											</div>
											{n.body && <div className="text-sm text-gray-600 mt-1">{n.body}</div>}
										</div>

										<div className="ml-4 flex-shrink-0 flex flex-col items-end gap-2">
											<button onClick={() => toggleRead(n.id)} className="text-xs px-2 py-1 rounded border">{n.isRead ? 'Mark Unread' : 'Mark Read'}</button>
											<button onClick={() => dismiss(n.id)} className="text-xs px-2 py-1 rounded border text-red-600">Dismiss</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>

				<aside className="bg-white rounded-lg shadow-sm p-4">
					<h3 className="font-semibold mb-3">Overview</h3>
					<div className="text-sm text-gray-600 mb-3">Quick activity over the last days</div>
					<div className="h-40 mb-3"><LineChart data={[notices.filter(n=>inLastDays(n.date,7)).length, notices.filter(n=>inLastDays(n.date,14)).length, notices.length]} /></div>

					<div className="mt-2">
						<div className="text-xs text-gray-500 mb-2">Integrations</div>
						<div className="flex flex-col gap-2">
							<button className="px-3 py-2 bg-gray-100 rounded text-sm">Enable push notifications (placeholder)</button>
							<button className="px-3 py-2 bg-gray-100 rounded text-sm">Enable email alerts (placeholder)</button>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}

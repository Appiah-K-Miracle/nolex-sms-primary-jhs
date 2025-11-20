"use client";

import SummaryCards from "../../../../components/teacher/summary-cards";
import Link from "next/link";
import { useState } from "react";
import BarChart from "../../../../components/charts/bar-chart";

export default function MessagesPage(){
	const unread = 3; const sentToday = 5; const totalConvos = 12; const pending = 2;
	const cards = [
		{ title: 'Unread Messages', value: unread },
		{ title: 'Messages Sent Today', value: sentToday },
		{ title: 'Total Conversations', value: totalConvos },
		{ title: 'Pending Replies', value: pending }
	];

	const [query, setQuery] = useState('');

	return (
		<div className="p-4 lg:p-6">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Messages</h1>
				<Link href="/teacher/communication/chat" className="px-3 py-2 bg-blue-600 text-white rounded">Open Chat</Link>
			</div>

			<SummaryCards cards={cards} />

			<div className="mb-4">
				<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search messages" className="w-full md:w-1/3 border rounded px-3 py-2" />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
					<h3 className="font-semibold mb-3">Inbox</h3>
					<div className="w-full h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">Message list / chat preview placeholder</div>
				</div>

				<aside className="bg-white rounded-lg shadow-sm p-4">
					<h3 className="font-semibold mb-3">Activity</h3>
					<div className="text-xs text-gray-500 mb-2">Messages per day</div>
					<div className="h-32"><BarChart data={[{label:'Mon',value:4},{label:'Tue',value:6},{label:'Wed',value:5},{label:'Thu',value:7},{label:'Fri',value:3}]} /></div>
				</aside>
			</div>
		</div>
	);
}

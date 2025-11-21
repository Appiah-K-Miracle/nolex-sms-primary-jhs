"use client";

import SummaryCards from "../../../../components/teacher/summary-cards";
import Link from "next/link";
import { useMemo, useState } from "react";
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

	const [conversations, setConversations] = useState(() => ([
		{ id: 'c1', name: 'Parent - Mr. Osei', last: 'Thanks, I will attend the meeting.', time: '10:12', unread: 2, avatar: '' },
		{ id: 'c2', name: 'Principal', last: 'Reminder: staff meeting tomorrow.', time: '09:05', unread: 0, avatar: '' },
		{ id: 'c3', name: 'Student - Kofi', last: 'Can I submit my assignment late?', time: 'Yesterday', unread: 1, avatar: '' },
	]));

	const filtered = useMemo(() => conversations.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.last.toLowerCase().includes(query.toLowerCase())), [conversations, query]);

	function openConversation(id:string){
		// navigate to chat page - simple replacement for now
		window.location.href = `/teacher/communication/chat?conv=${id}`;
	}

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
					<div className="divide-y">
						{filtered.length === 0 && (
							<div className="w-full h-40 bg-gray-50 rounded flex items-center justify-center text-gray-400">No messages</div>
						)}
						{filtered.map(c => (
							<div key={c.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer" onClick={()=>openConversation(c.id)}>
								<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">{c.name.split(' ').map(p=>p[0]).slice(0,2).join('')}</div>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<div className="font-medium">{c.name}</div>
										<div className="text-xs text-gray-500">{c.time}</div>
									</div>
									<div className="text-sm text-gray-600 truncate">{c.last}</div>
								</div>
								{c.unread > 0 && <div className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{c.unread}</div>}
							</div>
						))}
					</div>
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

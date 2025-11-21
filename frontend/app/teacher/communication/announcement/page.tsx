"use client";

import SummaryCards from "../../../../components/teacher/summary-cards";
import { useMemo, useState } from "react";
import PieChart from "../../../../components/charts/pie-chart";

export default function AnnouncementPage(){
	const my = 8; const schoolwide = 14; const upcoming = 3; const archived = 21;
	const cards = [
		{ title: 'My Announcements', value: my },
		{ title: 'School-wide', value: schoolwide },
		{ title: 'Upcoming', value: upcoming },
		{ title: 'Archived', value: archived }
	];

	const [filter, setFilter] = useState('all');

	const [announcements, setAnnouncements] = useState(() => ([
		{ id: 'a1', title: 'PTA Meeting', body: 'Parent Teacher Association meeting scheduled for next Friday at 3pm in the assembly hall.', date: '2025-11-25', scope: 'Parents', read: false },
		{ id: 'a2', title: 'Sports Day', body: 'Inter-house sports day will be held on 2025-12-10. All students must be present.', date: '2025-12-10', scope: 'Students', read: true },
		{ id: 'a3', title: 'Staff Training', body: 'A short training session on the new LMS will happen on Monday at 9am.', date: '2025-11-24', scope: 'Staff', read: false },
	]));

	const filtered = useMemo(() => announcements.filter(a => filter === 'all' || a.scope.toLowerCase() === filter), [announcements, filter]);

	function markRead(id:string){
		setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
	}

	function archive(id:string){
		setAnnouncements(prev => prev.filter(a => a.id !== id));
	}

	return (
		<div className="p-4 lg:p-6">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Announcements</h1>
			</div>

			<SummaryCards cards={cards} />

			<div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
					<h3 className="font-semibold mb-3">Feed</h3>
					{filtered.length === 0 && <div className="w-full h-40 bg-gray-50 rounded flex items-center justify-center text-gray-400">No announcements</div>}
					<div className="divide-y">
						{filtered.map(a => (
							<div key={a.id} className={`p-3 ${a.read ? '' : 'bg-white'}`}>
								<div className="flex items-start justify-between gap-3">
									<div>
										<div className="font-medium">{a.title}</div>
										<div className="text-xs text-gray-500">{a.date} • {a.scope}</div>
									</div>
									<div className="text-right">
										{!a.read && <span className="text-xs text-blue-600">New</span>} 
										<button onClick={()=>markRead(a.id)} className="ml-2 text-xs text-gray-600">Mark read</button>
										<button onClick={()=>archive(a.id)} className="ml-2 text-xs text-red-600">Archive</button>
									</div>
								</div>
								<div className="text-sm text-gray-700 mt-2">{a.body}</div>
							</div>
						))}
					</div>
				</div>

				<aside className="bg-white rounded-lg shadow-sm p-4">
					<h3 className="font-semibold mb-3">Distribution</h3>
					<div className="h-48"><PieChart data={[{label:'Students',value:60},{label:'Staff',value:30},{label:'Parents',value:10}]} /></div>
				</aside>
			</div>
		</div>
	);
}


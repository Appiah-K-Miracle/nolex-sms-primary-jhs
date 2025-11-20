"use client";

import SummaryCards from "../../../../components/teacher/summary-cards";
import { useState } from "react";
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

	return (
		<div className="p-4 lg:p-6">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Announcements</h1>
			</div>

			<SummaryCards cards={cards} />

			<div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
					<h3 className="font-semibold mb-3">Feed</h3>
					<div className="w-full h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">Announcement feed placeholder</div>
				</div>

				<aside className="bg-white rounded-lg shadow-sm p-4">
					<h3 className="font-semibold mb-3">Distribution</h3>
					<div className="h-48"><PieChart data={[{label:'Students',value:60},{label:'Staff',value:30},{label:'Parents',value:10}]} /></div>
				</aside>
			</div>
		</div>
	);
}


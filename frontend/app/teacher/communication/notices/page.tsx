"use client";

import SummaryCards from "../../../../components/teacher/summary-cards";
import { useState } from "react";
import LineChart from "../../../../components/charts/line-chart";

export default function NoticesPage(){
	const unread = 2; const upcoming = 4; const recent = 9; const critical = 1;
	const cards = [
		{ title: 'Unread Alerts', value: unread },
		{ title: 'Upcoming Reminders', value: upcoming },
		{ title: 'Recent Alerts', value: recent },
		{ title: 'Critical Alerts', value: critical }
	];

	const [range, setRange] = useState('7d');

	return (
		<div className="p-4 lg:p-6">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Notices & Alerts</h1>
			</div>

			<SummaryCards cards={cards} />

			<div className="mt-6 bg-white rounded-lg shadow-sm p-4">
				<h3 className="font-semibold mb-3">Recent Activity</h3>
				<div className="h-48"><LineChart data={[2,3,5,4,6]} /></div>
			</div>
		</div>
	);
}

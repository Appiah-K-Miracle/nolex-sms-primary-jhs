
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tasks: string[];
  href: string;
}

export default function DashboardCard({ icon, title, description, tasks, href }: DashboardCardProps) {
  return (
    <Link href={href} className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50">
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-4">
          {icon}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">{description}</p>
        <ul className="mt-4 space-y-2 text-sm">
          {tasks.map((task, i) => (
            <li key={i} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span className="text-gray-700 dark:text-gray-300">{task}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 sm:px-8 py-4 bg-gray-50 dark:bg-gray-800/20">
        <div className="flex justify-end items-center text-green-500 font-semibold">
          Go to Dashboard
          <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}

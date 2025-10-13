
// @ts-nocheck
// cspell:ignore Nolex


import { Book, User, Shield, Users } from "lucide-react";
import DashboardCard from "@/components/landing-page/dashboard-card";
import cardData from "@/data/dashboard-cards.json";

const icons = {
  Shield: <Shield className="w-12 h-12 text-green-600" aria-label="Shield icon" />,
  Book: <Book className="w-12 h-12 text-cyan-600" aria-label="Book icon" />,
  User: <User className="w-12 h-12 text-yellow-500" aria-label="User icon" />,
  Users: <Users className="w-12 h-12 text-purple-500" aria-label="Users icon" />,
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 to-cyan-100 dark:from-gray-900 dark:to-green-900 text-gray-800 dark:text-gray-200">
      {/* Accessibility: Skip to content link */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-white dark:bg-gray-800 text-green-700 dark:text-green-300 px-4 py-2 rounded shadow">
        Skip to main content
      </a>

      <header className="w-full py-8 bg-transparent">
        <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500 mb-4">
            Nolex SMS for J.H.S and Primary Schools
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            A seamless and efficient way to manage your school.<br />
            <span className="font-medium text-green-700 dark:text-green-300">Access dedicated dashboards for every role.</span>
          </p>
        </div>
      </header>

      <main id="main-content" className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        <section aria-label="Dashboard Cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {cardData.map((card, index) => (
            <DashboardCard
              key={index}
              icon={icons[card.icon]}
              title={card.title}
              description={card.description}
              tasks={card.tasks}
              href={card.href}
              className="transition-transform transform hover:scale-105 focus:scale-105 shadow-lg rounded-xl border border-green-200 dark:border-green-800 bg-white dark:bg-gray-900/80 p-6"
            />
          ))}
        </section>
      </main>

      <footer className="w-full text-center py-6 text-sm text-gray-500 dark:text-gray-400 border-t border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-cyan-50 dark:from-gray-900 dark:to-green-900">
        <p>
          &copy; {new Date().getFullYear()} <span className="font-semibold text-green-700 dark:text-green-300">Nolex SMS</span>. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

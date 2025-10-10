
// @ts-nocheck
// cspell:ignore Nolex

import { Book, User, Shield } from "lucide-react";
import DashboardCard from "@/components/landing-page/dashboard-card";
import cardData from "@/data/dashboard-cards.json";

const icons = {
  Shield: <Shield className="w-12 h-12 text-green-500" />,
  Book: <Book className="w-12 h-12 text-cyan-500" />,
  User: <User className="w-12 h-12 text-yellow-500" />,
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 to-cyan-100 dark:from-gray-900 dark:to-green-900 text-gray-800 dark:text-gray-200">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16 sm:py-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">
            Nolex SMS for J.H.S and Primary Schools
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            A seamless and efficient way to manage your school. Access dedicated dashboards for every role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {cardData.map((card, index) => (
            <DashboardCard
              key={index}
              icon={icons[card.icon]}
              title={card.title}
              description={card.description}
              tasks={card.tasks}
              href={card.href}
            />
          ))}
        </div>
      </main>

      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Nolex SMS. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

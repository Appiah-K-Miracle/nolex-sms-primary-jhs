
"use client";

import { useState } from "react";
import Sidebar from "@/components/headmaster/sidebar";
import Navbar from "@/components/headmaster/navbar";
import Footer from "@/components/headmaster/footer";

export default function HeadmasterLayout({
  children,
}: { 
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

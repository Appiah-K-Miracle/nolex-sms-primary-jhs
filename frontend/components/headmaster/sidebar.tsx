
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, Book, Users, User, DollarSign, Megaphone, ChevronDown, ChevronUp, Settings 
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/headmaster", icon: LayoutDashboard },
  {
    name: "Academics",
    icon: Book,
    subItems: [
      { name: "Classes & Subjects", href: "/headmaster/academics/classes" },
      { name: "Timetables", href: "/headmaster/academics/timetables" },
      { name: "Examinations", href: "/headmaster/academics/exams" },
    ],
  },
  {
    name: "Students",
    icon: Users,
    subItems: [
      { name: "Admissions", href: "/headmaster/students/admissions" },
      { name: "Student List", href: "/headmaster/students" },
      { name: "Attendance", href: "/headmaster/students/attendance" },
    ],
  },
  {
    name: "Staff",
    icon: User,
    subItems: [
      { name: "Staff List", href: "/headmaster/staff" },
      { name: "Attendance", href: "/headmaster/staff/attendance" },
      { name: "Leave Management", href: "/headmaster/staff/leave" },
    ],
  },
  { name: "Finance", href: "/headmaster/finance", icon: DollarSign },
  { name: "Communication", href: "/headmaster/communication", icon: Megaphone },
  {
    name: "Settings",
    icon: Settings,
    subItems: [
      { name: "General", href: "/headmaster/settings/general" },
      { name: "Users & Roles", href: "/headmaster/settings/users" },
      { name: "School Profile", href: "/headmaster/settings/profile" },
      { name: "Notifications", href: "/headmaster/settings/notifications" },
      
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <aside className="w-64 bg-white text-gray-800 p-4 border-r border-gray-200 h-screen overflow-y-auto">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold text-green-700">Nolex SMS</h1>
      </div>
      <nav className="pt-2">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.name} className="mb-2">
              {item.subItems ? (
                <div>
                  <div
                    onClick={() => handleDropdown(item.name)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-light-green-100 ${pathname.startsWith(item.href || item.name.toLowerCase()) ? "bg-light-green-100 text-green-700" : ""}`}>
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.name}</span>
                    </div>
                    {openDropdown === item.name ? <ChevronUp /> : <ChevronDown />}
                  </div>
                  {openDropdown === item.name && (
                    <ul className="pl-8 mt-2 space-y-2">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link href={subItem.href} className={`block p-2 rounded-lg hover:bg-light-green-200 ${pathname === subItem.href ? "bg-light-green-200 font-semibold" : ""}`}>
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link href={item.href!} className={`flex items-center p-2 rounded-lg hover:bg-light-green-100 ${pathname === item.href ? "bg-light-green-100 text-green-700 font-semibold" : ""}`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

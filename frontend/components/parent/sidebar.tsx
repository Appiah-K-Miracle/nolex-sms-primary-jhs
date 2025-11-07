"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  User, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  Bell, 
  Settings, 
  ChevronDown, 
  ChevronUp, 
  X,
  Menu,
  GraduationCap,
  ClipboardList,
  FileText,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  Star,
  TrendingUp
} from "lucide-react";

const sidebarItems = [
  { 
    name: "Dashboard", 
    href: "/parent", 
    icon: LayoutDashboard,
    description: "Overview and quick actions"
  },
  {
    name: "My Children",
    icon: Users,
    href: "/parent/children",
    description: "Manage your children's profiles",
    subItems: [
      { name: "All Children", href: "/parent/children" },
      { name: "Academic Progress", href: "/parent/children/academic" },
      { name: "Attendance", href: "/parent/children/attendance" },
      { name: "Behavior Reports", href: "/parent/children/behavior" },
    ],
  },
  {
    name: "Academics",
    icon: BookOpen,
    href: "/parent/academics",
    description: "Academic performance and reports",
    subItems: [
      { name: "Grades & Results", href: "/parent/academics/grades" },
      { name: "Assignments", href: "/parent/academics/assignments" },
      { name: "Timetable", href: "/parent/academics/timetable" },
      { name: "Subjects", href: "/parent/academics/subjects" },
    ],
  },
  {
    name: "Attendance",
    icon: Clock,
    href: "/parent/attendance",
    description: "Daily attendance records",
    subItems: [
      { name: "Daily Records", href: "/parent/attendance/daily" },
      { name: "Monthly Summary", href: "/parent/attendance/monthly" },
      { name: "Leave Requests", href: "/parent/attendance/leave" },
    ],
  },
  {
    name: "Communication",
    icon: MessageSquare,
    href: "/parent/communication",
    description: "Messages and announcements",
    subItems: [
      { name: "Messages", href: "/parent/communication/messages" },
      { name: "Announcements", href: "/parent/communication/announcements" },
      { name: "Teacher Meetings", href: "/parent/communication/meetings" },
      { name: "Parent Groups", href: "/parent/communication/groups" },
    ],
  },
  {
    name: "Finance",
    icon: DollarSign,
    href: "/parent/finance",
    description: "Fees and payments",
    subItems: [
      { name: "Fee Structure", href: "/parent/finance/fees" },
      { name: "Payment History", href: "/parent/finance/payments" },
      { name: "Outstanding Bills", href: "/parent/finance/outstanding" },
      { name: "Receipts", href: "/parent/finance/receipts" },
    ],
  },
  {
    name: "Events & Calendar",
    icon: Calendar,
    href: "/parent/events",
    description: "School events and calendar",
    subItems: [
      { name: "School Calendar", href: "/parent/events/calendar" },
      { name: "Upcoming Events", href: "/parent/events/upcoming" },
      { name: "Parent Meetings", href: "/parent/events/meetings" },
      { name: "Holidays", href: "/parent/events/holidays" },
    ],
  },
  {
    name: "Reports",
    icon: FileText,
    href: "/parent/reports",
    description: "Academic and progress reports",
    subItems: [
      { name: "Term Reports", href: "/parent/reports/term" },
      { name: "Progress Reports", href: "/parent/reports/progress" },
      { name: "Assessment Reports", href: "/parent/reports/assessments" },
    ],
  },
  { 
    name: "Notifications", 
    href: "/parent/notifications", 
    icon: Bell,
    description: "Alerts and notifications"
  },
  { 
    name: "Settings", 
    href: "/parent/settings", 
    icon: Settings,
    description: "Account and preferences"
  },
];

interface ParentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ParentSidebar({ isOpen, onClose }: ParentSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) {
      onClose();
    }
  }, [pathname, isMobile, onClose]);

  // Prevent scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isOpen]);

  // Auto-open dropdown if current path matches
  useEffect(() => {
    const currentItem = sidebarItems.find(item => 
      item.subItems?.some(subItem => pathname.startsWith(subItem.href))
    );
    if (currentItem) {
      setOpenDropdown(currentItem.name);
    }
  }, [pathname]);

  const handleDropdown = (name: string, subItems: any) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
      if (subItems && subItems.length > 0 && !isMobile) {
        router.push(subItems[0].href);
      }
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 lg:w-64 xl:w-72
        bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 
        text-white border-r border-blue-700
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-screen overflow-hidden
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-blue-700 bg-blue-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-white">Nolex SMS</h1>
              <p className="text-xs lg:text-sm text-blue-200">Parent Portal</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 lg:p-6 bg-blue-800/30 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm lg:text-base font-semibold text-white">MK</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm lg:text-base font-semibold text-white truncate">
                Mrs. Akosua Mensah
              </p>
              <p className="text-xs lg:text-sm text-blue-200 truncate">
                Parent • 2 Children
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 lg:p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-blue-800">
          <ul className="space-y-1 lg:space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                {item.subItems ? (
                  <div>
                    <div
                      onClick={() => handleDropdown(item.name, item.subItems)}
                      className={`flex items-center justify-between p-3 lg:p-4 rounded-xl cursor-pointer transition-all duration-200 group ${
                        pathname.startsWith(item.href || item.name.toLowerCase()) 
                          ? "bg-blue-600/60 text-white shadow-lg" 
                          : "text-blue-100 hover:bg-blue-700/40 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className={`p-2 rounded-lg transition-colors ${
                          pathname.startsWith(item.href || item.name.toLowerCase()) 
                            ? "bg-blue-500/50" 
                            : "bg-blue-800/50 group-hover:bg-blue-600/50"
                        }`}>
                          <item.icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-sm lg:text-base font-medium block truncate">
                            {item.name}
                          </span>
                          <span className="text-xs text-blue-200 block truncate lg:hidden xl:block">
                            {item.description}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        {openDropdown === item.name ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                        }
                      </div>
                    </div>
                    
                    {openDropdown === item.name && (
                      <ul className="mt-2 ml-4 lg:ml-6 space-y-1 border-l-2 border-blue-600/30 pl-4">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <Link 
                              href={subItem.href} 
                              className={`block p-2 lg:p-3 rounded-lg text-sm lg:text-base transition-all duration-200 ${
                                pathname === subItem.href 
                                  ? "bg-blue-500/50 text-white font-semibold shadow-md" 
                                  : "text-blue-200 hover:bg-blue-700/30 hover:text-white"
                              }`}
                            >
                              <span className="truncate block">{subItem.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link 
                    href={item.href!} 
                    className={`flex items-center p-3 lg:p-4 rounded-xl transition-all duration-200 group ${
                      pathname === item.href 
                        ? "bg-blue-600/60 text-white shadow-lg" 
                        : "text-blue-100 hover:bg-blue-700/40 hover:text-white"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors ${
                      pathname === item.href 
                        ? "bg-blue-500/50" 
                        : "bg-blue-800/50 group-hover:bg-blue-600/50"
                    }`}>
                      <item.icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                    </div>
                    <div className="ml-3 min-w-0 flex-1">
                      <span className="text-sm lg:text-base font-medium block truncate">
                        {item.name}
                      </span>
                      <span className="text-xs text-blue-200 block truncate lg:hidden xl:block">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 lg:p-6 border-t border-blue-700 bg-blue-800/30">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs lg:text-sm text-blue-200">System Online</span>
            </div>
            <p className="text-xs text-blue-300">© 2025 Nolex SMS</p>
            <p className="text-xs text-blue-400">Parent Portal v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Book,
  Users,
  User,
  Clock,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronDown,
  X,
  Calendar
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function StudentsDropdown({ pathname }: { pathname: string }) {
  const [studentsOpen, setStudentsOpen] = useState(pathname.startsWith('/teacher/students'));

  return (
    <>
      <button onClick={() => setStudentsOpen(!studentsOpen)} className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg text-sm font-medium ${pathname.startsWith('/teacher/students') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}>
        <div className="flex items-center gap-3">
          <Users className="w-4 h-4 text-gray-500" />
          <span>Students</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${studentsOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {studentsOpen && (
        <ul className="mt-2 ml-6 space-y-1">
          <li>
            <Link href="/teacher/students" className={`block p-2 text-sm rounded ${pathname === '/teacher/students' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Student List</Link>
          </li>
          <li>
            <Link href="/teacher/students/attendance" className={`block p-2 text-sm rounded ${pathname === '/teacher/students/attendance' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Attendance</Link>
          </li>
          <li>
            <Link href="/teacher/students/behaviour" className={`block p-2 text-sm rounded ${pathname === '/teacher/students/behaviour' || pathname === '/teacher/students/behavior' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Behaviour</Link>
          </li>
        </ul>
      )}
    </>
  );
}

function StaffDropdown({ pathname }: { pathname: string }) {
  const [staffOpen, setStaffOpen] = useState(pathname.startsWith('/teacher/staff'));

  return (
    <>
      <button onClick={() => setStaffOpen(!staffOpen)} className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg text-sm font-medium ${pathname.startsWith('/teacher/staff') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}>
        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-gray-500" />
          <span>Staff</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${staffOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {staffOpen && (
        <ul className="mt-2 ml-6 space-y-1">
          <li>
            <Link href="/teacher/staff/staff-list" className={`block p-2 text-sm rounded ${pathname === '/teacher/staff/staff-list' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Staff List</Link>
          </li>
          <li>
            <Link href="/teacher/staff/attendance" className={`block p-2 text-sm rounded ${pathname === '/teacher/staff/attendance' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Attendance</Link>
          </li>
          <li>
            <Link href="/teacher/staff/leave" className={`block p-2 text-sm rounded ${pathname === '/teacher/staff/leave' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Leave</Link>
          </li>
        </ul>
      )}
    </>
  );
}

function AssessmentDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(pathname.startsWith('/teacher/assessment'));

  return (
    <>
      <button onClick={() => setOpen(!open)} className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg text-sm font-medium ${pathname.startsWith('/teacher/assessment') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}>
        <div className="flex items-center gap-3">
          <FileText className="w-4 h-4 text-gray-500" />
          <span>Assessment</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {open && (
        <ul className="mt-2 ml-6 space-y-1">
          <li>
            <Link href="/teacher/assessment/class" className={`block p-2 text-sm rounded ${pathname === '/teacher/assessment/class' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Class</Link>
          </li>
          <li>
            <Link href="/teacher/assessment/exams" className={`block p-2 text-sm rounded ${pathname === '/teacher/assessment/exams' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Exams</Link>
          </li>
        </ul>
      )}
    </>
  );
}

function CommunicationDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(pathname.startsWith('/teacher/communication'));

  return (
    <>
      <button onClick={() => setOpen(!open)} className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg text-sm font-medium ${pathname.startsWith('/teacher/communication') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}>
        <div className="flex items-center gap-3">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          <span>Communication</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {open && (
        <ul className="mt-2 ml-6 space-y-1">
          <li>
            <Link href="/teacher/communication/messages" className={`block p-2 text-sm rounded ${pathname === '/teacher/communication/messages' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Messages</Link>
          </li>
          <li>
            <Link href="/teacher/communication/announcement" className={`block p-2 text-sm rounded ${pathname === '/teacher/communication/announcement' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Announcements</Link>
          </li>
          <li>
            <Link href="/teacher/communication/notices" className={`block p-2 text-sm rounded ${pathname === '/teacher/communication/notices' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Notices</Link>
          </li>
        </ul>
      )}
    </>
  );
}

function ReportsDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(pathname.startsWith('/teacher/reports'));

  return (
    <>
      <button onClick={() => setOpen(!open)} className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg text-sm font-medium ${pathname.startsWith('/teacher/reports') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}>
        <div className="flex items-center gap-3">
          <BarChart3 className="w-4 h-4 text-gray-500" />
          <span>Reports</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {open && (
        <ul className="mt-2 ml-6 space-y-1">
          <li>
            <Link href="/teacher/reports/class" className={`block p-2 text-sm rounded ${pathname === '/teacher/reports/class' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Class</Link>
          </li>
          <li>
            <Link href="/teacher/reports/students" className={`block p-2 text-sm rounded ${pathname === '/teacher/reports/students' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Students</Link>
          </li>
          <li>
            <Link href="/teacher/reports/lesson-notes" className={`block p-2 text-sm rounded ${pathname === '/teacher/reports/lesson-notes' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Lesson Notes</Link>
          </li>
        </ul>
      )}
    </>
  );
}

function SettingsDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(pathname.startsWith('/teacher/settings'));

  return (
    <>
      <button onClick={() => setOpen(!open)} className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg text-sm font-medium ${pathname.startsWith('/teacher/settings') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}>
        <div className="flex items-center gap-3">
          <Settings className="w-4 h-4 text-gray-500" />
          <span>Settings</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {open && (
        <ul className="mt-2 ml-6 space-y-1">
          <li>
            <Link href="/teacher/settings/profile" className={`block p-2 text-sm rounded ${pathname === '/teacher/settings/profile' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Profile</Link>
          </li>
          <li>
            <Link href="/teacher/settings/account" className={`block p-2 text-sm rounded ${pathname === '/teacher/settings/account' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Account</Link>
          </li>
        </ul>
      )}
    </>
  );
}

export default function TeacherSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname() || "";
  const [academicsOpen, setAcademicsOpen] = useState(pathname.startsWith("/teacher/academics"));
  // read from auth context
  let teacherName = 'Teacher Portal';
  let teacherInitials = 'T';
  try {
    // dynamic import of context hook
    // `useAuth` is client-only; call inside component
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { useAuth } = require('../../context/auth');
    const auth = useAuth();
    if (auth && auth.user) {
      teacherName = auth.user.name;
      teacherInitials = auth.user.name.split(' ').map((p:any)=>p[0]).slice(0,2).join('');
    }
  } catch (e) {
    // fallback to defaults
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 lg:w-64 bg-white border-r border-gray-100 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded flex items-center justify-center text-white font-semibold">{teacherInitials}</div>
                <div>
                  <h4 className="text-sm font-semibold">{teacherName}</h4>
                  <p className="text-xs text-gray-500">Teacher Portal</p>
                </div>
              </div>
            <button className="lg:hidden p-2 text-gray-500" onClick={onClose} aria-label="Close sidebar">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-4 overflow-y-auto flex-1">
            <ul className="space-y-1">
            <li>
              {/** Dashboard link - active state */}
              <Link
                href="/teacher"
                className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium ${pathname === "/teacher" ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}>
                <LayoutDashboard className="w-4 h-4 text-gray-500" />
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Academics with dropdown */}
            <li>
              <button onClick={() => setAcademicsOpen(!academicsOpen)} className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg text-sm font-medium ${pathname.startsWith('/teacher/academics') ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}>
                <div className="flex items-center gap-3">
                  <Book className="w-4 h-4 text-gray-500" />
                  <span>Academics</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${academicsOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>

              {academicsOpen && (
                <ul className="mt-2 ml-6 space-y-1">
                  <li>
                    <Link href="/teacher/academics/classes" className={`block p-2 text-sm rounded ${pathname === '/teacher/academics/classes' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Classes</Link>
                  </li>
                  <li>
                    <Link href="/teacher/academics/subjects" className={`block p-2 text-sm rounded ${pathname === '/teacher/academics/subjects' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Subjects</Link>
                  </li>
                  <li>
                    <Link href="/teacher/academics/lesson-notes" className={`block p-2 text-sm rounded ${pathname === '/teacher/academics/lesson-notes' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Lesson Notes</Link>
                  </li>
                  <li>
                    <Link href="/teacher/academics/timetable" className={`block p-2 text-sm rounded ${pathname === '/teacher/academics/timetable' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Time-Table</Link>
                  </li>
                  <li>
                    <Link href="/teacher/academics/assignments" className={`block p-2 text-sm rounded ${pathname === '/teacher/academics/assignments' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Assignment</Link>
                  </li>
                  <li>
                    <Link href="/teacher/academics/exams" className={`block p-2 text-sm rounded ${pathname === '/teacher/academics/exams' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>Exams</Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              {/* Students dropdown */}
              <StudentsDropdown pathname={pathname} />
            </li>

            <li>
              {/* Staff dropdown */}
              <StaffDropdown pathname={pathname} />
            </li>

            <li>
              {/* Assessment dropdown */}
              <AssessmentDropdown pathname={pathname} />
            </li>

            <li>
              {/* Communication dropdown */}
              <CommunicationDropdown pathname={pathname} />
            </li>

            <li>
              <ReportsDropdown pathname={pathname} />
            </li>

            <li>
              <SettingsDropdown pathname={pathname} />
            </li>
          </ul>
          </nav>

          {/* Footer: online teacher + copyright/version */}
          <div className="border-t p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">{teacherInitials}</div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" title="Online" />
                </div>
                <div>
                  <div className="text-sm font-medium">{teacherName}</div>
                  <div className="text-xs text-green-600">Online</div>
                </div>
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              <div>© 2025 Nolex SMS</div>
              <div>Teacher Portal v2.1.0</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

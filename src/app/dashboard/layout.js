"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBullhorn,
  FaBuilding,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); 
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between hidden md:flex sticky top-0 h-screen shadow-sm">
        <div className="p-4">
          <div className="mb-6 px-2">
            <h1 className="text-xl font-bold text-blue-600 tracking-tight">
              Digital<span className="text-gray-800">Campus</span>
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Management Dashboard</p>
          </div>

          <nav className="flex flex-col space-y-1.5">
            <Link
              href="/"
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition text-sm font-medium mb-2 border border-gray-100"
            >
              <FaHome className="text-lg text-gray-500" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/dashboard/profile"
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition text-sm font-medium ${
                isActive("/dashboard/profile")
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <FaTachometerAlt className="text-lg" />
              <span>Profile</span>
            </Link>

            <Link
              href="/dashboard/overview"
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition text-sm font-medium ${
                isActive("/dashboard/overview")
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <FaTachometerAlt className="text-lg" />
              <span>Overview</span>
            </Link>

            <Link
              href="/dashboard/students"
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition text-sm font-medium ${
                isActive("/dashboard/students")
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <FaUserGraduate className="text-lg" />
              <span>Students</span>
            </Link>

            <Link
              href="/dashboard/teachers"
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition text-sm font-medium ${
                isActive("/dashboard/teachers")
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <FaChalkboardTeacher className="text-lg" />
              <span>Teachers</span>
            </Link>

            <Link
              href="/dashboard/notices"
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition text-sm font-medium ${
                isActive("/dashboard/notices")
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <FaBullhorn className="text-lg" />
              <span>Campus Notices</span>
            </Link>

            <Link
              href="/dashboard/departments"
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition text-sm font-medium ${
                isActive("/dashboard/departments")
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <FaBuilding className="text-lg" />
              <span>Departments</span>
            </Link>

            <Link
              href="/dashboard/settings"
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition text-sm font-medium ${
                isActive("/dashboard/settings")
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <FaCog className="text-lg" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* নিচের অংশ: লগআউট বাটন */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition text-sm font-medium cursor-pointer"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 min-h-screen bg-gray-50 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
import React from "react";
import { Navigate, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaPlusCircle,
  FaChalkboardTeacher,
  FaUpload,
  FaFolderOpen,
  FaUsersCog,
  FaCalendarAlt,
  FaBook,
  FaCalendarCheck,
  FaStickyNote,
  FaClipboardList,
  FaBookOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import StudyHubLogo from "../components/pages/shared/StudyHubLogo";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";
import Loading from "../components/pages/shared/Loading";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const { logOut } = useAuth();

  if (roleLoading) {
    return <Loading />;
  }

  const NavLinkClass = ({ isActive }) =>
    isActive ? "text-black font-bold" : "text-base-content";

  const handleLogout = async () => {
    try {
      await logOut();
      Navigate("/login"); // or wherever you redirect after logout
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar (Mobile Only) */}
        <div className="navbar bg-base-200 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>

        {/* Main content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4 space-y-1">
          <StudyHubLogo />

          {/* Common Link */}
          <li>
            <NavLink to="/dashboard" end className={NavLinkClass}>
              <FaHome className="inline-block mr-2" />
              OverView
            </NavLink>
          </li>
          {/* Tutor Role Links */}
          {role === "tutor" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/create-study-session"
                  className={NavLinkClass}
                >
                  <FaPlusCircle className="inline-block mr-2" />
                  Create Study Session
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-sessions" className={NavLinkClass}>
                  <FaChalkboardTeacher className="inline-block mr-2" />
                  My Study Sessions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/upload-materials"
                  className={NavLinkClass}
                >
                  <FaUpload className="inline-block mr-2" />
                  Upload Materials
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-materials" className={NavLinkClass}>
                  <FaFolderOpen className="inline-block mr-2" />
                  View My Materials
                </NavLink>
              </li>
            </>
          )}
          {/* Admin Role Links */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-users" className={NavLinkClass}>
                  <FaUsersCog className="inline-block mr-2" />
                  <span>Manage Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-sessions"
                  className={NavLinkClass}
                >
                  <FaCalendarAlt className="inline-block mr-2" />
                  <span>Manage Sessions</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-materials"
                  className={NavLinkClass}
                >
                  <FaBook className="inline-block mr-2" />
                  <span>Manage Materials</span>
                </NavLink>
              </li>
            </>
          )}
          {role === "student" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/booked-sessions"
                  className={NavLinkClass}
                >
                  <FaCalendarCheck className="inline-block mr-2" />
                  My Booked Sessions
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/create-note" className={NavLinkClass}>
                  <FaStickyNote className="inline-block mr-2" />
                  Create Note
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-notes" className={NavLinkClass}>
                  <FaClipboardList className="inline-block mr-2" />
                  Manage Notes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/view-materials"
                  className={NavLinkClass}
                >
                  <FaBookOpen className="inline-block mr-2" />
                  View Study Materials
                </NavLink>
              </li>
            </>
          )}

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-500 font-medium"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;

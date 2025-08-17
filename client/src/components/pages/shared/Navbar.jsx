import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { PiUserCircleFill } from "react-icons/pi";
import { Tooltip } from "react-tooltip";
import { Sun, Moon, Menu, X } from "lucide-react";
import StudyHubLogo from "./StudyHubLogo";
import useAuth from "../../../hooks/useAuth";

const Navbar = ({ darkMode, setDarkMode}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => toast.success("You’re now logged out. See you again soon!"))
      .catch((error) => toast.error(error.message));
  };

  const navLinkClass = ({ isActive }) =>
    `relative text-[16px] transition hover:text-primary font-medium
    after:content-[''] after:block after:w-0 after:h-[2px] after:bg-primary after:transition-all 
    after:duration-300 after:ease-in-out hover:after:w-full
    ${isActive ? "text-primary after:w-full" : "text-gray-500"}`;

  const navItems = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/sessions" className={navLinkClass}>
        Study Sessions
      </NavLink>
      <NavLink to="/tutors" className={navLinkClass}>
        Tutors
      </NavLink>
      {user && (
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <div
      data-theme={darkMode ? "dark" : "light"}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isSticky
          ? "bg-blue-50/80 backdrop-blur-lg shadow-sm border-b border-blue-100"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-50"
      }`}
    >
      <div className="navbar container mx-auto items-center flex py-3">
        {/* 🔹 Navbar Start */}
        <div className="navbar-start sm:w-[40%] w-full flex items-center gap-2">
          {/* Mobile menu button */}
          <button
            aria-label="Toggle mobile menu"
            className="btn btn-ghost lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu />
          </button>
          <StudyHubLogo />
        </div>

        {/* 🔹 Navbar Center (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal flex gap-10">{navItems}</ul>
        </div>

        {/* 🔹 Navbar End */}
        <div className="navbar-end gap-3 hidden sm:flex items-center">
          {/* Dark mode toggle */}
          <button
            aria-label="Toggle dark mode"
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-circle btn-ghost"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>

          {user ? (
            <>
              <div className="mr-1 relative group hidden sm:block">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    data-tooltip-id="user-tooltip"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  />
                ) : (
                  <PiUserCircleFill
                    size={41}
                    className="cursor-pointer"
                    data-tooltip-id="user-tooltip"
                  />
                )}
                <Tooltip id="user-tooltip" place="bottom" className="z-10">
                  {user?.displayName}
                </Tooltip>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-primary rounded-full px-6"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost rounded-full px-6">
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary rounded-full px-6"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 🔹 Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 bg-base-100 shadow-md z-50 p-6 flex flex-col"
          >
            <button
              aria-label="Close mobile menu"
              className="self-end mb-4 btn btn-ghost"
              onClick={() => setMobileOpen(false)}
            >
              <X />
            </button>
            <nav className="flex flex-col gap-4">{navItems}</nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

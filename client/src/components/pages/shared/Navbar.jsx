import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

import toast from "react-hot-toast";
import { PiUserCircleFill } from "react-icons/pi";
import { Tooltip } from "react-tooltip";
import StudyHubLogo from "./StudyHubLogo";
import useAuth from "../../../hooks/useAuth";
const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 80px এর বেশি স্ক্রল হলেই shadow লাগবে
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("You’re now logged out. See you again soon!");
      })
      .catch((error) => {
        toast(error);
      });
  };
  const navLinkClass = ({ isActive }) =>
    `text-[16px] transition hover:text-black ${
      isActive ? "text-black decoration-2 decoration-black" : ""
    }`;

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
      className={`sticky top-0 z-50 transition-all duration-300 py-3 ${
        isSticky
          ? "bg-blue-50/80 backdrop-blur-lg shadow-sm border-b border-blue-100"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-50"
      }`}
    >
      <div className="navbar container mx-auto items-center flex">
        <div className="navbar-start sm:w-[40%] w-full">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          {/* <Link to="/"> */}
          {/* <img src={logoImg} alt="EduCare official logo" /> */}
          <StudyHubLogo />
          {/* </Link> */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal text-base font-medium flex flex-wrap w-fit gap-10 text-neutral-400">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end gap-3 hidden sm:flex">
          {user ? (
            <>
              <div className="mr-1 relative group  hidden sm:block">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile photo"
                    data-tooltip-id="user-tooltip"
                    className="w-10 h-10 rounded-full object-cover  cursor-pointer"
                  />
                ) : (
                  <PiUserCircleFill
                    size={41}
                    className="cursor-pointer user-full-name"
                    data-tooltip-id="user-tooltip"
                  />
                )}
                <Tooltip id="user-tooltip" place="bottom" className="z-10">
                  {user?.displayName}
                </Tooltip>
              </div>
              <button
                onClick={handleLogout}
                className="text-base bg-primary text-white rounded-4xl border-0 font-medium py-2.5 px-8 hover:bg-blue-700 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-base rounded-4xl border-0 font-medium py-2.5 px-4"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-base bg-primary text-white rounded-4xl border-0 font-medium py-2.5 px-8 hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

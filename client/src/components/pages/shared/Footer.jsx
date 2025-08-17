import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import StudyHubLogo from "./StudyHubLogo";
const Footer = () => {
  return (
    <div className="bg-base-200 py-12 px-4">
      {/* Newsletter Section */}
      <div
        className="container mx-auto rounded-3xl 
  bg-gradient-to-br from-primary to-primary/80 
  dark:from-secondary-black2 dark:to-secondary-black1
  text-center p-8 lg:py-16 shadow-lg"
      >
        <h3 className="font-bold text-2xl lg:text-4xl text-secondary-white mb-3">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-secondary-white mb-8">
          Get updates on study sessions, materials, and learning tips.
        </p>
        <form className="flex gap-4 sm:gap-0 flex-col sm:flex-row items-center justify-center max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full bg-secondary-white text-secondary-gray5 placeholder-secondary-gray6 rounded-full py-3 pl-5 border border-secondary-gray6 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full sm:w-auto font-bold btn btn-primary whitespace-nowrap  px-6 py-3 rounded-full "
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <div className="container mx-auto flex justify-between gap-10 mt-16 flex-col md:flex-row">
        {/* Left Column */}
        <div className="md:w-1/2">
          <StudyHubLogo />
          <p className="mt-5 text-secondary-gray6 md:mr-12 mb-5">
            StudyHub is a modern collaborative study platform where students
            join expert-led sessions, access curated materials, and grow
            together through peer learning.
          </p>
          <ul className="flex gap-3 text-secondary-gray5">
            <li>
              <Link
                to="https://www.facebook.com/yourprofile"
                target="_blank"
                className="hover:text-primary"
              >
                <FaFacebook size={18} />
              </Link>
            </li>
            <li>
              <Link
                to="https://x.com/yourprofile"
                target="_blank"
                className="hover:text-primary"
              >
                <FaXTwitter size={18} />
              </Link>
            </li>
            <li>
              <Link
                to="https://www.linkedin.com/in/yourprofile/"
                target="_blank"
                className="hover:text-primary"
              >
                <FaLinkedinIn size={18} />
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 flex flex-col sm:flex-row gap-10 md:gap-0">
          <div className="flex-1">
            <h3 className="text-secondary-gray6 font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-secondary-gray5">
              <li>
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sessions" className="hover:text-primary">
                  All Sessions
                </Link>
              </li>
              <li>
                <Link to="/tutors" className="hover:text-primary">
                  Tutors
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary">
                  About StudyHub
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="text-secondary-gray6 font-semibold mb-4">
              Support & Info
            </h3>
            <ul className="space-y-3 text-secondary-gray5">
              <li>
                <Link to="/About" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/teams" className="hover:text-primary">
                  Teams
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

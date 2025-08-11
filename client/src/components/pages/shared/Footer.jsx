import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import StudyHubLogo from "./StudyHubLogo";
const Footer = () => {
  return (
    <div className="bg-gray-100 py-10 lg:py-24 px-4">
      {/* Newsletter Section */}
      <div className="container mx-auto rounded-3xl bg-gradient-to-br from-[#0057b8] to-[#003f8a] text-center p-8 lg:py-16 shadow-lg">
        <h3 className="font-bold text-2xl lg:text-4xl text-white mb-3">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-white mb-8">
          Get updates on study sessions, materials, and learning tips.
        </p>
        <form className="flex gap-4 sm:gap-0 flex-col sm:flex-row items-center justify-center max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full bg-white text-gray-700 placeholder-gray-400 rounded-full py-3 pl-5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0057b8]"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#0057b8] text-white font-medium px-6 py-3 rounded-full hover:bg-[#004aa0] transition"
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
          <p className="mt-5 text-gray-600 md:mr-12 mb-5">
            StudyHub is a modern collaborative study platform where students
            join expert-led sessions, access curated materials, and grow
            together through peer learning.
          </p>
          <ul className="flex gap-3 text-gray-500">
            <li>
              <Link
                to="https://www.facebook.com/xoss.arif"
                target="_blank"
                className="hover:text-[#0057b8]"
              >
                <FaFacebook size={18} />
              </Link>
            </li>
            <li>
              <Link
                to="https://x.com/xoss_arif"
                target="_blank"
                className="hover:text-[#0057b8]"
              >
                <FaXTwitter size={18} />
              </Link>
            </li>
            <li>
              <Link
                to="https://www.linkedin.com/in/arif128551/"
                target="_blank"
                className="hover:text-[#0057b8]"
              >
                <FaLinkedinIn size={18} />
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 flex flex-col sm:flex-row gap-10 md:gap-0">
          <div className="flex-1">
            <h3 className="text-gray-800 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link to="/" className="hover:text-[#0057b8]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sessions" className="hover:text-[#0057b8]">
                  All Sessions
                </Link>
              </li>
              <li>
                <Link to="/tutors" className="hover:text-[#0057b8]">
                  Tutors
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#0057b8]">
                  About StudyHub
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="text-gray-800 font-semibold mb-4">Support & Info</h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link to="/help-center" className="hover:text-[#0057b8]">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#0057b8]">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#0057b8]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-[#0057b8]">
                  Terms & Conditions
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

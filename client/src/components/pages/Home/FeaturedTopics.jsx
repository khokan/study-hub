import React from "react";
import {
  FaBookReader,
  FaLaptopCode,
  FaFlask,
  FaGlobe,
  FaCalculator,
  FaBrain,
  FaChalkboardTeacher,
  FaBalanceScale,
} from "react-icons/fa";

const categories = [
  { name: "Mathematics", icon: <FaCalculator /> },
  { name: "Programming", icon: <FaLaptopCode /> },
  { name: "Science", icon: <FaFlask /> },
  { name: "Language Learning", icon: <FaGlobe /> },
  { name: "Exam Preparation", icon: <FaBookReader /> },
  { name: "Critical Thinking", icon: <FaBrain /> },
  { name: "Public Speaking", icon: <FaChalkboardTeacher /> },
  { name: "Ethics & Values", icon: <FaBalanceScale /> },
];

const FeaturedTopics = () => {
  return (
    <section className="bg-base-200 py-10 lg:py-12 px-4">
      <h2 className="text-center font-semibold text-primary mb-2">Popular Categories</h2>
      <p className="text-center text-base-content font-semibold text-xl lg:text-[40px] mb-6 lg:mb-12">
        Explore Study Sessions by Category
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-secondary-gray3 p-4 rounded-lg border border-base-300 shadow-sm hover:shadow-md text-left transition"
            style={{
              transition: "box-shadow 0.3s ease",
            }}
            // onMouseEnter={(e) => {
            //   e.currentTarget.style.boxShadow = "16px 24px 36px 12px rgba(1, 11, 28, 0.04)";
            // }}
            // onMouseLeave={(e) => {
            //   e.currentTarget.style.boxShadow = "none";
            // }}
          >
            <div className="text-2xl text-primary">{item.icon}</div>
            <p className="text-secondary-gray6 font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedTopics;

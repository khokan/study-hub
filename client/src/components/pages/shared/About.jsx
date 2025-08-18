import React from 'react';
import { FaTrophy, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaChalkboardTeacher, FaClock, FaChartLine } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="py-4 sm:py-6 lg:py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About Study Hub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Empowering learners and educators through innovative online tutoring and collaborative learning solutions.
        </p>
      </section>

      {/* Our Story */}
      <section className="text-center mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2023, Study Hub emerged from a group of educators and students who recognized the need for more accessible, personalized learning opportunities.
            </p>
            <p className="text-muted-foreground">
              What began as a small peer-to-peer tutoring platform has evolved into a comprehensive learning ecosystem supporting thousands of students and tutors worldwide.
            </p>
          </div>
          {/* Optionally add an education-themed image */}
          {/* <div className="md:w-1/2">
            <img 
              src="/study-hub-hero.jpg" 
              alt="Students learning together" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div> */}
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Study Hub?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaChalkboardTeacher className="text-3xl mb-4 text-blue-600" />,
              title: "Expert Tutors",
              desc: "Learn from qualified educators across diverse subjects"
            },
            {
              icon: <FaClock className="text-3xl mb-4 text-blue-600" />,
              title: "Flexible Scheduling",
              desc: "Book sessions that fit your availability 24/7"
            },
            {
              icon: <FaUsers className="text-3xl mb-4 text-blue-600" />,
              title: "Collaborative Learning",
              desc: "Join study groups and peer learning communities"
            },
            {
              icon: <FaChartLine className="text-3xl mb-4 text-blue-600" />,
              title: "Progress Tracking",
              desc: "Monitor your learning journey with analytics"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-secondary-black2 p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-seconday-grey6">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16 bg-secondary-grey5 p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Educational Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Accessibility",
              description: "Making quality education available to everyone, regardless of location or background"
            },
            {
              title: "Personalization",
              description: "Tailored learning experiences that adapt to individual needs"
            },
            {
              title: "Community",
              description: "Building supportive networks of learners and educators"
            }
          ].map((value, index) => (
            <div key={index} className="bg-secondary-black2 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-center">{value.title}</h3>
              <p className="text-secondary-grey6 text-center">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
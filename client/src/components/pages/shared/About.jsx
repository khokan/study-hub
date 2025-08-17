import React from 'react';
import { FaTrophy, FaUsers, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const AboutPage = () => {
  return (
 <div className="py-4 sm:py-6 lg:py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About AthleticHub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connecting athletes, organizers, and sports enthusiasts through innovative event management solutions.
        </p>
      </section>

      {/* Our Story */}
      <section className="text-center mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2023, AthleticHub began as a passion project by former athletes who saw the need for a better way to discover and manage sports events.
            </p>
            <p className="text-muted-foreground">
              What started as a local platform for track and field events has grown into a comprehensive sports management system serving thousands of users nationwide.
            </p>
          </div>
          {/* <div className="md:w-1/2">
            <img 
              src="/about-hero.jpg" 
              alt="Athletes competing" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div> */}
        </div>
      </section>

      {/* Mission & Vision */}
      {/* <section className="mb-16 bg-gray-50 p-8 rounded-xl">
        <div className="flex flex-row md:flex-row gap-8 items-center justify-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <FaTrophy className="mr-3 text-blue-600" />
              Our Mission
            </h3>
            <p className="text-gray-700">
              To democratize access to sports events by providing organizers with powerful tools and athletes with seamless discovery experiences.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <FaUsers className="mr-3 text-blue-600" />
              Our Vision
            </h3>
            <p className="text-gray-700">
              A world where anyone can find, participate in, and organize sporting events with just a few clicks, regardless of skill level.
            </p>
          </div>
        </div>
      </section> */}

      {/* Key Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose AthleticHub?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaCalendarAlt className="text-3xl mb-4 text-blue-600" />,
              title: "Event Discovery",
              desc: "Find events matching your interests and skill level"
            },
            {
              icon: <FaMapMarkerAlt className="text-3xl mb-4 text-blue-600" />,
              title: "Local Focus",
              desc: "Connect with athletes and events in your community"
            },
            {
              icon: <FaUsers className="text-3xl mb-4 text-blue-600" />,
              title: "Community Building",
              desc: "Grow your network of fellow sports enthusiasts"
            },
            {
              icon: <FaTrophy className="text-3xl mb-4 text-blue-600" />,
              title: "Competition",
              desc: "Challenge yourself against athletes at all levels"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
     
     
    </div>
  );
};

export default AboutPage;
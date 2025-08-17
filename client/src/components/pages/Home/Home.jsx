// src/pages/Home.jsx

import React from "react";
import FeaturedSessions from "./FeaturedSessions";
import BannerSection from "./Banner";
import FeaturedTopics from "./FeaturedTopics";
import TestimonialCarousel from "./TestimonialCarousel";
import PlatformStats from "./PlatformStats";
import UpcomingWebinars from "./UpcomingWebinars";

const Home = () => {
  return (
    <div className="bg-base-100">
      <BannerSection/>
      <FeaturedSessions />
      <FeaturedTopics />
      {/* <TopInstructors /> */}
      {/* <PlatformStats /> */}
     <TestimonialCarousel/>
     <UpcomingWebinars />
    </div>
  );
};

export default Home;

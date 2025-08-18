// src/pages/Home.jsx

import React from "react";
import FeaturedSessions from "./FeaturedSessions";
import BannerSection from "./Banner";
import FeaturedTopics from "./FeaturedTopics";
import TestimonialCarousel from "./TestimonialCarousel";
import PlatformStats from "./PlatformStats";
import UpcomingWebinars from "./UpcomingWebinars";
import Team from "./Team";

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
     <Team/>
    </div>
  );
};

export default Home;

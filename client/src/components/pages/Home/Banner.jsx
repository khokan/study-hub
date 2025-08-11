import React from "react";
import { motion } from "motion/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white text-3xl"
    >
      <GrNext size={25} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white text-3xl"
    >
      <GrPrevious size={25} />
    </div>
  );
};
const slides = [
  {
    title: "Master Learning with Expert Tutors",
    subtitle:
      "Join live, instructor-led study sessions on diverse subjects. Learn directly from verified tutors with real-time guidance.",
    image: "https://i.ibb.co/xtXLjnJ9/pic3.jpg",
    buttonText: "Explore Sessions",
    buttonLink: "/sessions",
  },
  {
    title: "Boost Your Knowledge Anytime, Anywhere",
    subtitle:
      "Access materials, submit notes, and review your booked sessions—all from one platform designed for collaborative learning.",
    image: "https://i.ibb.co/tM78bVZW/pic4.jpg",
    buttonText: "Get Started Now",
    buttonLink: "/sessions",
  },
  {
    title: "Track Progress, Share Feedback, Learn Better",
    subtitle:
      "Rate sessions, review tutors, and grow with a system built to empower students and educators alike.",
    image: "https://i.ibb.co/m5T8FCYN/pic2.jpg",
    buttonText: "Join as Student",
    buttonLink: "/register",
  },
];

const BannerSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <section className="relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="h-[75vh] relative">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="w-full h-full bg-black/50 flex justify-center items-center text-center px-4">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-white space-y-6 px-10 xl:px-0"
                >
                  <h2 className="text-2xl md:text-5xl font-bold">
                    {slide.title}
                  </h2>
                  <p className="text-base md:text-xl">{slide.subtitle}</p>
                  <Link
                    to={slide.buttonLink}
                    className="flex items-center gap-2 justify-center text-base bg-primary text-white rounded-4xl border-0 font-medium py-4 px-6 hover:bg-blue-700 cursor-pointer max-w-[250px] mx-auto"
                  >
                    {slide.buttonText} <FaArrowRightLong />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default BannerSection;

import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { GrPrevious, GrNext } from "react-icons/gr";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Tamim Rahman",
    title: "Practical, helpful, and tutor support is amazing",
    image: "https://i.ibb.co/4wDRpJqh/user1.png",
    message:
      "The study sessions helped me clear my math concepts before exams. The tutors are supportive and make learning easy.",
  },
  {
    name: "Farhana Akter",
    title: "Well-structured sessions and interactive materials",
    image: "https://i.ibb.co/JRSqGMCc/user2.png",
    message:
      "I loved how organized everything was. Booking was easy, and the class schedule suited my daily routine perfectly.",
  },
  {
    name: "Zayed Hossain",
    title: "Great experience with live sessions and reviews",
    image: "https://i.ibb.co/Xh88xrW/user3.png",
    message:
      "Being able to review and rate sessions adds accountability. I gained confidence in programming thanks to these sessions.",
  },
  {
    name: "Rina Islam",
    title: "Accessible and perfect for busy learners",
    image: "https://i.ibb.co/LDT9xbcb/user4.png",
    message:
      "I could join evening sessions after work. Flexible learning like this makes a real difference in skill-building.",
  },
];

// Custom arrows
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer"
    >
      <GrNext size={18} />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute -left-8 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer"
    >
      <GrPrevious size={18} />
    </div>
  );
};

const TestimonialCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="bg-base-100 pt-12 pb-8  px-4 relative">
      <h2 className="text-center font-semibold text-primary mb-2">Student Feedback</h2>
      <p className="text-center text-base-content font-semibold text-xl lg:text-[36px] mb-6">
        What Learners Say About Us
      </p>
      <div className="max-w-6xl mx-auto px-4 relative">
        <Slider {...settings}>
          {testimonials.map((item, i) => (
            <div key={i} className="p-4 min-h-[280px]">
              <div className="h-full w-full bg-secondary-gray3 rounded-xl p-6 border border-base-300 flex flex-col justify-between text-center md:text-left shadow-sm hover:shadow-md transition"
               style={{
              transition: "box-shadow 0.3s ease",
            }}>
                <div>
                  <h3 className="font-semibold text-lg text-primary mb-3">{item.title}</h3>
                  <p className="text-secondary-gray5 text-sm mb-4">"{item.message}"</p>
                </div>
                <div className="flex items-center flex-col md:flex-row gap-3 mt-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-primary"
                  />
                  <div>
                    <p className="font-semibold text-secondary-gray6 mb-1">{item.name}</p>
                    <div className="flex text-yellow-400 gap-1 text-xs">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <FaStar key={idx} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialCarousel;

import toast from "react-hot-toast";
const UpcomingWebinars = () => {
    const webinars = [
        {
            id: 1,
            title: "Introduction to React",
            description: "Learn the basics of React, a popular JavaScript library for building user interfaces.",
            date: "2023-11-15",
            time: "10:00 AM - 11:00 AM",
        },
        {
            id: 2,
            title: "Advanced JavaScript Techniques",  
            description: "Dive deep into advanced JavaScript concepts and best practices.",
            date: "2023-11-20",
            time: "2:00 PM - 3:00 PM", 
        },
        {
            id: 3,
            title: "Building Scalable with Node.js",
            description: "Explore how to build scalable applications using Node.js and Express.",
            date: "2023-11-25",
            time: "1:00 PM - 2:00 PM",
        },
      
    ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-5 lg:py-8">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        Upcoming Webinars
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {webinars.length ? (
          webinars.map((webinar) => (
            <div
              key={webinar.id}
              className="bg-secondary-gray3 border border-base-300 dark:bg-secondary-black1 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
               style={{
              transition: "box-shadow 0.3s ease",
            }}
            >
              <h3 className="text-lg font-semibold text-secondary-black1 dark:text-white mb-2">
                {webinar.title}
              </h3>
              <p className="text-sm text-secondary-gray4 dark:text-secondary-gray5 mb-4">
                {webinar.description}
              </p>
              <p className="text-sm font-medium text-secondary-gray1 dark:text-secondary-gray5 mb-4">
                <span className="font-semibold">Date:</span> {webinar.date} |{" "}
                <span className="font-semibold">Time:</span> {webinar.time}
              </p>
              <button className="btn btn-primary w-full" onClick={() => toast.success("Registered for webinar!")}>
                <i className="fas fa-calendar-check mr-2"></i>
                Register
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-secondary-gray4 dark:text-secondary-gray5">
            No webinars scheduled yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default UpcomingWebinars;

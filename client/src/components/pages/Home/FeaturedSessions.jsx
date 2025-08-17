// src/pages/AllSessions.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FeaturedSessions = () => {
  const axiosSecure = useAxiosSecure();
  const currentDate = new Date();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["allAvailableSessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sessions?status=approved");
      return res.data;
    },
  });


  const featured = sessions.slice(0, 6);

return (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-3xl lg:text-4xl font-bold mb-10 text-center text-secondary-black1">
      Featured Study Sessions
    </h1>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featured.map((session) => {
        const regEnd = new Date(session.registrationEndDate);
        const isOngoing = currentDate < regEnd;

        return (
          <div
            key={session._id}
    className="bg-secondary-black1 rounded-2xl p-5 flex flex-col sm:flex-row lg:flex-col gap-4 
  shadow shadow-neutral-300 hover:shadow-neutral-400 
  dark:shadow-neutral-800 dark:hover:shadow-neutral-700 transition"
          >
           {/* Session Image */}
          <div className="relative w-full h-52 rounded-2xl overflow-hidden">
            <img
              src={
                session.registrationFee === 0
                  ? "https://i.ibb.co/xtXLjnJ9/pic3.jpg"
                  : "https://i.ibb.co/m5T8FCYN/pic2.jpg"
              }
              alt={session.sessionTitle}
              className="w-full h-full object-cover"
            />

            {/* Top Left Badge */}
            <div className="absolute top-3 left-3">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  isOngoing
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isOngoing ? "Ongoing" : "Closed"}
              </span>
            </div>

            {/* Top Right Badge */}
            <div className="absolute top-3 right-3">
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                {session.registrationFee === 0 ? "Free" : `$${session.registrationFee}`}
              </span>
            </div>
          </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-secondary-black1 mb-2">
                {session.sessionTitle}
              </h3>
              <p className="text-sm text-secondary-gray4 leading-relaxed mb-4 line-clamp-3">
                {session.sessionDescription}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <Link
                  to={`/sessions/${session._id}`}
                  className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-full transition"
                >
                  See Details
                </Link>
                <p className="text-sm text-secondary-gray1 font-medium">
                  <span className="text-secondary-gray4 font-semibold">Reg:</span>{" "}
                  <span className="font-semibold">
                    {session.registrationStartDate}
                  </span>{" "}
                  →{" "}
                  <span className="font-semibold">
                    {session.registrationEndDate}
                  </span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {sessions.length > 6 && (
      <div className="text-center mt-12">
        <Link
          to="/sessions"
          className="inline-block bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-6 py-3 rounded-full transition"
        >
          See More Sessions
        </Link>
      </div>
    )}
  </div>
);

};

export default FeaturedSessions;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaChalkboardTeacher } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TutorsList = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["tutorsInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors-info");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-primary mb-10">
        Meet Our Tutors
      </h1>

      {tutors.length === 0 ? (
        <p className="text-center text-secondary-gray1">No tutors found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor, idx) => (
            <div
              key={idx}
              className="border border-secondary-gray6 p-5 rounded-lg bg-white shadow hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaChalkboardTeacher className="text-3xl text-primary" />
                <div>
                  <h2 className="text-lg font-semibold text-secondary-black1">
                    {tutor.name}
                  </h2>
                  <p className="text-sm text-secondary-gray1">{tutor.email}</p>
                </div>
              </div>

              <div className="text-sm text-secondary-black2 space-y-1">
                <p>
                  <span className="font-medium">Total Sessions:</span>{" "}
                  {tutor.totalSessions || 0}
                </p>
                <p className="flex items-center gap-1">
                  <span className="font-medium">Avg Rating:</span>
                  <span className="text-yellow-500 flex items-center gap-1">
                    <FaStar className="inline" />
                    {tutor.averageRating || "0.0"}
                  </span>
                  <span className="text-secondary-gray5">
                    ({tutor.totalReviews} review{tutor.totalReviews !== 1 && "s"})
                  </span>
                </p>
              </div>

              {/* Optional: Enable when public profile is ready */}
              {/* <div className="mt-4">
                <Link
                  to={`/tutors/${tutor._id}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  View Profile
                </Link>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorsList;

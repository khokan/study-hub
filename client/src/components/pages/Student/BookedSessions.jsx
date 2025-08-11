import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const BookedSessions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["myBookedSessions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedSession?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading your sessions...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        My Booked Sessions
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t booked any sessions yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Session Title</th>
                <th>Tutor</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booked, idx) => (
                <tr key={booked._id}>
                  <td>{idx + 1}</td>
                  <td>{booked.sessionTitle || "Session Info Missing"}</td>
                  <td>{booked.tutorEmail}</td>
                  <td>${booked.registrationFee || 0}</td>
                  <td>
                    <span className="badge badge-outline badge-success">
                      {booked.registrationFee > 0 ? "Paid" : "Free"}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/sessions/${booked.sessionId}`}
                      className="btn btn-xs btn-info"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookedSessions;

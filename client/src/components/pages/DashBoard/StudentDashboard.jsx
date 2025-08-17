import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaChalkboardTeacher, FaEnvelope } from "react-icons/fa";

const StudentDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentDashboardSummary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/student-dashboard-summary?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (isError)
    return (
      <div className="text-red-500 text-center py-10">Failed to load data</div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-8">
        Student Dashboard
      </h1>

      {/* Profile + Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Profile Card */}
        <div className="bg-base-100 border rounded-md shadow p-6 flex flex-col sm:flex-row sm:items-center gap-6">
          <img
            src={data.profile?.image || user?.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border shadow"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-secondary-black1">
              {data.profile?.name || user?.displayName || "N/A"}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              <FaEnvelope className="inline mr-1" />
              {data.profile?.email || user?.email || "Not provided"}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              <FaUsers className="inline mr-1" />
              {data.profile?.role || "Student"}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              📞 {data.profile?.phone || "Not provided"}
            </p>
            
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-base-100 border rounded-md shadow p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-secondary-black1 mb-2">
            Total Enrolled Sessions
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-blue-600">
            {data.totalEnrollments}
          </p>
        </div>
      </div>

      {/* Enrolled Sessions Table */}
      <div className="overflow-x-auto bg-white rounded shadow border">
        <table className="table table-zebra w-full text-xs sm:text-sm">
          <thead className="bg-base-200 text-secondary-black1">
            <tr>
              <th>#</th>
              <th>Session Title</th>
              <th>Tutor</th>
              <th>Classmates</th>
            </tr>
          </thead>
          <tbody>
            {data.enrolledSessions.map((s, index) => (
              <tr key={s.sessionId}>
                <td>{index + 1}</td>
                <td>{s.sessionTitle}</td>
                <td>{s.tutor}</td>
                <td>
                  {s.classmates.length > 0 ? (
                    <ul className="list-disc ml-4">
                      {s.classmates.map((email, i) => (
                        <li key={i}>{email}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">No classmates yet</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;

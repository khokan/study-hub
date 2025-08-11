import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaChalkboardTeacher } from "react-icons/fa";

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
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        Student Dashboard
      </h1>

      {/* Summary Card */}
      <div className="bg-base-100 border rounded-md shadow p-6 mb-8 text-center">
        <h2 className="text-xl font-semibold text-secondary-black1 mb-2">
          Total Enrolled Sessions
        </h2>
        <p className="text-4xl font-bold text-blue-600">
          {data.totalEnrollments}
        </p>
      </div>

      {/* Enrolled Sessions Table */}
      <div className="overflow-x-auto bg-white rounded shadow border">
        <table className="table table-zebra w-full text-sm">
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

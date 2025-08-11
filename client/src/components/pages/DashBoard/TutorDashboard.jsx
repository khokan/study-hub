import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaClipboardList, FaUserGraduate, FaTimesCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TutorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tutorDashboard", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutor-dashboard-summary?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }

  const {
    totalStudents,
    totalSessions,
    approvedSessionsCount,
    enrollmentsPerSession,
    rejectedSessions,
  } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl lg:text-4xl font-bold text-center text-primary mb-10">
        Tutor Dashboard Overview
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard
          icon={<FaClipboardList className="text-blue-500 text-3xl" />}
          label="Total Sessions Created"
          count={totalSessions}
        />
        <StatCard
          icon={<FaClipboardList className="text-green-500 text-3xl" />}
          label="Approved Sessions"
          count={approvedSessionsCount}
        />
        <StatCard
          icon={<FaUserGraduate className="text-accent text-3xl" />}
          label="Total Enrolled Students"
          count={totalStudents}
        />
      </div>

      {/* Enrollments per Session */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200 mb-12">
        <h2 className="text-xl font-bold text-center text-secondary-black1 p-4">
          Enrollments Per Session
        </h2>
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-base-200 text-secondary-black1">
            <tr>
              <th>#</th>
              <th>Session Title</th>
              <th>Enrollment Count</th>
            </tr>
          </thead>
          <tbody>
            {enrollmentsPerSession.length > 0 ? (
              enrollmentsPerSession.map((session, idx) => (
                <tr key={session.sessionId}>
                  <td>{idx + 1}</td>
                  <td>{session.sessionTitle}</td>
                  <td>{session.enrollmentCount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No approved sessions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rejected Sessions */}
      <div className="bg-white rounded-xl shadow border border-gray-200">
        <h2 className="text-xl font-bold text-center text-secondary-black1 p-4">
          Rejected Sessions & Feedback
        </h2>
        {rejectedSessions.length === 0 ? (
          <p className="text-center text-secondary-gray4 py-6">
            No rejected sessions.
          </p>
        ) : (
          <div className="p-6 space-y-4">
            {rejectedSessions.map((session, idx) => (
              <div
                key={session.sessionId}
                className="border border-secondary-gray5 rounded-lg p-4 bg-base-100 shadow-sm"
              >
                <h4 className="text-lg font-semibold text-primary mb-1 flex items-center gap-2">
                  <FaTimesCircle className="text-red-500" />{" "}
                  {session.sessionTitle}
                </h4>
                <p className="text-sm text-secondary-black2">
                  <strong>Rejection Reason:</strong>{" "}
                  <span className="text-red-600">
                    {session.rejectionReason}
                  </span>
                </p>
                <p className="text-sm text-secondary-black2">
                  <strong>Admin Feedback:</strong> {session.adminFeedback}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, count }) => (
  <div className="card bg-base-100 shadow-md border border-gray-200">
    <div className="card-body items-center text-center">
      <div className="mb-2">{icon}</div>
      <h3 className="text-2xl font-bold text-primary">{count}</h3>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  </div>
);

export default TutorDashboard;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardList,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard-summary");
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

  const { totalStudents, totalTutors, totalSessions, enrollmentsPerSession } =
    data;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-primary mb-10">
          Admin Dashboard Overview
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon={<FaUserGraduate className="text-secondary text-3xl" />}
            label="Total Students"
            count={totalStudents}
          />
          <StatCard
            icon={<FaChalkboardTeacher className="text-accent text-3xl" />}
            label="Total Tutors"
            count={totalTutors}
          />
          <StatCard
            icon={<FaClipboardList className="text-blue-500 text-3xl" />}
            label="Total Sessions"
            count={totalSessions}
          />
        </div>

        {/* Sessions Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="table table-zebra">
            <thead className="bg-base-200 text-secondary-black1 text-sm">
              <tr>
                <th>#</th>
                <th>Session Title</th>
                <th>Enrollment Count</th>
              </tr>
            </thead>
            <tbody>
              {enrollmentsPerSession.map((session, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{session.sessionTitle}</td>
                  <td>{session.enrollmentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
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

export default AdminDashboard;

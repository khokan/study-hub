import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardList,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

// ✅ Profile Card Component
const ProfileCard = ({ admin }) => {
   const { user } = useAuth();
  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Profile Card */}
            <div className="bg-base-100 border rounded-md shadow p-6 flex flex-col sm:flex-row sm:items-center gap-6">
              <img
                src={admin?.image || user?.photoURL || "/default-avatar.png"}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border shadow"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold text-secondary-black1">
                  {admin?.name || admin?.displayName || "N/A"}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  <FaEnvelope className="inline mr-1" />
                  {admin?.email || "Not provided"}
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  <FaUsers className="inline mr-1" />
                  {admin?.role || "Student"}
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  📞 {admin?.phone || "Not provided"}
                </p>
                
              </div>
            </div>
    
            {/* Summary Card */}
            {/* <div className="bg-base-100 border rounded-md shadow p-6 flex flex-col items-center justify-center text-center">
              <h2 className="text-lg sm:text-xl font-semibold text-secondary-black1 mb-2">
                Total Enrolled Sessions
              </h2>
              <p className="text-3xl sm:text-4xl font-bold text-blue-600">
                {data.totalEnrollments}
              </p>
            </div> */}
          </div>
    
  );
};

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard-summary");
      return res.data;
    },
  });

  const { data: adminProfile, isLoading: loadingProfile } = useQuery({
  queryKey: ["adminProfile"],
  queryFn: async () => {
    const res = await axiosSecure.get("/profile");
    return res.data;
  },
});


  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500 font-medium">
        Failed to load dashboard data.
      </div>
    );
  }

  const { totalStudents, totalTutors, totalSessions, enrollmentsPerSession } =
    data;

  // Custom tick for XAxis
  const CustomXAxisTick = ({ x, y, payload }) => {
    const words = payload.value.split(" ");
    return (
      <text
        x={x}
        y={y + 10}
        textAnchor="middle"
        fontSize={12}
        fill="#374151"
        title={payload.value}
      >
        {words.map((word, index) => (
          <tspan x={x} dy={index === 0 ? 0 : 14} key={index}>
            {word}
          </tspan>
        ))}
      </text>
    );
  };
  console.log("Admin Dashboard Data:", data);
  return (
    <div className="w-full px-6 py-10">
      <h1 className="text-3xl lg:text-4xl font-bold text-center text-primary mb-10">
        Admin Dashboard Overview
      </h1>

      <div className="mb-10 max-w-4xl mx-auto">
      <ProfileCard admin={adminProfile} className="mb-10"/>
     </div> 
      {/* 🔹 Profile + Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">

        {/* Stat cards (4 cols on lg, full width on small) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:col-span-4">
          <StatCard
            icon={<FaUserGraduate className="text-blue-500 text-3xl" />}
            label="Total Students"
            count={totalStudents}
          />
          <StatCard
            icon={<FaChalkboardTeacher className="text-green-500 text-3xl" />}
            label="Total Tutors"
            count={totalTutors}
          />
          <StatCard
            icon={<FaClipboardList className="text-purple-500 text-3xl" />}
            label="Total Sessions"
            count={totalSessions}
          />
          <StatCard
            icon={<FaClipboardList className="text-orange-500 text-3xl" />}
            label="Active Courses"
            count={Math.floor(totalSessions / 2)}
          />
        </div>
      </div>

      {/* 🔹 Sessions Table */}
      <div className="bg-white rounded-xl shadow border border-gray-200 mb-10 overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-secondary-black1 text-sm">
            <tr>
              <th className="w-12">#</th>
              <th>Session Title</th>
              <th>Enrollment Count</th>
            </tr>
          </thead>
          <tbody>
            {enrollmentsPerSession.map((session, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <td>{idx + 1}</td>
                <td>{session.sessionTitle}</td>
                <td>{session.enrollmentCount}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Bar Chart */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-secondary-black1 mb-4">
          Enrollments per Session
        </h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={enrollmentsPerSession}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="sessionTitle" interval={0} tick={<CustomXAxisTick />} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip
                cursor={{ fill: "rgba(0, 87, 184, 0.1)" }}
                wrapperStyle={{ outline: "none" }}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Bar dataKey="enrollmentCount" fill="#0057b8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};


/* 🔹 Stat Card Component */
const StatCard = ({ icon, label, count }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="card bg-base-100 shadow-md border border-gray-200 hover:shadow-lg"
  >
    <div className="card-body items-center text-center">
      <div className="mb-2">{icon}</div>
      <h3 className="text-2xl font-bold text-primary">{count}</h3>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  </motion.div>
);

export default AdminDashboard;

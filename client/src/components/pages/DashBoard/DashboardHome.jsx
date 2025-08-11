import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import TutorDashboard from "./TutorDashboard";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";
import Forbidden from "../shared/Forbidden";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (role === "tutor") {
    return <TutorDashboard />;
  } else if (role === "student") {
    return <StudentDashboard />;
  } else if (role === "admin") {
    return <AdminDashboard />;
  } else {
    return <Forbidden />;
  }
};

export default DashboardHome;

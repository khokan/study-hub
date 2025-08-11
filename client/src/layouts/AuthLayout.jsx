import React from "react";
import { Outlet } from "react-router";
import authImg from "../assets/signup-studyhub.JPG";
import StudyHubLogo from "../components/pages/shared/StudyHubLogo";

const AuthLayout = () => {
  return (
    <div className="p-12 bg-base-200">
      <div>
        <StudyHubLogo />
      </div>
      <div className="hero-content flex-col  lg:flex-row-reverse">
        <div className="flex-1">
          <img
            src={authImg}
            className="max-w-sm text-left rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

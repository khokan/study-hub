import React, { useState } from "react";
import UseAuth from "../hooks/useAuth";
import { Outlet, useNavigation } from "react-router";
import PageLoader from "../components/PageLoader";
import useAuth from "../hooks/useAuth";
import NavBar from "../components/pages/shared/Navbar";
import Footer from "../components/pages/shared/Footer";

const MainLayout = () => {
  const { loading } = useAuth();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // 🔹 Theme state moved here
  const [darkMode, setDarkMode] = useState(true);

  if (loading || isLoading) {
    return <PageLoader />;
  }

  return (
    <div
      data-theme={darkMode ? "dark" : "light"} 
      className="flex flex-col min-h-screen"
    >
      {/* Pass darkMode + setDarkMode to Navbar */}
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;

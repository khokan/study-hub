import React from "react";
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
	if (loading || isLoading) {
		return <PageLoader />;
	}
	return (
		<>
			<NavBar></NavBar>
			<div className="min-h-screen">
				<Outlet></Outlet>
			</div>
			<Footer></Footer>
		</>
	);
};

export default MainLayout;

import React from "react";
import { HashLoader } from "react-spinners";

const PageLoader = () => {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<HashLoader size={60} color="#0975DE" />
		</div>
	);
};

export default PageLoader;

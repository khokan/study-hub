// components/Loading.jsx
import { FaTruckLoading } from "react-icons/fa";
import PageLoader from "../../PageLoader";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-base-100 text-center px-4">
      {/* Animated truck icon */}
      <div className="animate-bounce text-primary text-6xl mb-4">
        <PageLoader />
      </div>

      {/* Main message */}
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Hang tight! We're loading your sessions...
      </h2>
    </div>
  );
};

export default Loading;

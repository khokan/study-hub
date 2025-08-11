// src/pages/AllSessions.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SessionsAll = () => {
  const axiosSecure = useAxiosSecure();
  const currentDate = new Date();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["allAvailableSessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sessions?status=approved");
      return res.data;
    },
  });

  // Pagination logic
  const totalPages =
    itemsPerPage === "all" ? 1 : Math.ceil(sessions.length / itemsPerPage);
  const startIndex =
    (currentPage - 1) *
    (itemsPerPage === "all" ? sessions.length : itemsPerPage);
  const endIndex =
    itemsPerPage === "all" ? sessions.length : startIndex + itemsPerPage;
  const filteredSessions = sessions.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-[95%] md:max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl lg:text-4xl font-bold mb-10 text-center text-secondary-black1">
        All Available Study Sessions
      </h1>

      {/* Sessions Grid */}
      {isLoading ? (
        <div className="text-center py-16">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session) => {
            const regEnd = new Date(session.registrationEndDate);
            const isOngoing = currentDate < regEnd;

            return (
              <div
                key={session._id}
                className="bg-white rounded-2xl p-5 flex flex-col sm:flex-row lg:flex-col gap-4 border border-secondary-gray6 shadow-sm hover:shadow-md transition"
              >
                {/* Image */}
                <div className="relative w-full h-48 sm:w-40 sm:h-40 lg:w-full lg:h-48 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={
                      session.registrationFee === 0
                        ? "https://i.ibb.co/xtXLjnJ9/pic3.jpg"
                        : "https://i.ibb.co/m5T8FCYN/pic2.jpg"
                    }
                    alt={session.sessionTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 flex gap-2 flex-wrap">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        isOngoing
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {isOngoing ? "Ongoing" : "Closed"}
                    </span>
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                      {session.registrationFee === 0
                        ? "Free"
                        : `$${session.registrationFee}`}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-secondary-black1 mb-2">
                    {session.sessionTitle}
                  </h3>
                  <p className="text-sm text-secondary-gray4 mb-4 line-clamp-4">
                    {session.sessionDescription}
                  </p>
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <Link
                      to={`/sessions/${session._id}`}
                      className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-2 rounded-full transition"
                    >
                      Read More
                    </Link>
                    <p className="text-sm text-secondary-gray1 font-medium">
                      <span className="text-secondary-gray4 font-semibold">
                        {session.registrationFee === 0
                          ? "Free"
                          : `$${session.registrationFee}`}
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Items Per Page Selector */}
        <div className="flex items-center gap-2">
          <select
            id="perPageSelect"
            value={itemsPerPage}
            onChange={(e) =>
              setItemsPerPage(
                e.target.value === "all" ? "all" : parseInt(e.target.value)
              )
            }
            className="select select-sm select-bordered"
          >
            <option value="6">9</option>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="all">All</option>
          </select>
        </div>

        {/* Page Navigation */}
        {itemsPerPage !== "all" && totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            <button
              className="btn btn-sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`btn btn-sm ${
                  currentPage === i + 1
                    ? "bg-primary text-white border-primary"
                    : "bg-base-200 text-black border border-base-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsAll;

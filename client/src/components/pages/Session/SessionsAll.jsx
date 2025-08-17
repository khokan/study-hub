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

  const [sortOrder, setSortOrder] = useState('title-asc');

  return (
  <div className="max-w-7xl mx-auto px-4 py-12">
  <h1 className="text-3xl lg:text-4xl font-bold mb-10 text-center text-secondary-black1">
    All Available Study Sessions
  </h1>

  {/* Sort Controls */}
  <div className="flex justify-end mb-6">
    <div className="flex items-center gap-2">
      <span className="text-sm text-secondary-gray4 whitespace-nowrap">Sort by:</span>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="select select-sm select-bordered"
      >
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="date-asc">Date (Oldest)</option>
        <option value="date-desc">Date (Newest)</option>
        <option value="fee-asc">Fee (Low to High)</option>
        <option value="fee-desc">Fee (High to Low)</option>
      </select>
    </div>
  </div>

  {/* Sessions Grid */}
  {isLoading ? (
    <div className="text-center py-12">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  ) : (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSessions
        .sort((a, b) => {
          switch (sortOrder) {
            case 'title-asc':
              return a.sessionTitle.localeCompare(b.sessionTitle);
            case 'title-desc':
              return b.sessionTitle.localeCompare(a.sessionTitle);
            case 'date-asc':
              return new Date(a.registrationStartDate) - new Date(b.registrationStartDate);
            case 'date-desc':
              return new Date(b.registrationStartDate) - new Date(a.registrationStartDate);
            case 'fee-asc':
              return a.registrationFee - b.registrationFee;
            case 'fee-desc':
              return b.registrationFee - a.registrationFee;
            default:
              return 0;
          }
        })
        .map((session) => {
          const regEnd = new Date(session.registrationEndDate);
          const isOngoing = currentDate < regEnd;

          return (
            <div
              key={session._id}
              className="bg-secondary-black1 rounded-2xl p-5 flex flex-col sm:flex-row lg:flex-col gap-4 
                shadow shadow-neutral-300 hover:shadow-neutral-400 
                dark:shadow-neutral-800 dark:hover:shadow-neutral-700 transition"
            >
              {/* Session Image */}
              <div className="relative w-full h-52 rounded-2xl overflow-hidden">
                <img
                  src={
                    session.registrationFee === 0
                      ? "https://i.ibb.co/xtXLjnJ9/pic3.jpg"
                      : "https://i.ibb.co/m5T8FCYN/pic2.jpg"
                  }
                  alt={session.sessionTitle}
                  className="w-full h-full object-cover"
                />

                {/* Top Left Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      isOngoing
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isOngoing ? "Ongoing" : "Closed"}
                  </span>
                </div>

                {/* Top Right Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                    {session.registrationFee === 0 ? "Free" : `$${session.registrationFee}`}
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
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <Link
                    to={`/sessions/${session._id}`}
                    className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-2 rounded-full transition"
                  >
                    Read More
                  </Link>
                  <p className="text-sm text-secondary-gray1 font-medium">
                    <span className="text-secondary-gray4 font-semibold">Reg:</span>{" "}
                    <span className="font-semibold">
                      {session.registrationStartDate}
                    </span>{" "}
                    →{" "}
                    <span className="font-semibold">
                      {session.registrationEndDate}
                    </span>
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
        <option value="6">6</option>
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
                ? "bg-primary text-secondary-black1 border-primary"
                : "bg-base-200 text-secondary-black1 border border-base-300"
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

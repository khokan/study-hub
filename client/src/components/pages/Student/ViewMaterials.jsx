import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ViewMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // 1. Fetch booked sessions
  const { data: bookedSessions = [], isLoading: loadingSessions } = useQuery({
    queryKey: ["bookedSessions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedSession?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // 2. Fetch materials when session is selected
  const { data: materials = [], isLoading: loadingMaterials } = useQuery({
    queryKey: ["materials", selectedSessionId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/materials?sessionId=${selectedSessionId}`
      );
      return res.data;
    },
    enabled: !!selectedSessionId,
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Study Materials</h2>

      {loadingSessions ? (
        <div className="text-center">Loading sessions...</div>
      ) : bookedSessions.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not booked any sessions.
        </p>
      ) : (
        <>
          <div className="mb-6">
            <label className="font-semibold mr-2">Select a Session:</label>
            <select
              onChange={(e) => setSelectedSessionId(e.target.value)}
              className="select select-bordered w-full max-w-md"
              defaultValue=""
            >
              <option value="" disabled>
                Choose a session
              </option>
              {bookedSessions.map((s) => (
                <option key={s.sessionId} value={s.sessionId}>
                  {s.sessionTitle}
                </option>
              ))}
            </select>
          </div>

          {loadingMaterials ? (
            <div className="text-center">Loading materials...</div>
          ) : materials.length === 0 && selectedSessionId ? (
            <p className="text-center text-gray-500">
              No materials found for this session.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {materials.map((mat) => (
                <div
                  key={mat._id}
                  className="border p-4 rounded bg-base-100 shadow-sm"
                >
                  <h4 className="font-semibold mb-2">{mat.title}</h4>
                  <img
                    src={mat.image}
                    alt={mat.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <div className="flex justify-between items-center">
                    <a
                      href={mat.driveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm link link-primary"
                    >
                      Google Drive Link
                    </a>
                    <a
                      href={mat.image}
                      target="_blank"
                      download
                      className="btn btn-xs btn-outline"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewMaterials;

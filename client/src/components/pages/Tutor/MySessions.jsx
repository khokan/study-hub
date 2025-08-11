import React from "react";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";

const formatDate = (dateStr) => {
  try {
    return format(new Date(dateStr), "dd-MMM-yyyy");
  } catch {
    return "Invalid Date";
  }
};

const MySessions = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["myStudySessions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleResendApproval = async (sessionId) => {
    try {
      const { data: session } = await axiosSecure.get(`/sessions/${sessionId}`);

      if (session.status !== "rejected") {
        return Swal.fire(
          "Not Rejected",
          "This session is not rejected.",
          "info"
        );
      }

      const confirm = await Swal.fire({
        title: "Resend for Approval?",
        html: `
          <p class="text-left text-sm">
            <strong>Rejection Reason:</strong> ${
              session.rejectionReason || "N/A"
            }<br/>
            <strong>Admin Feedback:</strong> ${
              session.feedback || "N/A"
            }<br/><br/>
            This will change the session status to <b>pending</b>.
          </p>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Resend",
      });

      if (confirm.isConfirmed) {
        await axiosSecure.patch(`/sessions/${sessionId}/reset-status`);
        Swal.fire("Success", "Approval request resent!", "success");
        queryClient.invalidateQueries(["myStudySessions"]);
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-secondary-gray1">
        Loading your sessions...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-primary text-center mb-6">
        My Study Sessions
      </h1>

      {sessions.length === 0 ? (
        <p className="text-center text-secondary-gray1">
          No study sessions created yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg border border-secondary-gray6">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-secondary-gray3 text-secondary-black1">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Reg. Start</th>
                <th>Reg. End</th>
                <th>Class Start</th>
                <th>Class End</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={session._id} className="hover:bg-secondary-gray3/50">
                  <td>{index + 1}</td>
                  <td className="font-medium text-primary">
                    {session.sessionTitle}
                  </td>
                  <td>{formatDate(session.registrationStartDate)}</td>
                  <td>{formatDate(session.registrationEndDate)}</td>
                  <td>{formatDate(session.classStartDate)}</td>
                  <td>{formatDate(session.classEndDate)}</td>
                  <td>{session.sessionDuration || "N/A"}</td>
                  <td>
                    <span
                      className={`badge text-white text-xs capitalize ${
                        session.status === "approved"
                          ? "bg-green-500"
                          : session.status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {session.status}
                    </span>
                  </td>
                  <td>
                    {session.status === "rejected" ? (
                      <button
                        onClick={() => handleResendApproval(session._id)}
                        className="btn btn-xs bg-primary hover:bg-primary/90 text-white cursor-pointer"
                      >
                        Resend
                      </button>
                    ) : (
                      <span className="text-secondary-gray1 text-xs italic">
                        N/A
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySessions;

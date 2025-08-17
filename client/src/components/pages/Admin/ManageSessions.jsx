// 📁 client/src/pages/admin/ManageSessions.jsx

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";

const ManageSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [editingSession, setEditingSession] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // default items per page

  const totalPages = Math.ceil(sessions.length / itemsPerPage);
  const paginatedSessions = sessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const axiosSecure = useAxiosSecure();

  const fetchSessions = async () => {
    try {
      const res = await axiosSecure.get("/sessions");
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleUpdate = (session) => {
    setEditingSession(session);
    document.getElementById("update_modal").showModal();
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      sessionTitle: form.sessionTitle.value,
      sessionDescription: form.sessionDescription.value,
      registrationStartDate: form.registrationStartDate.value,
      registrationEndDate: form.registrationEndDate.value,
      classStartDate: form.classStartDate.value,
      classEndDate: form.classEndDate.value,
      sessionDuration: form.duration.value,
      registrationFee: parseFloat(form.registrationFee.value),
    };

    try {
      await axiosSecure.put(`/sessions/${editingSession._id}`, updatedData);
      fetchSessions();
      setEditingSession(null);
      document.getElementById("update_modal").close();
      Swal.fire("Success", "Session updated successfully", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleReject = async (id) => {
    const { value: formValues } = await Swal.fire({
      title: "Reject Session",
      html:
        '<input id="reason" class="swal2-input" style="width: 80%;" placeholder="Rejection reason (required)">' +
        '<textarea id="feedback" class="swal2-textarea" placeholder="Optional feedback"></textarea>',
      focusConfirm: false,
      preConfirm: () => {
        const reason = document.getElementById("reason").value;
        const feedback = document.getElementById("feedback").value;
        if (!reason) {
          Swal.showValidationMessage("Rejection reason is required");
          return;
        }
        return { rejectionReason: reason, feedback };
      },
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (!formValues) return;

    try {
      await axiosSecure.patch(`/sessions/${id}/status`, {
        ...formValues,
        action: "reject",
      });
      Swal.fire("Rejected", "Session rejected.", "success");
      fetchSessions();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to reject",
        "error"
      );
    }
  };

  const handleApprove = async (session) => {
    const { value: result } = await Swal.fire({
      title: "Approve Study Session",
      html: `
      <label class="block mb-1 text-left">Is the session free or paid?</label>
      <select id="sessionType" class="swal2-select" style="width: 80%;">
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>
      <label class="block mt-4 mb-1 text-left">Enter fee amount (if paid)</label>
      <input id="feeAmount" type="number" class="swal2-input" value="0" min="0" />
    `,
      focusConfirm: false,
      preConfirm: () => {
        const sessionType = document.getElementById("sessionType").value;
        const fee = parseFloat(document.getElementById("feeAmount").value);
        if (sessionType === "paid" && (isNaN(fee) || fee <= 0)) {
          Swal.showValidationMessage("Please enter a valid fee greater than 0");
          return;
        }
        return {
          registrationFee: sessionType === "free" ? 0 : fee,
        };
      },
      showCancelButton: true,
      confirmButtonText: "Approve",
    });

    if (!result) return;

    try {
      await axiosSecure.patch(`/sessions/${session._id}/status`, {
        registrationFee: result.registrationFee,
        action: "approve",
      });
      Swal.fire("Approved!", "Session approved successfully.", "success");
      fetchSessions();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to approve session",
        "error"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete session?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/sessions/${id}`);
      Swal.fire("Deleted", "Session deleted successfully", "success");
      fetchSessions();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to delete",
        "error"
      );
    }
  };

  return (
    <div className="p-6 max-w-8xl mx-auto ">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Manage Study Sessions
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm sm:text-base">
          <thead className="bg-secondary-gray2 text-secondary-black2">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Tutor</th>
              <th>Status</th>
              <th>Registration End</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-secondary-black2">
            {paginatedSessions.map((s, index) => (
              <tr key={s._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{s.sessionTitle}</td>
                <td>{s.tutor.tutorEmail}</td>
                <td>
                  <span
                    className={`badge capitalize ${
                      s.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : s.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td
                  className={
                    new Date(s.registrationEndDate) < new Date()
                      ? "text-red-600 font-semibold text-sm"
                      : ""
                  }
                >
                  {format(new Date(s.registrationEndDate), "dd-MMM-yyyy")}
                </td>

                <td>${s.registrationFee || 0}</td>
                <td className="space-x-2">
                  {s.status === "pending" ? (
                    <>
                      <button
                        className="btn btn-xs bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                        onClick={() => handleApprove(s)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-xs bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                        onClick={() => handleReject(s._id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : s.status === "approved" ? (
                    <>
                      <button
                        className="btn btn-xs bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                        onClick={() => handleUpdate(s)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-xs bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                        onClick={() => handleDelete(s._id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <div
                      className="tooltip"
                      data-tip={s.rejectionReason || "No reason given"}
                    >
                      <button className="btn btn-xs btn-disabled text-xs cursor-not-allowed">
                        Rejected
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sessions.length === 0 && (
          <p className="text-center text-secondary-gray1 mt-4">
            No sessions available.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-center  p-2 items-center mt-6 space-y-4 sm:space-y-0">
        {/* Page Navigation */}
        <div className="join">
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`join-item btn btn-sm ${
                currentPage === idx + 1 ? "btn-primary text-white" : ""
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

        {/* Items Per Page Selector */}
        <div className="flex items-center space-x-2">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1); // reset to first page
            }}
            className="select select-sm select-bordered"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box max-w-3xl w-full bg-white rounded-xl shadow border border-secondary-gray6">
          <h3 className="text-2xl font-bold text-primary text-center mb-6">
            Update Study Session
          </h3>

          <form
            onSubmit={submitUpdate}
            className="space-y-5 text-sm text-secondary-black2"
          >
            {/* Session Title */}
            <div>
              <input
                name="sessionTitle"
                defaultValue={editingSession?.sessionTitle}
                className="input input-bordered w-full"
                placeholder="Session Title"
                required
              />
            </div>

            {/* Session Description */}
            <div>
              <textarea
                name="sessionDescription"
                defaultValue={editingSession?.sessionDescription}
                className="textarea textarea-bordered w-full"
                placeholder="Session Description"
                required
              />
            </div>

            {/* Registration Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-secondary-gray4 mb-1 block">
                  Registration Start
                </label>
                <input
                  type="date"
                  name="registrationStartDate"
                  defaultValue={editingSession?.registrationStartDate?.substring(
                    0,
                    10
                  )}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-secondary-gray4 mb-1 block">
                  Registration End
                </label>
                <input
                  type="date"
                  name="registrationEndDate"
                  defaultValue={editingSession?.registrationEndDate?.substring(
                    0,
                    10
                  )}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Class Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-secondary-gray4 mb-1 block">
                  Class Start
                </label>
                <input
                  type="date"
                  name="classStartDate"
                  defaultValue={editingSession?.classStartDate?.substring(
                    0,
                    10
                  )}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-secondary-gray4 mb-1 block">
                  Class End
                </label>
                <input
                  type="date"
                  name="classEndDate"
                  defaultValue={editingSession?.classEndDate?.substring(0, 10)}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Session Duration */}
            <div>
              <input
                name="duration"
                defaultValue={editingSession?.sessionDuration}
                className="input input-bordered w-full"
                placeholder="Session Duration (e.g. 2 weeks)"
                required
              />
            </div>

            {/* Registration Fee */}
            <div>
              <input
                name="registrationFee"
                type="number"
                min="0"
                defaultValue={editingSession?.registrationFee}
                className="input input-bordered w-full"
                placeholder="Registration Fee (USD)"
                required
              />
            </div>

            {/* Modal Actions */}
            <div className="modal-action justify-end space-x-2">
              <button
                type="submit"
                className="btn bg-primary hover:bg-primary/90 text-white cursor-pointer"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("update_modal").close()}
                className="btn border border-gray-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageSessions;

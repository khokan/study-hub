import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageNotes = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  const { data: notes = [], refetch } = useQuery({
    queryKey: ["myNotes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notes?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This note will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/notes/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Note has been deleted.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleEdit = (note) => {
    setEditingNoteId(note._id);
    setEditData({ title: note.title, description: note.description });
  };

  const handleUpdate = async () => {
    try {
      const res = await axiosSecure.put(`/notes/${editingNoteId}`, editData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated", "Note updated successfully", "success");
        setEditingNoteId(null);
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Your Notes</h2>
      {notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes found.</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="border p-4 rounded bg-base-100 shadow"
            >
              {editingNoteId === note._id ? (
                <>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="input input-bordered mb-2 w-full"
                  />
                  <textarea
                    rows={4}
                    value={editData.description}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="textarea textarea-bordered w-full"
                  ></textarea>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={handleUpdate}
                      className="btn btn-success btn-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingNoteId(null)}
                      className="btn btn-outline btn-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-lg">{note.title}</h3>
                  <p className="text-sm text-gray-700">{note.description}</p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageNotes;

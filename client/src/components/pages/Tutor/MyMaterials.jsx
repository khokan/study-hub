import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    driveLink: "",
    image: "",
  });

  const { data: materials = [], refetch } = useQuery({
    queryKey: ["tutorMaterials"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This material will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/materials/${id}`);
        if (res.data.message === "Deleted") {
          Swal.fire("Deleted!", "Material has been removed.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleEditClick = (material) => {
    setEditingId(material._id);
    setFormData({
      title: material.title,
      driveLink: material.driveLink,
      image: material.image,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await axiosSecure.put(`/materials/${editingId}`, formData);
      if (res.data) {
        Swal.fire("Updated!", "Material updated successfully.", "success");
        setEditingId(null);
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-primary mb-4 text-center">
        My Uploaded Materials
      </h1>

      {materials.length === 0 ? (
        <p className="text-center text-secondary-gray1">
          No materials uploaded yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((mat, index) => (
            <div
              key={mat._id}
              className="border p-4 rounded-lg bg-base-100 shadow-sm relative"
            >
              {/* Editable Title */}
              {editingId === mat._id ? (
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="input input-sm input-bordered w-full mb-2"
                />
              ) : (
                <h4 className="font-semibold text-lg text-primary mb-2">
                  {mat.title}
                </h4>
              )}

              {/* Editable Image or Display */}
              {editingId === mat._id ? (
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="input input-sm input-bordered w-full mb-2"
                  placeholder="Image URL"
                />
              ) : (
                <img
                  src={mat.image}
                  alt={mat.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              {/* Editable Drive Link or Display */}
              {editingId === mat._id ? (
                <input
                  type="url"
                  value={formData.driveLink}
                  onChange={(e) =>
                    setFormData({ ...formData, driveLink: e.target.value })
                  }
                  className="input input-sm input-bordered w-full mb-3"
                  placeholder="Google Drive Link"
                />
              ) : (
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
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                {editingId === mat._id ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="btn btn-xs bg-green-600 hover:bg-green-700 text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn btn-xs border text-secondary-black2 hover:bg-secondary-gray2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(mat)}
                      className="btn btn-xs bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(mat._id)}
                      className="btn btn-xs bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMaterials;

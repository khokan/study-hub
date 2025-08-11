// 📁 components/dashboard/admin/AdminManageMaterials.jsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageMaterials = () => {
  const axiosSecure = useAxiosSecure();

  const { data: materials = [], refetch } = useQuery({
    queryKey: ["allMaterials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/materials");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Material?",
      text: "Are you sure you want to delete this material?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/materials/${id}`);
        if (res.data?.message === "Deleted") {
          Swal.fire("Deleted!", "Material has been removed.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Manage Study Materials
      </h2>

      {materials.length === 0 ? (
        <p className="text-center text-secondary-gray1">
          No materials available.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-secondary-gray2 text-secondary-black2">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Tutor Email</th>
                <th>Drive Link</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((mat, index) => (
                <tr key={mat._id} className="hover:bg-secondary-gray3/40">
                  <td>{index + 1}</td>
                  <td className="font-medium">{mat.title}</td>
                  <td>{mat.tutorEmail}</td>
                  <td>
                    <a
                      href={mat.driveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      Drive
                    </a>
                  </td>
                  <td>
                    <img
                      src={mat.image}
                      alt="Material"
                      className="w-16 h-10 object-cover rounded shadow"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(mat._id)}
                      className="btn btn-xs btn-error cursor-pointer"
                    >
                      Delete
                    </button>
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

export default ManageMaterials;

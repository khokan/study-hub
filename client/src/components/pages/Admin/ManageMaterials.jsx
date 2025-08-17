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

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/materials/${id}`);
      if (res.data?.message === "Deleted") {
        Swal.fire("Deleted!", "Material has been removed.", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Manage Study Materials
      </h2>

      {materials.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">
          No materials available.
        </p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="table w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Tutor</th>
                <th className="px-3 py-2">Drive</th>
                <th className="px-3 py-2">Image</th>
                <th className="px-3 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {materials.map((mat, index) => (
                <tr
                  key={mat._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-3 py-2 text-xs text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-800">
                    {mat.title}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">
                    {mat.tutorEmail}
                  </td>
                  <td className="px-3 py-2">
                    <a
                      href={mat.driveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      Open
                    </a>
                  </td>
                  <td className="px-3 py-2">
                    <img
                      src={mat.image}
                      alt="Material"
                      className="w-14 h-10 object-cover rounded border shadow-sm"
                    />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => handleDelete(mat._id)}
                      className="px-2 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600 transition"
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

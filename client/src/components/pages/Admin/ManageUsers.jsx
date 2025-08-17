import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const fetchUsers = async (query = "") => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/users?search=${query}`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(search);
  };

  const updateRole = async (userId, newRole) => {
    const confirm = await Swal.fire({
      title: "Update Role",
      text: `Are you sure you want to make this user a ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
      Swal.fire("Success", "User role updated", "success");
      fetchUsers(search);
    } catch (err) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  // Check if row belongs to current logged-in admin
  const isCurrentUser = (userEmail) => user?.email === userEmail;

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Manage Users</h2>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Search by name or email"
          className="w-full sm:max-w-xs px-4 py-2 rounded-md border border-secondary-gray6 focus:outline-none focus:ring-2 focus:ring-primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2 rounded-md transition cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto bg-white border border-secondary-gray6 rounded-md">
        <table className="table w-full text-sm text-left">
          <thead className="bg-secondary-gray3 text-secondary-black1 text-sm tracking-wide">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Current Role</th>
              <th className="px-4 py-3 text-center">Update Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-gray2">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-8">
                  <span className="loading loading-spinner loading-md text-primary"></span>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-secondary-gray5"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr
                  key={u._id}
                  className="hover:bg-secondary-gray3/40 transition"
                >
                  <td className="px-4 py-3 font-medium text-secondary-gray4">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-secondary-black2">{u.name}</td>
                  <td className="px-4 py-3 text-secondary-gray1">{u.email}</td>
                  <td className="px-4 py-3 capitalize">{u.role}</td>
                  <td className="px-4 py-3 space-x-2 text-center">
                    {u.role !== "student" && (
                      <RoleButton
                        label="Make Student"
                        color="btn-info"
                        onClick={() => updateRole(u._id, "student")}
                        disabled={isCurrentUser(u.email)}
                      />
                    )}
                    {u.role !== "tutor" && (
                      <RoleButton
                        label="Make Tutor"
                        color="btn-secondary"
                        onClick={() => updateRole(u._id, "tutor")}
                        disabled={isCurrentUser(u.email)}
                      />
                    )}
                    {u.role !== "admin" && (
                      <RoleButton
                        label="Make Admin"
                        color="btn-warning"
                        onClick={() => updateRole(u._id, "admin")}
                        disabled={isCurrentUser(u.email)}
                      />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RoleButton = ({ label, color, onClick, disabled }) => (
  <button
    onClick={onClick}
    className={`btn ${color} px-3 py-1 rounded-md text-xs font-medium cursor-pointer ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={disabled}
    title={disabled ? "You cannot change your own role" : ""}
  >
    {label}
  </button>
);

export default ManageUsers;

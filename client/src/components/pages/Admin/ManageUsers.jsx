import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const fetchUsers = async (query = "") => {
    try {
      const res = await axiosSecure.get(`/users?search=${query}`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
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

  // Check if the current row belongs to the logged-in admin
  const isCurrentUser = (userEmail) => {
    return user?.email === userEmail;
  };

  return (
    <div className="max-w-7xl mx-auto  px-4 py-10">
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
        <table className="table w-full text-sm text-left text-secondary-gray4">
          <thead className="bg-secondary-gray3 text-secondary-black1 text-sm  tracking-wide">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Current Role</th>
              <th className="px-4 py-3">Update Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-gray2">
            {users.map((u, index) => (
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
                <td className="px-4 py-3 space-x-2">
                  {u.role !== "student" && (
                    <button
                      onClick={() => updateRole(u._id, "student")}
                      className="btn btn-info px-3 py-1 rounded-md text-xs font-medium cursor-pointer"
                      disabled={isCurrentUser(u.email)}
                    >
                      Make Student
                    </button>
                  )}
                  {u.role !== "tutor" && (
                    <button
                      onClick={() => updateRole(u._id, "tutor")}
                      className="btn btn-secondary px-3 py-1 rounded-md text-xs font-medium cursor-pointer"
                      disabled={isCurrentUser(u.email)}
                    >
                      Make Tutor
                    </button>
                  )}
                  {u.role !== "admin" && (
                    <button
                      onClick={() => updateRole(u._id, "admin")}
                      className="btn btn-warning px-3 py-1 rounded-md text-xs font-medium cursor-pointer"
                      disabled={isCurrentUser(u.email)}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No User Found */}
        {users.length === 0 && (
          <p className="text-center text-secondary-gray5 py-6">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;

"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [user, setUser] = useState({
    userName: "",
    email: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch User Data
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/getById/${id}`
      );

      if (response.data.message === "User Found") {
        setUser({
          username: response.data.user.userName,
          email: response.data.user.email,
        });
      } else {
        toast.error("Server Busy");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Update User Data (PUT Request)
  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/update/${id}`,
        user
      );

      if (response.status === 200) {
        toast.success("User updated successfully!");
        setIsModalOpen(false);
        getUser(); // Refresh data
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user.");
    }
  };

  // Delete User
  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/delete/${id}`
      );

      if (response.data === "User Deleted Successfully") {
        toast.success("User deleted successfully!");
        setTimeout(() => {
          window.location.href = `/login`;
        }, 2000);
      } else {
        toast.error("Failed to delete user");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-200">
      <div className="w-[400px] bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          User Details
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Username:</span>
            <span className="text-gray-900 font-semibold">
              {user.username || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-900 font-semibold">
              {user.email || "N/A"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Edit Account
          </button>
          <button
            onClick={deleteUser}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-red-200 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit User Details
            </h2>

            <form onSubmit={updateUser} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  placeholder="Enter New Name"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter New Email"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

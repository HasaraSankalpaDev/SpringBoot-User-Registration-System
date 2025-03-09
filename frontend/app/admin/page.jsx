"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [users, setUsers] = useState([]);

  // Get All User
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/getAllUsers"
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/delete/${id}`
      );

      if (response.data === "User Deleted Successfully") {
        toast.success("User Deleted Successfully!");

        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error("Failed to delete user, Please try again later.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <div className="  py-8 text-center ">
        <h1 className="text-3xl font-semibold">Admin Panel</h1>
      </div>
      <div className="w-full flex justify-center items-center ">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 bg-blue-500 text-white p-4">
            User List
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Type</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.userName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.type}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;

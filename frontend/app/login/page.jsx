"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Input Handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await getUser();
  };

  // Login API Request
  const getUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/login",
        data
      );

      if (response.data.message === "User Not Found") {
        toast.error("User Not Found!");
      } else if (response.data.message === "Password Incorrect") {
        toast.error("Password Incorrect!");
      } else if (response.data.message === "User Found") {
        toast.success("Login Successful!");

        if (response.data.user.type === "user") {
          setTimeout(() => {
            window.location.href = `/user/?id=${response.data.user.id}`;
          }, 2000);
        } else if (response.data.user.type === "admin") {
          setTimeout(() => {
            window.location.href = `/admin/?id=${response.data.user.id}`;
          }, 2000);
        } else {
          toast.error("Server Busy! Try Again Later");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-red-200 flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={onChangeHandler}
              value={data.email}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={onChangeHandler}
              value={data.password}
              required
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              className="bg-blue-500 w-full hover:cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <span className="text-gray-600 text-sm">Don't have an account?</span>
          <Link
            href="/register"
            className="text-blue-500 hover:text-blue-700 text-sm ml-1"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

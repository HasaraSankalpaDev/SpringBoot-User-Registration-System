"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    type: "",
  });

  // Input Handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validating Password
  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;

    return passwordRegex.test(password);
  };

  // Form Submit Handler
  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Password length check
    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    } else if (!isValidPassword(data.password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    } else {
      addUser();
    }
  };

  // Add Values to Data Object
  const userData = {
    userName: data.userName,
    email: data.email,
    password: data.password,
    type: "user",
  };

  // Adding User
  const addUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/register",
        userData
      );

      // Check User is Already Exist
      if (response.data === "User already exists") {
        toast.error("User already exists, Use another email address");
        return;
      }

      // Check Have any issued while saving user
      if (response.data === "Server Error") {
        toast.error("Server Error, Please try again later.");
        return;
      }

      // Check User Saved Successfully
      if (response.data === "User Registered Successfully") {
        toast.success("User registered successfully!");

        // Redirect to Login Page
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-red flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userName"
            >
              Name
            </label>
            <input
              name="userName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userName"
              type="text"
              placeholder="Enter your name"
              onChange={onChangeHandler}
              value={data.userName}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
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
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={onChangeHandler}
              value={data.password}
              required
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600 text-sm">
            Already have an account?
          </span>
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-700 text-sm ml-1"
          >
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;

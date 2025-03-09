import React from "react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-200">
      <ToastContainer theme="dark" />

      <div className="text-center bg-white shadow-lg py-8 px-12 rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome to the User Registration System!
        </h3>
        <p className="my-4">
          This is Java SpringBoot User Management System with Next Js.
        </p>
        <div className="flex space-x-4 w-full justify-center mt-4">
          <Link
            href="/login"
            className="py-2 px-6 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition"
          >
            Login Now
          </Link>
          <Link
            href="/register"
            className="py-2 px-6 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;

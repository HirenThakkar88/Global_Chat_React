import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:5001/api/pass/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse items-center justify-between min-h-screen p-4 bg-black font-noto-sans md:flex-row md:p-8">
      {/* Left Section */}
      <div className="text-center md:text-left md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          No Worries<span className="text-purple-500">.!!</span>
        </h1>
        <Link to="/login">
          <button className="px-6 py-3 mt-4 text-sm text-black transition bg-white rounded-full shadow-md md:text-base hover:bg-gray-200">
            Take me back.!
          </button>
        </Link>
      </div>

      {/* Right Section */}
      <div className="relative w-full max-w-sm p-6 border border-white rounded-lg shadow-lg sm:max-w-md md:w-1/2 lg:w-1/3 bg-gradient-to-br from-gray-900 to-black sm:p-8">
        {/* Gradient Circle */}
        <div className="absolute w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl top-[-30px] right-[-40px]"></div>

        <h2 className="mb-2 text-xl font-bold text-white sm:text-2xl md:text-3xl">
          Forgot Password ?
        </h2>
        <p className="mb-6 text-sm text-gray-400 sm:text-base">
          Please enter your email
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="example@mail.com"
            className="w-full px-4 py-3 text-sm text-white bg-transparent border border-gray-600 rounded-md outline-none md:text-base focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-sm text-white transition rounded-md shadow-lg md:text-base bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 disabled:opacity-70"
          >
            {isLoading ? "Sending Reset Link..." : "Reset Password"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <span className="flex-grow h-px bg-gray-700"></span>
          <p className="px-4 text-sm text-gray-400 sm:text-base">Or</p>
          <span className="flex-grow h-px bg-gray-700"></span>
        </div>

        {/* Signup Link */}
        <p className="mt-4 text-sm text-center text-gray-400 sm:text-base">
          Don't have an account?{" "}
          <Link to="/SignupForm" className="text-purple-500 underline">
            Signup
          </Link>
        </p>

        {/* Footer Links */}
        <div className="flex justify-between mt-6 text-xs text-gray-400 sm:text-sm">
          <Link to="/terms" className="transition hover:text-white">
            Terms & Conditions
          </Link>
          <Link to="/support" className="transition hover:text-white">
            Support
          </Link>
          <Link to="/contact" className="transition hover:text-white">
            Customer Care
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
import React from "react";

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-1 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-1 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-white underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Signup successful! You can now login.");
    } else {
      alert(data.detail || "Signup failed.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none"
          />
          <button className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-white underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

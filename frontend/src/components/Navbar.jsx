import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-2xl font-bold">Arachna</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/tasks" className="hover:underline">Tasks</Link>
        <Link to="/settings" className="hover:underline">Settings</Link>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="text-base sm:text-xl font-bold">
        <Link to="/">Chronotrex</Link>
      </div>

      {/* Links */}
      <div className="space-x-3 sm:space-x-6 text-sm sm:text-base">
        <Link
          to="/add-task"
          className="hover:text-gray-300 transition duration-200"
        >
          Add Task
        </Link>
        <Link
          to="/show-task"
          className="hover:text-gray-300 transition duration-200"
        >
          Show Task
        </Link>
        <Link
          to="/logout"
          className="hover:text-gray-300 transition duration-200"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

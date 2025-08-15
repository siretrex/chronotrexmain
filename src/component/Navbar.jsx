import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';

const Navbar = () => {
  const userId = useSelector((state) => state.user?.user?._id)
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const logoutHandler = () => {
    alert("Logout")
    dispatch(logout());
  }
  return (
    <>
    {
      userId ? <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="text-base sm:text-xl font-bold">
        <Link to="/">Chronotrex</Link>
      </div>

      {/* Links */}
      <div className="space-x-3 sm:space-x-6 text-sm sm:text-base">
        <Link
          to="/addtask"
          className="hover:text-gray-300 transition duration-200"
        >
          Add Task
        </Link>
        <Link
          to="/showtask"
          className="hover:text-gray-300 transition duration-200"
        >
          Show Task
        </Link>
        <Link
          onClick={logoutHandler}
          className="hover:text-gray-300 transition duration-200"
        >
          Logout
        </Link>
      </div>
    </nav> : <nav>
      Chronotrex
    </nav>
    }
    </>
    
  );
};

export default Navbar;

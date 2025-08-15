import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';

const Navbar = () => {
  const userId = useSelector((state) => state.user?.user?._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      {userId ? (
        <nav className="bg-gray-900 text-white px-4 sm:px-8 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
          {/* Logo */}
          <div className="text-lg sm:text-2xl font-extrabold tracking-wide">
            <Link to="/" className="hover:text-indigo-400 transition duration-300">
              Chronotrex
            </Link>
          </div>

          {/* Links */}
          <div className="space-x-2 sm:space-x-6 text-sm sm:text-base flex items-center">
            <Link
              to="/addtask"
              className="px-3 py-1 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Add Task
            </Link>
            <Link
              to="/showtask"
              className="px-3 py-1 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Show Task
            </Link>
            <button
              onClick={logoutHandler}
              className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </nav>
      ) : (
        <nav className="bg-gray-900 text-white px-4 py-3 text-lg font-bold">
          Chronotrex
        </nav>
      )}
    </>
  );
};

export default Navbar;

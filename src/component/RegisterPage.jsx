import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Baseurl";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isHide, setIsHide] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const changeHandler = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordToggler = () => {
    setIsHide((prev) => !prev);
  };

  useEffect(() => {
    if (
      userData.password &&
      userData.confirmPassword &&
      userData.password !== userData.confirmPassword
    ) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [userData.password, userData.confirmPassword]);

  const validate = () => {
    if (
      !userData.name.trim() ||
      !userData.email.trim() ||
      !userData.phone.trim() ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      setError("All fields are required");
      return false;
    }
    if (userData.phone.length !== 10 || isNaN(Number(userData.phone))) {
      setError("Enter a valid 10-digit phone number");
      return false;
    }
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const apiHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = userData; // exclude confirmPassword
      await axios.post(`${BASE_URL}register`, payload);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-purple-900 to-black px-4">
      <form
        onSubmit={apiHandler}
        className="bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg max-w-md w-full p-8 space-y-6 text-white"
      >
        <h1 className="text-3xl font-extrabold text-center">Register</h1>

        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}

        <div>
          <label htmlFor="name" className="block mb-2 font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={userData.name}
            onChange={changeHandler}
            disabled={loading}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-700 bg-opacity-70 border border-gray-600 focus:border-violet-500 outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={userData.email}
            onChange={changeHandler}
            disabled={loading}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-700 bg-opacity-70 border border-gray-600 focus:border-violet-500 outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 font-semibold">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="10-digit phone number"
            value={userData.phone}
            onChange={changeHandler}
            disabled={loading}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-700 bg-opacity-70 border border-gray-600 focus:border-violet-500 outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={isHide ? "password" : "text"}
            placeholder="••••••••"
            value={userData.password}
            onChange={changeHandler}
            disabled={loading}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-700 bg-opacity-70 border border-gray-600 focus:border-violet-500 outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-2 font-semibold">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={isHide ? "password" : "text"}
            placeholder="••••••••"
            value={userData.confirmPassword}
            onChange={changeHandler}
            disabled={loading}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-700 bg-opacity-70 border border-gray-600 focus:border-violet-500 outline-none transition"
          />
        </div>

        <button
          type="button"
          onClick={passwordToggler}
          className="text-sm text-violet-400 hover:underline"
          disabled={loading}
        >
          {isHide ? "Show Passwords" : "Hide Passwords"}
        </button>

        <button
          type="submit"
          disabled={loading || !!error}
          className="w-full py-3 bg-violet-600 rounded-md font-bold hover:bg-violet-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

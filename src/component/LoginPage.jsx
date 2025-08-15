import React, { useState } from "react";
import { login } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";  
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Baseurl";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigator = useNavigate()

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log(email, password)
    console.log("4777777777777777777777777777777777777777777777")
    try {
      const response = await axios.post(`${BASE_URL}login`, {
        email,
        password,
      });
      const user = { user: response.data.user, token: response.data.token };
      dispatch(login(user));
      navigator('/')
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-purple-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg max-w-md w-full p-8 space-y-6 text-white"
      >
        <h2 className="text-3xl font-extrabold text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-700 bg-opacity-70 border border-gray-600 focus:border-violet-500 outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-violet-600 rounded-md font-bold hover:bg-violet-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4 text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-violet-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

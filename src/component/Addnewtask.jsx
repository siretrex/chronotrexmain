import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../features/user/userSlice";
import { BASE_URL } from "../Baseurl";

const Addnewtask = () => {
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.user._id);

  // Fade-in animation on mount
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);

  const taskadditionHandler = async () => {
    if (!taskName.trim()) {
      setError("Task name cannot be empty.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}addtask`, {
        task_name: taskName,
        userId: userID,
      });
      dispatch(updateTask(res.data.tasks));
      setTaskName("");
    } catch (error) {
      setError("Failed to add task. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-md mx-auto mt-12 p-8 bg-gray-900 rounded-2xl shadow-lg text-white transition-opacity duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-violet-400">Add New Task</h2>

      {error && (
        <div className="mb-4 flex items-center gap-2 text-red-500 bg-red-900 bg-opacity-30 rounded-md px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <input
        type="text"
        placeholder="Enter your new task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        disabled={loading}
        className="w-full mb-6 px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
      />

      <button
        onClick={taskadditionHandler}
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold bg-violet-600 hover:bg-violet-700 active:bg-violet-800 transition flex justify-center items-center gap-3 ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {loading ? "Adding Task..." : "Add Task"}
      </button>
    </div>
  );
};

export default Addnewtask;

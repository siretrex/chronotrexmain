import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../Baseurl";

const Detailedtask = ({ taskData }) => {
  const [actions, setActions] = useState(taskData?.actions || []);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActionContent, setNewActionContent] = useState("");
  const [newActionMinutes, setNewActionMinutes] = useState("");
  const [showAll, setShowAll] = useState(false);
  const userId = useSelector((state) => state?.user?.user?._id);

  useEffect(() => {
    const total = actions.reduce((sum, a) => sum + a.minutes, 0);
    setTotalMinutes(total);
  }, [actions]);

  const handleAddAction = () => {
    if (!newActionContent.trim() || !newActionMinutes) return;

    const minutesValue = parseInt(newActionMinutes, 10);
    if (isNaN(minutesValue) || minutesValue <= 0) return;

    const newAction = { content: newActionContent.trim(), minutes: minutesValue };

    setActions((prev) => [...prev, newAction]);
    setNewActionContent("");
    setNewActionMinutes("");
    setShowAddForm(false);

    if (!taskData?._id) {
      console.warn("No task ID available. Cannot update task on server.");
      return; // Skip sending update if no taskId
    }
    axios
      .post(`${BASE_URL}task/update`, {
        userId,
        taskId: taskData._id,
        taskContent: newActionContent,
        minutes: minutesValue,
      })
      .catch((err) => {
        console.error("Failed to update task on server", err);
      });
  };

  const actionsToDisplay = showAll ? actions : actions.slice(-5);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="min-w-0">
          <h2 className="text-3xl text-left font-semibold text-gray-100 truncate max-w-xs sm:max-w-none">
            {taskData?.task_name || "Untitled Task"}
          </h2>
          <p className="text-gray-400 text-left mt-1 text-sm sm:text-base">
            Total Time:{" "}
            <span className="font-medium text-indigo-300">
              {Math.floor(totalMinutes / 60)} hr {totalMinutes % 60} min
            </span>
          </p>
        </div>

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition"
            aria-label="Add new action"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Action
          </button>
        )}
      </div>

      {/* Add Action Form */}
      {showAddForm && (
        <div className="mb-6 p-5 bg-gray-700 rounded-lg border border-gray-600 shadow-inner flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Action details"
            value={newActionContent}
            onChange={(e) => setNewActionContent(e.target.value)}
            className="flex-grow rounded-md bg-gray-900 text-gray-100 placeholder-gray-400 px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            min={1}
            placeholder="Minutes"
            value={newActionMinutes}
            onChange={(e) => setNewActionMinutes(e.target.value)}
            className="w-24 rounded-md bg-gray-900 text-gray-100 placeholder-gray-400 px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-3 items-center">
            <button
              onClick={handleAddAction}
              className="px-5 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Actions List */}
      {actions.length === 0 ? (
        <p className="text-center text-gray-500 italic py-10">No actions available.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-700 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-800 rounded-md">
            {actionsToDisplay.map((action, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center py-3 px-4 hover:bg-gray-700 rounded-md transition cursor-default select-text"
              >
                <span className="text-gray-100 truncate">{action.content}</span>
                <span className="text-indigo-400 font-mono text-sm">
                  {Math.floor(action.minutes / 60)} hr {action.minutes % 60} min
                </span>
              </li>
            ))}
          </ul>

          {actions.length > 5 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="text-indigo-400 hover:underline font-semibold focus:outline-none"
              >
                {showAll ? "Show Less" : `Show All (${actions.length})`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Detailedtask;

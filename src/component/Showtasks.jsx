import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Detailedtask from "../cards/Detailedtask";
import { BASE_URL } from "../Baseurl";

const Showtasks = () => {
  const userTasks = useSelector((state) => state.user.user.tasks);
  const [taskDetails, setTaskDetails] = useState([]);

  useEffect(() => {
    if (!userTasks || userTasks.length === 0) return;
    axios
      .post(`${BASE_URL}task/details`, { tasks: userTasks })
      .then((res) => {
        console.log("Task details response:", res);
        setTaskDetails(res.data.detailedTaskList || []);
      })
      .catch((err) => {
        console.error("Error fetching task details", err);
      });
  }, [userTasks]);

  const validTasks = taskDetails.filter(
    (item) => item && Object.keys(item).length > 0
  );

  console.log("Valid tasks to render:", validTasks);

  return (
    <div className="p-4 space-y-6">
      {validTasks.length > 0 ? (
        validTasks.map((item, index) => (
          <Detailedtask key={item._id || index} taskData={item} />
        ))
      ) : (
        <p className="pt-5 text-white z-50 text-4xl">No tasks to show</p>
      )}
    </div>
  );
};

export default Showtasks;

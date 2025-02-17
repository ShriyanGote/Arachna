import { useState, useEffect } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("http://127.0.0.1:8000/tasks", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data); // Store tasks in state
      })
      .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-6">Welcome to Arachna</h1>
      <div className="mt-4 w-96">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-400">No tasks found.</p>
        ) : (
          <ul className="mt-2">
            {tasks.map((task) => (
              <li key={task.id} className="bg-gray-700 p-3 rounded mt-2">
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

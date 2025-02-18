import { useState, useEffect } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch Tasks from API
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await res.json();
      setTasks(data); // Store tasks
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: newTask }),
      });

      if (res.ok) {
        const addedTask = await res.json();
        setTasks((prevTasks) => [...prevTasks, addedTask]); // Update tasks list
        setNewTask(""); // Clear input field
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      if (res.ok) {
        fetchTasks(); // ✅ Refetch updated tasks from backend
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-4">Welcome to Arachna</h2>

      {/* Task Input Section */}
      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-3">Your Tasks</h3>

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="New Task"
            className="flex-grow p-2 rounded bg-gray-700 text-white focus:outline-none"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            ➕ Add Task
          </button>
        </div>

        {/* Task List */}
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-2 bg-gray-700 rounded"
              >
                <span className={task.completed ? "line-through text-gray-400" : ""}>
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;

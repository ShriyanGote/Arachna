import { useState, useEffect } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Get Tasks from API
  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:8000/tasks", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!newTask) return;

    const res = await fetch("http://127.0.0.1:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title: newTask }),
    });

    if (res.ok) {
      fetchTasks();
      setNewTask("");
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    fetchTasks();
  };

  return (
    <div className="bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold">Tasks</h2>

      <div className="mt-4">
        <input
          type="text"
          placeholder="New Task"
          className="p-2 rounded bg-gray-700 text-white"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="ml-2 bg-blue-500 p-2 rounded"
        >
          Add Task
        </button>
      </div>

      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between p-2 bg-gray-800 rounded mt-2">
            {task.title}
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-400"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;

import { useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, category: "School", text: "Finish math homework", priority: "High" },
    { id: 2, category: "Work", text: "Submit project report", priority: "Medium" },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: tasks.length + 1, category: "Personal", text: newTask, priority: "Low" };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-5">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <ul className="mt-4 space-y-2">
          <li className="cursor-pointer hover:bg-gray-700 p-2 rounded">All Tasks</li>
          <li className="cursor-pointer hover:bg-gray-700 p-2 rounded">School</li>
          <li className="cursor-pointer hover:bg-gray-700 p-2 rounded">Work</li>
          <li className="cursor-pointer hover:bg-gray-700 p-2 rounded">Personal</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to Arachna</h2>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-800 p-4 rounded-md shadow-md flex justify-between">
              <span>{task.text} - <span className="text-blue-400">{task.category}</span></span>
              <span className="text-yellow-400">{task.priority}</span>
            </div>
          ))}
        </div>

        {/* Add Task */}
        <div className="mt-6 flex gap-2">
          <input
            type="text"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="p-2 bg-gray-700 text-white rounded-md flex-1 border border-gray-600"
          />
          <button onClick={addTask} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

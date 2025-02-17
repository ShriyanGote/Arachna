import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async () => {
    const url = isSignUp ? "http://127.0.0.1:8000/auth/signup" : "http://127.0.0.1:8000/auth/login";
    
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    
    if (res.ok) {
      if (!isSignUp) {
        localStorage.setItem("token", data.access_token);
        navigate("/dashboard");
      } else {
        setIsSignUp(false);
      }
    } else {
      setError(data.detail || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">{isSignUp ? "Sign Up for Arachna" : "Login to Arachna"}</h2>

        {error && <p className="text-red-400 text-center">{error}</p>}

        {isSignUp && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mt-3 bg-gray-700 text-white rounded border border-gray-600"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mt-3 bg-gray-700 text-white rounded border border-gray-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mt-3 bg-gray-700 text-white rounded border border-gray-600"
        />

        <button
          onClick={handleAuth}
          className="w-full bg-blue-500 hover:bg-blue-600 p-2 mt-4 rounded"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        <p className="text-center mt-3">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-400 cursor-pointer ml-1"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

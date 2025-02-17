import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    const token = response.data.access_token;
    localStorage.setItem("token", token);  // Store token
    console.log("Token saved:", token);
    
    return response.data;
  } catch (error) {
    console.error("Login Failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const getUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/protected`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
  
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error.response?.data || error.message);
      return null;
    }
  };
  
// Function to get token
export const getToken = () => localStorage.getItem("token");

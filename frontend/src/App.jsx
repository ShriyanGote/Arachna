import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Auth from "./pages/Login"; // Replaces Login & Signup
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar"; // Import Navbar

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

// This component ensures Navbar is conditionally rendered
const MainLayout = () => {
  const location = useLocation();

  // Hide Navbar on the login page
  const showNavbar = location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar />} 
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;

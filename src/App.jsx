import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";
import Exercise from "./components/Exercise";
import MyPlans from "./components/MyPlans";
import UserProfiles from "./components/UserProfiles";
import "./index.css";

// Create Theme Context
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div
        className={
          darkMode
            ? "bg-gray-900 text-white min-h-screen"
            : "bg-gray-100 text-black min-h-screen"
        }
      >
        <Router>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Navbar setIsSidebarOpen={setIsSidebarOpen} />

            {/* Sidebar */}
            <div
              className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
                isSidebarOpen ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-300 ease-in-out p-4 text-black`}
            >
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-xl font-bold mb-4"
              >
                X
              </button>
              <div className="flex flex-col items-center">
                <img
                  src="https://via.placeholder.com/100"
                  alt="User"
                  className="w-24 h-24 rounded-full border mb-4"
                />
                <h2 className="text-lg font-semibold">John Doe</h2>
                <p className="text-gray-600">johndoe@example.com</p>
              </div>
            </div>

            <div className="container mx-auto p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/check-device-health" element={<Dashboard />} />
                <Route path="/all-user-profiles" element={<UserProfiles />} />
                <Route path="/report" element={<Reports />} />
                <Route path="/exercise" element={<Exercise />} />
                <Route path="/my-plans" element={<MyPlans />} />
              </Routes>
            </div>
          </motion.div>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;

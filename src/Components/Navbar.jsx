import React, { useState } from "react";
import { useTheme } from "../App";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
    >
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`p-4 flex justify-between items-center ${
          darkMode
            ? "bg-gray-800  shadow-lg backdrop-blur-md p-6 sticky "
            : " border shadow-lg backdrop-blur-md p-6 bg-blue-300 text-white sticky "
        }`}
      >
        {/* User Profile Section */}
        <div className="relative ">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center space-x-2"
          >
            <img
              src="https://source.boomplaymusic.com/group10/M00/09/03/8597676cf4a24310b1487c01f0be4ed6H3000W3000_464_464.jpg"
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="font-semibold">Johny bhaiya</span>
          </motion.button>
        </div>
        {/* Sidebar with Animation */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className={`fixed top-0 left-0 w-64 h-screen ${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              } shadow-lg p-6 z-50`}
            >
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 text-xl"
              >
                ✖
              </button>
              <div className="flex flex-col items-center mt-10">
                <img
                  src="https://source.boomplaymusic.com/group10/M00/09/03/8597676cf4a24310b1487c01f0be4ed6H3000W3000_464_464.jpg"
                  alt="User Profile"
                  className="w-20 h-20 rounded-full border-2 border-gray-600"
                />
                <h2 className="mt-4 text-xl font-bold">John Doe</h2>
                {/* <p className="text-gray-400">john.doe@example.com</p> */}
              </div>
              <div className="mt-6 space-y-4">
                <a
                  href="/profile"
                  className="block text-center p-2 rounded-lg hover:bg-gray-300"
                >
                  View Profile
                </a>
                <a
                  href="/settings"
                  className="block text-center p-2 rounded-lg hover:bg-gray-300"
                >
                  Settings
                </a>
                {/* <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="block w-full text-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </motion.button> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="space-x-4 flex items-center">
          <a href="/check-device-health" className="hover:underline">
            Check Device Health
          </a>
          <a href="/all-user-profiles" className="hover:underline">
            All User Profiles
          </a>
          <a href="/report" className="hover:underline">
            Report
          </a>
          <a href="/exercise" className="hover:underline">
            Exercise
          </a>
          <a href="/my-plans" className="hover:underline">
            My Plans
          </a>

          {/* Light/Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-md"
          >
            {darkMode ? (
              <i class="fa-solid fa-sun"></i>
            ) : (
              <i class="fa-solid fa-moon"></i>
            )}
          </motion.button>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;

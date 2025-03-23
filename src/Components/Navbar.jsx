import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../App";
import { motion, AnimatePresence } from "framer-motion";

import gsap from "gsap";

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const nav1ref = useRef(null);
  const nav2ref = useRef(null);
  const nav3ref = useRef(null);
  const nav4ref = useRef(null);
  const nav5ref = useRef(null);
  

  useEffect(() => {
    gsap.fromTo(
      nav1ref.current,
      { opacity: 0, y: -90 },
      { opacity: 1, y: 0, duration: 1.5 }
    );
  }, []);
  useEffect(() => {
    gsap.fromTo(
      nav2ref.current,
      { opacity: 0, y: -90 },
      { opacity: 1, y: 0, duration: 1.7 }
    );
  }, []);
  useEffect(() => {
    gsap.fromTo(
      nav3ref.current,
      { opacity: 0, y: -90 },
      { opacity: 1, y: 0, duration: 1.9 }
    );
  }, []);
  useEffect(() => {
    gsap.fromTo(
      nav4ref.current,
      { opacity: 0, y: -90 },
      { opacity: 1, y: 0, duration: 2.1 }
    );
  }, []);
  useEffect(() => {
    gsap.fromTo(
      nav5ref.current,
      { opacity: 0, y: -90 },
      { opacity: 1, y: 0, duration: 2.3 }
    );
  }, []);

  return (
    <div
      className={darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
    >
      <motion.nav
        // initial={{ y: -50, opacity: 0 }}
        // animate={{ y: 0, opacity: 1 }}
        // transition={{ duration: 0.5 }}
        className={`p-4 flex justify-between items-center ${
          darkMode
            ? "bg-gray-800 shadow-lg backdrop-blur-md p-6 sticky"
            : "border shadow-lg backdrop-blur-md p-6 bg-blue-300 text-white sticky"
        }`}
      >
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.i
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}
          ></motion.i>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <a
            ref={nav1ref}
            href="/check-device-health"
            className="hover:underline"
          >
            Check Device Health
          </a>
          <a
            ref={nav2ref}
            href="/all-user-profiles"
            className="hover:underline"
          >
            All User Profiles
          </a>
          <a ref={nav3ref} href="/report" className="hover:underline">
            Report
          </a>
          <a ref={nav4ref} href="/exercise" className="hover:underline">
            Exercise
          </a>
          <a ref={nav5ref} href="/my-plans" className="hover:underline">
            My Plans
          </a>
        </div>

        {/* Light/Dark Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className="hidden md:block px-4 py-2 rounded-md"
        >
          {darkMode ? (
            <motion.i
              animate={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="fa-solid fa-sun"
            ></motion.i>
          ) : (
            <motion.i
              animate={{ rotate: -180 }}
              transition={{ duration: 0.5 }}
              className="fa-solid fa-moon"
            ></motion.i>
          )}
        </motion.button>
      </motion.nav>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 left-0 w-64 h-screen ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            } shadow-lg p-6 z-50 flex flex-col items-center`}
          >
            {/* Profile Section on Top */}
            <div className="flex flex-col items-center mt-4">
              <img
                src="https://source.boomplaymusic.com/group10/M00/09/03/8597676cf4a24310b1487c01f0be4ed6H3000W3000_464_464.jpg"
                alt="User Profile"
                className="w-16 h-16 rounded-full border-2 border-gray-600"
              />
              <h2 className="mt-2 text-lg font-bold">John</h2>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-xl"
            >
              ✖
            </button>
            <div className="mt-6 space-y-4 flex flex-col items-center justify-between ">
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
              {/* Light/Dark Mode Toggle inside Sidebar */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="mt-4 px-4 py-2 rounded-md"
              >
                {darkMode ? (
                  <motion.i
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    className="fa-solid fa-sun"
                  ></motion.i>
                ) : (
                  <motion.i
                    animate={{ rotate: -180 }}
                    transition={{ duration: 0.5 }}
                    className="fa-solid fa-moon"
                  ></motion.i>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

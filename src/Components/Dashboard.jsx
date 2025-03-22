import React, { useState } from "react";
import { useTheme } from "../App";

const Dashboard = () => {
  const { darkMode } = useTheme();
  const [postureData, setPostureData] = useState({
    sittingTime: "3h 25m",
    alerts: 5,
    postureScore: 78,
    postureStatus: "Good",
  });

  return (
    <div
      className={`grid grid-cols-3 gap-6 p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="col-span-2 space-y-4">
        <div
          className={`p-4 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-lg font-semibold">Total Sitting Time</h2>
          <p className="text-xl">{postureData.sittingTime}</p>
        </div>
        <div
          className={`p-4 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-lg font-semibold">Number of Alerts</h2>
          <p className="text-xl">{postureData.alerts}</p>
        </div>
        <div
          className={`p-4 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-lg font-semibold">Posture Score</h2>
          <p className="text-xl">{postureData.postureScore}</p>
        </div>
      </div>
      <div className="col-span-1 space-y-4">
        <div
          className={`p-4 rounded-lg shadow-md ${
            darkMode ? "bg-green-800 text-white" : "bg-green-200 text-black"
          }`}
        >
          <h3 className="text-lg font-semibold">Posture Status</h3>
          <p className="text-xl">{postureData.postureStatus}</p>
        </div>
        <div
          className={`p-4 rounded-lg shadow-md ${
            darkMode ? "bg-yellow-800 text-white" : "bg-yellow-200 text-black"
          }`}
        >
          <h3 className="text-lg font-semibold">Suggested Exercise</h3>
          <p>Stretch your neck and shoulders for 5 minutes.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

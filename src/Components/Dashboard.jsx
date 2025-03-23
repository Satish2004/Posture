import React, { useState, useEffect } from "react";
import { useTheme } from "../App";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import SourceData from "../data/sourceData.json";

const Dashboard = () => {
  const { darkMode } = useTheme();
  const [weeklyData, setWeeklyData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [todayScore, setTodayScore] = useState(0);
  const [totalSittingTime, setTotalSittingTime] = useState(0);
  const [totalAlerts, setTotalAlerts] = useState(0);

  useEffect(() => {
    const groupedData = {};
    let totalSum = 0;
    let sittingTimeSum = 0;
    let badPostureCount = 0;
    let today = new Date().toLocaleString("en-US", { weekday: "long" });
    let todayTotal = 0;

    SourceData.forEach((data) => {
      const {
        label,
        timestamp,
        postureType,
        duration,
        value,
        ["sitting time"]: sittingTime,
      } = data;

      if (!groupedData[label]) {
        groupedData[label] = {
          totalScore: 0,
          sittingTime: 0,
          alerts: 0,
          details: [],
        };
      }

      groupedData[label].totalScore += value;
      groupedData[label].sittingTime += sittingTime;

      // Count bad postures
      if (postureType !== "Good") {
        groupedData[label].alerts += 1;
        badPostureCount += 1;
      }

      if (label === today) {
        todayTotal += value;
      }

      totalSum += value;
      sittingTimeSum += sittingTime;
    });

    const formattedData = Object.keys(groupedData).map((day) => ({
      day,
      totalScore: Math.min(100, groupedData[day].totalScore.toFixed(1)), // Cap at 100
      sittingTime: groupedData[day].sittingTime,
      alerts: groupedData[day].alerts,
    }));

    setWeeklyData(formattedData);
    setTotalScore(Math.min(100, ((totalSum / 7) * 100) / 100)); // Scale to 100 max
    setTodayScore(Math.min(100, todayTotal));
    setTotalSittingTime(sittingTimeSum);
    setTotalAlerts(badPostureCount);
  }, []);

  return (
    <div
      className={`p-6 space-y-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* 📊 Bar Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`p-6 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold">Weekly Posture Score</h2>
          <div className="w-full h-72">
            <Bar
              data={{
                labels: weeklyData.map((item) => item.day),
                datasets: [
                  {
                    label: "Posture Score",
                    data: weeklyData.map((item) => item.totalScore),
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 1,
                    borderRadius: 10,
                  },
                ],
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* 📋 Weekly Summary Table */}
        <div
          className={`p-6 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold">Weekly Report</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-500 mt-4">
              <thead>
                <tr className="bg-gray-700 text-white text-sm md:text-base">
                  <th className="border border-gray-400 px-2 md:px-4 py-2">
                    Day
                  </th>
                  <th className="border border-gray-400 px-2 md:px-4 py-2">
                    Score
                  </th>
                  <th className="border border-gray-400 px-2 md:px-4 py-2">
                    Sitting Time
                  </th>
                  <th className="border border-gray-400 px-2 md:px-4 py-2">
                    No. of Alerts
                  </th>
                </tr>
              </thead>
              <tbody>
                {weeklyData.map((item, index) => (
                  <tr key={index} className="text-center text-sm md:text-base">
                    <td className="border border-gray-400 px-2 md:px-4 py-2">
                      {item.day}
                    </td>
                    <td className="border border-gray-400 px-2 md:px-4 py-2">
                      {item.totalScore}
                    </td>
                    <td className="border border-gray-400 px-2 md:px-4 py-2">
                      {item.sittingTime} min
                    </td>
                    <td className="border border-gray-400 px-2 md:px-4 py-2">
                      {item.alerts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/*  Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          } text-center`}
        >
          <h3 className="text-lg font-semibold">🔥 Weekly Score</h3>
          <p className="text-2xl font-bold">{totalScore.toFixed(2)} / 100</p>
        </div>
        <div
          className={`p-4 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          } text-center`}
        >
          <h3 className="text-lg font-semibold">🎯 Today’s Score</h3>
          <p className="text-2xl font-bold">{todayScore.toFixed(2)} / 100</p>
        </div>
        <div
          className={`p-4 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          } text-center`}
        >
          <h3 className="text-lg font-semibold">🕒 Total Sitting Time</h3>
          <p className="text-2xl font-bold">{totalSittingTime} min</p>
        </div>
        <div
          className={`p-4 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          } text-center`}
        >
          <h3 className="text-lg font-semibold">⚠️ Total Alerts</h3>
          <p className="text-2xl font-bold">{totalAlerts}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

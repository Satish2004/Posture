import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from "../App";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import SourceData from "../data/sourceData.json";
import TipsData from "../data/tips.json";
import ScrollVelocity from "./Animations/ScrollVelocity";
import Masonry from "./Animations/Masonry";

const Dashboard = () => {
  const { darkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [todayScore, setTodayScore] = useState(0);
  const [totalSittingTime, setTotalSittingTime] = useState(0);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [dailyTip, setDailyTip] = useState("");
  const [velocity, setVelocity] = useState(80);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000); // Reduced Load Time to 1s

    const groupedData = {};
    let totalSum = 0,
      sittingTimeSum = 0,
      badPostureCount = 0;
    let today = new Date().toLocaleString("en-US", { weekday: "long" });
    let todayTotal = 0;

    SourceData.forEach(
      ({ label, postureType, value, ["sitting time"]: sittingTime }) => {
        if (!groupedData[label])
          groupedData[label] = { totalScore: 0, sittingTime: 0, alerts: 0 };

        groupedData[label].totalScore += value;
        groupedData[label].sittingTime += sittingTime;
        if (postureType !== "Good") {
          groupedData[label].alerts += 1;
          badPostureCount += 1;
        }
        if (label === today) todayTotal += value;

        totalSum += value;
        sittingTimeSum += sittingTime;
      }
    );

    const formattedData = Object.keys(groupedData).map((day) => ({
      day,
      totalScore: Math.min(100, groupedData[day].totalScore.toFixed(1)),
      sittingTime: groupedData[day].sittingTime,
      alerts: groupedData[day].alerts,
    }));

    setWeeklyData(formattedData);
    setTotalScore(Math.min(100, ((totalSum / 7) * 100) / 100));
    setTodayScore(Math.min(100, todayTotal));
    setTotalSittingTime(sittingTimeSum);
    setTotalAlerts(badPostureCount);

    setDailyTip(
      TipsData.find((tip) => tip.day === today)?.tip ||
        "Maintain a good posture throughout the day!"
    );
  }, []);

  const chartData = useMemo(
    () => ({
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
    }),
    [weeklyData]
  );

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-16 h-16 border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div
      className={`px-4 py-6 space-y-8 max-w-6xl mx-auto ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Prevent Full Page Reload on Navigation */}
      <NavLink
        to="/check-health"
        preventScrollReset={true}
        className="text-blue-500 hover:underline"
      >
        Go to Check Health
      </NavLink>

      {/* Weekly Chart & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 p-4 rounded-lg">
        <div
          className={`p-6 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold">Weekly Posture Score</h2>
          <div className="w-full h-72">
            <Bar
              data={chartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Weekly Summary Table */}
        <div
          className={`p-6 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold">Weekly Report</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse border border-gray-500">
              <thead>
                <tr className="bg-gray-700 text-white text-xs md:text-sm">
                  <th className="border px-2 md:px-4 py-2">Day</th>
                  <th className="border px-2 md:px-4 py-2">Score</th>
                  <th className="border px-2 md:px-4 py-2">Sitting Time</th>
                  <th className="border px-2 md:px-4 py-2">No. of Alerts</th>
                </tr>
              </thead>
              <tbody>
                {weeklyData.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center text-xs md:text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <td className="border px-2 md:px-4 py-2">{item.day}</td>
                    <td className="border px-2 md:px-4 py-2">
                      {item.totalScore}
                    </td>
                    <td className="border px-2 md:px-4 py-2">
                      {item.sittingTime} min
                    </td>
                    <td className="border px-2 md:px-4 py-2">{item.alerts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ScrollVelocity
        texts={["", "WEEKLY REPORTS"]}
        velocity={velocity || 15}
      />

      {/* Tips Section */}
      <div
        className={`p-6 rounded-lg shadow-md mt-10 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <p
          className={`text-lg ${
            darkMode ? "text-yellow-400" : "text-yellow-600"
          }`}
        >
          {dailyTip}
        </p>
      </div>

      {/* Masonry Layout */}
      <h2 className="flex mt-40 justify-center align-center">
        SOME WRONG POSTURE
      </h2>
      <Masonry
        data={[
          { id: 1, image: "https://picsum.photos/id/10/200/300", height: 400 },
        ]}
      />
    </div>
  );
};

export default Dashboard;

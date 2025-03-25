import React, { useState, useEffect } from "react";
import { useTheme } from "../App";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import SourceData from "../data/sourceData.json";
import TipsData from "../data/tips.json";
import ScrollVelocity from "./Animations/ScrollVelocity";
import Masonry from "./Animations/Masonry";

const Dashboard = () => {
  const data = [
    { id: 1, image: "https://picsum.photos/id/10/200/300", height: 400 },
    { id: 2, image: "https://picsum.photos/id/14/200/300", height: 300 },
    { id: 3, image: "https://picsum.photos/id/15/200/300", height: 300 },
    { id: 4, image: "https://picsum.photos/id/16/200/300", height: 300 },
    { id: 5, image: "https://picsum.photos/id/17/200/300", height: 300 },
    { id: 6, image: "https://picsum.photos/id/19/200/300", height: 300 },
    { id: 7, image: "https://picsum.photos/id/37/200/300", height: 200 },
    { id: 8, image: "https://picsum.photos/id/39/200/300", height: 300 },
    { id: 9, image: "https://picsum.photos/id/85/200/300", height: 200 },
    { id: 10, image: "https://picsum.photos/id/103/200/300", height: 400 },
  ];

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
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const groupedData = {};
    let totalSum = 0;
    let sittingTimeSum = 0;
    let badPostureCount = 0;
    let today = new Date().toLocaleString("en-US", { weekday: "long" });
    let todayTotal = 0;

    SourceData.forEach((data) => {
      const { label, postureType, value, ["sitting time"]: sittingTime } = data;

      if (!groupedData[label]) {
        groupedData[label] = { totalScore: 0, sittingTime: 0, alerts: 0 };
      }

      groupedData[label].totalScore += value;
      groupedData[label].sittingTime += sittingTime;

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
      totalScore: Math.min(100, groupedData[day].totalScore.toFixed(1)),
      sittingTime: groupedData[day].sittingTime,
      alerts: groupedData[day].alerts,
    }));

    setWeeklyData(formattedData);
    setTotalScore(Math.min(100, ((totalSum / 7) * 100) / 100));
    setTodayScore(Math.min(100, todayTotal));
    setTotalSittingTime(sittingTimeSum);
    setTotalAlerts(badPostureCount);

    const todayTip = TipsData.find((tip) => tip.day === today);
    setDailyTip(
      todayTip ? todayTip.tip : "Maintain a good posture throughout the day!"
    );
  }, []);

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
      className={`px-4 py-6 space-y-8 max-w-7xl mx-auto ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Weekly Bar Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 p-4 rounded-lg">
        <div
          className={`p-6 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold">Weekly Posture Score</h2>
          <div className="w-full h-64">
            <Bar
              data={{
                labels: weeklyData.map((item) => item.day),
                datasets: [
                  {
                    label: "Posture Score",
                    data: weeklyData.map((item) => item.totalScore),
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    borderWidth: 1,
                    borderRadius: 10,
                  },
                ],
              }}
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
          <table className="w-full border-collapse border border-gray-500 mt-4 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border px-2 py-1 md:px-4 md:py-2">Day</th>
                <th className="border px-2 py-1 md:px-4 md:py-2">Score</th>
                <th className="border px-2 py-1 md:px-4 md:py-2">
                  Sitting Time
                </th>
                <th className="border px-2 py-1 md:px-4 md:py-2">Alerts</th>
              </tr>
            </thead>
            <tbody>
              {weeklyData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-2 py-1 md:px-4 md:py-2">
                    {item.day}
                  </td>
                  <td className="border px-2 py-1 md:px-4 md:py-2">
                    {item.totalScore}
                  </td>
                  <td className="border px-2 py-1 md:px-4 md:py-2">
                    {item.sittingTime} min
                  </td>
                  <td className="border px-2 py-1 md:px-4 md:py-2">
                    {item.alerts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Masonry Layout */}
      <h2 className="text-center mt-20 text-lg md:text-xl">
        🚫 Wrong Postures
      </h2>
      <Masonry data={data} />
    </div>
  );
};

export default Dashboard;

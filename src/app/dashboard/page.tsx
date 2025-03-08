//@ts-nocheck
'use client'
import { useState, useEffect } from "react";
import Head from "next/head";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bell, Users, Settings, BarChart2 } from "lucide-react";
import Sidebar from "../Components/Navbar";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const fullDataPoints = [3, 5, 4, 6, 7, 5, 8];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const overallTrend = fullDataPoints[fullDataPoints.length - 1] >= fullDataPoints[0] ? "#FF6B35" : "#339989";
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayData(fullDataPoints.slice(0, i));
      if (i >= fullDataPoints.length) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const dynamicChartData = {
    labels: labels.slice(0, displayData.length),
    datasets: [
      {
        label: "Focus Sessions",
        data: displayData,
        borderColor: "#FF6B35",
        backgroundColor: "rgba(252, 217, 41, 0.2)",
        borderWidth: 3,
        pointBackgroundColor: "#FF6B35",
        segment: {
          borderColor: (ctx) => {
            const { p0, p1 } = ctx;
            return p1.parsed.y >= p0.parsed.y ? "#339989" : "#FF6B35";
          },
        },
      },
    ],
  };

  const pieChartData = {
    labels: ["Focus Time", "Break Time", "Distraction"],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ["#FF6B35", "#94D2BD", "#A7C4BC"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-bold">
      <Sidebar />
      <div className="flex flex-col flex-1 p-6">
        <Head>
          <title>Focus Dashboard</title>
        </Head>
        <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold flex items-center text-white">
            <BarChart2 className="mr-2" /> FocusFlow
          </h1>
          <div className="flex items-center space-x-4 text-white">
            <Bell className="cursor-pointer" />
            <Users className="cursor-pointer" />
            <Settings className="cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">⏳ Time Saved</h2>
            <p className="text-2xl font-bold">12h 45m</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">📈 Retention Increased</h2>
            <p className="text-2xl font-bold">85%</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold">🔥 Streak</h2>
            <p className="text-2xl font-bold">7 Days</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex justify-center items-center">
            <div className="w-full">
              <h2 className="text-xl font-semibold text-center mb-4">📊 Focus Sessions (Last 7 Days)</h2>
              <Line data={dynamicChartData} options={{ responsive: true }} />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex justify-center items-center">
            <div className="w-2/3">
              <h2 className="text-xl font-semibold text-center mb-4">🎯 Focus Distribution</h2>
              <Pie data={pieChartData} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">📖 About Us</h2>
          <p className="text-lg font-medium">FocusFlow is dedicated to helping individuals enhance their productivity through smart tracking and insights. Our mission is to empower users with tools that improve concentration, boost retention, and reduce distractions.</p>
        </div>

        <footer className="bg-gray-800 p-4 rounded-lg shadow-md mt-6 text-center">
          <p>&copy; {new Date().getFullYear()} FocusFlow. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
//@ts-nocheck
'use client'
import Sidebar from "./Components/Sidebar"
import { useState, useEffect } from "react";
import Head from "next/head";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import TypingEffect from "./Components/TypingEffect";

// Register required Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function Home() {
  // Full data and labels
  const fullDataPoints = [3, 5, 4, 6, 7, 5, 8];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Determine overall trend color (green if final value >= first, else red)
  const overallTrend =
    fullDataPoints[fullDataPoints.length - 1] >= fullDataPoints[0]
      ? "#4ade80"
      : "#ef4444";

  // State to gradually reveal data (for drawing effect)
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayData(fullDataPoints.slice(0, i));
      if (i >= fullDataPoints.length) clearInterval(interval);
    }, 500); // Change delay (ms) for drawing speed
    return () => clearInterval(interval);
  }, []);

  // Build chart data using only the revealed points
  const dynamicChartData = {
    labels: labels.slice(0, displayData.length),
    datasets: [
      {
        label: "Focus Sessions",
        data: displayData,
        // Default border/point color (will be overridden by segment callback while drawing)
        borderColor: overallTrend,
        backgroundColor: "rgba(74, 222, 128, 0.2)",
        borderWidth: 3,
        pointBackgroundColor: overallTrend,
        // Scriptable segment option for dynamic coloring:
        // If still drawing, color each segment green if upward and red if downward.
        // Once fully drawn, all segments use the overall trend color.
        segment: {
          borderColor: (ctx) => {
            // If chart is not yet fully drawn, apply dynamic coloring.
            if (displayData.length < fullDataPoints.length) {
              const { p0, p1 } = ctx;
              if (!p0 || !p1) return overallTrend;
              return p1.parsed.y >= p0.parsed.y ? "#4ade80" : "#ef4444";
            } else {
              // Once complete, use overallTrend for all segments.
              return overallTrend;
            }
          }
        }
      }
    ]
  };

  // Chart options remain unchanged
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#fff"
        }
      }
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "#444" } },
      y: { ticks: { color: "#fff" }, grid: { color: "#444" } }
    }
  };

  return (
    <div className="min-h-screen bg-[#23707c] text-white flex flex-col items-center justify-center p-6">
     
      <Head>
        <title>Focus Tracker</title>
      </Head>
      <TypingEffect text={"Devs"}></TypingEffect>
      {/* Responsive layout:
            - For small/medium screens: stacked in a column.
            - For lg screens (≥1024px): stats on the left and chart on the right.
            - Stats section min-width: 300px; chart section min square: 400px. */}
      <div className="flex flex-col lg:flex-row w-full max-w-screen gap-8 p-12">
        {/* Stats Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full lg:w-[45%] min-w-[300px]">
          <h2 className="text-xl font-semibold mb-2 text-center lg:text-left">
            📌 Focus Stats
          </h2>
          <ul className="space-y-4">
            <li className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium">⏳ Time Saved</h3>
              <p className="text-2xl font-bold mt-1">12h 45m</p>
            </li>
            <li className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium">📈 Retention Increased</h3>
              <p className="text-2xl font-bold mt-1">85%</p>
            </li>
            <li className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium">🔥 Streak</h3>
              <p className="text-2xl font-bold mt-1">7 Days</p>
            </li>
          </ul>
        </div>
        {/* Chart Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full lg:w-[55%] min-w-[400px] min-h-[400px] flex justify-center items-center">
          <div className="w-full h-full">
            <h2 className="text-xl font-semibold mb-4 text-center">
              📊 Focus Sessions (Last 7 Days)
            </h2>
            <Line data={dynamicChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

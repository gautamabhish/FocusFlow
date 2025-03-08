//@ts-nocheck
"use client";

import { useEffect, useState } from "react";

export default function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          setIsRunning(false);
          clearInterval(interval);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl text-center">Pomodoro Timer</h2>
      <p className="text-5xl text-center">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</p>
      <button onClick={() => setIsRunning(!isRunning)} className="bg-green-500 px-4 py-2 rounded w-full mt-4">
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
}

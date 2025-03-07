//@ts-nocheck
'use client'
import { useState ,useEffect} from "react";

function ToggleSwitch({ label, enabled, setEnabled }) {
  return (
    <div className="flex justify-between items-center w-full">
      <span className="text-xl">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          className="sr-only peer"
        />
        <div className="w-14 h-7 bg-gray-500 rounded-full peer peer-checked:bg-blue-500 transition-all duration-300"></div>
        <span
          className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 peer-checked:translate-x-7`}
        ></span>
      </label>
    </div>
  );
}

function WebsiteManagerCard() {
  const [enabled, setEnabled] = useState(false);
  const [website, setWebsite] = useState("");
  const [block, setBlock] = useState(false);
  const [usageLimit, setUsageLimit] = useState("");

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <ToggleSwitch label="Website Manager" enabled={enabled} setEnabled={setEnabled} />
      {enabled && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="block mb-1 text-lg">Enter Website URL:</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-lg">Block Website:</label>
            <input
              type="checkbox"
              checked={block}
              onChange={() => setBlock(!block)}
              className="toggle-checkbox"
            />
          </div>
          <div>
            <label className="block mb-1 text-lg">Usage Time Limit (minutes):</label>
            <input
              type="number"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              placeholder="e.g. 60"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationBlockerCard() {
  const [blocked, setBlocked] = useState(false);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <ToggleSwitch label="Notification Blocker" enabled={blocked} setEnabled={setBlocked} />
      {blocked && (
        <p className="mt-4 text-lg text-gray-300">
          All notifications are now blocked.
        </p>
      )}
    </div>
  );
}

function PomodoroTimer() {
    // Default timer set to 25 minutes
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
  
    // Update the timer every second when running
    useEffect(() => {
      let interval = null;
      if (isRunning && (minutes > 0 || seconds > 0)) {
        interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds((prev) => prev - 1);
          } else {
            if (minutes > 0) {
              setMinutes((prev) => prev - 1);
              setSeconds(59);
            } else {
              setIsRunning(false);
              clearInterval(interval);
            }
          }
        }, 1000);
      } else {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isRunning, minutes, seconds]);
  
    const handleStart = () => {
      if (minutes > 0 || seconds > 0) setIsRunning(true);
    };
  
    const handlePause = () => {
      setIsRunning(false);
    };
  
    const handleReset = () => {
      setIsRunning(false);
      setMinutes(25);
      setSeconds(0);
    };
  
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="text-5xl font-bold">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
        <div className="flex space-x-4">
          {!isRunning && (
            <button
              onClick={handleStart}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Start
            </button>
          )}
          {isRunning && (
            <button
              onClick={handlePause}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
            >
              Pause
            </button>
          )}
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
  

function PomodoroTechniqueCard() {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Pomodoro Technique
        </h2>
        <PomodoroTimer />
      </div>
    );
  }

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Tools Dashboard</h1>
      <div className="flex flex-col items-center space-y-8 w-full">
        <WebsiteManagerCard />
        <NotificationBlockerCard />
        <PomodoroTechniqueCard />
      </div>
    </div>
  );
}

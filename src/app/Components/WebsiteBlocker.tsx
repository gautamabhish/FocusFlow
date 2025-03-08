//@ts-nocheck
"use client";
import { useEffect, useState } from "react";

export default function WebsiteBlocker() {
  const [metrics, setMetrics] = useState(null);

  // Function to request metrics from the extension
  const requestMetrics = () => {
    // Send a window message to the content script
    window.postMessage({ type: "GET_EXTENSION_METRICS" }, "*");
  };

  useEffect(() => {
    // Listen for the extension's response
    const handleMessage = (event) => {
      if (event.source !== window) return;
      if (event.data && event.data.type === "EXTENSION_METRICS") {
        setMetrics(event.data.payload);
      }
    };

    window.addEventListener("message", handleMessage);
    // Request metrics once on mount
    requestMetrics();

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-md text-white">
      <h2 className="text-2xl font-semibold mb-4">Website Blocker Metrics</h2>
      <button
        onClick={requestMetrics}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Refresh Metrics
      </button>
      {metrics ? (
        <div className="mt-4">
          <p>Time Saved: {metrics.time_saved} minutes</p>
          <p>Blocked Sites: {Array.isArray(metrics.blocked_sites)
            ? metrics.blocked_sites.join(", ")
            : "None"}</p>
        </div>
      ) : (
        <p className="mt-4">Loading metrics...</p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function NotificationBlocker() {
  const [blocked, setBlocked] = useState(false);

  const blockNotifications = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        alert("Notifications are now blocked.");
        setBlocked(true);
      }
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl">Notification Blocker</h2>
      <button onClick={blockNotifications} className="bg-red-500 px-4 py-2 rounded mt-4 w-full">
        {blocked ? "Notifications Blocked" : "Block Notifications"}
      </button>
    </div>
  );
}

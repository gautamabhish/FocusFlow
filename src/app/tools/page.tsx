"use client";

import WebsiteBlocker from "../Components/WebsiteBlocker";
import NotificationBlocker from "../Components/NotificationBlocker";
import Timer from "../Components/Timer";

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Focus Tools</h1>
      <div className="space-y-8">
        <WebsiteBlocker />
        <NotificationBlocker />
        <Timer />
      </div>
    </div>
  );
}

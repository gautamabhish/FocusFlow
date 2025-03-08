//@ts-nocheck
'use client'
import Head from 'next/head';
import Link from 'next/link';
import { FaGamepad, FaTrophy, FaClock } from 'react-icons/fa';

export default function ChallengePage() {
  // Simulated summary data (to be fetched from backend)
  const challengesPlayed = 15;
  const challengesWon = 10;
  const interactionImpact = 20; // e.g., 20% improvement

  // Dummy challenge history data with points, time saved and retention increase
  const challengeHistory = [
    { id: 1, name: "Speed Typing Challenge", points: 120, timeSaved: "20s", retentionIncrease: "15%" },
    { id: 2, name: "Memory Test", points: 80, timeSaved: "10s", retentionIncrease: "-5%" },
    { id: 3, name: "Focus Challenge", points: 150, timeSaved: "30s", retentionIncrease: "20%" },
  ];

  // Calculate total points from the challenge history data
  const totalPoints = challengeHistory.reduce((acc, challenge) => acc + challenge.points, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Head>
        <title>Challenges Dashboard</title>
      </Head>

      <h1 className="text-4xl font-bold text-center mb-4">Challenges Dashboard</h1>
      <p className="text-lg text-center mb-8 max-w-2xl mx-auto">
        Review your performance, see the challenges you played, and understand how they impacted your interaction time.
      </p>

      {/* Summary Cards */}
      <div className="flex justify-center mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Challenges Played */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaGamepad size={48} className="mb-4" />
            <h2 className="text-2xl font-semibold">Played</h2>
            <p className="text-3xl font-bold mt-2">{challengesPlayed}</p>
          </div>
          {/* Challenges Won */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaTrophy size={48} className="mb-4 text-yellow-400" />
            <h2 className="text-2xl font-semibold">Won</h2>
            <p className="text-3xl font-bold mt-2">{challengesWon}</p>
          </div>
          {/* Total Points */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaClock size={48} className="mb-4" />
            <h2 className="text-2xl font-semibold">Total Points</h2>
            <p className="text-3xl font-bold mt-2">{totalPoints}</p>
          </div>
        </div>
      </div>

      {/* Start New Challenge Section */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4">Start a New Challenge</h2>
          <p className="text-lg mb-4">
            Ready to test your skills? Start a new challenge now!
          </p>
          <button
            onClick={() => alert("Challenge Started!")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Start Challenge
          </button>
        </div>
      </div>

     {/* Challenge History */}
<h2 className="text-3xl font-bold mb-4 text-center">Your Challenge History</h2>
<div className="flex justify-center px-2">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl p-4">
    {challengeHistory.map((challenge) => (
      <div key={challenge.id} className="flex justify-center">
        <div className="bg-gray-800 p-4 rounded-lg shadow flex flex-col justify-between items-center cursor-pointer 
                        transform hover:scale-105 transition-transform duration-300 
                        w-full max-w-[400px] h-[350px]">
          <div className="text-center">
            <h3 className="text-xl font-semibold">{challenge.name}</h3>
            <p className="mt-2">
              Time Saved: <span className="font-bold">{challenge.timeSaved}</span>
            </p>
          </div>
          <div className="mt-4 text-center">
            <span className="block text-sm text-gray-400">Retention Increase</span>
            <span
              className={`text-lg font-bold ${parseInt(challenge.retentionIncrease) > 0 ? "text-green-500" : "text-red-500"}`}
            >
              {challenge.retentionIncrease}
            </span>
            <span className="block text-sm text-gray-400 mt-1">Points: {challenge.points}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}

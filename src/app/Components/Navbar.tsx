"use client";
import React from "react";
import Link from "next/link";
import { FaHome, FaTools, FaTrophy, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { GiCrafting } from "react-icons/gi";


export default function Navbar() {


  return (
    <nav className="bg-gray-800 text-white shadow p-4">
      <ul className="flex items-center justify-center space-x-8">
        <li>
          <Link href="/" className="flex items-center space-x-2 hover:text-blue-400">
            <FaHome size={24} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/tools" className="flex items-center space-x-2 hover:text-blue-400">
            <FaTools size={24} />
            <span>Tools</span>
          </Link>
        </li>
        <li>
          <Link href="/challenges" className="flex items-center space-x-2 hover:text-blue-400">
            <FaTrophy size={24} />
            <span>Challenges</span>
          </Link>
        </li>
        <li>
          <Link href="/activities" className="flex items-center space-x-2 hover:text-blue-400">
            <GiCrafting size={24} />
            <span>Activity</span>
          </Link>
        </li>
        <li>
          <Link href="/community" className="flex items-center space-x-2 hover:text-blue-400">
            <FaUsers size={24} />
            <span>Community</span>
          </Link>
        </li>
        <li>
          <button
            onClick={logout}
            className="flex items-center space-x-2 hover:text-blue-400 focus:outline-none"
          >
            <FaSignOutAlt size={24} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

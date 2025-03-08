//@ts-nocheck
'use client'
import Link from 'next/link';
import { FaHome, FaTools, FaTrophy, FaUsers } from "react-icons/fa";
import { GiCrafting } from "react-icons/gi";
import { useAuth } from '../lib/auth-context';
export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <div className="fixed top-0 left-0 h-screen flex items-center rounded-2xl">
      {/* Sidebar container: compact (w-16) by default, expands on hover; default opacity 80% */}
      <div className="group flex flex-col bg-gray-800 text-white pt-2 pb-2 transition-all duration-300 w-16 hover:w-48 hover:h-[38%] rounded-xl justify-center opacity-80 group-hover:opacity-100 ">
        <ul className="flex flex-col items-center space-y-6">
          <Link href="/">
            <li className="flex items-center w-full cursor-pointer p-1 hover:text-blue-400">
              <FaHome size={38} />
              <span className="ml-4 hidden group-hover:inline-block transition-opacity duration-300 w-28 text-center">
                Home
              </span>
            </li>
          </Link>
          <Link href="/tools">
            <li className="flex items-center w-full cursor-pointer p-1 hover:text-blue-400">
              <FaTools size={38} />
              <span className="ml-4 hidden group-hover:inline-block transition-opacity duration-300 w-28 text-center">
                Tools
              </span>
            </li>
          </Link>
          <Link href="/challenges">
            <li className="flex items-center w-full cursor-pointer p-1 hover:text-blue-400">
              <FaTrophy size={38} />
              <span className="ml-4 hidden group-hover:inline-block transition-opacity duration-300 w-28 text-center">
                Challenges
              </span>
            </li>
          </Link>
          <Link href="/activities">
            <li className="flex items-center w-full cursor-pointer p-1 hover:text-blue-400">
              <GiCrafting size={38} />
              <span className="ml-4 hidden group-hover:inline-block transition-opacity duration-300 w-28 text-center">
                Activity
              </span>
            </li>
          </Link>
          <Link href="/community">
            <li className="flex items-center w-full cursor-pointer p-1 hover:text-blue-400">
              <FaUsers size={38} />
              <span className="ml-4 hidden group-hover:inline-block transition-opacity duration-300 w-28 text-center">
                Community
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

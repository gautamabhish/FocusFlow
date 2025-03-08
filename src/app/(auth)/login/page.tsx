"use client";

import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../../lib/auth-context";

const images = [
  "/images/Logo.gif",
  "/images/image2.jpeg",
  "/images/image1.jpeg",
];

export default function LoginPage() {
  const { signInWithGoogle, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [index, setIndex] = useState(0);
  const [googleDisabled, setGoogleDisabled] = useState(false);

  // Cycle through images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGoogleSignIn = async () => {
    if (googleDisabled) return; // Prevent additional clicks
    setGoogleDisabled(true);
    await signInWithGoogle();
    // Disable button for 12 seconds, then re-enable it
    setTimeout(() => {
      setGoogleDisabled(false);
    }, 12000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex w-[650px] rounded-lg shadow-xl overflow-hidden">
        {/* Left Side: Image Slider */}
        <div className="w-1/2 relative overflow-hidden">
          <motion.div
            className="flex flex-nowrap w-full h-full"
            animate={{ x: `-${index * 100}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {images.map((img) => (
              <img
                key={img}
                src={img}
                alt="Slider"
                className="flex-shrink-0 min-w-full h-full object-cover rounded-lg"
              />
            ))}
          </motion.div>
          {/* Bullet Indicators */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === idx ? "bg-[#94D2BD]" : "bg-gray-500"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-1/2 bg-gray-800 p-6 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-3 text-center">
            {isLogin ? "Login" : "Create an account"}
          </h2>
          <form>
            {!isLogin && (
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-2 bg-gray-700 rounded"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-2 bg-gray-700 rounded"
                />
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mt-2 bg-gray-700 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mt-2 bg-gray-700 rounded"
            />
            <div className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" />
              <span>
                I agree to the{" "}
                <a href="#" className="text-blue-400">
                  Terms & Conditions
                </a>
              </span>
            </div>
            <button className="w-full bg-purple-500 p-2 mt-3 rounded">
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          {/* Google Auth Section */}
          <div className="mt-3 text-center">
            <span className="text-gray-400">
              or {isLogin ? "login" : "sign up"} with
            </span>
            <div className="flex justify-center mt-2">
              <button
                onClick={handleGoogleSignIn}
                disabled={googleDisabled}
                className={`bg-gray-700 p-2 rounded flex items-center space-x-2 ${
                  googleDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaGoogle /> <span>Google</span>
              </button>
            </div>
          </div>

          {/* Toggle between Login and Sign Up */}
          <div className="mt-3 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>

          {/* Welcome Message if User is Logged In */}
          {user && (
            <p className="mt-3 text-center">
              Welcome, <strong>{user.displayName}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

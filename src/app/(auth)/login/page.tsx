//@ts-nocheck
'use client';

import { useState, useEffect } from "react";
import { PontemWalletAdapter, useWallet } from "@pontem/aptos-wallet-adapter";
import { FaWallet } from "react-icons/fa";
import { motion } from "framer-motion";

const images = [
  "/images/Logo.gif",
  "/images/image2.jpeg",
  "/images/image1.jpeg",
];
import React from 'react';
import {
  WalletProvider,
  
  HippoWalletAdapter,
  AptosWalletAdapter,
  HippoExtensionWalletAdapter,
  MartianWalletAdapter,
  FewchaWalletAdapter,
  SpikaWalletAdapter,
  RiseWalletAdapter,
  FletchWalletAdapter
} from '@pontem/aptos-wallet-adapter';

const wallets = [
  new PontemWalletAdapter(),
  new HippoWalletAdapter(),
  new MartianWalletAdapter(),
  new AptosWalletAdapter(),
  new FewchaWalletAdapter(),
  new HippoExtensionWalletAdapter(),
  new SpikaWalletAdapter(),
  new RiseWalletAdapter(),
  new FletchWalletAdapter()
];

export default function WalletLogin() {
  const { connect, disconnect, connected  , select} = useWallet();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2.5 h-2.5 rounded-full ${index === idx ? "bg-[#94D2BD]" : "bg-gray-500"}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Right Side: Wallet Login */}
        <div className="w-1/2 bg-gray-800 p-6 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-3 text-center">Login with Wallet</h2>
          {connected ? (
            <div className="text-center">
              <p className="mb-4">Wallet Connected</p>
              <button 
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={()=>{disconnect()}}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <button
                onClick={()=>{
                  select();
                }}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center space-x-2 justify-center"
              >
                <FaWallet /> 
                Connect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
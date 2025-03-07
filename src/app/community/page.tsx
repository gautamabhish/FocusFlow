//@ts-nocheck
'use client'
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Backend server

export default function CommunityPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", online: true },
    { id: 2, name: "Bob", online: true },
    { id: 3, name: "Charlie", online: false },
  ]);
  const [inCall, setInCall] = useState(false);
  const [currentCall, setCurrentCall] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    // Listen for online users update
    socket.on("updateUsers", (updatedUsers) => {
      setUsers(updatedUsers);
    });

    // Listen for incoming call
    socket.on("incomingCall", async ({ from }) => {
      setCurrentCall(from);
    });

    return () => {
      socket.off("updateUsers");
      socket.off("incomingCall");
    };
  }, []);

  const startCall = async (user) => {
    setInCall(true);
    setCurrentCall(user.name);

    // Setup WebRTC
    const peerConnection = new RTCPeerConnection();
    peerConnectionRef.current = peerConnection;

    // Get local video/audio stream
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;

    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

    // Handle remote stream
    peerConnection.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Send offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("startCall", { to: user.id, offer });
  };

  const acceptCall = async () => {
    setInCall(true);
    setCurrentCall(currentCall);

    const peerConnection = new RTCPeerConnection();
    peerConnectionRef.current = peerConnection;

    // Get local video/audio
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;

    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

    // Handle remote stream
    peerConnection.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Answer the call
    socket.emit("answerCall", { to: currentCall });
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    setInCall(false);
    setCurrentCall(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Head>
        <title>Community</title>
      </Head>

      <h1 className="text-4xl font-bold text-center mb-4">Community</h1>
      <p className="text-lg text-center mb-8">Connect with online users via voice or video call.</p>

      {/* Online Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <div key={user.id} className={`p-4 rounded-lg shadow-md ${user.online ? "bg-green-600" : "bg-gray-600"}`}>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm">{user.online ? "Online" : "Offline"}</p>
            {user.online && (
              <button
                className="mt-2 bg-blue-500 px-4 py-2 rounded-lg"
                onClick={() => startCall(user)}
              >
                Start Call
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Video Call Section */}
      {inCall && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">In Call with {currentCall}</h2>
          <div className="flex justify-center mt-4 space-x-4">
            <video ref={localVideoRef} autoPlay muted className="w-40 h-40 rounded-lg border-2 border-green-500"></video>
            <video ref={remoteVideoRef} autoPlay className="w-40 h-40 rounded-lg border-2 border-blue-500"></video>
          </div>
          <button
            className="mt-4 bg-red-500 px-4 py-2 rounded-lg"
            onClick={endCall}
          >
            End Call
          </button>
        </div>
      )}
    </div>
  );
}

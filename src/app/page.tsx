//@ts-nocheck
'use client'
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Components/Navbar';
export default function FocusFlowHome() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
     
      <Head>
        <title>FocusFlow - Boost Your Productivity</title>
      </Head>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Supercharge Your Focus with <span className="text-blue-500">FocusFlow</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl">
          Enhance your productivity with brain-training exercises, focus tracking, and guided meditation.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/get-started">
            <button className="bg-blue-500 px-6 py-3 rounded-lg font-semibold text-white hover:bg-blue-600 transition">
              Get Started
            </button>
          </Link>
          <Link href="/learn-more">
            <button className="border border-gray-300 px-6 py-3 rounded-lg text-white hover:bg-gray-800 transition">
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Why FocusFlow?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Brain Training", desc: "Boost memory and concentration with engaging games.", img: "/images/braintrain.png" },
            { title: "Focus Tracking", desc: "Monitor and improve your focus levels over time.", img: "/images/focustrain.png" },
            { title: "Guided Meditation", desc: "Relax and sharpen your mind with mindfulness techniques.", img: "/images/meditate.png" }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="relative w-full h-40 mb-4">
                <Image src={feature.img} alt={feature.title} layout="fill" objectFit="cover" className="rounded" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-300 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-800 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Alex", quote: "FocusFlow helped me stay on track with my studies like never before!" },
            { name: "Jordan", quote: "The guided meditations are a game-changer for my productivity." }
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <p className="text-lg italic text-gray-300">"{testimonial.quote}"</p>
              <h4 className="mt-4 font-semibold text-blue-400">- {testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold">Start Your Focus Journey Today</h2>
        <p className="mt-2 text-gray-300">Join thousands improving their focus and productivity.</p>
        <Link href="/get-started">
          <button className="mt-6 bg-blue-500 px-6 py-3 rounded-lg font-semibold text-white hover:bg-blue-600 transition">
            Get Started Now
          </button>
        </Link>
      </section>
    </div>
  );
}

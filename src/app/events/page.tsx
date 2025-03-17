"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const EventsPage = () => {
  const eventsData = [
    {
      id: "1",
      title: "Summer Camp 2025",
      videoUrl:
        "https://res.cloudinary.com/dz8enfjtx/video/upload/v1741612133/xyzfaalekqkfbklswdgl.mp4",
    },
  ];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle video play
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Handle video pause
  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle play/pause on click/tap
  const togglePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-2 lg:mt-24 flex justify-center items-center  sm:flex-row gap-4"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Events
        </h1>
        <Image
          src="/assets/logo1.png"
          alt="Logo"
          width={60}
          height={60}
          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
        />
      </motion.div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {eventsData.map((event) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: true }}
              key={event.id}
              className="bg-white shadow-lg rounded-3xl p-4 w-full max-w-xs sm:max-w-sm"
            >
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover rounded-2xl"
                  muted
                  loop
                  playsInline
                >
                  <source src={event.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay with Play/Pause Button */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 rounded-2xl cursor-pointer"
                  onClick={togglePlayPause}
                  onMouseEnter={handlePlay}
                  onMouseLeave={handlePause}
                >
                  <button
                    className="w-16 h-16 flex items-center justify-center bg-white bg-opacity-80 rounded-full transition-all hover:bg-opacity-100"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <svg
                        className="w-6 h-6 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 text-center mt-4">
                {event.title}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;

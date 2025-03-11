"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
const page = () => {
  const eventsData = [
    {
      id: "1",
      title: "Summer Camp 2025",
      VideoUrl:
        "https://res.cloudinary.com/dz8enfjtx/video/upload/v1741612133/xyzfaalekqkfbklswdgl.mp4",
    },
  ];

  return (
    <div>
      <div className="w-full h-20  mt-24  ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="mx-auto flex justify-center items-center w-full"
        >
          <h1 className="text-3xl font-bold">Events </h1>
          <Image src={"/assets/logo1.png"} alt="" width={60} height={60} />
        </motion.div>
        {eventsData.map((event) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            key={event.id}
            className="bg-white shadow-md rounded-3xl p-2 m-4 w-72 mx-8"
          >
            <video
              className="mt-2 rounded-3xl"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            >
              <source src={event.VideoUrl} type="video/mp4" />
            </video>

            <h1 className="text-md font-bold p-2 text-center">{event.title}</h1>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default page;

import React from "react";
import { InfiniteFeedBack } from "./ui/infinite-moving-feedback";

const FeedBack = () => {
  return (
    <div className="item-center rounded-md flex flex-col antialiased bg-white items-center mt-6 py-2 relative">
      <h1 className="text-3xl font-bold font-mono py-4 text-center mb-10">
        What <span className="text-red-800">our parents</span> have to say!
      </h1>
      <InfiniteFeedBack items={testimonials} direction="right" speed="slow" />
    </div>
  );
};

export default FeedBack;
const testimonials = [
  {
    quote:
      "Cyborg Robotics has introduced my son to engineering and robotics in an engaging way. The team is knowledgeable, passionate, and patient.",
    name: "Pranoti Thakur",
    image: "/assets/parents/t1.jpg",
    rating: 5,
  },
  {
    quote:
      "Though Divit my son had an idea and knew the basics of Lego but coming to cyborg his robotics skills got enhanced and his knowledge towards AI increased. His future plans of becoming a Robotic Engineer are taking shape and this is all thanks to Team Cyborg",
    name: "Sarika Gemawat",
    image: "/assets/parents/t2.jpeg",
    rating: 5,
  },
  {
    quote:
      "Ira loves her robotics classes and never wants to miss a session. Cyborg makes STEM learning exciting and fun for young kids.",
    name: "DR.Smita",
    image: "/assets/parents/t4.jpg",
    rating: 5,
  },
  {
    quote:
      "Aaryan enjoys his robotics sessions and is progressing well in assembling and programming. Ms. Shikha is an excellent and patient teacher.",
    name: "Indrani Ghosh Choudhary",
    image: "/assets/parents/t5.jpg",
    rating: 5,
  },
  {
    quote:
      "My kids love Cyborg's robotics classes! The instructors make learning fun by relating concepts to real life, ensuring better understanding and retention.",
    name: "Jisha Alex",
    image: "/assets/parents/t3.jpg",
    rating: 5,
  },
];

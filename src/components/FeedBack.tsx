import React from 'react'
import { InfiniteFeedBack } from './ui/infinite-moving-feedback';

const FeedBack = () => {
  return (
    <div className="h-[20rem] item-center rounded-md flex flex-col antialiased bg-white items-center mt-6 py-4 relative overflow-hidden ">
      <h1 className="text-3xl font-bold font-mono py-4 text-center mb-10">
        What <span className='text-red-800'>our parents</span> have to say!
      </h1>
      <InfiniteFeedBack
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>  
  )
}

export default FeedBack

const testimonials = [
  {
    quote:
      "The Cyborg Robotics is a wonderful program which is introducing my son to scientific and engineering foundation, robotics in a thoroughly engaging manner. The children are taught the concepts, are encouraged to use the correct terminology, and get to use Lego and see the concept in action! The team is fabulous – they clearly know the subject very well, are passionate and patient about imparting",
    name: "Pranoti Thakur",
    title: "A Tale of Two Cities",
    image: "/assets/parents/t1.jpeg",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
    image: "/assets/img1.jpeg",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
    image: "/assets/img1.jpeg",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
    image: "/assets/img1.jpeg",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
    image: "/assets/img1.jpeg",
  },
];
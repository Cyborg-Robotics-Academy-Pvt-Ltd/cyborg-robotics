"use client";
// import React, { useState, ChangeEvent, FormEvent } from "react";
import blogs from "../../../blogs.json";
const page = () => {
  // const [image, setImage] = useState<string | null>(null);
  // const [text, setText] = useState<string>("");
  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setImage(URL.createObjectURL(e.target.files[0]));
  //   }
  // };
  // const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setText(e.target.value);
  // };
  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // Handle the submission logic here
  //   console.log("Image:", image);
  //   console.log("Text:", text);
  // };
  console.log(blogs);
  return (
    <div className="mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      {/* <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 rounded p-2"
        />
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Write your blog text here..."
          className="border border-gray-300 rounded p-2 w-full h-32"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        >
          Post
        </button>
      </form> */}
      {/* {image && (
        <img
          src={image}
          alt="Uploaded"
          className="mt-4 w-full h-auto rounded"
        />
      )} */}
    </div>
  );
};

export default page;

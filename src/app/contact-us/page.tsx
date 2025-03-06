import Footer from "@/components/Footer";
import { MailCheck, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="md:mt-24 px-3 sm:px-0 mt-10">
      <h1 className="text-center text-3xl  font-mono font-bold w-full md:mt-28 mt-6">
        <div className="flex items-center justify-center gap-2 w-full mb-20">
          <span className="text-[#8D0F11] font-mono r">Reach</span>{" "}
          <span className="font-mono">US</span>{" "}
          <Image src={"/assets/logo1.png"} alt="" width={40} height={40} />
        </div>
      </h1>
      <div className="w-full flex flex-col sm:flex-row justify-center ">
        <div className="w-full sm:w-1/2">
          <div className="w-full mx-0 sm:mx-24 flex justify-between items-center h-auto sm:h-72">
            <div className="flex flex-col">
              <h1 className="md:text-3xl font-bold text-center text-xl font-mono">
                Cyborg Robotics Academy Private Limited Pvt. Ltd.
              </h1>
              <div className="my-10 flex flex-col sm:flex-row gap-4 items-center font-mono">
                <div className="flex gap-2 mx-4">
                  {/* icon */} <Phone />{" "}
                  <span className="font-mono">+91-9175159292</span>{" "}
                </div>
                <div className="flex gap-2 items-center font-mono">
                  {/* icon */}
                  <MailCheck />
                  <span className="font-mono">info@cyborgrobotics.in</span>
                </div>
              </div>
              <div className="flex md:gap-4  mx-4">
                <MapPin size={28} />
                <h1 className="text-center sm:text-left text-lg font-mono w-full md:w-[60%]">
                  Head Office: PL. No 13, FL. No 2, Kalyani Nagar, Ramnarayan
                  House, Pune:411014
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 mt-8 sm:mt-0">
          <div className="container mx-auto">
            <div className="mx-auto">
              <div className="max-w-md mx-auto px-10 py-6 bg-gray-100 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Contact Us
                </h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-800 mb-1" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      className="w-full px-4 py-2 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 focus:rounded-xl"
                      placeholder="Enter your name"
                      type="text"
                      id="name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-800 mb-1" htmlFor="email">
                      Your Email
                    </label>
                    <input
                      className="w-full px-4 py-2 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 focus:rounded-xl"
                      placeholder="Enter your email"
                      name="email"
                      id="email"
                      type="email"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-800 mb-1"
                      htmlFor="message"
                    >
                      Your Message
                    </label>
                    <textarea
                      className="w-full px-4 py-2 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 focus:rounded-xl"
                      rows={4}
                      placeholder="Enter your message"
                      name="message"
                      id="message"
                    ></textarea>
                  </div>
                  <button
                    className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded-xl hover:bg-yellow-400 transition duration-300"
                    type="submit"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <hr className="border-t-2 border-gray-300 my-4 w-9/12 mx-auto" />

        <Footer />
      </div>
    </div>
  );
};

export default page;

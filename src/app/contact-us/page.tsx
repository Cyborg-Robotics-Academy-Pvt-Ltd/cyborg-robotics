import Footer from "@/components/Footer";
import { MailCheck, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow px-4 sm:px-6 lg:px-8 mt-10 ">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold w-full mt-6 md:mt-28">
          <div className="flex items-center justify-center gap-2 mb-10 ">
            <span className="text-[#8D0F11]">Reach</span>
            <span>US</span>
            <Image
              src={"/assets/logo1.png"}
              alt="Logo"
              width={40}
              height={40}
            />
          </div>
        </h1>

        <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-6 lg:gap-12">
          {/* Contact Info Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md flex flex-col items-center lg:items-start text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">
                Cyborg Robotics Academy Private Limited Pvt. Ltd.
              </h1>
              <div className="my-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                <div className="flex gap-2 items-center">
                  <Phone size={20} />
                  <span className="text-sm sm:text-base">+91-9175159292</span>
                </div>
                <div className="flex gap-2 items-center">
                  <MailCheck size={20} />
                  <span className="text-sm sm:text-base">
                    info@cyborgrobotics.in
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <MapPin size={24} />
                <h1 className="text-sm sm:text-base lg:text-lg">
                  Head Office: PL. No 13, FL. No 2, Kalyani Nagar, Ramnarayan
                  House, Pune:411014
                </h1>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
            <div className="w-full max-w-md px-6 py-8 bg-white rounded-3xl shadow-xl">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
                Contact Us
              </h2>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-gray-800 text-sm sm:text-base mb-1"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                  <input
                    className="w-full px-4 py-2 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                    placeholder="Enter your name"
                    type="text"
                    id="name"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-800 text-sm sm:text-base mb-1"
                    htmlFor="email"
                  >
                    Your Email
                  </label>
                  <input
                    className="w-full px-4 py-2 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                    type="email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-800 text-sm sm:text-base mb-1"
                    htmlFor="message"
                  >
                    Your Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                    rows={4}
                    placeholder="Enter your message"
                    name="message"
                    id="message"
                  ></textarea>
                </div>
                <button
                  className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded-xl hover:bg-yellow-400 transition duration-300 text-sm sm:text-base"
                  type="submit"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default page;

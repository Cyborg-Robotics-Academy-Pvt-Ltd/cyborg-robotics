"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "../../public/assets/logo.png";
import { Mail, MapPinHouse, PhoneCall } from "lucide-react";

interface FooterProps {
  [key: string]: unknown; // Allows any properties
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div>
      <hr className="border-t-1 border-gray-300 my-4 w-[90%] mx-auto" />
      <div className="pt-9 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-8 xl:px-0">
          {/* Four equal sections */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Section 1: Company Info & Social */}
            <div>
              <h1 className="font-extrabold text-black">
                <Image
                  src={logo}
                  width={120}
                  height={120}
                  alt="logo"
                  loading="lazy"
                />
              </h1>
              <p className="mt-4 text-[15px] font-normal text-black/[80%]">
                LEGO electronics combine creativity and technology, allowing
                enthusiasts to build and program their own electronic devices.
              </p>
              <div className="mt-4 flex gap-5">
                <ul className="wrapper gap-2 flex">
                  <Link href="https://www.instagram.com/">
                    <Image
                      src="/assets/social-icons/instagram.webp"
                      width={35}
                      height={35}
                      alt="Instagram"
                      className="cursor-pointer rounded-xl"
                    />
                  </Link>
                  <Link href="https://www.facebook.com/">
                    <Image
                      src="/assets/social-icons/Facebook.webp"
                      width={35}
                      height={35}
                      alt="Facebook"
                      className="cursor-pointer rounded-xl"
                    />
                  </Link>
                  <Link href="https://www.x.com/">
                    <Image
                      src="/assets/social-icons/X.avif"
                      width={35}
                      height={35}
                      alt="X"
                      className="cursor-pointer rounded-xl"
                    />
                  </Link>
                </ul>
              </div>
            </div>

            {/* Section 2: Contact Information */}
            <div>
              <p className="font-inter text-[18px] font-medium text-black mb-4">
                Contact Us
              </p>
              <div className="flex mt-4">
                <div className="flex h-[38px] w-[38px] items-center justify-center">
                  <Mail />
                </div>
                <div className="ml-4">
                  <Link
                    href="mailto:info@cyborgrobotics.in"
                    className="font-Inter text-[14px] font-medium text-black"
                  >
                    info@cyborgrobotics.in
                  </Link>
                </div>
              </div>
              <div className="flex mt-4">
                <div className="flex h-[38px] w-[38px] items-center justify-center">
                  <MapPinHouse />
                </div>
                <div className="ml-4">
                  <Link
                    href="https://goo.gl/maps/xyz"
                    className="font-Inter text-[14px] font-medium text-black"
                  >
                    Head Office: PL. No 13, FL. No 2, Kalyani Nagar, Ramnarayan
                    House, Pune:411014
                  </Link>
                </div>
              </div>
              <div className="flex mt-4">
                <div className="flex h-[38px] w-[38px] items-center justify-center">
                  <PhoneCall />
                </div>
                <div className="ml-4">
                  <Link
                    href="tel:+919175159292"
                    className="font-Inter text-[14px] font-medium text-black"
                  >
                    Phone: +91-9175159292
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 3: Pages Links */}
            <div>
              <p className="font-inter text-[18px] font-medium leading-normal text-black mb-4">
                Pages
              </p>
              <ul>
                <li className="mt-3">
                  <Link
                    className="hover:text-opacity-80 font-inter text-[15px] font-normal hover:font-semibold text-black"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="mt-3">
                  <Link
                    className="hover:text-opacity-80 font-inter text-[15px] font-normal hover:font-semibold text-black"
                    href="/about"
                  >
                    About
                  </Link>
                </li>
                <li className="mt-3">
                  <Link
                    className="hover:text-opacity-80 font-inter text-[15px] font-normal hover:font-semibold text-black"
                    href="/gallery"
                  >
                    Gallery
                  </Link>
                </li>
                <li className="mt-3">
                  <Link
                    className="hover:text-opacity-80 font-inter text-[15px] font-normal hover:font-semibold text-black"
                    href="/contact-us"
                  >
                    contact
                  </Link>
                </li>
                <li className="mt-3">
                  <Link
                    className="hover:text-opacity-80 font-inter text-[15px] font-normal hover:font-semibold text-black"
                    href="/terms-and-conditions"
                  >
                    Terms and conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section 4: Download App Links */}
            <div>
              <p className="font-inter text-[18px] font-medium text-black mb-4">
                Download the app
              </p>
              <div className="flex flex-col gap-4">
                <Link target="_blank" href="#">
                  <Image
                    alt="Google Play Store"
                    loading="lazy"
                    width={80}
                    height={80}
                    src="/assets/logo1.png"
                  />
                </Link>
                <Link target="_blank" href="#">
                  <Image
                    alt="Apple App Store"
                    loading="lazy"
                    width={80}
                    height={80}
                    src="/assets/logo1.png"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <hr className="mt-8 text-black" />
          <div className="flex items-center justify-center pb-8 pt-4">
            <p className="text-[10px] font-normal md:text-[12px] text-black">
              © Copyright All Rights Reserved by Cyborg. PVT. LTD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

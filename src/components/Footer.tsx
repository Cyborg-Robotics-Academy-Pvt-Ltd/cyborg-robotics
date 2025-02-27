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
      <div className="pt-9 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-8 xl:px-0">
          {/* Four equal sections */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Section 1: Company Info & Social */}
            <div>
              <h1 className="font-extrabold text-black">
                <Image src={logo} width={120} height={120} alt="logo" />
              </h1>
              <p className="mt-4 text-[15px] font-normal text-black/[80%]">
                LEGO electronics combine creativity and technology, allowing
                enthusiasts to build and program their own electronic devices.
              </p>
              <div className="mt-4 flex gap-4">
                <ul className="wrapper">
                  <Link href="https://www.instagram.com/">
                    <li className="icon instagram">
                      <span className="tooltip">Instagram</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1.2em"
                        fill="currentColor"
                        className="bi bi-instagram"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923.445.444.445.89.923.923.444.205.526.478.972.923.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                      </svg>
                    </li>
                  </Link>
                  <li className="icon X">
                    <span className="tooltip">X</span>
                    <svg
                      height="1.4em"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="x"
                    >
                      <path d="M18.378 2H21L13.807 10.604L22 22H15.93L10.941 15.316L4.487 22H2L9.732 12.803L2 2H8.186L12.75 8.109L18.378 2ZM17.304 20H18.842L7.595 3.903H5.904L17.304 20Z"></path>
                    </svg>
                  </li>
                  <li className="icon facebook">
                    <span className="tooltip">Facebook</span>
                    <svg
                      viewBox="0 0 320 512"
                      height="1.2em"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                    </svg>
                  </li>
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
                    1234 Street Name, City, Country
                  </Link>
                </div>
              </div>
              <div className="flex mt-4">
                <div className="flex h-[38px] w-[38px] items-center justify-center">
                  <PhoneCall />
                </div>
                <div className="ml-4">
                  <Link
                    href="tel:+1234567890"
                    className="font-Inter text-[14px] font-medium text-black"
                  >
                    Phone: +1 234 567 890
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
                    width={168}
                    height={50}
                    src="https://www.englishyaari.com/img/google-store.svg"
                  />
                </Link>
                <Link target="_blank" href="#">
                  <Image
                    alt="Apple App Store"
                    loading="lazy"
                    width={168}
                    height={50}
                    src="https://www.englishyaari.com/img/apple-store.svg"
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

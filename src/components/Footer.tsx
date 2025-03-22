"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPinHouse, PhoneCall } from "lucide-react";

interface FooterProps {
  [key: string]: unknown;
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-white mt-9">
      <hr className="border-t border-gray-300 my-4 w-[90%] mx-auto" />
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid layout with responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {/* Section 1: Company Info & Social */}
          <div className="space-y-4">
            <Image
              src="/assets/logo.png"
              width={120}
              height={120}
              alt="logo"
              loading="lazy"
              className="w-24 h-auto"
            />
            <p className="text-sm text-black/80 leading-relaxed">
              <span className="text-bold">
                Cyborg Robotics Academy Private Limited Private Limited
              </span>
              is one of the top Robotics Academy in Pune offering various
              technical courses all under one roof.
            </p>
            <div className="flex gap-3">
              <Link href="https://www.instagram.com/">
                <Image
                  src="/assets/social-icons/instagram.webp"
                  width={35}
                  height={35}
                  alt="Instagram"
                  className="rounded-xl  transition-opacity"
                />
              </Link>
              <Link href="https://www.facebook.com/cyborgrobotics/">
                <Image
                  src="/assets/social-icons/Facebook.webp"
                  width={35}
                  height={35}
                  alt="Facebook"
                  className="rounded-xl  transition-opacity"
                />
              </Link>
              <Link href="https://www.x.com/">
                <Image
                  src="/assets/social-icons/X.avif"
                  width={35}
                  height={35}
                  alt="X"
                  className="rounded-xl  transition-opacity"
                />
              </Link>
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black">Contact Us</h3>
            <div className="flex  gap-3 items-center ">
              <Mail className=" mt-1 flex-shrink-0 " size={22} />
              <Link
                href="mailto:info@cyborgrobotics.in"
                className="text-sm text-black hover:underline text-center"
              >
                info@cyborgrobotics.in
              </Link>
            </div>
            <div className="flex items-start  gap-3">
              <MapPinHouse className=" mt-1 flex-shrink-0 " size={22} />
              <Link
                href="https://www.google.com/maps/place/North+Court,+Rd+Number+12,+Jogger's+Park,+Nilanjali+Society,+Kalyani+Nagar,+Pune,+Maharashtra+411006/@18.5492198,73.8982955,786m/data=!3m2!1e3!4b1!4m10!1m2!2m1!1sNorth+court,office+No:2A,+1st+floor,opposite+joggers+park,above+punjab+national+bank,kalyani+nagar,Pune+411+006!3m6!1s0x3bc2c110e47e39a3:0x1790569bae5ab0f4!8m2!3d18.5492148!4d73.9031664!15sCm9Ob3J0aCBjb3VydCxvZmZpY2UgTm86MkEsIDFzdCBmbG9vcixvcHBvc2l0ZSBqb2dnZXJzIHBhcmssYWJvdmUgcHVuamFiIG5hdGlvbmFsIGJhbmssa2FseWFuaSBuYWdhcixQdW5lIDQxMSAwMDYiA4gBAZIBEWNvbXBvdW5kX2J1aWxkaW5n4AEA!16s%2Fg%2F1hjggd2b0?authuser=0&entry=ttu&g_ep=EgoyMDI1MDMxNy4wIKXMDSoASAFQAw%3D%3D"
                className="text-sm text-black hover:underline "
              >
                North Court, Office No: 2A, 1st Floor, Opposite Joggers Park,
                Above Punjab National Bank, Kalyani Nagar, Pune 411 006
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall className=" mt-1 flex-shrink-0" size={22} />
              <Link
                href="tel:+919175159292"
                className="text-sm text-black hover:underline"
              >
                Phone: +91 91751 59292
              </Link>
            </div>
          </div>

          {/* Section 3: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contact-us", label: "Contact" },
                {
                  href: "/terms-conditions",
                  label: "Terms and Conditions",
                },
                {
                  href: "/privacy-policy",
                  label: "Privacy Policy",
                },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-black hover:font-semibold hover:text-black/80 transition-all  hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Download App Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black">Download the App</h3>
            <div className="flex  gap-4 items-center">
              <Link target="_blank" href="#">
                <Image
                  alt="Google Play Store"
                  loading="lazy"
                  width={30}
                  height={30}
                  src="/assets/logo1.png"
                  className="w-16 h-auto hover:opacity-80 transition-opacity"
                />
              </Link>
              <h2>Coming Soon</h2>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <hr className="border-t border-gray-300" />
        <div className="py-6 text-center">
          <p className="text-xs md:text-sm text-black">
            © Copyright All Rights Reserved by Cyborg Robotics Academy Private
            Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

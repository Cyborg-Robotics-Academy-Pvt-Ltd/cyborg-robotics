"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPinHouse, PhoneCall } from "lucide-react";

interface FooterProps {
  [key: string]: unknown; // Allows any properties
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-white mt-9">
      <hr className="border-t border-gray-300 my-4 w-[90%] mx-auto" />
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid layout with responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-8">
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
              LEGO electronics combine creativity and technology, allowing
              enthusiasts to build and program their own electronic devices.
            </p>
            <div className="flex gap-3">
              <Link href="https://www.instagram.com/">
                <Image
                  src="/assets/social-icons/instagram.webp"
                  width={35}
                  height={35}
                  alt="Instagram"
                  className="rounded-xl hover:opacity-80 transition-opacity"
                />
              </Link>
              <Link href="https://www.facebook.com/">
                <Image
                  src="/assets/social-icons/Facebook.webp"
                  width={35}
                  height={35}
                  alt="Facebook"
                  className="rounded-xl hover:opacity-80 transition-opacity"
                />
              </Link>
              <Link href="https://www.x.com/">
                <Image
                  src="/assets/social-icons/X.avif"
                  width={35}
                  height={35}
                  alt="X"
                  className="rounded-xl hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black">Contact Us</h3>
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 mt-1 flex-shrink-0" />
              <Link
                href="mailto:info@cyborgrobotics.in"
                className="text-sm text-black hover:underline"
              >
                info@cyborgrobotics.in
              </Link>
            </div>
            <div className="flex items-start gap-3">
              <MapPinHouse className="w-8 h-6 mt-1 flex-shrink-0" />
              <Link
                href="https://goo.gl/maps/xyz"
                className="text-sm text-black hover:underline"
              >
                North court,office No:2A, 1st floor,opposite joggers park,above
                punjab national bank,kalyani nagar,Pune 411 006
              </Link>
            </div>
            <div className="flex items-start gap-3">
              <PhoneCall className="w-6 h-6 mt-1 flex-shrink-0" />
              <Link
                href="tel:+919175159292"
                className="text-sm text-black hover:underline"
              >
                Phone: +91-9175159292
              </Link>
            </div>
          </div>

          {/* Section 3: Pages Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black">Pages</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contact-us", label: "Contact" },
                {
                  href: "/terms-and-conditions",
                  label: "Terms and Conditions",
                },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-black hover:font-semibold hover:text-black/80 transition-all"
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
              <h2>Comming App soon</h2>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <hr className="border-t border-gray-300" />
        <div className="py-6 text-center">
          <p className="text-xs md:text-sm text-black">
            © Copyright All Rights Reserved by Cyborg. PVT. LTD
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

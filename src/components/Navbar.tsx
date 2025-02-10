"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="" />
    </div>
  );
}

const Navbar = ({
  className,
}: {
  className?: string;
  itemposition?: string;
}) => {
  const { isSignedIn, signOut } = useAuth();
  const [active, setActive] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        className="w-full hidden md:block lg:block"
        initial={{ y: -100 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ zIndex: 1000 }}
      >
        {isMounted && (
          <div className="relative w-full">
            <div className={cn("fixed top-0 inset-x-0 w-full z-50", className)}>
              <Menu setActive={setActive}>
                <Image src={logo} width={150} height={150} alt="logo" />
                <Link
                  href="/"
                  className="text-white dark:text-black text-md font-medium"
                >
                  HOME
                </Link>
                <MenuItem setActive={setActive} active={active} item="ABOUT">
                  <div className="flex flex-col space-y-4 text-md">
                    <HoveredLink href="/about-our-academy">
                      About Our Academy
                    </HoveredLink>
                    <HoveredLink href="/team-members">Team Members</HoveredLink>
                    <HoveredLink href="/national-international-recognitions">
                      National & International Recognitions
                    </HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="ONLINE COURSE"
                >
                  <div className="flex flex-col space-y-4 text-md">
                    <HoveredLink href="/bambino-coding">
                      Bambino Coding
                    </HoveredLink>
                    <HoveredLink href="/animation-coding">
                      Animation & Coding
                    </HoveredLink>
                    <HoveredLink href="/app-designing">
                      App Designing
                    </HoveredLink>
                    <HoveredLink href="/electronics">Electronics</HoveredLink>
                    <HoveredLink href="/arduino">Arduino</HoveredLink>
                    <HoveredLink href="/html-css">HTML & CSS</HoveredLink>
                    <HoveredLink href="/industrial-animation-scripting">
                      Industrial Animation And Scripting
                    </HoveredLink>
                    <HoveredLink href="/python-language">
                      Python Language
                    </HoveredLink>
                    <HoveredLink href="/artificial-intelligence">
                      Artificial Intelligence
                    </HoveredLink>
                    <HoveredLink href="/machine-learning">
                      Machine Learning
                    </HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="CLASSROOM COURSE"
                >
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/bambino-coding">
                      Bambino Coding
                    </HoveredLink>
                    <HoveredLink href="/3d-printing">3D Printing</HoveredLink>
                    <HoveredLink href="/early-simple-machines">
                      Early Simple Machines
                    </HoveredLink>
                    <HoveredLink href="/ev3-robotics">EV3 Robotics</HoveredLink>
                    <HoveredLink href="/animation-coding">
                      Animation & Coding
                    </HoveredLink>
                    <HoveredLink href="/simple-powered-machines">
                      Simple & Powered Machines
                    </HoveredLink>
                    <HoveredLink href="/we-do-pneumatics">
                      WE-DO + Pneumatics
                    </HoveredLink>
                    <HoveredLink href="/iot">IOT</HoveredLink>
                    <HoveredLink href="/app-designing">
                      App Designing
                    </HoveredLink>
                    <HoveredLink href="/electronics">Electronics</HoveredLink>
                    <HoveredLink href="/arduino">Arduino</HoveredLink>
                    <HoveredLink href="/html-css">HTML & CSS</HoveredLink>
                    <HoveredLink href="/industrial-animation-scripting">
                      Industrial Animation And Scripting
                    </HoveredLink>
                    <HoveredLink href="/python-language">
                      Python Language
                    </HoveredLink>
                    <HoveredLink href="/artificial-intelligence">
                      Artificial Intelligence
                    </HoveredLink>
                    <HoveredLink href="/machine-learning">
                      Machine Learning
                    </HoveredLink>
                  </div>
                </MenuItem>
                <Link
                  href="/blog"
                  className="text-white dark:text-black text-md font-medium"
                >
                  BLOG
                </Link>
                <MenuItem setActive={setActive} active={active} item="EVENT">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/web-dev">Web Development</HoveredLink>
                    <HoveredLink href="/interface-design">
                      Interface Design
                    </HoveredLink>
                    <HoveredLink href="/seo">
                      Search Engine Optimization
                    </HoveredLink>
                    <HoveredLink href="/branding">Branding</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="GALLERY">
                  <div className="text-sm grid grid-cols-2 gap-10 p-4">
                    <ProductItem
                      title="Algochurn"
                      href="https://algochurn.com"
                      src="https://assets.aceternity.com/demos/algochurn.webp"
                      description="Prepare for tech interviews like never before."
                    />
                    <ProductItem
                      title="Tailwind Master Kit"
                      href="https://tailwindmasterkit.com"
                      src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                      description="Production ready Tailwind css components for your next project"
                    />
                    <ProductItem
                      title="Moonbeam"
                      href="https://gomoonbeam.com"
                      src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                      description="Never write from scratch again. Go from idea to blog in minutes."
                    />
                    <ProductItem
                      title="Rogue"
                      href="https://userogue.com"
                      src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                      description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                    />
                  </div>
                </MenuItem>
                <Link
                  href="/contact-us"
                  className="text-white text-md font-medium"
                >
                  CONTACT US
                </Link>
                {isSignedIn ? (
                  <button
                    onClick={() => signOut()}
                    className="bg-red-600 font-medium text-md px-6 text-white py-2 rounded-full"
                  >
                    LOG OUT
                  </button>
                ) : (
                  <Link
                    href="/sign-in"
                    className="bg-red-600 font-medium text-md px-6 text-white py-2 rounded-full"
                  >
                    LOG IN
                  </Link>
                )}
              </Menu>
            </div>
          </div>
        )}
      </motion.header>

      {/* Mobile Navigation */}
      {/* <header className="w-full h-12 block md:hidden lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#E1AD01] shadow-md">
        <div className="bg-red-500 h-screen w-80"></div>
      </header> */}

      {/* Mobile Spacer */}
      {/* <div className="w-full h-16 md:hidden block lg:hidden"></div> */}
    </>
  );
};

export default Navbar;

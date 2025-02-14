"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

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

  useEffect(() => {
    // Disable background scrolling when the mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  const toggleAccordion = (item: string) => {
    setOpenAccordion(openAccordion === item ? null : item);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        className="w-full hidden md:block lg:block bg-gray-800 text-white"
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
                  className="text-black text-md font-medium hover:text-red-800"
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
                  <div className="flex flex-col space-y-4 text-sm text-black">
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
                  className="text-black text-md font-medium hover:text-red-800"
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
                  className=" text-black text-md font-medium"
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
      <header className="w-screen block md:hidden lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-md">
        <div className="flex justify-between items-center w-screen  h-14">
          <Image src={logo} width={100} height={100} alt="logo" />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <GiHamburgerMenu className="text-2xl" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed z-50 top-0  left-0 h-full w-80 dark:bg-black shadow-lg md:hidden"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <div className="p-4 text-white flex justify-between items-center">
            <Image src={logo} width={100} height={100} alt="logo" />
            <RxCross1
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl cursor-pointer"
            />
          </div>
          <div className="p-4 text-white">
            <Link href="/" className="block py-2 text-black">
              HOME
            </Link>

            {/* Accordion for About Section */}
            <div>
              <button
                className="flex justify-between w-full py-2 text-left"
                onClick={() => toggleAccordion("about")}
              >
                <span>ABOUT</span>
                <span>{openAccordion === "about" ? "-" : "+"}</span>
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openAccordion === "about" ? "auto" : 0 }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {openAccordion === "about" && (
                  <div className="pl-4">
                    <HoveredLink
                      href="/about-our-academy"
                      className="text-black"
                    >
                      About Our Academy
                    </HoveredLink>
                    <HoveredLink href="/team-members" className="text-black">
                      Team Members
                    </HoveredLink>
                    <HoveredLink
                      href="/national-international-recognitions"
                      className="text-black"
                    >
                      National & International Recognitions
                    </HoveredLink>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Accordion for Online Courses Section */}
            <div>
              <button
                className="flex justify-between w-full py-2 text-left"
                onClick={() => toggleAccordion("onlineCourses")}
              >
                <span>ONLINE COURSES</span>
                <span>{openAccordion === "onlineCourses" ? "-" : "+"}</span>
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: openAccordion === "onlineCourses" ? "auto" : 0,
                }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {openAccordion === "onlineCourses" && (
                  <div className="pl-4">
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
                )}
              </motion.div>
            </div>

            {/* Accordion for Classroom Courses Section */}
            <div>
              <button
                className="flex justify-between w-full py-2 text-left"
                onClick={() => toggleAccordion("classroomCourses")}
              >
                <span>CLASSROOM COURSES</span>
                <span>{openAccordion === "classroomCourses" ? "-" : "+"}</span>
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: openAccordion === "classroomCourses" ? "auto" : 0,
                }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {openAccordion === "classroomCourses" && (
                  <div className="pl-4">
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
                )}
              </motion.div>
            </div>

            <Link href="/blog" className="block py-2 text-black">
              BLOG
            </Link>

            {/* Accordion for Events Section */}
            <div>
              <button
                className="flex justify-between w-full py-2 text-left"
                onClick={() => toggleAccordion("events")}
              >
                <span>EVENTS</span>
                <span>{openAccordion === "events" ? "-" : "+"}</span>
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openAccordion === "events" ? "auto" : 0 }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {openAccordion === "events" && (
                  <div className="pl-4">
                    <HoveredLink href="/web-dev">Web Development</HoveredLink>
                    <HoveredLink href="/interface-design">
                      Interface Design
                    </HoveredLink>
                    <HoveredLink href="/seo">
                      Search Engine Optimization
                    </HoveredLink>
                    <HoveredLink href="/branding">Branding</HoveredLink>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Accordion for Gallery Section */}
            <div>
              <button
                className="flex justify-between w-full py-2 text-left"
                onClick={() => toggleAccordion("gallery")}
              >
                <span>GALLERY</span>
                <span>{openAccordion === "gallery" ? "-" : "+"}</span>
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openAccordion === "gallery" ? "auto" : 0 }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {openAccordion === "gallery" && (
                  <div className="pl-4">
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
                )}
              </motion.div>
            </div>

            <Link href="/contact-us" className="block py-2">
              CONTACT US
            </Link>
            {isSignedIn && (
              <button
                onClick={() => signOut()}
                className="bg-red-600 font-medium text-md px-6 text-white py-2 rounded-full"
              >
                LOG OUT
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Mobile Spacer */}
      <div className="w-full h-16 md:hidden block lg:hidden"></div>
    </>
  );
};

export default Navbar;

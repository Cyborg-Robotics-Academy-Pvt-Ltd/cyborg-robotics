"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { ChevronDown, ChevronUp } from "lucide-react";

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
        className="w-full hidden md:block lg:block bg-gray-800"
        initial={{ y: -100 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ zIndex: 1000 }}
      >
        {isMounted && (
          <div className="relative w-full">
            <div className={cn("fixed top-0 inset-x-0 w-full z-50", className)}>
              <Menu setActive={setActive}>
                <Link href={"/"}>
                  <Image src={logo} width={150} height={150} alt="logo" />
                </Link>
                <Link href="/">
                  <MenuItem setActive={setActive} active={active} item="HOME" />
                </Link>
                <Link href="/about">
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="ABOUT"
                  />
                </Link>

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

                    <HoveredLink href="/web-designing">
                      Web Designing
                    </HoveredLink>
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
                  <div className="flex flex-col space-y-4 text-md text-black">
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
                    <HoveredLink href="/web-designing">
                      Web Designing
                    </HoveredLink>
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
                <Link href="/blogs">
                  <MenuItem setActive={setActive} active={active} item="BLOG" />
                </Link>

                <Link href="/events">
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="EVENTS"
                  />
                </Link>

                <Link href="/gallery">
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="GALLERY"
                  />
                </Link>

                <Link href="/contact-us">
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="CONTACT US"
                  />
                </Link>

                {isSignedIn ? (
                  <button
                    onClick={() => signOut()}
                    className="bg-red-600 font-medium text-md px-6  py-2 rounded-full"
                  >
                    LOG OUT
                  </button>
                ) : (
                  <Link
                    href="sign-in"
                    className="bg-red-700 px-4 py-2 rounded-full "
                  >
                    <button className="text-white">Sign In</button>
                  </Link>
                )}
              </Menu>
            </div>
          </div>
        )}
      </motion.header>

      {/* Mobile Navigation */}
      <header className="w-screen block md:hidden lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-2">
        <div className="flex justify-between items-center w-screen h-14 px-4 ">
          <Image src={logo} width={150} height={150} alt="logo" />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-white shadow-xl px-3 py-2 shadow-gray-300 item-center flex justify-center rounded-xl"
          >
            <GiHamburgerMenu className="text-2xl" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed z-50 px-3 top-0 left-0 h-full w-3/4 bg-white shadow-lg md:hidden"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <div className="p-4 flex justify-between items-center">
            <Image src={logo} width={100} height={100} alt="logo" />

            <RxCross1
              onClick={() => setIsMobileMenuOpen(false)}
              size={18}
              className="text-2xl cursor-pointer  "
            />
          </div>
          <div className="p-4">
            <MenuItem setActive={setActive} active={active} item="HOME">
              HOME
            </MenuItem>

            {/* Accordion for About Section */}
            <div>
              <button
                className="flex justify-between w-full py-2 text-left text-sm font-bold"
                onClick={() => toggleAccordion("about")}
              >
                <span>ABOUT</span>
                <span>
                  {openAccordion === "about" ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </span>
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openAccordion === "about" ? "auto" : 0 }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {openAccordion === "about" && (
                  <div className="pl-4 text-sm py-2">
                    <HoveredLink href="/about">About Our Academy</HoveredLink>

                    <HoveredLink href="/recognitions">
                      National & International Recognitions
                    </HoveredLink>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Accordion for Online Courses Section */}
            <div>
              <button
                className="flex justify-between w-full py-2 text-lef text-sm font-bold"
                onClick={() => toggleAccordion("onlineCourses")}
              >
                <span>ONLINE COURSES</span>
                <span>
                  {openAccordion === "onlineCourses" ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </span>
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
                  <div className="pl-4 text-sm py-2">
                    <HoveredLink href="/bambino-coding">
                      Bambino Coding
                    </HoveredLink>
                    <HoveredLink href="/animation-coding">
                      Animation & Coding
                    </HoveredLink>
                    <HoveredLink href="/app-designing">
                      App Designing
                    </HoveredLink>

                    <HoveredLink href="/web-designing">
                      Web Designing
                    </HoveredLink>
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
                className="flex justify-between w-full py-2 text-left text-sm font-bold"
                onClick={() => toggleAccordion("classroomCourses")}
              >
                <span>CLASSROOM COURSES</span>
                <span>
                  {openAccordion === "classroomCourses" ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </span>
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
                  <div className="pl-4 text-sm py-2">
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
                    <HoveredLink href="/web-designing">
                      Web Designing
                    </HoveredLink>
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

            <MenuItem setActive={setActive} active={active} item="BLOG">
              BLOG
            </MenuItem>

            {/* Accordion for Events Section */}
            <div>
              <button
                className="flex justify-between w-full py-2 text-left text-sm font-bold"
                onClick={() => toggleAccordion("events")}
              >
                <span>EVENTS</span>
                <span>
                  {openAccordion === "events" ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </span>
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openAccordion === "events" ? "auto" : 0 }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {openAccordion === "events" && (
                  <div className="pl-4 text-sm py-2">
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
                className="flex justify-between w-full py-2 text-left text-sm font-bold"
                onClick={() => toggleAccordion("gallery")}
              >
                <span>GALLERY</span>
              </button>
            </div>

            <MenuItem setActive={setActive} active={active} item="CONTACT US">
              CONTACT US
            </MenuItem>
            {isSignedIn && (
              <button
                onClick={() => signOut()}
                className="bg-red-600 font-medium text-md px-6  py-2 rounded-full"
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

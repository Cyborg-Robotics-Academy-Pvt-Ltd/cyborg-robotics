"use client";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { auth } from "../../firebaseConfig";
import { signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
  const [active, setActive] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("Auth state changed, user:", user?.email);
      setUser(user);
      if (user) {
        // Check user role in different collections
        const collections = ["students", "trainers", "admins"];
        for (const collection of collections) {
          const docRef = doc(db, collection, user.uid);
          const docSnap = await getDoc(docRef);
          console.log(`Checking ${collection} collection:`, docSnap.exists());
          if (docSnap.exists()) {
            const role = collection.slice(0, -1);
            console.log("Found role:", role);
            setUserRole(role);
            break;
          }
        }
      } else {
        console.log("No user, setting role to null");
        setUserRole(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Current userRole:", userRole);
  }, [userRole]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/"); // This will now work with the navigation router
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(false); // Set loading to false once mounted
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
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
      {isLoading ? (
        <div className="fixed top-0 inset-x-0 w-full z-50 h-16"></div>
      ) : (
        <>
          {/* Desktop Navigation */}
          <motion.header
            className="w-full hidden md:block lg:block b fixed"
            transition={{ type: "spring", stiffness: 300 }}
            style={{ zIndex: 1000 }}
          >
            {isMounted && (
              <div className="relative w-full">
                <div
                  className={cn("fixed top-0 inset-x-0 w-full z-50", className)}
                >
                  <Menu setActive={setActive}>
                    <Link href={"/"}>
                      <Image
                        src={logo}
                        width={160}
                        height={160}
                        alt="logo"
                        loading="lazy"
                      />
                    </Link>
                    <Link href="/">
                      <MenuItem
                        setActive={setActive}
                        active={active}
                        item="HOME"
                      />
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
                      <div className="flex flex-col space-y-2 text-md">
                        <HoveredLink href="/online-courses/bambino-coding">
                          Bambino Coding
                        </HoveredLink>
                        <HoveredLink href="/online-courses/animation-coding">
                          Animation & Coding
                        </HoveredLink>
                        <HoveredLink href="/online-courses/app-designing">
                          App Designing
                        </HoveredLink>
                        <HoveredLink href="/online-courses/web-designing">
                          Web Designing
                        </HoveredLink>
                        <HoveredLink href="/online-courses/python-language">
                          Python Language
                        </HoveredLink>
                        <HoveredLink href="/online-courses/artificial-intelligence">
                          Artificial Intelligence
                        </HoveredLink>
                        <HoveredLink href="/online-courses/machine-learning">
                          Machine Learning
                        </HoveredLink>
                      </div>
                    </MenuItem>
                    <MenuItem
                      setActive={setActive}
                      active={active}
                      item="CLASSROOM COURSE"
                    >
                      <div className="flex flex-col space-y-2 text-md text-black">
                        <HoveredLink href="/classroom-courses/bambino-coding">
                          Bambino Coding
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/3d-printing">
                          3D Printing
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/early-simple-machines">
                          Early Simple Machines
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/robotics-ev3">
                          EV3 Robotics
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/animation-coding">
                          Animation & Coding
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/simple-powered-machines">
                          Simple & Powered Machines
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/spike-pneumatics">
                          Spike Essential + Pneumatics
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/spike-prime">
                          Spike Prime
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/iot">
                          IOT
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/app-designing">
                          App Designing
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/app-lab">
                          App Lab
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/android-studio">
                          Android Studio
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/electronics">
                          Electronics
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/arduino">
                          Arduino
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/web-designing">
                          Web Designing
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/industrial-animation-scripting">
                          Industrial Animation And Scripting
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/java">
                          Java
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/python-language">
                          Python Language
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/artificial-intelligence">
                          Artificial Intelligence
                        </HoveredLink>
                        <HoveredLink href="/classroom-courses/machine-learning">
                          Machine Learning
                        </HoveredLink>
                      </div>
                    </MenuItem>
                    <Link href="/blogs">
                      <MenuItem
                        setActive={setActive}
                        active={active}
                        item="BLOG"
                      />
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

                    {user ? (
                      <>
                        <Link href={`/${userRole}-dashboard`}>
                          <MenuItem
                            setActive={setActive}
                            active={active}
                            item="DASHBOARD"
                          />
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="bg-red-800 px-4 py-2 rounded-full text-white"
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/login"
                        className="bg-red-800 px-4 py-2 rounded-full"
                      >
                        <button className="text-white">Log In</button>
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
              <Image src={logo} width={150} height={150} alt="logo" priority />
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
                        <HoveredLink href="/about">
                          About Our Academy
                        </HoveredLink>

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
                    className="flex justify-between w-full py-2 text-left text-sm font-bold"
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
                        <HoveredLink href="/3d-printing">
                          3D Printing
                        </HoveredLink>
                        <HoveredLink href="/early-simple-machines">
                          Early Simple Machines
                        </HoveredLink>
                        <HoveredLink href="/ev3-robotics">
                          EV3 Robotics
                        </HoveredLink>
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
                        <HoveredLink href="/electronics">
                          Electronics
                        </HoveredLink>
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
                    animate={{
                      height: openAccordion === "events" ? "auto" : 0,
                    }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {openAccordion === "events" && (
                      <div className="pl-4 text-sm py-2">
                        <HoveredLink href="/web-dev">
                          Web Development
                        </HoveredLink>
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

                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="CONTACT US"
                >
                  CONTACT US
                </MenuItem>
                {user ? (
                  <>
                    <Link href={`/${userRole}-dashboard`}>
                      <div className="py-2 text-sm font-bold">DASHBOARD</div>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="bg-red-600 font-medium text-md px-6 py-2 rounded-full text-white mt-4"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link href="/login">
                    <button className="bg-red-600 font-medium text-md px-6 py-2 rounded-full text-white">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}

          {/* Mobile Spacer */}
          <div className="w-full h-16 md:hidden block lg:hidden"></div>
        </>
      )}
    </>
  );
};

export default Navbar;

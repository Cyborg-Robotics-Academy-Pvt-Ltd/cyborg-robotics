"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronUp, ChevronDown, AlignRight, X } from "lucide-react";
import { User } from "firebase/auth";
import styles from "./NavbarMenu.module.css";

// Define types for menu items
interface SubItem {
  href: string;
  label: string;
}

interface MenuItem {
  href?: string;
  label: string;
  subItems?: SubItem[];
}

interface NavbarMenuProps {
  user: User | null;
  userRole: string | null;
  handleSignOut: () => Promise<void>;
  menuItems: Array<{
    href?: string;
    label: string;
    subItems?: Array<{ href: string; label: string }>;
  }>;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({
  user,
  userRole,
  handleSignOut,
  menuItems,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  // Effect to handle body overflow
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Menu animation variants
  const menuVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "tween", // Changed from spring to tween for more immediate response
        duration: 0.25, // Faster duration
        ease: "easeOut",
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween", // Using tween for faster initial movement
        duration: 0.3, // Slightly longer than close for better user experience
        ease: "easeOut",
      },
    },
  };

  // Overlay animation variants
  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  // Handler for menu toggle with preloading trick
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="relative block md:block lg:hidden">
      <div
        className="bg-white w-screen items-center shadow-xl h-16 py-1 flex justify-between px-4"
        style={{ height: "60px" }}
      >
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-opacity-50 rounded-md"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <AlignRight size={28} />
          </button>
          <Link href={"/"}>
            <Image
              alt="Company Logo"
              src={"/assets/logo.png"}
              height={110}
              width={110}
              className="p-1"
              priority={true} // Priority loading for logo
            />
          </Link>
        </div>

        {user && userRole ? (
          <Link
            href={`/${userRole}-dashboard`}
            className="bg-red-800 px-3 py-1 rounded-full text-white"
          >
            <button aria-label="Dashboard">Dashboard</button>
          </Link>
        ) : (
          <Link
            href="/login"
            className="bg-red-800 px-4 py-2 rounded-full"
            title="Log In"
          >
            <button className="text-white">Log In</button>
          </Link>
        )}
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/35 z-40"
              onClick={() => setMenuOpen(false)}
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
            />

            {/* Menu */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 left-0 w-72 h-screen bg-white z-50 shadow-2xl overflow-y-scroll p-1"
              role="navigation"
              aria-label="Main Navigation"
            >
              <Link href={"/"} className="">
                <Image
                  src={"/assets/logo.png"}
                  width={130}
                  height={130}
                  alt="Company Logo"
                  loading="eager" // Changed from lazy to eager for faster menu appearance
                  quality={75}
                  className="mx-auto p-1 mt-5"
                />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute right-2 top-2 bg-white shadow-xl p-1 rounded-full shadow-gray-300"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>

              {/* Regular menu items with optimized animations */}
              {menuItems.map((item: MenuItem, idx) => (
                <div
                  key={item.label}
                  className={`mx-3 ${styles.menuItem} ${styles.menuItemAnimated}`}
                  style={{
                    // Progressive delay for each menu item
                    animationDelay: `${0.05 + idx * 0.03}s`,
                  }}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block p-2 text-black font-semibold"
                      onClick={() => setMenuOpen(false)}
                      aria-label={`Navigate to ${item.label}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="block p-2 text-black">
                      <button
                        onClick={() => {
                          setActiveSubMenu(
                            activeSubMenu === item.label ? null : item.label
                          );
                        }}
                        className="w-full text-left flex justify-between items-center"
                        aria-label={`Toggle submenu for ${item.label}`}
                        aria-expanded={activeSubMenu === item.label}
                      >
                        <span className="font-semibold">{item.label}</span>
                        {activeSubMenu === item.label ? (
                          <ChevronUp size={20} className="ml-2" />
                        ) : (
                          <ChevronDown size={20} className="ml-2" />
                        )}
                      </button>
                      <AnimatePresence>
                        {activeSubMenu === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: { duration: 0.2 },
                              opacity: { duration: 0.2 },
                            }}
                            className="ml-4 overflow-hidden"
                          >
                            {item.subItems &&
                              item.subItems.map((subItem, index) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="block p-1 text-black"
                                  onClick={() => setMenuOpen(false)}
                                  aria-label={`Navigate to ${subItem.label}`}
                                >
                                  <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                  >
                                    {subItem.label}
                                  </motion.div>
                                </Link>
                              ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}

              <div className="mx-3 mt-4">
                {user && (
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMenuOpen(false);
                    }}
                    className="w-[50%] mx-auto bg-red-800 px-4 py-2 rounded-full text-white"
                    aria-label="Log Out"
                  >
                    Log Out
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CSS animations are now handled by the imported CSS module */}
    </nav>
  );
};

export default NavbarMenu;

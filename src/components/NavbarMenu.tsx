"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { menuItems } from "../../utils/MenuItemsData";
import Image from "next/image";
import { ChevronUp, ChevronDown, AlignRight, X } from "lucide-react";

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

const NavbarMenu = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  // Effect to handle body overflow
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]); // Run effect when menuOpen changes

  return (
    <nav className="relative block md:block lg:hidden ">
      <div
        className="bg-white w-screen shadow-xl h-16 py-1 flex justify-between px-4"
        style={{ height: "60px" }}
      >
        <Link href={"/"}>
          <Image
            alt="Company Logo"
            src={"/assets/logo.png"}
            height={120}
            width={120}
            className="p-1"
          />
        </Link>
        <div className="bg-white p-2 my-auto rounded-xl shadow-lg shadow-gray-400">
          <motion.div
            transition={{ type: "spring", stiffness: 300, damping: 50 }}
          >
            <AlignRight
              size={28}
              className=" "
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            />
          </motion.div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/35 opacity-50 z-40" // Full-screen overlay
          onClick={() => setMenuOpen(false)} // Close menu on overlay click
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // Increased duration for smoother overlay transition
        />
      )}

      {menuOpen && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 50 }} // Increased damping for smoother animation
          className="fixed top-0 left-0 w-72 h-screen bg-white z-50 shadow-2xl overflow-y-scroll p-2"
          role="navigation" // Added role for better accessibility
          aria-label="Main Navigation" // Added aria-label for better accessibility
        >
          <Link href={"/"} className=" ">
            <Image
              src={"/assets/logo.png"}
              width={130}
              height={130}
              alt="Company Logo"
              loading="lazy"
              quality={75}
              className="mx-auto p-1 mt-5"
            />
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute right-2 top-2 bg-white shadow-xl p-1 rounded-full shadow-gray-300"
            aria-label="Close menu" // Added aria-label for better accessibility
          >
            <motion.div
              initial={{ rotate: 0, scale: 1 }}
              animate={{ rotate: menuOpen ? 0 : 90, scale: menuOpen ? 1 : 1.2 }}
              exit={{ rotate: 90, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <X size={28} />
            </motion.div>
          </button>
          {menuItems.map((item: MenuItem) => (
            <div key={item.label} className="mx-3">
              {item.href ? (
                <Link
                  href={item.href}
                  className="block p-2 text-black font-semibold"
                  onClick={() => setMenuOpen(false)}
                  aria-label={`Navigate to ${item.label}`} // Added aria-label for better accessibility
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
                    aria-label={`Toggle submenu for ${item.label}`} // Added aria-label for better accessibility
                  >
                    <span className="font-semibold">{item.label}</span>
                    {activeSubMenu === item.label ? (
                      <ChevronUp size={20} className="ml-2" />
                    ) : (
                      <ChevronDown size={20} className="ml-2" />
                    )}
                  </button>
                  {activeSubMenu === item.label && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="ml-4"
                    >
                      {item.subItems &&
                        item.subItems.map((subItem, index) => (
                          <motion.a
                            key={subItem.label}
                            href={subItem.href}
                            className="block p-1 text-black"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.03 }}
                            aria-label={`Navigate to ${subItem.label}`} // Added aria-label for better accessibility
                          >
                            {subItem.label}
                          </motion.a>
                        ))}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default NavbarMenu;

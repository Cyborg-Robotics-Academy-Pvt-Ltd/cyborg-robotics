"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { menuItems } from "../../utils/MenuItemsData";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { ChevronUp, ChevronDown } from "lucide-react";

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
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]); // Run effect when menuOpen changes

  return (
    <div className="relative block md:block lg:hidden ">
      <div className="bg-white w-screen shadow-xl h-16 p-2 flex justify-between">
        <Image alt="logo" src={"/assets/logo.png"} height={120} width={120} />
        <div className="bg-white p-2 my-auto rounded-lg shadow-xl">
          <GiHamburgerMenu
            size={28}
            className=" "
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>
      {menuOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 w-64 h-screen bg-white z-50 shadow-2xl overflow-y-scroll"
        >
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute right-10"
          >
            cross
          </button>
          <h1 className="text-center p-4">Logo</h1>
          {menuItems.map((item: MenuItem) => (
            <div key={item.label} className="mx-3">
              {item.href ? (
                <Link
                  href={item.href}
                  className="block p-2 text-black"
                  onClick={() => setMenuOpen(false)}
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
                  >
                    <span>{item.label}</span>
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
    </div>
  );
};

export default NavbarMenu;

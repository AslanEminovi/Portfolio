"use client";

import React, { useState, useEffect } from "react";
import ServicesDropdown from "./services";
import Link from "next/link";
import { FaLightbulb } from "react-icons/fa";
import clsx from "clsx";

const Navbar: React.FC<{
  isDarkMode: boolean;
  toggleTheme: () => void;
  scrollToBlogSection: () => void;
  scrollToAboutUsSection: () => void; // Add scrollToAboutUsSection prop
  showNavbar: boolean; // Add showNavbar prop
}> = ({ isDarkMode, toggleTheme, scrollToBlogSection, scrollToAboutUsSection, showNavbar }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={clsx(
          "fixed top-2 left-1/2 transform -translate-x-1/2 transition-all duration-250 z-50 px-6 py-3 rounded-full",
          {
            "bg-white": !isDarkMode && !isScrolled,
            "bg-white shadow-black-shadow": !isDarkMode && isScrolled,
            "bg-black": isDarkMode && !isScrolled,
            "bg-black shadow-white-shadow": isDarkMode && isScrolled,
            "translate-y-0": showNavbar,
            "-translate-y-full": !showNavbar,
          }
        )}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Right Section: Navigation Items */}
          <div className="flex items-center space-x-4">
            <ServicesDropdown />
            <div className="relative">
              <Link
                href="#hero-parallax-page"
                className="relative px-6 py-3 text-sm font-medium text-white bg-black border border-gray-500 rounded-full hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-500"
                aria-label="View Products"
              >
                Products
              </Link>
            </div>
            <div className="relative">
              <button
                onClick={scrollToBlogSection}
                className="relative px-6 py-3 text-sm font-medium text-white bg-black border border-gray-500 rounded-full hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-500"
                aria-label="Scroll to Blog Section"
              >
                Blog
              </button>
            </div>
            <div className="relative">
              <button
                onClick={scrollToAboutUsSection}
                className="relative px-6 py-3 text-sm font-medium text-white bg-black border border-gray-500 rounded-full hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-500"
                aria-label="Scroll to About Us Section"
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={clsx(
          "fixed top-4 right-6 text-2xl hover:text-gray-300 z-50 transition-colors duration-500",
          {
            "text-yellow-300": isDarkMode,
            "text-gray-800": !isDarkMode,
          }
        )}
        aria-label="Toggle Theme"
      >
        <FaLightbulb />
      </button>
    </>
  );
};

export default Navbar;
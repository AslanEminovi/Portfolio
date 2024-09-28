"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Cover } from "@/components/ui/cover";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import Navbar from "../Navbar";
import BlogPage from "../../components/Pages/BlogPage";
import AboutUs from '../../components/Pages/AboutUsPage';
import HeroParallaxPage from "./HeroParallaxPage";
import { ExpandableCardDemo } from "../ui/ExpCards";

export default function MainPage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down'>('up');
  const blogSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutUsSectionRef = useRef<HTMLDivElement | null>(null);
  const ExpCardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode === null) return;

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => (prevMode === null ? true : !prevMode));
  };

  const scrollToBlogSection = () => {
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAboutUsSection = () => {
    if (aboutUsSectionRef.current) {
      aboutUsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (currentScrollY > lastScrollY.current) {
        scrollDirection.current = 'down';
      } else {
        scrollDirection.current = 'up';
      }

      if (currentScrollY > 100 && scrollDirection.current === 'down') {
        setShowNavbar(false);
      } else if (scrollDirection.current === 'up' && currentScrollY + windowHeight < documentHeight - 10) {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  if (isDarkMode === null) {
    return null;
  }

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        scrollToBlogSection={scrollToBlogSection}
        scrollToAboutUsSection={scrollToAboutUsSection}
        showNavbar={showNavbar}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={twMerge(
          "flex flex-col items-center justify-center min-h-screen pt-20",
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        )}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl mb-4"
        >
          👨‍💻
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl mb-5 text-center font-sans"
        >
          Unlock your business potential and grow exponentially with{" "}
          <Cover>
            <span className="text-5xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              SynQuad
            </span>
          </Cover>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg mb-8 text-center text-gray-400 font-sans max-w-2xl mx-auto"
        >
          We specialize in offering comprehensive SEO optimization, cutting-edge website development, targeted advertisements, and a wide range of digital solutions to help your business thrive in the online world.
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
        </motion.div>
        <SocialIcons />
      </motion.div>

      <div>
        <HeroParallaxPage isDarkMode={isDarkMode} />
      </div>

      <div ref={blogSectionRef}>
        <BlogPage isDarkMode={isDarkMode} />
      </div>

      <div ref={aboutUsSectionRef}>
        <AboutUs isDarkMode={isDarkMode} />
      </div>

      <div ref={ExpCardsRef} className={`flex justify-start p-4 ${isDarkMode ? 'dark' : ''}`}>
        <ExpandableCardDemo isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

"use client";

import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaReact, FaHtml5, FaCss3Alt, FaAngular } from 'react-icons/fa';
import { SiJavascript, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
// import { GiShadcn } from 'react-icons/gi'; // This line is causing an error
import { motion } from 'framer-motion';

const SocialIcons: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Social Media Icons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex space-x-4 text-2xl text-gray-500" // Changed space-x-6 to space-x-4
      >
        <a
          href="https://linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-gray-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-gray-300"
        >
          <FaGithub />
        </a>
        <a
          href="mailto:your-email@example.com"
          aria-label="Email"
          className="hover:text-gray-300"
        >
          <FaEnvelope />
        </a>
      </motion.div>

      {/* Technology Icons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex space-x-6 text-6xl text-gray-500 mt-20" // Changed mt-10 to mt-20
      >
        <FaReact title="ReactJS" className="hover:text-blue-400" />
        <SiJavascript title="JavaScript" className="hover:text-yellow-200" />
        <FaHtml5 title="HTML5" className="hover:text-orange-400" />
        <FaCss3Alt title="CSS3" className="hover:text-blue-400" />
        <SiNextdotjs title="Next.js" className="hover:text-gray-700" />
        <FaAngular title="Angular" className="hover:text-red-600" />
        <SiTailwindcss title="TailwindCSS" className="hover:text-blue-500" />
        {/* <GiShadcn title="ShadcnUI" className="hover:text-purple-500" /> */} {/* This icon is not available */}
      </motion.div>
    </div>
  );
};

export default SocialIcons;
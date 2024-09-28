import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const AboutUs = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div
      className={twMerge(
        "min-h-screen p-8",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-6xl mb-4"
      >
        About Us
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-lg mb-8 text-center text-gray-400 font-sans max-w-2xl mx-auto"
      >
        We are a company dedicated to providing the best services to our customers. Our team is composed of highly skilled professionals who are passionate about what they do.
      </motion.div>
      {/* Add more content here as needed */}
    </div>
  );
};

export default AboutUs;
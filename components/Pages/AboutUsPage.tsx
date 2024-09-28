import React, { useRef } from "react";
// Removed unused import of 'motion'
// import { motion } from "framer-motion";
import AnimatedText from "../AnimatedText";
import { twMerge } from "tailwind-merge";

const AboutUsPage = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const aboutUsSectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={aboutUsSectionRef}
      className={twMerge(
        "min-h-screen p-8",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <AnimatedText className="text-6xl mb-4" delay={0.2}>
        About Us
      </AnimatedText>
      <AnimatedText className="text-4xl mb-2 text-center font-sans" delay={0.4}>
        Welcome to the About Us Section
      </AnimatedText>
      <AnimatedText className="text-lg mb-8 text-center text-gray-400 font-sans" delay={0.6}>
        We are a company dedicated to providing the best services to our customers.
      </AnimatedText>
      {/* Add more content here to enable scrolling */}
      <AnimatedText className="text-lg mb-8 text-center text-gray-400 font-sans" delay={0.8}>
        Our mission is to deliver high-quality products that bring value to our clients.
      </AnimatedText>
      <AnimatedText className="text-lg mb-8 text-center text-gray-400 font-sans" delay={1}>
        Our team consists of experienced professionals who are passionate about their work.
      </AnimatedText>
      <AnimatedText className="text-lg mb-8 text-center text-gray-400 font-sans" delay={1.2}>
        We believe in continuous improvement and innovation to meet the evolving needs of our clients.
      </AnimatedText>
      <AnimatedText className="text-lg mb-8 text-center text-gray-400 font-sans" delay={1.4}>
        Contact us to learn more about our services and how we can help you achieve your goals.
      </AnimatedText>
      <AnimatedText className="text-lg mb-8 text-center text-gray-400 font-sans" delay={1.6}>
        Additional content to make the page scrollable.
      </AnimatedText>
      <AnimatedText className="text-lg mb-8 text-center text-gray-400 font-sans" delay={1.8}>
        More content...
      </AnimatedText>
      <AnimatedText className="text-lg mb-8 text-center text-gray-400 font-sans" delay={2}>
        Even more content...
      </AnimatedText>
    </div>
  );
};

export default AboutUsPage;
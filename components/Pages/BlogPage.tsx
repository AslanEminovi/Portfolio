import React, { useRef } from "react";
// Removed unused import of 'motion'
// import { motion } from "framer-motion";
import AnimatedText from "../AnimatedText";
import { twMerge } from "tailwind-merge";

const BlogPage = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const blogSectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={blogSectionRef}
      className={twMerge(
        "min-h-screen p-8",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <AnimatedText className="text-6xl mb-4" delay={0.2}>
        Blog Section
      </AnimatedText>
      <AnimatedText className="text-4xl mb-2 text-center font-sans" delay={0.4}>
        Welcome to the Blog Section
      </AnimatedText>
      <AnimatedText className="text-lg mb-8 text-center text-gray-400 font-sans" delay={0.6}>
        This is the content of the blog section.
      </AnimatedText>
      {/* Add more content here to enable scrolling */}
      <AnimatedText className="text-lg mb-8 text-center text-gray-400 font-sans" delay={0.8}>
        Additional content to make the page scrollable.
      </AnimatedText>
      <AnimatedText className="text-lg mb-8 text-center text-gray-400 font-sans" delay={1}>
        More content...
      </AnimatedText>
      <AnimatedText className="text-lg mb-8 text-center text-gray-400 font-sans" delay={1.2}>
        Even more content...
      </AnimatedText>
    </div>
  );
};

export default BlogPage;
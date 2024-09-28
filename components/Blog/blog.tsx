import React from "react";

const Blog: React.FC<{ scrollToSection: () => void }> = ({ scrollToSection }) => {
  return (
    <button
      onClick={scrollToSection}
      className="inline-flex justify-center w-auto px-6 py-3 text-sm font-medium text-white bg-black dark:bg-gray-800 border-2 border-purple-800 dark:border-gray-700 rounded-full hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
      aria-label="Navigate to Blog Section"
    >
      Blog
    </button>
  );
};

export default Blog;
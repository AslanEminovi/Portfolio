import React from "react";

interface ContactUsProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onMouseEnter, onMouseLeave }) => {
  return (
    <button
      className="relative text-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text px-4 py-2 rounded-md"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      Contact Us
      {/* Optional: You can add an icon or indicator here */}
    </button>
  );
};

export default ContactUs;

"use client"; // Add this line at the top

import React, { createContext, useRef, ReactNode, useContext } from 'react';

interface ScrollContextProps {
  blogSectionRef: React.RefObject<HTMLDivElement>;
  scrollToBlogSection: () => void;
}

const ScrollContext = createContext<ScrollContextProps | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const blogSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToBlogSection = () => {
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ScrollContext.Provider value={{ blogSectionRef, scrollToBlogSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
};

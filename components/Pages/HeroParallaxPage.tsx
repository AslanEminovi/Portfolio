"use client";

import React from "react";
import { HeroParallax } from "@/components/ui/HeroParallax";

const products = [
  { title: "Aceternity UI", link: "/aceternityui", thumbnail: "/aceternityui.png" },
  { title: "Algochurn", link: "/algochurn", thumbnail: "/algochurn.png" },
  { title: "Cursor", link: "/cursor", thumbnail: "/cursor.png" },
  { title: "Editorially", link: "/editorially", thumbnail: "/editorially.png" },
  { title: "Eidtrix", link: "/eidtrix", thumbnail: "/eidtrix.png" },
  { title: "Moonbeam", link: "/moonbeam", thumbnail: "/moonbeam.png" },
  { title: "Pixel Perfect", link: "/pixelperfect", thumbnail: "/pixelperfect.png" },
  { title: "Rogue", link: "/rogue", thumbnail: "/rogue.png" },
  { title: "Cremedigital", link: "/cremedigital", thumbnail: "/cremedigital.png" },
  { title: "Renderwork", link: "/renderwork", thumbnail: "/renderwork.png" },
  { title: "Smartbridge", link: "/smartbridge", thumbnail: "/smartbridge.png" },
];

const HeroParallaxPage = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div id="hero-parallax-page">
      <HeroParallax products={products} isDarkMode={isDarkMode} />
    </div>
  );
};

export default HeroParallaxPage;
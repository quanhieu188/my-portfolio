"use client";

import { useState, useEffect } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const navLinks = [
  { name: "Home", path: "#home" },
  { name: "Skills", path: "#skill" },
  { name: "Projects", path: "#projects" },
  { name: "Contact", path: "#contact" },
];

const Header = ({ theme, onChangeTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isManualScroll, setIsManualScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll) return;

      let currentSection = "";
      navLinks.forEach((section) => {
        const element = document.getElementById(section.path.split("#")[1]);
        if (element) {
          const { top } = element.getBoundingClientRect();
          if (top <= 200) {
            currentSection = section.path;
          }
        }
      });

      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScroll]);

  return (
    <header
      className={twMerge(
        "sticky top-0 z-30 w-full border-b border-transparent bg-gray max-md:border-gray-100",
        isScrolled ? "bg-gray/50 backdrop-blur-xl md:border-gray-100" : "",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4 md:px-8">
        <div></div>
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex list-none items-center gap-6">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a href={link.path}>{link.name}</a>
              </li>
            ))}
          </ul>
          <div className="h-6 w-0.5 bg-gray-100"></div>
          <div className="flex items-center gap-4">
            <button
              onClick={onChangeTheme}
            >
              {theme === "dark" ? (
                <IoSunnyOutline className="text-secondary w-8 h-8 hover:bg-secondary/20 p-1.5 rounded-md transition-colors" />
              ) : (
                <IoMoonOutline className="text-secondary w-8 h-8 hover:bg-white/80 p-1.5 rounded-md transition-colors" />
              )}
            </button>
            {/* <DownloadCV /> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

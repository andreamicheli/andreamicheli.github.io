import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const [isVisible, setisVisible] = useState(true);
  const [showBar, setShowBar] = useState(false);
  let timeout = null;

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);

    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, []);

  const listenToScroll = () => {
    setisVisible(false);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setisVisible(true);
    }, 200);
  };

  const sections = [
    "Home",
    "About",
    "Education",
    "Experience",
    "Projects",
    "Contacts",
  ];

  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  function Tags() {
    if (showBar)
      return sections.map((sec, i) => {
        return (
          <motion.span
            key={sec}
            initial={{ opacity: 0, y: 0, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.9 }}
            transition={{
              delay: (sections.length - 1 - i) * 0.08,
              duration: 0.45,
              ease: "easeIn",
            }}
            className="px-4 py-2 rounded-2xl text-white bg-peri_light/80 backdrop-blur-3xl backdrop-brightness-90
              hover:bg-peri_medium hover:bg-opacity-100 shadow-sm hover:shadow-md transition-colors transition-shadow cursor-pointer
              border border-peri_light/30 lg:text-base text-sm"
            onClick={(e) => {
              scrollToSection(sec);
              e.stopPropagation();
            }}
          >
            {sec}
          </motion.span>
        );
      });
    else return null;
  }

  return (
    <>
      <div
        className={
          isVisible
            ? "flex flex-row gap-4 transition-opacity duration-300  opacity-100"
            : "flex flex-row gap-4 transition-opacity duration-300 opacity-0"
        }
      >
        <div
          className={
            "flex gap-2 h-8 items-center rounded-2xl lg:max-w-screen-2xl max-w-screen-sm pl-4 flex-wrap justify-between"
          }
        >
          <Tags></Tags>
        </div>
        <div
          className="border-[1px] border-cream_extralight rounded-full !h-8 !w-8 flex text-center justify-center items-center bg-peri_dark group cursor-pointer"
          onClick={(e) => {
            setShowBar(!showBar);
            e.stopPropagation();
          }}
        >
          <span className="group-hover:scale-150 group-hover:shadow-md transition-all">
            <div className="h-2 w-2 bg-cream_extralight rounded-full"></div>
          </span>
        </div>
      </div>
    </>
  );
}

export default Navbar;

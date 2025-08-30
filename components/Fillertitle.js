import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Fillertitle = ({ title, progress }) => {
  const backgroundSize = useTransform(progress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <motion.div
      style={{
        background: "linear-gradient(to right, #FAF8ED, #d4d5ec) no-repeat",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        backgroundSize, // Adjust as needed
        transition: "background-size 0.5s linear",
      }}
      className="lg:text-[20vh] text-6xl font-extrabold text-cream_extralight text-opacity-20 absolute"
    >
      {title.toUpperCase()}
    </motion.div>
  );
};

export default Fillertitle;

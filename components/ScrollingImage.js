import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AnimatedImage = ({ src, alt, start, end, speed }) => {
  const { scrollY } = useScroll();

  // Define the Y position and opacity transformations
  const y = useTransform(scrollY, [start, end], [200, -200 * speed], {
    clamp: false,
  });
  const opacity = useTransform(scrollY, [start, end], [1, 0]);

  return (
    <motion.div
      style={{
        position: "relative",
        width: "300px", // Adjust the size as needed
      }}
      whileHover={{
        filter: "invert(1)",
        transition: { duration: 0.5, ease: "easeIn" },
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          opacity,
          position: "absolute",
          width: "100%",
          filter: "invert(0)",
        }}
      />
      <motion.span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          opacity: 0,
        }}
        whileHover={{
          opacity: 1,
        }}
      >
        {alt}
      </motion.span>
    </motion.div>
  );
};

export default AnimatedImage;

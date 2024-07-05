import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AnimatedImage = ({
  src,
  alt,
  indexes,
  speed,
  width = 300,
  label = "",
}) => {
  const { scrollY } = useScroll();
  const [itsHovering, setItsHovering] = React.useState("");
  // Define the Y position and opacity transformations
  const y = useTransform(
    scrollY,
    [indexes[0], indexes[1]],
    [200, -200 * speed],
    {
      clamp: false,
    }
  );
  // const opacity = useTransform(scrollY, [indexes[0], indexes[1]], [1, 0]);

  return (
    <motion.div
      style={{
        position: "relative",
        width: width + "px", // Adjust the size as needed
        paddingTop: "75%",
        y, // Apply the scrolling offset to the parent div
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          // opacity,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }}
        whileHover={{
          filter: "brightness(0.4)",
          transition: { duration: 0.5, ease: "easeIn" },
        }}
        onHoverStart={() => setItsHovering(src)}
        onHoverEnd={() => setItsHovering("")}
      />
      <motion.span
        style={{
          position: "absolute",
          top: "50%", // Center the span vertically
          left: 0,
          width: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          color: "#F5C825",
          opacity: itsHovering === src ? 1 : 0, // Hide the span by default
          marginLeft: "auto",
          marginRight: "auto",
          transform: "translate(25%, 25%)", // Center the span horizontally
          transition: "opacity 0.5s",
          pointerEvents: "none",
        }}
        onHoverStart={(e) => e.preventDefault()}
      >
        <p className="w-fit h-fit bg-black p-2">{label}</p>
      </motion.span>
    </motion.div>
  );
};

export default AnimatedImage;

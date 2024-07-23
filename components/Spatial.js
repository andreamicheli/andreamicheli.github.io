import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image"; // Assuming you're using Next.js

const Spatial = ({ pictures }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale0 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 6]);

  const picturesObject = [
    {
      src: pictures[0],
      scale: scale0,
    },
    {
      src: pictures[1],
      scale: scale1,
    },
    {
      src: pictures[2],
      scale: scale2,
    },
  ];

  // Define dynamic styles based on the index
  const getImageContainerStyles = (index) => {
    switch (index) {
      case 0:
        return { width: "25vw", height: "25vh" };
      case 1:
        return { top: "-30vh", left: "5vw", width: "35vw", height: "30vh" };
      case 2:
        return { top: "-10vh", left: "-25vw", width: "20vw", height: "45vh" };
      case 3:
        return { left: "27.5vw", width: "25vw", height: "25vh" }; // top is not changed
      case 4:
        return { top: "27.5vh", left: "5vw", width: "20vw", height: "25vh" };
      case 5:
        return {
          top: "27.5vh",
          left: "-22.5vw",
          width: "30vw",
          height: "25vh",
        };
      case 6:
        return { top: "22.5vh", left: "25vw", width: "15vw", height: "15vh" };
      default:
        return {}; // Default case if no specific style is needed
    }
  };

  return (
    <div className="w-full h-[500vh] relative" ref={container}>
      <div className="sticky overflow-hidden top-0 h-screen">
        {picturesObject.map(({ src, scale }, index) => {
          const imageContainerStyles = getImageContainerStyles(index);
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="w-full h-full top-0 absolute flex items-center justify-center"
            >
              <div style={imageContainerStyles} className="relative">
                <Image src={src} fill alt="image" className="object-cover" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Spatial;

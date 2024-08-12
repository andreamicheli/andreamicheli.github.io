import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image"; // Assuming you're using Next.js

//1. rise the height of container by 800vh * picturesObject.length
//2. conditionally render the main motion.div in a list
//3. subdivide the keyframes of the useTransforms with overhead
//4. track the current project to show and find an algorithm to fix the translation

const Spatial = ({ pictures }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale0 = useTransform(scrollYProgress, [0, 0.33, 0.8, 1], [1, 4, 4, 1]);
  const scale1 = useTransform(scrollYProgress, [0, 0.33, 0.8, 1], [1, 5, 5, 1]);
  const scale2 = useTransform(scrollYProgress, [0, 0.33, 0.8, 1], [1, 6, 6, 1]);

  const translateX = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 0.8, 1],
    ["0px", "100px", "-50px", "-50px", "0px"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 0.8, 0.85],
    ["0%", "0%", "100%", "100%", "0%"]
  );

  const blackandwhite = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  const picturesObject = [
    {
      src: pictures[0],
      scale: scale0,
      copy: {
        title: "Space-Guesser",
        subtitle: "autonomous academic project",
        description:
          "A simple web game that aims to explore and expand your knowledge about our solar system",
        tech: "React, TailwindCSS, MobX, Firebase(backend), two external APIs",
        demo: "https://space-guesser.web.app",
        imgs: [],
      },
    },
    {
      src: pictures[1],
      scale: scale1,
      copy: {
        title: "",
        subtitle: "autonomous personal project",
        description: "",
        tech: "",
        demo: "https://.web.app/",
        imgs: [],
      },
    },
    {
      src: pictures[2],
      scale: scale2,
      copy: {
        title: "",
        subtitle: "autonomous academic project",
        description: "",
        tech: "",
        demo: "https://space-guesser.web.app/",
        imgs: [],
      },
    },
  ];

  // Define dynamic styles based on the index
  const getImageContainerStyles = (index) => {
    switch (index) {
      case 0:
        return { width: "30vw", height: "25vh" };
      case 1:
        return { top: "10vh", left: "20vw", width: "35vw", height: "30vh" };
      case 2:
        return { top: "-10vh", left: "-20vw", width: "20vw", height: "45vh" };
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
    <div className="w-full h-[800vh] relative" ref={container}>
      <div className="sticky overflow-hidden top-0 h-screen">
        {picturesObject.map(({ src, scale, copy }, index) => {
          const imageContainerStyles = getImageContainerStyles(index);
          return (
            <motion.div
              key={index}
              className="w-full h-full top-0 absolute flex items-center justify-center"
              style={{ scale, x: translateX }} //add grayscale with scroll -> documentation
            >
              <div
                style={imageContainerStyles}
                className="relative flex justify-center"
              >
                <Image
                  src={src}
                  fill
                  alt="image"
                  className="!static object-contain p-2 !w-auto"
                />
                <motion.div
                  className="flex flex-col py-2 w-20 gap-2 items-center text-cream_dark"
                  style={{ opacity }}
                >
                  <div className="flex flex-col items-center">
                    {" "}
                    <div className="text-[.5rem] font-bold">{copy.title}</div>
                    <div className="text-[.2rem] font-thin text-cream_extralight">
                      {copy.subtitle}
                    </div>
                  </div>

                  <div className="text-[.3rem] text-cream_extralight bg-white bg-opacity-10 p-2 rounded-md">
                    {copy.description}
                  </div>
                  <p className="text-[.3rem] mt-0 -mb-1">Stack:</p>
                  <div className="text-[.3rem] font-thin text-cream_extralight bg-white bg-opacity-20 p-2 rounded-md">
                    {copy.tech}
                  </div>
                  <a
                    href={copy.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[.3rem] bg-cream_medium text-peri_dark font-bold brightness-90 shadow-md p-1 rounded-md hover:underline hover:cursor-pointer hover:brightness-100 hover:scale-105"
                  >
                    {copy.demo.replace(/(https?:\/\/)?(www\.)?/, "")}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Spatial;

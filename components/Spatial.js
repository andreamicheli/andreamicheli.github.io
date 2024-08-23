import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image"; // Assuming you're using Next.js
import React, { useEffect, useRef, useState } from "react";

//1. rise the height of container by 800vh * picturesObject.length DONE
//2. conditionally render the main motion.div in a list
//3. subdivide the keyframes of the useTransforms with overhead
//4. track the current project to show and find an algorithm to fix the translation

const Spatial = ({ pictures }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const unit = 1 / pictures.length;

  const [current, setCurrent] = useState(0);

  const scaleTimestamps = [
    current * unit,
    current * unit + (1 * unit) / 5,
    current * unit + (2 * unit) / 5,
    current * unit + (3 * unit) / 5,
  ];

  const scale0 = useTransform(scrollYProgress, scaleTimestamps, [1, 4, 4, 1]);
  const scale1 = useTransform(scrollYProgress, scaleTimestamps, [1, 5, 5, 1]);
  const scale2 = useTransform(scrollYProgress, scaleTimestamps, [1, 6, 6, 1]);

  const translateX = useTransform(
    scrollYProgress,
    [
      current * unit,
      current * unit + (1 * unit) / 5,
      current * unit + (2 * unit) / 5,
      current * unit + (2.3 * unit) / 5,
      current * unit + (2.5 * unit) / 5,
    ],
    ["0px", "100px", "-50px", "-50px", "0px"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [
      current * unit,
      current * unit + (1 * unit) / 5,
      current * unit + (2 * unit) / 5,
      current * unit + (2.3 * unit) / 5,
      current * unit + (2.5 * unit) / 5,
    ],
    ["0%", "0%", "100%", "100%", "0%"]
  );

  const transformTrigger = useTransform(scrollYProgress, (value) => {
    return Math.floor(value / (1 / pictures.length)); // Calculate which step the scroll is at
  });

  useEffect(() => {
    return transformTrigger.on("change", (latestStep) => {
      setCurrent(latestStep);
    });
  }, [transformTrigger]);

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
        title: "NgPokèdex",
        subtitle: "autonomous personal project",
        description:
          "A digital version of the pokedex, with rudimental battle and collectible features integrated in the web app",
        tech: "Angular, Vanilla CSS, PokeAPI, LocalStorage functions",
        demo: "https://.web.app/",
        imgs: [],
      },
    },
    {
      src: pictures[2],
      scale: scale2,
      copy: {
        title: "FoodStuff",
        subtitle: "autonomous academic project",
        description:
          "An all-around project of a grocery tracker app, with image recognition of ingredients in your fridge",
        tech: "React Native,  Figma",
        demo: "https://space-guesser.web.app/",
        imgs: [],
      },
    },
  ];

  const blackandwhite = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

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
    <div
      className="w-full relative"
      ref={container}
      style={{ height: picturesObject.length * 800 + "vh" }}
    >
      {/* <div className="fixed top-0 right-0 p-4 bg-green-200">
        {scaleTimestamps.toString()}
      </div> */}

      <div className="w-full h-full absolute top-1/3 border-t-2 border-red-500 z-10"></div>
      <div className="w-full h-full absolute top-2/3 border-t-2 border-red-500 z-10"></div>
      <div className="sticky overflow-hidden top-0 h-screen">
        {picturesObject.map(({ src, scale, copy }, index) => {
          const imageContainerStyles = getImageContainerStyles(index);
          return (
            <motion.div
              key={index}
              className="w-full h-full top-0 absolute flex items-center justify-center"
              style={{ scale, x: translateX }} //add grayscale with scroll -> documentation
              // style={{ scale }} //add grayscale with scroll -> documentation
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

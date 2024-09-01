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
    current * unit, //0 1/3 2/3 -> 1
    current * unit + (1 * unit) / 5, //1/15 2/5 11/15 -> 4
    current * unit + (2 * unit) / 5, //2/15 7/15 12/15 -> 4
    current * unit + (3 * unit) / 5, //3/15 8/15 13/15 -> 1
  ];

  const scale0 = useTransform(scrollYProgress, scaleTimestamps, [1, 4, 4, 1]);
  const scale1 = useTransform(
    scrollYProgress,
    scaleTimestamps,
    [1, 3.3, 3.3, 1]
  );
  const scale2 = useTransform(
    scrollYProgress,
    scaleTimestamps,
    [1, 3.3, 3.3, 1]
  );

  const panCameraX = useTransform(
    scrollYProgress,
    [
      0,
      3 / 15,
      1 / 3,
      6 / 15,
      7 / 15,
      8 / 15,
      2 / 3,
      11 / 15,
      12 / 15,
      13 / 15,
      1,
    ],
    ["0%", "0%", "0%", "-60%", "-60%", "0%", "0%", "70%", "70%", "0%", "0%"]
  );
  const panCameraY = useTransform(
    scrollYProgress,
    [
      0,
      3 / 15,
      1 / 3,
      6 / 15,
      7 / 15,
      8 / 15,
      2 / 3,
      11 / 15,
      12 / 15,
      13 / 15,
      1,
    ],
    ["0%", "0%", "0%", "-30%", "-30%", "0%", "0%", "32%", "32%", "0%", "0%"]
  );

  const translateX = useTransform(
    scrollYProgress,
    [
      current * unit,
      current * unit + (1 * unit) / 5,
      current * unit + (2 * unit) / 5,
      current * unit + (2.3 * unit) / 5,
      current * unit + (2.5 * unit) / 5,
    ],
    ["0px", "30px", "-10px", "-10px", "0px"]
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
  const opacityExternal = useTransform(
    scrollYProgress,
    [
      0,
      1 / 15,
      2 / 15,
      3 / 15,
      1 / 3,
      6 / 15,
      7 / 15,
      8 / 15,
      2 / 3,
      11 / 15,
      12 / 15,
      13 / 15,
      1,
    ],
    [
      "100%",
      "0%",
      "0%",
      "100%",
      "100%",
      "0%",
      "0%",
      "100%",
      "100%",
      "0%",
      "0%",
      "100%",
      "100%",
    ]
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
      position: { top: "auto", left: "auto" },
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
      position: { top: "10%", left: "20%" },
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
      position: { top: "-10%", left: "-20%" },
    },
  ];

  const blackandwhite = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  // Define dynamic styles based on the index
  const getImageContainerStyles = (index) => {
    switch (index) {
      case 0:
        return {
          // x: translateX,
          width: "30%",
          height: "25%",
        };
      case 1:
        return {
          top: picturesObject[index].position.top || "10%",
          left: picturesObject[index].position.left || "20%",
          width: "35%",
          height: "30%",
          // x: translateX,
        };
      case 2:
        return {
          top: picturesObject[index].position.top || "-10%",
          left: picturesObject[index].position.left || "-20%",
          width: "35%",
          height: "30%",
          // x: translateX,
        };
      case 3:
        return {
          top: picturesObject[index].position.top || "auto",
          left: picturesObject[index].position.left || "27.5%",
          width: "25%",
          height: "25%",
          // x: translateX,
        }; // top is not changed
      case 4:
        return {
          top: picturesObject[index].position.top || "27.5%",
          left: picturesObject[index].position.left || "5%",
          width: "20%",
          height: "25%",
          // x: translateX,
        };
      case 5:
        return {
          top: picturesObject[index].position.top || "27.5%",
          left: picturesObject[index].position.left || "-22.5%",
          width: "30%",
          height: "25%",
          // x: translateX,
        };
      case 6:
        return {
          top: picturesObject[index].position.top || "22.5%",
          left: picturesObject[index].position.left || "25%",
          width: "15%",
          height: "15%",
          // x: translateX,
        };
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
      <div className="fixed top-0 right-0 p-4 bg-green-200">
        {scrollYProgress.get()}
      </div>

      <div className="w-full h-full absolute top-1/3 border-t-2 border-red-500 z-10"></div>
      <div className="w-full h-full absolute top-2/3 border-t-2 border-red-500 z-10"></div>
      <div className="sticky overflow-hidden top-0 h-screen">
        {picturesObject.map(({ src, scale, copy }, index) => {
          const imageContainerStyles = getImageContainerStyles(index);
          return (
            <motion.div
              key={index}
              className="w-full h-full top-0 absolute flex items-center justify-center"
              style={{ scale, x: panCameraX, y: panCameraY }} //add grayscale with scroll -> documentation
              // style={{ scale }} //add grayscale with scroll -> documentation
            >
              <motion.div
                style={{
                  ...imageContainerStyles,
                  opacity: current !== index && opacityExternal,
                }}
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
                  style={{ opacity: current === index ? opacity : "0%" }}
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
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Spatial;

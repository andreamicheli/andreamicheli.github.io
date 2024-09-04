import Image from "next/image";
import React, { useState } from "react";
import { motion, useTransform } from "framer-motion";

const CardSlide = ({
  company,
  image,
  title,
  subtitle,
  paragraph,
  office,
  imagePosition,
  direction,
  progress,
}) => {
  const slidedirection = direction == "left" ? -1 : 1;

  const translateX = useTransform(
    progress,
    [0, 1],
    [150 * slidedirection, -150 * slidedirection]
  );

  const [hover, sethover] = useState(false);
  return (
    <motion.div
      style={{ x: translateX }}
      className={`flex gap-10 flex-col w-2/3 lg:w-auto  ${
        imagePosition === "right"
          ? "lg:flex-row text-right"
          : "lg:flex-row-reverse"
      }`}
      onHoverStart={() => sethover(true)}
      onHoverEnd={() => sethover(false)}
    >
      <div className={`text-3xl flex flex-col gap-2 `}>
        <h2 className="lg:text-8xl text-5xl mb-2">{company}</h2>
        <h2 className="lg:text-6xl text-2xl mb-2 font-light">{title}</h2>
        <h3 className="lg:text-4xl text-xl font-extralight">{subtitle}</h3>
        {/* <p>{paragraph}</p> */}
      </div>
      <div
        className="h-full p-4 relative rounded-lg"
        style={{ aspectRatio: "3/2" }}
      >
        <Image
          className="rounded-xl shadow-2xl"
          src={office}
          fill="true"
          alt="office"
          style={hover === false ? { filter: "grayscale(100%)" } : ""}
        />
      </div>
      <div className="h-full p-4 relative" style={{ aspectRatio: "1/1" }}>
        <Image
          src={image}
          fill="true"
          alt="Card Image"
          style={{ filter: "grayscale(100%) brightness(5)" }}
        />
      </div>
    </motion.div>
  );
};

export default CardSlide;

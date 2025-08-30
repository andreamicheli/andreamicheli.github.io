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
      className={`flex gap-10 flex-col lg:w-auto ${
        imagePosition === "right"
          ? "lg:flex-row text-right"
          : "lg:flex-row-reverse"
      }`}
      onHoverStart={() => sethover(true)}
      onHoverEnd={() => sethover(false)}
    >
      <div className="text-3xl flex flex-col gap-2">
        <h2 className="lg:text-8xl text-5xl mb-2">{company}</h2>
        <h2 className="lg:text-6xl text-2xl mb-2 font-light">{title}</h2>
        <h3 className="lg:text-4xl text-xl font-extralight whitespace-nowrap">
          {subtitle}
        </h3>
      </div>

      {/* Keep original aspect ratio (no forced 3:2) */}
      <div className="relative rounded-lg overflow-hidden max-w-[600px]">
        <Image
          src={office}
          alt="office"
          width={1200} // supply the real intrinsic size if known
          height={1000} // (width & height just define ratio; adjust to match original)
          className="rounded-xl shadow-2xl object-cover w-full h-auto transition-all"
          style={hover ? {} : { filter: "grayscale(100%)" }}
        />
      </div>

      {/* Keep original aspect ratio (no forced 1:1) */}
      <div className="relative overflow-hidden max-w-[350px]">
        <Image
          src={image}
          alt="Card Image"
          // replace with the real intrinsic width/height of this image
          width={150}
          height={150}
          className="object-cover w-full h-auto"
          style={{ filter: "grayscale(100%) brightness(5)" }}
        />
      </div>
    </motion.div>
  );
};

export default CardSlide;

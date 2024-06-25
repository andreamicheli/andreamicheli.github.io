import React, { useState, useRef, useEffect } from "react";
import Bigtitle from "../components/Bigtitle";
import Mediumtitle from "../components/Mediumtitle";
import Container from "../components/Container";
import Plx from "react-plx";
import Image from "next/image";
import useWindowDimensions from "../hooks/useDimensions";
import { motion } from "framer-motion";
import AnimatedImage from "../components/ScrollingImage";

function One({ files }) {
  const { height, width } = useWindowDimensions();
  const randomValue = () =>
    Number(((Math.random() * (0.8 - 0.01) + 0.01) * 100).toFixed(2));
  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const numbers = () => {
    let num1 = getRandomNumber(5200, 5800);
    let num2 = getRandomNumber(5400, 6000);
    while (Math.abs(num1 - num2) < 200) {
      num1 = getRandomNumber(5200, 5800);
      num2 = getRandomNumber(5400, 6000);
    }
    return [num1, num2].sort((a, b) => a - b);
  };

  console.log(randomValue());

  return (
    <div>
      <Container vh={"500vh"}>
        <div className="sticky top-0 w-full h-screen">
          <div className="absolute top-20 w-max">
            <Plx
              parallaxData={[
                {
                  start: 0,
                  end: 2700,
                  easing: "ease-in",
                  properties: [
                    {
                      startValue: 0,
                      endValue: 0,
                      property: "opacity",
                    },
                  ],
                },
                {
                  start: 2000,
                  end: 2700,
                  easing: "ease-in",
                  properties: [
                    {
                      startValue: 0,
                      endValue: 1,
                      property: "opacity",
                    },
                  ],
                },
              ]}
            >
              <Mediumtitle
                title={"I like to explore the aestethics of things"}
              />
            </Plx>
          </div>

          <div className="absolute top-3/4 right-10 w-max">
            <Plx
              parallaxData={[
                {
                  start: 0,
                  end: 3000,
                  easing: "ease-in",
                  properties: [
                    {
                      startValue: 0,
                      endValue: 0,
                      property: "opacity",
                    },
                  ],
                },
                {
                  start: 3000,
                  end: 3700,
                  easing: "ease-in",
                  properties: [
                    {
                      startValue: 0,
                      endValue: 1,
                      property: "opacity",
                    },
                  ],
                },
              ]}
            >
              <Mediumtitle title={"Beauty truly captivates me"} />
            </Plx>
          </div>

          <div className="absolute ml-auto mr-auto top-1/3 h-60 w-72 left-1/2 transform -translate-x-1/2 ">
            <Image
              src={"/giphy.gif"}
              layout="fill"
              alt="aestethic gif"
              className="z-50"
            />
          </div>
          <div className="z-30 mx-12">
            <div className="absolute left-20">
              <AnimatedImage
                src="/beauty/la Nascita di Venere.jpg"
                alt="Venus"
                indexes={[5300, 6500]}
                speed={1}
                label="la Nascita di Venere.jpg"
                width={200}
              />
            </div>

            <div className="absolute left-60">
              <AnimatedImage
                src="/beauty/extract from Raffaello's madonna sistina.png"
                alt="pitti"
                indexes={[5400, 5700]}
                speed={2}
                label="extract from Raffaello's madonna sistina.png"
                width={150}
              />
            </div>
            <div className="absolute left-80 w-20">
              <AnimatedImage
                src="/beauty/extract from american beauty.png"
                alt="rose"
                indexes={[5200, 6200]}
                speed={5}
                label="extract from american beauty.png"
              />
            </div>
            <div className="absolute right-20">
              <AnimatedImage
                src="/beauty/fall in Turin.png"
                alt="leaves"
                indexes={[5500, 6800]}
                speed={4}
                label="fall in Turin.png"
                width={200}
              />
            </div>
            <div className="absolute right-80">
              <AnimatedImage
                src="/beauty/a wonderful movie.jpg"
                alt="moonrise kingdom"
                indexes={[5600, 6300]}
                speed={1}
                label="a wonderful movie.jpg"
                width={150}
              />
            </div>

            <div className="absolute right-1/3">
              <AnimatedImage
                src="/beauty/the language of god.svg"
                alt="css"
                indexes={[6000, 6300]}
                speed={2}
                label="the language of god.svg"
                width={150}
              />
            </div>

            <div className="absolute left-1/3 w-16">
              <AnimatedImage
                src="/beauty/me in my current form.jpg"
                alt="young me"
                indexes={[5300, 6000]}
                speed={1}
                label="me in my current form.jpg"
                width={150}
              />
            </div>

            <div className="absolute left-96 w-28">
              <AnimatedImage
                src="/beauty/own picture of bali's jungle.jpg"
                alt="own picture of bali's jungle"
                indexes={[6000, 6300]}
                speed={0.5}
                label="own picture of bali's jungle.jpg"
              />
            </div>
            <div className="absolute right-1/2 w-28">
              <AnimatedImage
                src="/beauty/own picture of tent camp in indonesia.jpg"
                alt="tent in bali"
                indexes={[5200, 6300]}
                speed={0.5}
                width={112}
                label="own picture of tent camp in indonesia.jpg"
              />
            </div>
            <div className="absolute right-96 w-28">
              <AnimatedImage
                src="/beauty/own picture of a vietnamese traditional road.jpg"
                alt="traditional road in vietnam"
                indexes={[5500, 6100]}
                speed={2}
                width={112}
                label="own picture of a vietnamese traditional road.jpg"
              />
            </div>

            <div className="z-30 w-28">
              {/* Existing code */}

              {files.map((file, index) => (
                // {fs.readdirSync("public/beauty/array").map((file, index) => (
                <div
                  key={index}
                  className={`absolute`}
                  style={{ right: randomValue() + "%" }}
                >
                  <AnimatedImage
                    src={`/beauty/array/${file}`}
                    alt={`image-${index}`}
                    indexes={numbers()}
                    speed={
                      (randomValue() / 200) * 10 < 0 ||
                      (randomValue() / 200) * 10 > 10
                        ? 1
                        : (randomValue() / 200) * 10
                    }
                    width={(randomValue() / 100) * 400 + 100}
                    label={file}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default One;

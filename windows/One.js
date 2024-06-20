import React, { useState, useRef } from "react";
import Bigtitle from "../components/Bigtitle";
import Mediumtitle from "../components/Mediumtitle";
import Container from "../components/Container";
import Plx from "react-plx";
import Image from "next/image";
import useWindowDimensions from "../hooks/useDimensions";
import { motion } from "framer-motion";
import AnimatedImage from "../components/ScrollingImage";

function One() {
  const { height, width } = useWindowDimensions();

  // var sticky = !!text.current && text.current.offsetTop;

  // const [issticky, setisSticky] = useState(false)

  // window.addEventListener('scroll', (event) => {
  //   if (window.pageYOffset > sticky) {
  //     setisSticky(true)
  //   } else {
  //     setisSticky(false)
  //   }
  // });

  return (
    <div>
      <Container vh={"250vh"}>
        <div className="sticky top-20 w-max">
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
            <Mediumtitle title={"I like to explore the aestethics of things"} />
          </Plx>
        </div>

        <div className="sticky top-3/4 right-10 left-full w-max">
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

        <div className="sticky ml-auto mr-auto top-1/3 h-60 w-72">
          <Image
            src={"/giphy.gif"}
            layout="fill"
            alt="aestethic gif"
            className="z-50"
          />
        </div>

        <div className="z-30">
          <div className="absolute left-20 scale-75">
            <AnimatedImage
              src="/beauty/venus.jpg"
              alt="Venus"
              start={3000}
              end={4500}
              speed={1}
            />
          </div>

          <div className="absolute left-60 scale-75">
            <AnimatedImage
              src="/beauty/sistinemadonna.png"
              alt="pitti"
              start={3400}
              end={3700}
              speed={2}
            />
          </div>
          <div className="absolute left-80 w-20">
            <AnimatedImage
              src="/beauty/png-clipart-rose-rose.png"
              alt="rose"
              start={3200}
              end={4200}
              speed={5}
            />
          </div>
          <div className="absolute right-20 scale-75">
            <AnimatedImage
              src="/beauty/foglie.png"
              alt="leaves"
              start={3500}
              end={4800}
              speed={4}
            />
          </div>
          <div className="absolute right-80 scale-50">
            <AnimatedImage
              src="/beauty/moonrise.jpg"
              alt="moonrise kingdom"
              start={3600}
              end={4300}
              speed={1}
            />
          </div>

          <div className="absolute right-1/3 scale-50">
            <AnimatedImage
              src="/beauty/css3.svg"
              alt="css"
              start={4000}
              end={4300}
              speed={2}
            />
          </div>

          <div className="absolute left-1/3 scale-50">
            <AnimatedImage
              src="/beauty/piccolo.jpg"
              alt="young me"
              start={4300}
              end={5000}
              speed={1}
            />
          </div>

          <div className="absolute left-96 w-28">
            <AnimatedImage
              src="/beauty/moto.jpg"
              alt="motorbike in indonesia"
              start={4000}
              end={4300}
              speed={0.5}
            />
          </div>
          <div className="absolute right-1/2 w-28">
            <AnimatedImage
              src="/beauty/tenda.jpg"
              alt="tent in bali"
              start={3200}
              end={4300}
              speed={0.5}
            />
          </div>
          <div className="absolute right-96 w-28">
            <AnimatedImage
              src="/beauty/via.jpg"
              alt="traditional road in vietnam"
              start={3500}
              end={4100}
              speed={2}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default One;

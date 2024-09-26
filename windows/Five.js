import React, { useRef } from "react";
import Container from "../components/Container";
import {
  motion,
  useAnimate,
  useAnimation,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

function Five() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const background = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["#373cab", "#faf8ed"]
  );

  const controls = useAnimation();

  function startAnimation() {
    controls.start({
      width: 1500,
      transition: { duration: 0.5 },
    });
  }
  function endAnimation() {
    controls.start({
      width: 0,
      transition: { duration: 0.5 },
    });
  }

  return (
    <motion.div
      ref={container}
      style={{
        backgroundColor: background,
      }}
      className="h-[200vh] flex items-end"
    >
      <Container
        vh={"100vh"}
        style={"flex justify-center gap-10 items-center w-full relative"}
      >
        <motion.div
          className="h-1/3 flex items-center lg:text-8xl text-3xl text-center text-peri_dark font-bold"
          onHoverStart={startAnimation}
          onHoverEnd={endAnimation}
        >
          <a
            href="mailto:andrea.micheli@aalto.fi"
            z
            onClick={() => open("mailto:andrea.micheli@aalto.fi")}
          >
            andrea.micheli@aalto.fi
          </a>
          <motion.div
            href="mailto:andrea.micheli@aalto.fi"
            className="absolute w-0 underline overflow-hidden cursor-pointer flex items-start flex-col" //translate-y-12
            animate={controls}
            onClick={() => open("mailto:andrea.micheli@aalto.fi")}
          >
            andrea.micheli@aalto.fi
            {/* <div className="flex flex-row justify-between font-normal text-cream_light text-6xl mt-9 underline gap-20">
              <div>linkedin</div>
              <div>github</div>
            </div> */}
          </motion.div>
        </motion.div>
        <div className="absolute bottom-24 lg:w-96 w-72 flex flex-row justify-between font-bold text-peri_light text-3xl mt-9">
          <a
            href="https://www.linkedin.com/in/andrea-micheli-00ay00/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-peri_dark hover:underline transition"
          >
            linkedIn
          </a>
          <a
            href="https://github.com/andreamicheli"
            target="_blank"
            rel="noreferrer"
            className="hover:text-peri_dark hover:underline transition"
          >
            GitHub
          </a>
        </div>
      </Container>
    </motion.div>
  );
}

export default Five;

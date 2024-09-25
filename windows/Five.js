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
        style={"flex justify-center gap-10 items-center w-full"}
      >
        <motion.div
          className="h-1/3 flex items-center lg:text-8xl text-4xl text-center text-peri_dark font-bold"
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
            className="absolute w-0 underline overflow-hidden cursor-pointer flex justify-start"
            animate={controls}
            onClick={() => open("mailto:andrea.micheli@aalto.fi")}
          >
            andrea.micheli@aalto.fi
          </motion.div>
        </motion.div>
        {/* <div className="flex flex-col items-center">
          <a className="text-5xl bg-peri_dark font-bold text-white shadow-sm p-2.5 rounded-2xl hover:cursor-pointer hover:brightness-100 hover:scale-105 transition-all">
            in
          </a>
        </div> */}
      </Container>
    </motion.div>
  );
}

export default Five;

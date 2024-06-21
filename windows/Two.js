import { useRef } from "react";
import Container from "../components/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import Bigtitle from "../components/Bigtitle";

function Two() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const paragraph =
    "I found a way to express my creativity through Frontend programming";
  const words = paragraph.split(" ");
  return (
    <Container vh={"150vh"}>
      <div className="w-full h-full flex items-center justify-center text-4xl font-bold">
        <motion.p
          ref={container}
          style={{
            opacity: scrollYProgress,
            width: "66%",
            overflowWrap: "break-word",
            textAlign: "justify",
          }}
        >
          {words.map((word, i) => {
            const start = i / words.length;

            const end = start + 1 / words.length;

            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </motion.p>
      </div>
    </Container>
  );
}

const Word = ({ key, children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="lg:text-8xl md:text-4xl text-3xl text-peri_dark font-bold font-Larsseit normal">
      <motion.span style={{ opacity: opacity, overflowWrap: "normal" }}>
        {children}
      </motion.span>
      <span className={"normal"}>&nbsp;</span>
    </span>
  );
};

// Export the component to make it accessible from other files
export default Two;

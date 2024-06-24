import { useEffect, useRef } from "react";
import Container from "../components/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import Bigtitle from "../components/Bigtitle";

function Two() {
  const paragraphTarget = useRef(null);
  const container = useRef(null);

  const { scrollYProgress: opacityScrollProgress } = useScroll({
    target: paragraphTarget,
    offset: ["start 0.9", "start 0.4"],
  });

  const { scrollYProgress: scaleScrollProgress } = useScroll({
    target: container,
    offset: ["30vh", "120vh"],
  });

  const scale = useTransform(scaleScrollProgress, [0, 1], [1, 150]);

  const paragraph =
    "I found my way to express creativity through Frontend development .";
  const words = paragraph.split(" ");

  const Word = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    const x = useTransform(scaleScrollProgress, [0, 1], [0, 2500]);

    return (
      <span className="lg:text-8xl md:text-4xl text-3xl text-peri_dark font-bold font-Larsseit normal relative">
        <motion.span
          style={{
            opacity: opacity,
            overflowWrap: "normal",
            visibility: children === "Frontend" ? "hidden" : "visible",
          }}
        >
          {children}
        </motion.span>
        {children === "Frontend" && (
          <motion.span
            style={{
              opacity: opacity,
              overflowWrap: "normal",
              position: "absolute",
              zIndex: 10,
              top: "-3px",
              left: "50%",
              x,
              scale,
            }}
          >
            {children}
          </motion.span>
        )}
        <span className={"normal"}>&nbsp;</span>
      </span>
    );
  };

  return (
    <div
      className="h-[230vh] w-screen p-10 relative overflow-x-clip overflow-y-hidden"
      ref={container}
    >
      <div className="w-full h-screen sticky top-0 flex items-center justify-center text-4xl font-bold">
        <motion.p
          ref={paragraphTarget}
          style={{
            opacity: opacityScrollProgress,
            width: "50%",
            overflowWrap: "break-word",
            textAlign: "justify",
          }}
        >
          {words.map((word, i) => {
            const start = i / words.length;

            const end = start + 1 / words.length;

            return (
              <Word
                key={i}
                progress={opacityScrollProgress}
                range={[start, end]}
              >
                {word === "." ? "" : word}
              </Word>
            );
          })}
        </motion.p>
      </div>
    </div>
  );
}

// Export the component to make it accessible from other files
export default Two;

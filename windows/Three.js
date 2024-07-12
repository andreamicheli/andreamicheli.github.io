import React, { useRef } from "react";
import Bigtitle from "../components/Mediumtitle";
import Container from "../components/Container";
import Slide from "../components/Slide";
import { useScroll } from "framer-motion";
import Fillertitle from "../components/Fillertitle";

const Three = () => {
  const container = useRef();
  const containerFill = useRef();

  const { scrollYProgress: scrollYProgressFiller } = useScroll({
    target: containerFill,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: scrollYProgressSlide } = useScroll({
    target: container,

    offset: ["start end", "end start"],
  });

  return (
    <Container vh={"250vh"} style={"overflow-hidden flex flex-col gap-40"}>
      <div className="w-full flex justify-center" ref={containerFill}>
        <Fillertitle title="Education" progress={scrollYProgressFiller} />
      </div>
      <div
        className="w-full h-full flex flex-col items-center justify-start mt-40 text-cream_extralight lg:text-9xl text-7xl lg:rotate-0 rotate-[30deg]"
        ref={container}
      >
        {/* <Slide  src={"/logos/aalto.png"} text={"Helsinki"} left={"-40%"} /> */}
        <Slide
          src="/logos/aalto.png"
          text="Helsinki"
          uni="Aalto"
          left="-20%"
          progress={scrollYProgressSlide}
          direction={"left"}
        />
        <Slide
          src={"/logos/kth.png"}
          left={"-40%"}
          text={"Stockholm"}
          uni="KTH"
          progress={scrollYProgressSlide}
          direction={"right"}
        />
        <Slide
          src={"/logos/polito.png"}
          left={"-60%"}
          text={"Turin"}
          uni="PoliTo"
          progress={scrollYProgressSlide}
          direction={"left"}
        />
        <Slide
          src={"/logos/polimi.png"}
          left={"-80%"}
          text={"Milan"}
          uni="PoliMi"
          progress={scrollYProgressSlide}
          direction={"right"}
        />
      </div>
    </Container>
  );
};

export default Three;

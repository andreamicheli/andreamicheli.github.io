import React, { useRef } from "react";
import Bigtitle from "../components/Mediumtitle";
import Container from "../components/Container";
import Slide from "../components/Slide";
import { useScroll } from "framer-motion";

const Three = () => {
  const container = useRef();

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", "end start"],
  });

  return (
    <Container vh={"250vh"} style={"overflow-hidden"}>
      <div
        className="w-full h-full flex flex-col items-center justify-start text-cream_extralight text-7xl"
        ref={container}
      >
        {/* <Slide  src={"/logos/aalto.png"} text={"Helsinki"} left={"-40%"} /> */}
        <Slide
          src="/logos/aalto.png"
          text="Helsinki"
          uni="Aalto"
          left="-20%"
          progress={scrollYProgress}
          direction={"left"}
        />
        <Slide
          src={"/logos/kth.png"}
          left={"-40%"}
          text={"Stockholm"}
          uni="KTH"
          progress={scrollYProgress}
          direction={"right"}
        />
        <Slide
          src={"/logos/polito.png"}
          left={"-60%"}
          text={"Turin"}
          uni="PoliTo"
          progress={scrollYProgress}
          direction={"left"}
        />
        <Slide
          src={"/logos/polimi.png"}
          left={"-80%"}
          text={"Milan"}
          uni="PoliMi"
          progress={scrollYProgress}
          direction={"right"}
        />
      </div>
    </Container>
  );
};

export default Three;

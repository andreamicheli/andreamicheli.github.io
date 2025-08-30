import React, { useRef } from "react";
import Bigtitle from "../components/Mediumtitle";
import Container from "../components/Container";
import Slide from "../components/Slide";
import { useScroll } from "framer-motion";
import Fillertitle from "../components/Fillertitle";
import CardSlide from "../components/CardSlide";

const Three = () => {
  const containerEducation = useRef();
  const containerExperience = useRef();
  const containerFillEducation = useRef();
  const containerFillExperience = useRef();

  const { scrollYProgress: scrollYProgressFillerEducation } = useScroll({
    target: containerFillEducation,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: scrollYProgressFillerExperience } = useScroll({
    target: containerFillExperience,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: scrollYProgressSlideEducation } = useScroll({
    target: containerEducation,

    offset: ["start end", "end start"],
  });
  const { scrollYProgress: scrollYProgressSlideExperience } = useScroll({
    target: containerExperience,

    offset: ["start end", "end start"],
  });

  return (
    <Container vh={"500vh"} style={"overflow-hidden flex flex-col gap-40"}>
      <div
        className="w-full flex justify-center"
        ref={containerFillEducation}
        id="Education"
      >
        <Fillertitle
          title="Education"
          progress={scrollYProgressFillerEducation}
        />
      </div>
      <div
        className="w-full h-full flex flex-col items-center justify-start mt-40 text-cream_extralight lg:text-9xl text-7xl lg:rotate-0 rotate-[30deg]"
        ref={containerEducation}
      >
        {/* <Slide  src={"/logos/aalto.png"} text={"Helsinki"} left={"-40%"} /> */}
        <Slide
          src="/logos/aalto.png"
          text="Helsinki"
          uni="Aalto"
          left="-20%"
          progress={scrollYProgressSlideEducation}
          direction={"left"}
        />
        <Slide
          src={"/logos/kth.png"}
          left={"-40%"}
          text={"Stockholm"}
          uni="KTH"
          progress={scrollYProgressSlideEducation}
          direction={"right"}
        />
        <Slide
          src={"/logos/polito.png"}
          left={"-60%"}
          text={"Turin"}
          uni="PoliTo"
          progress={scrollYProgressSlideEducation}
          direction={"left"}
        />
        <Slide
          src={"/logos/polimi.png"}
          left={"-80%"}
          text={"Milan"}
          uni="PoliMi"
          progress={scrollYProgressSlideEducation}
          direction={"right"}
        />
      </div>
      <div
        className="w-full flex justify-center"
        ref={containerFillExperience}
        id="Experience"
      >
        <Fillertitle
          title="Experience"
          progress={scrollYProgressFillerExperience}
        />
      </div>
      <div
        className="w-full h-full flex flex-col items-center justify-start mt-40 text-cream_extralight gap-56"
        ref={containerExperience}
      >
        <CardSlide
          company={"Restworld"}
          image={"/logos/restworld.png"}
          office={"/places/restworld_office.jpg"}
          imagePosition={"right"}
          paragraph={
            "Took part in the development of the web-app where the company’s main service is provided. Mastered technologies like React, Typescript, Tailwind, Next.js"
          }
          subtitle={"2021·2022 - Startup"}
          title={"Frontend engineer"}
          progress={scrollYProgressSlideExperience}
          direction={"right"}
        />
        <CardSlide
          company={"Iriscube Reply"}
          image={"/logos/reply.png"}
          office={"/places/reply_office.jpg"}
          imagePosition={"left"}
          paragraph={
            "Independently developed and tested the interface of a web application for a major European credit institution. Mastered technologies like Angular, RxJs and worked with an Agile approach"
          }
          subtitle={"2022·2023 - IT Consultancy Firm"}
          title={"Frontend engineer"}
          progress={scrollYProgressSlideExperience}
          direction={"left"}
        />
        <CardSlide
          company={"Huawei"}
          image={"/logos/huawei.png"}
          office={"/places/huawei_office.webp"}
          imagePosition={"right"}
          paragraph={
            "Autonomously Designed & Developed an interactive simulator for satellite constellations, modeling orbits and ground connections. Mastered technologies like Cesium.js, WebWorkers, Angular with a Flask backend"
          }
          subtitle={"2025 - Munich Research Center"}
          title={"Full Stack engineer"}
          progress={scrollYProgressSlideExperience}
          direction={"right"}
        />
      </div>
    </Container>
  );
};

export default Three;

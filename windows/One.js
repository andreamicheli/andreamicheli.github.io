import React, { useState, useRef } from "react";
import Bigtitle from "../components/Bigtitle";
import Mediumtitle from "../components/Mediumtitle";
import Container from "../components/Container";
import Plx from "react-plx";
import Image from "next/image";
import useWindowDimensions from "../hooks/useDimensions";

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
      <Container vh={"300vh"}>
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
            <Mediumtitle title={"I love what my eyes can see"} />
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
            <Mediumtitle title={"i have a passion for beauty"} />
          </Plx>
        </div>

        <div className="sticky top-1/2 w-max h-max"></div>
      </Container>
    </div>
  );
}

export default One;

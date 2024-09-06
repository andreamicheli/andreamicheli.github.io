import Bigtitle from "../components/Bigtitle";
import Container from "../components/Container";
import React from "react";

import Plx from "react-plx";
import Face from "../components/Face";

function zero() {
  return (
    <Container vh={"300vh"}>
      <div className="h-full flex lg:flex-row flex-col lg:justify-center justify-start items-top">
        <div
          className="text-white w-full h-[calc(100vh-80px)] lg:w-1/2 sticky top-10
             flex justify-start lg:justify-center items-center text-3xl text-center"
        >
          <Face />
        </div>
        <div className="lg:h-auto h-full">
          <div className="sticky lg:top-1/3 top-2/3 lg:bottom-1/3 ">
            <Bigtitle title={"HI!"} />
            {/* </Plx> */}

            <Plx
              parallaxData={[
                {
                  start: 0,
                  end: 400,
                  properties: [
                    {
                      startValue: 0,
                      endValue: 0,
                      property: "opacity",
                    },
                  ],
                },
                {
                  start: 400,
                  end: 800,
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
              <Bigtitle title={"I AM"} />
            </Plx>

            <Plx
              parallaxData={[
                {
                  start: 0,
                  end: 800,
                  properties: [
                    {
                      startValue: 0,
                      endValue: 0,
                      property: "opacity",
                    },
                  ],
                },
                {
                  start: 800,
                  end: 1200,
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
              <Bigtitle title={"ANDREA"} />
            </Plx>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default zero;

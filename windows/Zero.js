import Bigtitle from "../components/Bigtitle";
import Container from "../components/Container";
import React from "react";

import Plx from "react-plx";

function zero() {
  return (
    <Container vh={"300vh"}>
      <div className="h-full flex lg:flex-row flex-col justify-between gap-10 items-top">
        <div
          className="bg-black text-white w-full h-[calc(100vh-80px)] sticky top-10
             flex justify-center items-center text-3xl text-center"
        >
          FACCIA 3D
          <br />
          {":)"}
        </div>
        <div>
          <div className="sticky top-1/3 bottom-1/3">
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

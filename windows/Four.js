import React from "react";
import Spatial from "../components/Spatial";

function Four() {
  const pictures = [
    "/portfolio/Space-Guesser.png",
    "/portfolio/ngPokedex.png",
    "/portfolio/fridgestuff.png",
  ];
  return <Spatial pictures={pictures} />;
}

export default Four;

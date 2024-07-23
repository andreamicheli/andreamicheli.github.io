import React from "react";
import Spatial from "../components/Spatial";

function Four() {
  const pictures = [
    "/portfolio/Space-Guesser.png",
    "/portfolio/fridgestuff.png",
    "/portfolio/ngPokedex.png",
  ];
  return <Spatial pictures={pictures} />;
}

export default Four;

import React from "react";
import Carousel from "./carousel";

const Section = ({ title, books, getColorWithIndex }) => {
  return (
    <>
      <h2>{title}</h2>
      <Carousel items={books} getColorWithIndex={getColorWithIndex} />
    </>
  );
};

export default Section;

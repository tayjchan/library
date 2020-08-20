import React from "react";
import Carousel from "./carousel";

const Section = ({ title, books, getColorWithIndex }) => {
  return (
    <>
      <h2>{title}</h2>
      <div style={{ display: "flex" }}>
        <Carousel items={books} getColorWithIndex={getColorWithIndex} />
      </div>
    </>
  );
};

export default Section;

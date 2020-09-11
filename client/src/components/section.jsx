import React from "react";
import Carousel from "./carousel";
import List from "./list";

const Section = ({ title, books, showAsList }) => {
  return (
    <>
      <h2>{title}</h2>
      {showAsList ? <List items={books} /> : <Carousel items={books} />}
    </>
  );
};

export default Section;

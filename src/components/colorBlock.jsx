import React, { useState, useRef } from "react";

const ColorBlock = ({ title, color, author, imgUrl }) => {
  const container = useRef();
  const text = useRef();

  const hoverImg = (event) => {
    const imgWidth = event.target.offsetWidth;
    const imgHeight = event.target.offsetWidth;

    event.target.style.opacity = "0.2";
    container.current.style.minWidth = imgWidth + "px";
    text.current.style.minWidth = imgWidth + "px";
    text.current.style.height = imgHeight + "px";
    text.current.style.left = -imgWidth + "px";
  };

  const stopHoverImg = (event) => {
    event.target.style.opacity = "1";
    container.current.style.minWidth = "64px";
    text.current.style.left = "0px";
  };

  return (
    <div key={title} ref={container} className='ColorBlock' draggable='true'>
      <img
        src={imgUrl}
        alt={title}
        onMouseEnter={(e) => hoverImg(e)}
        onMouseLeave={(e) => stopHoverImg(e)}
      />
      <div
        ref={text}
        style={{
          position: "relative",
          textAlign: "center",
          overflowX: "hidden",
        }}
      >
        <b>{title}</b>
        <br />
        {author}
      </div>
    </div>
  );
};

export default ColorBlock;

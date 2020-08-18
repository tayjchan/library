import React from "react";

const ColorBlock = ({ title, color }) => {
  return (
    <div
      key={title}
      style={{
        width: 32,
        height: 128,
        backgroundColor: color,
        marginRight: 4,
      }}
    >
      <div
        style={{
          transform: "rotate(270deg)",
          position: "relative",
          bottom: "-95px",
          color: "black",
          fontSize: "12px",
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default ColorBlock;

import React from "react";

const ColorBlock = ({ title, color }) => {
  return (
    <div
      key={title}
      className='ColorBlock'
      style={{
        backgroundColor: color,
      }}
    >
      <div className='ColorBlock-item'>{title}</div>
    </div>
  );
};

export default ColorBlock;

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
      <div className='ColorBlock-item'>
        <p className='ColorBlock-text'>{title}</p>
      </div>
    </div>
  );
};

export default ColorBlock;

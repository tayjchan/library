import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import ColorBlock from "./colorBlock";

const Carousel = ({ items, getColorWithIndex }) => {
  const [startIndex, setStartIndex] = useState(0);
  const onClickLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };
  const onClickRight = () => {
    if (startIndex < items.length - 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const displayItems = (blocks) => {
    let colorBlocks = [];
    for (let index = startIndex; index < blocks.length; index++) {
      const element = blocks[index];
      colorBlocks.push(
        <ColorBlock
          key={element.title}
          title={element.title}
          color={getColorWithIndex(index)}
        />
      );
    }

    let numPlaceholders = startIndex;
    while (numPlaceholders > 0) {
      colorBlocks.push(
        <ColorBlock key={numPlaceholders} color={"transparent"} />
      );
      numPlaceholders--;
    }
    return colorBlocks;
  };

  return (
    <div style={{ display: "flex", margin: "auto" }}>
      <Button
        icon='arrow left'
        onClick={onClickLeft}
        disabled={startIndex === 0}
      />
      <div style={{ display: "flex", maxWidth: "480px", overflow: "hidden" }}>
        {items && items.length > 0 && displayItems(items)}
      </div>
      <Button
        icon='arrow right'
        onClick={onClickRight}
        disabled={startIndex === items.length - 1}
      />
    </div>
  );
};

export default Carousel;
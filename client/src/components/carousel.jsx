import React, { useState } from "react";
import { Button, Loader } from "semantic-ui-react";
import Book from "./book";

const Carousel = ({ items, onDragStart, onDrop, shelf }) => {
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
    let books = [];
    for (let index = startIndex; index < blocks.length; index++) {
      const element = blocks[index];
      books.push(
        <Book
          key={element.title}
          title={element.title}
          imgUrl={element.imageUrl}
          author={element.author}
          bookId={element.bookId}
          onDragStart={onDragStart}
          shelf={shelf}
        />
      );
    }

    let numPlaceholders = startIndex;
    while (numPlaceholders > 0) {
      books.push(<Book key={numPlaceholders} color={"transparent"} />);
      numPlaceholders--;
    }

    // Place an extra placeholder at end
    books.push(<Book key={numPlaceholders} color={"transparent"} />);

    return books;
  };

  return (
    <div className='Carousel' onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e)}>
      <Button
        icon='arrow left'
        onClick={onClickLeft}
        disabled={!items || startIndex === 0}
        style={{ height: "50px", margin: "0 10px" }}
      />
      <div style={{ display: "flex", overflow: "hidden", flex: "1" }}>
        {items ? (
          items.length > 0 ? (
            displayItems(items)
          ) : (
              <div style={{ margin: "0 auto" }}>No books found.</div>
            )
        ) : (
            <Loader inline='centered' active />
          )}
      </div>
      <Button
        icon='arrow right'
        onClick={onClickRight}
        disabled={!items || startIndex === items.length - 1}
        style={{ height: "50px", margin: "0 10px" }}
      />
    </div>
  );
};

export default Carousel;

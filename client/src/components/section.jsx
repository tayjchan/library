import React from "react";
import Carousel from "./carousel";
import List from "./list";
import CircleButton from "./circleButton";
import { addBooks } from "../services/goodreadsService";

const Section = ({ title, books, showAsList, onDragStart, refresh, clearBooklists }) => {
  const onDrop = async (e) => {
    e.preventDefault();
    clearBooklists();
    const bookId = e.dataTransfer.getData("bookId");
    const bookShelf = e.dataTransfer.getData("shelf");
    const shelfToRemoveFrom = (bookShelf === 'done.') ? 'read' : 'to-read';
    const shelfToAddTo = (title === 'done.') ? 'read' : 'to-read';
    if (shelfToAddTo !== shelfToRemoveFrom) {
      await addBooks(shelfToAddTo, [bookId]);
      await refresh();
    }
  };
  return (
    <>
      <div style={{ display: "flex", alignItems: "start", paddingTop: 8 }}>
        <h2>{title}</h2>
        <CircleButton
          style={{ marginLeft: 8, marginTop: 4 }}
          size='mini'
          compact
          color={null}
          icon='search'
        />
      </div>
      {showAsList ? (
        <List items={books} shelf={title} onDragStart={onDragStart} onDrop={onDrop} />
      ) : (
          <Carousel items={books} shelf={title} onDragStart={onDragStart} onDrop={onDrop} />
        )}
    </>
  );
};

export default Section;

import React from "react";
import Carousel from "./carousel";
import List from "./list";
import { addBooks } from "../services/goodreadsService";
import SearchBar from "./searchBar";

const Section = ({ title, books, showAsList, onDragStart, refresh, clearBooklists }) => {
  const onDrop = async (e) => {
    e.preventDefault();

    const bookId = e.dataTransfer.getData("bookId");
    const bookShelf = e.dataTransfer.getData("shelf");
    const shelfToRemoveFrom = (bookShelf === 'done.') ? 'read' : 'to-read';
    const shelfToAddTo = (title === 'done.') ? 'read' : 'to-read';
    if (shelfToAddTo !== shelfToRemoveFrom) {
      clearBooklists();
      await addBooks(shelfToAddTo, [bookId]);
      await refresh();
    }
  };
  return (
    <>
      <div style={{ display: "flex", alignItems: "start", paddingTop: 8 }}>
        <h2>{title}</h2>
        <SearchBar />
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

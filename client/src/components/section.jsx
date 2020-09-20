import React from "react";
import Carousel from "./carousel";
import List from "./list";
import { addBooks } from "../services/goodreadsService";
import SearchBar from "./searchBar";

const Section = ({ title, books, showAsList, onDragStart, refresh, clearBooklists }) => {
  const [filterValue, setFilterValue] = React.useState('');
  const [filteredBooks, setFilteredBooks] = React.useState(books);

  React.useEffect(() => {
    if (filterValue !== "" && books.length > 0) {
      const allBooks = books;
      const lowercaseFilterValue = filterValue.toLowerCase();
      const filtered = allBooks.filter((book) => {
        return book.title.toLowerCase().includes(lowercaseFilterValue) || book.author.toLowerCase().includes(lowercaseFilterValue);
      });
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [books, filterValue]);

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
        <SearchBar setFilterValue={setFilterValue} />
      </div>
      {showAsList ? (
        <List items={filteredBooks} shelf={title} onDragStart={onDragStart} onDrop={onDrop} />
      ) : (
          <Carousel items={filteredBooks} shelf={title} onDragStart={onDragStart} onDrop={onDrop} />
        )}
    </>
  );
};

export default Section;

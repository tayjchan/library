import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import Axios from "axios";

const SearchResultsContainer = ({
  books,
  setShowInfoBox,
  resetSearch,
  getBookLists,
}) => {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const onClickButton = async (shelf) => {
    await Axios.post("https://server-library.herokuapp.com/goodreads/books/", {
      bookIds: selectedBooks,
      shelf,
    });
    resetSearch();
    setShowInfoBox(true);
    getBookLists();
  };

  const onClickBook = (bookId) => {
    setSelectedBooks([...selectedBooks, bookId]);
  };

  const onClickClear = () => {
    resetSearch();
  };

  return (
    <Segment>
      <h3>SEARCH RESULTS</h3>
      {books && books.length > 0 && (
        <ul>
          {books.map(({ bookId, title, author }) => (
            <li
              key={bookId}
              onClick={(e) => onClickBook(bookId)}
              className={selectedBooks.includes(bookId) ? "selectedBook" : null}
            >
              {title} by {author}
            </li>
          ))}
        </ul>
      )}
      <Button.Group>
        <Button onClick={() => onClickButton("read")}>Add to done.</Button>
        <Button.Or />
        <Button onClick={() => onClickButton("to-read")}>Add to later.</Button>
      </Button.Group>
      <Button color='teal' style={{ marginLeft: 16 }} onClick={onClickClear}>
        Clear
      </Button>
    </Segment>
  );
};

export default SearchResultsContainer;

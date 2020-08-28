import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";

const SearchResultsContainer = ({ books, setShowInfoBox, resetSearch }) => {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const onClickButton = (e) => {
    resetSearch();
    setShowInfoBox(true);
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
        <Button onClick={onClickButton}>Add to read.</Button>
        <Button.Or />
        <Button onClick={onClickButton}>Add to later.</Button>
      </Button.Group>
      <Button color='teal' style={{ marginLeft: 16 }} onClick={onClickClear}>
        Clear
      </Button>
    </Segment>
  );
};

export default SearchResultsContainer;

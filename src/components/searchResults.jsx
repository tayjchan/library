import React, { useState } from "react";
import { Button, Message } from "semantic-ui-react";

const SearchResultsContainer = ({ books }) => {
  const [showInfoBox, setShowInfoBox] = useState(false);
  return (
    <div style={{ padding: "16px 0" }}>
      <h3>SEARCH RESULTS</h3>
      {books && books.length > 0 && (
        <ul>
          {books.map((book, index) => (
            <li key={book.title + "_" + index}>
              {book.title}
              {" by "}
              {book.author}
            </li>
          ))}
        </ul>
      )}
      <Button.Group>
        <Button onClick={() => setShowInfoBox(true)}>Add to read.</Button>
        <Button.Or />
        <Button>Add to later.</Button>
      </Button.Group>
      {showInfoBox && (
        <Message
          info
          content='This book has also been added to your list in Goodreads.'
        />
      )}
    </div>
  );
};

export default SearchResultsContainer;

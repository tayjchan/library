import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { addBooks } from "../services/goodreadsService";
import List from "./list";

const SearchResults = ({
  books,
  showAutoclosingInfoBox,
  resetSearch,
  getBookLists,
  currentBooks,
}) => {
  const [selectedBookIds, setSelectedBookIds] = useState([]);

  const onClickButton = async (shelf) => {
    // TODO: Be more consistent with shelf to list name
    const booksOnShelf = currentBooks[shelf === "read" ? "read" : "toRead"];

    // Remove all selected books that already exist on shelf
    const bookIdsOnShelf = booksOnShelf.map(
      (bookOnShelf) => bookOnShelf.bookId
    );
    const booksSelectedAndNotOnShelf = selectedBookIds.filter(
      (selectedBookId) => !bookIdsOnShelf.includes(selectedBookId)
    );

    await addBooks(shelf, booksSelectedAndNotOnShelf);
    resetSearch();
    showAutoclosingInfoBox();
    getBookLists(shelf);
  };

  const onClickBook = (e) => {
    const bookId = e.target.getAttribute("data-bookid");
    if (selectedBookIds.includes(bookId)) {
      setSelectedBookIds(
        selectedBookIds.filter((selectedBookId) => selectedBookId !== bookId)
      );
    } else {
      setSelectedBookIds([...selectedBookIds, bookId]);
    }
    e.target.classList.toggle("selectedBook");
  };

  const onClickClear = () => {
    resetSearch();
  };

  return (
    <Segment>
      <h3>SEARCH RESULTS</h3>
      <List items={books} onClickItem={onClickBook} />
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

export default SearchResults;

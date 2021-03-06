import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { addBooks } from "../services/goodreadsService";
import List from "./list";
import { connect } from "react-redux";
import { toggleNeedToAuthorize } from '../actions';

const SearchResults = ({
  searchResults,
  showAutoclosingInfoBox,
  resetSearch,
  getBookLists,
  laterBooks,
  doneBooks,
  toggleNeedToAuthorize
}) => {
  const [selectedBookIds, setSelectedBookIds] = useState([]);

  const onClickButton = async (shelf) => {
    // TODO: Be more consistent with shelf to list name
    const booksOnShelf = (shelf === "read") ? doneBooks : laterBooks;

    // Remove all selected books that already exist on shelf
    const bookIdsOnShelf = booksOnShelf.map(
      (bookOnShelf) => bookOnShelf.bookId
    );
    const booksSelectedAndNotOnShelf = selectedBookIds.filter(
      (selectedBookId) => !bookIdsOnShelf.includes(selectedBookId)
    );

    const res = await addBooks(shelf, booksSelectedAndNotOnShelf);
    if (res === 401 || res === 500) {
      resetSearch();
      toggleNeedToAuthorize();
    } else {
      resetSearch();
      showAutoclosingInfoBox();
      getBookLists(shelf);
    }
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
      <List items={searchResults} onClickItem={onClickBook} />
      <Button.Group>
        <Button
          color={selectedBookIds.length > 0 ? "teal" : null}
          onClick={() => onClickButton("read")}
        >
          Add to done.
        </Button>
        <Button.Or />
        <Button
          color={selectedBookIds.length > 0 ? "teal" : null}
          onClick={() => onClickButton("to-read")}
        >
          Add to later.
        </Button>
      </Button.Group>
      <Button color='teal' style={{ marginLeft: 16 }} onClick={onClickClear}>
        Clear
      </Button>
    </Segment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleNeedToAuthorize: () => dispatch(toggleNeedToAuthorize())
});

const mapStateToProps = (state) => ({
  laterBooks: state.laterBooks,
  doneBooks: state.doneBooks,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

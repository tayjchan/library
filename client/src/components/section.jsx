import React from "react";
import Carousel from "./carousel";
import List from "./list";
import { addBooks } from "../services/goodreadsService";
import SearchBar from "./searchBar";
import { connect } from "react-redux";
import { clearAllBooks } from "../actions";

const Section = ({ title, unfilteredBooks, showAsList, onDragStart, refresh }) => {
  const [filterValue, setFilterValue] = React.useState('');
  const [filteredBooks, setFilteredBooks] = React.useState(unfilteredBooks);

  React.useEffect(() => {
    console.log(title + ": " + unfilteredBooks);
    if (filterValue !== "" && unfilteredBooks.length > 0) {
      const lowercaseFilterValue = filterValue.toLowerCase();
      const filtered = unfilteredBooks.filter((book) => {
        return book.title.toLowerCase().includes(lowercaseFilterValue) || book.author.toLowerCase().includes(lowercaseFilterValue);
      });
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(unfilteredBooks);
    }
  }, [unfilteredBooks, filterValue]);

  const onDrop = async (e) => {
    e.preventDefault();

    const bookId = e.dataTransfer.getData("bookId");
    const bookShelf = e.dataTransfer.getData("shelf");
    const shelfToRemoveFrom = (bookShelf === 'done.') ? 'read' : 'to-read';
    const shelfToAddTo = (title === 'done.') ? 'read' : 'to-read';
    if (shelfToAddTo !== shelfToRemoveFrom) {
      clearAllBooks();
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

const mapStateToProps = (state, ownProps) => ({
  unfilteredBooks: ownProps.title === 'done' ? state.doneBooks : state.laterBooks,
});

const mapDispatchToProps = (dispatch) => ({
  clearAllBooks: () => dispatch(clearAllBooks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);

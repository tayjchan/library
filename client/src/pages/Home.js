import React, { useEffect, useCallback } from "react";
import Section from "../components/section";
import AddBookForm from "../components/addBookForm";
import { getBooks, callback } from "../services/goodreadsService";
import { connect } from "react-redux";
import { updateLaterBooks, updateDoneBooks, clearAllBooks } from "../actions";

const Home = (props) => {
  const {
    updateDoneBooks,
    updateLaterBooks,
    clearAllBooks,
    location,
    history,
    showAsList,
  } = props;

  const getBookLists = useCallback(
    async (shelf) => {
      const books = await getBooks(shelf);
      shelf === "read" ? updateDoneBooks(books) : updateLaterBooks(books);
    },
    [updateDoneBooks, updateLaterBooks]
  );

  useEffect(() => {
    async function redirectAfterAuthorization() {
      await callback();
      localStorage.setItem("authorized", "true");
      history.replace("/");
    }
    if (location && location.search) {
      redirectAfterAuthorization();
    }
  }, [location, history]);

  useEffect(() => {
    async function getAllBooks() {
      clearAllBooks();
      await Promise.all([getBookLists("read"), getBookLists("to-read")]);
    }
    getAllBooks();
  }, [getBookLists, clearAllBooks]);

  const refresh = async () => {
    await Promise.all([getBookLists("read"), getBookLists("to-read")]);
  };

  const onDragStart = (e, bookId, shelf) => {
    e.dataTransfer.setData("bookId", bookId);
    e.dataTransfer.setData("shelf", shelf);
  };

  return (
    <div>
      <AddBookForm getBookLists={getBookLists} />
      <div>
        <Section
          showAsList={showAsList}
          title='done'
          onDragStart={onDragStart}
          refresh={refresh}
        />
        <Section
          showAsList={showAsList}
          title='later'
          onDragStart={onDragStart}
          refresh={refresh}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateLaterBooks: (books) => dispatch(updateLaterBooks(books)),
  updateDoneBooks: (books) => dispatch(updateDoneBooks(books)),
  clearAllBooks: () => dispatch(clearAllBooks()),
});

export default connect(null, mapDispatchToProps)(Home);

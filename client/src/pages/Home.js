import React, { useEffect, useState } from "react";
import Section from "../components/section";
import AddBookForm from "../components/addBookForm";
import { getBooks, callback } from "../services/goodreadsService";

const Home = (props) => {
  const [readBooks, setReadBooks] = useState(null);
  const [laterBooks, setLaterBooks] = useState(null);

  useEffect(() => {
    async function redirectAfterAuthorization() {
      await callback();
      sessionStorage.setItem("authorized", "true");
      props.history.replace("/");
    }
    if (props.location && props.location.search) {
      redirectAfterAuthorization();
    }
  }, [props.location, props.history]);

  useEffect(() => {
    async function getAllBooks() {
      clearBooklists();
      await Promise.all([getBookLists("read"), getBookLists("to-read")]);
    }
    getAllBooks();
  }, []);

  async function getBookLists(shelf) {
    const books = await getBooks(shelf);
    shelf === "read" ? setReadBooks(books) : setLaterBooks(books);
  }

  const clearBooklists = () => {
    setReadBooks(null);
    setLaterBooks(null);
  };

  const refresh = async () => {
    await Promise.all([getBookLists("read"), getBookLists("to-read")]);
  };

  const onDragStart = (e, bookId, shelf) => {
    e.dataTransfer.setData("bookId", bookId);
    e.dataTransfer.setData("shelf", shelf);
  };

  return (
    <div>
      <AddBookForm
        getBookLists={getBookLists}
        currentBooks={{ read: readBooks, toRead: laterBooks }}
      />
      <div>
        <Section
          books={readBooks}
          showAsList={props.showAsList}
          title='done.'
          onDragStart={onDragStart}
          clearBooklists={clearBooklists}
          refresh={refresh}
        />
        <Section
          books={laterBooks}
          showAsList={props.showAsList}
          title='later.'
          onDragStart={onDragStart}
          clearBooklists={clearBooklists}
          refresh={refresh}
        />
      </div>
    </div>
  );
};

export default Home;

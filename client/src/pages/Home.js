import React, { useEffect, useState } from "react";
import Section from "../components/section";
import AddBookForm from "../components/addBookForm";
import { getBooks } from "../services/goodreadsService";
import Axios from "axios";

const Home = (props) => {
  const [readBooks, setReadBooks] = useState(null);
  const [laterBooks, setLaterBooks] = useState(null);

  useEffect(() => {
    if (props.location && props.location.search) {
      Axios.get("https://server-library.herokuapp.com/goodreads/callback").then(
        () => {
          sessionStorage.setItem("authorized", "true");
          props.history.replace("/");
        }
      );
    }
  }, [props.location, props.history]);

  useEffect(() => {
    getBookLists();
  }, []);

  async function getBookLists() {
    const done = await getBooks("read");
    const later = await getBooks("to-read");
    setReadBooks(done);
    setLaterBooks(later);
  }

  return (
    <div>
      <AddBookForm getBookLists={getBookLists} />
      <div>
        <Section
          books={readBooks}
          showAsList={props.showAsList}
          title='done.'
        />
        <Section
          books={laterBooks}
          showAsList={props.showAsList}
          title='later.'
        />
      </div>
    </div>
  );
};

export default Home;

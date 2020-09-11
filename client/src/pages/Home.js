import React, { useEffect, useState } from "react";
import Section from "../components/section";
import AddBookForm from "../components/addBookForm";
import { getBooks } from "../services/goodreadsService";
import Axios from "axios";

const Home = (props) => {
  const [readBooks, setReadBooks] = useState(null);
  const [laterBooks, setLaterBooks] = useState(null);

  useEffect(() => {
    if (
      props.location &&
      props.location.search &&
      !sessionStorage.getItem("authorized")
    ) {
      Axios.get("http://localhost:4000/goodreads/callback").then(() => {
        sessionStorage.setItem("authorized", "true");
      });
    }
  }, [props.location]);

  useEffect(() => {
    async function getBookLists() {
      const done = await getBooks("read");
      const later = await getBooks("to-read");
      setReadBooks(done);
      setLaterBooks(later);
    }
    getBookLists();
  }, []);

  return (
    <div>
      <AddBookForm />
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

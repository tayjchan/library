import React, { useEffect, useState } from "react";
import Section from "../components/section";
import AddBookForm from "../components/addBookForm";
import { getBooks } from "../services/goodreadsService";

const Home = () => {
  const [readBooks, setReadBooks] = useState(null);
  const [laterBooks, setLaterBooks] = useState(null);

  useEffect(() => {
    async function getBookLists() {
      const done = await getBooks("read");
      const later = await getBooks("to-read");
      setReadBooks(done);
      setLaterBooks(later);
    }
    getBookLists();
    // checkAuthenticated();
  }, []);

  const checkAuthenticated = async () => {
    fetch("http://localhost:4000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <AddBookForm />
      <div>
        <Section books={readBooks} title='done.' />
        <Section books={laterBooks} title='later.' />
      </div>
    </div>
  );
};

export default Home;

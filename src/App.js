import React, { useEffect, useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Popup } from "semantic-ui-react";
import Section from "./components/section";
import AddBookForm from "./components/addBookForm";
import { getBooks } from "./services/goodreadsService";

const colors = ["#a3d2ca", "bisque", "#5eaaa8", "#F4CD83", "#71EAD7"];

function App() {
  const [readBooks, setReadBooks] = useState([]);
  const [laterBooks, setLaterBooks] = useState([]);

  const getColor = (index) => {
    switch (index % 4) {
      case 0:
        return colors[0];
      case 1:
        return colors[1];
      case 2:
        return colors[2];
      case 3:
        return colors[3];
      default:
        return colors[0];
    }
  };

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
    <div className='App'>
      <h1>library.</h1>
      <div className='buttonGroup'>
        <Popup
          content='Show as lists.'
          trigger={<Button circular color='teal' icon='list ul' />}
        />
        <Popup
          content='Go to Goodreads.'
          trigger={<Button circular color='teal' icon='goodreads' />}
        />
        <Popup
          content='Sign-in via Google.'
          trigger={<Button circular color='teal' icon='sign-in' />}
        />
      </div>
      <hr />
      <AddBookForm />
      <div>
        <Section
          books={readBooks}
          title='done.'
          getColorWithIndex={(i) => getColor(i)}
        />
        <Section
          books={laterBooks}
          title='later.'
          getColorWithIndex={(i) => getColor(i + 2)}
        />
      </div>
    </div>
  );
}

export default App;

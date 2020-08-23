import React, { useEffect, useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Popup } from "semantic-ui-react";
import Section from "./components/section";
import AddBookForm from "./components/addBookForm";
import { getBooks } from "./services/goodreadsService";

function App() {
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
        <Section books={readBooks} title='done.' />
        <Section books={laterBooks} title='later.' />
      </div>
    </div>
  );
}

export default App;

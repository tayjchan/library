import React, { useState } from "react";
import { Form, Segment } from "semantic-ui-react";
import { searchBooks } from "../services/goodreadsService";
import SearchResultsContainer from "./searchResults";

const AddBookForm = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  async function fetchSearchResults(e) {
    e.preventDefault();
    const res = await searchBooks(searchValue);
    setSearchResults(res);
  }

  return (
    <>
      <h2>add.</h2>
      <Segment style={{ maxWidth: "800px" }}>
        <Form>
          <Form.Input
            fluid
            action={{
              color: "teal",
              icon: "search",
              onClick: (e) => fetchSearchResults(e),
            }}
            placeholder='Search for books'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Form>
        {searchResults.length > 0 && (
          <SearchResultsContainer books={searchResults} />
        )}
      </Segment>
    </>
  );
};

export default AddBookForm;

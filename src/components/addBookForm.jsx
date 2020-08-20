import React, { useState, useRef } from "react";
import { Form, Message } from "semantic-ui-react";
import { searchBooks } from "../services/goodreadsService";
import SearchResultsContainer from "./searchResults";

const AddBookForm = () => {
  const searchResultsHeader = useRef(null);

  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const resetSearch = () => {
    setSearchValue("");
    setSearchResults([]);
  };

  async function fetchSearchResults(e) {
    e.preventDefault();

    setShowInfoBox(false);
    setLoadingSearch(true);
    const res = await searchBooks(searchValue);
    setSearchResults(res);
    if (searchResultsHeader !== null) {
      window.scrollTo(0, searchResultsHeader.current.offsetTop);
    }
    setLoadingSearch(false);
  }

  return (
    <>
      <h2 ref={searchResultsHeader}>add.</h2>
      <Form>
        <Form.Input
          fluid
          action={{
            color: "teal",
            icon: "search",
            loading: loadingSearch,
            onClick: (e) => fetchSearchResults(e),
          }}
          placeholder='Search Goodreads for books'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Form>
      {searchResults.length > 0 && !showInfoBox && (
        <SearchResultsContainer
          books={searchResults}
          setShowInfoBox={setShowInfoBox}
          resetSearch={resetSearch}
        />
      )}
      {showInfoBox && (
        <Message
          info
          content='This book has also been added to your list in Goodreads.'
        />
      )}
    </>
  );
};

export default AddBookForm;

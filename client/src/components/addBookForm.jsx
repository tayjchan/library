import React, { useState, useRef } from "react";
import { Form, Message } from "semantic-ui-react";
import { searchBooks } from "../services/goodreadsService";
import SearchResults from "./searchResults";

const AddBookForm = ({ getBookLists, currentBooks }) => {
  const searchResultsHeader = useRef(null);

  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [showErrorBox, setShowErrorBox] = useState(false); // TODO: Use this

  const showAutoclosingInfoBox = () => {
    setShowInfoBox(true);
    setTimeout(() => {
      setShowInfoBox(false);
    }, 5000);
  };

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
    <div style={{ paddingBottom: "24px" }}>
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
        <SearchResults
          books={searchResults}
          showAutoclosingInfoBox={showAutoclosingInfoBox}
          getBookLists={getBookLists}
          resetSearch={resetSearch}
          currentBooks={currentBooks}
        />
      )}
      {showInfoBox && (
        <Message
          info
          content='This book has also been added to your list in Goodreads.'
          onDismiss={() => setShowInfoBox(false)}
        />
      )}
      {showErrorBox && (
        <Message
          error
          content={"This book has already been added to that list."}
          onDismiss={() => setShowErrorBox(false)}
        />
      )}
    </div>
  );
};

export default AddBookForm;

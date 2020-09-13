import axios from "axios";

export async function callback() {
  await axios.get("https://server-library.herokuapp.com/goodreads/callback");
}

export async function getBooks(shelf) {
  const shelfResults = await axios.get(
    "https://server-library.herokuapp.com/goodreads/books/?shelf=" + shelf
  );
  return shelfResults.data;
}

export async function addBooks(shelf, selectedBooks) {
  await axios.post("https://server-library.herokuapp.com/goodreads/books/", {
    bookIds: selectedBooks,
    shelf,
  });
}

export async function searchBooks(query) {
  const searchResults = await axios.get(
    "https://server-library.herokuapp.com/goodreads/search/?query=" + query
  );
  return searchResults.data;
}

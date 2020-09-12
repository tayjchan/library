import axios from "axios";
import * as xml2js from "xml2js";
import { key, userId } from "../constants";

const endpoint =
  "https://cors-anywhere.herokuapp.com/https://www.goodreads.com";

const config = {
  headers: { "X-Requested-With": "XMLHttpRequest" },
};

function parseXml(xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export async function getBooks(shelf) {
  const api =
    endpoint +
    "/review/list/" +
    userId +
    ".xml?key=" +
    key +
    "&v=2&shelf=" +
    shelf;
  const goodreadsResult = await axios.get(api, config);
  const json = await parseXml(goodreadsResult.data);
  const results = json.GoodreadsResponse.reviews[0].review;
  if (!results) return [];
  return results.map((res) => {
    const book = res.book[0];
    return {
      title: book.title[0],
      author: book.authors[0].author[0].name[0],
      bookId: book.work[0].id[0],
      imageUrl: book.image_url[0],
    };
  });
}

export async function searchBooks(query) {
  const api = endpoint + "/search/index.xml?key=" + key + "&q=" + query;
  const goodreadsResult = await axios.get(api, config);
  const json = await parseXml(goodreadsResult.data);
  const results = json.GoodreadsResponse.search[0].results[0].work;
  return results.map((res) => {
    const book = res.best_book[0];
    return {
      title: book.title[0],
      author: book.author[0].name[0],
      bookId: book.id[0]._,
      imageUrl: book.image_url[0],
    };
  });
}

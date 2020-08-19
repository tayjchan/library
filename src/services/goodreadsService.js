import axios from "axios";
import * as xml2js from "xml2js";
import { key } from "../constants";

const endpoint =
  "https://cors-anywhere.herokuapp.com/https://www.goodreads.com";

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

export async function searchBooks(query) {
  const api = endpoint + "/search/index.xml?key=" + key + "&q=" + query;

  var config = {
    headers: { "X-Requested-With": "XMLHttpRequest" },
  };

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

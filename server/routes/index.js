var express = require("express");
var router = express.Router();
const axios = require("axios");
const xml2js = require("xml2js");
const {
  requestToken,
  processCallback,
  get,
  post,
} = require("../utils/oauthUtils");
// const { GOODREADS_KEY, GOODREADS_USERID } = require("../config/keys");

const config = {
  headers: { "X-Requested-With": "XMLHttpRequest" },
};

let sess = {};
const GOODREADS_KEY = process.env.GOODREADS_KEY || "";
const GOODREADS_USERID = process.env.GOODREADS_USERID || "";

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

router.get("/", function (req, res) {
  res.status(200).send({ message: "Welcome to our restful API" });
});

router.get("/goodreads/authorize", function (req, res) {
  requestToken().then((data) => {
    const { oauthToken, oauthTokenSecret, url } = data;
    sess.oauthToken = oauthToken;
    sess.oauthTokenSecret = oauthTokenSecret;
    res.redirect(url);
  });
});

router.get("/goodreads/callback", function (req, res) {
  oauthToken = sess.oauthToken;
  oauthTokenSecret = sess.oauthTokenSecret;
  processCallback(oauthToken, oauthTokenSecret).then((data) => {
    const { accessToken, accessTokenSecret } = data;
    sess.accessToken = accessToken;
    sess.accessTokenSecret = accessTokenSecret;
    get(
      "https://www.goodreads.com/api/auth_user",
      sess.accessToken,
      sess.accessTokenSecret
    ).then((goodreadsResult) => {
      res.send(goodreadsResult);
    });
  });
});

router.get("/goodreads/user", async function (req, res) {
  const user = await get(
    "https://www.goodreads.com/api/auth_user",
    sess.accessToken,
    sess.accessTokenSecret
  );
  res.status(200).send(user);
});

router.get("/goodreads/friends", async function (req, res) {
  const user = await get(
    "https://www.goodreads.com/friend/requests.xml",
    sess.accessToken,
    sess.accessTokenSecret
  );
  res.status(200).send(user);
});

router.get("/goodreads/books/", async function (req, res) {
  let shelf = req.query.shelf;
  const api =
    "https://www.goodreads.com/review/list/" +
    GOODREADS_USERID +
    ".xml?key=" +
    GOODREADS_KEY +
    "&v=2&shelf=" +
    shelf;
  let goodreadsResult;
  try {
    goodreadsResult = await axios.get(api, config);
  } catch (error) {
    return res.status(error.statusCode).json(error.data);
  }

  const json = await parseXml(goodreadsResult.data);
  const results = json.GoodreadsResponse.reviews[0].review;
  if (!results) res.status(200).json([]);
  const toReturn = results.map((res) => {
    const book = res.book[0];
    return {
      title: book.title[0],
      author: book.authors[0].author[0].name[0],
      bookId: book.id[0]["_"],
      imageUrl: book.image_url[0],
    };
  });
  return res.status(200).json(toReturn);
});

router.post("/goodreads/books/", async function (req, res) {
  const bookIds = req.body.bookIds;
  const shelf = req.body.shelf;
  if (bookIds.length === 1) {
    const path =
      "https://www.goodreads.com/shelf/add_to_shelf.xml" +
      "?name=" +
      shelf +
      "&book_id=" +
      bookIds[0];
    let toReturn;
    try {
      toReturn = await post(path, sess.accessToken, sess.accessTokenSecret);
    } catch (error) {
      return res.status(error.statusCode).json(error.data);
    }
    return res.status(200).json(toReturn);
  } else {
    const path =
      "https://www.goodreads.com/shelf/add_books_to_shelves.xml?bookids=" +
      bookIds.join() +
      "&shelves=" +
      shelf;
    let toReturn;
    try {
      toReturn = await post(path, sess.accessToken, sess.accessTokenSecret);
    } catch (error) {
      return res.status(error.statusCode).json(error.data);
    }
    res.status(200).json(toReturn);
  }
});

router.get("/goodreads/search/", async function (req, res) {
  let query = req.query.query;
  const api =
    "https://www.goodreads.com/search/index.xml?key=" +
    GOODREADS_KEY +
    "&q=" +
    query;
  let goodreadsResult;
  try {
    goodreadsResult = await axios.get(api, config);
  } catch (error) {
    return res.status(error.statusCode).json(error.data);
  }
  const json = await parseXml(goodreadsResult.data);
  const results = json.GoodreadsResponse.search[0].results[0].work;
  const toReturn = results.map((res) => {
    const book = res.best_book[0];
    return {
      title: book.title[0],
      author: book.author[0].name[0],
      bookId: book.id[0]._,
      imageUrl: book.image_url[0],
    };
  });
  res.status(200).json(toReturn);
});

module.exports = router;

var express = require("express");
var router = express.Router();
const { requestToken } = require("../utils/oauthUtils");

router.get("/", function (req, res) {
  res.status(200).send({ message: "Welcome to our restful API" });
});

router.get("/goodreads/authorize", async function (req, res) {
  const { oauthToken, oauthTokenSecret, url } = await requestToken();
  req.session = req.session || {};
  req.session.oauthRequestToken = oauthToken;
  req.session.oauthRequestTokenSecret = oauthTokenSecret;

  // res.redirect(url);
});

module.exports = router;

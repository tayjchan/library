var express = require("express");
var router = express.Router();
var passport = require("passport");

router.get("/", function (req, res) {
  res.status(200).send({ message: "Welcome to our restful API" });
});

// GET /auth/goodreads
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Goodreads authentication will involve redirecting
//   the user to goodreads.com.  After authorization, Goodreads will redirect the user
//   back to this application at /auth/goodreads/callback
router.get("/auth/goodreads", passport.authenticate("goodreads"));

// GET /auth/goodreads/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  "/auth/goodreads/callback",
  passport.authenticate("goodreads", {
    failureRedirect: "http://localhost:3000",
    successRedirect: "http://localhost:3000",
  })
);

module.exports = router;

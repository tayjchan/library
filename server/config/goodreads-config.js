const passport = require("passport");
const GoodreadsStrategy = require("passport-goodreads").Strategy;
const keys = require("./keys");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//   Use the GoodreadsStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Goodreads profile), and
//   invoke a callback with a user object.
passport.use(
  new GoodreadsStrategy(
    {
      consumerKey: keys.GOODREADS_KEY,
      consumerSecret: keys.GOODREADS_SECRET,
      callbackURL: "/auth/goodreads/callback",
    },
    function (token, tokenSecret, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's Goodreads profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Goodreads account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);

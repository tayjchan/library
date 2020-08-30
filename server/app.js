var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var passport = require("passport");
const passportSetup = require("./config/goodreads-config");
var indexRouter = require("./routes/index");
var session = require("express-session");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "SECRET", resave: true, saveUninitialized: true }));
app.use(passport.initialize());

app.use("/", indexRouter);

module.exports = app;

const express = require("express");
const colors = require("colors");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const session = require("express-session");

// controllers

const app = express();

// passport config
require("./config/passport")(passport);

// DB config
const db = require("./config/keys").MONGOURI;

// connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected".cyan.bold))
  .catch((err) => console.log(err));

// EJS middleware
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect-falsh
// app.use(flash);

// Global variables
// app.use(function (req, res, next) {
//   res.locals.success_msg = req.flash("success_msg");
//   res.locals.error_msg = req.flash("error_msg");

//   //   next();
// });

// routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// PORT AND SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`.yellow.bold));

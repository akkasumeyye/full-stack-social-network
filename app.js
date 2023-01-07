const express = require("express");
const app = express();
const port = process.env.PORT || 3035;
const middleware = require("./middleware");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("./database");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const server = app.listen(port, () =>
  console.log("Example app listening on port !" + port)
);

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
  })
);

//Routes
const loginRoute = require("./routes/loginRoutes.js");
const registerRoute = require("./routes/registerRoutes.js");
const logoutRoute = require("./routes/logout.js");
const adminRoute = require("./routes/adminRoutes.js");

//Api Routes
const postsApiRoute = require("./routes/api/posts");
const { JwtAuth } = require("./authJwt");

app.use("/api/posts", postsApiRoute);

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/admin", middleware.requireLogin, JwtAuth, adminRoute);

app.get("/", middleware.requireLogin, JwtAuth, (req, res, next) => {
  var payload = {
    pageTitle: "Home",
    userLoggedIn: req.session.user,
  };

  res.status(200).render("home", payload);
});

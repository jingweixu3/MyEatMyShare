const express = require("express");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");

require("./services/passport");

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

global.XMLHttpRequest = require("xhr2");

// Set post routes to post.js in routes folder
const post = require("./routes/post");
const restaurant = require("./routes/restaurant");

// Enable CORS
app.use(cors());
//app.use("/api/user", user_route);
app.use("/api/post", post);
app.use("/api/restaurant", restaurant);
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);

// homepage endpoint data retrieve from react
app.get("/api/homepage", (req, res) => {
  const customers = [
    { id: 1, firstName: "Johnnnn", lastName: "Doe" },
    { id: 2, firstName: "Braaaad", lastName: "Traaaaversy" },
    { id: 3, firstName: "Maaaary", lastName: "Swansonnnn" },
  ];
  res.json(customers);
});

const port = 5000;

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));

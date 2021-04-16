const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

global.XMLHttpRequest = require("xhr2");

// Set post routes to post.js in routes folder
const post = require("./routes/post");

// Enable CORS
app.use(cors());

app.use("/api/post", post);

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

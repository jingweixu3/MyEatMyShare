const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.get("/", (req, res) => {
  res.send("get posts");
});

router.post("/upload", upload.single("file"), async function (req, res, next) {
  const { file, body } = req;

  if (
    file.detectedFileExtension != ".jpg" ||
    file.detectedFileExtension != ".jpeg" ||
    file.detectedFileExtension != ".png"
  )
    next(new Error("Invalid file type"));
  // console.log(body);
  console.log("file:", file);
  console.log("res: ", body.resturant, " content: ", body.content);
  res.send("OK");
});

module.exports = router;

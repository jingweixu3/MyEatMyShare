const { uploadPost } = require("../firebase/useStorage");

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
    file === null ||
    (file.mimetype != "image/jpeg" && file.mimetype != "image/png")
  ) {
    console.log("wrong file type");
    return res
      .status(400)
      .json({ msg: "File uploaded Failed! Check file type!" });
  }
  // console.log(file);
  post_info = await uploadPost(file, body);

  console.log("post_info: ", post_info);
  res.json({ msg: "Successfully Uploaded!" });
});

module.exports = router;
